import { Alert, AlertColor, AlertTitle, Snackbar } from "@mui/material";
import { useCallback, useState } from "react";

type alertType = {
  open: boolean;
  content: string;
  title?: string;
  severity?: AlertColor;
};

export const useAlert = () => {
  const [alert, setAlert] = useState<alertType>({
    content: "",
    open: false,
    title: "",
    severity: "info",
  });

  const handleAlert = (data: alertType) => {
    setAlert((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleClose = () => {
    setAlert((prev) => ({
      ...prev,
      open: false,
    }));
  };

  console.log({alert});
  

  return {
    alert,
    handleClose,
    handleAlert,
  };
};
