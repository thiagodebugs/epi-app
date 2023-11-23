import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

export default function MyCard({ item, refresh }) {
  const { id, name, description, validity } = item;

  const handleDelete = async () => {
    //confirm
    const confirm = window.confirm("Deseja realmente deletar o EPI?");
    if (!confirm) return;
    try {
      const response = await fetch(`http://localhost:9191/epi/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      alert("EPI deletado com sucesso");
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar o EPI");
    }
    refresh();
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={`https://source.unsplash.com/random/?ppe=${id}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Validade: {validity ? validity : "00/00/0000"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        <Button size="small" component={NextLink} href={`/epi/${id}`}>
          Editar
        </Button>
        <Button size="small" onClick={handleDelete}>
          Deletar
        </Button>
      </CardActions>
    </Card>
  );
}
