'use strict'

const display = document.getElementById('display')
// esse *= significa que vai ter a palavra 'tecla' em algum momento do id informado.
const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')

// se ele for verdadeiro, executar código
let novoNumero = true
let operador
let numeroAnterior

const operacaoPendente = () => operador != undefined

const calcular = () => {
  if (operacaoPendente()) {
    const numeroAtual = parseFloat(display.textContent.replace(',', '.'))
    // novoNumero para limpar
    novoNumero = true
    if (operador == '+') {
      atualizarDisplay(numeroAnterior + numeroAtual)
    } else if (operador == '-') {
      atualizarDisplay(numeroAnterior - numeroAtual)
    } else if (operador == '*') {
      atualizarDisplay(numeroAnterior * numeroAtual)
    } else if (operador == '/') {
      atualizarDisplay(numeroAnterior / numeroAtual)
    }
  }
}

const atualizarDisplay = texto => {
  if (novoNumero) {
    // ese .toLocaleString serve para converter um texto para o idioma dentro do parenteses
    display.textContent = texto.toLocaleString('BR')
    novoNumero = false
  } else {
    display.textContent += texto.toLocaleString('BR')
  }
}

const inserirNumero = evento => atualizarDisplay(evento.target.textContent)

// vai limpar o display toda vez que eu clicar nos operadores
const selecionarOperador = evento => {
  if (!novoNumero) {
    calcular()
    novoNumero = true
    operador = evento.target.textContent
    numeroAnterior = parseFloat(display.textContent.replace(',', '.'))
    console.log(operador)
  }
}

numeros.forEach(numero => numero.addEventListener('click', inserirNumero))

operadores.forEach(operador =>
  operador.addEventListener('click', selecionarOperador)
)

const ativarIgual = () => {
  calcular()
  operador = undefined
}

document.getElementById('igual').addEventListener('click', ativarIgual)

// limpa só a memória, não limpa tudo
const limparDisplay = () => (display.textContent = '')

// limpa tudo
const limparCalculo = () => {
  limparDisplay()
  operador = undefined
  novoNumero = true
  numeroAnterior = undefined
}

document
  .getElementById('limparDisplay')
  .addEventListener('click', limparDisplay)

document
  .getElementById('limparCalculo')
  .addEventListener('click', limparCalculo)

const removerUltimoElemento = () =>
  (display.textContent = display.textContent.slice(0, -1))
document
  .getElementById('backspace')
  .addEventListener('click', removerUltimoElemento)

const inverterSinal = () => {
  novoNumero = true
  atualizarDisplay(display.textContent * -1)
}
document.getElementById('inverter').addEventListener('click', inverterSinal)

const existeDecimal = () => display.textContent.indexOf(',') != -1
const existeValor = () => display.textContent.length > 0
const inserirDecimal = () => {
  if (!existeDecimal()) {
    if (existeValor()) {
      atualizarDisplay(',')
    } else {
      atualizarDisplay('0,')
    }
  }
}

document.getElementById('decimal').addEventListener('click', inserirDecimal)

const mapaTeclado = {
  0: 'tecla0',
  1: 'tecla1',
  2: 'tecla2',
  3: 'tecla3',
  4: 'tecla4',
  5: 'tecla5',
  6: 'tecla6',
  7: 'tecla7',
  8: 'tecla8',
  3: 'tecla9',
  '/': 'operadorDividir',
  '*': 'operadorMultiplicar',
  '-': 'operadorSubtrair',
  '+': 'operadorAdicionar',
  Enter: 'igual',
  '=': 'igual',
  Backspace: 'backspace',
  c: 'limparDisplay',
  Escape: 'limparCalculo', // tecla esc
  ',': 'decimal'
}

const mapearTeclado = evento => {
  // console.log(evento.key)
  const tecla = evento.key
  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1
  if (teclaPermitida()) {
    document.getElementById(mapaTeclado[tecla]).click()
  }
}
document.addEventListener('keydown', mapearTeclado)
