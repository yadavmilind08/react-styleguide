export class formValidator {
  /**
   * Uses the private _exclusive field in the schema to get whether or not
   * the field is marked as required or not.
   */
  static isRequiredField = (schema) => {
    const fields = schema.fields;
    return Object.keys(fields).reduce((accu, field) => {
      accu[field] = fields[field]._exclusive.required;
      return accu;
    }, {});
  };
}

export { formValidator as FormValidator };
