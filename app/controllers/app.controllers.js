const App = require("../model/app.model.js");

// Crear y guardar un nuevo mensaje
exports.create = (req, res) => {
    const message = new App({
        message: req.body.message,
    });
    message.save().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error ocurred while creating the Message.",
        });
    });
};

//recuperar todos los mensahes desde la base de datos
exports.findAll = (req, res) => {
    App.find().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error ocurres while retriving messages.",
        });
    });
};

//traer un solo mensaje con id del mensaje
exports.findOne = (req, res) => {
    App.findById(req.params.messageId).then((date) => {
        if (!data) {
            return res.status(404).send({
                message: "Message not found with id " + req.params.messageId,
            });
        }
        res.send(data);
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Message not found with id " + req.params.messageId,
            });
        }
        return res.status(500).send({
            message: "Error retriving message with id " + req.params.messageId,
        });
    });
};

//actualizar el mensaje identificado con el id del mensaje en el request
exports.update = (req, res) => {
    App.findByIdAndUpdate( req.params.messageId, {
        message: req.body.message,
    },
    { new: true }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Message not found with id " + req.paramas.messageId,
            });
        }
        res.send(data);
    }).catch((err) => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Message not found with id " + req.params.messageId,
            });
        }
        return res.status(500).send({
            message: "Error updating message with id " + req.params.messageId,
        });
    });
};

//Eliminar un mensaje especifico con el id del mensaje que se requiera
exports.delete = (req, res) => {
    App.findByIdAndRemove(req.params.messageId).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "Message not fopund with id " + req.params.messageId,
            });
        }
        res.send({
            message: "Message deleted sucessfully!"
        });
    }).catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Message not found with id " + req.params.messageId,
            });
        }
        return res.status(500).send({
            message: "Could not delete message with id " + req.params.messageId,
        });
    });
};