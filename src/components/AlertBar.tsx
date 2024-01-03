"use client";
import { useAlert } from "@/hooks/useAlert";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

type Props = {};

const AlertBar = (props: Props) => {
  const { alert, handleClose } = useAlert();
  console.log(alert);

  return (
    <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        sx={{ width: "100%" }}
      >
        {alert.content}
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;
