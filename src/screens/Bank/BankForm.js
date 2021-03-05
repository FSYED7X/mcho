import Calendar from "../../components/Calendar/Calendar";
import React, { useEffect, useRef, useState } from "react";
import CurrencyList from "../../components/CurrencyList/CurrencyList";
import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setBankData, resetBankForm } from "../../redux/bank/bankFormSlice";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import RotateLeftOutlinedIcon from "@material-ui/icons/RotateLeftOutlined";
import SaveIcon from "@material-ui/icons/Save";
import { openSnackbar, toggleLoading } from "../../redux/screenSlice";
import { Offline, Online } from "react-detect-offline";
import ToggleButtons from "../../components/ToggleButtons/ToggleButtons";
import WifiOffRoundedIcon from "@material-ui/icons/WifiOffRounded";
import { setbankSavedData } from "../../redux/bank/bankSavedDataSlice";
import { useIt } from "../../Context";
import BanksList from "../../components/BanksList/BanksList";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import copy from "copy-to-clipboard";
import { nanoid } from "nanoid";
import { BASE_URL } from "../../urlConstants";
import { useHistory } from "react-router-dom";

const transactionType = ["Cash", "Cheque", "ATM Online", "Pay Order", "Other"];

function BankForm() {
  const theme = useSelector((state) => state.screen.theme);
  const dispatch = useDispatch();
  const bankForm = useSelector((state) => state.bankForm);
  const amount = useRef();
  const form = useRef();
  const [selectedValue, setSelectedValue] = useState(
    bankForm.debit ? "debit" : "credit"
  );
  const loading = useSelector((state) => state.screen.loading);
  const { uploadData, getBanksList } = useIt();
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.banksList) getBanksList();
    !user.access.bank && history.push("/noaccess");
  }, []);

  const submit = (e) => {
    e.preventDefault();
    form.current.checkValidity()
      ? uploadData(
          [bankForm],
          toggleLoading,
          BASE_URL + "?action=upload",
          setBankData
        )
      : form.current.reportValidity();
  };

  const save = (e) => {
    if (form.current.checkValidity()) {
      setData("code", nanoid());
      dispatch(setbankSavedData(bankForm));
      dispatch(
        openSnackbar({ type: "success", mesg: "Data Saved Successfully" })
      );
    } else form.current.reportValidity();
  };

  const setData = (key, value) => {
    dispatch(setBankData({ key: key, value: value }));
  };

  return (
    <React.Fragment>
      <form
        ref={form}
        className="row mt-3 justify-content-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="col-lg-6 col-12">
          <BanksList />
        </div>

        <div className="col-lg-6 col-sm-12">
          <div className="mb-4 pb-2">
            <CurrencyList
              currency={bankForm.currency}
              setCurrency={(e) => setData("currency", e)}
            />
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <TextField
            required={bankForm.type === "Other" ? false : true}
            value={bankForm.payeeBank || ""}
            onChange={(e) => setData("payeeBank", e.target.value)}
            variant="outlined"
            label="Payee's Bank"
            className="w-100 mb-4 pb-2"
            inputProps={{ className: "text-capitalize" }}
          />
        </div>
        <div className="col-lg-6 col-sm-12">
          <TextField
            required
            value={bankForm.payee || ""}
            onChange={(e) => setData("payee", e.target.value)}
            variant="outlined"
            label="Payee Name"
            className="w-100  mb-4 pb-2"
            inputProps={{ className: "text-capitalize" }}
          />
        </div>
        <div className="col-lg-6 col-sm-12 align-self-center">
          <div className="mb-4 pb-2">
            <Calendar
              date={bankForm.date}
              handler={(e) => setData("date", e.toString())}
            />
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <section className="row align-items-center">
            <div className="col-lg-6 col-sm-12">
              <TextField
                required={bankForm.type === "Other" ? false : true}
                value={bankForm.cheque || ""}
                type="number"
                onChange={(e) => setData("cheque", e.target.value)}
                variant="outlined"
                label="Cheque/Other no:"
                className="w-100 mb-4 pb-2"
              />
            </div>
            <div className="col-lg-6 col-sm-12">
              <TextField
                required
                value={bankForm.type}
                variant="outlined"
                select
                label="Select Type"
                className="w-100 mb-4 pb-2"
                onChange={(e) => setData("type", e.target.value)}
              >
                {transactionType.map((item) => (
                  <MenuItem key={item} value={item}>
                    {" "}
                    {item}{" "}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </section>
          <section className="row align-items-center">
            <div className="col-lg-6 col-sm-12">
              <TextField
                value={bankForm[selectedValue]}
                inputRef={amount}
                variant="outlined"
                label="Amount:"
                fullwidth="true"
                className="w-100 mb-4 pb-2"
                inputProps={{ min: "0.01", step: "0.01" }}
                type="number"
                required
                onChange={(e) => setData(selectedValue, e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {bankForm.currency.substring(0, 3)}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className=" mb-4 pb-2">
                <ToggleButtons
                  value={selectedValue}
                  setValue={(e) => setSelectedValue(e)}
                  amount={amount}
                />
              </div>
            </div>
          </section>
          <section className="row align-items-center">
            <div className="col-md-12">
              <TextField
                value={bankForm.note1 || ""}
                onChange={(e) => setData("note1", e.target.value)}
                variant="outlined"
                label="Note 1:"
                className="mb-4 pb-2 w-100"
              />
            </div>

            <div className="col-md-12">
              <TextField
                value={bankForm.note2 || ""}
                onChange={(e) => setData("note2", e.target.value)}
                variant="outlined"
                label="Note 2:"
                className="mb-4 pb-2 w-100"
              />
            </div>
          </section>
        </div>
        <div className="col-12">
          <section className="row align-items-center">
            <div className="col-md-8 col-sm-12">
              <TextField
                required={bankForm.type === "Other" ? false : true}
                value={bankForm.memo || ""}
                onChange={(e) => setData("memo", e.target.value)}
                variant="outlined"
                multiline
                label="Memo"
                className="w-100 mb-4"
              />
            </div>
            <div className="col-md-4 col-sm-12">
              <TextField
                required
                value={bankForm.code || ""}
                onChange={(e) => setData("code", e.target.value)}
                variant="outlined"
                label="Code"
                className="w-100 mb-4"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => copy(bankForm.code)}>
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
              dispatch(resetBankForm());
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

          <Online>
            <Button
              size="large"
              disabled={loading ? true : false}
              variant="contained"
              className={`bg-warning text-white`}
              onClick={submit}
            >
              {loading ? (
                <i className="bricks-white" />
              ) : (
                <span style={{ display: "flex" }}>
                  <CloudUploadOutlinedIcon /> &nbsp;&nbsp;Upload
                </span>
              )}
            </Button>
          </Online>

          <Offline>
            <Button
              size="large"
              disabled
              variant="contained"
              className={`text-light btn-warning`}
            >
              <WifiOffRoundedIcon />
              &nbsp;&nbsp;Offline
            </Button>
          </Offline>
        </div>
      </form>
    </React.Fragment>
  );
}

export default BankForm;
