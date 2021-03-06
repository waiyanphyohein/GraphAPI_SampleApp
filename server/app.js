const schema = require('./schema/schema');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const MongooseSettting = require('./settings');


const port = 8080;
const app = express();

// allow origin request
app.use(cors());

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