export class FormQueryParamsHandler {
  url = window.location.href;

  constructor(config) {
    this.config = {
      fields: config.fields || [],
      allFields: false,
      urlUpdate: true,
      autoSubmit: true,
      key: config.key || "values",
      ...config,
    };
  }

  onInitializing = (initialValues) => {
    return {
      ...initialValues,
      ...this.getValues(),
    };
  };

  onReady = (initialValues, form) => {
    if (this.config.autoSubmit) {
      const queryValues = this.getValues();
      if (Object.keys(queryValues).length) {
        form.setValues({
          ...this.getValues(),
        });
        form.submitForm();
      }
    }
  };

  onSubmitting = (values, form) => {
    return this.setValues(values);
  };

  getValues = () => {
    const queryValues = this.getQueryStringValue() || {};

    Object.keys(queryValues).forEach((key) => {
      const value = queryValues[key];
      if (this.isDate(value)) {
        queryValues[key] = new Date(value);
      }
    });

    return queryValues;
  };

  setValues = (values) => {
    this.config.fields = this.config.allFields
      ? Object.keys(values)
      : this.config.fields;

    const validValues = {};
    this.config.fields.forEach((field) => {
      const value = values[field];
      if (values[field]) {
        validValues[field] = value;
      }
    });

    let url;
    if (Object.keys(validValues).length) {
      url = JSON.stringify(validValues);
      url = this.setQueryStringValue(url);
    } else {
      url = this.clearQueryStringValue(this.url);
    }
    if (this.config.urlUpdate && decodeURI(url) != decodeURI(this.url)) {
      this.updateUrl(url);
    }

    return values;
  };

  getQueryStringValue = () => {
    const value = this.get(this.config.key);
    if (value) {
      return JSON.parse(value);
    }

    return null;
  };

  setQueryStringValue = (value) => {
    return this.set(this.config.key, value, this.url);
  };

  clearQueryStringValue = (url) => {
    return this.remove(this.config.key, url);
  };

  get = (key, url) => {
    url = url || window.location.href;
    key = key.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  set = (key, value, url) => {
    if (!url) url = "";
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = url ? (url.indexOf("?") !== -1 ? "&" : "?") : "";
    if (url.match(re)) {
      return url.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      return url + separator + key + "=" + value;
    }
  };

  remove = (key, url) => {
    url = url.split("?")[0];
    let param,
      params_arr = [],
      queryString = url.indexOf("?") !== -1 ? url.split("?")[1] : "";
    if (queryString !== "") {
      params_arr = queryString.split("&");
      for (var i = params_arr.length - 1; i >= 0; i -= 1) {
        param = params_arr[i].split("=")[0];
        if (param === key) {
          params_arr.splice(i, 1);
        }
      }
      url = url + "?" + params_arr.join("&");
    }
    return url;
  };

  clear = (url) => {
    url = url || window.location.href;
    if (window.location.href.indexOf("?") > 0) {
      url = window.location.href.substring(
        0,
        window.location.href.indexOf("?")
      );
      this.updateUrl(url);
    }
    return url;
  };

  updateUrl(url, documentTitle) {
    documentTitle = documentTitle ? documentTitle : document.title;
    var state = { Title: documentTitle, Url: url };
    history.pushState(state, state.Title, state.Url);
  }

  isDate(value) {
    return Date.parse(value) ? new Date(value).toISOString() == value : false;
  }
}
