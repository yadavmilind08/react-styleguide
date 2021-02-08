import { FormFieldCacheHandler } from "./handlers/cache";

export class FormFieldHandlers {
  handlers = [];

  props = null;

  constructor(props) {
    this.props = props;
    if (props.cache) {
      this.handlers.push(new FormFieldCacheHandler(props.cache));
    }
  }

  getValues = (name) => {
    let values = [];
    this.handlers.forEach((handler) => {
      values.push(...handler.getValues(name));
    });
    return values;
  };

  setValues = (name, value) => {
    this.handlers.forEach((handler) => {
      handler.setValues(name, value);
    });
  };
}
