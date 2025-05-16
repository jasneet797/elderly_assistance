import React, { useState, useEffect } from 'react';
import { rtdb } from '../firebase/config';
import { ref, set, get, remove, child } from 'firebase/database';
import logo from '../assets/logo.jpg'; // Make sure to import the image correctly
import appointmentImage from '../assets/appointments.webp'; // Add path for the image for the left side

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppt, setNewAppt] = useState({
    doctor: '',
    date: '',
    time: ''
  });

  const apptRef = ref(rtdb, 'appointments');

  const fetchAppointments = async () => {
    const snapshot = await get(apptRef);
    const data = snapshot.val();
    
    if (data) {
      const apptList = Object.entries(data)
        .map(([id, value]) => ({ id, ...value }))
        .slice(0, 5); // Keep only 5 entries
      setAppointments(apptList);
    }
  };

  const addAppointment = async () => {
    if (newAppt.doctor && newAppt.date && newAppt.time) {
      const newApptRef = ref(rtdb, 'appointments/' + new Date().getTime());
      await set(newApptRef, newAppt);
      setNewAppt({ doctor: '', date: '', time: '' });
      fetchAppointments();
    }
  };

  const deleteAppointment = async (id) => {
    const apptToDeleteRef = child(apptRef, id);
    await remove(apptToDeleteRef);
    fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 bg-white">
        <img src={logo} alt="Elder Ease Logo" className="h-8" />
        <h1 className="text-xl font-bold text-blue-800">Elder Ease</h1>
      </div>

      {/* Main Section */}
      <div className="p-6 flex gap-8">

        {/* Left Side - Image */}
        <div className="w-1/3">
          <img src={appointmentImage} alt="Appointments" className="w-full h-150 rounded-lg border-4 border-gray-300" />
        </div>

        {/* Right Side - Appointment Booking and List */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          {/* Appointment Booking Form */}
          <h1 className="text-2xl font-bold mb-4 text-blue-800 flex items-center gap-2">
            🗓️ Appointments
          </h1>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <input
              type="text"
              placeholder="Doctor's Name"
              value={newAppt.doctor}
              onChange={(e) => setNewAppt({ ...newAppt, doctor: e.target.value })}
              className="border border-black p-2 text-black placeholder:text-gray-500"
            />
            <input
              type="date"
              value={newAppt.date}
              onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
              className="border border-black p-2 text-black placeholder:text-gray-500"
            />
            <input
              type="time"
              value={newAppt.time}
              onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
              className="border border-black p-2 text-black placeholder:text-gray-500"
            />
          </div>

          <button onClick={addAppointment} className="bg-indigo-600 text-white px-4 py-2 rounded mb-4">
            Schedule Appointment
          </button>

          {/* Appointment List */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-blue-800">Upcoming Appointments</h2>
            {appointments.map((appt) => (
              <div key={appt.id} className="border-b py-2 flex justify-between items-center">
                <div className="text-gray-700">
                  <strong>{appt.date}</strong> at {appt.time} with {appt.doctor}
                </div>
                <button onClick={() => deleteAppointment(appt.id)} className="text-red-500">
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
