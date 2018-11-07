import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

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
  },
});

class AddStudent extends React.Component {
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
    };

    this.handleStudentId = this.handleStudentId.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleGrade = this.handleGrade.bind(this);
    this.handleMajor = this.handleMajor.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    // if(!confirm("confirm the change?"))
    // {
    //   return
    // }
    const newStudent = {
      studentId: this.state.studentId,
      name: this.state.name,
      grade: this.state.grade,
      major: this.state.major,
      age: this.state.age,
      gender: this.state.gender,
      disabled: this.state.disabled
    }
    this.setState({ loading: true });
    axios.post('http://localhost:3001/api/students', newStudent)
      .then(res => {
        console.log('res=>', res);
        this.setState({ loading: false });
      })
      .then(
        this.props.pageDirect({
          value: 'view',
          item: newStudent
        })
      )
      .catch(({ response: { data: { error } } }) => console.log(error));
    //Make a network call somewhere
    //event.preventDefault();
  }

  render() {
    const { classes, pageDirect } = this.props;

    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Add Student
      </Typography>
        <form className={classes.container} validate="true" autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            id="standard-with-placeholder"
            label="Student Id"
            placeholder="Student Id"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.studentId}
            onChange={this.handleStudentId}
          />
          <TextField
            id="standard-with-placeholder"
            label="Student Name"
            placeholder="Student Name"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.name}
            onChange={this.handleName}
          />
          <TextField
            id="standard-with-placeholder"
            label="Student Grade"
            placeholder="Student Grade"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.grade}
            onChange={this.handleGrade}
          />
          <TextField
            id="standard-with-placeholder"
            label="Student Major"
            placeholder="Student Major"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.major}
            onChange={this.handleMajor}
          />
          <TextField
            id="standard-with-placeholder"
            label="Student Age"
            placeholder="Student Age"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.age}
            onChange={this.handleAge}
          />
          <TextField
            id="standard-with-placeholder"
            label="Student Gender"
            placeholder="Student Gender"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.gender}
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
            {this.state.loading ? 'Creating...' : 'Add'}
          </Button>
          <Button
            type="submit"
            style={{ marginTop: 40 }}
            variant="contained"
            color={this.state.loading ? "secondary" : "primary"}
            disabled={this.state.loading}
            className={classes.button}
            onClick={() => {
              pageDirect({ value: 'list' });
            }}
          >
            cancel
        </Button>
        </form>
      </React.Fragment>
    );
  }
}

AddStudent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddStudent);
