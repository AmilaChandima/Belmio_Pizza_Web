// controllers/reservationController.js
import ReservedTables from "../models/ReservedTableModel.js"
import Reservation from "../models/ReservationModel.js"

export const getReservedTables = async (req, res) => {
  try {
    const { date, time } = req.query;
    const reservedTables = await ReservedTables.findOne({ date, time });
    
    if (reservedTables) {
      return res.json({ reservedTables: reservedTables.tables });
    }

    return res.json({ reservedTables: [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching reserved tables' });
  }
};

// Create a new reservation
export const createReservation = async (req, res) => {
  try {
    const { tables, date, time, name, contact, headCount } = req.body;

    // Check if tables are already reserved for the given date and time
    const reservedTables = await ReservedTables.findOne({ date, time });

    if (reservedTables) {
      const conflictTables = tables.filter((table) =>
        reservedTables.tables.includes(table)
      );

      if (conflictTables.length > 0) {
        return res.status(400).json({
          message: `Table(s) ${conflictTables.join(', ')} are already reserved.`,
        });
      }
    }

    // Create the reservation
    const newReservation = new Reservation({
      tables,
      date,
      time,
      name,
      contact,
      headCount,
    });

    await newReservation.save();

    // Update reserved tables list
    if (reservedTables) {
      reservedTables.tables = [...reservedTables.tables, ...tables];
      await reservedTables.save();
    } else {
      await new ReservedTables({
        date,
        time,
        tables,
      }).save();
    }

    return res.status(201).json({ message: 'Reservation created successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating reservation' });
  }
};


