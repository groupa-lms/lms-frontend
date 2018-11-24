import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Footer from "../LoginForm/Footer/Footer.jsx";
import Header from "../LoginForm/Header/Header.jsx";

const styles = theme => ({
  root: {
    flexGrow: 1
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
  }
});

class Register extends Component {
  state = {
		gender: "female"
  };
  handleChange = event => {
		this.setState({ gender: event.target.value });
  };
  render() {
		const { classes } = this.props;
		const { gender } = this.state;
    return (
      <React.Fragment>
        <Header />
        <Grid className={classes.root} container justify="center">
          <FormControl className={classes.formControl}>
            <Grid item xs={12}>
              <Grid container spacing={24} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label="Email" />
                </Grid>
              </Grid>
              <Grid container spacing={24} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label="Password" />
                </Grid>
              </Grid>
              <Grid container spacing={24} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="Confirm Password"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label="First Name" />
                </Grid>
              </Grid>
              <Grid container spacing={24} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label="Last Name" />
                </Grid>
              </Grid>
              <Grid container spacing={24} alignItems="flex-end">
                <Grid item>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    className={classes.group}
                    value={gender}
                    onChange={this.handleChange}
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
              <Grid container spacing={24} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={24}
                alignItems="flex-end"
                justify="center"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
									  Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Footer />
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
