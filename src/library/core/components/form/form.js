import React, { useEffect, cloneElement } from "react";
import { useForm, FormProvider } from "react-hook-form/dist/index.ie11";
import { yupResolver } from "@hookform/resolvers/dist/ie11/yup";
import { FormHandlers } from "./form.handlers";
import "./form.scss";

const form = ({ style, noMargin, children, validationSchema, ...props }) => {
  const formHandlers = new FormHandlers(props);
  props.initialValues = formHandlers.onInitializing(props.initialValues);
  const form = useForm({
    defaultValues: {
      ...props.initialValues,
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data, e) => {
    props.onSubmit(data, props.form);
  };

  const onError = (errors, e) => console.error(errors, e);

  const registerOnSubmit = (a, b, c) => {
    const existingOnSubmit = props.onSubmit;
    props.onSubmit = (values, form) => {
      values = formHandlers.onSubmitting(values, form);
      if (existingOnSubmit) {
        existingOnSubmit(values, form);
      }
    };
  };

  const registerOnReset = () => {
    const existingOnReset = props.onReset;
    props.onReset = (values, _form) => {
      form.reset(values);
      values = formHandlers.onResetting(values, _form);
      if (existingOnReset) {
        existingOnReset(values, _form);
      }
    };
  };

  /** register fields from default values if it's not already present */
  const registerNonControlFields = () => {
    const initialValues = props.initialValues || {};
    const fields = form.control.fieldsRef.current;
    for (const key in initialValues) {
      if (!fields[key]) {
        form.register({ name: key });
      }
    }
  };

  /* formik method support */
  props.form = {
    control: form.control,
    resetFormArray: (values) => {
      props.onReset(values);
    },
    values: form.getValues(),
    setValue: (name, value, config) => {
      /** register field if it's not already present */
      const fields = form.control.fieldsRef.current;
      if (!fields[name]) {
        form.register({ name: name });
      }
      /** end */

      if (Array.isArray(value)) {
        for (const subKey in value) {
          for (const subNestKey in value[parseInt(subKey)]) {
            form.register({
              name: name + "[" + subKey + "]" + "." + subNestKey,
            });
            form.setValue(
              name + "[" + subKey + "]" + "." + subNestKey,
              value[parseInt(subKey)][subNestKey],
              {
                shouldValidate: true,
              }
            );
          }
        }
      }

      config = config || {};
      form.setValue(name, value, {
        shouldValidate: config.shouldValidate || true,
      });
    },
    setValues: (values, config) => {
      for (const key in values) {
        props.form.setValue(key, values[key], config);
      }
    },
    submitForm: () => {
      form.handleSubmit(onSubmit, onError)();
    },
    resetForm: () => {
      props.onReset(props.initialValues);
    },
    // setFieldValue: form.setValue,
    setSubmitting: (value) => {
      form.control.updateFormState({
        isSubmitting: value,
      });
    },
    ...form.formState,
  };
  /* end */

  registerOnSubmit();
  registerOnReset();

  useEffect(() => {
    const onReady = async () => {
      await formHandlers.onReady(props.initialValues, props.form);
    };
    onReady();
    registerNonControlFields();
  }, []);

  return (
    <div className="form" style={style}>
      <FormProvider {...form}>
        <form {...props} onSubmit={form.handleSubmit(onSubmit, onError)}>
          {renderChildren(props, children)}
        </form>
      </FormProvider>
    </div>
  );
};

const renderChildren = (props, children) => {
  return children
    ? typeof children === "function"
      ? children(props)
      : Array.isArray(children)
      ? children.map((child, index) => {
          return renderChild(props, child, index);
        })
      : renderChild(props, children)
    : null;
};

const renderChild = (props, child, key) => {
  let cloneChild = cloneElement(child, ...props);
  return <React.Fragment key={key}>{cloneChild}</React.Fragment>;
};

export { form as Form };
