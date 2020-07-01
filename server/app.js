const schema = require('./schema/schema');
const express = require('express');
const port = 8080;
const graphqlHTTP = require('express-graphql');
const app = express();


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});