"use client";

import { Container, Button, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import NextLink from "next/link";
import { Box } from "@mui/system";
import { Logo } from "@/components";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box>
          <Logo />
        </Box>

        {/* Form Login */}
        <Container
          component="form"
          maxWidth="xs"
          sx={{ display: "flex", flexDirection: "column" }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit");
          }}
        >
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.email}
            required
            onChange={(event) =>
              setValues({ ...values, email: event.target.value })
            }
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            required
            value={values.password}
            onChange={(event) =>
              setValues({ ...values, password: event.target.value })
            }
          />
          <Button
            component={NextLink}
            href="/home"
            // type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Link href="#" component={NextLink} variant="body2">
            Esqueceu a senha?
          </Link>
        </Container>

        {/* Footer */}
        <Box>
          <Typography variant="body2" color="text.secondary" align="center">
            Não tem uma conta?{" "}
            <Link href="#" component={NextLink} variant="body2">
              Cadastre-se
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
