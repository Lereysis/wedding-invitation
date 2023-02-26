const validate = (input) => {
    let expresion = /^(?![ .]+$)[a-zA-Z .]*$/gm;
    let errors = {};   
    if (!input.name) {                          
        errors.name = "Falta el nombre";       
    } else if (expresion.test(input.name) === false) {
        errors.name = "Nombre invalido";
    } else if (!input.numberGuest) {
        errors.numberGuest = "Falta el número de invitados";
    } else if (input.numberGuest <= 0) {
        errors.numberGuest = "El número no puede ser negativo";
    } else if(!input.numberPhone){
        errors.numberPhone = "Falta el número"
    } else if(input.numberPhone <= 0){
        errors.numberPhone = "El número no puede ser negativo"
    }
    return errors;
}

export default validate