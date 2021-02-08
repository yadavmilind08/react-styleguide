import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const fieldError = ({ name, error }) => {
  const getErrors = () => {
    if (!error) {
      return [];
    }
    const errors = [];
    if (typeof error === "string") {
      errors.push({
        name: name,
        errorText: error,
      });
    } else if (typeof error === "object") {
      for (const key in error) {
        if (key !== "type") {
          errors.push({
            name: key,
            errorText: error[key],
          });
        }
      }
    }
    return errors;
  };

  const errors = getErrors();

  return (
    <React.Fragment>
      {errors.length ? (
        <div className="form-error">
          <div className="form-error-content">
            <i className="arrow up"></i>
            <span className="icon">
              <FontAwesomeIcon size={"lg"} icon={faExclamationTriangle} />
            </span>
            {errors.map((error, index) => {
              return (
                <div key={index} className="text">
                  {error.errorText}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export { fieldError as FormFieldError };
