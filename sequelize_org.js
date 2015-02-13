//SEQUELIZE - ORGANISATION
// selquelize propose quelques outils
// qui facilitent sont utilisation dans les projets
/////////////////////////////////
// création du dossier
//
//*******************************
// mkdir sequelize_org
// cd sequelize_org
//*******************************
//
// on installe une librairie qui facilite l'organisation des models Sequelize
// 
//*******************************
// -g permet d'installer globalement une librairie
// elle sera accessible depuis n'importe quel projet
// 
// sudo npm install -g sequelize sequelize-cli    
// npm install mysql
//*******************************
// 
// ça nous donne une commande sequelize.
// 
//*****************************
// sequelize + entrée affiche la liste des commandes
//*****************************
// 
// on initialize le projet
// 
// ***********************************
// sequelize init
// ***********************************
// 
// Ça crée 3 dossiers config, models et migrations

// dans config, gestion des connexions à la base de données

// dans model, les définitions des différentes tables
// il crée également un fichier index.js qu'il suffit d'inclure dans
// n'importe quel fichier pour avoir accès à toutes les définitions de tables

//
// Modifier le fichier config/config.json pour paramétrer les connexions :
// dans la partie developpement
// nom de la base de donnée : technophile_db
//                utilisateur : cyber
//		  mot de passe : azerty
//
// 
// 
// 
// création du model Famille, généré dans le dossier models
// 
// *****************************
// sequelize model:create --name Famille --attributes "nom:string,adresse:string"
// *****************************
// 
// création du model FamilleMembre
// 
// *****************************
// sequelize model:create --name FamilleMembre --attributes "nom:string,prenom:string,date_naissance:date"
// *****************************
//


// C'est maintenant qu'on va utiliser le fichier index.js 
// pour avoir accès aux deux tables que l'on a créé
// récupérer dans model tout ce qu'il faut pour utiliser le model :
//
var models = require('./models/index.js');

//	grace à cette commande, on va récupérer dans models tout ce dont on a besoin :
//	models.Sequelize contient la libraire
//	models.sequelize contient la connexion à la base de données
//	models.Famile et models.FamilleMembre contient les models ( tables )

models.sequelize.sync({force:true}).done(function(){
  console.log('base de donnée réinitiliasée');
  models.Famille.create({
	nom: req.body.nom,
	adresse: req.body.adresse    
  }).done(function() {
      console.log('famille ajoutée'
  });
});


