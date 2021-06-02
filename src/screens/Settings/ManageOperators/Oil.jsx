import {
  Box,
  CircularProgress,
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
import firebase from "../../../adapters/Firebase";
import { FIREBASE_USERS_IDENTIFIER } from "../../../constants";
import MUIDataTable from "mui-datatables";
import AppContext from "../../../store/AppContext/AppContext";

export default function ManageOperators() {
  const [oil, setOil] = useState();
  const [loading, setLoading] = useState(false);
  const { setDialogs, dialogs } = useContext(AppContext);
  const getOperators = () => {
    setLoading(true);
    firebase
      .database()
      .ref(FIREBASE_USERS_IDENTIFIER)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        setOil(
          Object.keys(data).map((item) => [
            data[item].email,
            data[item].uid,
            data[item].access.bank.form,
            data[item].access.bank.saved,
            data[item].access.invoice.form,
            data[item].access.payment.form,
            data[item].uid,
          ])
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getOperators();
    return () => {
      firebase.database().ref("mchoUserAccess").off();
    };
  }, []);

  return (
    <div>
      <MUIDataTable
        title="All Operators"
        data={oil}
        columns={[
          {
            name: "Email",
          },
          {
            name: "Id",
          },
          {
            name: "Bank Form",
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
            name: "Bank Saved",
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
            name: "Invoice Form",
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
            name: "Payment Form",
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
                    <IconButton
                      onClick={() => {
                        setDialogs({
                          ...dialogs,
                          operators: {
                            ...dialogs.operators,
                            edit: {
                              ...dialogs.operators.edit,
                              open: true,
                              uid: value,
                            },
                          },
                        });
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
              <Tooltip title={!loading ? "Reload" : "Loading"}>
                <IconButton onClick={getOperators}>
                  {!loading ? (
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
    </div>
  );
}
