import { Box } from "@material-ui/core";
import { FastField } from "formik";
import { Checkbox, CheckboxWithLabel } from "formik-material-ui";
import React from "react";

export default function MinionInput({
  name,
  label,
  placeholder,
  py,
  ...restProps
}) {
  return (
    <Box py={py}>
      <FastField
        name={name}
        type="checkbox"
        component={CheckboxWithLabel}
        Label={{ label: label }}
        {...restProps}
      />
    </Box>
  );
}

MinionInput.defaultProps = {
  name: "",
  label: "",
  py: "0",
};
