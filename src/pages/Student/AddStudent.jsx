import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import addStudent from "./apis/addStudent";
import addNewUser from "./apis/addNewUser";
import AlertDialog from "./Dialog/AlertDialog";
import ConfirmDialog from "./Dialog/ConfirmDialog";
import FillBlankDialog from "./Dialog/FillBlankDialog";
import { withRouter } from "react-router";
import Template from "../Template/Template";

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

class AddStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      // studentId: '',
      firstName: '',
      lastName: '',
      DOB: '',
      dateOfJoin: '',
      // grade: '',
      // major: '',
      // age: '',
      gender: '',
      userName: '',
      password: '',
      userEmail: '',
      disabled: false,
      dialogCancelOpen: false,
      dialogConfirmOpen: false,
      dialogFillBlankOpen: false,
      flag: '',
    };

    //this.handleStudentId = this.handleStudentId.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleDOB = this.handleDOB.bind(this);
    this.handleDateOfJoin = this.handleDateOfJoin.bind(this);
    //this.handleGrade = this.handleGrade.bind(this);
    //this.handleMajor = this.handleMajor.bind(this);
    //this.handleAge = this.handleAge.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const today = new Date().getDate;
    this.setState({ current_date: today });

  }

  // handleStudentId = (event) => {
  //   this.setState({ studentId: event.target.value });
  // }

  handleFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  }

  handleLastName = (event) => {
    this.setState({ lastName: event.target.value });
  }

  handleDOB = (event) => {
    this.setState({ DOB: event.target.value });
  }

  handleDateOfJoin = (event) => {
    this.setState({ dateOfJoin: event.target.value });
  }

  handleUserName = (event) => {
    this.setState({ userName: event.target.value });
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleEmail = (event) => {
    this.setState({ userEmail: event.target.value });
  }


  // handleGrade = (event) => {
  //   this.setState({ grade: event.target.value });
  // }

  // handleMajor = (event) => {
  //   this.setState({ major: event.target.value });
  // }

  // handleAge = (event) => {
  //   this.setState({ age: event.target.value });
  // }

  handleGender = (event) => {
    this.setState({ gender: event.target.value });
  }

  handleSubmit = () => {
    event.preventDefault();//prevent automatical submit and let historty.go could work with "id"
    const newUser = {
      //studentId: this.state.studentId,
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      DOB: this.state.DOB,
      DateOfJoin: this.state.dateOfJoin,
      UserRole: "student",
      Gender: this.state.gender,
      realm: "string",
      username: this.state.userName,
      password: this.state.password,
      email: this.state.userEmail,
      emailVerified: true
      // grade: this.state.grade,
      // major: this.state.major,
      // age: this.state.age,
    }
    this.setState({ loading: true });
    addNewUser(newUser)
      .then(({ data: { id } }) => {
        const newStudent = {
          userID: id,
          disabled: this.state.disabled
        }
        let data = addStudent(newStudent);
        return data;
      })
      .then((data) => {
        this.setState({ loading: false });
        this.props.history.push(`/admin/student/view/${data.id}`);
      })
      .catch(function(error) {
        console.log(error);
      });
      //.catch(({ response: { data: { error: { message, details } } } }) => console.log(message));
    
  }

  render() {
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      DOB,
      dateOfJoin,
      gender,
      userName,
      password,
      userEmail,
      //studentId,
      //grade,
      //major,
      //age,
      //gender,
      dialogCancelOpen,
      dialogConfirmOpen,
      dialogFillBlankOpen,
      flag,
    } = this.state;
    return (
      <Template title="Student Management">
        <React.Fragment>
          <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
            Create Student
      </Typography>
          <form className={classes.container}
            validate="true"
            autoComplete="off"
            onSubmit={this.handleSubmit}>
            {/* <TextField
              id="standard-with-placeholder"
              label="Student Id"
              placeholder="Student Id"
              required
              className={classes.textField}
              margin="normal"
              value={this.state.studentId}
              onChange={this.handleStudentId}
            /> */}
            <TextField
              id="standard-with-placeholder"
              label="User Name"
              placeholder="User Name"
              required
              className={classes.textField}
              margin="normal"
              value={this.state.userName}
              onChange={this.handleUserName}
            />
            <TextField
              id="standard-with-placeholder"
              label="Password"
              placeholder="Password"
              required
              className={classes.textField}
              margin="normal"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <TextField
              id="standard-with-placeholder"
              label="FirstName"
              placeholder="FirstName"
              required
              className={classes.textField}
              margin="normal"
              value={this.state.firstName}
              onChange={this.handleFirstName}
            />
            <TextField
              id="standard-with-placeholder"
              label="LastName"
              placeholder="LastName"
              required
              className={classes.textField}
              margin="normal"
              value={this.state.lastName}
              onChange={this.handleLastName}
            />
            <TextField
              id="start_date"
              label="Date of Birth"
              type="date"
              style={{ marginTop: 18 }}
              onChange={this.handleDOB}
              value={this.state.DOB}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="start_date"
              label="Date of Join"
              type="date"
              style={{ marginTop: 18 }}
              onChange={this.handleDateOfJoin}
              value={this.state.dateOfJoin}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <TextField
              id="standard-with-placeholder"
              label="Student Grade"
              placeholder="Student Grade"
              required
              className={classes.textField}
              margin="normal"
              value={this.state.grade}
              onChange={this.handleGrade}
            /> */}
            {/* <TextField
              id="standard-with-placeholder"
              label="Student Major"
              placeholder="Student Major"
              required
              className={classes.textField}
              margin="normal"
              value={this.state.major}
              onChange={this.handleMajor}
            /> */}
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
            <TextField
              id="standard-with-placeholder"
              label="User Email"
              placeholder="User Email"
              required
              className={classes.textField}
              margin="normal"
              value={this.state.userEmail}
              onChange={this.handleEmail}
            />
            <Button
              //type="submit"
              style={{ marginTop: 40 }}
              variant="contained"
              color={this.state.loading ? "secondary" : "primary"}
              disabled={this.state.loading}
              className={classes.button}
              onClick={
                () => {
                  if (firstName.length === 0 ||
                    lastName.length === 0 ||
                    DOB.length === 0 ||
                    dateOfJoin.length === 0 ||
                    gender.length === 0 ||
                    userName.length === 0 ||
                    password.length === 0 ||
                    userEmail.length === 0
                  ) {
                    this.setState({
                      dialogFillBlankOpen: !dialogFillBlankOpen,
                    });
                  }
                  else {
                    this.setState({
                      dialogConfirmOpen: !dialogConfirmOpen,
                      flag: 'confirm',
                    });
                  }
                }
              }
            >
            <FillBlankDialog
                dialogFillBlankOpen={dialogFillBlankOpen}
              />
              <ConfirmDialog
                dialogConfirmOpen={dialogConfirmOpen}
                flag={flag}
                handleSubmit={this.handleSubmit}
              />
              {this.state.loading ? 'Creating...' : 'Add'}
            </Button>
            <Button
              style={{ marginTop: 40 }}
              variant="contained"
              color={this.state.loading ? "secondary" : "primary"}
              disabled={this.state.loading}
              className={classes.button}
              onClick={
                () => {
                  this.setState({
                    dialogCancelOpen: !dialogCancelOpen,
                    flag: 'cancel',
                  });
                }
              }
            >
              <AlertDialog dialogCancelOpen={dialogCancelOpen} flag={flag} />
              cancel
          </Button>
          </form>
        </React.Fragment>
      </Template>
    );
  }
}

AddStudent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(AddStudent));
