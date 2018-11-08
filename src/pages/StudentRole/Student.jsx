import React, { Component } from "react";
import Template from "../Template/Template";
import MainPage from "./MainPage"

class Student extends Component {
  render() {
    return (
      <Template title="Student">
        <MainPage /> 
        
      </Template>
    );
  }
}

export default Student;