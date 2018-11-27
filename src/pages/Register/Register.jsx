import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import DateRange from "@material-ui/icons/DateRange";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Footer from "../LoginForm/Footer/Footer.jsx";
import Header from "../LoginForm/Header/Header.jsx";
import FormHelperText from "@material-ui/core/FormHelperText";
import classNames from "classnames";
import axios from "axios";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 4
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
    marginLeft: "20px",
    marginTop: "20px",
    marginBottom: "20px"
  },
  button: {
    marginTop: "20px"
  },
  error: {
    color: "#e10050"
  }
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      gender: "female",
      password: "",
      confirmPassword: "",
      birthDay: "2017-05-24",
      firstName: "",
      lastName: "",
      errorMessages: []
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleBirthDayChange = this.handleBirthDayChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleGenderChange(e) {
    this.setState({ gender: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleBirthDayChange(e) {
    this.setState({ birthDay: e.target.value });
  }

  setErrorMessages(value) {
    this.setState({
      errorMessages: value
    });
  }

  handleSubmit() {
    event.preventDefault();
    this.setErrorMessages([]);
    const { email, password, confirmPassword } = this.state;
    let errors = [];

    if (!email) {
      errors = [
        ...errors,
        {
          className: "email",
          text: "Please input your email"
        }
      ];
    }

    if (!password) {
      errors = [
        ...errors,
        {
          className: "password",
          text: "Please input your password"
        }
      ];
    }

    if (!confirmPassword) {
      errors = [
        ...errors,
        {
          className: "confirmPassword",
          text: "Please input your confirm password"
        }
      ];
    }

    if (password !== confirmPassword) {
      errors = [
        ...errors,
        {
          className: "differentPasswordError",
          text: "Please input the same password"
        }
      ];
    }

    if (errors.length > 0) {
      this.setErrorMessages(errors);
      return;
    }

    axios
      .post("http://localhost:3001/api/NewUsers", {
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        password: this.state.password,
        DOB: this.state.birthDay,
        email: this.state.email,
        DateOfJoin: new Date(),
        Gender: this.state.gender,
        UserRole: "user"
      })
      .then(response => {
        alert("Register successfully!");
        localStorage.setItem("id_token", response.data.id);
        this.props.history.push("/dashboard");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword,
      gender,
      birthDay
    } = this.state;
    return (
      <React.Fragment>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <Grid className={classes.root} container justify="center">
            <Grid item xs={12}>
              <Grid container alignItems="flex-end" justify="center">
                <Grid item>
                  <Email />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={this.handleEmailChange}
                    required
                    autoComplete="email"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="flex-end" justify="center">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Password"
                    fullWidth
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={this.handlePasswordChange}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="flex-end" justify="center">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Confirm Password"
                    fullWidth
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={this.handleConfirmPasswordChange}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="flex-end" justify="center">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="First Name"
                    fullWidth
                    value={firstName}
                    onChange={this.handleFirstNameChange}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="flex-end" justify="center">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    value={lastName}
                    onChange={this.handleLastNameChange}
                    required
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
                    value={gender}
                    onChange={this.handleGenderChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container alignItems="flex-end" justify="center">
                <Grid item>
                  <DateRange />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth
                    value={birthDay}
                    onChange={this.handleBirthDayChange}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="flex-end" justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {this.state.errorMessages.length > 0 && (
              <div className={classes.error}>
                {this.state.errorMessages.map(({ className, text }) => (
                  <FormHelperText
                    key={className}
                    className={classNames(className, classes.error)}
                  >
                    {text}
                  </FormHelperText>
                ))}
              </div>
            )}
          </Grid>
        </form>
        <Footer />
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Register));
