import React from 'react';
import PropTypes from 'prop-types';
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
import BookIcon from "@material-ui/icons/Book";
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
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { NavLink } from "react-router-dom";
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
function createData(title, code, id, lecturer, introduction, start_date, end_date, disabled) {
  counter += 1;
  return { counter, title, code, id, lecturer, introduction, start_date, end_date, disabled };
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
  buttonDisabled: {
    margin: theme.spacing.unit,
    disabled: true,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`,
  },
});

var courseRows = [];

class CourseEnroll extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: '',
      loading: true,
      rows: [],
      page: 0,
      rowsPerPage: 5,
      courses: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value });
  }

  handleSearch = (event) => {
    if (this.state.filter === '' ||
      this.state.filter === null ||
      this.state.filter.length === 0
    ) {
      this.setState({ rows: [...courseRows] });
    }
    else {
      this.setState({
        rows: courseRows.filter(item => {
          return item.code === this.state.filter;
        })
      });
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3001/api/courses')
      .then((response) => {
        let courseData = response.data;
        courseRows = [];
        counter = 0;
        courseData.map(item => {
          courseRows.push(createData(
            item.title,
            item.code,
            item.id,
            item.lecturer,
            item.introduction,
            item.start_date,
            item.end_date,
            item.disabled
          ));
        });

        this.setState(preState => ({
          rows: [...preState.rows, ...courseRows],
          loading: false,
        }));
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
    const { classes } = this.props;
    const { rows, rowsPerPage, page, loading, courses } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
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
                    <CustomTableCell>No.</CustomTableCell>
                    <CustomTableCell>Course Title</CustomTableCell>
                    <CustomTableCell>Course ID</CustomTableCell>
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
                        placeholder="Course ID"
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
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              size="small"
                              className={classes.button}
                              disabled={row.disabled}
                            >
                              <NavLink to={`/admin/course/view/${row.id}`}>
                                Detail
                            </NavLink>
                              <ViewIcon className={
                                classNames(
                                  classes.rightIcon,
                                  classes.iconSmall)} />
                            </Button>
                            <Button variant="outlined"
                              onClick={() => {
                                axios.get(`http://localhost:3001/api/courses/${row.id}`)
                                .then((response) => {
                                  let courseData = response.data;
                                  this.setState(preState => ({
                                    courses: [...preState.courses, courseData],
                                    loading: false,
                                  }));
                                })
                                .catch(function (error) {
                                  console.log(error);
                                });
 
                              }}
                              size="small"
                              disabled={
                                row.disabled||(courses.filter(item => item.id===row.id).length!=0)
                              }
                              className={classes.button}

                            >
                              {loading?"loading...":"Enrol"} <BookIcon className={
                                classNames(
                                  classes.rightIcon,
                                  classes.iconSmall)} />
                            </Button>
                            <Button variant="outlined"
                              size="small"
                              disabled={row.disabled}
                              className={classes.button}
                              onClick={() => {
                                axios.get(`http://localhost:3001/api/courses/${row.id}`)
                                .then((response) => {
                                  let courseData = response.data;
                                  if(courseData.disabled==true)
                                  {
                                    alert("Course Closed");
                                    return;
                                  }
                                  this.setState(preState => ({
                                    courses: preState.courses.filter(item => {
                                      return item.id != row.id; 
                                    }),
                                    loading: false,
                                  }));
                                })
                                .catch(function (error) {
                                  console.log(error);
                                });
 
                              }}
                            >
                              {loading?"loading...":"Cancel"} <NotInterested className={
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
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Paper>
          <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Your Courses
        </Typography>
          <div className={classNames(classes.layout, classes.cardGrid)}>
              <Grid container spacing={8}>
                {courses.map(course => (
                  <Grid item key={course.id} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.cardMedia}
                          image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                          title={course.title}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography>
                            title:
                            {course.title}
                          </Typography>
                          <Typography>
                            lecturer:
                            {course.lecturer}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
        </form>
      </React.Fragment>
    );
  }
}

CourseEnroll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseEnroll);
