import React from "react";
import { Container } from "@mui/material";
import BarangList from "./components/BarangList";
import dataBarang from "./data/dataBarang.json"; // Mengimpor data JSON

const App = () => {
  return (
    <Container style={{ maxWidth: "475px", paddingLeft: 0, paddingRight: 0 }}>
      <BarangList barangData={dataBarang} />{" "}
      {/* Menampilkan data dari file JSON */}
    </Container>
  );
};

export default App;
