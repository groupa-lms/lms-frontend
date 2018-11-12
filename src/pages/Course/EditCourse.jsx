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
  },
});

class EditCourse extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      code: '',
      title: '',
      lecturer: '',
      introduction: '',
      start_date: '',
      end_date: '',
      current_date: '',
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handleLecturer = this.handleLecturer.bind(this);
    this.handleIntroduction = this.handleIntroduction.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.get(`http://localhost:3001/api/courses/${this.props.courseId}`)
    .then((response) => {
      let courseData = response.data;
      this.setState({
        code: courseData.code,
        title: courseData.title,
        lecturer: courseData.lecturer,
        introduction: courseData.introduction,
        start_date: courseData.start_date,
        end_date: courseData.end_date,
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

  handleLecturer = (event) => {
    this.setState({ lecturer: event.target.value });
  }

  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleIntroduction = (event) => {
    this.setState({ introduction: event.target.value });
  }

  handleStartDate = (event) => {
    this.setState({ start_date: event.target.value });
  }

  handleEndDate = (event) => {
    this.setState({ end_date: event.target.value });
  }

  handleSubmit = (event) => {
    const newCourse = {
      code: this.state.code,
      title: this.state.title,
      lecturer: this.state.lecturer,
      introduction: this.state.introduction,
      start_date: this.state.start_date,
      end_date: this.state.end_date,

    }
    this.setState({ loading: true });
    axios.patch(`http://localhost:3001/api/courses/${this.props.courseId}`, newCourse)
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
      code,
      title,
      lecturer,
      introduction,
      start_date,
      end_date,
      current_date,
    } = this.state;

    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Edit Course {title}
        </Typography>
        <form className={classes.container} 
        validate="true" 
        autoComplete="off" 
        onSubmit={this.handleSubmit}>

          <TextField
            id="standard-required"
            label="Course Code"
            placeholder={code}
            required
            className={classes.textField}
            margin="normal"
            value={code}
            onChange={this.handleCode}
          />
          <TextField
            id="standard-with-placeholder"
            label="Course Title"
            placeholder={title}
            required
            className={classes.textField}
            margin="normal"
            value={title}
            onChange={this.handleTitle}
          />
          <TextField
            id="standard-with-placeholder"
            label="Course Lecturer"
            placeholder={lecturer}
            required
            className={classes.textField}
            margin="normal"
            value={lecturer}
            onChange={this.handleLecturer}
          />
          {/* <TextField
            id="standard-full-width"
            label=""
            style={{ 
              margin: 8,
              marginTop: 18
            }}
            placeholder="Introduction"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.introduction}
            onChange={this.handleIntroduction}
          /> */}
          <TextField
            id="start_date"
            label="Start Date"
            type="date"
            style={{ marginTop: 18 }}
            onChange={this.handleStartDate}
            placeholder={start_date}
            value={start_date}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="end_date"
            label="End Date"
            type="date"
            onChange={this.handleEndDate}
            style={{ marginTop: 18 }}
            placeholder={end_date}
            value={end_date}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-multiline-static"
            label="Course Introduction"
            multiline
            fullWidth
            placeholder={introduction}
            style={{
              margin: 8,
              marginTop: 18
            }}
            rows="5"
            margin="normal"
            value={introduction}
            onChange={this.handleIntroduction}
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
          <NavLink to={"/admin/course/list"}>
              Go Back
          </NavLink>
        </Button>
        </form>
      </React.Fragment>
    );
  }
}

EditCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditCourse);
