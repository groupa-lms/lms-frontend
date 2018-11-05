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
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import ViewIcon from '@material-ui/icons/VideoLabel';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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
function createData(title, code, id, lecturer, introduction, start_date, end_date) {
  counter += 1;
  return { counter, title, code, id, lecturer, introduction, start_date, end_date };
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
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class ListCourse extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      rows: [],
      page: 0,
      rowsPerPage: 5,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount = () => {
    axios.get('http://localhost:3001/api/courses')
      .then((response) => {
        let courseData = response.data;
        let courseRows = [];
        courseData.map(item => {
          courseRows.push(createData(
            item.title, 
            item.code, 
            item.id, 
            item.lecturer, 
            item.introduction,
            item.start_date,
            item.end_date,
            ));
        });
        counter=0;
        this.setState(preState => ({
          rows: [...preState.rows, ...courseRows],
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
                    <CustomTableCell>Operation</CustomTableCell>
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
                              onClick={() => { 
                                const viewItem = createData(
                                  row.title, 
                                  row.code, 
                                  row.id, 
                                  row.lecturer, 
                                  row.introduction,
                                  row.start_date,
                                  row.end_date,
                                )
                               pageDirect('view',viewItem);
                              }}
                              variant="outlined"
                              size="small"
                              className={classes.button}>
                              View <ViewIcon className={
                                classNames(
                                  classes.rightIcon,
                                  classes.iconSmall)} />
                            </Button>
                            <Button variant="outlined"
                              size="small"
                              className={classes.button}>
                              Edit <EditIcon className={
                                classNames(
                                  classes.rightIcon,
                                  classes.iconSmall)} />
                            </Button>
                            <Button variant="outlined"
                              size="small"
                              className={classes.button}>
                              Disabled <DeleteIcon className={
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
        </form>
      </React.Fragment>
    );
  }
}

ListCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListCourse);
