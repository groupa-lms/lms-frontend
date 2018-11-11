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
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import NotInterested from '@material-ui/icons/NotInterested';
import EditIcon from '@material-ui/icons/Create';
import ViewIcon from '@material-ui/icons/VideoLabel';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

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

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);
let counter = 0;
function createData(studentId, name, grade, major, age, gender, disabled, id) {
  counter += 1;
  return { counter, studentId, name, grade, major, age, gender, disabled, id };
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

var studentRows = [];

class ListStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: '',
      loading: true,
      rows: [],
      page: 0,
      rowsPerPage: 5,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value });
  }

  handleSearch = (event) => {
    if (this.state.filter === '' ||
      this.state.filter === null ||
      this.state.filter.length === 0
    ) {
      this.setState({ rows: [...studentRows] });
    }
    else {
      // this.setState(preState => ({
      //   rows: preState.rows.filter(item => {
      //     return item.code === this.state.filter; 
      //   })
      // }))

      this.setState({
        rows: studentRows.filter(item => {
          return item.studentId === this.state.filter;
        })
      });
    }
  }

  // handleSubmit = () => {
  //   //console.log(value)
  //   const disable = { disabled: true };
  //   axios.patch(`http://localhost:3001/api/courses/5be0cb1d67916e205cbd07bd`, disable)
  //     .then(res => {
  //       console.log('res=>', res);
  //       this.setState({ loading: false });
  //       //this.setState({ disabled: true });
  //     })
  //     .catch(({ response: { data: { error } } }) => console.log(error));
  // }



  // componentDidUpdate = () => {
  //   this.setState({ rows: [...courseRows] });
  // }

  componentDidMount = () => {
    axios.get('http://localhost:3001/api/students')
      .then((response) => {
        let studentData = response.data;
        studentRows = [];
        counter = 0;
        studentData.map(item => {
          studentRows.push(createData(
            item.studentId,
            item.name,
            item.grade,
            item.major,
            item.age,
            item.gender,
            item.disabled,
            item.id
          ));
        });

        this.setState(preState => ({
          rows: [...preState.rows, ...studentRows],
          loading: false,
        }));
        // setTimeout(() => {
        //   this.setState({
        //     loading: false,
        //   });
        // }, 2000);
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
    const { classes, pageDirect } = this.props;
    const { rows, rowsPerPage, page, loading } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
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
                    <CustomTableCell>No.</CustomTableCell>
                    <CustomTableCell>ID</CustomTableCell>
                    <CustomTableCell>Name</CustomTableCell>
                    {/* <CustomTableCell>Grade</CustomTableCell> */}
                    {/* <CustomTableCell>Major</CustomTableCell> */}
                    {/* <CustomTableCell>Age</CustomTableCell>
                    <CustomTableCell>Gender</CustomTableCell> */}
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
                        placeholder="Student ID"
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
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                      return (

                        <TableRow key={row.id}>
                          <TableCell>{row.counter}</TableCell>
                          <TableCell>{row.studentId}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          {/* <TableCell>{row.grade}</TableCell> */}
                          {/* <TableCell>{row.major}</TableCell> */}
                          {/* <TableCell>{row.age}</TableCell>
                          <TableCell>{row.gender}</TableCell> */}
                          <TableCell>
                            <Button
                              variant="outlined"
                              size="small"
                              className={classes.button}
                              disabled={row.disabled}
                            >
                              <NavLink to={`/admin/student/view/${row.id}`}>
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
                            >
                              <NavLink to={`/admin/student/edit/${row.id}`}>
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
                                const changeData = { disabled: true };
                                axios.patch(`http://localhost:3001/api/students/${row.id}`, changeData)
                                  .then(res => {
                                    console.log('res=>', res);
                                    window.location.reload();
                                    return;
                                  })
                                  .catch(({ response: { data: { error } } }) => console.log(error));

                              }}
                              disabled={row.disabled}
                            >
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
                      onClick={() => {
                        pageDirect({ value: 'add' });
                      }}
                      className={classes.button}>
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
    );
  }
}

ListStudent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListStudent);
