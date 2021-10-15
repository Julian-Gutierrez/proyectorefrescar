//Importaciones
const express = require('express')
const app = express()
var morgan = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose');
const apiRouter = require('./routes')
//const port = 3000


//Middelwares
app.use(morgan('dev'))
app.use(cors())
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
 });
 

mongoose.promise = global.promise;

const urlDB = 'mongodb+srv://proyecto01:BvMjTZwlIAn2s1Sk@cluster0.rz1cb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(urlDB)
  .then(mongoose => console.log('base de datos conectada')) 
  .catch(mongoose => console.log('error'))



//c


app.set('PORT', process.env.PORT || 3000);


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRouter);

/* app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* app.get('/titanic', (req, res) => {
    res.status(200).json({"Title":"Titanic","Year":"1997","Rated":"PG-13","Released":"19 Dec 1997","Runtime":"194 min","Genre":"Drama, Romance","Director":"James Cameron","Writer":"James Cameron","Actors":"Leonardo DiCaprio, Kate Winslet, Billy Zane","Plot":"A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.","Language":"English, Swedish, Italian, French","Country":"United States, Mexico, Australia","Awards":"Won 11 Oscars. 125 wins & 83 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.8/10"},{"Source":"Rotten Tomatoes","Value":"89%"},{"Source":"Metacritic","Value":"75/100"}],"Metascore":"75","imdbRating":"7.8","imdbVotes":"1,092,075","imdbID":"tt0120338","Type":"movie","DVD":"08 Jan 2002","BoxOffice":"$659,363,944","Production":"20th Century Fox, Lightstorm Entertainment, Paramount Pictures","Website":"N/A","Response":"True"});
  }) */

/* app.get('/api', (req, res) => {
    res.send('Hola desde la ruta api ')
  })  */

app.listen(app.get('PORT'), () => {
    console.log(`Running on PORT: ${app.get('PORT')}`)
  })

/* app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) */