const regExName = /^[A-Za-z][a-zA-Z ]{2,40}$/;
const regExEmail = /^\S+@\S+$/i;

export default function validate(input, pass) {
  let errors = {};
  if (!input.name || input.name === "" || !regExName.test(input.name)) {
    errors.name = "Nombre requerido, hasta 40 caracteres";
  }
  if (
    !input.lastName ||
    input.lastName === "" ||
    !regExName.test(input.lastName)
  ) {
    errors.lastName = "Apellido requerido";
  }
  if (
    !input.dni ||
    input.dni === "" ||
    typeof input.dni === "number" ||
    input.dni.length < 7 ||
    input.dni.length > 9
  ) {
    errors.dni = "DNI requerido";
  }
  if (!input.email || input.email === "" || !regExEmail.test(input.email)) {
    errors.email = "Campo Requerido: ejemplo@mail.com";
  }
  if (
    !pass.pass1 ||
    pass.pass1 === "" ||
    pass.pass1.length < 7 ||
    pass.pass1.length > 30
  ) {
    errors.pass1 = "Contraseña mayor a 7 digitos";
  }
  if (
    !pass.pass2 ||
    pass.pass2 === "" ||
    pass.pass2.length < 7 ||
    pass.pass2.length > 30
  ) {
    errors.pass2 = "Contraseña mayor a 7 digitos";
  }
  if (
    !input.adress ||
    input.adress === "" ||
    input.adress.length < 3 ||
    input.adress.length > 50
  ) {
    errors.adress = "Direccion requerida";
  }
  if (pass.pass1 !== pass.pass2) {
    errors.pass = "Las contraseñas no coinciden";
  }
  return errors;
}
