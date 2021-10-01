const express = require('express');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html')
});

app.post('/', function(req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ] 
    };

    // flat pack JSON data into a string
    var jsonData = JSON.stringify(data);

    const url = 'https://us5.api.mailchimp.com/3.0/lists/86ad5e45fa'
    const options = {
        method: "POST",
        auth: "austin1:22dd5364dadc4f9a7cf509dec1054334-us5"
    };

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/succes.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});




app.listen(3000, function() {
    console.log('server is running on port 3000');
});

// api key
// 22dd5364dadc4f9a7cf509dec1054334-us5

// list id 
// 86ad5e45fa