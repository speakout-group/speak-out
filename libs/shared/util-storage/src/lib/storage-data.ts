export class StorageData<E = any> {
  private _storage: Storage = localStorage;

  set<T extends keyof E>(key: T, value: E[T]): void {
    const data = typeof value === 'string' ? value : JSON.stringify(value);

    this._storage.setItem(key as string, data);
  }

  get<T extends keyof E>(key: T): E[T] {
    const value = this._storage.getItem(key as string) ?? '';
    const isStr = typeof value === 'string';
    return !isStr ? JSON.parse(value) : value;
  }

  remove<T extends keyof E>(key: T) {
    this._storage.removeItem(key as string);
  }

  clear() {
    this._storage.clear();
  }
}
