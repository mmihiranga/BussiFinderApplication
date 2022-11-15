import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, title, content, handleConfirmDailog }) {
//   const [open, setOpen] = React.useState(false);


  const handleCloseConfrim = () => {
    handleConfirmDailog(true);
    setOpen(false);

   

  };
  const handleClose = () => {
    handleConfirmDailog(false);
    setOpen(false);

  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{
            color: "#231D4F",
            fontSize: "20px",
            fontWeight: "600",
            whiteSpace: "nowrap",
        }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{color: "#888888",
    fontSize: "14px",
    fontWeight: "400",
   }}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfrim}>Confrim</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialogSlide.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  handleConfirmDailog: PropTypes.func,
}
