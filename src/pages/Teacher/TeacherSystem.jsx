import React, { Component } from "react";
import Template from "../Template/Template";
import ListTeacher from "./ListTeacher";
import ViewTeacher from "./ViewTeacher";
import EditTeacher from "./EditTeacher";
import AddTeacher from "./AddTeacher";

class TeacherSystem extends Component {
  constructor() {
    super();
    this.state = {
      operation: 'list',
      viewItem: {},
    };

    this.pageDirect = this.pageDirect.bind(this);
  }
  pageDirect = ({ value, item }) => {
    let newItem = this.state.viewItem;
    this.setState({
      operation: value,
      viewItem: { ...newItem, ...item },
    });


  }
  render() {
    const { operation, viewItem } = this.state;
    return (
      <Template title="Course">
        {operation === 'list' && <ListTeacher viewItem={viewItem} pageDirect={this.pageDirect} />}
        {operation === 'view' && <ViewTeacher viewItem={viewItem} pageDirect={this.pageDirect} />}
        {operation === 'edit' && <EditTeacher viewItem={viewItem} pageDirect={this.pageDirect} />}
        {operation === 'add' && <AddTeacher viewItem={viewItem} pageDirect={this.pageDirect} />}
      </Template>
    );
  }
}

export default TeacherSystem;