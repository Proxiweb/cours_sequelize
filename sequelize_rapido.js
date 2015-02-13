//   SEQUELIZE, RAPIDO
////////////////////////////////////
// créer un dossier sequelize_rapido
//
//******************************
// mkdir sequelize_rapido
// cd sequelize_rapido
//******************************
//
//commencer par installer les librairies
//************************
// npm install sequelize
// npm install mysql
//************************
//
//on crée un ficher index.js comme suit
//

// on inclus le module
var Sequelize = require('sequelize');

// on initialize la connexion
// new Sequelize(<nom de la bd>,<nom utilisateur>,<mot de passe>,{host: 'localhost',dialect: 'mysql'});

var sequelize = new Sequelize('technophile_db','cyber','azerty',{host: 'localhost',dialect: 'mysql'});

// on défini les tables
// c'est uniquement une définition logique
// les tables seront crées plus bas

var Famille = sequelize.define('famille', {
  nom: Sequelize.STRING,
  adresse: Sequelize.STRING,
  adresse_complementaire: Sequelize.STRING,
  code_postal: Sequelize.STRING,
  ville: Sequelize.STRING  
});

var FamilleMembre = sequelize.define('famille_membre',{
  nom: Sequelize.STRING,
  prenom: Sequelize.STRING,
  date_de_naissance: Sequelize.DATE
});

// on défini une relation
// un membre appartient à une famille
FamilleMembre.belongsTo(Famille);

// Ici, on crée la table
sequelize.sync({force:true})   // force: true provoque la reconstruction de la base de donnée
         .done(function() {
	   
      // quand c'est fait, on crée une famille

      Famille.create({
	nom: 'Durand',
	prenom: 'Philippe',
	adresse: '10, rue de L\'eau',
	code_postal: '28000',
	ville: 'GrandeVille'
      })
      .success(function(famille) {
        // quand la famille a été crée, on crée un membre

	FamilleMembre.create({
	  nom: 'Durand',
	  prenom: 'Philippe',
	  date_de_naissance: '2000-01-01'
	})
	.success(function(famille_membre){
	  //  ce membre appartient à famille
	   famille_membre.setFamille(famille);
	});  
    });
});
