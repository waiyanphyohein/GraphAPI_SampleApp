const schema = require('./schema/schema');
const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const MongooseSettting = require('./setting');
const port = 8080;
const app = express();


// Connect To MLab DB
mongoose.connect(MongooseSettting.connectionString, MongooseSettting.options);

mongoose.connection.once('open', () => {
    console.log('Connected to Database.');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});