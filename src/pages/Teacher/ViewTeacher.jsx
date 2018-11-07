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
      // operation: 'list',  
      //viewItem:{},
    };

    //this.pageDirect = this.pageDirect.bind(this);
  }

  render() {
    const { classes, viewItem, pageDirect } = this.props;
    const rows = [
      //createData('ID', viewItem.id),
      createData('Teacher ID',viewItem.studentId ),
      createData('Teacher Name', viewItem.name),
      createData('Teacher Title', viewItem.title),
      createData('Teacher Department',viewItem.department ),
      createData('Teacher Course', viewItem.course),
      createData('Teacher Date of Birth', viewItem.date_of_birth),
      createData('Teacher Gender',viewItem.gender ),
    ];
    //const { rows, rowsPerPage, page, loading } = this.state;
    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          {viewItem.name}
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
            onClick={() => { 
              //pageDirect('edit', viewItem );
              pageDirect({
                value: 'edit',
                item: viewItem
              });
            }}
            style={{ marginTop: 40 }}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Edit
        </Button>
        <Button
            style={{ marginTop: 40 }}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => { 
              //pageDirect('list', viewItem );
              pageDirect({
                value: 'list',
                item: viewItem
              });
            }}
          >
            Go Back
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

