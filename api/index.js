const excursiones = require('./src/models/data.json')
const server = require('./src/app.js');
const { conn, Excursion } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001');
    excursiones.forEach((e) => Excursion.create({
      name: e.name,
      Images: e.Images,
      description: e.description,
      location: e.location,
      date: e.date,
      time: e.time,
      price: e.price,
      extra: e.extra,
      excursionType: e.excursionType,
    }).catch((err) => console.log(err))
    )
  });
});
