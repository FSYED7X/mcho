import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar, toggleAddBankDialog } from "../../redux/screenSlice";
import { TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { BASE_URL } from "../../urlConstants";
import { useIt } from "../../Context";

export default function AddBank() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const open = useSelector((state) => state.screen.addBankDialog);
  const close = () => {
    dispatch(toggleAddBankDialog());
    setError(false);
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const form = useRef();

  const { getBanksList } = useIt();

  const addBank = (e) => {
    e.preventDefault();
    setLoading(true);

    var raw = JSON.stringify({
      name: form.current.name.value,
      code: form.current.code.value,
      type: form.current.type.value,
      note1: form.current.note1.value,
      note2: form.current.note2.value,
    });

    var requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "?action=addBank", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.result === "error") setError(true);
        else {
          setError(false);
          close();
          dispatch(
            openSnackbar({ mesg: "Bank Added Successfully", type: "success" })
          );
          getBanksList();
        }
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={close}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle
        className="sticky-top"
        style={{ backgroundColor: "inherit" }}
      >
        {"Add New Bank"}
      </DialogTitle>

      <form onSubmit={addBank} ref={form}>
        <DialogContent>
          <p className="mb-2 ">Bank Name:</p>
          <TextField
            name="name"
            required
            variant="outlined"
            fullWidth
            className="fw-bolder mb-4"
          />
          <div className="row">
            <div className="col-md-6 col-12">
              <p className="mb-2 ">Bank Code:</p>
              <TextField
                name="code"
                required
                variant="outlined"
                fullWidth
                className="fw-bolder mb-4"
              />
            </div>
            <div className="col-md-6 col-12">
              <p className="mb-2 ">Bank Type:</p>
              <TextField
                name="type"
                required
                variant="outlined"
                fullWidth
                className="fw-bolder mb-4"
              />
            </div>
          </div>
          <p className="mb-2 ">Note 1:</p>
          <TextField
            name="note1"
            required
            variant="outlined"
            fullWidth
            className="fw-bolder mb-4"
          />
          <p className="mb-2 ">Note 2:</p>
          <TextField
            name="note2"
            required
            variant="outlined"
            fullWidth
            className="fw-bolder mb-4"
          />
        </DialogContent>
        <DialogActions className="pb-3 px-4 justify-content-between">
          <div>
            <Alert hidden={!error} variant="filled" severity="error">
              Bank Already exists!
            </Alert>
          </div>
          <div>
            <Button
              disabled={loading}
              size="large"
              type="button"
              onClick={close}
              color="secondary"
              variant="contained"
              className={`bg-danger text-white`}
            >
              Cancel
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              disabled={loading}
              size="large"
              type="submit"
              color="primary"
              variant="contained"
              className={`bg-warning text-white position-relative`}
            >
              &nbsp;{!loading ? "ADD" : <i className="bricks-white" />}&nbsp;
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}
