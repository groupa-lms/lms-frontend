import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from 'react-router-dom';

class AlertDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleConfirm = () => {
    this.setState({ open: false });
    this.props.history.push("/admin/course/list");
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidUpdate(prevProps) {
    const { dialogCancelOpen: prevDialogOpen } = prevProps;
    const { dialogCancelOpen } = this.props;

    if (prevDialogOpen !== dialogCancelOpen) {
      if (dialogCancelOpen) {
        this.handleClickOpen();
        return;
      }

      this.handleClose();
    }
    
  }

  render() {
    const { flag } = this.props;
    const {
      open,
    } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{flag==='cancel'?'Confirm to quit?'
              :'Confirm to save?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {flag==='cancel'?'Confirm to quit? All the unsaved infomation will be ignored.'
              :'Confirm to save the information?'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirm} color="primary">
              Confirm
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Stay here
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(AlertDialog);
