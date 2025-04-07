import React, { useEffect, useState } from 'react';
import FloorPlanImage from "../../assests/floor.png";
import Table from "../../assests/Table.png";

const tableNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

const TableReservation = () => {
  const [reservation, setReservation] = useState({
    tables: [],
    date: '',
    time: '',
    name: '',
    contact: '',
    headCount: '',
  });

  const [reservedTables, setReservedTables] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch already reserved tables
  useEffect(() => {
    if (reservation.date && reservation.time) {
      fetch(`/api/reservations?date=${reservation.date}&time=${reservation.time}`)
        .then(res => res.json())
        .then(data => {
          setReservedTables(data.reservedTables || []);
        })
        .catch(err => {
          console.error('Failed to fetch reserved tables', err);
        });
    }
  }, [reservation.date, reservation.time]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const toggleTableSelection = (tableNumber) => {
    const isSelected = reservation.tables.includes(tableNumber);
    const newTables = isSelected
      ? reservation.tables.filter((t) => t !== tableNumber)
      : [...reservation.tables, tableNumber];

    setReservation({ ...reservation, tables: newTables });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reservation.tables.length === 0) {
      setMessage('Please select at least one table.');
      return;
    }

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation),
      });

      if (res.ok) {
        setMessage('Table(s) successfully reserved!');
        setReservation({
          tables: [],
          date: '',
          time: '',
          name: '',
          contact: '',
          headCount: '',
        });
        setReservedTables([]);
      } else {
        setMessage('Error making reservation.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error. Try again later.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[75vh] flex items-center mt-[84px]"
        style={{
          backgroundImage: `url(${Table})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center items-start h-full">
          <h1 className="text-4xl text-white font-passion text-left md:text-6xl font-extrabold leading-snug mt-2 mb-4 tracking-tighter ml-24">
            TABLE <span className="text-orange-500">RESERVATION</span>
          </h1>
          <p className="mt-4 text-left text-white md:text-base leading-relaxed ml-24">
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
          className="w-full h-auto border-4 border-gray-200 rounded-lg shadow-lg"
        />
      </div>

      {/* Reservation Form Section */}
      <div className="bg-grayscale py-10 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto font-passion font-extrabold">
        <h2 className="text-4xl text-gray-800">
          <span className="text-gray-600">TABLE </span>
          <span className="text-black">RESERVATION</span>
        </h2>

        {/* Table Selection Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {tableNumbers.map((num) => {
            const isReserved = reservedTables.includes(num);
            const isSelected = reservation.tables.includes(num);

            return (
              <button
                key={num}
                type="button"
                disabled={isReserved}
                onClick={() => toggleTableSelection(num)}
                className={`w-16 h-16 rounded-lg text-lg font-semibold border transition ${
                  isReserved
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

        {/* Reservation Details Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 font-passion">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={reservation.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Time</label>
              <input
                type="time"
                name="time"
                value={reservation.time}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-xl"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={reservation.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-xl"
              placeholder="Customer Name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={reservation.contact}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-xl"
              placeholder="e.g., 123-456-7890"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Head Count</label>
            <input
              type="number"
              name="headCount"
              value={reservation.headCount}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-xl"
              placeholder="Number of people"
              required
              min="1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-700 transition"
          >
            Book Table{reservation.tables.length > 1 ? 's' : ''}
          </button>
        </form>
      </div>
    </>
  );
};

export default TableReservation;
