"use client";

import { Navbar, MyCard, MySearch } from "@/components";
import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [dataEpi, setDataEpi] = useState(null);
  const [dataEpiDefault, setDataEpiDefault] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9191/epi")
      .then((res) => res.json())
      .then((data) => {
        setDataEpi(data);
        setDataEpiDefault(data);
      });
  }, []);

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
      <Navbar option="home">
        {dataEpi ? (
          <>
            <Container>
              <MySearch handleSearch={handleSearch} />
            </Container>
            <Divider sx={{ my: "20px" }} />
            <Grid container spacing={2}>
              {dataEpi.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                  <MyCard item={item} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <h1>Carregando...</h1>
        )}
      </Navbar>
    </>
  );
}
