const express = require('express');
const app = express();
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const auth = require('./config/auth');
const axios = require('axios')
const appRoute = require('./routes/app.js');
const API = "http://34.198.64.95:8084"
//const auth = require('./config/auth');
//Session
app.use(session({
    secret:"Obrigado Deus",
    cookie : {  maxAge : 60000000}
}))

app.use(function(req,res,next){
    res.locals.user = req.session.user || undefined
    next();
})
//Express Layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

//Public Static
app.use('/static', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/',(req,res)=>{
    res.render("./index.ejs")
});

app.get('/login',(req,res)=>{
    res.render("./user/login.ejs",{msg:""})
})
app.post('/login/auth',(req,res)=>{    
    var Lote = "teste"
    const username = req.body.user
    const password = req.body.password

    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    axios.get(API + '/rest/uDev/' + Lote.trim(), {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
        .then((response) => {
            req.session.user = {user:username,password:password}
            res.redirect("/app/home")
        })
        .catch((error) => {
            console.log(error)
            res.redirect("/login")
        })
})

app.use('/app' ,auth ,appRoute);
app.use(auth)
const port = 3000;
app.listen(port, function () {  
    console.log("Servidor rodando...")
});