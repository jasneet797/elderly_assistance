import React, { useState, useEffect, useCallback } from 'react';
import { rtdb } from '../firebase/config';
import { ref, set, get } from 'firebase/database';
import logo from '../assets/logo.jpg';
import pro from '../assets/profile.jpg';

function Profile() {
  const [profile, setProfile] = useState({
    id: 0,
    name: '',
    age: '',
    contact: ''
  });
const saveProfile = async () => {
  const userProfilesRef = ref(rtdb, 'userProfiles');
  const newProfileRef = push(userProfilesRef); // Firebase makes unique key
  await set(newProfileRef, profile); // Saves profile to Firebase
};

  const generateNewId = async () => {
    const userProfilesRef = ref(rtdb, 'userProfiles');
    const snapshot = await get(userProfilesRef);
    if (snapshot.exists()) {
      const profiles = snapshot.val();
      const ids = Object.values(profiles).map(p => Number(p.id) || 0);
      const newId = Math.max(...ids, 0) + 1;
      setProfile(prev => ({ ...prev, id: newId }));
    } else {
      setProfile(prev => ({ ...prev, id: 1 }));
    }
  };

  const fetchProfile = async () => {
    await generateNewId();
  };

  const updateProfile = async () => {
    const profileRef = ref(rtdb, 'userProfiles/' + profile.id);
    await set(profileRef, {
      id: profile.id,
      name: profile.name,
      age: Number(profile.age),
      contact: Number(profile.contact)
    });
    alert('Profile updated successfully!');
  };


 useEffect(()=>{
  saveProfile();
 },[])
  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 bg-white">
        <img src={logo} alt="Elder Ease Logo" className="h-8" />
        <h1 className="text-xl font-bold text-blue-800">Elder Ease</h1>
      </div>

      {/* Profile Form and Details */}
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-6 flex gap-8">
        {/* Left Side - Profile Image */}
        <div className="flex-shrink-0 w-1/3">
          <img src={pro} alt="Profile" className="w-full h-auto rounded-full border-4 border-gray-300" />
        </div>

        {/* Right Side - Profile Form */}
        <div className="flex-1 w-2/3">
          <h1 className="text-2xl font-bold mb-4 text-blue-800">👤 Profile</h1>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">ID (Auto-generated)</label>
              <input
                type="number"
                value={profile.id}
                readOnly
                className="border border-black p-2 bg-gray-100 text-black w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="border border-black p-2 text-black placeholder:text-gray-500 w-full"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                className="border border-black p-2 text-black placeholder:text-gray-500 w-full"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                type="number"
                value={profile.contact}
                onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
                className="border border-black p-2 text-black placeholder:text-gray-500 w-full"
                placeholder="Enter contact number"
              />
            </div>
          </div>

          <button
            onClick={updateProfile}
            className="bg-indigo-600 text-white px-4 py-2 rounded mt-4"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
