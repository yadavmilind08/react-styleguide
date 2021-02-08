import { FormQueryParamsHandler } from "./handlers/query-params";
import { FormRequestCacheIdHandler } from "./handlers/request-cache-id";

export class FormHandlers {
  handlers = [];

  props = null;

  constructor(props) {
    this.props = props;
    if (props.queryParams) {
      this.handlers.push(new FormQueryParamsHandler(props.queryParams));
    }
    if (props.cacheRequest) {
      this.handlers.push(new FormRequestCacheIdHandler(props.cacheRequest));
    }
  }

  onInitializing = (initialValues) => {
    this.handlers.forEach((handler) => {
      initialValues = handler.onInitializing(initialValues);
    });
    return initialValues;
  };

  onReady = async (initialValues, form) => {
    // TODO [NS]: update with await Promise.all
    // this.handlers.forEach(handler => {
    //     handler.onReady(initialValues, form);
    // });
    if (this.handlers.length) {
      await this.handlers[0].onReady(initialValues, form);
    }
  };

  onSubmitting = (values, form) => {
    this.handlers.forEach((handler) => {
      values = handler.onSubmitting(values, form);
    });
    return values;
  };

  onResetting = (values, form) => {
    this.handlers.forEach((handler) => {
      if (handler.onResetting) {
        values = handler.onResetting(values, form);
      }
    });
    return values;
  };
}
