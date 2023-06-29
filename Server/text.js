/*const axios = require('axios');
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://lukasirotkovic5:jfreq38322@leaguesimdb.07fh6bm.mongodb.net/?retryWrites=true&w=majority'; // MongoDB connection URL
const dbName = 'FootballTeams'; // Name of your MongoDB database
const collectionName = 'LeagueSimDB'; // Name of the collection in which to insert the data

// Fetch data from API
axios.get('https://api.football-data.org/v4/matches')
  .then(response => {
    const data = response.data; // Extract the relevant data from the API response

    // Connect to MongoDB
    MongoClient.connect(url, function(err, client) {
      if (err) {
        console.log('Error connecting to MongoDB:', err);
        return;
      }

      // Insert data into MongoDB
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      collection.insertMany(data)
        .then(() => {
          console.log('Data inserted into MongoDB successfully');
          client.close(); // Close the MongoDB connection
        })
        .catch(err => {
          console.log('Error inserting data into MongoDB:', err);
          client.close();
        });
    });
  })
  .catch(err => {
    console.log('Error fetching data from API:', err);
  });
*/