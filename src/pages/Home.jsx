import React, { useEffect, useState } from 'react';
import { rtdb } from '../firebase/config.js';
import { ref, onValue } from 'firebase/database';
import elderlyCareImg from '../assets/homepage1.avif';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom'; // Import Link for routing

export default function Home() {
  const [sosStatus, setSosStatus] = useState('inactive');

  useEffect(() => {
    const sosRef = ref(rtdb, 'alerts/sos');
    onValue(sosRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.status) {
        setSosStatus(data.status);
      }
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-blue-100 flex flex-col">
      {/* Top Navigation Header */}
      <header className="w-full bg-white shadow-md py-2 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Elder Ease Logo" className="h-8" />
          <h1 className="text-m font-National Park-bold text-blue-800">Elder Ease</h1>
        </div>
        <div className="text-lg text-black">
          🔴 SOS Status:{' '}
          <span className={sosStatus === 'active' ? 'text-red-600 text-xl' : 'text-green-600 text-xl'}>
            {sosStatus}
          </span>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col px-6 py-6 gap-4">
        {/* Slogan Section */}
        <div className="text-center mb-1 font-bold italic text-2xl text-gray-600">
          <blockquote>"Empowering Care, Enriching Lives"</blockquote>
        </div>

        {/* Explanation Section */}
        <div className="text-center">
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Empowering elderly individuals with easy-to-use tools for medication reminders,
            health tracking, appointments, and profile management — all from one place.
          </p>
        </div>

        {/* Two Column Section: Left = Cards | Right = Image */}
        <div className="flex flex-col lg:flex-row flex-1 gap-2">
          {/* 📌 Left: Feature Cards (Vertical Stack) */}
          <div className="flex-1 flex flex-col gap-2">
            <FeatureCard title="💊 Medication" desc="Reminders & logs" link="/medication-reminders" />
            <FeatureCard title="❤️ Health Tracker" desc="Vitals & reports" link="/health-tracker" />
            <FeatureCard title="📅 Appointments" desc="Visits & scheduling" link="/appointments" />
            <FeatureCard title="🧓 Profile" desc="Manage details" link="/profile" />
            {/* Removed the Chat/Video card */}
            <FeatureCard title="ℹ️ About Us" desc="Learn who we are" link="/about-us" />
          </div>

          {/* 🖼️ Right: Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={elderlyCareImg}
              alt="Elderly care visuals"
              className="max-w-full h-125 rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Feature Card Component
const FeatureCard = ({ title, desc, link }) => (
  <Link to={link} className="bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition duration-300 text-left w-full">
    <h2 className="text-md font-semibold text-blue-700">{title}</h2>
    <p className="text-sm text-gray-600">{desc}</p>
  </Link>
);
