var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var User = require('../models/details');
var Active= require('../models/safelist');
var Message= require('../models/message');
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('search');
});

/*
router.post('/',function(req,res,next){

    var id = req.body.id;
    User.findOne({_id:id},function(err,data){
        if(err) console.log(err);
        else
        {
        console.log(data["name"]);
        var name = data["name"];
        var place = data["place"];
        var msg = data["message"];
        var phone = data["phone"];
        var email = data["email"];
    var output = `

            <h1> you hava a new contact request</h1>
            <ul>
                <li> name : ${name}</li>
                <li> company :${place}</li>
                <li> phone : ${phone}</li>
            </ul>
            <h2>message</h2>
            <p>${msg}</p>
    `;

    
     let transporter = nodemailer.createTransport({
       service: 'gmail',
        auth: {
        user: 'nav290397@gmail.com',
        pass: 'NAvneet1@'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"disaster management" <nav290397@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'i Am safe', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.render('contact',{msg:"try again"});
             console.log(error);
             
        }
        else
        {
        res.render('contact',{msg:"you are marked  safe"});
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        }
    });
}});
});

*/

router.get('/register', function(req, res, next) {
  res.render('contact');
});




router.post('/register',function(req,res,next){



    var name = req.body.name;
    var username=req.body.username;
    var place = req.body.place;
    var email = req.body.email;
    var phone = req.body.phone;
    var id = req.body.govtid;
    // var message = req.body.message;
    console.log(name);
    console.log(place);
    console.log(email);
    console.log(phone);
    // console.log(message); 


    User.find({username:username},function(err,data){
        if(err) 
        {

            console.log(err);
            throw err;
        }
        else
        {
            // console.log(data);
            if(data.length)
            {
                res.json({
                    status:1,
                    msg:"username exists"
                });
                // return;
            }
            else
            {
                var user = new User({
                username:username,
                name:name,
                place:place,
                email:email,
                phone:phone,
                govtid:id
                // message:message
            });
                user.save(function(err,data){
                    if(err) console.log(err);
                    else
                    {
                        res.json({
                            success:true,
                            status:0
                        });
                    }
                });





                       
             }
               
        }
    });
});




router.post('/username',function(req,res,next){
    var username = req.body.username;
     User.find({username:username},function(err,data){
        if(err) {
            console.log(err);
            throw err;
        }
        else
        {
            if(data.length)
            {
                res.json({
                    status:1,
                    message:"username exists"
                });
            }
            else
            {
                res.json({
                    status: 0,
                    message:"done"
                });
            }
            return;
        }
     });
});


router.post('/safe',function(req,res,next){

    var username = req.body.username;
    console.log(username);
    User.find({username:username},function(err,data){
        if(err){
            console.log(err);
            throw err;
        }
        else{
            // console.log(data.length);
            // console.log(data);
            if(data.length){
                        var alist = new Active({
            username:username
            });

            alist.save(function(err,d){

                if (err) console.log(err);
                else{



        var name = data[0].name;
        console.log(data);
        var place = data[0].place;
        var phone = data[0].phone;
        var email = data[0].email;
        console.log(typeof(email));
    var output = `

            <h1> you hava a new contact request</h1>
            <ul>
                <li> name : ${name}</li>
                <li> company :${place}</li>
                <li> phone : ${phone}</li>
            </ul>
            <h2>message</h2>
            <p>${name} was marked safe</p>
    `;

    
     let transporter = nodemailer.createTransport({
       service: 'gmail',
        auth: {
        user: 'nav290397@gmail.com',
        pass: 'NAvneet1@'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"disaster management" <nav290397@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'i Am safe', // Subject line
        text: 'Hello world?', // plain text body
        html:output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({status:"0"});
             console.log(error);
             
        }
        else
        {
        res.json({status:"1"});
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        }
    });
                }
               
        });

            }
            else{
                res.json({
                    status:2,
                    success:false,
                    msg:"Incorrect Username"
                });
            }

        }

    });
});

router.post('/message',function(req,res,next){
    var message = req.body.message;
    var username = req.body.username;
    console.log(req.body.username,username);
    if(username)
    {
        User.findOne({username:username},function(err,data){

            if(err)
            {
                console.log(err);
                throw err;
            }
            else
            {
                 var name = data["name"];
                // console.log(data);
                var place = data["place"];
                var phone = data["phone"];
                var email = data["email"];
                var output = `

                    <h1> you hava a new contact request</h1>
                    <ul>
                        <li> name : ${name}</li>
                        <li> company :${place}</li>
                        <li> phone : ${phone}</li>
                    </ul>
                    <h2>message</h2>
                    <p>${message}</p>`;

            
             let transporter = nodemailer.createTransport({
               service: 'gmail',
                auth: {
                user: 'nav290397@gmail.com',
                pass: 'NAvneet1@'
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"disaster management" <nav290397@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'i Am safe', // Subject line
                text: 'Hello world?', // plain text body
                html:output // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                     console.log(error);
                     throw err;
                     
                }
                else
                {
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                }
            });
                }
                       
                });
            }
    var msg = new Message({
            message:message
    });
    msg.save(function(err,data){

        if (err){
            console.log(err);
            res.json({
                status:"0"
            });
            throw err;
        } 
        else{
            res.json({
                status:"1"
            });
        }
    });

});


module.exports = router;
