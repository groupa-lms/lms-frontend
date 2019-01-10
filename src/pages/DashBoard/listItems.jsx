import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BookIcon from "@material-ui/icons/Book";
import ForumIcon from "@material-ui/icons/Forum";
import TeacherIcon from "@material-ui/icons/Group";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MessageIcon from "@material-ui/icons/Message";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import AuthService from "../LoginForm/AuthService";
import { LoginContext } from "../../App";

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
  constructor() {
    super();
    this.Auth = new AuthService();
  }
  state = {
    open: true
  };
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
    return (
      <LoginContext.Consumer>
        {({ setLogin, role }) => (
          <React.Fragment>
            {/* <ListItem button component={Link} to="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem> */}
            {role==="student"&&
            <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Course" />
            </ListItem>}
            {role==="student"&&
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
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/takecourse"
                >
                  <ListItemText inset primary="Take Course" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/takequiz"
                >
                  <ListItemText inset primary="Take Quiz" />
                </ListItem>
              </List>
            </Collapse>}
            {role==="teacher"&&
            <ListItem button component={Link} to="/teacher">
              <ListItemIcon>
                <TeacherIcon />
              </ListItemIcon>
              <ListItemText primary="Teacher" />
            </ListItem>}
            {role==="admin"&&
            <ListItem button component={Link} to="/admin/student/list">
              <ListItemIcon>
                <TeacherIcon />
              </ListItemIcon>
              <ListItemText primary="Student" />
            </ListItem>}
            {role==="admin"&&
            <ListItem button component={Link} to="/admin/course/list">
              <ListItemIcon>
                <TeacherIcon />
              </ListItemIcon>
              <ListItemText primary="Course" />
            </ListItem>}
            {role==="student"&&
            <ListItem button component={Link} to="/forum">
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary="Forum" />
            </ListItem>}
            {(role==="student"||role==="teacher")&&
            <ListItem button component={Link} to="/account">
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>}
            {(role==="student"||role==="teacher")&&
            <ListItem button component={Link} to="/messages">
              <ListItemIcon>
                <MessageIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>}
            <Divider />
            <ListItem
              button
              component={Link}
              to="/login"
              onClick={() => {
                this.Auth.logout();
                setLogin(false);
               
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </React.Fragment>
        )}
      </LoginContext.Consumer>
    );
  }
}

MainListItems.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainListItems);
