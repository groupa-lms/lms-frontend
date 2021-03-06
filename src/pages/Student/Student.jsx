import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import NotInterested from "@material-ui/icons/NotInterested";
import EditIcon from "@material-ui/icons/Create";
import ViewIcon from "@material-ui/icons/VideoLabel";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import getStudentList from "./apis/getStudentList";
import editStudent from "./apis/editStudent";
import TablePaginationActionsWrapped from "./TablePaginationActions";
import { withRouter } from "react-router";
import Template from "../Template/Template";
import DisableDialog from "./Dialog/DisableDialog";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 16
  },
  body: {
    fontSize: 15
  }
}))(TableCell);

let counter = 0;

function createData(studentId, name, disabled) {
  counter += 1;
  return { counter, studentId, name, disabled };
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: "auto"
  },
  button: {
    margin: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class Student extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: "",
      loading: true,
      rows: [],
      page: 0,
      rowsPerPage: 5,
      disabledId: "",
      dialogConfirmOpen: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleSearch = () => {
    getStudentList()
      .then(response => {
        let studentData = response.data;
        let studentRows = [];
        counter = 0;
        studentData.map(item => {
          studentRows.push(
            createData(
              item.id,
              item.newUsers.FirstName + "" + item.newUsers.LastName,
              item.disabled
            )
          );
        });
        if (this.state.filter.length === 0)
          this.setState({ rows: [...studentRows] });
        else
          this.setState({
            rows: studentRows.filter(item => {
              return item.studentId === this.state.filter;
            })
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleSubmit = () => {
    event.preventDefault();
    const changeData = { disabled: true };
    editStudent(this.state.disabledId, changeData)
      .then(res => {
        console.log("res=>", res);
        window.location.reload();
        return;
      })
      .catch(({ response: { data: { error } } }) => console.log(error));
  };

  componentDidMount = () => {
    getStudentList()
      .then(response => {
        let studentData = response.data;
        let studentRows = [];
        counter = 0;
        studentData.map(item => {
          studentRows.push(
            createData(
              item.id,
              item.newUsers.FirstName + " " + item.newUsers.LastName,
              item.disabled
            )
          );
        });
        this.setState({
          rows: [...studentRows],
          loading: false
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, history } = this.props;
    const { rows, rowsPerPage, page, loading, dialogConfirmOpen } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return <Template title="Student Management">
        <React.Fragment>
          <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
            Student List
          </Typography>
          <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
            <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell>
                        <Typography>No.</Typography>
                      </CustomTableCell>
                      <CustomTableCell>
                        <Typography>ID</Typography>
                      </CustomTableCell>
                      <CustomTableCell>
                        <Typography>Name</Typography>
                      </CustomTableCell>
                      <CustomTableCell>
                        <Button style={{ marginTop: 13 }} size="small" className={classes.button} variant="outlined" onClick={this.handleSearch}>
                          Filter
                        </Button>
                        <TextField id="standard-with-placeholder" label="" placeholder="Student ID" className={classes.textField} margin="normal" value={this.state.filter} onChange={this.handleFilter} />
                      </CustomTableCell>
                    </TableRow>
                  </TableHead>
                  {loading ? <TableBody>
                      <TableRow>
                        <TableCell>loading...</TableCell>
                      </TableRow>
                    </TableBody> : <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map(row => {
                          return (
                            <TableRow key={row.studentId}>
                              <TableCell>{row.counter}</TableCell>
                              <TableCell>{row.studentId}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  className={classes.button}
                                  disabled={row.disabled}
                                  onClick={() => {
                                    history.push(
                                      `/admin/student/view/${row.studentId}`
                                    );
                                  }}
                                >
                                  <NavLink
                                    to={`/admin/student/view/${
                                      row.studentId
                                    }`}
                                  >
                                    Detail
                                  </NavLink>
                                  <ViewIcon
                                    className={classNames(
                                      classes.rightIcon,
                                      classes.iconSmall
                                    )}
                                  />
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  className={classes.button}
                                  disabled={row.disabled}
                                  onClick={() => {
                                    history.push(
                                      `/admin/student/edit/${row.studentId}`
                                    );
                                  }}
                                >
                                  <NavLink
                                    to={`/admin/student/edit/${
                                      row.studentId
                                    }`}
                                  >
                                    Edit
                                  </NavLink>
                                  <EditIcon
                                    className={classNames(
                                      classes.rightIcon,
                                      classes.iconSmall
                                    )}
                                  />
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  className={classes.button}
                                  onClick={() => {
                                    this.setState({
                                      dialogConfirmOpen: !dialogConfirmOpen,
                                      disabledId: row.studentId
                                    });
                                  }}
                                  disabled={row.disabled}
                                >
                                  <DisableDialog
                                    dialogConfirmOpen={dialogConfirmOpen}
                                    handleSubmit={this.handleSubmit}
                                  />
                                  Disabled{" "}
                                  <NotInterested
                                    className={classNames(
                                      classes.rightIcon,
                                      classes.iconSmall
                                    )}
                                  />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && <TableRow style={{ height: 48 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>}
                    </TableBody>}
                  <TableFooter>
                    <TableRow>
                      <TablePagination colSpan={3} count={rows.length} rowsPerPage={rowsPerPage} page={page} onChangePage={this.handleChangePage} onChangeRowsPerPage={this.handleChangeRowsPerPage} ActionsComponent={TablePaginationActionsWrapped} />
                      <TableCell>
                        <Button variant="outlined" size="small" style={{ marginLeft: 36, marginTop: 15 }} className={classes.button} onClick={() => {
                            history.push(`/admin/student/add`);
                          }}>
                          <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                          <NavLink to={`/admin/student/add`}>
                            Create a New Student
                          </NavLink>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </Paper>
          </form>
        </React.Fragment>
      </Template>;
  }
}

Student.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Student));
