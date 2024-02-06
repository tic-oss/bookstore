module.exports = {
  async up(db) {
    const booksCollection = db.collection('books');

    const booksToInsert = [
      {"name": "The Kashmir Story 2", "price": "199", "author": "Md. Mizan"},
      {"name": "Whispers of the Phoenix ", "price": "250", "author": "Mandy Stoltenberg "},
      {"name": "Whispers of the Phoenix 2", "price": "550", "author": "Mandy Stoltenberg "},
      {"name": "The Lost World ", "price": "1999", "author": "Chetan"},
      {"name": "The Lost World 2 ", "price": "2499", "author": "Chetan"},
      {"name": "Trust Issue ", "price": "8000", "author": "Mannu"},
      {"name": "Trust Issue 2", "price": "5999", "author": "Mannu"},
      {"name": "One Side Love", "price": "399", "author": "Rajkumar"},
      {"name": "One Side Love2", "price": "550", "author": "Sagar"},
      {"name": "Echoes from the Abyss", "price": "1147", "author": "Prof. Jairo Bartoletti MD"},
      {"name": "Serenity's Secret 2", "price": "999", "author": "Dr. Rudy O'Conner"},
      {"name": "The Quantum Paradox", "price": "1246", "author": "Dell Eichmann"},
      {"name": "Beyond the Cosmos", "price": "1583", "author": "Jayne Zemlak"},
      {"name": "Infinite Horizons", "price": "1080", "author": "Alfonzo Nienow"},
      {"name": "Ethereal Dreams", "price": "1212", "author": "Madelynn Nolan IV"},
      {"name": "Galactic Legends", "price": "511", "author": "Josephine Hauck"},
      {"name": "Mystical Journeys", "price": "1465", "author": "Zora Jenkins"},
      {"name": "Celestial Harmony", "price": "199", "author": "Lelah Bruen DVM"},
      {"name": "Beyond Imagination", "price": "497", "author": "Zula Kshlerin PhD"},
      {"name": "Parallel Realms", "price": "1010", "author": "Prof. Breanna Schmitt"},
      {"name": "Astral Odyssey", "price": "766", "author": "Nannie Hand MD"},
      {"name": "Eternal Echoes", "price": "1214", "author": "Pedro Parker DDS"},
      {"name": "Enchanted Visions", "price": "773", "author": "Glen McClure"},
      {"name": "The Celestial Code", "price": "1120", "author": "Dessie Beahan"},
      {"name": "Voyage of Shadows", "price": "1377", "author": "Mr. Dante Russel IV"},
      {"name": "Mystic Legends", "price": "677", "author": "Ocie Leuschke"},
      {"name": "The Nebula Chronicles", "price": "1662", "author": "Lexi VonRueden"},
      {"name": "The Eternal Code", "price": "1025", "author": "Arthur Wolf"},
      {"name": "Cosmic Enigma", "price": "1444", "author": "Marcellus Hauck"},
      {"name": "Harmony of Stars", "price": "727", "author": "Giovanna Jacobi"},
      {"name": "Interstellar Dreams", "price": "879", "author": "Elmira Corwin Sr."},
      {"name": "Timeless Visions", "price": "511", "author": "Darron Kertzmann"},
      {"name": "Galactic Odyssey", "price": "1289", "author": "Scot Quigley"},
      {"name": "Eternal Serenity", "price": "753", "author": "Colten Spinka"},
      {"name": "The Cosmic Symphony", "price": "1414", "author": "Burdette Shields"},
      {"name": "Dreams of Eternity", "price": "487", "author": "Earline Simonis"},
      {"name": "The Celestial Code 2", "price": "999", "author": "Eldora Bailey"},
      {"name": "Beyond the Stars", "price": "1892", "author": "Shemar Welch DDS"},
      {"name": "Celestial Harmony 2", "price": "722", "author": "Walter Reichel"},
      {"name": "Parallel Realms", "price": "1781", "author": "Charlotte Hoeger III"},
      {"name": "Celestial Dreams", "price": "1391", "author": "Geovanni Bayer III"},
      {"name": "Galactic Visions", "price": "1994", "author": "Jeanette Schulist"},
      {"name": "Ethereal Echoes", "price": "1829", "author": "Prof. Wava Frami"},
      {"name": "Stellar Legends", "price": "368", "author": "Rosalia Roob"},
      {"name": "Timeless Odyssey", "price": "1625", "author": "Anya Conn"},
      {"name": "Timeless Odyssey 2", "price": "1500", "author": "Anya Conn"},
      {"name": "The Quantum Paradox", "price": "1981", "author": "Shanon Paucek Sr."},
      {"name": "Voyage to Infinity", "price": "839", "author": "Vince Runte"},
      {"name": "Beyond the Nebula", "price": "932", "author": "Mr. Ted Cummings"},
      {"name": "Eternal Serenity", "price": "1453", "author": "Bennie Tillman"},
      {"name": "Celestial Dreams 2", "price": "628", "author": "Daphney Sporer"},
      {"name": "Mystic Visions", "price": "430", "author": "Prof. Christiana Huel PhD"},
      {"name": "Stellar Odyssey", "price": "837", "author": "Ms. Lela Gerhold DDS"},
      {"name": "Galactic Journeys", "price": "1439", "author": "Jaylen Leuschke I"},
      {"name": "Ethereal Dreams", "price": "1777", "author": "Bessie Collins MD"},
      {"name": "Celestial Harmony", "price": "199", "author": "Miss Autumn Wiza II"},
      {"name": "Cosmic Symphony", "price": "1561", "author": "Hayden Mayert"},
      {"name": "Mystic Code", "price": "222", "author": "Ms. Delta Hills"},
      {"name": "Interstellar Odyssey", "price": "1274", "author": "Chris Murphy"},
      {"name": "Eternal Echoes", "price": "1558", "author": "Ms. Imogene Marquardt"},
      {"name": "Celestial Dreams", "price": "965", "author": "Tod Wilkinson"},
      {"name": "Beyond the Horizon", "price": "342", "author": "Dr. Penelope Okuneva PhD"},
      {"name": "Ethereal Visions", "price": "1146", "author": "Willie Konopelski"},
      {"name": "The Celestial Code", "price": "1223", "author": "Miss Daniela Nienow"},
      {"name": "Galactic Serenity", "price": "1376", "author": "Mr. Maximillian Gaylord"},
      {"name": "Celestial Dreams", "price": "1992", "author": "Yasmeen Paucek "},
      {"name": "Ethereal Journeys", "price": "1834", "author": "Jerome Reichert V"},
      {"name": "Mystic Serenity", "price": "1899", "author": "Jamison Beahan"},
      {"name": "Stellar Visions", "price": "233", "author": "Carole Stokes"},
      {"name": "Eternal Enigma", "price": "1794", "author": "Miss Cassidy Donnelly III"},
      {"name": "Galactic Dreams", "price": "452", "author": "Mattie Pouros"},
      {"name": "Ethereal Enigma", "price": "199", "author": "Estel Lebsack"},
      {"name": "Beyond the Cosmos", "price": "1845", "author": "Elliot Gerhold"},
      {"name": "The Nebula Chronicles", "price": "1471", "author": "Nelda Russel"},
      {"name": "Cosmic Echoes", "price": "655", "author": "D'angelo Schuppe"},
      {"name": "Mystical Dreams", "price": "273", "author": "Prof. Kody Adams Jr."},
      {"name": "Ethereal Symphony", "price": "1488", "author": "Makenna Sauer"},
      {"name": "Timeless Visions", "price": "1382", "author": "Terry Kunde"},
      {"name": "Stellar Odyssey", "price": "1575", "author": "Dr. Zoie Carter"},
      {"name": "Celestial Visions", "price": "1634", "author": "Nina Schimmel"},
      {"name": "Mystic Serenity", "price": "1091", "author": "Mr. Rasheed Mueller II"},
      {"name": "Stellar Dreams", "price": "1179", "author": "Mr. Tito Farrell"},
      {"name": "Hard Work Is The Key To Success", "price": "1599", "author": "Rohith"},
    ];
    for (const book of booksToInsert) {
      const existingDocument = await booksCollection.findOne({ _id: book._id });

      if (existingDocument) {
        await booksCollection.updateOne({ _id: book._id }, { $set: book });
        console.log(`Document '${book.name}' updated in the 'books' collection.`);
      } else {
        const existingByName = await booksCollection.findOne({ name: book.name });

        if (!existingByName) {
          await booksCollection.insertOne(book);
          console.log(`Document '${book.name}' inserted into the 'books' collection.`);
        } else {
          // console.log(`Document '${book.name}' already exists. Skipped insertion.`);
        }
      }
    }
  },

  async down(db) {
    const booksCollection = db.collection('books');

    const updateResult = await booksCollection.updateMany(
      { name: 'New Book Name', price: '29.99', author: 'New Author Name' },
      { $unset: { name: 1, price: 1, author: 1 } }
    );

    console.log(`${updateResult.modifiedCount} documents updated in the 'books' collection. Removed updated 'name', 'price', and 'author' fields.`);
  },
};
// async down(db) {
//   const booksCollection = db.collection('books');

//   // Delete all documents in the 'books' collection
//   const deleteResult = await booksCollection.deleteMany({});

//   console.log(`${deleteResult.deletedCount} documents deleted from the 'books' collection.`);
// },
// };