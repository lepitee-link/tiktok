import React, { useEffect, useState } from "react";
import { Container, Snackbar, Button } from "@mui/material";
import BarangList from "./components/BarangList";
import dataBarang from "./data/dataBarang.json";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      console.log("Install prompt event saved.");
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User accepted the install prompt.");
        } else {
          console.log("User dismissed the install prompt.");
        }
        setDeferredPrompt(null);
        setSnackbarOpen(false);
      });
    }
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (deferredPrompt) {
      handleSnackbarOpen();
    }
  }, [deferredPrompt]);

  return (
    <Container style={{ maxWidth: "475px", paddingLeft: 0, paddingRight: 0 }}>
      <BarangList barangData={dataBarang} />
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Install the app for a better experience!"
        action={
          <Button color="inherit" onClick={handleInstallClick}>
            Install
          </Button>
        }
        autoHideDuration={6000}
      />
    </Container>
  );
};

export default App;
