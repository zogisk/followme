const admin = require('firebase-admin')

var serviceAccount = require("../../cdk-red-firebase-adminsdk-2uomr-0b5be05a75.json");

//var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);

/*admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://cdk-red-default-rtdb.firebaseio.com'
});*/

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cdk-red-default-rtdb.firebaseio.com'
});

const db = admin.database();

const { Router}= require('express');
const router = Router();

///////////////////////CLIENTE//////////////////////////////

router.get('/cliente', (req, res) => {
    db.ref('contact').once('value', (snapshot) => {
       data = snapshot.val();
       res.render('cliente', {contact: data})
    });
})

router.post('/new-contact', (req, res) => {
    const newContact = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        tel: req.body.tel
    }
    db.ref('contact').push(newContact);
    res.redirect('/cliente');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contact/' + req.params.id).remove();
    res.redirect('/cliente');
});

///////////////////////PEDIMENTO//////////////////////////////

router.get('/pedimento', (req, res) => {
    db.ref('pedimento').once('value', (snapshot) => {
       data = snapshot.val();
       res.render('pedimento', {pedimento: data})
    });
})

router.post('/new-pedimento', (req, res) => {
    const newPedimento = {
        referencia: req.body.referencia,
        empresa: req.body.empresa,
        ejecutivo1: req.body.ejecutivo1,
        ejecutivo2: req.body.ejecutivo2
    }
    db.ref('pedimento').push(newPedimento);
    res.redirect('/pedimento');
});

router.get('/delete-pedimento/:id', (req, res) => {
    db.ref('pedimento/' + req.params.id).remove();
    res.redirect('/pedimento');
});

router.get('/edit-pedimento/:id', (req, res) => {
    db.ref('pedimento/' + req.params.id).once('value', (snapshot) => {
        pedimentosel = snapshot.val();
        res.render('pedimento', {pedimento: pedimentosel})
     });
    console.log(pedimentosel);
});

router.get('/consultpedimento/:id', (req, res) => {
    console.log(req.params.id);
    db.ref('pedimento/' + req.params.id).once('value', (snapshot) => {
        pedimentoconsul = snapshot.val();
        res.render('pedimento', {pedimento: pedimentosel})
     });
    console.log(pedimentoconsul);
});

//============================================================//

module.exports = router;

//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Sistemas\Desktop\nodejs-fire\cdk-red-firebase-adminsdk-2uomr-0b5be05a75.json"