import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Stack } from "@mui/system";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../api";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AlertDialogSlide from "../AlertDialogSlide";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import DATA from "../../assets/data/subscriptionPlan";
import {ReportDownload} from "./ReportDownload";
import { Report } from "@mui/icons-material";

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "User ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Full Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email Address",
  },
  {
    id: "predictionCount",
    numeric: true,
    disablePadding: false,
    label: "Prediction Count",
  },
  {
    id: "predictionCountLimit",
    numeric: true,
    disablePadding: false,
    label: "Prediction Count Limit",
  },
  {
    id: "subscriptionPlan",
    numeric: false,
    disablePadding: false,
    label: "Subscription Plan",
  },
  {
    id: "subscriptionStatus",
    numeric: true,
    disablePadding: false,
    label: "Subscription Status",
  },
  {
    id: "userVeryfied",
    numeric: true,
    disablePadding: false,
    label: "Account Status",
  },
];

function EnhancedTableHead(props) {
  const {
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
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  labelTxt: {
    color: "#000000",
    whiteSpace: "nowrap",
    fontSize: "12px",
    fontWeight: "500",
  },
  detailsTxt: {
    color: "#000000",
    whiteSpace: "nowrap",
    fontSize: "14px",
  },
  itemBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
function EnhancedTableToolbar({
  selected,
  selectedUser,
  hasChanged,
  setHasChanged,
  setToggle,
  toggle,
  setSearchTxt,
  searchTxt,
}) {
  const classes = useStyles();
  const [subPlan, setSubPlan] = React.useState("");
  const [subStatus, setSubStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [handleConfirm, setHandleConfirm] = React.useState(false);
  const [titleBox, setTitleBox] = React.useState("");
  const [contentBox, setContentBox] = React.useState("");
  const [apiName, setApiName] = React.useState("");
  const [todayDate, setTodayDate] = React.useState("");
  const [dataToReport, setDataToReport] = React.useState(false);

  const getPlanInfo = (type) => {
    let planInfo = DATA.filter((item) => item.plan === type);
    return planInfo[0];
  };

  useEffect(() => {
    setTodayDate(new Date().toISOString());
    if (selected?.length === 1) {
      setSubPlan(selectedUser?.subscriptionPlan);
      setSubStatus(selectedUser?.subscriptionStatus);
    }
  }, [selectedUser]);

  const handleSearch = (event) => {
    setSearchTxt(event.target.value);
  };

  const handleSubcriptionPlanChange = (event) => {
    setSubPlan(event.target.value);
    setHasChanged(true);
  };

  const handleSubcriptionStatusChange = (event) => {
    setSubStatus(event.target.value);
    setHasChanged(true);
  };

  const handleDelete = () => {
    if (selected?.length === 1) {
      setTitleBox("Please Confrim");
      setContentBox("Are you sure you want to delete this user?");
    } else {
      setTitleBox("Please Confrim");
      setContentBox("Are you sure you want to delete these users?");
    }
    setApiName("deleteUser");
    setOpen(true);
  };

  const handleUpdate = () => {
    if (selected?.length === 1) {
      setTitleBox("Please Confrim");
      setContentBox("Are you sure you want to update this user?");
    } else {
      setTitleBox("Please Confrim");
      setContentBox("Are you sure you want to update these users?");
    }
    setApiName("updateUser");
    setOpen(true);
  };

  const handleConfirmDailog = (Confirm) => {
    if (Confirm) {
      switch (apiName) {
        case "deleteUser":
          for (let i = 0; i < selected.length; i++) {
            api.delete(`/user/${selected[i]}`).then((res) => {
              console.log(res);
              setHasChanged(false);
              setToggle(!toggle);
            });
          }
          break;
        case "updateUser":
          for (let i = 0; i < selected.length; i++) {
            console.log("sfdsfd", todayDate);
            const planInfo = getPlanInfo(subPlan);
            api
              .put(`/user/updateUser/`, {
                id: selected[i],
                subscriptionPlan: subPlan,
                subscriptionDate: todayDate,
                predictionCount: planInfo.count,
                subscriptionStatus: subStatus,
              })
              .then((res) => {
                console.log(res);
                setHasChanged(false);
                setToggle(!toggle);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          break;
        default:
          break;
      }
    }
  };

  const handleReport = () => {
    setDataToReport(true);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected?.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {dataToReport && <ReportDownload ids={selected} setDataToReport={setDataToReport} />}
      {selected?.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected?.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 50%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All Users
        </Typography>
      )}

      {selected?.length > 0 ? (
        <Stack direction="row">
          <AlertDialogSlide
            open={open}
            setOpen={setOpen}
            title={titleBox}
            content={contentBox}
            handleConfirmDailog={handleConfirmDailog}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "fit-content",
              px: 2,
              m: 1,
              mx: 1,
              gap: 1,
              borderRadius: 1,
              border: "1px solid #b6c3d9",
            }}
          >
            {selected?.length === 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "fit-content",
                  gap: 1,
                }}
              >
                <Box className={classes.itemBox}>
                  <div className={classes.labelTxt}>Subscription Date</div>
                  <div className={classes.detailsTxt}>
                    {selectedUser?.subscriptionDate}
                  </div>
                </Box>
                <Box className={classes.itemBox}>
                  <div className={classes.labelTxt}>Subscription End Date</div>
                  <div className={classes.detailsTxt}>
                    {selectedUser?.subscriptionEndDate}
                  </div>
                </Box>
              </Box>
            )}
            <Box className={classes.itemBox}>
              <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Subscription Plan
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={subPlan}
                  onChange={handleSubcriptionPlanChange}
                  label="Subscription Plan"
                  defaultValue={selectedUser?.subscriptionPlan}
                >
                  <MenuItem value={"Free"}>
                    <em>Free</em>
                  </MenuItem>
                  <MenuItem value={"Basic"}>Basic</MenuItem>
                  <MenuItem value={"Popular"}>Popular</MenuItem>
                  <MenuItem value={"Premium"}>Premium</MenuItem>
                  <MenuItem value={"Intro"}>Intro</MenuItem>
                  <MenuItem value={"Pro"}>Pro</MenuItem>
                  <MenuItem value={"Flash"}>Flash</MenuItem>
                  <MenuItem value={"Ultra"}>Ultra</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className={classes.itemBox}>
              <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Subscription Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={subStatus}
                  onChange={handleSubcriptionStatusChange}
                  label="Subscription Status"
                >
                  <MenuItem value={"none"}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Expired"}>Expired</MenuItem>
                  <MenuItem value={"Over"}>Over</MenuItem>
                  <MenuItem value={"Deactivate"}>Deactivate</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              onClick={() => handleUpdate(selectedUser.id)}
              variant="contained"
              disabled={hasChanged ? false : true}
              sx={{
                textTransform: "none",
                width: "fit-content",
                whiteSpace: "nowrap",
              }}
            >
              Save Changes
            </Button>
          </Box>
          <Tooltip title="Filter list">
            <IconButton
              onClick={() => handleReport()}
              sx={{
                m: 1,
                px: 1,
                "&:hover": {
                  borderRadius: 1,
                },
              }}
            >
              <DownloadRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={handleDelete}
              sx={{
                m: 1,
                px: 1,
                "&:hover": {
                  borderRadius: 1,
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 4,
            px: 2,
          }}
        >
          <TextField
            fullWidth
            id="fullWidth"
            type="search"
            variant="outlined"
            margin="normal"
            size="small"
            borderRadius={2}
            onChange={handleSearch}
            value={searchTxt}
            placeholder="Search using email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title="Filter list">
            <IconButton onClick={() => handleReport()}>
              <DownloadRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
  selectedUser: PropTypes.object.isRequired,
  hasChanged: PropTypes.bool.isRequired,
  setHasChanged: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  searchTxt: PropTypes.string.isRequired,
  setSearchTxt: PropTypes.func.isRequired,
};

const Users = () => {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("User ID");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedUser, setSelectedUser] = React.useState("");
  const [hasChanged, setHasChanged] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [searchTxt, setSearchTxt] = React.useState("");

  useEffect(() => {
    api.get("/user/").then((response) => {
      setRows(response.data);
    });
  }, [hasChanged, toggle]);

  useEffect(() => {
    if (searchTxt.length > 0) {
      api
        .get(`/user/search/${searchTxt}`)
        .then((response) => {
          setRows(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setToggle(!toggle);
    }
  }, [searchTxt]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      setHasChanged(false);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
    if (newSelected.length === 1) {
      setHasChanged(false);
      getSelectUser(newSelected);
    }
    setSelected(newSelected);
  };

  const getSelectUser = (id) => {
    api.get(`/user/${id}`).then((response) => {
      setSelectedUser(response.data[0]);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          selected={selected}
          selectedUser={selectedUser}
          hasChanged={hasChanged}
          setHasChanged={setHasChanged}
          setToggle={setToggle}
          setSearchTxt={setSearchTxt}
          searchTxt={searchTxt}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row._id}
                      </TableCell>
                      <TableCell align="center">{row.fullName}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">
                        {row.predictionCount}
                      </TableCell>
                      <TableCell align="center">
                        {row.predictionCountLimit}
                      </TableCell>
                      <TableCell align="center">
                        {row.subscriptionPlan}
                      </TableCell>
                      <TableCell align="center">
                        {row.subscriptionStatus}
                      </TableCell>
                      <TableCell align="center">
                        {row.isVerified ? "Verified " : "Not Verified"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default Users;
