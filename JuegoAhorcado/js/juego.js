const palabrAdivinar = ingresarPalabra();
let arrCoincidencias = [];
let vidas = 6;
let aciertos = 0;

const letra = document.querySelector("input");
letra.oninput = function (){
  soloLetras(letra.value, palabrAdivinar);
};

// Función para validar que solo se ingresen letras en el prompt
function validarSoloLetras(frase) {
  // Expresión regular para letras mayúsculas y minúsculas
  const patron = new RegExp("[a-zA-Z]");
  
  if (frase.test(patron)) {
    return true; // El prompt contiene solo letras
  } else {
    return false; // El prompt contiene caracteres distintos a letras
  }
}


function ingresarPalabra() {
  const patron = /^[a-zA-Z]+$/;
  let palabra = "";
  do{
    palabra = prompt("Ingresa una palabra para adivinar!");
  }while(!patron.test(palabra));

  const arrPalabra = palabra.split("");
  console.log(arrPalabra);
  document.getElementById("tablero").innerHTML = `
            <table>
                <tr>
                    ${creaTablero(arrPalabra)}    
                </tr>    
            </table>
        `;
  return arrPalabra;
}


function creaTablero(arrPalabra) {
  let tablero = "";
  arrPalabra.forEach((letra) => {
    tablero = tablero + "<td>  _  </td>";
  });
  return tablero;
}

function soloLetras(cadena, palabrAdivinar) {
  const pattern = new RegExp("[a-zA-Z]");
  console.log(pattern.test(cadena));
  if (!pattern.test(cadena)) {
    document.querySelector("input").value = "";
    document.getElementById("status").innerHTML =
      "Solo puedes ingresar letras!!!..";
    return false;
  } else {
    buscarCoincidencia(cadena, palabrAdivinar);
    return true;
  }
}

function buscarCoincidencia(letra, arrPalabra) {
  let tablero = "";
  let coincidencias = 0;
  arrPalabra.forEach((caracter, index) => {
    if (caracter == letra) {
      arrCoincidencias[index] = letra;
      aciertos++;
      coincidencias++;
    }
  });

  arrPalabra.forEach((caracter, index) => {
    if (arrCoincidencias[index]) {
      tablero = tablero + "<td>" + arrCoincidencias[index] + " </td>";
    } else {
      tablero = tablero + "<td>  _  </td>";
    }
  });

  leyendaCoincidencia(coincidencias);
  document.getElementById("tablero").innerHTML = `
            <table>
                <tr>
                    ${tablero}    
                </tr>    
            </table>
        `;

  if(aciertos === arrPalabra.length){
    document.getElementById("fin").innerHTML = 'Ganaste';
    document.getElementById("imagen").src = '../img/ganaste.png';
    document.getElementById("volver").style.display = 'block';
  }
}

function leyendaCoincidencia(coincidencias) {
  if (coincidencias > 0) {
    document.getElementById("status").innerHTML = `Hubo ${coincidencias} coincidencias!!!`;
  } else {
    if(vidas >0){
      vidas = vidas - 1;
      document.getElementById("status").innerHTML = "No hubo coincidencias :( Te quedan " + vidas + " vidas";
      
      document.getElementById("imagen").src = '../img/'+ vidas + '.png';

    }
  }

  if (vidas === 0) {
    document.getElementById("fin").innerHTML = 'Perdiste';
    document.getElementById("volver").style.display = 'block';
    document.getElementById("imagen").src = '../img/perdiste.gif';
  }
}