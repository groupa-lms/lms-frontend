import React, { Component } from "react";
import Template from "../Template/Template";
import ListStudent from "./ListStudent"

class ListStudentContainer extends Component {
  render() {
    return (
      <Template title="List Student">
        <ListStudent />
      </Template>
    );
  }
}

export default ListStudentContainer;