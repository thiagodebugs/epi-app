"use client";

import { FormEpi } from "@/components";
import { useEffect, useState } from "react";

export default function EditEpi({ params }) {
  const [dataEpi, setDataEpi] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9191/epi/${params.id}`)
      .then((response) => response.json())
      .then((data) => setDataEpi(data))
      .catch((error) => {
        console.error(error);
        alert("Erro ao buscar o EPI");
      });
  }, [params.id]);

  return (
    <>
      <h1>Editar EPI: {params.id}</h1>
      <FormEpi epi={dataEpi} />
    </>
  );
}
