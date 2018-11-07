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

class EditStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      loading:false,
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
    this.setState({ 
      studentId: this.props.viewItem.studentId,
      name: this.props.viewItem.name,
      grade: this.props.viewItem.grade,
      major: this.props.viewItem.major,
      age: this.props.viewItem.age,
      gender: this.props.viewItem.gender,
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
    axios.patch(`http://localhost:3001/api/students/${this.props.viewItem.id}`, newStudent)
      .then(res => {
        console.log('res=>', res);
        this.setState({ loading: false });
      })
      .catch(({ response: { data: { error } } }) => console.log(error));
    //Make a network call somewhere
    //event.preventDefault();
  }

  render() {
    const { classes, viewItem, pageDirect } = this.props;

    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Edit Student {viewItem.name}
      </Typography>
        <form className={classes.container} validate="true" autoComplete="off" onSubmit={this.handleSubmit}>

          <TextField
            id="standard-required"
            label="Student ID"
            placeholder={viewItem.studentId}
            required
            defaultValue={viewItem.code}
            className={classes.textField}
            margin="normal"
            value={this.state.studentId}
            onChange={this.handleStudentId}
          />
          <TextField
            id="standard-with-placeholder"
            label="Student Name"
            placeholder={viewItem.name}
            required
            className={classes.textField}
            margin="normal"
            value={this.state.name}
            onChange={this.handleName}
          />
          <TextField
            id="standard-with-placeholder"
            label="Grade"
            placeholder={viewItem.grade}
            required
            className={classes.textField}
            margin="normal"
            value={this.state.grade}
            onChange={this.handleGrade}
          />
          <TextField
            id="standard-with-placeholder"
            label="Major"
            placeholder={viewItem.major}
            required
            className={classes.textField}
            margin="normal"
            value={this.state.major}
            onChange={this.handleMajor}
          />
          <TextField
            id="standard-with-placeholder"
            label="Age"
            placeholder={viewItem.age}
            required
            className={classes.textField}
            margin="normal"
            value={this.state.age}
            onChange={this.handleAge}
          />
           <TextField
            id="standard-with-placeholder"
            label="Gender"
            placeholder={viewItem.gender}
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
            color={this.state.loading?"secondary":"primary"}
            disabled={this.state.loading}
            className={classes.button}
          >
            {this.state.loading?'Editing...':'Edit'}
        </Button>
        <Button
            style={{ marginTop: 40 }}
            variant="contained"
            color={this.state.loading?"secondary":"primary"}
            disabled={this.state.loading}
            className={classes.button}
            onClick={() => { 
               // pageDirect('list', viewItem );
               pageDirect({
                value: 'list',
                item: viewItem
              });
              }}
          >
            Go Back
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
