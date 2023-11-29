"use client";

import { Button, Container, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function FormUser({ user }) {
  const [values, setValues] = useState({
    id: "",
    name: "",
    status: true,
    role: "",
  });

  useEffect(() => {
    if (user) {
      setValues({
        id: user.id,
        name: user.name,
        status: user.status,
        role: user.role,
      });
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      try {
        const response = await fetch(`http://localhost:9191/user/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        alert("Usuário atualizado com sucesso");
      } catch (error) {
        console.error(error);
        alert("Erro ao atualizar o Usuário");
      }
    } else {
      try {
        const response = await fetch("http://localhost:9191/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        alert("Usuário cadastrado com sucesso");
      } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar o Usuário");
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
            name="status"
            label="Status"
            variant="outlined"
            fullWidth
            required
            value={values.status}
            onChange={(event) =>
              setValues({ ...values, status: event.target.value })
            }
          />
          <TextField
            name="role"
            label="Função"
            variant="outlined"
            fullWidth
            value={values.role}
            onChange={(event) =>
              setValues({ ...values, role: event.target.value })
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
