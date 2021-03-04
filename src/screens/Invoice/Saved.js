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
  individualInvoiceRequestSelect,
  removeInvoiceSingleRequests,
} from "../../redux/invoice/invoiceSavedDataSlice";
import { setInvoice } from "../../redux/invoice/invoiceFormSlice";
import { useHistory } from "react-router-dom";
import { useIt } from "../../Context";
import { BrowserView } from "react-device-detect";

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

function Saved() {
  const dispatch = useDispatch();
  const invoiceSavedData = useSelector((state) => state.invoiceSavedData.value);
  const loading = useSelector((state) => state.invoiceSavedData.loading);
  const theme = useSelector((state) => state.screen.theme);
  const classes = useStyles();
  const history = useHistory();
  const { date } = useIt();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    !user.access.invoice && !user.access.payment && history.push("/noaccess");
  }, [user]);

  useEffect(() => {
    document.querySelector("body").scrollTo(0, 0);
  });

  const edit = (item, index) => {
    history.push("/invoice/form");
    var a = item.data;
    dispatch(setInvoice(a));
    dispatch(removeInvoiceSingleRequests(index));
  };
  return (
    <Fragment>
      {invoiceSavedData.length === 0 && (
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
        {invoiceSavedData.map((item, index) => (
          <Paper
            key={index}
            className="mb-4 p-2 row p-0 m-0 align-items-center justify-content-between"
          >
            <div className="col-lg-6 col-sm-12">
              <div>
                <small>{date(item.data.date)}</small>&nbsp;&nbsp;&nbsp;
                <small>
                  {item.data.customer.mobile + " || " + item.data.customer.name}
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
                  {currencyFormatter.format(item.data.paymentAmount, {
                    code: item.data.currency.substring(0, 3),
                  })}
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
              <BrowserView>
                <div
                  className="my-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {item.data.weight && (
                    <table
                      border="1"
                      cellPadding="10"
                      className={!theme && "text-light"}
                    >
                      <tr className="text-center">
                        <th>WGT</th>
                        <th>TARE</th>
                        <th>T WGT</th>
                        <th>PRICE</th>
                        <th>DISC</th>
                        <th>T AMT</th>
                      </tr>
                      <tr className="text-center">
                        <td>{item.data.weight}</td>
                        <td>{item.data.tare}</td>
                        <td>{item.data.weight - item.data.tare}</td>
                        <td>{item.data.unitPrice}</td>
                        <td>{item.data.discount}</td>
                        <td>
                          {Math.round(
                            (item.data.weight - item.data.tare) *
                              item.data.unitPrice -
                              item.data.discount,
                            2
                          )}
                        </td>
                      </tr>
                    </table>
                  )}
                </div>
              </BrowserView>

              {/* <div>
                                <b className={classes.payee}>{item.data.payee}</b>
                            </div> */}
            </div>

            <div className="col-lg-6 col-sm-* text-right align-items-center">
              <Chip
                className={`text-light ${
                  item.data.memo ? "bg-success px-1" : "bg-danger px-2"
                }  mx-2`}
                size="small"
                label={item.data.memo ? "PAYMENT" : "INVOICE"}
              />

              <IconButton
                onClick={() => dispatch(removeInvoiceSingleRequests(index))}
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
                  dispatch(individualInvoiceRequestSelect(e.target))
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

export default Saved;
