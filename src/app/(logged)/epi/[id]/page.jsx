import { FormEpi } from "@/components";

export default function EditEpi({ params }) {
  return (
    <>
      <h1>Editar EPI: {params.id}</h1>
      <FormEpi />
    </>
  );
}
