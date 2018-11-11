import React, { Component } from "react";
import Template from "../Template/Template";
import ViewStudent from "./ViewStudent"

class ViewStudentContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Template title="View Student">
        <ViewStudent studentId={this.props.match.params.id}/>
      </Template>
    );
  }
}

export default ViewStudentContainer;