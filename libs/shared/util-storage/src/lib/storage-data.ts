export class StorageData {
  private _storage: Storage = localStorage;

  set<T = string>(key: string, value: T): void {
    const data = typeof value === 'string' ? value : JSON.stringify(value);

    this._storage.setItem(key, data);
  }

  get<T = string>(key: string) {
    const value = this._storage.getItem(key);
    const isStr = typeof value === 'string';
    return (!!value && isStr ? JSON.parse(value) : value) as T | null;
  }

  remove(key: string) {
    this._storage.removeItem(key);
  }

  clear() {
    this._storage.clear();
  }
}
