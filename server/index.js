const server = require("./src/server");
const { conn } = require('./src/db.js');
const { fetchCountries } = require('./src/controllers/fetchCountriesToDb');
const PORT = 3001;

conn.sync({ alter: true }).then(async () => {
  await fetchCountries();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))