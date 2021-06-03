import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  TableCell,
  Tooltip,
} from "@material-ui/core";
import {
  CheckCircleOutlineRounded,
  EditRounded,
  NotInterestedOutlined,
  RefreshOutlined,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIt } from "../../../Context";
import MUIDataTable from "mui-datatables";
import { GOOGLE_IMAGE } from "../../../urlConstants";
import { toggleEditCustomerDialog } from "../../../redux/screenSlice";
import AppContext from "../../../store/AppContext/AppContext";

const _ = require("lodash");

export default function ManageBanks() {
  const customerList = useSelector((state) => state.customersList.data);
  const isLoading = useSelector((state) => state.customersList.loading);
  const { getCustomersList } = useIt();
  const [oil, setOil] = useState([]);
  const dispatch = useDispatch();
  const { issm, isxs } = useContext(AppContext);
  const [align, setAlign] = useState("left");

  useEffect(() => {
    setAlign(issm || isxs ? "center" : "left");
  }, [issm, isxs]);

  useEffect(() => {
    setOil(
      customerList.map((item, index) => [
        item.NAME,
        item.IMAGE,
        item.MOBILE,
        item.PAYMENT_AMOUNT,
        item.INVOICE_AMOUNT,
        item.STATUS,
        item.ROW,
      ])
    );
  }, [customerList]);

  useEffect(() => {
    _.isEmpty(customerList) && getCustomersList();
  }, []);

  return (
    <section>
      <MUIDataTable
        title="Banks Data"
        data={oil}
        columns={[
          {
            name: "Name",
            options: {
            },
          },
          {
            name: "Image",
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Grid justify={align} container>
                    <Avatar src={GOOGLE_IMAGE + value} />
                  </Grid>
                );
              },
              customHeadRender: (columnMeta) => {
                return (
                  <TableCell>
                    <Box textAlign={align}>{columnMeta.name}</Box>
                  </TableCell>
                );
              },
            },
          },
          {
            name: "Mobile",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return <span style={{ letterSpacing: "0.1em" }}>{value}</span>;
              },
            },
          },
          {
            name: "Pymt Amt",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <span style={{ letterSpacing: "0.1em" }}>
                    {(value + 0.5) | 0}
                  </span>
                );
              },
            },
          },
          {
            name: "Inv Amt",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <span style={{ letterSpacing: "0.1em" }}>
                    {(value + 0.5) | 0}
                  </span>
                );
              },
            },
          },
          {
            name: "Active",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Box textAlign={align}>
                    {value ? (
                      <CheckCircleOutlineRounded color="primary" />
                    ) : (
                      <NotInterestedOutlined color="error" />
                    )}
                  </Box>
                );
              },
              customHeadRender: (columnMeta) => {
                return (
                  <TableCell>
                    <Box textAlign={align}>{columnMeta.name}</Box>
                  </TableCell>
                );
              },
            },
          },
          {
            name: "Edit",
            options: {
              sort: false,
              filter: false,
              print: false,
              download: false,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Box textAlign={align}>
                    <IconButton
                      onClick={() => {
                        dispatch(toggleEditCustomerDialog(value));
                      }}
                    >
                      <EditRounded />
                    </IconButton>
                  </Box>
                );
              },
              customHeadRender: (columnMeta) => {
                return (
                  <TableCell>
                    <Box textAlign={align}>{columnMeta.name}</Box>
                  </TableCell>
                );
              },
            },
          },
        ]}
        options={{
          fixedSelectColumn: true,
          downloadOptions: {
            filename: "MCHO BANKS LIST.csv",
          },
          selectableRowsHeader: true,
          selectableRows: "multiple",
          customToolbar: () => {
            return (
              <Tooltip title={!isLoading ? "Reload" : "Loading"}>
                <IconButton onClick={getCustomersList}>
                  {!isLoading ? (
                    <RefreshOutlined />
                  ) : (
                    <CircularProgress size="23px" />
                  )}
                </IconButton>
              </Tooltip>
            );
          },
        }}
      />
    </section>
  );
}
