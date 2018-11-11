import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Template from "../Template/Template";
import TeacherTableHead from "./TeacherTableHead";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TeacherToolbar from "./TeacherToolbar";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 10
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

class Teacher extends Component {
  constructor() {
    super();
    this.state = {
      teachers: [],
      order: "asc",
      orderBy: "fistname",
      data: [],
      page: 0,
      rowsPerPage: 5
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:3001/api/Teachers?filter=%7B%20%22include%22%3A%20%5B%20%22newUsers%22%5D%7D"
      )
      .then(response => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClick = (event, id) => {
    //to be continued... ...
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";
    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }
    this.setState({ order, orderBy });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Template title="Teacher">
        <Paper className={classes.root}>
          <TeacherToolbar />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TeacherTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    console.log(n.newUsers);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        tabIndex={-1}
                        key={n.id}
                      >
                        <TableCell>{n.title}</TableCell>
                        <TableCell component="th" scope="row">
                          {n.newUsers.FirstName}
                        </TableCell>
                        <TableCell>{n.newUsers.LastName}</TableCell>
                        <TableCell>{n.newUsers.Gender}</TableCell>
                        <TableCell>{n.newUsers.email}</TableCell>
                        <TableCell>{n.department}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </Template>
    );
  }
}
Teacher.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Teacher);
