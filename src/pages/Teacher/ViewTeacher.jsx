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
import axios from 'axios'

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

class ViewTeacher extends React.Component {
  constructor() {
    super();
    this.state = {
      teacher: {},
    };
  }

  componentDidMount = () => {
    axios.get(`http://localhost:3001/api/teachers/${this.props.teacherId}`)
      .then((response) => {
        let teacherData = response.data;
        this.setState(preState => ({
          teacher: { ...preState.teacher, ...teacherData },
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
    const { teacher } = this.state;
    const rows = [
      //createData('ID', teacher.id),
      createData('Teacher ID', teacher.teacherId),
      createData('Teacher Name', teacher.name),
      createData('Teacher Title', teacher.title),
      createData('Teacher Department', teacher.department),
      createData('Teacher Course', teacher.course),
      createData('Teacher Date of Birth', teacher.date_of_birth),
      createData('Teacher Gender', teacher.gender),
    ];
    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          {teacher.name}
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Teacher Information</TableCell>
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
          <NavLink to={`/admin/teacher/edit/${teacher.id}`}>
            Edit
          </NavLink>
        </Button>
        <Button
          style={{ marginTop: 40 }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <NavLink to={`/admin/teacher/list`}>
            Go Back
          </NavLink>
        </Button>
      </React.Fragment>
    );
  }

}

ViewTeacher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewTeacher);
//export default ViewCourse;

