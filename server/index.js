const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const { bringCountries } = require('./src/controllers/bringCountries')
const PORT = 3001;

conn.sync({ force: true }).then(async () => {
  await bringCountries();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))