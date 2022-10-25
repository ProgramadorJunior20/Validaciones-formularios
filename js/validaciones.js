/* const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (e) => {
  validarNacimiento(e.target);
}); */

export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid")
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
  }
  
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "Este campo Nombre no puede estar vacío"
  },
  email: {
    valueMissing: "Este campo Email no puede estar vacío",
    typeMismatch: "El correo no es valido"
  },
  password: {
    valueMissing: "Este campo Password no puede estar vacío",
    patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres expeciales."
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad"
  },
  numero: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El formato requerido es [XXXXXXXXXX] 10 NúMEROS"
  },
  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La dirección debe contener entre 10 y 40 carecteres"
  },
  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La ciudad debe contener entre 10 y 40 carecteres"
  },
  estado: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La estado debe contener entre 10 y 40 carecteres"
  },
}

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError( tipoDeInput, input ) {
  let mensaje = "";
  tipoDeErrores.forEach( e => {
    if ( input.validity[e] ) {
      console.log(e);
      console.log(input.validity[e]);
      console.log(mensajesDeError[tipoDeInput][e]);
      mensaje = mensajesDeError[tipoDeInput][e];
    }
  })
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";

  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciasFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );

  return diferenciasFechas <= fechaActual;
}
