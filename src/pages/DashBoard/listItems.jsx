import React from "react";
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

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/course" >
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Course" />
    </ListItem>
    <ListItem button component={Link} to="/forum">
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Forum" />
    </ListItem>
    <ListItem button component={Link} to="/teacher">
      <ListItemIcon>
        <TeacherIcon />
      </ListItemIcon>
      <ListItemText primary="Teacher" />
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
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button component={Link} to="/logout">
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
