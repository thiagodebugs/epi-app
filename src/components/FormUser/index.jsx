"use client";

import {
  Button,
  Container,
  Stack,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function FormUser({ user }) {
  const [values, setValues] = useState({
    id: "",
    name: "",
    status: {
      label: "Inativo",
      value: false,
    },
    role: "",
  });

  useEffect(() => {
    if (user) {
      console.log(user);
      setValues({
        id: user.id,
        name: user.name,
        status: {
          label: user.status ? "Ativo" : "Inativo",
          value: user.status,
        },
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
            name="role"
            label="Função"
            variant="outlined"
            fullWidth
            value={values.role}
            onChange={(event) =>
              setValues({ ...values, role: event.target.value })
            }
          />
          <Autocomplete
            options={[
              { label: "Ativo", value: true },
              { label: "Inativo", value: false },
            ]}
            getOptionLabel={(option) => option.label}
            id="controlled-demo"
            value={values.status?.value}
            onChange={(event, newValue) => {
              setValues({ ...values, status: newValue.value });
            }}
            isOptionEqualToValue={(option, selected) =>
              option?.value === selected?.value
            }
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
          <Button variant="contained" fullWidth type="submit">
            Enviar
          </Button>
        </Stack>
      </Container>
    </>
  );
}
