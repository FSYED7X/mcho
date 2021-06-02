import { Box } from "@material-ui/core";
import { FastField } from "formik";
import { TextField } from "formik-material-ui";
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
        label={label}
        component={TextField}
        variant="outlined"
        fullWidth={true}
        placeholder={placeholder}
        InputLabelProps={{
          shrink: true,
        }}
        {...restProps}
      />
    </Box>
  );
}

MinionInput.defaultProps = {
  name: "",
  label: "",
  placeholder: "",
  py: "0",
};
