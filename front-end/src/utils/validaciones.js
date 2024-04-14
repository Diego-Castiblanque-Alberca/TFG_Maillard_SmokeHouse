export function validarNombre(nombre) {
    return nombre.length >= 3;
}

export function validarEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
}

export function validarTelefono(telefono) {
    return telefono.length == 9;
}

export function validarRequerido(valor) {
    if (typeof valor === 'boolean') {
        // Para los checkboxes, un valor de `false` es inválido si el checkbox es requerido
        return valor;
    } else {
        // Para los campos de texto, un valor es inválido si es nulo, indefinido o una cadena vacía
        return valor !== null && valor !== undefined && valor !== '';
    }
}