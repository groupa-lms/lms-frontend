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
import { withRouter } from "react-router"

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
    marginTop: "20px"
  },
  error: {
    color: "#e10050"
  }
});

class ViewTeacher extends Component {
  render() {
    const {
      classes,
      location: { data }
    } = this.props;
    if(!data){
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
                  value={data.newUsers.email}
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField
                  label="First Name"
                  fullWidth
                  disabled
                  value={data.newUsers.FirstName}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={data.newUsers.LastName}
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
                  value={data.newUsers.Gender}
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
                  className={classes.textField}              
                  fullWidth
                  disabled
                  value={data.newUsers.DOB}
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

export default withRouter(withStyles(styles)(ViewTeacher));
