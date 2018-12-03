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
import { NavLink } from "react-router-dom";
import getCourse from "./apis/getCourse";

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
  constructor() {
    super();
    this.state = {
      course:{},
      // operation: 'list',  
      //viewItem:{},
    };

    //this.pageDirect = this.pageDirect.bind(this);
  }

  componentDidMount = () => {
    getCourse(this.props.courseId)
      .then((response) => {
        let courseData = response.data;
        this.setState(preState => ({
          course: { ...preState.course, ...courseData },
        }));
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    const { classes, history } = this.props;
    const { course } = this.state;
    const rows = [
      //createData('ID', viewItem.id),
      createData('Course Code', course.code),
      createData('Course Title', course.title),
      createData('Course Lecturer', course.lecturer),
      createData('Course Introduction', course.introduction),
      createData('Course Start Date', course.start_date),
      createData('Course End Date', course.end_date),
    ];
    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          {course.title}
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
            history.push(`/admin/course/edit/${course.id}`);
          } }
        >
        <NavLink to={`/admin/course/edit/${course.id}`}>
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
    );
  }

}

ViewCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewCourse);
//export default ViewCourse;

