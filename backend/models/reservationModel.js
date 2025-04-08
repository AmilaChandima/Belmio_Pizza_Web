import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  tables: { 
    type: [Number], 
    required: true 
  },
  date: { 
    type: Date, 
    required: true, 
    validate: {
      validator: function(value) {
        return value > new Date();  // Ensure the date is not in the past
      },
      message: 'Reservation date cannot be in the past'
    }
  },
  time: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(value) {
        // Ensure the phone number is in the format like 0779126119
        return /^0[7-9]\d{8}$/.test(value);  // Matches phone numbers starting with 07 and followed by 8 digits
      },
      message: 'Contact number must be a valid 10-digit Sri Lankan phone number starting with 07'
    }
  },
  headCount: { 
    type: Number, 
    required: true, 
    min: [1, 'Head count must be at least 1']
  },
});

export default mongoose.model("Reservation", reservationSchema);
