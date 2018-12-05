import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false
    };
    this.setDirty = this.setDirty.bind(this);
  }
  setDirty(value) {
    this.setState({
      dirty: value,
    });
  }

  render() {
    const { name, onChange, errorMessage, formDirty, ...props } = this.props;
    const { dirty } = this.state;
    const showErrorMessage = errorMessage && (dirty || formDirty);
    return (
      <React.Fragment>
        <InputLabel htmlFor={name}>{name}</InputLabel>
        <Input 
          onChange={({ target: { value } }) => {
            this.setDirty(true);
            onChange(value);
          }} 
          {...props}
        />
        {showErrorMessage && (
          <FormHelperText id="component-error-text" error>
            {errorMessage}
          </FormHelperText>
        )}
      </React.Fragment>
    );
  }
}

export default FormInput;
