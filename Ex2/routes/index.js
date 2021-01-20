var express = require('express');
var router = express.Router();
const axios = require("axios");



router.get('/', function(req, res) {
  if(req.cookies.token === undefined)
    login(req, res);
 
      res.render('home', { title: 'Index' });

});

router.get('/termosIndice', function(req, res) {
  if(req.cookies.token === undefined)
    login(req, res);
    
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token="+ req.cookies.token)
  .then((allData) => {
      res.render('termos', { title: 'Termos' , dados: allData.data });
  })
  .catch((err) => console.log(err));
      

});

router.get('/classes', function(req, res) {
  if(req.cookies.token === undefined)
    login(req, res);

  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token="+ req.cookies.token)
  .then((allData) => {
      res.render('index', { title: 'Index', dados: allData.data });
  })
  .catch((err) => console.log(err));
});

router.get('/info', function(req, res, next) {
  if(req.cookies.token === undefined)
    login(req, res);

  axios
  .get("http://clav-api.di.uminho.pt/v2/classes/c"+ req.query.item +"?token="+ req.cookies.token)
  .then((response) => {
    res.render('detail', { title: 'Detail', dados: response.data });
  })
  .catch((err) => console.log(err));
});


function login(req, res) {
  axios
  .post("http://clav-api.di.uminho.pt/v2/users/login", {username:'daw2020@teste.uminho.pt', password:'232' })
  .then((response) => {    
    res.cookie('token',  response.data.token, {
      expires: new Date(Date.now() + '1d'),
      secure: false,
      httpOnly: true
    })
    res.redirect("/");
  })
  .catch((err) => console.log(err));
}


module.exports = router;
