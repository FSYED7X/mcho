import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  TableCell,
  TableHead,
  Tooltip,
} from "@material-ui/core";
import {
  CheckCircleOutlineRounded,
  EditRounded,
  NotInterestedOutlined,
  RefreshOutlined,
  RefreshRounded,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useIt } from "../../../Context";
import MUIDataTable from "mui-datatables";

const _ = require("lodash");

export default function ManageBanks() {
  const bankList = useSelector((state) => state.banksList.data);
  const isLoading = useSelector((state) => state.banksList.loading);
  const { getBanksList } = useIt();
  const [oil, setOil] = useState([]);

  useEffect(() => {
    setOil(
      bankList.map((item, index) => [
        item.BANK_NAME,
        item.CODE,
        item.BALANCE,
        item.STATUS,
        item.TYPE,
      ])
    );
    // console.log(oil);
  }, [bankList]);

  useEffect(() => {
    _.isEmpty(bankList) && getBanksList();
    // console.log(bankList);
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
              //   filter: false,
            },
          },
          {
            name: "Code",
            options: {
              //   filter: false,
            },
          },
          {
            name: "Balance",
            options: {
              //   filter: false,
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
                  <Box textAlign="center">
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
                    <Box textAlign="center">{columnMeta.name}</Box>
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
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Box textAlign="center">
                    <IconButton onClick={() => {}}>
                      <EditRounded />
                    </IconButton>
                  </Box>
                );
              },
              customHeadRender: (columnMeta) => {
                return (
                  <TableCell>
                    <Box textAlign="center">{columnMeta.name}</Box>
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
                <IconButton onClick={getBanksList}>
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
