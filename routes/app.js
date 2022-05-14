const express = require('express');
const Route = express.Router();
Route.get('/home',(req,res)=>{
    res.render("./index.ejs")
});
Route.get('/saldoporlote',(req,res)=>{
    res.render("./consulta/saldoporlote.ejs")
});
module.exports = Route;