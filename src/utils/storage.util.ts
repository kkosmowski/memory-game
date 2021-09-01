export class StorageUtil {
  static set<T>(key: string, value: T): void {
    let stringValue: string;
    if (typeof value !== 'string') {
      if (typeof value === 'number') {
        stringValue = value + '';
      } else {
        stringValue = JSON.stringify(value);
      }
    } else {
      stringValue = value;
    }
    localStorage.setItem(key, stringValue);
  }

  static get<T>(key: string): T | null {
    const stringValue: string | null = localStorage.getItem(key);
    if (stringValue === null) {
      return null;
    }
    return JSON.parse(stringValue) as T;
  }
}