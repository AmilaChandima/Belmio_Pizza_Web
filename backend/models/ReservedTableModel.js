// models/ReservedTables.js

import mongoose from "mongoose";

const reservedTablesSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  tables: { type: [Number], required: true }, // Array of reserved table numbers
});


export default mongoose.model("ReservedTables", reservedTablesSchema);
