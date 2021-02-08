import React from "react";
import classNames from "classnames";
import { FormSectionLayoutType } from "./form-section.model";
import "./form-section.scss";
import "./theme/theme-default.scss";
import "./theme/theme-white.scss";

const formSection = ({
  layout,
  theme,
  numberOfRowFields,
  autoSpacing,
  align,
  width,
  cssClasses,
  style,
  subSection,
  subSectionBorder,
  formField,
  bordered,
  borderRadius,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
  padding,
  children,
}) => {
  layout = layout || FormSectionLayoutType.Vertical;
  theme = theme;
  style = style || {};
  style = width ? { ...style, width: width } : style;

  return (
    <div
      className={classNames(
        "form-section",
        layout ? `layout-${layout}` : "",
        numberOfRowFields ? `field-${numberOfRowFields}` : "",
        autoSpacing ? `auto-spacing` : "",
        theme ? `theme theme-${theme}` : "",
        align || "",
        bordered ? `bordered` : "",
        borderRadius ? `border-radius` : "",
        borderLeft ? `border-left` : "",
        borderRight ? `border-right` : "",
        borderTop ? `border-top` : "",
        borderBottom ? `border-bottom` : "",
        subSection ? `sub-section` : "",
        subSectionBorder ? `sub-section-border` : "",
        formField ? `form-field` : "",
        padding ? `padding` : "",
        cssClasses
      )}
      style={style}
    >
      {children
        ? children.map
          ? children.map((child, index) => {
              return wrapSectionChildOrReturn(index, child, autoSpacing);
            })
          : wrapSectionChildOrReturn(children.props.name, children, autoSpacing)
        : null}
    </div>
  );
};

const wrapSectionChildOrReturn = (key, child, autoSpacing) => {
  return !autoSpacing ? (
    <React.Fragment key={key}>{child}</React.Fragment>
  ) : (
    <div key={key} className="section-item">
      {child}
    </div>
  );
};

export { formSection as FormSection };
