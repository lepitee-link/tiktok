import React from "react";
import { Box, Typography, Button } from "@mui/material";

const BarangCard = ({ barang }) => {
  return (
    <Box
      sx={{
        border: "1px solid var(--text-color)",
        borderRadius: "8px",
        padding: 2,
        backgroundColor: "#FFF",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/${barang.gambar}`}
        alt={barang.judul}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <Typography
        variant="h6"
        color="var(--text-color)"
        fontFamily="'Poppins', sans-serif"
      >
        {barang.judul}
      </Typography>
      <Button
        href={barang.link}
        target="_blank"
        sx={{
          border: "1px solid var(--text-color)",
          backgroundColor: "#FFA500",
          color: "#FFF",
          marginTop: 1,
          textTransform: "none",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Cek barangnya disini💕
      </Button>
    </Box>
  );
};

export default BarangCard;
