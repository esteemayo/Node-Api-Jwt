const express = require('express');

const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();










const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`APP LISTENING ON PORT ${PORT}.....`));