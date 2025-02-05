import React, { useEffect, useState } from "react";
import { Container, Snackbar, Button, Alert } from "@mui/material";
import BarangList from "./components/BarangList";
import dataBarang from "./data/dataBarang.json";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setOpenSnackbar(true); // Tampilkan snackbar saat event beforeinstallprompt muncul
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
      <BarangList barangData={dataBarang} />

      {/* Snackbar untuk PWA Install */}
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={6000} // Snackbar akan hilang otomatis dalam 6 detik
      >
        <Alert
          severity="info"
          sx={{
            backgroundColor: "#b89b45", // Warna theme
            color: "#FFF9E6", // Warna teks biar kontras
            fontWeight: "bold",
          }}
          action={
            <Button
              onClick={handleInstallClick}
              sx={{
                color: "#FFF9E6",
                fontWeight: "bold",
              }}
            >
              Install
            </Button>
          }
        >
          Yuk install aplikasinya! 💕💕💕
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
