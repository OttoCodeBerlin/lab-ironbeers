
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const PORT = 3002

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(`${__dirname}/views/partials`)

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', { beers: beers })

    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
    .then(beers => {
      console.log(beers)
      res.render('random-beers', { beers: beers })

    })
    .catch(error => {
      console.log(error)
    })
})

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
