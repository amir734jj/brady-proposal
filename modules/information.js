var _ = require("underscore");
var hash = require("sha1");

exports.add = function(req, db, informationModel, callback) {
	informationModel.create({
		hashcode: req.session.user.hashcode,
		type: req.body.type,
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		details: req.body.details
	}).done(function(information) {
		callback(information.toJSON());
	});
};

exports.get = function(req, db, informationModel, callback) {
	informationModel.findAll({
		where: {
			hashcode: req.session.user.hashcode
		}
	}).done(function(informations) {
		callback(_.map(informations, function(information) {
			return information.toJSON();
		}));
	});
}


exports.getAll = function(req, db, informationModel, callback) {
	informationModel.findAll().done(function(informations) {
		callback(_.map(informations, function(information) {
			return information.toJSON();
		}));
	});
}

exports.getInformationsByHashcode = function(req, db, informationModel, callback) {
	informationModel.findAll({
		where: {
			hashcode: req.params.hashcode
		}
	}).done(function(informations) {
		informations = _.map(informations, function(information) {
			return information.toJSON();
		});

		informations.sort(function(a, b) {
			try {
				return -1 * (parseInt(a.end) - parseInt(b.end));
			} catch (error) {
			    console.log("error in sorting");
				return -1;
			}
		})

		callback(informations);
	});
}

exports.update = function(req, db, informationModel, callback) {
	informationModel.update({
		type: req.body.type,
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		details: req.body.details
	}, {
		where: {
			id: req.params.id
		}
	}).done(function(information) {
		callback(information);
	});
}

exports.delete = function(req, db, informationModel, callback) {
	informationModel.destroy({
		where: {
			id: req.params.id
		}
	}).done(function(information) {
		callback(information);
	});
}
