import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIt } from "../../Context";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterListRounded";
import RefreshRoundedIcon from "@material-ui/icons/Refresh";
import {
  Avatar,
  CircularProgress,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import { GOOGLE_IMAGE } from "../../urlConstants";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import { toggleEditCustomerDialog } from "../../redux/screenSlice";
import { Fragment } from "react";
import Menu from "../../components/Menu/Menu";
import { useHistory } from "react-router";
var _ = require("lodash");

export default function ManageOperators() {
  const custs = useSelector((state) => state.operatorsList.data);
  const [operators, setoperators] = useState(custs);
  const [length, setlength] = useState();
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [searchVal, setSearchVal] = useState();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.operatorsList.loading);
  const theme = useSelector((state) => state.screen.theme);
  const [filter, setFilter] = useState("all");

  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  // useEffect(() => {
  //   !user.access.manageOperators && history.push("/noaccess");
  // }, []);

  useEffect(() => {
    if (searchVal) {
      var text = _.toLower(searchVal);
      var res = _.filter(custs, function (object) {
        return _(object)
          .omit(["IMAGE", "DETAILS"])
          .some(function (string) {
            return _(string).toLower().includes(text);
          });
      });
      setoperators(res);
    } else {
      setoperators(custs);
    }
  }, [searchVal]);

  useEffect(() => {
    if (filter === "all") {
      setoperators(custs);
    }
    if (filter === "active") {
      var res = _.filter(custs, function (object) {
        return object.STATUS;
      });
      setoperators(res);
    }
    if (filter === "inactive") {
      var res = _.filter(custs, function (object) {
        return !object.STATUS;
      });
      setoperators(res);
    }
  }, [filter]);

  // useEffect(() => {
  //   getOperatorsList();
  // }, []);

  useEffect(() => {
    setoperators(custs);
  }, [custs]);

  useEffect(() => {
    setlength(operators.filter((item) => item.STATUS).length);
  }, [operators]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = operators.filter((item) => item.STATUS);
      setSelected(newSelecteds.map((r) => r.ROW));
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          search={setSearchVal}
          selected={selected}
          resetSelected={() => setSelected([])}
          setFilter={setFilter}
          filter={filter}
        />
        <LinearProgress
          className="w-100"
          hidden={!loading}
          color={!theme ? "primary" : "secondary"}
        />
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={length}
            />
            <TableBody>
              {stableSort(operators, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.ROW);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.ROW}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => handleClick(event, row.ROW)}
                          disabled={!row.STATUS}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.EMAIL}
                      </TableCell>
                      <TableCell align="left">{row.PASSWORD}</TableCell>
                      <TableCell align="left">
                      {row.BANK ? (
                            <CheckCircleOutlinedIcon className="text-success" />
                          ) : (
                            <HighlightOffOutlinedIcon className="text-danger" />
                          )}
                      </TableCell>
                      <TableCell align="left">
                      {row.BANK_FORM ? (
                            <CheckCircleOutlinedIcon className="text-success" />
                          ) : (
                            <HighlightOffOutlinedIcon className="text-danger" />
                          )}
                      </TableCell>
                      <TableCell align="left">
                        <IconButton size="medium" disabled>
                          {row.INVOICE ? (
                            <CheckCircleOutlinedIcon className="text-success" />
                          ) : (
                            <HighlightOffOutlinedIcon className="text-danger" />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton size="medium" disabled>
                          {row.PAYMENT ? (
                            <CheckCircleOutlinedIcon className="text-success" />
                          ) : (
                            <HighlightOffOutlinedIcon className="text-danger" />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton size="medium" disabled>
                          {row.INVOICE_PAYMENT_SAVED ? (
                            <CheckCircleOutlinedIcon className="text-success" />
                          ) : (
                            <HighlightOffOutlinedIcon className="text-danger" />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton size="medium" disabled>
                          {row.manageBanks ? (
                            <CheckCircleOutlinedIcon className="text-success" />
                          ) : (
                            <HighlightOffOutlinedIcon className="text-danger" />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton size="medium" disabled>
                          {row.manageCustomers ? (
                            <CheckCircleOutlinedIcon className="text-success" />
                          ) : (
                            <HighlightOffOutlinedIcon className="text-danger" />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton size="medium" disabled>
                          {row.manageOperators ? (
                            <CheckCircleOutlinedIcon className="text-success" />
                          ) : (
                            <HighlightOffOutlinedIcon className="text-danger" />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          onClick={() =>
                            dispatch(toggleEditCustomerDialog(row))
                          }
                        >
                          <EditRoundedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const operators = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  {
    id: "EMAIL",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  { id: "PASSWORD", numeric: false, disablePadding: false, label: "Password" },
  { id: "BANK", numeric: true, disablePadding: false, label: "BNK FRM" },
  {
    id: "BANK_SAVED",
    numeric: true,
    disablePadding: false,
    label: "BNK SV",
  },
  {
    id: "INVOICE",
    numeric: true,
    disablePadding: false,
    label: "INV FRM",
  },
  {
    id: "PAYMENT",
    numeric: true,
    disablePadding: false,
    label: "PYMT FRM",
  },
  {
    id: "INVOICE_PAYMENT_SAVED",
    numeric: true,
    disablePadding: false,
    label: "INV PYT SV",
  },
  {
    id: "MANAGE_BANKS",
    numeric: true,
    disablePadding: false,
    label: "MNG BNK",
  },
  {
    id: "MANAGE_CUSTOMERS",
    numeric: true,
    disablePadding: false,
    label: "MNG CUSTS",
  },
  {
    id: "MANAGE_OPERATORS",
    numeric: true,
    disablePadding: false,
    label: "MNG OPRS",
  },
  {
    id: "edit",
    numeric: true,
    disablePadding: false,
    label: "Edit",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all operators" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = ({
  numSelected,
  selected,
  resetSelected,
  search,
  setFilter,
  filter,
}) => {
  const classes = useToolbarStyles();
  const { deleteCustomer, getOperatorsList } = useIt();
  const loading = useSelector((state) => state.operatorsList.deleteLoading);
  const [menu, setMenu] = useState(null);
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <TextField
            onChange={(e) => search(e.target.value)}
            placeholder="Search"
            className="w-50"
            size="small"
            variant="outlined"
          />
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => deleteCustomer(selected, resetSelected)}
          >
            {!loading ? (
              <DeleteIcon />
            ) : (
              <CircularProgress size="20px" thickness={5} color="inherit" />
            )}
          </IconButton>
        </Tooltip>
      ) : (
        <Fragment>
          <Tooltip title="Filter List">
            <IconButton
              aria-label="filter list"
              onClick={(event) => setMenu(event.currentTarget)}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Refresh">
            <IconButton aria-label="Refresh" onClick={getOperatorsList}>
              <RefreshRoundedIcon />
            </IconButton>
          </Tooltip>
          <Menu
            menu={menu}
            closeMenu={() => setMenu(null)}
            setFilter={setFilter}
            filter={filter}
          />
        </Fragment>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    // marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  container: {
    height: "74vh",
  },
}));
