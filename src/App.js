import React, { useEffect, useState } from "react";
import { Container, Button, Snackbar } from "@mui/material";
import BarangList from "./components/BarangList";
import dataBarang from "./data/dataBarang.json";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      console.log("Install prompt event saved.");
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

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
      });
    }
  };

  // Function to check for updates in dataBarang.json
  const checkForUpdates = async () => {
    try {
      const response = await fetch("/data/dataBarang.json");
      const updatedData = await response.json();

      if (JSON.stringify(updatedData) !== JSON.stringify(dataBarang)) {
        showSnackbar("Ada produk baru, cek sekarang!");
      }
    } catch (error) {
      console.error("Error fetching dataBarang.json:", error);
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Polling to check for updates every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(checkForUpdates, 30000);
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <Container style={{ maxWidth: "475px", paddingLeft: 0, paddingRight: 0 }}>
      <BarangList barangData={dataBarang} />
      {deferredPrompt && (
        <Button
          onClick={handleInstallClick}
          variant="contained"
          color="primary"
        >
          Install App
        </Button>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default App;
