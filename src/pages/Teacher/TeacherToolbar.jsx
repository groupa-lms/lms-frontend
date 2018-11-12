import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

class TeacherToolbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Toolbar className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            Teacher
          </Typography>
        </div>
        <div className={classes.spacer} />
      </Toolbar>
    );
  }
}

TeacherToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(toolbarStyles)(TeacherToolbar);
