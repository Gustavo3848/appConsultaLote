const express = require('express');
const axios = require('axios')
const Route = express.Router();
const API = "http://34.198.64.95:8084"
Route.get('/home', (req, res) => {
    res.render("./index.ejs")
});
Route.get('/saldoporlote', (req, res) => {
    res.render("./consulta/saldoporlote.ejs")
});
Route.get('/resultado/:lote', (req, res) => {
    var Lote = req.params.lote
    const username = req.session.user.user
    const password = req.session.user.password

    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    axios.get(API + '/rest/uDev/' + Lote.trim(), {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
        .then((response) => {
            var lote = response.data.lote
            var saldo = Math.round(response.data.saldo / 0.06)
            var empenhado = Math.round(response.data.empenhado / 0.06)
            var produto = response.data.produto
            res.render("./consulta/resultado.ejs", {
                lote,
                saldo,
                empenhado,
                produto
            })  
        })
        .catch((error) => {
            console.error(error)
        })
});
module.exports = Route;