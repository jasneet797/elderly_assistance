import React, { useState, useEffect } from 'react';
import { rtdb } from '../firebase/config';
import { ref, push, onValue } from 'firebase/database';
import logo from '../assets/logo.jpg'; // Ensure the path is correct for Elder Ease logo
import sosImage from '../assets/sos.jpg'; // Add the correct path to the SOS image

function EmergencySOS() {
  const [alerts, setAlerts] = useState([]);

  const sendAlert = async () => {
    const alertData = {
      timestamp: new Date().toISOString(),
      message: 'Emergency! Immediate assistance required.'
    };
    await push(ref(rtdb, 'sosAlerts'), alertData);
    alert('SOS Alert Sent!');
  };

  useEffect(() => {
    const sosRef = ref(rtdb, 'sosAlerts');
    onValue(sosRef, (snapshot) => {
      const data = snapshot.val();
      const alertList = data
        ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
        : [];
      setAlerts(alertList.reverse());
    });
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 mb-6 shadow-lg">
        <img src={logo} alt="Elder Ease Logo" className="h-8" />
        <h1 className="text-xl font-bold text-blue-800">Elder Ease</h1>
      </div>

      {/* Main Section with Image on Left and SOS on Right */}
      <div className="p-6 flex gap-8">
        {/* Left Side - Image */}
        <div className="w-1/3">
          <img src={sosImage} alt="SOS Alert" className="w-full h-150 rounded-lg border-4 border-gray-300" />
        </div>

        {/* Right Side - SOS Alert Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md h-150">
          {/* SOS Section with Emoji */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl">{'🚨'}</span>
            <h2 className="text-2xl font-semibold text-blue-800">SOS</h2>
          </div>

          {/* SOS Button */}
          <button
            onClick={sendAlert}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-lg"
          >
            Send SOS
          </button>

          {/* Sent Alerts */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Sent Alerts</h3>
            {alerts.length === 0 ? (
              <p className="text-blue-600">No alerts yet.</p>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className="border-b border-blue-300 py-2 text-sm text-blue-800">
                  {new Date(alert.timestamp).toLocaleString()} - {alert.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencySOS;
