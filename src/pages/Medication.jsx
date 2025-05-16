import { useEffect, useState } from 'react';
import { ref, onValue, push, remove } from 'firebase/database';
import { rtdb } from '../firebase/config';
import logo from '../assets/logo.jpg';
import mediimg from '../assets/medication.jpg';

const Medication = () => {
  const [medications, setMedications] = useState([]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedTime, setNewMedTime] = useState('');
  const [newMedDate, setNewMedDate] = useState('');

  useEffect(() => {
    const medicationsRef = ref(rtdb, 'medications');

    const unsubscribe = onValue(medicationsRef, (snapshot) => {
      const data = snapshot.val();
      const medList = [];

      for (const id in data) {
        medList.push({
          id,
          name: data[id].name,
          time: data[id].time,
          date: data[id].date,
        });
      }

      setMedications(medList);
    });

    return () => unsubscribe();
  }, []);

  const addMedication = async () => {
    if (!newMedName || !newMedTime || !newMedDate) {
      return alert('Please fill in all fields.');
    }

    const medicationsRef = ref(rtdb, 'medications');
    await push(medicationsRef, {
      name: newMedName,
      time: newMedTime,
      date: newMedDate,
    });

    setNewMedName('');
    setNewMedTime('');
    setNewMedDate('');
  };

  const deleteMedication = async (id) => {
    const medRef = ref(rtdb, `medications/${id}`);
    await remove(medRef);
  };

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Custom Header */}
      <header className="w-full bg-white shadow-md py-2 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Elder Ease Logo" className="h-8" />
          <h1 className="text-m font-bold text-blue-800">Elder Ease</h1>
        </div>
      </header>

      {/* Main Content: Split Layout */}
      <div className="flex flex-col md:flex-row px-4 py-6 gap-6">
        {/* Left: Medication Reminders */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
            💊 Medication Reminders
          </h2>

          {/* Input Form */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Add Medication</h3>
            <input
              type="text"
              value={newMedName}
              onChange={(e) => setNewMedName(e.target.value)}
              placeholder="Medication Name"
              className="w-full mb-2 p-2 border border-gray-300 rounded text-gray-800 placeholder-gray-500"
            />
            <input
              type="date"
              value={newMedDate}
              onChange={(e) => setNewMedDate(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded text-gray-800 placeholder-gray-500"
            />
            <input
              type="time"
              value={newMedTime}
              onChange={(e) => setNewMedTime(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded text-gray-800 placeholder-gray-500"
            />
            <button
              onClick={addMedication}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4">
            {medications.map((med) => (
              <div
                key={med.id}
                className="w-full bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{med.name}</h3>
                  <p className="text-gray-500 mt-1">📅 Date: {med.date}</p>
                  <p className="text-gray-500">🕒 Time: {med.time}</p>
                </div>
                <button
                  onClick={() => deleteMedication(med.id)}
                  className="text-red-500 font-bold text-lg hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
            {medications.length === 0 && (
              <p className="text-center text-gray-500">No medications found.</p>
            )}
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={mediimg}
            alt="Medication Illustration"
            className="max-w-full h-155 rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Medication;
