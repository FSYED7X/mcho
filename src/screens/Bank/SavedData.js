import {
  Checkbox,
  Chip,
  IconButton,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import {
  individualBankRequestSelect,
  removeBankSingleRequests,
} from "../../redux/bank/bankSavedDataSlice";
import { setBank } from "../../redux/bank/bankFormSlice";
import { useHistory } from "react-router-dom";
import { useIt } from "../../Context";

var currencyFormatter = require("currency-formatter");

const useStyles = makeStyles((theme) => ({
  flag: {
    height: "18px",
  },
  payee: {
    textTransform: "capitalize",
  },
  gif: {
    width: "fit-content",
    margin: "auto",
    padding: "2% 5%",
  },
}));

function SavedData() {
  const dispatch = useDispatch();
  const bankSavedData = useSelector((state) => state.bankSavedData.value);
  const loading = useSelector((state) => state.bankSavedData.loading);
  const theme = useSelector((state) => state.screen.theme);
  const classes = useStyles();
  const history = useHistory();
  const { date } = useIt();
  const user = useSelector((state) => state.auth.user);
  
  useEffect(() => {
    document.querySelector("body").scrollTo(0, 0);
    !user.access.bank && history.push("/noaccess");
  });

  const edit = (item, index) => {
    history.push("/bank/form");
    var a = item.data;
    dispatch(setBank(a));
    dispatch(removeBankSingleRequests(index));
  };
  return (
    <Fragment>
      {bankSavedData.length === 0 && (
        <Paper className={classes.gif}>
          {
            theme
              ? "nodata"
              : // <img src='/EmptyLight.gif' style={{ height: '50%', objectFit: 'contain', margin: 'auto' }} alt='' />
                "nodata"
            // <img src='/EmptyDark.gif' style={{ height: '50%', objectFit: 'contain', margin: 'auto' }} alt='' />
          }
        </Paper>
      )}

      <section className="">
        {bankSavedData.map((item, index) => (
          <Paper
            key={index}
            className="mb-4 p-2 row p-0 m-0 align-items-center justify-content-between"
          >
            <div className="col-lg-6 col-sm-12">
              <div>
                <small>{date(item.data.date)}</small>&nbsp;&nbsp;&nbsp;
                <small>
                  {item.data.acc.CODE + " || " + item.data.acc.BANK_NAME}
                </small>
              </div>

              <div
                className="my-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  className={`border ${classes.flag}`}
                  src={`/flags/${item.data.currency.substring(0, 3)}.png`}
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/flags/default.png";
                  }}
                />
                &nbsp;&nbsp;&nbsp;
                <b>
                  {currencyFormatter.format(
                    item.data.credit ? item.data.credit : item.data.debit,
                    { code: item.data.currency.substring(0, 3) }
                  )}
                </b>
                <b>&nbsp;&nbsp;{item.data.type}</b>
                &nbsp;&nbsp;
                {item.data.cheque && (
                  <Chip
                    label={item.data.cheque}
                    size="small"
                    variant="outlined"
                  />
                )}
              </div>

              <div>
                <b className={classes.payee}>{item.data.payee}</b>
              </div>
            </div>

            <div className="col-lg-6 col-sm-* text-right align-items-center">
              <Chip
                className={`text-light ${
                  item.data.credit ? "bg-success px-1" : "bg-danger px-2"
                }  mx-2`}
                size="small"
                label={item.data.credit ? "CREDIT" : "DEBIT"}
              />

              <IconButton
                onClick={() => dispatch(removeBankSingleRequests(index))}
              >
                <DeleteRoundedIcon />
              </IconButton>

              <IconButton onClick={() => edit(item, index)}>
                <CreateRoundedIcon />
              </IconButton>

              <Checkbox
                color="primary"
                value={index}
                checked={item.checked}
                onChange={(e) =>
                  dispatch(individualBankRequestSelect(e.target))
                }
                disabled={loading ? true : false}
              />
            </div>
          </Paper>
        ))}
      </section>
    </Fragment>
  );
}

export default SavedData;
