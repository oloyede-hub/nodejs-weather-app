const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const express = require("express");
const hbs = require("hbs");


const app = express(); 
const port = process.env.PORT || 3000;
const request = require("request");


// Define path to Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine views location
app.set("view engine", "hbs");
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));




app.get('', (req, res) => {
    res.render('index', {
        name: "Solomon Oloyede",
        title: "Weather  App"

    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        text: "The condition of the weather is tiring",
        name: "Oloyede Sodiq"

    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: "Solomon Oloyede",
        text: "The creator is a bad ass wonderful Frontend Engineer!",
        name: "Oloyede Sodiq"

    });
});


// app.get('/products', (req, res) => {
//     console.log(req.query)
//     if(!req.query.search) {
//        return res.send({
//             error: "You must provide the search term!"
//         })
//     }
//     res.send({
//         products: []

//     });
// });


app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({error: "You must to provide an address."})
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return  res.send({
            error: error
        });
        }
      
        forecast(latitude, longitude, (error, forecastData) => {
          if(error) {
            return res.send({
                error: error
            })
          }
          res.send({
            "forecast": forecastData,
            "location": location,
            address: req.query.address
        });
         
        })
      })
    
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        text: 'Help page not found'
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        text: 'Page not found'
    })
})


app.listen(port, () => {
    console.log("The server is runing on port" + port)
})