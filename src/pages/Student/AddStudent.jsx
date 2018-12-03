import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import addStudent from "./apis/addStudent";
import AlertDialog from "./Dialog/AlertDialog";
import ConfirmDialog from "./Dialog/ConfirmDialog";
import FillBlankDialog from "./Dialog/FillBlankDialog";

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
      studentId: '',
      name: '',
      grade: '',
      major: '',
      age: '',
      gender: '',
      disabled: false,
      dialogCancelOpen: false,
      dialogConfirmOpen: false,
      dialogFillBlankOpen: false,
      flag:'',
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

  handleSubmit = () => {
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
    addStudent(newStudent)
      .then(({ data }) => {
        this.setState({ loading: false });
        this.props.history.push(`/admin/student/view/${data.id}`);
      })
      .catch(({ response: { data: { error } } }) => console.log(error));
    //Make a network call somewhere
    //event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    const { 
      studentId,
      name,
      grade,
      major,
      age,
      gender,
      dialogCancelOpen, 
      dialogConfirmOpen, 
      dialogFillBlankOpen,
      flag, 
    } = this.state;
    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Add Student
      </Typography>
        <form className={classes.container}
          validate="true"
          autoComplete="off"
          onSubmit={this.handleSubmit}>
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
            //type="submit"
            style={{ marginTop: 40 }}
            variant="contained"
            color={this.state.loading ? "secondary" : "primary"}
            disabled={this.state.loading}
            className={classes.button}
            onClick={
              () => {
                 if(studentId.length===0||
                  name.length===0||
                  grade.length===0||
                  major.length===0||
                  age.length===0||
                  gender.length===0
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
                  flag:'cancel',
                 });
              }
            }
          >
           <AlertDialog dialogCancelOpen={dialogCancelOpen} flag={flag}/>
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
