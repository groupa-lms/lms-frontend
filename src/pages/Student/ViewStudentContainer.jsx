import React, { Component } from "react";
import Template from "../Template/Template";
import ViewStudent from "./ViewStudent"
import { withRouter } from 'react-router-dom';

class ViewStudentContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Template title="View Student">
        <ViewStudent studentId={this.props.match.params.id} history={this.props.history}/>
      </Template>
    );
  }
}

export default withRouter(ViewStudentContainer);