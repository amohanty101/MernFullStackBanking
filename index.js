///deploy to heroku  heroku login
///heroku git:remote [insert-app-name]
///git heroku push [master or main depending on your branch name]
//To view logs: heroku logs --tail



const express = require ('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');
//var port = process.env.PORT || 3000;

//used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/createaccount/:name/:email/:password', function (req, res) {
    console.log('request',req);
    // check if account exists
    dal.find(req.params.email).
    then((users) => {
    
    // if user exists, return error message
    if(users.length > 0){
    console.log('User already in exists');
    res.send('User already in exists'); 
    }
    else{
    // else create user
    dal.create(req.params.name,req.params.email,req.params.password).
    then((user) => {
    console.log(user);
    res.send(user); 
    }); 
    }
    
});
});
// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Sorry wrong password');
                }
            }
            else{
                res.send('Not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount/:balance', function (req, res) {

    var amount = Number(req.params.amount);

    console.log('attempt to update. Amount: ', amount);

    dal.update(req.params.email, amount, req.params.balance).
        then((response) => {
            console.log(response, amount);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

// delete account
app.delete('/account/delete/:email/:password', function(req, res) {

    dal.deleteAccount(req.params.email, req.params.password).
        then((doc) => {
            console.log(doc);
            res.send(doc);
        })
})

var port = process.env.PORT || 5000;
app.listen(port, () => console.log('Running on port: ' + port));