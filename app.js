require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")

const app = express();

// app.use(express.static("public"))
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email;

    const data = {
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
    }

    const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/c67d245aff";

  const options = {
    method: "POST",
    auth: process.env.AUTH,
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

})

app.post("/failure", (req, res) => {
  res.redirect("/");
});


// Server
const PORT = 9000;
app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});