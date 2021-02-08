export class FormFieldCacheLocalStorageProvider {
  constructor(config) {}

  get = (key) => {
    const values = localStorage.getItem(key);
    return values ? JSON.parse(values) : [];
  };

  set = (key, value, max) => {
    let values = this.get(key) || [];
    while (values.length >= max) {
      values.pop();
    }
    if (values.indexOf(value) > -1) {
      values.splice(values.indexOf(value), 1);
    }
    values = [value, ...values];
    localStorage.setItem(key, JSON.stringify(values));
  };
}
