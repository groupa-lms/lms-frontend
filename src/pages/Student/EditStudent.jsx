import React from 'react';
import FillBlankDialog from "./Dialog/FillBlankDialog";
import AlertDialog from "./Dialog/AlertDialog";
import ConfirmDialog from "./Dialog/ConfirmDialog";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import getStudent from "./apis/getStudent";
import editStudent from "./apis/editStudent";
import editUser from "./apis/editUser";
import { withRouter } from "react-router";
import Template from "../Template/Template";
import * as moment  from 'moment';

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
      //studentId: '',
      firstName:'',
      lastName:'',
      DOB: '',
      dateOfJoin:'',
      userName: '',
      //password: '', //change through "reset-password" API
      userEmail: '',
      userId:'',
      //grade: '',
      //major: '',
      gender: '',
      disabled: false,
      current_date: '',
      dialogCancelOpen: false,
      dialogConfirmOpen: false,
      dialogFillBlankOpen: false,
      flag:'',
    };

    //this.handleStudentId = this.handleStudentId.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    //this.handleGrade = this.handleGrade.bind(this);
    //this.handleMajor = this.handleMajor.bind(this);
    this.handleDOB = this.handleDOB.bind(this);
    this.handleDateOfJoin = this.handleDateOfJoin.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    getStudent(this.props.match.params.id)
      .then((response) => {
        let studentData = response.data;
        this.setState({
          studentId: studentData.id,
          userId:studentData.newUsers.id,
          firstName: studentData.newUsers.FirstName,
          lastName: studentData.newUsers.LastName,
          DOB: moment(studentData.newUsers.DOB).format('YYYY-MM-DD'),
          dateOfJoin: moment(studentData.newUsers.DateOfJoin).format('YYYY-MM-DD'),
          //grade: studentData.grade,
          //major: studentData.major,
          gender: studentData.newUsers.Gender,
          userName: studentData.newUsers.username,
          userEmail: studentData.newUsers.email,
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

  // handleStudentId = (event) => {
  //   this.setState({ studentId: event.target.value });
  // }

  handleFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  }

  handleLastName = (event) => {
    this.setState({ lastName: event.target.value });
  }

  handleUserName = (event) => {
    this.setState({ userName: event.target.value });
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

  handleDOB = (event) => {
    this.setState({ DOB: event.target.value });
  }

  handleDateOfJoin = (event) => {
    this.setState({ dateOfJoin: event.target.value });
  }

  handleGender = (event) => {
    this.setState({ gender: event.target.value });
  }

  handleSubmit = () => {
    event.preventDefault();//prevent automatical submit and let historty.go could work with "id"
    const newUser = {
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      DOB: moment(this.state.DOB).format('YYYY-MM-DD'),
      DateOfJoin: moment(this.state.dateOfJoin).format('YYYY-MM-DD'),
      UserRole: "student",
      Gender: this.state.gender,
      realm: "string",
      username: this.state.userName,
      email: this.state.userEmail,
      emailVerified: true
      // grade: this.state.grade,
      // major: this.state.major,
      // age: this.state.age,
    }
    this.setState({ 
      loading: true,
     });
    editUser(this.state.userId, newUser)
    .then(()=>{
      const newStudent={
        userID: this.state.userId,
        disabled: this.state.disabled,
        id: this.state.studentId
      }
      let data = editStudent(this.props.match.params.id, newStudent);
      return data;
    })
    .then(({data}) => {
        console.log('res=>', data.id);
        this.setState({ loading: false });
        this.props.history.push(`/admin/student/view/${data.id}`);
       })
       .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    const {
      //studentId,
      firstName,
      lastName,
      DOB,
      dateOfJoin,
      userName,
      userEmail,
     // grade,
     // major,
     // age,
      gender,
      dialogCancelOpen,
      dialogConfirmOpen,
      dialogFillBlankOpen,
      flag,
    } = this.state;

    return (
      <Template title="Student Management">
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Edit Student {firstName}
        </Typography>
        <form className={classes.container}
          validate="true"
          autoComplete="off"
          onSubmit={this.handleSubmit}>
          {/* <TextField
            id="standard-required"
            label="Student ID"
            placeholder={studentId}
            required
            className={classes.textField}
            margin="normal"
            value={studentId}
            onChange={this.handleStudentId}
          /> */}
           <TextField
              id="standard-with-placeholder"
              label="FirstName"
              placeholder="FirstName"
              required
              className={classes.textField}
              margin="normal"
              value={firstName}
              onChange={this.handleFirstName}
            />
            <TextField
              id="standard-with-placeholder"
              label="LastName"
              placeholder="LastName"
              required
              className={classes.textField}
              margin="normal"
              value={lastName}
              onChange={this.handleLastName}
            />
           <TextField
              id="start_date"
              label="Date of Birth"
              type="date"
              style={{ marginTop: 18 }}
              onChange={this.handleDOB}
              value={DOB}
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
              value={dateOfJoin}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          {/* <TextField
            id="standard-with-placeholder"
            label="Grade"
            placeholder={grade}
            required
            className={classes.textField}
            margin="normal"
            value={grade}
            onChange={this.handleGrade}
          /> */}
          {/* <TextField
            id="standard-with-placeholder"
            label="Major"
            placeholder={major}
            required
            className={classes.textField}
            margin="normal"
            value={major}
            onChange={this.handleMajor}
          /> */}
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

          <TextField
              id="standard-with-placeholder"
              label="User Name"
              placeholder="User Name"
              required
              className={classes.textField}
              margin="normal"
              value={userName}
              onChange={this.handleUserName}
            />
            <TextField
              id="standard-with-placeholder"
              label="User Email"
              placeholder="User Email"
              required
              className={classes.textField}
              margin="normal"
              value={userEmail}
              onChange={this.handleEmail}
            />
          <Button
            style={{ marginTop: 40 }}
            variant="contained"
            color={this.state.loading ? "secondary" : "primary"}
            disabled={this.state.loading}
            className={classes.button}
            onClick={
              () => {
                if(
                  firstName.length === 0 ||
                  lastName.length === 0 ||
                  DOB.length === 0 ||
                  dateOfJoin.length === 0 ||
                  gender.length === 0 ||
                  userName.length === 0 ||
                  userEmail.length === 0
                  )
                  {
                    this.setState({ 
                      dialogFillBlankOpen: !dialogFillBlankOpen,
                     });
                  }
                  else{
                    this.setState({ 
                      dialogConfirmOpen: !dialogConfirmOpen,
                      flag:'confirm',
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
          Edit
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
                  flag:'cancel',
                 });
              }
            }
          >
          <AlertDialog dialogCancelOpen={dialogCancelOpen} flag={flag}/>
              Cancel
          </Button>
        </form>
      </React.Fragment>
      </Template>
    );
  }
}

EditStudent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EditStudent));
