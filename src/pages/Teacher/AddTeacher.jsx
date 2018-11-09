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
    width: 400,
  },
});

class AddTeacher extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      teacherId: '',
      name: '',
      title: '',
      department: '',
      course: '',
      date_of_birth: '',
      gender: '',
      disabled: false,
    };

    this.handleTeacherId = this.handleTeacherId.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDepartment = this.handleDepartment.bind(this);
    this.handleCourse = this.handleCourse.bind(this);
    this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const today = new Date().getDate;
    this.setState({ current_date: today });

  }

  handleTeacherId = (event) => {
    this.setState({ teacherId: event.target.value });
  }

  handleName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleDepartment = (event) => {
    this.setState({ department: event.target.value });
  }

  handleCourse = (event) => {
    this.setState({ course: event.target.value });
  }

  handleDateOfBirth = (event) => {
    this.setState({ date_of_birth: event.target.value });
  }

  handleGender = (event) => {
    this.setState({ gender: event.target.value });
  }

  handleSubmit = (event) => {

    // if(!confirm("confirm the change?"))
    // {
    //   return
    // }
    const newTeacher = {
      teacherId: this.state.teacherId,
      name: this.state.name,
      title: this.state.title,
      department: this.state.department,
      course: this.state.course,
      date_of_birth: this.state.date_of_birth,
      gender: this.state.gender,
      disabled: this.state.disabled
    }
    this.setState({ loading: true });
    axios.post('http://localhost:3001/api/teachers', newTeacher)
      .then(res => {
        console.log('res=>', res);
        this.setState({ loading: false });
      })
      .then(
        this.props.pageDirect({
          value: 'view',
          item: newTeacher
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
          Add Teacher
      </Typography>
        <form className={classes.container} 
        validate="true" 
        autoComplete="off" 
        onSubmit={this.handleSubmit}>
          <TextField
            id="standard-with-placeholder"
            label="Teacher Id"
            placeholder="Teacher Id"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.teacherId}
            onChange={this.handleTeacherId}
          />
          <TextField
            id="standard-with-placeholder"
            label="Teacher Name"
            placeholder="Teacher Name"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.name}
            onChange={this.handleName}
          />
          <TextField
            id="standard-with-placeholder"
            label="Teacher Title"
            placeholder="Teacher Title"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.title}
            onChange={this.handleTitle}
          />
          <TextField
            id="standard-with-placeholder"
            label="Teacher Department"
            placeholder="Teacher Department"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.department}
            onChange={this.handleDepartment}
          />
          <TextField
            id="standard-with-placeholder"
            label="Teacher Course"
            placeholder="Teacher Course"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.course}
            onChange={this.handleCourse}
          />
          <TextField
            id="start_date"
            label="Date Of Birth"
            type="date"
            style={{ marginTop: 18 }}
            onChange={this.handleDateOfBirth}
            value={this.state.date_of_birth}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-with-placeholder"
            label="Teacher Gender"
            placeholder="Teacher Gender"
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

AddTeacher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTeacher);
