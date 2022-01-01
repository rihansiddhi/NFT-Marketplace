import React from "react";
import {Box, Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import CloseIcon from "../../assets/icons/closeIcon";
import IconButton from "@material-ui/core/IconButton";
import customDialogStyles from "../../styles/helperComponents/customDialog";
import {makeStyles} from "@material-ui/core/styles";

const CustomDialog = ({
                               open,
                               onClose,
                               loading,
                               title,
                               onFormSubmit,
                               content,
                               actions,
                               hideBackdrop
                             }) => {
  const useStyles = makeStyles(customDialogStyles);
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
      classes={{
        paper: classes.paper,
      }}
      hideBackdrop={hideBackdrop ? hideBackdrop : false}
    >
      <DialogTitle>
        {title}
        <IconButton
          onClick={onClose}
          style={{marginRight: 13, marginTop: -10,  right: 0, position: 'absolute'}}
          disabled={loading}
          aria-label="Close"
        >
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <form onSubmit={onFormSubmit}>
          <div>{content}</div>
          <Box width="100%" className={classes.actions}>
            {actions}
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;