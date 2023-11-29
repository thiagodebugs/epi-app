"use client";

import { Button, Container, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function FormEpi({ epi }) {
  const [values, setValues] = useState({
    id: "",
    name: "",
    description: "",
    validity: new Date().toJSON().slice(0, 10),
  });

  useEffect(() => {
    if (epi) {
      setValues({
        id: epi.id,
        name: epi.name,
        description: epi.description,
        validity: epi.validity
          ? epi.validity
          : new Date().toJSON().slice(0, 10),
      });
    }
  }, [epi]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (epi) {
      try {
        const response = await fetch(`http://localhost:9191/epi/${epi.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        alert("EPI atualizado com sucesso");
      } catch (error) {
        console.error(error);
        alert("Erro ao atualizar o EPI");
      }
    } else {
      try {
        const response = await fetch("http://localhost:9191/epi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        alert("EPI cadastrado com sucesso");
      } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar o EPI");
      }
    }
  };

  return (
    <>
      <Container component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Nome"
            variant="outlined"
            fullWidth
            required
            value={values.name}
            onChange={(event) =>
              setValues({ ...values, name: event.target.value })
            }
          />
          <TextField
            name="description"
            label="Descrição"
            variant="outlined"
            fullWidth
            required
            value={values.description}
            onChange={(event) =>
              setValues({ ...values, description: event.target.value })
            }
          />
          <TextField
            type="date"
            name="validity"
            label="Validade"
            variant="outlined"
            fullWidth
            value={values.validity}
            onChange={(event) =>
              setValues({ ...values, validity: event.target.value })
            }
          />
          <Button variant="contained" fullWidth type="submit">
            Enviar
          </Button>
        </Stack>
      </Container>
    </>
  );
}
