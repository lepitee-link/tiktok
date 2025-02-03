import React, { useState, useMemo } from "react";
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Container,
  Button,
} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const BarangList = ({ barangData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKategori, setFilterKategori] = useState("");

  const categories = [...new Set(barangData.map((item) => item.kategori))];

  const filteredBarang = useMemo(() => {
    return barangData.filter((item) => {
      return (
        (item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nomor.includes(searchTerm)) &&
        (filterKategori ? item.kategori === filterKategori : true)
      );
    });
  }, [barangData, searchTerm, filterKategori]);

  return (
    <Container sx={{ px: 0, mb: 4 }}>
      <Box sx={{ mb: 2, p: 1 }}>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          color="#3C2C53"
          fontFamily="'Poppins', sans-serif"
        >
          Ketik nama / nomor barang yang akan kamu cari atau pilih kategori,
          happy shopping! 💕💕💕
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <TextField
            label="Cari Barang"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              backgroundColor: "white",
              fontSize: "0.875rem",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#FFA500",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFA500",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
                "&.Mui-focused": {
                  color: "#FFA500",
                },
                fontFamily: "'Poppins', sans-serif", // Match the app font
              },
            }}
            inputProps={{ "aria-label": "Cari Barang" }}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel
              sx={{
                color: "#aaa",
                "&.Mui-focused": {
                  color: "#FFA500",
                },
                fontFamily: "'Poppins', sans-serif", // Match the app font
              }}
            >
              Kategori
            </InputLabel>
            <Select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              sx={{
                backgroundColor: "white",
                fontSize: "0.875rem",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFA500",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FFA500",
                  },
                },
                "& .MuiSelect-icon": {
                  color: "#FFA500",
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                  "&.Mui-focused": {
                    color: "#FFA500",
                  },
                  fontFamily: "'Poppins', sans-serif", // Match the app font
                },
              }}
            >
              <MenuItem
                value=""
                sx={{
                  "&:hover": { backgroundColor: "#FFA500", color: "white" },
                  "&.Mui-selected": {
                    backgroundColor: "#FFA500",
                    color: "white",
                  },
                }}
              >
                Semua
              </MenuItem>
              {categories.map((kategori, index) => (
                <MenuItem
                  key={index}
                  value={kategori}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#FFA500", color: "white" },
                    "&.Mui-selected": {
                      backgroundColor: "#FFA500",
                      color: "white",
                    },
                  }}
                >
                  {kategori}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box>
        {filteredBarang.length === 0 ? (
          <Box textAlign="center" padding={5}>
            <SearchOffIcon sx={{ fontSize: 60, color: "#3C2C53" }} />
            <Typography
              variant="h6"
              mt={2}
              color="#3C2C53"
              fontFamily="'Poppins', sans-serif"
            >
              Oops, barang yang kamu cari belum ada nih!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={1}>
            {filteredBarang.map((barang, index) => (
              <Grid item xs={12} key={barang.nomor}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    backgroundColor: "transparent",
                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                    mb: 0.5,
                  }}
                >
                  <Box flex={1}>
                    <Box sx={{ borderTop: "3px solid #FFA500", pt: 1 }}>
                      <Typography
                        variant="body2"
                        fontSize={12}
                        fontWeight={300}
                        color="#3C2C53"
                        fontFamily="'Poppins', sans-serif"
                      >
                        No. {barang.nomor}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontSize={16}
                        fontWeight="bold"
                        color="#3C2C53"
                        fontFamily="'Poppins', sans-serif"
                      >
                        {barang.judul}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontSize={12}
                        fontWeight={300}
                        mb={1}
                        color="#3C2C53"
                        fontFamily="'Poppins', sans-serif"
                      >
                        {barang.deskripsi}
                      </Typography>
                      <Button
                        href={barang.link}
                        target="_blank"
                        sx={{
                          fontSize: 12,
                          border: "1px solid #70683B",
                          padding: "6px 12px",
                          textTransform: "none",
                          color: "#FFA500",
                          backgroundColor: "transparent",
                          fontFamily: "'Poppins', sans-serif", // Match the app font
                        }}
                        aria-label={`Cek barang ${barang.judul}`}
                      >
                        Cek barangnya disini💕
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: "40%",
                      pl: index % 2 === 0 ? 2 : 0,
                      pr: index % 2 !== 0 ? 2 : 0,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#FFA500",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/${barang.gambar}`}
                        alt={barang.judul}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          border: "none",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default BarangList;
