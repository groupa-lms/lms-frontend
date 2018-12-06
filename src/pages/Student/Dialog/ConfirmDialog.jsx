import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from 'react-router-dom';

class ConfirmDialog extends React.Component {
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
    this.setState({ open: true });
    this.props.handleSubmit();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidUpdate(prevProps) {
    const { dialogConfirmOpen: prevDialogOpen } = prevProps;
    const { dialogConfirmOpen } = this.props;

    if (prevDialogOpen !== dialogConfirmOpen) {
      if (dialogConfirmOpen) {
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
          <DialogTitle id="alert-dialog-title">{flag==='confirm'?
          'Confirm to save?':'Confirm to quit?'
              }</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {flag==='confirm'?'Confirm to save the information?':
              'Confirm to quit? All the unsaved infomation will be ignored.'
              }
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

export default withRouter(ConfirmDialog);
