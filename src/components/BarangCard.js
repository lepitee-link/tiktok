import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const BarangCard = ({ nomor, judul, gambar, link }) => {
  return (
    <Card style={{ backgroundColor: "#EBE9CA", marginBottom: "20px" }}>
      <CardMedia component="img" height="140" image={gambar} alt={judul} />
      <CardContent>
        <Typography variant="h6">
          {nomor}. {judul}
        </Typography>
        <Button href={link} target="_blank" color="primary">
          Pembelian
        </Button>
      </CardContent>
    </Card>
  );
};

export default BarangCard;
