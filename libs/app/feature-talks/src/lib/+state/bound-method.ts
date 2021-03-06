export function boundMethod(
  target: any,
  key: PropertyKey,
  descriptor: PropertyDescriptor
) {
  let fn = descriptor.value;
  console.log(target, key, descriptor);
  
  if (typeof fn !== 'function') {
    throw new TypeError(
      `@boundMethod decorator can only be applied to methods not: ${typeof fn}`
    );
  }

  // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.
  let definingProperty = false;

  return {
    configurable: true,
    get() {
      if (
        definingProperty ||
        this === target.prototype ||
        // eslint-disable-next-line no-prototype-builtins
        this.hasOwnProperty(key) ||
        typeof fn !== 'function'
      ) {
        return fn;
      }

      const boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get() {
          return boundFn;
        },
        set(value) {
          fn = value;
          delete this[key];
        },
      });
      definingProperty = false;
      return boundFn;
    },
    set(value: unknown) {
      fn = value;
    },
  };
}
