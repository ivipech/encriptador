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

console.log(hayMayusculas('hola como estas'));

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

function hayMayusOAcentos(palabra) {
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
  if (hayMayusOAcentos(enteredText.value)) {
    console.log('Hay mayusculas o acentos');
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

function reemplazarEncriptado(palabra) {
  const vocales = ['a', 'e', 'i', 'o', 'u'];
  let palabraConvertida = '';
  for (let i = 0; i < palabra.length; i++) {
    if (vocales.includes(palabra[i])) {
      switch (palabra[i]) {
        case 'a':
          i++;
          palabraConvertida = palabraConvertida + 'a';
          break;
        case 'e':
          i = i + 4;
          palabraConvertida = palabraConvertida + 'e';
          break;
        case 'i':
          i = i + 3;
          palabraConvertida = palabraConvertida + 'i';
          break;
        case 'o':
          i = i + 3;
          palabraConvertida = palabraConvertida + 'o';
          break;
        case 'u':
          i = i + 3;
          palabraConvertida = palabraConvertida + 'u';
          break;
        default:
          return letra;
      }
    } else {
      palabraConvertida = palabraConvertida + palabra[i];
    }
  }
  return palabraConvertida;
}

function desencriptar() {
  if (hayMayusOAcentos(enteredText.value)) {
    console.log('Hay mayusculas o caracteres especiales');
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
        return reemplazarEncriptado(word);
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
