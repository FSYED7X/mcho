import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar, toggleAddCustomerDialog } from "../../redux/screenSlice";
import { TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { BASE_URL } from "../../urlConstants";

import { ReactImgInput } from "react-img-input";
import "react-img-input/dist/index.css";
import { useIt } from "../../Context";

export default function AddBank() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const open = useSelector((state) => state.screen.addCustomerDialog);
  const close = () => {
    dispatch(toggleAddCustomerDialog());
    setError(false);
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const form = useRef();
  const [Image, setImage] = useState();

  const themee = useSelector((state) => state.screen.theme);

  const { getCustomersList } = useIt();

  const config = {
    size: 120,
    captureBtn: {
      bg: "crimson",
      color: "#fff",
    },
    cropBtn: {
      bg: "#F4B230",
      color: "#fff",
    },
    defaultImg: "",
    theme: themee ? "light" : "dark",
    compression: {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    },
  };

  const addCustomer = (e) => {
    e.preventDefault();
    setLoading(true);

    var raw = JSON.stringify({
      name: form.current.name.value,
      mobile: form.current.mobile.value,
      details: form.current.detail.value,
      image: form.current.image.value,
    });

    console.log(JSON.parse(raw));

    var requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "?action=addCustomer", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.result);
        if (result.result === "error") setError(true);
        else {
          setError(false);
          close();
          dispatch(
            openSnackbar({
              mesg: "Customer Added Successfully",
              type: "success",
            })
          );
          getCustomersList();
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

      <div style={{ width: "fit-content" }} className="mx-auto mb-4">
        <ReactImgInput config={config} setOutput={setImage} />
      </div>
      <form onSubmit={addCustomer} ref={form}>
        <DialogContent>
          <input name="image" type="hidden" value={Image} />
          <p className="mb-2 ">Customer Name:</p>
          <TextField
            name="name"
            required
            variant="outlined"
            fullWidth
            className="fw-bolder mb-4"
          />
          <p className="mb-2">Mobile Number:</p>
          <TextField
            name="mobile"
            required
            type="number"
            variant="outlined"
            fullWidth
            className="fw-bolder mb-4"
          />
          <p className="mb-2">Detail:</p>
          <TextField
            name="detail"
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
