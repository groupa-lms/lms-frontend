import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Template from "../Template/Template";
import TeacherTableHead from "./TeacherTableHead";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import TeacherToolbar from "./TeacherToolbar";
import { withRouter } from "react-router";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
  },
  modal: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  modalButton: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
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
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      order: "asc",
      orderBy: "fistname",
      data: [],
      page: 0,
      rowsPerPage: 5,
      modal: false,
      currId: ""
    };
    this.handleDelte = this.handleDelte.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://lms-backend-new.herokuapp.com/api/Teachers?filter=%7B%20%22include%22%3A%20%5B%20%22newUsers%22%5D%7D"
      )
      .then(response => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

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

  handleDelte = () => {
    axios
      .delete
      // "https://lms-backend-new.herokuapp.com/api/teachers/" +
      //   this.state.currId
      ()
      .then(response => {
        // handle success
        //alert("Delete successfully.");
        this.setState({ modal: false });
        this.forceUpdate();
        console.log(response);
      })
      .catch(error => {
        // handle error
        this.setState({ modal: false });
        this.forceUpdate();
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  };

  handleModalOpen = id => {
    this.setState({ modal: true, currId: id });
  };

  handleModalClose = () => {
    this.setState({ modal: false });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Template title="Teacher">
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modal}
          onClose={this.handleClose}
        >
          <div className={classes.modal}>
            <Typography variant="h6" id="modal-title">
              Delete
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Are you sure delete this record?
            </Typography>
            <Button
              className={classes.modalButton}
              variant="contained"
              color="primary"
              onClick={this.handleDelte}
            >
              Confirm
            </Button>
            <Button
              className={classes.modalButton}
              variant="contained"
              color="secondary"
              onClick={this.handleModalClose}
            >
              Cancel
            </Button>
          </div>
        </Modal>
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
                    return (
                      <TableRow hover tabIndex={-1} key={n.id}>
                        <TableCell>{n.title}</TableCell>
                        <TableCell component="th" scope="row">
                          {n.newUsers.FirstName}
                        </TableCell>
                        <TableCell>{n.newUsers.LastName}</TableCell>
                        <TableCell>{n.newUsers.Gender}</TableCell>
                        <TableCell>{n.newUsers.email}</TableCell>
                        <TableCell>{n.department}</TableCell>
                        <TableCell>
                          <IconButton
                            className={classes.button}
                            aria-label="View"
                            onClick={() =>
                              this.props.history.push({
                                pathname: "/teacher-view",
                                data: n
                              })
                            }
                          >
                            <DescriptionIcon />
                          </IconButton>
                          <IconButton
                            className={classes.button}
                            aria-label="Edit"
                            onClick={() =>
                              this.props.history.push("/teacher-edit")
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            className={classes.button}
                            aria-label="Delete"
                            onClick={() => this.handleModalOpen(n.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
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

export default withRouter(withStyles(styles)(Teacher));
