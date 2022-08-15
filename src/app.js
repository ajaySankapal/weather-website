const path = require("path");
const express = require("../node_modules/express");
const app = express();
const port = process.env.PORT || 3000;

const hbs = require("hbs");
const forecast = require("./utils/forecast");

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//tell express which templating engine we are using
//templating engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
app.get("", (req, res) => {
  //we don't use res.send() here
  res.render("index", {
    title: "Weather App",
    name: "Ajay Sankapal",
  }); ///first arguement is the name of the view the second arguement here will be the dynamic data we want to display on the page
});

//about page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ajay Sankapal",
  });
});

//help page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Do you need help??",
  });
});

//setup static directory to set
app.use(express.static(publicDirectoryPath));
// app.get("", (req, res) => {
//   res.send("<h1>Hello Express!!</h1>");
// });
// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Ajay",
//       age: 23,
//     },
//     {
//       name: "Sandeep",
//       age: 21,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h2>about page</h2>");
// });
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide the address!",
    });
  }
  forecast(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    res.send({
      forecast: data.forecast,
      location: data.location,
      address: req.query.address,
    });
  });
});
//query string
//we can pass as many queries in the url parameters as we want.. but how did the browser get all those queries and send the data according to that query.
//the query can be accessed through the req.query object. it stores the data in key=value pair
app.get("/products", (req, res) => {
  console.log(req.query); //http://localhost:3000/products?search=games&rating=5
  //log() => { search: 'games', rating: '5' }
  //now if we want to have the search term in the query and if we dont provide that search term we want to get the error
  if (!req.query.search) {
    return res.send({
      error: "Please provide the search term!",
    });
  }
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  //'*' to handle other than mentioned above. we can provide some different page
  //place it at the last
  res.render("404", {
    errorMessage: "Help article not found!",
  });
});
app.get("*", (req, res) => {
  //'*' to handle other than mentioned above. we can provide some different page
  //place it at the last
  res.render("404", {
    errorMessage: "Page Not found ⚠️",
  });
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
