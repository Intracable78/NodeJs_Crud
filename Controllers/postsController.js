const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const {PostsModel} = require('../models/postsModel');

//read

router.get('/', (req, res) => { // si dans l'url il y a / il va écouter et passer dans la fonction
    PostsModel.find((err, docs) => { //sert à aller chercher les informations dans le post model, les infos sont stockées dans le param docs
        if(!err) res.send(docs); // si il n'y a pas d'erreur dans la requête, on va envoyer le resultat du docs sur la page
        else console.log("Erreur to send data " + err )
    })
})

// create

router.post('/', (req, res) => {
    const newPost = new PostsModel({ // on créer un nouvelle instance de postsModel et on met en paramètres le body de la requete passée
        author: req.body.author,
        comment: req.body.comment
    })

    newPost.save((err, docs) => { //on save l'insertion de données
        if(!err) res.send(docs)
        else console.log("Error creating new data " + err)
    })
})

//update

router.put('/:id', function(req, res){ // :id correspond au param 
if(!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknow " + req.params.id) // si l'id n'est pas valide ou retourne une erreure

const updateRecords = { // on stock les req dans une variable
    author: req.body.author,
    comment: req.body.comment
}

PostsModel.findByIdAndUpdate(
    req.params.id,
    {$set: updateRecords},
    {new: true},
    (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Update error : ' + err)
    }
)
});

//delete

router.delete('/:id', (req, res) => {
if(!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknow " + req.params.id)

PostsModel.findByIdAndDelete(
    req.params.id,
    (err, docs) => {
        if(!err) res.send(docs)
        else console.log('Delete error : ' + err)
    }
)
})



module.exports = router;