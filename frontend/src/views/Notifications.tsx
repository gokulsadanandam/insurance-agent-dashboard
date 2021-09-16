import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import {useStoreContext} from '../+state/context'
import IconButton from "@material-ui/core/IconButton/IconButton";
import { CloseRounded } from '@material-ui/icons'
import React from "react";

export interface NotificationState extends SnackbarOrigin {
  open: boolean;
}

export const AppMessages = () => {

  const { state , dispatch } = useStoreContext();
  const { notifications } = state;

  const handleClose = () => dispatch({ "type" : "app/closeNotificationMessage" })

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical : "bottom", horizontal : "right" }}
        open={notifications.open}
        onClose={handleClose}
        message={notifications.message}
        key={"notification-message"}
        autoHideDuration={3000}
        color="primary"
        action={
          <IconButton color="inherit" size="small" onClick={handleClose} >
            <CloseRounded fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}