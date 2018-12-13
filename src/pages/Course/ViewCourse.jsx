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
import getCourse from "./apis/getCourse";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import Template from "../Template/Template";
import getTeacher from "../Teacher/apis/getTeacher";

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

class ViewCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows:[],
    };
  }

  componentDidMount = () => {
    let courseRows = [];
    let courseData = {};
    getCourse(this.props.match.params.id)
      .then((response) => {
        courseData = response.data;
        return getTeacher(response.data.teachers.id);
      })
      .then((data)=>{
        courseRows.push(createData("Course ID",courseData.id));
        courseRows.push(createData("Course Code",courseData.code));
        courseRows.push(createData("Course Name",courseData.name));
        courseRows.push(createData("Teacher", data.newUsers.FirstName+" "+data.newUsers.LastName));
        courseRows.push(createData("Faculty",courseData.faculty));
        courseRows.push(createData('Start Date', courseData.start_date));
        courseRows.push(createData('End Date', courseData.end_date));
        courseRows.push(createData("Description",courseData.description));
        this.setState({
          rows: [...courseRows],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { classes, history } = this.props;
    const { rows } = this.state;

    return (
      <Template title="Course Management">
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Course Details
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Course Information</TableCell>
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
            history.push(`/admin/course/edit/${this.props.match.params.id}`);
          } }
        >
          <NavLink to={`/admin/course/edit/${this.props.match.params.id}`}>
            Edit
          </NavLink>
        </Button>
        <Button
          style={{ marginTop: 40 }}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={ ()=>{
            history.push("/admin/course/list");
          } }
        >
          <NavLink to={"/admin/course/list"}>
            Go Back
            </NavLink>
        </Button>
      </React.Fragment>
      </Template>
    );
  }
}

ViewCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ViewCourse));

