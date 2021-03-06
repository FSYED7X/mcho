import React, { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { openSnackbar } from "./redux/screenSlice";
import { setBankListData, toggleBankListLoading } from "./redux/banksListSlice";
import {
  setCustomersListData,
  toggleCustomersListLoading,
  toggleDeleteLoading,
} from "./redux/customersListSlice";
import { BASE_URL } from "./urlConstants";
import { setBankData } from "./redux/bank/bankFormSlice";
import { setInvoiceData } from "./redux/invoice/invoiceFormSlice";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import { setOperatorsListData, toggleOperatorsListLoading } from "./redux/operatorsListSlice";

const Context = createContext();
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const useIt = () => {
  return useContext(Context);
};

function ContextProvider({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const date = (d) => {
    d = new Date(d);
    return d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear();
  };

  const logout = () => {
    swal({
      title: "Confirm to Logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        localStorage.clear();
        history.push("/login");
        window.location.reload();
      }
    });
  };

  const uploadData = (data, toggleLoading, URL, setCode) => {
    dispatch(toggleLoading());
    return new Promise((resolve, reject) => {
      setCode && dispatch(setCode({ key: "code", value: nanoid() }));
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        redirect: "follow",
      };
      fetch(URL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.result) {
            dispatch(
              openSnackbar({
                type: "success",
                mesg: "Data Uploaded Successfully",
              })
            );
            dispatch(toggleLoading());
            resolve();
          } else {
            dispatch(
              openSnackbar({
                type: "error",
                mesg: "Some error occured, please try again",
              })
            );
            dispatch(toggleLoading());
            reject();
          }
        })
        .catch((error) => {
          console.log("Error asd:", error);
          dispatch(
            openSnackbar({
              type: "error",
              mesg: "Some error occured, please try again",
            })
          );
          dispatch(toggleLoading());
          reject();
        });
    });
  };

  const getBanksList = () => {
    dispatch(toggleBankListLoading());
    dispatch(setBankData({ key: "acc", value: null }));
    fetch(BASE_URL + "?action=banks")
      .then((response) => response.json())
      .then((result) => {
        dispatch(toggleBankListLoading());
        dispatch(setBankListData(result.result));
        localStorage.banksList = JSON.stringify(result.result);
      })
      .catch((error) => console.log("error", error));
  };

  const getCustomersList = () => {
    dispatch(toggleCustomersListLoading());
    dispatch(
      setInvoiceData({
        key: "customers",
        value: {
          mobile: "",
          image: "",
          name: null,
          detail: "",
        },
      })
    );
    fetch(BASE_URL + "?action=customers")
      .then((response) => response.json())
      .then((result) => {
        dispatch(toggleCustomersListLoading());
        dispatch(setCustomersListData(result.result));
        localStorage.customersList = JSON.stringify(result.result);
      })
      .catch((error) => console.log("error", error));
  };

  const getOperatorsList = () => {
    dispatch(toggleOperatorsListLoading());
    fetch(BASE_URL + "?action=operators")
      .then((response) => response.json())
      .then((result) => {
        dispatch(toggleOperatorsListLoading());
        dispatch(setOperatorsListData(result.result));
        localStorage.operatorsList = JSON.stringify(result.result);
      })
      .catch((error) => console.log("error", error));
  };

  const deleteCustomer = (customers, callback) => {
    dispatch(toggleDeleteLoading());

    var raw = JSON.stringify(customers);
    console.log(raw);

    var requestOptions = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "?action=deleteCustomer", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        dispatch(toggleDeleteLoading());
        callback && callback();
        getCustomersList();
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(toggleDeleteLoading());
      });
  };

  const value = {
    date,
    logout,
    uploadData,
    getBanksList,
    getCustomersList,
    deleteCustomer,
    getOperatorsList
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ContextProvider;
