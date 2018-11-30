import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";

const rows = [
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  {
    id: "firsnamet",
    numeric: false,
    disablePadding: false,
    label: "First Name"
  },
  { id: "lastname", numeric: false, disablePadding: false, label: "Last Name" },
  { id: "gender", numeric: false, disablePadding: false, label: "Gender" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "department",
    numeric: false,
    disablePadding: false,
    label: "Department"
  },
  { id: "edit", numeric: false, disablePadding: false, label: "Edit" }
];

class TeacherTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}
TeacherTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

export default TeacherTableHead;
