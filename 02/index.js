const express = require("express");
const app = express();
const porta = 8000;

let segundos = 0
let minutos = 0
let cronometro = false

function iniciarContagem() {
    cronometro = setInterval(() => {
        segundos++
        if (segundos > 59) {
            segundos = 0
            minutos += 1
        }
    }, 1500)
}

function pausarContagem() {
    clearInterval(cronometro)
}

function zerarContagem() {
    clearInterval(cronometro)
    minutos = 0
    segundos = 0
}

app.get("/", (req, res) => {
    const minutosFormatado = minutos < 10 ? `0${minutos}` : `${minutos}`
    const segundosFormatado = segundos < 10 ? `0${segundos}` : `${segundos}`
    res.send(`Tempo atual do cronômetro: ${minutosFormatado} minutos e ${segundosFormatado} segundos.`)
});

app.get("/iniciar", (req, res) => {
    iniciarContagem()
    res.send("Cronômetro iniciado")
})

app.get("/pausar", (req, res) => {
    pausarContagem()
    res.send("Cronômetro pausado")
})

app.get("/continuar", (req, res) => {
    iniciarContagem()
    res.send("Cronômetro continuando!")
})

app.get("/zerar", (req, res) => {
    zerarContagem()
    res.send("Cronômetro zerado!")
})

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}`)
})
