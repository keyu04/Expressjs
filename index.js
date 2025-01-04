require('./utilities/envconfig'); // for environment variables
require('./utilities/connections/mongoCon'); // for db connection
require('./utilities/connections/redisCon'); // for redis connection
const express = require('express');
const color = require("colors")
const now = new Date();
const route = require('./utilities/route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", route);


app.listen(process.env.PORT, () => {
    console.log(`------------------------------------------------------------------------------`);
    console.log(`Current Date and Time: ${now}`.yellow);
    console.log(`------------------------------------------------------------------------------`);
    console.log(`Server        `.green+`: ${process.env.LOCALHOST}`);
    console.log(`port          `.green+`: ${process.env.PORT}`);
    console.log(`Environment   `.green+`: ${process.env.NODE_ENV}`);
    console.log(`localhost     : http://${process.env.LOCALHOST}:${PORT}`.blue);
    console.log(`------------------------------------------------------------------------------`);
});
