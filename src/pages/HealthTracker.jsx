import React, { useState, useEffect } from 'react';
import { rtdb } from '../firebase/config'; // Assuming you have rtdb initialized
import { ref, set, push, onValue, remove } from 'firebase/database';
import logo from '../assets/logo.jpg';  // Make sure to import logo image
import healthTrackerImg from '../assets/healthtracker.avif'; // Import the health tracker image

function HealthTracker() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    bloodPressure: '',
    heartRate: '',
    glucose: ''
  });

  const healthRef = ref(rtdb, 'healthData');

  // Fetch entries from RTDB
    useEffect(() => {
  const fetchEntries = () => {
    onValue(healthRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Fetched Data:', data); // Debugging log
      if (data) {
        const entriesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setEntries(entriesArray);
      } else {
        setEntries([]);
      }
    });
  };
  fetchEntries(); 
 }, []);
  // Add a new entry to RTDB
  const addEntry = async () => {
    if (newEntry.date && newEntry.bloodPressure && newEntry.heartRate && newEntry.glucose) {
      const newEntryRef = push(healthRef);  // Push new entry to RTDB
      await set(newEntryRef, newEntry);     // Set the data at the new ref
      setNewEntry({ date: '', bloodPressure: '', heartRate: '', glucose: '' });
  
    }
  };

  // Delete an entry from RTDB
  const deleteEntry = async (id) => {
    const entryRef = ref(rtdb, `healthData/${id}`);
    await remove(entryRef);

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
        {/* Left: Health Tracker */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
            🏥 Health Tracker
          </h2>

          {/* Health Entry Form */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              className="bg-white border-2 border-black text-black p-2 rounded"
            />
            <input
              type="text"
              placeholder="Blood Pressure (e.g. 120/80)"
              value={newEntry.bloodPressure}
              onChange={(e) => setNewEntry({ ...newEntry, bloodPressure: e.target.value })}
              className="bg-white border-2 border-black text-black p-2 rounded"
            />
            <input
              type="number"
              placeholder="Heart Rate (bpm)"
              value={newEntry.heartRate}
              onChange={(e) => setNewEntry({ ...newEntry, heartRate: e.target.value })}
              className="bg-white border-2 border-black text-black p-2 rounded"
            />
            <input
              type="number"
              placeholder="Glucose (mg/dL)"
              value={newEntry.glucose}
              onChange={(e) => setNewEntry({ ...newEntry, glucose: e.target.value })}
              className="bg-white border-2 border-black text-black p-2 rounded"
            />
          </div>

          <button onClick={addEntry} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Entry
          </button>

          {/* Display Logged Entries */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-black">Logged Entries</h2>
            {entries.map((entry) => (
              <div key={entry.id} className="border-b py-2 flex justify-between items-center">
                <div className="text-blue-800">
                  <strong>{entry.date}</strong> - BP: {entry.bloodPressure}, HR: {entry.heartRate} bpm, Glucose: {entry.glucose} mg/dL
                </div>
                <button onClick={() => deleteEntry(entry.id)} className="text-red-500">Delete</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Health Tracker Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={healthTrackerImg}
            alt="Health Tracker Visual"
            className="max-w-full h-130 rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default HealthTracker;
