const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if (err){
            console.log('Error in detching the contacts from database');
            return;
        }
        return res.render('contactList', {
            title : 'My Contact List',
            contact_list : contacts
        });
    });
});

app.get('/practise', function(req, res){
    return res.render('practise', {
        title : 'Practise',
    })
});

app.post('/create-contact', function(req, res){
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    }, function(err, newContact){
        if (err){
            console.log('Error in creating the new contact');
            return;
        }
        console.log('Contact created successfully');
        return res.redirect('back');
    });
});

app.get('/delete-contact', function(req, res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if (err){
            console.log('Error in deleting the contact from database');
            return;
        }
        return res.redirect('back');
    })
})

app.listen(port, function(err){
    if (err){
        console.log("Error in runing the server" + err);
        return;
    }
    console.log("Server is running perfectly on port " + port);
});