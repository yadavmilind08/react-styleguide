import React from "react";
import {
  FormSection,
  FormSectionLayoutType,
  FormSectionTheme,
  FormSectionAlignment,
} from "@core/form";
import { Button, ButtonType } from "@core/button";

const formConfig = ({ configuration, setConfiguration }) => {
  const setConfigurationProperty = (value) => {
    setConfiguration({
      ...configuration,
      ...value,
    });
  };
  const configProperties = [
    {
      title: "Vertical Layout",
      value: {
        layout: FormSectionLayoutType.Vertical,
      },
    },
    {
      title: "Horizontal Layout",
      value: {
        layout: FormSectionLayoutType.Horizontal,
      },
    },
    {
      title: "White Theme",
      value: {
        theme: FormSectionTheme.White,
      },
    },
    {
      title: "Default Theme",
      value: {
        theme: FormSectionTheme.Default,
      },
    },
    {
      title: "2 Fields",
      value: {
        numberOfRowFields: 2,
      },
      hide: configuration.layout == FormSectionLayoutType.Vertical,
    },
    {
      title: "4 Fields",
      value: {
        numberOfRowFields: 4,
      },
      hide: configuration.layout == FormSectionLayoutType.Vertical,
    },
    {
      title: "6 Fields",
      value: {
        numberOfRowFields: 6,
      },
      hide: configuration.layout == FormSectionLayoutType.Vertical,
    },
  ];

  return (
    <FormSection padding>
      <FormSection
        layout={FormSectionLayoutType.Horizontal}
        align={FormSectionAlignment.Center}
        autoSpacing={true}
      >
        {configProperties.map((property) => {
          return (
            <React.Fragment key={property}>
              {!property.hide ? (
                <Button
                  type={ButtonType.Tertiary}
                  onClick={() => setConfigurationProperty(property.value)}
                >
                  {property.title}
                </Button>
              ) : null}
            </React.Fragment>
          );
        })}
      </FormSection>
    </FormSection>
  );
};

export { formConfig as FormConfig };
