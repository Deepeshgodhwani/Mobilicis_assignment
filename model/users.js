

const mongoose = require("mongoose");

const { Schema } = mongoose;

const reqString = { type: String, required: true, };
const reqNumber = { type: Number,};

const UserSchema = new Schema({
  id: reqNumber,
  first_name: reqString,
  last_name: reqString,
  email: reqString,
  gender: reqString,
  income: reqString,
  city: reqString,
  car: reqString,
  quote: reqString,
  phone_price: reqString,
});

module.exports = mongoose.model("user", UserSchema,);
