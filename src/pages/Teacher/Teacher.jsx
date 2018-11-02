import React, { Component } from 'react';
import Template from "../Template/Tempalte";
import TeacherTable from "./TeacherTable";
import axios from "axios";

class Teacher extends Component {
    constructor(){
        super()
        this.state = {
            teachers: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/api/teachers', {
        })
        .then((response) => {
            this.setState({teachers: response.data})
            //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
      
    render() {
        return (
            <Template title="Teacher">
              <TeacherTable teachers={this.state.teachers}/>  
            </Template>
        );
    }
}

export default Teacher;

