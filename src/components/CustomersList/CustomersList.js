import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { Fragment, useEffect, useState } from "react";
import "../BanksList/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useIt } from "../../Context";
import { setCustomerData } from "../../redux/bank/bankFormSlice";
import clsx from "clsx";
import { GOOGLE_IMAGE } from "../../urlConstants";
const isOnline = require("is-online");

export default function CustomersList({ value, setCustomer }) {
  const { getCustomersList } = useIt();
  const loading = useSelector((state) => state.customersList.loading);
  const data = useSelector((state) => state.customersList.data);
  const theme = useSelector((state) => state.screen.theme);

  return (
    <Autocomplete
      className={`w-100 mb-4 pb-2`}
      value={value}
      defaultValue={value}
      getOptionLabel={(option) => option.NAME || option.name}
      onChange={(event, newValue) => {
        if (newValue) {
          setCustomer({
            mobile: newValue.MOBILE,
            image: newValue.IMAGE,
            name: newValue.NAME,
            detail: newValue.DETAILS,
            row: newValue.ROW,
          });
          console.log(newValue);
        }
      }}
      renderOption={(option) => {
        console.log(option)
        return (
          option.ACTIVE && (
            <ListItem className="w-100 p-0">
              <ListItemAvatar>
                <Avatar src={GOOGLE_IMAGE + option.IMAGE} />
              </ListItemAvatar>
              <ListItemText primary={option.NAME} secondary={option.MOBILE} />
            </ListItem>
          )
        );
      }}
      filterSelectedOptions
      disabled={loading}
      options={data}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {isOnline ? (
                  <Fragment>
                    {loading ? (
                      <i
                        className={clsx({
                          "bricks-grey": theme,
                          "bricks-white": !theme,
                        })}
                      />
                    ) : (
                      <svg
                        style={{ cursor: "pointer" }}
                        onClick={getCustomersList}
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="1 4 1 10 7 10" />
                        <polyline points="23 20 23 14 17 14" />
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                      </svg>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    <svg
                      style={{ cursor: "not-allowed" }}
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-wifi-off"
                    >
                      <line x1={1} y1={1} x2={23} y2={23} />
                      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                      <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
                      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <line x1={12} y1={20} x2="12.01" y2={20} />
                    </svg>
                  </Fragment>
                )}
              </Fragment>
            ),
          }}
          label="Select Customer"
          variant="outlined"
          required
        />
      )}
    />
  );
}
