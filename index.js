const express = require('express');
const app = express();
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const auth = require('./config/auth');
const axios = require('axios')
const appRoute = require('./routes/app.js');
const URL = "http://localhost:8084/"
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
    res.render("./user/login.ejs")
})
app.post('/login/auth',(req,res)=>{
    var login = req.body.user
    var password = req.body.password
    /*
    axios.post(URL + "/rest/uDev/auth", {user:login,senha:password})
    .then(function (response) {
        if (response == true){
            res.redirect("/app/home")
        }else{
            res.redirect('/login')
        }
    })
    .catch(function (error) {
        console.error(error);
    });
    */
    req.session.user = {login:login}
    res.redirect("/app/home")
})

app.use('/app' ,auth ,appRoute);
app.use(auth)
const port = 3000;
app.listen(port, function () {  
    console.log("Servidor rodando...")
});