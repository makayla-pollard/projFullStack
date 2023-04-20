
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { MovieDb } = require('moviedb-promise');
const cors = require('cors');
const moviedb = new MovieDb(process.env.MOVIEDB_KEY);
const isAuth = require('./middleware/auth')
const schema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
})
app.use(isAuth);

app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue: resolvers,
    graphiql: true
}));

app.get('/popular/:page?', async (req, res) => {
    const page = req.params.page;
    const movies = await moviedb.moviePopular({"page" : page});
    res.send(movies);
});

app.get('/movie/:id', async (req, res) => {
    const id = req.params.id;
    const movie =await moviedb.movieInfo({'id': id});
    try{
        res.send(movie);
    }catch(e){
        throw e;
    }
    
})

app.get('/images/:id', async (req, res) => {
    const id = req.params.id;
    const movieImages = await moviedb.movieImages(id);
    res.send(movieImages)
})

app.get('/search/:title/:page?', async (req, res) => {
    const title = req.params.title;
    const page = req.params.page;
    const movies = await moviedb.searchMovie({query: title, page: page})
    res.send(movies);
})

app.get('/imageUrl', async (req, res) => {
    const url ={
        url: "https://image.tmdb.org/t/p/original/"
    };
    res.send(url);
})

app.get('/actor/:name', async (req, res) => {
    const name = req.params.name;
    const movies = await moviedb.searchPerson({query: name});
    res.send(movies);
})

app.get('/genres', async (req, res) => {
    const movies = await moviedb.genreMovieList();
    res.send(movies);
});

app.get('/genreUrl/:id/:page?', async (req, res) => {
    const id  = req.params.id
    const page = req.params.page;
    const movies = await moviedb.discoverMovie({"with_genres": id, page: page})
    res.send(movies)
})


mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
    }@cluster0.pblcd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    
    app.listen(4000);
}).catch(err => {
    console.log(err);
});
