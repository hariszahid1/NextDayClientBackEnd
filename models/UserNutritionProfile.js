const mongoose = require('mongoose');

const MacroSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  min: { type: Number, required: false },
  max: { type: Number, required: false }
}, { _id: false });

const NutritionSchema = new mongoose.Schema({
  calories: { type: Number, required: true },
  protein: { type: MacroSchema, required: true },
  carbs: { type: MacroSchema, required: true },
  fat: { type: MacroSchema, required: true }
}, { _id: false });

const UserNutritionProfileSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  activity: { type: String, required: true },
  goal: { type: String, required: true },
  dietType: { type: String, default: 'balanced' },
  nutrition: { type: NutritionSchema, required: true },
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'UserNutritionProfile'
});

module.exports = mongoose.model('UserNutritionProfile', UserNutritionProfileSchema);
