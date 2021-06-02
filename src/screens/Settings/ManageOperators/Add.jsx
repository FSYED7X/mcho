import React, { useContext, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AppContext from "../../../store/AppContext/AppContext";
import { Formik } from "formik";
import * as Yup from "yup";
import MinionInput from "../../../components/FormComponents/MinionInput";
import MinionCheckbox from "../../../components/FormComponents/MinionCheckbox";
import { Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { createAccount } from "../../../adapters/Firebase";
import firebase from "../../../adapters/Firebase";
import { FIREBASE_USERS_IDENTIFIER } from "../../../constants";
const _ = require("lodash");

export default function AddCustomer() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { dialogs, setDialogs, notify } = useContext(AppContext);

  const handleClose = () => {
    setDialogs({
      ...dialogs,
      operators: {
        ...dialogs.operators,
        add: { ...dialogs.operators.add, open: false },
      },
    });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={dialogs.operators.add.open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle
        className="sticky-top"
        style={{ backgroundColor: "inherit" }}
      >
        Add New Operator
      </DialogTitle>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email("Invalid email").required("Email Required"),
          password: Yup.string().required("Password Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          createAccount(values.email, values.password)
            .then((res) => {
              console.log(res);

              const data = {
                uid: res.uid,
                email: res.email,
                access: {
                  bank: {
                    form: _.indexOf(values.bank, "form") > -1,
                    saved: _.indexOf(values.bank, "saved") > -1,
                  },
                  invoice: {
                    form: _.indexOf(values.invoice, "form") > -1,
                    saved: _.indexOf(values.invoice, "saved") > -1,
                  },
                  payment: {
                    form: _.indexOf(values.payment, "form") > -1,
                    saved: _.indexOf(values.payment, "saved") > -1,
                  },
                },
              };

              firebase
                .database()
                .ref(FIREBASE_USERS_IDENTIFIER + "/" + res.uid)
                .update(data);
              notify("Operator Added Successfully", "success");
              resetForm();
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
              notify(err.message, "error");
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <MinionInput
                  name="email"
                  label="Email"
                  placeholder="Enter Email Address"
                  py={3}
                />

                <MinionInput
                  name="password"
                  label="Password"
                  placeholder="Enter Strong Password"
                  py={3}
                />

                <h4 className="mb-2 text-center">Access:</h4>
                <Divider className="mx-5" />
                <Box py={3} component={Grid} container justify="space-around">
                  <Grid item>
                    <p className="mb-2 ">Bank:</p>
                    <MinionCheckbox name="bank" label="Form" value="form" />
                    <MinionCheckbox name="bank" label="Saved" value="saved" />
                  </Grid>
                  <Grid item>
                    <p className="mb-2 ">Invoice:</p>
                    <MinionCheckbox name="invoice" label="Form" value="form" />
                    <MinionCheckbox
                      name="invoice"
                      label="Saved"
                      value="saved"
                    />
                  </Grid>
                  <Grid item>
                    <p className="mb-2 ">Payment:</p>
                    <MinionCheckbox name="payment" label="Form" value="form" />
                    <MinionCheckbox
                      name="payment"
                      label="Saved"
                      value="saved"
                    />
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions className="pb-3 px-4">
                <Box textAlign="right">
                  <Button
                    disabled={isSubmitting}
                    size="large"
                    type="button"
                    onClick={handleClose}
                    color="secondary"
                    variant="contained"
                    className={`bg-danger text-white`}
                  >
                    Cancel
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    disabled={isSubmitting}
                    size="large"
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={`bg-warning text-white position-relative`}
                    onClick={handleSubmit}
                  >
                    &nbsp;
                    {!isSubmitting ? "ADD" : <i className="bricks-white" />}
                    &nbsp;
                  </Button>
                </Box>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
}
