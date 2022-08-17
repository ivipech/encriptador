const enteredText = document.querySelector('.texto-ingresado');
const btnEncriptar = document.querySelector('.encriptar');
const btnDesencriptar = document.querySelector('.desencriptar');
const btnCopiar = document.querySelector('.copiar');
const labelResultado = document.querySelector('.texto-resuelto');
const cuadroResuelto = document.querySelector('.texto-encontrado');
const cuadroNoencontrado = document.querySelector(
  '.contenedor-texto-no-encontrado'
);
const restriccionesTexto = document.querySelector('.ResText');

function hayMayusculas(palabra) {
  let word = palabra.replaceAll(' ', '');
  for (let i = 0; i < word.length; i++) {
    if (word[i] === word[i].toUpperCase()) {
      return true;
      break;
    }
  }
  return false;
}

function hayAcentos(palabra) {
  const caracteres = ['á', 'é', 'í', 'ó', 'ú'];
  for (let i = 0; i < palabra.length; i++) {
    if (caracteres.includes(palabra[i])) {
      return true;
      break;
    }
  }
  return false;
}

function hayCaracteres(palabra) {
  const caracteres = ['!', '@', '$', '%', '^', '&', '*', '(', ')'];
  for (let i = 0; i < palabra.length; i++) {
    if (caracteres.includes(palabra[i])) {
      return true;
      break;
    }
  }
  return false;
}

function hayMayusAcentosOcaracteres(palabra) {
  if (hayCaracteres(palabra)) {
    return true;
  } else {
    if (hayMayusculas(palabra)) {
      return true;
    } else {
      if (hayAcentos(palabra)) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function remplazarVocales(word) {
  let wordConvertida = [...word].map(function (letra) {
    switch (letra) {
      case 'a':
        return 'ai';
        break;
      case 'e':
        return 'enter';
        break;
      case 'i':
        return 'imes';
        break;
      case 'o':
        return 'ober';
        break;
      case 'u':
        return 'ufat';
        break;
      default:
        return letra;
    }
  });

  return wordConvertida.join('');
}

function encriptar() {
  if (hayMayusAcentosOcaracteres(enteredText.value)) {
    restriccionesTexto.style.color = 'red';
  } else {
    restriccionesTexto.style.color = '#0a3871';
    if (enteredText.value.length === 0) {
      console.log('No hay texto');
      cuadroNoencontrado.style.display = 'grid';
      cuadroResuelto.style.display = 'none';
    } else {
      let texto = enteredText.value.split(' ');
      let textoConvertido = texto.map(function (word) {
        return remplazarVocales(word);
      });

      cuadroNoencontrado.style.display = 'none';
      cuadroResuelto.style.display = 'block';

      labelResultado.value = textoConvertido.join(' ');
      enteredText.value = '';
    }
  }
}

function desencriptarPalabra(palabra) {
  const vocales = ['a', 'e', 'i', 'o', 'u'];
  let palabraConvertida = '';
  for (let i = 0; i < palabra.length; i++) {
    if (vocales.includes(palabra[i])) {
      switch (palabra[i]) {
        case 'a':
          if (palabra[i + 1] === 'i') {
            i++;
            palabraConvertida = palabraConvertida + 'a';
          } else {
            palabraConvertida = palabraConvertida + palabra[i];
          }
          break;
        case 'e':
          // enter
          if (
            palabra[i + 1] === 'n' &&
            palabra[i + 2] === 't' &&
            palabra[i + 3] === 'e' &&
            palabra[i + 4] === 'r'
          ) {
            i = i + 4;
            palabraConvertida = palabraConvertida + 'e';
          } else {
            palabraConvertida = palabraConvertida + palabra[i];
          }
          break;
        case 'i':
          //imes
          if (
            palabra[i + 1] === 'm' &&
            palabra[i + 2] === 'e' &&
            palabra[i + 3] === 's'
          ) {
            i = i + 3;
            palabraConvertida = palabraConvertida + 'i';
          } else {
            palabraConvertida = palabraConvertida + palabra[i];
          }
          break;
        case 'o':
          //ober
          if (
            palabra[i + 1] === 'b' &&
            palabra[i + 2] === 'e' &&
            palabra[i + 3] === 'r'
          ) {
            i = i + 3;
            palabraConvertida = palabraConvertida + 'o';
          } else {
            palabraConvertida = palabraConvertida + palabra[i];
          }

          break;
        case 'u':
          //ufat
          if (
            palabra[i + 1] === 'f' &&
            palabra[i + 2] === 'a' &&
            palabra[i + 3] === 't'
          ) {
            i = i + 3;
            palabraConvertida = palabraConvertida + 'u';
          } else {
            palabraConvertida = palabraConvertida + palabra[i];
          }
          break;
        default:
          return palabra[i];
      }
    } else {
      palabraConvertida = palabraConvertida + palabra[i];
    }
  }
  return palabraConvertida;
}

function desencriptar() {
  if (hayMayusAcentosOcaracteres(enteredText.value)) {
    restriccionesTexto.style.color = 'red';
  } else {
    restriccionesTexto.style.color = '#0a3871';
    if (enteredText.value.length === 0) {
      console.log('No hay texto');
      cuadroNoencontrado.style.display = 'grid';
      cuadroResuelto.style.display = 'none';
    } else {
      let texto = enteredText.value.split(' ');
      let textoConvertido = texto.map(function (word) {
        return desencriptarPalabra(word);
      });

      cuadroNoencontrado.style.display = 'none';
      cuadroResuelto.style.display = 'block';

      labelResultado.value = textoConvertido.join(' ');
      enteredText.value = '';
    }
  }
}

function copiarTexto() {
  var content = document.getElementById('texto');
  content.select();
  document.execCommand('copy');
}

btnEncriptar.onclick = encriptar;
btnDesencriptar.onclick = desencriptar;
btnCopiar.onclick = copiarTexto;

/*
¡Bienvenidos y Bienvenidas a nuestro primer desafío!

Durante estas cuatro semanas, vamos a trabajar en una aplicación que encripta textos, así podrás intercambiar mensajes secretos con otras personas que sepan el secreto de la encriptación utilizada.

Las "llaves" de encriptación que utilizaremos son las siguientes:

La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"

Requisitos:
- Debe funcionar solo con letras minúsculas
- No deben ser utilizados letras con acentos ni caracteres especiales
- Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra encriptada para su versión original.

Por ejemplo:
"gato" => "gaitober"
gaitober" => "gato"

La página debe tener campos para
inserción del texto que será encriptado o desencriptado, y el usuario debe poder escoger entre as dos opciones.
El resultado debe ser mostrado en la pantalla.*/
