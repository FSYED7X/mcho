import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AppContext from "../../../store/AppContext/AppContext";
import { Formik } from "formik";
import * as Yup from "yup";
import MinionInput from "../../../components/FormComponents/MinionInput";
import MinionCheckbox from "../../../components/FormComponents/MinionCheckbox";
import { Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Box } from "@material-ui/core";
import firebase from "../../../adapters/Firebase";
import { FIREBASE_USERS_IDENTIFIER } from "../../../constants";
const _ = require("lodash");

export default function Edit() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [fetching, setFetching] = useState(false);
  const { dialogs, setDialogs, notify } = useContext(AppContext);
  const [initialValues, setInitialValues] = useState({});

  const handleClose = () => {
    setDialogs({
      ...dialogs,
      operators: {
        ...dialogs.operators,
        edit: { ...dialogs.operators.edit, open: false },
      },
    });
  };

  useEffect(() => {
    if (dialogs.operators.edit.uid) {
      setFetching(true);
      firebase
        .database()
        .ref(FIREBASE_USERS_IDENTIFIER + "/" + dialogs.operators.edit.uid)
        .once("value", (snapshot) => {
          const val = snapshot.val();
          setInitialValues({
            uid: val.uid,
            email: val.email,
            bank: [
              val.access.bank.form && "form",
              val.access.bank.saved && "saved",
            ],
            invoice: [
              val.access.invoice.form && "form",
              val.access.invoice.saved && "saved",
            ],
            payment: [
              val.access.payment.form && "form",
              val.access.payment.saved && "saved",
            ],
          });
          setFetching(false);
        });
    }
  }, [dialogs.operators.edit]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={dialogs.operators.edit.open}
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
      {!fetching ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const data = {
              uid: values.uid,
              email: values.email,
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

            console.log(data);
            firebase
              .database()
              .ref(FIREBASE_USERS_IDENTIFIER + "/" + values.uid)
              .update(data);
            notify("Operator Updated Successfully", "success");
            resetForm();
            setSubmitting(false);
            handleClose();
          }}
        >
          {({ isSubmitting, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <MinionInput name="email" label="Email" py={3} disabled />
                  <MinionInput name="uid" label="User Id" py={3} disabled />
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
                      <MinionCheckbox
                        name="invoice"
                        label="Form"
                        value="form"
                      />
                      <MinionCheckbox
                        name="invoice"
                        label="Saved"
                        value="saved"
                      />
                    </Grid>
                    <Grid item>
                      <p className="mb-2 ">Payment:</p>
                      <MinionCheckbox
                        name="payment"
                        label="Form"
                        value="form"
                      />
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
                      {!isSubmitting ? "Save" : <i className="bricks-white" />}
                      &nbsp;
                    </Button>
                  </Box>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
      ) : (
        <h1 className="display-1">Loading</h1>
      )}
    </Dialog>
  );
}
