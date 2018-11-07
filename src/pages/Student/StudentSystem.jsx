import React, { Component } from "react";
import Template from "../Template/Template";
import ListStudent from "./ListStudent";
import ViewStudent from "./ViewStudent";
import EditStudent from "./EditStudent";
import AddStudent from "./AddStudent";

class StudentSystem extends Component {
    constructor() {
        super();
        this.state = {
          operation: 'list',  
          viewItem:{},
        };
    
         this.pageDirect = this.pageDirect.bind(this);
      }
      pageDirect = ({value, item}) => {
        let newItem= this.state.viewItem;
        this.setState({ 
            operation: value,
            viewItem: {...newItem, ...item},
        });
        
        
      }
  render() {
    const { operation, viewItem } = this.state;
    return (
      <Template title="Course">
       {operation==='list' && <ListStudent viewItem={viewItem} pageDirect={this.pageDirect}/>}
       {operation==='view' && <ViewStudent viewItem={viewItem} pageDirect={this.pageDirect}/>}
       {operation==='edit' && <EditStudent viewItem={viewItem} pageDirect={this.pageDirect}/>}
       {operation==='add' && <AddStudent viewItem={viewItem} pageDirect={this.pageDirect}/>}
      </Template>
    );
  }
}

export default StudentSystem;