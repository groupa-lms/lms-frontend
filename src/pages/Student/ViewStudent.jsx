import React from 'react';
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import getStudent from "./apis/getStudent";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import Template from "../Template/Template";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


function createData(item, value) {
  return { item, value };
}

class ViewStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      rows:[],
    };
  }

  componentDidMount = () => {
    getStudent(this.props.match.params.id)
      .then((response) => {
        let studentData = response.data;
        let studentRows = [];
        studentRows.push(createData("Student ID",studentData.id));
        studentRows.push(createData("Student Name",studentData.newUsers.FirstName+" "+studentData.newUsers.LastName));
        studentRows.push(createData("Date of Birth",studentData.newUsers.DOB));
        studentRows.push(createData("Date of Join",studentData.newUsers.DateOfJoin));
        studentRows.push(createData('Student Gender', studentData.newUsers.Gender));
        
        this.setState({
          rows: [...studentRows],
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    const { classes, history } = this.props;
    const { student, rows } = this.state;

    return (
      <Template title="Student Management">
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Student Details
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Student Information</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.item}>
                    <TableCell component="th" scope="row">
                      {row.item}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <Button
          style={{ marginTop: 40 }}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={ ()=>{
            history.push(`/admin/student/edit/${student.id}`);
          } }
        >
          <NavLink to={`/admin/student/edit/${student.id}`}>
            Edit
          </NavLink>
        </Button>
        <Button
          style={{ marginTop: 40 }}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={ ()=>{
            history.push("/admin/student/list");
          } }
        >
          <NavLink to={"/admin/student/list"}>
            Go Back
            </NavLink>
        </Button>
      </React.Fragment>
      </Template>
    );
  }

}

ViewStudent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ViewStudent));

