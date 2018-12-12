import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import Typography from "@material-ui/core/Typography";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import NotInterested from '@material-ui/icons/NotInterested';
import EditIcon from '@material-ui/icons/Create';
import ViewIcon from '@material-ui/icons/VideoLabel';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import getCourseList from "./apis/getCourseList";
import editCourse from "./apis/editCourse";
import TablePaginationActionsWrapped from "./TablePaginationActions";
import { withRouter } from "react-router";
import Template from "../Template/Template";
import DisableDialog from "./Dialog/DisableDialog";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 16,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

let counter = 0;
// function createData(studentId, name, grade, major, age, gender, disabled, id) {
//   counter += 1;
//   return { counter, studentId, name, grade, major, age, gender, disabled, id };
// }
function createData(courseId ,code, name, disabled) {
  counter += 1;
  return { counter, courseId, code, name, disabled };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class Course extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: '',
      loading: true,
      rows: [],
      page: 0,
      rowsPerPage: 5,
      disabledId: '',
      dialogConfirmOpen: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value });
  }

  handleSearch = () => {
    getCourseList()
      .then((response) => {
        let courseData = response.data;
        let courseRows = [];
        counter = 0;
        courseData.map(item => {
          courseRows.push(createData(
            item.id,
            item.code,
            item.name,
            item.disabled
          ));
        });
        if (this.state.filter.length === 0)
          this.setState({ rows: [...courseRows] });
        else
          this.setState({
            rows: courseRows.filter(item => {
              return item.code === this.state.filter;
            })
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit = () => {
    event.preventDefault();
    const changeData = { disabled: true };
    editCourse(this.state.disabledId, changeData)
      .then(res => {
        console.log('res=>', res);
        window.location.reload();
        return;
      })
      .catch(({ response: { data: { error } } }) => console.log(error));
  }

  componentDidMount = () => {
    getCourseList()
      .then((response) => {
        let courseData = response.data;
        //console.log(studentData)
        let courseRows = [];
        counter = 0;
        courseData.map(item => {
          //console.log(item.id)
          courseRows.push(createData(
            item.id,
            item.code,
            item.name,
            item.disabled
          ));
        });
        this.setState({
          rows: [...courseRows],
          loading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, history } = this.props;
    const { rows, rowsPerPage, page, loading, dialogConfirmOpen } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Template title="Student Management">
        <React.Fragment>
          <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
            Course List
        </Typography>
          <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
            <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell><Typography>No.</Typography></CustomTableCell>
                      <CustomTableCell><Typography>Course Code</Typography></CustomTableCell>
                      <CustomTableCell><Typography>Course Name</Typography></CustomTableCell>
                      <CustomTableCell>
                        <Button
                          style={{ marginTop: 13 }}
                          size="small"
                          className={classes.button}
                          variant="outlined"
                          onClick={this.handleSearch}
                        >
                          Filter
                      </Button>
                      <TextField
                          id="standard-with-placeholder"
                          label=""
                          placeholder="Course Code"
                          className={classes.textField}
                          margin="normal"
                          value={this.state.filter}
                          onChange={this.handleFilter}
                        />
                      </CustomTableCell>
                    </TableRow>
                  </TableHead>
                  {loading ? 'loading...' :
                    <TableBody>
                      {rows.length === 0 ? 
                      'No results by your input,please correct the input':
                        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                        return (

                          <TableRow key={row.courseId}>
                            <TableCell>{row.counter}</TableCell>
                            <TableCell>{row.code}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                disabled={row.disabled}
                                onClick={() => {
                                  history.push(`/admin/course/view/${row.courseId}`);
                                }}
                              >
                                <NavLink to={`/admin/course/view/${row.courseId}`}>
                                  Detail
                            </NavLink>
                                <ViewIcon className={
                                  classNames(
                                    classes.rightIcon,
                                    classes.iconSmall)} />
                              </Button>
                              <Button variant="outlined"
                                size="small"
                                className={classes.button}
                                disabled={row.disabled}
                                onClick={() => {
                                  history.push(`/admin/student/edit/${row.studentId}`);
                                }}
                              >
                                <NavLink to={`/admin/student/edit/${row.studentId}`}>
                                  Edit
                            </NavLink>
                                <EditIcon className={
                                  classNames(
                                    classes.rightIcon,
                                    classes.iconSmall)} />
                              </Button>
                              <Button variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={() => {
                                  this.setState({
                                    dialogConfirmOpen: !dialogConfirmOpen,
                                    disabledId: row.courseId,
                                  });
                                  // const changeData = { disabled: true };
                                  // editStudent(row.studentId, changeData)
                                  //   .then(res => {
                                  //     console.log('res=>', res);
                                  //     window.location.reload();
                                  //     return;
                                  //   })
                                  //   .catch(({ response: { data: { error } } }) => console.log(error));

                                }}
                                disabled={row.disabled}
                              >
                                <DisableDialog
                                  dialogConfirmOpen={dialogConfirmOpen}
                                  handleSubmit={this.handleSubmit} />
                                Disabled <NotInterested className={
                                  classNames(
                                    classes.rightIcon,
                                    classes.iconSmall)} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 48 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>}
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsWrapped}
                      />
                      <Button variant="outlined"
                        size="small"
                        style={{
                          marginLeft: 36,
                          marginTop: 15
                        }}
                        className={classes.button}
                        onClick={() => {
                          history.push(`/admin/student/add`);
                        }}
                      >
                        <AddIcon
                          className={
                            classNames(
                              classes.leftIcon,
                              classes.iconSmall)} />
                        <NavLink to={`/admin/student/add`}>
                          Create a New Student
                      </NavLink>
                      </Button>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </Paper>
          </form>
        </React.Fragment>
      </Template>
    );
  }
}

Course.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Course));

