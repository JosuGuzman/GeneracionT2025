// EJERCICIO 1
function evaluarRendimiento(nota) {
  if (nota >= 0 && nota < 2) return "Muy mal";
  if (nota >= 2 && nota < 5) return "Mal";
  if (nota >= 5 && nota < 6) return "Tan cerca pero tan lejos";
  if (nota >= 6 && nota < 8) return "Bien!";
  if (nota >= 8 && nota <= 10) return "Muy bien!!";
  return "Nota inválida";
}

function mostrarRendimiento() {
  const input = document.getElementById("notaInput").value;
  const nota = parseFloat(input);
  const resultado = evaluarRendimiento(nota);
  document.getElementById("resultado1").textContent = resultado || "Por favor, ingresá una nota válida.";
}

// EJERCICIO 2
function biggestOne(num1, num2, palabra) {
  if (num1 > num2) return num1;
  if (num2 > num1) return num2;
  if (palabra.length >= 2) return palabra[0] + palabra[palabra.length - 1];
  return "Palabra inválida";
}

function ejecutarBiggestOne() {
  const n1 = parseFloat(document.getElementById("num1").value);
  const n2 = parseFloat(document.getElementById("num2").value);
  const palabra = document.getElementById("palabra").value;

  const resultado = biggestOne(n1, n2, palabra);
  document.getElementById("resultado2").textContent = resultado;
}

// EJERCICIO 3
const frutasYVerduras = [
  { fruta: "banana" }, { verdura: "apio" },
  { fruta: "manzana" }, { fruta: "frutilla" },
  { verdura: "zanahoria" }, { fruta: "kiwi" },
  { fruta: "sandia" }, { fruta: "melon" },
  { verdura: "repollo" }, { fruta: "mango" }
];

function filtrarFrutas(arr) {
  return {
    frutas: arr.filter(obj => obj.fruta).map(obj => obj.fruta)
  };
}

function mostrarFrutas() {
  const resultado = filtrarFrutas(frutasYVerduras);
  document.getElementById("resultado3").textContent = JSON.stringify(resultado, null, 2);
}

// EJERCICIO 4
function dispenserGaseosas(unidades, gaseosas) {
  let stock = {};
  for (let i = 0; i < gaseosas.length; i++) {
    stock[gaseosas[i]] = unidades[i] || 0;
  }
  return stock;
}

function mostrarStock() {
  const unidades = [1, 2, 3, 4];
  const gaseosas = ["cocacola", "sprite", "fanta", "seven up"];
  const resultado = dispenserGaseosas(unidades, gaseosas);
  document.getElementById("resultado4").textContent = JSON.stringify(resultado, null, 2);
}

// EJERCICIO 5
function mostrarNacimiento() {
  const nombre = document.getElementById("nombrePersona").value.trim();
  const edad = parseInt(document.getElementById("edadPersona").value);
  const anioActual = new Date().getFullYear();

  if (!nombre || isNaN(edad) || edad < 0) {
    document.getElementById("resultado5").textContent = "Ingresá un nombre válido y una edad positiva.";
    return;
  }

  const nacimiento = anioActual - edad;
  const mensaje = `${nombre} tiene ${edad} años y nació en ${nacimiento}.`;
  document.getElementById("resultado5").textContent = mensaje;
}
