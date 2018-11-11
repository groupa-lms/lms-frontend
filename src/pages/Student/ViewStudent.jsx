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
import axios from 'axios'
import { NavLink, Route } from "react-router-dom";

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
    };
  }

  componentDidMount = () => {
    axios.get(`http://localhost:3001/api/students/${this.props.studentId}`)
      .then((response) => {
        let studentData = response.data;
        this.setState(preState => ({
          student: { ...preState.student, ...studentData },
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

  render() {
    const { classes } = this.props;
    const { student } = this.state;
    const rows = [
      //createData('ID', student.id),
      createData('Student ID', student.studentId),
      createData('Student Name', student.name),
      createData('Student Grade', student.grade),
      createData('Student Major', student.major),
      createData('Student Age', student.age),
      createData('Student Gender', student.gender),
    ];

    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          {student.name}
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
        >
          <NavLink to={"/admin/student/list"}>
            Go Back
            </NavLink>
        </Button>
      </React.Fragment>
    );
  }

}

ViewStudent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewStudent);

