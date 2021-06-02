import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  openSnackbar,
  toggleEditCustomerDialog,
} from "../../redux/screenSlice";
import { FormControlLabel, Switch, TextField } from "@material-ui/core";
import { BASE_URL, GOOGLE_IMAGE } from "../../urlConstants";

import { ReactImgInput } from "react-img-input";
import "react-img-input/dist/index.css";
import { useIt } from "../../Context";
const _ = require("lodash");

export default function EditCustomer() {
  const customerList = useSelector((state) => state.customersList.data);
  const customer = _.find(customerList, {
    ROW: useSelector((state) => state.screen.customerToEdit),
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const open = useSelector((state) => state.screen.editCustomerDialog);
  const close = () => {
    setEdited({});
    dispatch(toggleEditCustomerDialog(""));
    setError(false);
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const form = useRef();
  const [Image, setImage] = useState();
  const [edited, setEdited] = useState({});
  const themee = useSelector((state) => state.screen.theme);

  const { getCustomersList } = useIt();

  useEffect(() => {
    console.log(edited);
  }, [edited]);

  const config = customer && {
    size: 120,
    captureBtn: {
      bg: "crimson",
      color: "#fff",
    },
    cropBtn: {
      bg: "#F4B230",
      color: "#fff",
    },
    defaultImg: GOOGLE_IMAGE + customer.IMAGE,
    theme: themee ? "light" : "dark",
    compression: {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    },
  };

  const editCustomer = (e) => {
    e.preventDefault();
    setLoading(true);
    var data = { ...edited, ROW: customer.ROW };
    var raw = JSON.stringify(data);
    console.log(data);

    var requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };

    //   {
    //     "NAME": "FAHADDD",
    //     "MOBILE": "02121212000",
    //     "DETAILS": "ERW",
    //     "IMAGE": ""
    //     "ROW": 4
    // }

    fetch(BASE_URL + "?action=editCustomer", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.result === "error") setError(true);
        else {
          setError(false);
          dispatch(
            openSnackbar({
              mesg: "Customer Edited Successfully",
              type: "success",
            })
          );
          getCustomersList();
          close();
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log("error", error);
      });
  };

  return customer ? (
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
        {"Edit Customer"}
      </DialogTitle>

      <div style={{ width: "fit-content" }} className="mx-auto mb-4">
        <ReactImgInput
          config={config}
          setOutput={(img) => setEdited({ ...edited, IMAGE: img })}
        />
      </div>
      <form onSubmit={editCustomer} ref={form}>
        <DialogContent>
          {/* <input
            name="image"
            type="hidden"
            value={Image}
          /> */}
          <p className="mb-2 ">Customer Name:</p>
          <TextField
            name="name"
            required
            variant="outlined"
            fullWidth
            className="fw-bolder mb-4"
            defaultValue={customer.NAME}
            onChange={(e) => setEdited({ ...edited, NAME: e.target.value })}
          />
          <p className="mb-2">Mobile Number:</p>
          <TextField
            name="mobile"
            required
            type="number"
            variant="outlined"
            fullWidth
            className="fw-bolder mb-4"
            defaultValue={customer.MOBILE}
            onChange={(e) => setEdited({ ...edited, MOBILE: e.target.value })}
          />
          <p className="mb-2">Detail:</p>
          <TextField
            name="detail"
            required
            variant="outlined"
            fullWidth
            className="fw-bolder mb-4"
            defaultValue={customer.DETAILS}
            onChange={(e) => setEdited({ ...edited, DETAILS: e.target.value })}
          />
        </DialogContent>
        <DialogActions className="pb-3 px-4 justify-content-between">
          {/* <div>asd</div> */}
          {/* <div>
            <Alert hidden={!error} variant="filled" severity="error">
              Customer Already exists!
            </Alert>
          </div> */}

          <FormControlLabel
            label="Active"
            labelPlacement="start"
            control={
              <Switch
                defaultChecked={customer.STATUS}
                onChange={(e) =>
                  setEdited({ ...edited, STATUS: e.target.checked })
                }
                name="active"
              />
            }
          />

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
              disabled={loading || !edited}
              size="large"
              type="submit"
              color="primary"
              variant="contained"
              className={`bg-warning text-white position-relative`}
            >
              &nbsp;{!loading ? "SAVE" : <i className="bricks-white" />}&nbsp;
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  ) : (
    ""
  );
}
