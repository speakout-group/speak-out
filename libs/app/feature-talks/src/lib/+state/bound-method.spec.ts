import { boundMethod } from './bound-method'

class A {
  value: number
  constructor() {
    this.value = 42;
  }

  @boundMethod
  getValue() {
    return this.value;
  }
}

describe('Bound method', () => {
  it('should compile', () => {
    const a = new A();
    const { getValue } = a;
    expect(getValue() === 42).toBeTruthy()
  });
  
  it('should compile', () => {
    const a = new A();
    expect(a.getValue === a.getValue).toBeTruthy()
  });
})