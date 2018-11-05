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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


function createData(item, value) {
  return { item, value };
}



class ViewCourse extends React.Component {
  constructor() {
    super();
    this.state = {
      // operation: 'list',  
      //viewItem:{},
    };

    //this.pageDirect = this.pageDirect.bind(this);
  }

  render() {
    const { classes, viewItem } = this.props;
    const rows = [
      //createData('ID', viewItem.id),
      createData('Course Code',viewItem.code ),
      createData('Course Title', viewItem.title),
      createData('Course Lecturer', viewItem.lecturer),
      createData('Course Introduction',viewItem.introduction ),
      createData('Course Start Date', viewItem.start_date),
      createData('Course End Date',viewItem.end_date ),
    ];
    //const { rows, rowsPerPage, page, loading } = this.state;
    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          {viewItem.title}
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
    <a href="JavaScript:history.go(-1)">go back</a>
      </React.Fragment>
    );
  }

}

ViewCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewCourse);
//export default ViewCourse;

