import React, { Component } from "react";
import Template from "../Template/Template";
import ListTeacher from "./ListTeacher"

class ListTeacherContainer extends Component {
  render() {
    return (
      <Template title="List Teacher">
        <ListTeacher />
      </Template>
    );
  }
}

export default ListTeacherContainer;