import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FloorPlanImage from "../../assests/FD.png";
import res from "../../assests/res3.jpg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tableNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

const generateTimeSlots = () => {
  const slots = [];
  let hour = 12;
  let minutes = 0;
  while (hour < 23 || (hour === 22 && minutes === 0)) {
    const h = hour < 10 ? `0${hour}` : hour;
    const m = minutes === 0 ? "00" : minutes;
    slots.push(`${h}:${m}`);
    minutes += 30;
    if (minutes === 60) {
      minutes = 0;
      hour++;
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const TableReservation = () => {
  const [reservation, setReservation] = useState({
    tables: [],
    date: '',
    inTime: '',
    outTime: '',
    name: '',
    contact: '',
    headCount: '',
  });

  const [reservedTables, setReservedTables] = useState([]);

  useEffect(() => {
    const { date, inTime, outTime } = reservation;
    if (date && inTime && outTime) {
      axios
        .get('http://localhost:4000/api/reservations/check', {
          params: { date, inTime, outTime }
        })
        .then(res => setReservedTables(res.data.reservedTables || []))
        .catch(err => console.error('Failed to fetch reserved tables', err));
    }
  }, [reservation.date, reservation.inTime, reservation.outTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const toggleTableSelection = (tableNumber) => {
    const isSelected = reservation.tables.includes(tableNumber);
    const updatedTables = isSelected
      ? reservation.tables.filter((t) => t !== tableNumber)
      : [...reservation.tables, tableNumber];
    setReservation({ ...reservation, tables: updatedTables });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reservation.tables.length === 0) {
      toast.error('Please select at least one table.');
      return;
    }

 
    const availableTables = reservation.tables.filter(
      (table) => !reservedTables.includes(table)
    );

    if (availableTables.length === 0) {
      toast.error('No available tables selected....');
      return;
    }


    const updatedReservation = { ...reservation, tables: availableTables };

    try {
      const res = await axios.post('http://localhost:4000/api/reservations', updatedReservation);

      if (res.status === 201) {
        toast.success('Table(s) successfully reserved!');
        setReservation({
          tables: [],
          date: '',
          inTime: '',
          outTime: '',
          name: '',
          contact: '',
          headCount: '',
        });
        setReservedTables([]);
      } else {
        toast.error('Error making reservation.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error making reservation.Time Slot is Already Reserved.');
    }
  };


  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Hero Section */}
    <section className="relative h-[75vh] flex items-center overflow-hidden">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-center bg-cover"
    style={{ backgroundImage: `url(${res})` }}
  ></div>

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Foreground content */}
  <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full">
    <h1 className="text-3xl sm:text-4xl md:text-6xl text-white font-passion font-extrabold leading-snug mt-2 mb-4 tracking-tighter ml-4 sm:ml-8 md:ml-24">
      TABLE <span className="text-orange-500">RESERVATION</span>
    </h1>
    <p className="mt-2 sm:mt-4 text-white text-sm sm:text-base md:text-base leading-relaxed ml-4 sm:ml-8 md:ml-24">
      HOME / SERVICES / TABLE RESERVATION
    </p>
  </div>
</section>


      {/* Floor Plan Section */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">Choose Your Table</h2>
        <img
          src={FloorPlanImage}
          alt="Floor Plan"
          className="w-full h-auto border-4 border-orange-500 rounded-lg shadow-lg"
        />
      </div>

      {/* Reservation Form Section */}
      <div className="bg-gray-50 py-10 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto font-passion font-extrabold">
        <h2 className="text-4xl text-gray-800">
          <span className="text-gray-600">TABLE </span>
          <span className="text-black">RESERVATION</span>
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 font-passion">
          {/* Table Selection Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8 justify-center place-items-center">
            {tableNumbers.map((num) => {
              const isReserved = reservedTables.includes(num);
              const isSelected = reservation.tables.includes(num);

              return (
                <button
                  key={num}
                  type="button"
                  disabled={isReserved}
                  onClick={() => toggleTableSelection(num)}
                  className={`w-16 h-16 rounded-lg text-lg font-semibold border transition ${isReserved
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : isSelected
                        ? 'bg-orange-500 text-white border-orange-700'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {/* Row 1: Date, In Time, Out Time */}
<div className="flex flex-wrap gap-4 mb-4">
  <div className="flex-1 min-w-[150px]">
    <label className="block mb-2 text-gray-700 font-medium">Date</label>
    <input
      type="date"
      name="date"
      value={reservation.date}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 placeholder-gray-400 placeholder-normal"
      required
      min={today}
    />
  </div>

  <div className="flex-1 min-w-[150px]">
    <label className="block mb-2 text-gray-700 font-medium">In Time</label>
    <select
      name="inTime"
      value={reservation.inTime}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 placeholder-gray-400 placeholder-normal"
      required
    >
      <option value="" disabled hidden>Select</option>
      {timeSlots.map((slot) => (
        <option key={slot} value={slot}>{slot}</option>
      ))}
    </select>
  </div>

  <div className="flex-1 min-w-[150px]">
    <label className="block mb-2 text-gray-700 font-medium">Out Time</label>
    <select
      name="outTime"
      value={reservation.outTime}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 placeholder-gray-400 placeholder-normal"
      required
    >
      <option value="" disabled hidden>Select</option>
      {timeSlots.filter(slot => slot > reservation.inTime).map((slot) => (
        <option key={slot} value={slot}>{slot}</option>
      ))}
    </select>
  </div>
</div>

{/* Row 2: Name, Contact, Head Count */}
<div className="flex flex-wrap gap-4 mb-6">
  <div className="flex-1 min-w-[150px]">
    <label className="block mb-2 text-gray-700 font-medium">Name</label>
    <input
      type="text"
      name="name"
      value={reservation.name}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 placeholder-gray-400 placeholder-normal"
      required
      placeholder="Customer Name"
    />
  </div>

  <div className="flex-1 min-w-[150px]">
    <label className="block mb-2 text-gray-700 font-medium">Contact Number</label>
    <input
      type="tel"
      name="contact"
      value={reservation.contact}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 placeholder-gray-400 placeholder-normal"
      required
      placeholder="0779126119"
    />
  </div>

  <div className="flex-1 min-w-[150px]">
    <label className="block mb-2 text-gray-700 font-medium">Head Count</label>
    <input
      type="number"
      name="headCount"
      value={reservation.headCount}
      onChange={handleInputChange}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 placeholder-gray-400 placeholder-normal"
      min="1"
      required
      placeholder="Number of people"
    />
  </div>
</div>

{/* Confirm Booking Button */}
<div className="flex justify-center">
  <button
    type="submit"
    className="bg-orange-500 text-white py-2 px-6 rounded-xl hover:bg-orange-700 transition"
  >
    Confirm Booking
  </button>
</div>

        </form>
      </div>


      {/* ToastContainer to display messages dsbksbfhkbshf dsbsf*/}
      <ToastContainer />
    </>
  );
};

export default TableReservation;
