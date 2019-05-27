const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const DB_NAME = "bank";
const HOST = "mongodb://localhost:27017";

class MongoHelper {
  static create(coll, payload) {
    // Connect using the connection string
    return MongoClient.connect(
      HOST,
      { useNewUrlParser: true }
    ).then(client => {
      const collection = client.db(DB_NAME).collection(coll);
      return collection.insertOne(payload);
    });
  }

  static get(coll) {
    return MongoClient.connect(
      HOST,
      { useNewUrlParser: true }
    ).then(client => {
      const collection = client.db(DB_NAME).collection(coll);
      return collection.find().toArray();
    });
  }

  // static getOne(coll, id) {
  //   return MongoClient.connect(
  //     HOST,
  //     { useNewUrlParser: true }
  //   ).then(client => {
  //     const collection = client.db(DB_NAME).collection(coll);
  //     return collection.findOne({ _id: ObjectID(id) }).toArray();
  //   });
  // }

  static delete(coll, id) {
      // Connect using the connection string
      console.log("ID: ", ObjectID(id));
      return MongoClient.connect(
        HOST,
        { useNewUrlParser: true }
      ).then(client => {
        const collection = client.db(DB_NAME).collection(coll);
        console.log("THIS LOG line 36");
        return collection.deleteOne({ _id: ObjectID(id) });
      });
    }

  static update(coll, id, payload) {
    // Connect using the connection string
    return MongoClient.connect(
      HOST,
      { useNewUrlParser: true }
    ).then(client => {
      const collection = client.db(DB_NAME).collection(coll);
      return collection.updateOne({_id: ObjectID(id)}, {$set : payload});
    });
  }

  static addAccount(coll, id, payload) {
    // Connect using the connection string
    return MongoClient.connect(
      HOST,
      { useNewUrlParser: true }
    ).then(client => {
      const collection = client.db(DB_NAME).collection(coll);
      return collection.updateOne({_id: ObjectID(id)}, {$push: { accounts: payload } });
    });
  }




}

module.exports = MongoHelper;
