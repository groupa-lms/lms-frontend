import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import addCourse from "./apis/addCourse";
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
  },
});

class AddCourse extends React.Component {
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
      disabled: false,
      dialogCancelOpen: false,
      dialogConfirmOpen: false,
      dialogFillBlankOpen: false,
      flag: false,
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handleLecturer = this.handleLecturer.bind(this);
    this.handleIntroduction = this.handleIntroduction.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      disabled: false,
    }
    this.setState({ loading: true });
    addCourse(newCourse)
      .then(({data}) => {
        console.log(data.id);
        this.setState({ loading: false });
        this.props.history.push(`/admin/course/view/${data.id}`);
      })
      .catch(({data}) => console.log("fail"+data));
    //Make a network call somewhere
    //event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    const {
      flag,
      code,
      title,
      lecturer,
      dialogCancelOpen,
      dialogConfirmOpen,
      dialogFillBlankOpen,
    } = this.state;
    return (
      <React.Fragment>
        <Typography component="h4" variant="h4" style={{ marginTop: 64 }}>
          Add Course
      </Typography>
        <form className={classes.container}
          validate="true"
          autoComplete="off"
          onSubmit={this.handleSubmit}>
          <TextField
            id="standard-with-placeholder"
            label="Course Code"
            placeholder="Course Code"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.code}
            onChange={this.handleCode}
          />
          <TextField
            id="standard-with-placeholder"
            label="Course Title"
            placeholder="Course Title"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.title}
            onChange={this.handleTitle}
          />
          <TextField
            id="standard-with-placeholder"
            label="Course Lecturer"
            placeholder="Course Lecturer"
            required
            className={classes.textField}
            margin="normal"
            value={this.state.lecturer}
            onChange={this.handleLecturer}
          />
          <TextField
            id="start_date"
            label="Start Date"
            type="date"
            style={{ marginTop: 18 }}
            onChange={this.handleStartDate}
            value={this.state.start_date}
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
            value={this.state.end_date}
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
            style={{
              margin: 8,
              marginTop: 18
            }}
            rows="5"
            margin="normal"
            value={this.state.introduction}
            onChange={this.handleIntroduction}
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
                  title.length === 0 ||
                  lecturer.length === 0
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
    );
  }
}

AddCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddCourse);
