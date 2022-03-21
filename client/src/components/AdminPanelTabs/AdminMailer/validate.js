export default function validate(input) {
  let errors = {};

  if (!input.name?.length > 0) {
    errors.name = "Por favor, seleccione el nombre de una excursión";
  }
  if (!input.date) {
    errors.date = "Seleccione una fecha";
  }
  if (!input.time?.length > 0) {
    errors.time = "Seleccione un horario";
  }
  if(input.subject?.length === 0){
      errors.subject = "Debe escribir un asunto"
  }
  if(input.content?.length === 0){
      errors.content = "Debe escribir el contenido del mensaje"
  }
  return errors;
}
