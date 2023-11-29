"use client";

import { MyCardUser, MySearch } from "@/components";
import SyncIcon from "@mui/icons-material/Sync";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import NextLink from "next/link";

export default function Home() {
  const [dataUser, setDataUser] = useState(null);
  const [dataUserDefault, setDataUserDefault] = useState(null);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const response = await fetch("http://localhost:9191/user");
      const data = await response.json();
      setDataUser(data);
      setDataUserDefault(data);
    } catch (error) {
      setDataUser([]);
      console.error(error);
      alert("Erro ao carregar os dados");
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filter = dataUserDefault.filter((item) => {
      return (
        item.name?.toLowerCase().includes(value) ||
        item.description?.toLowerCase().includes(value) ||
        item.validity?.toLowerCase().includes(value)
      );
    });
    setDataUser(filter);
  };

  return (
    <>
      {dataUser ? (
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
              <IconButton aria-label="add" component={NextLink} href="/user">
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </Container>
          {/*  */}
          <Divider sx={{ my: "20px" }} />
          {/*  */}
          <Grid container spacing={2}>
            {dataUser.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <MyCardUser item={item} refresh={handleFetch} />
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
