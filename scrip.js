// Obtener referencias a los elementos del HTML con ayuda de los respectivos id's asignados
const encriptarBt = document.getElementById('Encriptar');
const desencriptarBt = document.getElementById('Desencriptar');
const copiarBt = document.getElementById('Copiar');
let ingreso = document.getElementById("mensajeIngreso");
let salida = document.getElementById("mensajeSalida");


//Constante donde se almacenan los datos a intercambiar, ufnciona en ambos sentidos
const CambiosLetras ={'a':'ai',
                      'e':'enter',
                      'i':'imes',
                      'o':'ober',
                      'u':'ufat'
                      };


//Esta funcion se encarga de poner la animación en la que los textarea giran 360 Grados
function moverTexto(texto, elemento) {
    elemento.innerText = texto;
    elemento.style.display = "block";
    elemento.style.animation = "desplazar 1.5s";

    // Reinicia la animación después de completarse
    setTimeout(() => {
        elemento.style.animation = "";
    }, 1500);
}
                      // Función para encriptar un mensaje que recibe como parametro un mensaje tipo string
function encriptarMensaje(mensaje) {
    
    let mensajeEncriptado = ""; //creamos una variable tipo String
    for (let i = 0; i < mensaje.length; i++) {  // recorremos la longitud del texto que se ingreso al inicio
        let letra = mensaje.charAt(i); //se revisa letra por letra si existe en la constante susticiones
        if (CambiosLetras[letra]) {
            mensajeEncriptado += CambiosLetras[letra];  // si existe en sustituciones es reemplazada por el otro valor
        } else {
            mensajeEncriptado += letra; // sino se deja la letra igual
        }
    }
    return mensajeEncriptado; // se devuelve el mensaje ya con los cambios
    
}

//Función para desencriptar un mensaje que recibe como parametro un mensaje tipo string
function desencriptarMensaje(mensajeEncriptado) {
    let mensajeDesencriptado = "";
    const LetrasInversas = {};
    for (const letra in CambiosLetras) {
        const CambioLetra = CambiosLetras[letra];
        LetrasInversas[CambioLetra] = letra;
    }
    let i = 0;
    while (i < mensajeEncriptado.length) {
        let letraDesencriptada = false;
        for (let j = mensajeEncriptado.length - i; j > 0; j--) {
            const CambioLetra = mensajeEncriptado.substr(i, j);
            if (LetrasInversas[CambioLetra]) {
                mensajeDesencriptado += LetrasInversas[CambioLetra];
                i += CambioLetra.length;
                letraDesencriptada = true;
                break;
            }
        }
        if (!letraDesencriptada) {
            mensajeDesencriptado += mensajeEncriptado.charAt(i);
            i++;
        }
    }

    return mensajeDesencriptado;
}

//evento de click al botón "Encriptar"
encriptarBt.addEventListener('click', () => {
    let mensaje = ingreso.value;
    if (mensaje.trim().length === 0) {
       alert("no se ingreso un mensaje");
    } else {
        let mensajeEncriptado = encriptarMensaje(mensaje);
        moverTexto(mensajeEncriptado, salida);
        moverTexto(ingreso, ingreso);
    }
});

// evento de click al botón "Desencriptar"
desencriptarBt.addEventListener('click', () => {
    let mensaje = ingreso.value;
    if (mensaje.trim().length === 0) {
        alert("no se ingreso un mensaje");
    } else {
        let mensajeEncriptado = ingreso.value;
        let mensajeDesencriptado = desencriptarMensaje(mensajeEncriptado);
        moverTexto(mensajeDesencriptado,salida)
        moverTexto(ingreso,ingreso);
    }
});

copiarBt.addEventListener('click', () => {
    // Selecciona el contenido del textarea
    salida.select();
  
    // Copia el contenido seleccionado al portapapeles
    document.execCommand("copy");
  });
