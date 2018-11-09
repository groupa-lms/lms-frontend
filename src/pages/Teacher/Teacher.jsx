import React, { Component } from "react";
import Template from "../Template/Template";
import TeacherTable from "./TeacherTable";
import axios from "axios";

class Teacher extends Component {
  constructor() {
    super();
    this.state = {
      teachers: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/Teachers")
      .then(response => {
        response.data.map(teacher => {
          return axios
            .get(
              "http://localhost:3001/api/Teachers/" + teacher.id + "/newUsers"
            )
            .then(response2 => {
              console.log(response2);
            });
        });
        this.setState({ teachers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }

  render() {
    return (
      <Template title="Teacher">
        <TeacherTable teachers={this.state.teachers} />
      </Template>
    );
  }
}

export default Teacher;
