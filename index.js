const express = require('express');
const app = express();
require('./models/dbConfig');

app.use(express.json());

const postsRoutes = require('./Controllers/postsController');

// routes

app.use('/posts', postsRoutes); // lors du / dans l'url ça va appeler le fichier postsController



app.listen(5500, () => {
    console.log('server started: 5500')
});