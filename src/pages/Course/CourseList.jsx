import React, { Component } from "react";
import Template from "../Template/Template";
import ListCourse from "./ListCourse";
import ViewCourse from "./ViewCourse";
import EditCourse from "./EditCourse";
import AddCourse from "./AddCourse";

class CourseList extends Component {
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
        {operation === 'list' && <ListCourse viewItem={viewItem} pageDirect={this.pageDirect} />}
        {operation === 'view' && <ViewCourse viewItem={viewItem} pageDirect={this.pageDirect} />}
        {operation === 'edit' && <EditCourse viewItem={viewItem} pageDirect={this.pageDirect} />}
        {operation === 'add' && <AddCourse viewItem={viewItem} pageDirect={this.pageDirect} />}
      </Template>
    );
  }
}

export default CourseList;