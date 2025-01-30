import React, { useState } from "react";
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Divider,
  Container,
  Button,
} from "@mui/material";

const BarangList = ({ barangData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKategori, setFilterKategori] = useState("");

  // Mengambil semua kategori unik dari data barang
  const categories = [...new Set(barangData.map((item) => item.kategori))];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterKategori(e.target.value);
  };

  const filteredBarang = barangData.filter((item) => {
    return (
      (item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nomor.includes(searchTerm)) &&
      (filterKategori ? item.kategori === filterKategori : true)
    );
  });

  return (
    <Container
      style={{ paddingLeft: 0, paddingRight: 0, backgroundColor: "#F0E7B9" }}
    >
      {/* Card for Search and Filter Form */}
      <Box
        style={{
          backgroundColor: "#F0E7B9",
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          style={{ color: "#3C2C53" }}
        >
          Ketik nama / nomor barang yang akan kamu cari atau pilih kategori
          barang yang kamu inginkan, happy shopping! 💕💕💕
        </Typography>

        {/* Divider between text and form */}
        <Divider style={{ marginBottom: "20px" }} />

        {/* Form for Search */}
        <TextField
          label="Cari Barang"
          variant="outlined"
          fullWidth
          onChange={handleSearch}
          margin="normal"
          style={{ backgroundColor: "white" }}
        />

        {/* Form for Filter by Category */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Kategori</InputLabel>
          <Select
            value={filterKategori}
            onChange={handleFilterChange}
            style={{ backgroundColor: "white" }}
          >
            <MenuItem value="">Semua</MenuItem>
            {categories.map((kategori, index) => (
              <MenuItem key={index} value={kategori}>
                {kategori}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Divider between form and list */}
      <Divider style={{ marginBottom: "20px" }} />

      {/* Jika tidak ada barang yang ditemukan */}
      {filteredBarang.length === 0 ? (
        <Box textAlign="center" padding="40px">
          {/* Ilustrasi Not Found SVG */}
          <img
            src="https://www.svgrepo.com/show/315006/not-found.svg"
            alt="Not Found"
            style={{
              width: "auto",
              maxWidth: "300px",
              height: "auto",
            }}
          />
          <Typography
            variant="h6"
            style={{ marginTop: "20px", color: "#3C2C53" }}
          >
            Oops, barang yang kamu cari belum ada nih!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Display Filtered Barang */}
          {filteredBarang.map((barang, index) => (
            <Grid item xs={12} key={barang.nomor}>
              {/* Layout without Card */}
              <Box
                display="flex"
                alignItems="center"
                padding="15px"
                style={{
                  backgroundColor: "#FFFFFF", // Background for each item
                  boxShadow: "0 4px 8px rgba(112, 104, 59, 0.3)", // Shadow with color #70683B
                  marginBottom: "15px",
                }}
              >
                {/* Left: Nomor, Judul, Deskripsi, and Link */}
                <Box flex={1}>
                  {/* Nomor di atas Judul */}
                  <Typography
                    variant="body2"
                    style={{
                      fontSize: "10pt",
                      fontWeight: "300",
                      color: "#3C2C53",
                    }}
                  >
                    No. {barang.nomor}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: "12pt",
                      fontWeight: "bold",
                      color: "#3C2C53",
                    }}
                  >
                    {barang.judul}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      fontSize: "10pt",
                      fontWeight: "300",
                      marginBottom: "10px",
                      color: "#3C2C53",
                    }}
                  >
                    {barang.deskripsi}
                  </Typography>
                  {/* Link Pembelian dengan Warna Baru */}
                  <Button
                    href={barang.link}
                    target="_blank"
                    style={{
                      fontSize: "10pt",
                      border: "1px solid #70683B", // Outline border
                      padding: "5px 10px",
                      textTransform: "none",
                      display: "inline-block",
                      color: "#70683B", // Warna link
                    }}
                  >
                    Cek barangnya disini💕
                  </Button>
                </Box>

                {/* Right: Gambar Barang dengan Frame dan Shadow */}
                <Box
                  style={{ flexShrink: 0, width: "40%", paddingLeft: "10px" }}
                >
                  <img
                    src={barang.gambar}
                    alt={barang.judul}
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "1/1",
                      objectFit: "cover",
                      border: "3px solid #A397D8", // Frame gambar lebih besar
                      boxShadow: "0 4px 8px rgba(112, 104, 59, 0.3)", // Shadow dengan warna #70683B
                      borderRadius: "8px", // Optional: rounded corners
                    }}
                  />
                </Box>
              </Box>

              {/* Divider (Pemisah Garis) */}
              <Divider style={{ margin: "10px 0" }} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BarangList;
