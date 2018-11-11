import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { NavLink } from "react-router-dom";
import { browserHistory } from 'react-router'

const styles = theme => ({
  container: {
    marginTop: 64,
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 700,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    width: 400,
  },
});

class EditStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      studentId: '',
      name: '',
      grade: '',
      major: '',
      age: '',
      gender: '',
      disabled: false,
      current_date: '',
    };

    this.handleStudentId = this.handleStudentId.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleGrade = this.handleGrade.bind(this);
    this.handleMajor = this.handleMajor.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.get(`http://localhost:3001/api/students/${this.props.studentId}`)
      .then((response) => {
        let studentData = response.data;
        console.log(studentData)
        this.setState({
          studentId: studentData.studentId,
          name: studentData.name,
          grade: studentData.grade,
          major: studentData.major,
          age: studentData.age,
          gender: studentData.gender,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  componentDidMount() {
    const today = new Date().getDate;
    this.setState({ current_date: today });

  }

  handleStudentId = (event) => {
    this.setState({ studentId: event.target.value });
  }

  handleName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleGrade = (event) => {
    this.setState({ grade: event.target.value });
  }

  handleMajor = (event) => {
    this.setState({ major: event.target.value });
  }

  handleAge = (event) => {
    this.setState({ age: event.target.value });
  }

  handleGender = (event) => {
    this.setState({ gender: event.target.value });
  }

  handleSubmit = (event) => {
    const newStudent = {
      studentId: this.state.studentId,
      name: this.state.name,
      grade: this.state.grade,
      major: this.state.major,
      age: this.state.age,
      gender: this.state.gender

    }
    this.setState({ loading: true });
    axios.patch(`http://localhost:3001/api/students/${this.props.studentId}`, newStudent)
      .then(res => {
        console.log('res=>', res);
        this.setState({ loading: false });
        browserHistory.push("/admin/student/list");
      })
      .catch(({ response: { data: { error } } }) => console.log(error));
    //Make a network call somewhere
    //event.preventDefault();
  }

  render() {
    const { classes, viewItem, pageDirect } = this.props;
    const { 
      studentId,
      name,
      grade,
      major,
      age,
      gender,
    } = this.state;

    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Edit Student {this.state.name}
        </Typography>
        <form className={classes.container} 
        validate="true" 
        autoComplete="off" 
        onSubmit={this.handleSubmit}>

          <TextField
            id="standard-required"
            label="Student ID"
            placeholder={studentId}
            required
            className={classes.textField}
            margin="normal"
            value={studentId}
            onChange={this.handleStudentId}
          />
          <TextField
            id="standard-with-placeholder"
            label="Student Name"
            placeholder={name}
            required
            className={classes.textField}
            margin="normal"
            value={name}
            onChange={this.handleName}
          />
          <TextField
            id="standard-with-placeholder"
            label="Grade"
            placeholder={grade}
            required
            className={classes.textField}
            margin="normal"
            value={grade}
            onChange={this.handleGrade}
          />
          <TextField
            id="standard-with-placeholder"
            label="Major"
            placeholder={major}
            required
            className={classes.textField}
            margin="normal"
            value={major}
            onChange={this.handleMajor}
          />
          <TextField
            id="standard-with-placeholder"
            label="Age"
            placeholder={age}
            required
            className={classes.textField}
            margin="normal"
            value={age}
            onChange={this.handleAge}
          />
          <TextField
            id="standard-with-placeholder"
            label="Gender"
            placeholder={gender}
            required
            className={classes.textField}
            margin="normal"
            value={gender}
            onChange={this.handleGender}
          />
          <Button
            type="submit"
            style={{ marginTop: 40 }}
            variant="contained"
            color={this.state.loading ? "secondary" : "primary"}
            disabled={this.state.loading}
            className={classes.button}
          >
            {this.state.loading ? 'Editing...' : 'Edit'}
          </Button>
          <Button
            style={{ marginTop: 40 }}
            variant="contained"
            color={this.state.loading ? "secondary" : "primary"}
            disabled={this.state.loading}
            className={classes.button}
            >
             <NavLink to ={"/admin/student/list"}>
               Go Back
            </NavLink>
        </Button>
        </form>
      </React.Fragment>
    );
  }
}

EditStudent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditStudent);
