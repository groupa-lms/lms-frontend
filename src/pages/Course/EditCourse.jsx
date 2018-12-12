import React from 'react';
import FillBlankDialog from "./Dialog/FillBlankDialog";
import AlertDialog from "./Dialog/AlertDialog";
import ConfirmDialog from "./Dialog/ConfirmDialog";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import getTeacher from "../Teacher/apis/getTeacher";
import getTeacherList from "../Teacher/apis/getTeacherList";
import getCourse from "./apis/getCourse";
import editCourse from "./apis/editCourse";
//import editStudent from "./apis/editStudent";
import editUser from "./apis/editUser";
import { withRouter } from "react-router";
import Template from "../Template/Template";
import MenuItem from '@material-ui/core/MenuItem';
import * as moment from 'moment';

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

class EditCourse extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      code: '',
      name: '',
      teacher: '',
      faculty: '',
      description: '',
      startDate: '',
      endDate: '',
      teacherNameList: [],
      current_date: '',
      dialogCancelOpen: false,
      dialogConfirmOpen: false,
      dialogFillBlankOpen: false,
      flag: '',
    };

    this.handleCode = this.handleCode.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleTeacher = this.handleTeacher.bind(this);
    this.handleFaculty = this.handleFaculty.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
  }

  componentWillMount() {
    getCourse(this.props.match.params.id)
      .then((response) => {
        let courseData = response.data;
        this.setState({
          code: courseData.code,
          name: courseData.name,
          lastName: courseData.LastName,
          faculty: courseData.faculty,
          description: courseData.description,
          startDate: moment(courseData.start_date).format('YYYY-MM-DD'),
          endDate: moment(courseData.end_date).format('YYYY-MM-DD'),
        });
        return getTeacher(response.data.teachers.id);
      })
      .then((data) => {
        this.setState({
          teacher: data.newUsers.FirstName + " " + data.newUsers.LastName,
        });
        return getTeacherList();
      })
      .then((response)=>{
        let teacherList = response;
        let teacherNameList = [];
        teacherList.map((item)=>{
          teacherNameList.push({
            id : item.id,
            name : item.newUsers.FirstName + " " + item.newUsers.LastName,
          });
        });
        this.setState({
          teacherNameList: [...teacherNameList],
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

  handleCode = (event) => {
    this.setState({ code: event.target.value });
  }

  handleName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleTeacher = (event) => {
    this.setState({ teacher: event.target.value });
  }

  handleFaculty = (event) => {
    this.setState({ faculty: event.target.value });
  }

  handleStartDate = (event) => {
    this.setState({ startDate: event.target.value });
  }

  handleEndDate = (event) => {
    this.setState({ endDate: event.target.value });
  }

  handleDescription = (event) => {
    this.setState({ description: event.target.value });
  }

  handleSubmit = () => {
    event.preventDefault();//prevent automatical submit and let historty.go could work with "id"
    const newCourse = {
      code: this.state.code,
      name: this.state.name,
      faculty: this.state.faculty,
      description: this.state.description,
      startDate: moment(this.state.start_date).format('YYYY-MM-DD'),
      endDate: moment(this.state.end_date).format('YYYY-MM-DD')
    }
    editCourse(this.props.match.params.id, newCourse)
    .then(({data})=>{
      return getTeacher(data.teacherId);
    })
    .then((data)=>{
      let teacherName = data.newUsers.FirstName + " " + data.newUsers.LastName;
      console.log(teacherName+" "+this.state.teahcer)
      let teacherNameList = this.state.teacherNameList;
      teacherNameList=teacherNameList.filter(item => {
        return item.name === this.state.teacher;
      });
      const changeId = {
        teacherId: teacherNameList[0].id,
      }
      editCourse(this.props.match.params.id, changeId)
      .then(
        ()=>{
          this.props.history.push(`/admin/course/view/${this.props.match.params.id}`);
        }
      )
    })
    .catch(function (error) {
      console.log(error);
    });     
  }

  render() {
    const { classes } = this.props;
    const {
      code,
      name,
      teacher,
      faculty,
      description,
      startDate,
      endDate,
      teacherNameList,
      dialogCancelOpen,
      dialogConfirmOpen,
      dialogFillBlankOpen,
      flag,
    } = this.state;

    return (
      <Template title="Student Management">
        <React.Fragment>
          <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
            Edit Course {code}
          </Typography>
          <form className={classes.container}
            validate="true"
            autoComplete="off"
            onSubmit={this.handleSubmit}>
            <TextField
              id="standard-required"
              label="Course Code"
              placeholder=""
              required
              className={classes.textField}
              margin="normal"
              value={code}
              onChange={this.handleCode}
            />
            <TextField
              id="standard-with-placeholder"
              label="Course Name"
              placeholder="Course Name"
              required
              className={classes.textField}
              margin="normal"
              value={name}
              onChange={this.handleName}
            />
            <TextField
              id="standard-with-placeholder"
              label="Faculty"
              placeholder="Faculty"
              required
              className={classes.textField}
              margin="normal"
              value={faculty}
              onChange={this.handleFaculty}
            />
            <TextField
              id="standard-with-placeholder"
              label="Teacher"
              placeholder="Teacher"
              required
              select
              className={classes.textField}
              margin="normal"
              value={teacher}
              onChange={this.handleTeacher}
            >
            {teacherNameList.map(option => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
            </TextField>
            <TextField
              id="start_date"
              label="Start Date"
              type="date"
              style={{ marginTop: 18 }}
              onChange={this.handleStartDate}
              value={startDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="end_date"
              label="End Date"
              type="date"
              style={{ marginTop: 18 }}
              onChange={this.handleEndDate}
              value={endDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-textarea"
              label="Description"
              placeholder="Description"
              multiline
              required
              className={classes.textField}
              margin="normal"
              value={description}
              onChange={this.handleDescription}
            />
            <Button
              style={{ marginTop: 40 }}
              variant="contained"
              color={this.state.loading ? "secondary" : "primary"}
              disabled={this.state.loading}
              className={classes.button}
              onClick={
                () => {
                  if (
                    code.length === 0 ||
                    name.length === 0 ||
                    faculty.length === 0 ||
                    teacher.length === 0 ||
                    description.length === 0 ||
                    startDate.length === 0 ||
                    endDate.length === 0
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
                    flag: 'cancel',
                  });
                }
              }
            >
              <AlertDialog dialogCancelOpen={dialogCancelOpen} flag={flag} />
              Cancel
          </Button>
          </form>
        </React.Fragment>
      </Template>
    );
  }
}

EditCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(EditCourse));
