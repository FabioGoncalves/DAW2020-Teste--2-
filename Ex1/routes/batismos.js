var express = require('express');
var router = express.Router();
const Batizados = require("../controllers/batismos");


router.get('/batismos', function(req, res, next) {
    if(req.query.ano){
      var ano= req.query.ano
      Batizados.batizadosByAno(ano).then(dados => {
        res.jsonp(dados);
      }).catch(erro => {
        console.log(erro)
      })
    }else{
      Batizados.getAllBatizados()
    .then(dados => {
      console.log(dados)
      res.jsonp(dados);
    })
    .catch(erro => {
      console.log(erro)
    })
    }
});

router.get('/batismos/batisado', function(req, res, next) {
  Batizados.elementoBatizado().then(dados => {
    res.jsonp(dados);
  }).catch(erro => {
    console.log(erro)
  })
});

router.get('/batismos/progenitores', function(req, res, next) {
  Batizados.paisBatizado().then(dados => {
    res.jsonp(dados);
  }).catch(erro => {
    console.log(erro)
  })
});


router.get('/batismos/stats', function(req, res, next) {
  Batizados.batizadosGrouped().then(dados => {
    res.jsonp(dados);
  }).catch(erro => {
    console.log(erro)
  })
});

router.get('/batismos/:id([A-Z 0-9\_]+?)', function(req, res, next) {
  console.log(req.params.id);
  var ano = req.params.id;
  Batizados.lookUp(ano).then(dados => {
    res.jsonp(dados);
  }).catch(erro => {
    console.log(erro)
  })
});







module.exports = router;
