import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import TableCell from '@material-ui/core/TableCell';
import { withRouter } from "react-router";
import Template from "../Template/Template";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 16,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class TeacherPortal extends React.Component {
  constructor() {
    super();
    this.state = {
     
    };
    
  }

  render() {
    const { } = this.props;
    const { rows, rowsPerPage, page } = this.state;

    return (
      <Template title="Teacher Portal">
        <React.Fragment>
          <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
           Welcome! Teacher XXXXXX
        </Typography>
          
        </React.Fragment>
      </Template>
    );
  }
}

TeacherPortal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(TeacherPortal));
