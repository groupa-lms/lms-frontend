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
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";


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
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class CreateTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;

    return (
      <Template title="Create Teacher">
        <Grid className={classes.root} container justify="center">
          <Grid item xs={12}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField
                  label="Title"
                  className={classes.textField}
                  value=""
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField
                  label="Department"
                  className={classes.textField}
                  fullWidth
                  value=""
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField label="First Name" fullWidth value="" />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3}>
                <TextField label="Last Name" fullWidth value="" />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" justify="center">
              <Grid item xs={3} className={classes.radio}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="Gender"
                  name="gender1"
                  className={classes.group}
                  value=""
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
              <Grid item xs={3}>
                <TextField
                  id="date"
                  label="Birthday"
                  className={classes.textField}
                  fullWidth
                  value=""
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

export default withRouter(withStyles(styles)(CreateTeacher));
