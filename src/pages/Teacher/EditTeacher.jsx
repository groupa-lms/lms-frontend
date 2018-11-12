import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
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

class EditTeacher extends React.Component {
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
      current_date: '',
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

  componentWillMount() {
    axios.get(`http://localhost:3001/api/teachers/${this.props.teacherId}`)
      .then((response) => {
        let teacherData = response.data;
        this.setState({
          teacherId: teacherData.teacherId,
          name: teacherData.name,
          title: teacherData.title,
          department: teacherData.department,
          course: teacherData.course,
          date_of_birth: teacherData.date_of_birth,
          gender: teacherData.gender,
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
    const newTeacher = {
      teacherId: this.state.teacherId,
      name: this.state.name,
      title: this.state.title,
      department: this.state.department,
      course: this.state.course,
      date_of_birth: this.state.date_of_birth,
      gender: this.state.gender

    }
    this.setState({ loading: true });
    axios.patch(`http://localhost:3001/api/teachers/${this.props.teacherId}`, newTeacher)
      .then(res => {
        console.log('res=>', res);
        this.setState({ loading: false });
      })
      .catch(({ response: { data: { error } } }) => console.log(error));
    //Make a network call somewhere
    //event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    const {
      teacherId,
      name,
      title,
      department,
      course,
      date_of_birth,
      gender,
    } = this.state;

    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Edit Teacher {name}
        </Typography>
        <form className={classes.container}
          validate="true"
          autoComplete="off"
          onSubmit={this.handleSubmit}>

          <TextField
            id="standard-required"
            label="Teacher ID"
            placeholder={teacherId}
            required
            className={classes.textField}
            margin="normal"
            value={this.state.teacherId}
            onChange={this.handleTeacherId}
          />
          <TextField
            id="standard-with-placeholder"
            label="Teacher Name"
            placeholder={name}
            required
            className={classes.textField}
            margin="normal"
            value={this.state.name}
            onChange={this.handleName}
          />
          <TextField
            id="standard-with-placeholder"
            label="Teacher Title"
            placeholder={title}
            required
            className={classes.textField}
            margin="normal"
            value={this.state.title}
            onChange={this.handleTitle}
          />
          <TextField
            id="standard-with-placeholder"
            label="Teacher Department"
            placeholder={department}
            required
            className={classes.textField}
            margin="normal"
            value={this.state.department}
            onChange={this.handleDepartment}
          />
          <TextField
            id="standard-with-placeholder"
            label="Teacher Course"
            placeholder={course}
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
            placeholder={date_of_birth}
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
            label="Gender"
            placeholder={gender}
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
            {this.state.loading ? 'Editing...' : 'Edit'}
          </Button>
          <Button
            style={{ marginTop: 40 }}
            variant="contained"
            color={this.state.loading ? "secondary" : "primary"}
            disabled={this.state.loading}
            className={classes.button}
          >
            <NavLink to={"/admin/teacher/list"}>
              Go Back
            </NavLink>
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

EditTeacher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditTeacher);
