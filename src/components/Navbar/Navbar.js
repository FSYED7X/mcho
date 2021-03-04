import { Badge, Button, Checkbox, IconButton, Paper } from "@material-ui/core";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import {
  toggleAddBankDialog,
  toggleAddCustomerDialog,
} from "../../redux/screenSlice";
import { BrowserView, MobileView } from "react-device-detect";
import QueueRoundedIcon from "@material-ui/icons/QueueRounded";
import BookmarksRoundedIcon from "@material-ui/icons/BookmarksRounded";
import WifiOffRoundedIcon from "@material-ui/icons/WifiOffRounded";
import { Offline, Online } from "react-detect-offline";

import {
  removeBankAllRequest,
  selectAllBankRequests,
  bankSavedToggleLoading,
} from "../../redux/bank/bankSavedDataSlice";
import {
  removePaymentAllRequest,
  selectAllPaymentRequests,
  paymentSavedToggleLoading,
} from "../../redux/payment/paymentSavedDataSlice";
import {
  removeInvoiceAllRequest,
  selectAllInvoiceRequests,
  invoiceSavedToggleLoading,
} from "../../redux/invoice/invoiceSavedDataSlice";

import BackupRoundedIcon from "@material-ui/icons/BackupRounded";
import { useIt } from "../../Context";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import { BASE_URL } from "../../urlConstants";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
function Navbar() {
  const location = useLocation();
  const history = useHistory();
  const theme = useSelector((state) => state.screen.theme);

  const bankSavedData = useSelector((state) => state.bankSavedData.value);
  const savedBankLoading = useSelector((state) => state.bankSavedData.loading);
  const bankRequests = useSelector((state) => state.bankSavedData.requests);

  const invoiceSavedData = useSelector((state) => state.invoiceSavedData.value);
  const savedInvoiceLoading = useSelector(
    (state) => state.invoiceSavedData.loading
  );
  const invoiceRequests = useSelector(
    (state) => state.invoiceSavedData.requests
  );

  const paymentSavedData = useSelector((state) => state.paymentSavedData.value);
  const savedPaymentLoading = useSelector(
    (state) => state.paymentSavedData.loading
  );
  const paymentRequests = useSelector(
    (state) => state.paymentSavedData.requests
  );

  const dispatch = useDispatch();
  const { uploadData } = useIt();

  const uploadBankData = () => {
    var data = [];
    bankRequests.map((index) =>
      data.push(JSON.parse(JSON.stringify(bankSavedData[index].data)))
    );
    uploadData(data, bankSavedToggleLoading, BASE_URL + "?action=upload").then(
      (r) => {
        dispatch(removeBankAllRequest());
      }
    );
  };

  const uploadInvoiceData = () => {
    var data = [];
    invoiceRequests.map((index) =>
      data.push(JSON.parse(JSON.stringify(invoiceSavedData[index].data)))
    );
    uploadData(
      data,
      invoiceSavedToggleLoading,
      BASE_URL + "?action=uploadInvoicePayment"
    ).then((r) => {
      dispatch(removeInvoiceAllRequest());
    });
  };

  const uploadPaymentData = () => {
    var data = [];
    paymentRequests.map((index) =>
      data.push(JSON.parse(JSON.stringify(paymentSavedData[index].data)))
    );
    uploadData(data, paymentSavedToggleLoading, BASE_URL).then((r) => {
      dispatch(removePaymentAllRequest());
    });
  };

  const aside = {
    "/bank/form": {
      title: "Bank",
      icon: <AccountBalanceRoundedIcon />,
      action: "",
    },
    "/bank/saved": {
      title: "Bank Saved",
      icon: <ArrowBackRoundedIcon />,
      action: () => history.push("/bank/form"),
    },
    "/invoice/form": {
      title: "Invoice",
      icon: <ReceiptRoundedIcon />,
      action: "",
    },
    "/invoice/saved": {
      title: (
        <Fragment>
          <MobileView>Saved</MobileView>
          <BrowserView>Invoice & Payments Saved</BrowserView>
        </Fragment>
      ),
      icon: <ArrowBackRoundedIcon />,
      action: () => history.push("/invoice/form"),
    },
    "/payment/form": {
      title: "Payments",
      icon: <AccountBalanceWalletRoundedIcon />,
      action: "",
    },
    "/payment/saved": {
      title: "Payments Saved",
      icon: <ArrowBackRoundedIcon />,
      action: () => history.push("/payment/form"),
    },
    "/settings": {
      title: "Settings",
      icon: <SettingsRoundedIcon />,
      action: "",
    },
    "/noaccess": {
      title: "Access Blocked",
      icon: <ErrorOutlineOutlinedIcon color="secondary" />,
      action: "",
    },
  }[location.pathname];

  const asideButton = {
    "/bank/form": (
      <Button
        className="px-2 px-lg-3"
        variant="contained"
        color={theme ? "primary" : "secondary"}
        onClick={() => dispatch(toggleAddBankDialog())}
      >
        <QueueRoundedIcon />
        <BrowserView>&nbsp;&nbsp;ADD</BrowserView>
      </Button>
    ),
    "/bank/saved": (
      <Button
        disabled={savedBankLoading}
        hidden={!bankRequests.length}
        onClick={uploadBankData}
        type="button"
        variant="contained"
        className="bg-warning text-white px-2 px-lg-3"
      >
        {savedBankLoading ? (
          <Fragment>
            Uploading
            <i className="bricks-white ml-4 mr-2" />
          </Fragment>
        ) : (
          <Fragment>
            <BackupRoundedIcon />
            <BrowserView>&nbsp;&nbsp;Upload</BrowserView>
          </Fragment>
        )}
      </Button>
    ),
    "/invoice/form": (
      <Button
        className="px-2 px-lg-3"
        variant="contained"
        color={theme ? "primary" : "secondary"}
        onClick={() => dispatch(toggleAddCustomerDialog())}
      >
        <PersonAddRoundedIcon />
        <BrowserView>&nbsp;&nbsp;ADD</BrowserView>
      </Button>
    ),
    "/invoice/saved": (
      <Button
        disabled={savedInvoiceLoading}
        hidden={!invoiceRequests.length}
        onClick={uploadInvoiceData}
        type="button"
        variant="contained"
        className="bg-warning text-white px-2 px-lg-3"
      >
        {savedInvoiceLoading ? (
          <Fragment>
            Uploading
            <i className="bricks-white ml-4 mr-2" />
          </Fragment>
        ) : (
          <Fragment>
            <BackupRoundedIcon />
            <BrowserView>&nbsp;&nbsp;Upload</BrowserView>
          </Fragment>
        )}
      </Button>
    ),
    "/payment/form": (
      <Button
        className="px-2 px-lg-3"
        variant="contained"
        color={theme ? "primary" : "secondary"}
        onClick={() => dispatch(toggleAddCustomerDialog())}
      >
        <PersonAddRoundedIcon />
        <BrowserView>&nbsp;&nbsp;ADD</BrowserView>
      </Button>
    ),
    "/payment/saved": (
      <Button
        disabled={savedPaymentLoading}
        hidden={!paymentRequests.length}
        onClick={uploadPaymentData}
        type="button"
        variant="contained"
        className="bg-warning text-white px-2 px-lg-3"
      >
        {savedPaymentLoading ? (
          <Fragment>
            Uploading
            <i className="bricks-white ml-4 mr-2" />
          </Fragment>
        ) : (
          <Fragment>
            <BackupRoundedIcon />
            <BrowserView>&nbsp;&nbsp;Upload</BrowserView>
          </Fragment>
        )}
      </Button>
    ),
  }[location.pathname];

  const asideIconButton = {
    "/bank/form": (
      <IconButton onClick={() => history.push("/bank/saved")}>
        <Badge badgeContent={bankSavedData.length} color="secondary">
          <BookmarksRoundedIcon />
        </Badge>
      </IconButton>
    ),
    "/bank/saved": bankSavedData.length > 0 && (
      <Checkbox
        color="primary"
        checked={
          bankSavedData.length === bankRequests.length &&
          bankRequests.length > 0
        }
        onChange={(e) => dispatch(selectAllBankRequests(e.target.checked))}
        disabled={savedBankLoading ? true : false}
      />
    ),
    "/invoice/form": (
      <IconButton onClick={() => history.push("/invoice/saved")}>
        <Badge badgeContent={invoiceSavedData.length} color="secondary">
          <BookmarksRoundedIcon />
        </Badge>
      </IconButton>
    ),
    "/invoice/saved": invoiceSavedData.length > 0 && (
      <Checkbox
        color="primary"
        checked={
          invoiceSavedData.length === invoiceRequests.length &&
          invoiceRequests.length > 0
        }
        onChange={(e) => dispatch(selectAllInvoiceRequests(e.target.checked))}
        disabled={savedInvoiceLoading ? true : false}
      />
    ),
    "/payment/form": (
      <IconButton onClick={() => history.push("/payment/saved")}>
        <Badge badgeContent={paymentSavedData.length} color="secondary">
          <BookmarksRoundedIcon />
        </Badge>
      </IconButton>
    ),
    "/payment/saved": paymentSavedData.length > 0 && (
      <Checkbox
        color="primary"
        className="mx-4"
        checked={
          paymentSavedData.length === paymentRequests.length &&
          paymentRequests.length > 0
        }
        onChange={(e) => dispatch(selectAllPaymentRequests(e.target.checked))}
        disabled={savedPaymentLoading ? true : false}
      />
    ),
  }[location.pathname];

  return (
    <nav
      className="sticky-top mb-4 pb-2"
      style={{
        boxShadow: `0px -19px 5px 0px ${
          theme ? "rgba(250,250,250,1)" : "rgba(48, 48, 48, 1)"
        }`,
      }}
    >
      <Paper
        className="row m-0 align-items-center border px-1 px-lg-3 py-1 justify-content-between"
        elevation={0}
      >
        <section className="col-lg-8 col-6">
          {aside && (
            <div className="row align-items-center">
              <div className="col-* mr-2">
                <IconButton onClick={aside.action}>{aside.icon}</IconButton>
              </div>
              <div className="navbar-brand col-*">{aside.title}</div>
            </div>
          )}
        </section>
        <section className="col-lg-4 col-6 justify-sel text-right">
          {asideIconButton}
          <Online>&nbsp;&nbsp;&nbsp;&nbsp;{asideButton}</Online>

          <Offline>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              type="button"
              disabled
              variant="contained"
              className="bg-warning text-white"
            >
              <WifiOffRoundedIcon />
              <BrowserView>&nbsp;&nbsp;Offline</BrowserView>
            </Button>
          </Offline>
        </section>
      </Paper>
    </nav>
  );
}

export default Navbar;
