// mise en place d'un serveur rest

// installation de la librairie dans le même dossier sequelize_org
//
//  ********
//  npm install restify
//
//  ********
//
//  créer serveur.js comme suit : 

var restify = require('restify');
var models = require('./models/index');

var server = restify.createServer();

models.sequelize.sync({force:true}).done(function(){
  console.log('db on');
});

// on ajoute quelques capacités au serveur
server.use(restify.fullResponse())  // peut envoyer tout format de réponse
      .use(restify.bodyParser())    // peut analyser les données du body de la requête
      
// on créer une première route pour obtenir toutes les familles
server.get('/api/familles',function(req, res, next) {
    models.Famille.findAll().complete(function(err, familles) {
	if (!!err) {
	    console.log('Une erreur est intervenue lors de la récupération des familles', err)
	} else {
	    res.send(familles);
	    return next();
	}
    });  
});     

// on créer une seconde route pour obtenir une famille
server.get('/api/familles/:id',function(req, res, next) {
    models.Famille.find({where: {id: req.params.id}}).complete(function(err, famille) {
	if (!!err) {
	    console.log('Une erreur est intervenue lors de la récupération des familles', err)
	} else if (!famille) {
	  res.send(new restify.NotFoundError('famille non trouvé'));
	  return next();	  
	} else {
	    res.send(famille);
	    return next();
	}
    });  
});     

// une route pour ajouter une famille
// bodyParser permet d'obtenir automatiquement les données de la requête
server.post('/api/familles',function(req,res,next){
  models.Famille.create({
      nom: req.body.nom,
      adresse: req.body.adresse    
  }).done(function(err,famille) {
    if (err) {
      console.log(err);
    }
    res.send(famille)
    return next();
  });
});

// une route pour modifier une famille
server.put('/api/familles/:id',function(req,res,next) {
  models.Famille.find({where: {id: req.params.id}}).done(function(err, famille) {
      if (!!err) {
	  console.log('Une erreur est intervenue lors de la récupération de la famille' + req.params.id, err)
      } else if (!famille) {
	  res.send(new restify.NotFoundError('famille non trouvé'));
	  return next();
      } else {
	  famille.updateAttributes({
	      nom: req.body.nom,
	      adresse: req.body.adresse    	    
	  }).complete(function(err,famille) {
		res.status(200);
		res.send(famille);
		return next();	    
	  });
      }    
  });
});

// et enfin, une route pour supprimer une famille
server.del('/api/familles/:id',function(req,res,next) {
  models.Famille.find({where: {id: req.params.id}}).done(function(err, famille) {
      if (!!err) {
	  console.log('Une erreur est intervenue lors de la récupération de la famille' + req.params.id, err)
      } else if (!famille) {
	  res.send(new restify.NotFoundError('famille non trouvé'));
	  return next();
      } else {
	  famille.destroy().then(function(){
	      res.send(204);
	      return next();
	  });
      }    
  });
});

// enfin, on lance le serveur

server.listen(8080, function() {
    console.log('%s listening at %s...', server.name, server.url);
});