import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");//Primero selecciona todos los inputs

inputs.forEach( input => { //Para cada uno de los imputs
    input.addEventListener("blur", (input) => {  //agrega el addEventListener blur cuando sale de foco
        valida(input.target); //y llama a esta funcion que viene de validaciones , que valida
    });                                 //el input.target
    
});
