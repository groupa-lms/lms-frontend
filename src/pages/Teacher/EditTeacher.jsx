import React, { Component } from "react";
import Template from "../Template/Template";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 10
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  margin: {
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  radio: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  button: {
    marginLeft: "20px",
    marginTop: "20px"
  },
  error: {
    color: "#e10050"
  }
});

class EditTeacher extends Component {
  constructor(props) {
    super(props);
    const { title, newUsers, department } = this.props.location.data;

    this.state = {
      email: newUsers.email,
      title: title,
      firstname: newUsers.firstname,
      lastname: newUsers.lastname,
      gender: newUsers.Gender,
      birthday: newUsers.birthday,
      department: department
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleBirthDayChange = this.handleBirthDayChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleFirstNameChange(e) {
    this.setState({ firstname: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastname: e.target.value });
  }

  handleDepartmentChange(e) {
    this.setState({ department: e.target.value });
  }

  handleBirthDayChange(e) {
    this.setState({ birthday: e.target.value });
  }

  handleGenderChange(e) {
    this.setState({ gender: e.target.value });
  }

  handleSubmit() {
    const { id, newUsers } = this.props.location.data;
    const { title, department } = this.state;

    axios
      .put("https://lms-backend-new.herokuapp.com/api/teachers/" + id, {
        userID: newUsers.id,
        title: title,
        department: department
      })
      .then(() => {
        alert("Success");
        this.props.history.push("/teacher");
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    const {
      classes,
      location: { data }
    } = this.props;

    if (data === undefined) {
      this.props.history.push("/");
    }

    return (
      <Template title="Teacher View">
        <Grid className={classes.root} container justify="center">
          <Grid item xs={12}>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField
                  label="Email"
                  fullWidth
                  defaultValue={data.newUsers.email}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField
                  label="Title"
                  className={classes.textField}
                  fullWidth
                  defaultValue={data.title}
                  onChange={this.handleTitleChange}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField
                  label="Department"
                  className={classes.textField}
                  fullWidth
                  defaultValue={data.department}
                  onChange={this.handleDepartmentChange}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField
                  label="First Name"
                  fullWidth
                  defaultValue={data.newUsers.FirstName}
                  onChange={this.handleFirstNameChange}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField
                  label="Last Name"
                  fullWidth
                  defaultValue={data.newUsers.LastName}
                  onChange={this.handleLastNameChangee}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3} className={classes.radio}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="Gender"
                  name="gender1"
                  className={classes.group}
                  value={this.state.gender}
                  onChange={this.handleGenderChangee}
                  disabled
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    disabled
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    disabled
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                    disabled
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  className={classes.textField}
                  fullWidth
                  defaultValue={data.newUsers.DOB.split("T")[0]}
                  onChange={this.handleBirthDayChangee}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="button"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="button"
                  onClick={this.props.history.goBack}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Template>
    );
  }
}

export default withRouter(withStyles(styles)(EditTeacher));
