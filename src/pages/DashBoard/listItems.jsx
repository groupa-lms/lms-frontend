import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BookIcon from "@material-ui/icons/Book";
import ForumIcon from "@material-ui/icons/Forum";
import TeacherIcon from "@material-ui/icons/Group";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MessageIcon from "@material-ui/icons/Message";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import GroupIcon from "@material-ui/icons/Group";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class MainListItems extends React.Component {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Course" />
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to="/course"
            >
              <ListItemText inset primary="My Course" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={Link}
              to="/takecourse">
              <ListItemText inset primary="Take Course"/>
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={Link}
              to="/takequiz">
              <ListItemText inset primary="Take Quiz" 
              />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button component={Link} to="/teacher">
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Teacher" />
        </ListItem>
        <ListItem button component={Link} to="/forum">
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Forum" />
        </ListItem>
        <ListItem button component={Link} to="/account">
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <ListItem button component={Link} to="/messages">
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/logout">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </React.Fragment>
    );
  }
}

MainListItems.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainListItems);

