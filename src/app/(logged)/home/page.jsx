"use client";

import { Navbar, MyCardEpi, MySearch } from "@/components";
import SyncIcon from "@mui/icons-material/Sync";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import NextLink from "next/link";

export default function Home() {
  const [dataEpi, setDataEpi] = useState(null);
  const [dataEpiDefault, setDataEpiDefault] = useState(null);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const response = await fetch("http://localhost:9191/epi");
      const data = await response.json();
      setDataEpi(data);
      setDataEpiDefault(data);
    } catch (error) {
      setDataEpi([]);
      console.error(error);
      alert("Erro ao carregar os dados");
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filter = dataEpiDefault.filter((item) => {
      return (
        item.name?.toLowerCase().includes(value) ||
        item.description?.toLowerCase().includes(value) ||
        item.validity?.toLowerCase().includes(value)
      );
    });
    setDataEpi(filter);
  };

  return (
    <>
      {dataEpi ? (
        <>
          <Container sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                flexGrow: 1,
                margin: "0 20px",
              }}
            >
              <MySearch handleSearch={handleSearch} />
            </Box>
            <Tooltip title="Atualizar">
              <IconButton aria-label="update" onClick={handleFetch}>
                <SyncIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Adicionar">
              <IconButton aria-label="add" component={NextLink} href="/epi">
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </Container>
          <Divider sx={{ my: "20px" }} />
          <Grid container spacing={2}>
            {dataEpi.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <MyCardEpi item={item} refresh={handleFetch} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <h1>Carregando...</h1>
      )}
    </>
  );
}
