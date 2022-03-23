const excursiones = require('./src/models/data.json')
const admins = require ('./src/models/admin.json')
const review = require ('./src/models/reviews.json')
const server = require('./src/app.js');
const { conn, Excursion, User, Reviews } = require('./src/db.js');


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
      stock: e.stock,
      lat: e.lat,
      long: e.long
    }).catch((err) => console.log(err))
    )


    admins.forEach((a) => User.findOrCreate({
      where: {
      email: a.email,
      name: a.name,
      dni:a.dni,
      adress:a.adress,
      lastName: a.lastName,
      isAdmin: a.isAdmin}
    }).catch((err) => console.log(err))
    )


    review.forEach((r)=> Reviews.create({
      date: r.date,
      description: r.description,
      rating: r.rating,
      excursionId: r.excursionId,
      userId: r.userId
    })
    )


  });
});
