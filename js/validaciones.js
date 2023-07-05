//const inputFechaNacimiento = document.querySelector("#birth");

//ACA queremos escuchar el evento ne este caso le ponemos blur para escuchar cuando salga del 
//evento o cuando quite el foco de ese input
// inputFechaNacimiento.addEventListener("blur" , (evento) =>{
//     validarNacimiento(evento.target);

// });

export function valida(input){  //Aca recibe el input

 const  tipoDeInput = input.dataset.tipo;//Verifica el tipo de input
 if (validadores[tipoDeInput]){ //Si existe
    validadores[tipoDeInput](input);
 }

 console.log(input.parentElement);
 if (input.validity.valid){ //Si esta true quiero que quite la clase , 
                            //si esta false quiero que agregue la clase

    input.parentElement.classList.remove("input-container--invalid");//En caso que sea true lo remueve
    input.parentElement.querySelector(".input-message-error").innerHTML="" ;
} else {
    input.parentElement.classList.add("input-container--invalid");//En caso que sea false
                                                                     //lo agrega     
    input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput,input);
}                                                               
}

const tipoDeErrores=[ //Funcion Tipo de errores es un arreglo
"valueMissing",
"typeMismatch",
"patternMismatch",
"customError",

];


const mensajesDeError = {
    nombre: {
        valueMissing:"El campo nombre no puede estar vacío"
    },
    email: {
        valueMissing:"El campo correo no puede estar vacío",
        typeMismatch:"El correo no es válido"
    },
    password: {
        valueMissing:"El campo password no puede estar vacío",
        patternMismatch:"Al menos 6 caracteres, Maximo 12, debe contener una letra minúscula, Una letra Mayúscula, un número y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing:"El campo Fecha de nacimiento no puede estar vacío",
        customError:"Debes ser mayor de edad",
    },
    numero: {
        valueMissing:"El campo  no puede estar vacío",
        patternMismatch:"El formato requerido es XXXXXXXXXX 10 Números",
    },
    direccion:{
        valueMissing:"El campo  no puede estar vacío",
        patternMismatch:"La direccion debe contener de 10 a 40 caracteres",
    },
    ciudad:{
        valueMissing:"El campo  no puede estar vacío",
        patternMismatch:"La ciudad debe contener de 5 a 30 caracteres",
    },
    estado:{
        valueMissing:"El campo  no puede estar vacío",
        patternMismatch:"El estado debe contener de 5 a 30 caracteres",
    },



};
//A partir de aca va armando el objeto de acuerdo a los diferentes tipos de inputs 
// que vamos a tener
const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje="";
    tipoDeErrores.forEach( error => { //Aca recorremos el arreglo
     if (input.validity[error]){
        console.log(tipoDeInput,error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
     } 

    });

    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";

    // Si no es mayor de edad muestra el mensaje
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes ser mayor de edad";

    }

    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas  = new Date(fecha.getUTCFullYear() +18 ,
     fecha.getUTCMonth(), 
     fecha.getUTCDate()
     );
    
    return diferenciaFechas <= fechaActual;

}