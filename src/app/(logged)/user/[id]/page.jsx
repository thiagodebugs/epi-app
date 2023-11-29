"use client";



import { FormUser } from "@/components";
import { useEffect, useState } from "react";

export default function ChangeUser({ params }) {
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9191/user/${params.id}`)
      .then((response) => response.json())
      .then((data) => setDataUser(data))
      .catch((error) => {
        console.error(error);
        alert("Erro ao buscar o EPI");
      });
  }, [params.id]);

  return (
    <>
      <h1>Editar Usuário</h1>
      <FormUser user={dataUser} />
    </>
  );
}
