import React, { useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import Calendar from "../../components/Calendar/Calendar";
import CurrencyList from "../../components/CurrencyList/CurrencyList";
import copy from "copy-to-clipboard";
import {
  setInvoiceData,
  resetInvoiceForm,
  changeFormType,
  toggleLoading,
} from "../../redux/invoice/invoiceFormSlice";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import RotateLeftOutlinedIcon from "@material-ui/icons/RotateLeftOutlined";
import SaveIcon from "@material-ui/icons/Save";
import { openSnackbar } from "../../redux/screenSlice";

import WifiOffRoundedIcon from "@material-ui/icons/WifiOffRounded";
import { setInvoiceSavedData } from "../../redux/invoice/invoiceSavedDataSlice";
import { useIt } from "../../Context";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { nanoid } from "nanoid";
import { GOOGLE_IMAGE, BASE_URL } from "../../urlConstants";
import CustomersList from "../../components/CustomersList/CustomersList";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { BrowserView } from "react-device-detect";
import { useHistory } from "react-router-dom";
import { Fragment } from "react";
const isOnline = require("is-online");

const transactionType = ["Shop", "Office", "Godam", "Other"];
const paymentType = [
  "Cheque",
  "Cash",
  "Credit/Debit Card",
  "Online/Atm",
  "Bank Deposit",
  "Other",
];

export default function Invoice() {
  const theme = useSelector((state) => state.screen.theme);
  const dispatch = useDispatch();
  const invoiceForm = useSelector((state) => state.invoiceForm.formfields);
  const formType = useSelector((state) => state.invoiceForm.formType);
  const form = useRef();
  const loading = useSelector((state) => state.invoiceForm.loading);
  const { uploadData } = useIt();
  const history = useHistory();
  const iaccess = useSelector((state) => state.auth.user.access.invoice.form);
  const paccess = useSelector((state) => state.auth.user.access.payment.form);

  useEffect(() => {
    if (iaccess && paccess) {
      dispatch(changeFormType("invoice"));
    }
    if (!iaccess && paccess) {
      dispatch(changeFormType("payment"));
    }
    if (!iaccess && !paccess) {
      history.push("/noaccess");
    }
  }, [iaccess, paccess]);

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(17),
      height: theme.spacing(17),
    },
    root: {
      width: "100%",
      "& button": {
        borderColor: "#B6B6B6",
        width: "100%",
        "&:hover": {},
      },
      "& .Mui-selected": {
        background:
          formType === "payment"
            ? theme.palette.success.dark
            : "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%)",
        color: "#fff",
        "&:hover": {
          background:
            formType === "payment"
              ? theme.palette.success.dark
              : "linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%)",
        },
      },
    },
  }));

  const classes = useStyles();

  const submit = (e) => {
    e.preventDefault();
    form.current.checkValidity()
      ? uploadData(
          [invoiceForm],
          toggleLoading,
          BASE_URL + "?action=uploadInvoicePayment",
          setInvoiceData
        )
      : form.current.reportValidity();
  };

  const setData = (key, value) => {
    dispatch(setInvoiceData({ key: key, value: value }));
  };

  const save = (e) => {
    if (form.current.checkValidity()) {
      setData("code", nanoid());
      dispatch(setInvoiceSavedData(invoiceForm));
      dispatch(
        openSnackbar({ type: "success", mesg: "Data Saved Successfully" })
      );
    } else form.current.reportValidity();
  };

  return (
    <form
      ref={form}
      className="row  mt-4 py-2 justify-content-between"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="col-lg-2 col-12 align-self-center">
        <div className="mb-4 pb-2">
          <Avatar
            src={GOOGLE_IMAGE + invoiceForm.customer.image}
            className={`mx-auto border ${classes.large}`}
          />
        </div>
      </div>
      <div className="col-lg-10 col-12">
        <section className="row align-items-center">
          <div className="col-lg-12">
            <section className="row align-items-center">
              <div className="col-md-6 col-sm-12">
                <CustomersList
                  value={invoiceForm.customer}
                  setCustomer={(e) => setData("customer", e)}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <TextField
                  value={invoiceForm.customer.mobile || ""}
                  variant="outlined"
                  label="Customer Mobile"
                  className="mb-4 pb-2 w-100"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                />
              </div>
            </section>
          </div>

          <div className="col-md-12">
            <section className="row align-items-center">
              <div className="col-md-6 col-sm-12">
                <TextField
                  value={invoiceForm.customer.detail || ""}
                  variant="outlined"
                  label="Customer Detail"
                  className="mb-4 pb-2 w-100"
                  inputProps={{
                    readOnly: true,
                    disabled: true,
                  }}
                />
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="mb-4 pb-2">
                  <ToggleButtonGroup
                    value={formType}
                    exclusive
                    onChange={(e, value) => {
                      if (value) dispatch(changeFormType(value));
                    }}
                    aria-label="text alignment"
                    className={classes.root}
                  >
                    {iaccess && (
                      <ToggleButton value="invoice">INVOICE</ToggleButton>
                    )}
                    {paccess && (
                      <ToggleButton value="payment">PAYMENT</ToggleButton>
                    )}
                  </ToggleButtonGroup>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
      <div className="col-lg-6 col-md-12 align-self-center">
        <div className="mb-4 pb-2">
          <Calendar
            date={invoiceForm.date}
            handler={(e) => setData("date", e.toString())}
          />
        </div>
      </div>
      <div className="col-lg-6 col-12">
        <section className="row align-items-center">
          <div className="col-md-12 mb-4 pb-2">
            <CurrencyList
              currency={invoiceForm.currency}
              setCurrency={(e) => setData("currency", e)}
            />
          </div>
        </section>
        {formType === "payment" && (
          <section className="row align-items-center">
            <div className="col-12">
              <TextField
                inputProps={{ className: "text-capitalize" }}
                required
                value={invoiceForm.account || ""}
                onChange={(e) => setData("account", e.target.value)}
                variant="outlined"
                label="Account"
                className="w-100 mb-4 pb-2"
              />
            </div>
          </section>
        )}
        <section className="row align-items-center">
          <div className="col-md-6 col-sm-12">
            {formType === "invoice" ? (
              <TextField
                required
                value={invoiceForm.description || ""}
                onChange={(e) => setData("description", e.target.value)}
                variant="outlined"
                label="Description"
                className="w-100 mb-4 pb-2"
              />
            ) : (
              <TextField
                required={invoiceForm.paymentType === "Other" ? false : true}
                value={invoiceForm.cheque || ""}
                type="number"
                onChange={(e) => setData("cheque", e.target.value)}
                variant="outlined"
                label="Cheque/Other No."
                className="w-100 mb-4 pb-2"
              />
            )}
          </div>
          <div className="col-md-6 col-sm-12">
            <TextField
              required
              value={invoiceForm.type}
              variant="outlined"
              select
              label="Select Type"
              className="w-100 mb-4 pb-2"
              onChange={(e) => setData("type", e.target.value)}
            >
              {transactionType.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </section>
        {formType === "invoice" && (
          <section className="row align-items-center">
            <div className="col-md-4 col-sm-12">
              <TextField
                required
                value={invoiceForm.weight || ""}
                type="number"
                onChange={(e) => setData("weight", e.target.value)}
                variant="outlined"
                label="Weight"
                className="w-100 mb-4 pb-2"
              />
            </div>
            <div className="col-md-4 col-sm-12">
              <TextField
                value={invoiceForm.tare || ""}
                type="number"
                onChange={(e) => setData("tare", e.target.value)}
                variant="outlined"
                label="Tare"
                className="w-100 mb-4 pb-2"
              />
            </div>
            <div className="col-md-4 col-sm-12">
              <TextField
                required
                value={invoiceForm.weight - invoiceForm.tare || ""}
                type="number"
                variant="outlined"
                label="Total Weight"
                className="w-100 mb-4 pb-2"
                inputProps={{
                  readOnly: true,
                  disabled: true,
                }}
              />
            </div>
          </section>
        )}

        {formType === "invoice" ? (
          <section className="row align-items-center">
            <div className="col-md-4 col-sm-12">
              <TextField
                required
                value={invoiceForm.unitPrice}
                variant="outlined"
                label="Unit Price"
                fullwidth="true"
                className="w-100 mb-4 pb-2"
                inputProps={{ min: "0.01", step: "0.01" }}
                type="number"
                onChange={(e) => setData("unitPrice", e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {invoiceForm.currency.substring(0, 3)}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="col-md-4 col-sm-12">
              <TextField
                value={invoiceForm.discount}
                variant="outlined"
                label="Discount"
                fullwidth="true"
                className="w-100 mb-4 pb-2"
                inputProps={{ min: "0.00", step: "0.01" }}
                type="number"
                onChange={(e) => setData("discount", e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {invoiceForm.currency.substring(0, 3)}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="col-md-4 col-sm-12">
              <TextField
                value={
                  (invoiceForm.weight - invoiceForm.tare) *
                    invoiceForm.unitPrice -
                    invoiceForm.discount || ""
                }
                variant="outlined"
                label="Ttl Amt"
                fullwidth="true"
                className="w-100 mb-4 pb-2"
                type="number"
                required
                inputProps={{
                  readOnly: true,
                  disabled: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {invoiceForm.currency.substring(0, 3)}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </section>
        ) : (
          <section className="row align-items-center">
            <div className="col-md-6 col-sm-12">
              <TextField
                required
                value={invoiceForm.paymentAmount}
                variant="outlined"
                label="Amount"
                fullwidth="true"
                className="w-100 mb-4 pb-2"
                inputProps={{ min: "0.01", step: "0.01" }}
                type="number"
                onChange={(e) => setData("paymentAmount", e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {invoiceForm.currency.substring(0, 3)}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <TextField
                required
                value={invoiceForm.paymentType}
                variant="outlined"
                select
                label="Payment Type"
                className="w-100 mb-4 pb-2"
                onChange={(e) => setData("paymentType", e.target.value)}
              >
                {paymentType.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </section>
        )}
      </div>
      <div className="col-12">
        <section className="row align-items-center">
          <div className="col-12">
            {formType === "payment" ? (
              <TextField
                required={invoiceForm.paymentType === "Other" ? false : true}
                value={invoiceForm.memo || ""}
                onChange={(e) => setData("memo", e.target.value)}
                variant="outlined"
                label="Memo"
                className="mb-4 pb-2 w-100"
              />
            ) : (
              <TextField
                required
                value={invoiceForm.reference || ""}
                onChange={(e) => setData("reference", e.target.value)}
                variant="outlined"
                label="Reference"
                className="mb-4 pb-2 w-100"
              />
            )}
          </div>
          <div className="col-md-8 col-sm-12">
            {formType === "payment" ? (
              <TextField
                value={invoiceForm.paymentNote || ""}
                onChange={(e) => setData("paymentNote", e.target.value)}
                variant="outlined"
                multiline
                label="Note"
                className="w-100 mb-4 pb-2"
              />
            ) : (
              <TextField
                value={invoiceForm.invoiceNote || ""}
                onChange={(e) => setData("invoiceNote", e.target.value)}
                variant="outlined"
                multiline
                label="Note"
                className="w-100 mb-4 pb-2"
              />
            )}
          </div>
          <div className="col-md-4 col-sm-12">
            <TextField
              required
              value={invoiceForm.code || ""}
              onChange={(e) => setData("code", e.target.value)}
              variant="outlined"
              label="Code"
              inputProps={{
                readOnly: true,
                disabled: true,
              }}
              className="w-100 mb-4 pb-2"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => copy(invoiceForm.code)}>
                      <FileCopyOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </section>
      </div>
      <div
        className="text-center mt-0 mt-lg-4 col-lg-6 col-md-10 col-sm-12 mx-auto p-1"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Button
          size="large"
          type="button"
          variant={theme ? "outlined" : "contained"}
          color="secondary"
          className="px-3 border-3"
          onClick={() => {
            dispatch(resetInvoiceForm());
          }}
        >
          <RotateLeftOutlinedIcon fontSize="small" />
          &nbsp;&nbsp;Reset
        </Button>

        <Button
          size="large"
          variant="contained"
          className={`px-3 mx-0 text-light bg-success`}
          onClick={save}
        >
          <SaveIcon fontSize="small" />
          &nbsp;&nbsp;Save
        </Button>
        {isOnline ? (
          <Fragment>
            <Button
              size="large"
              disabled={loading ? true : false}
              variant="contained"
              className={`bg-warning text-white`}
              onClick={submit}
            >
              {loading ? (
                // <i className="bricks-white" />
                <CircularProgress color="inherit" size="25px" thickness="5" />
              ) : (
                <span style={{ display: "flex" }}>
                  <CloudUploadOutlinedIcon />
                  <BrowserView>&nbsp;&nbsp;Upload</BrowserView>
                </span>
              )}
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              size="large"
              disabled
              variant="contained"
              className={`text-light btn-warning`}
            >
              <WifiOffRoundedIcon />
              &nbsp;&nbsp;Offline
            </Button>
          </Fragment>
        )}
      </div>
    </form>
  );
}
