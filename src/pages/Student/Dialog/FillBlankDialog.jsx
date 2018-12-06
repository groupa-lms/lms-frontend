import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from 'react-router-dom';

class FillBlankDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidUpdate(prevProps) {
    const { dialogFillBlankOpen: prevDialogOpen } = prevProps;
    const { dialogFillBlankOpen } = this.props;

    if (prevDialogOpen !== dialogFillBlankOpen) {
      if (dialogFillBlankOpen) {
        this.handleClickOpen();
        return;
      }
      this.handleClose();
    }
    
  }

  render() {
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
          <DialogTitle id="alert-dialog-title">{'Fill the blank'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {'Please fill the (*)required item before submit'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(FillBlankDialog);
