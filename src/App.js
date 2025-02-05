import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import BarangList from "./components/BarangList";
import dataBarang from "./data/dataBarang.json";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

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
    </Container>
  );
};

export default App;
