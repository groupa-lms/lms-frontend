import React, { Component } from "react";
import Template from "../Template/Template";
import AddStudent from "./AddStudent"
import { withRouter } from 'react-router-dom';

class AddStudentContainer extends Component {
  render() {
    return (
      <Template title="Add Student">
        <AddStudent history={this.props.history}/>
      </Template>
    );
  }
}

export default withRouter(AddStudentContainer);