var DATABASE_NAME = 'test_db';
var DB_USERNAME = 'root';
var DB_PASSWORD = '';

var Sequelize = require('sequelize');
var FS = require('fs');

var sequelize = new Sequelize(
	DATABASE_NAME,
	DB_USERNAME, 
	DB_PASSWORD, {
		host:'localhost',
		port:3306,
		dialect:'mysql',
		define: {
			freezeTableName: true
		}
});

//Connect to Database
sequelize.authenticate().then(function (e) {
	if(e) {
		console.log('There is connection ERROR');
	} else {
		console.log('Connection has been established successfully');
	}
});

//Create Table: image

var Route_Store = sequelize.define('image', {
	  name: {
		type: Sequelize.STRING
	  },
	  grade: {
		type: Sequelize.STRING
	  },
	  description: {
		type: Sequelize.STRING
	  },
	  gymID: {
		type: Sequelize.INTEGER
	  },
	  image_type: {
		type: Sequelize.STRING,
		allowNull: false
	  },
	  image: {
		type: Sequelize.BLOB('long')
	  },
	
});

sequelize.sync({
	force: true,
	logging: console.log

}).then(function () {
	console.log('Everything is synced');
	
	//Give any image name here.
	var imageData = FS.readFileSync(__dirname + '/test-image.png');

	Route_Store.create({
		name: 'Route test',
		grade: '7a+',
		description: 'This route are awesome',
		gymID: 1,
		image_type: 'png',
		image: imageData,
		image_name: 'test-route'
	}).then(function (image_store) {
		try {
			//console.log(image_store.image)
			FS.writeFileSync(__dirname + '/routeImg/target.png', image_store.image);
		} catch (e) {
			console.log(e+'');
		}
	});
});