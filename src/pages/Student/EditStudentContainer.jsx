import React, { Component } from "react";
import Template from "../Template/Template";
import EditStudent from "./EditStudent"
import { withRouter } from 'react-router-dom';

class EditStudentContainer extends Component {
  render() {
    return (
      <Template title="Edit Student">
        <EditStudent studentId={this.props.match.params.id} history={this.props.history}/>
      </Template>
    );
  }
}

export default withRouter(EditStudentContainer);