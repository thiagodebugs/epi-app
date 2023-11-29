import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

export default function MyCardUser({ item, refresh }) {
  const { id, name, status, role } = item;

  const handleDelete = async () => {
    const confirm = window.confirm("Deseja realmente deletar o Usuário?");
    if (!confirm) return;
    try {
      const response = await fetch(`http://localhost:9191/user/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      alert("Usuário deletado com sucesso");
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar o Usuário");
    }
    refresh();
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={`https://source.unsplash.com/random/?employee=${id}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
          {role}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          Status: {status ? "Ativo" : "Inativo"}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        <Button size="small" component={NextLink} href={`/user/${id}`}>
          Editar
        </Button>
        <Button size="small" onClick={handleDelete}>
          Deletar
        </Button>
      </CardActions>
    </Card>
  );
}
