const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

const PORT = 8888;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('RESTful service');
});

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));