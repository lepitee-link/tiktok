import React, { useEffect, useState } from "react";
import { Container, Snackbar, Button, Alert } from "@mui/material";
import BarangList from "./components/BarangList";

const App = () => {
  const [barangData, setBarangData] = useState([]);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/tiktok/data/dataBarang.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBarangData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setOpenSnackbar(true);
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
        setOpenSnackbar(false);
      });
    }
  };

  return (
    <Container style={{ maxWidth: "475px", paddingLeft: 0, paddingRight: 0 }}>
      <BarangList barangData={barangData} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          sx={{ backgroundColor: "#FFA500", color: "white" }}
        >
          yuk install aplikasinya!💕
          <Button
            onClick={handleInstallClick}
            size="small"
            sx={{ marginLeft: 1, color: "white", fontWeight: "bold" }}
          >
            Pasang
          </Button>
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
