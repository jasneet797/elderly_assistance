import React from 'react';
import logo from '../assets/logo.jpg'; 
import abtimg from '../assets/aboutus.png';

const AboutUs = () => (
  <div className="bg-blue-50 text-gray-900 h-screen overflow-y-auto">
    {/* Header */}
    <div className="flex items-center gap-4 p-6 bg-white shadow-md sticky top-0 z-10">
      <img src={logo} alt="Elder Ease Logo" className="h-8" />
      <h1 className="text-xl font-bold text-blue-800">Elder Ease</h1>
    </div>

    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        {/* Left: Image */} 
        <div className="md:w-1/3 w-full">
          <img 
            src={abtimg}
            alt="Elderly Care"
            className="w-full h-auto object-cover rounded-lg shadow-md"
            style={{ minHeight: '100%' }}
          />
        </div>

        {/* Right: All Content */}
        <div className="md:w-2/3 w-full flex flex-col space-y-4">
          {/* About Us */}
          <header className="text-center md:text-left">
            <h1 className="text-2xl font-semibold text-indigo-600">About Us</h1>
            <p className="text-sm text-gray-600 mt-2">We're here to empower the elderly with care and comfort through technology.</p>
          </header>

          {/* Vision */}
          <section className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌟</span>
              <h2 className="text-xl font-semibold text-indigo-600">Our Vision</h2>
            </div>
            <p className="mt-2 text-sm text-gray-800">
              Our vision is to provide elderly individuals with the tools and support they need to live healthier,
              more independent, and fulfilling lives. We aim to create an accessible, intuitive platform that connects
              caregivers, family members, and medical professionals to provide timely assistance.
            </p>
          </section>

          {/* Mission */}
          <section className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🚀</span>
              <h2 className="text-xl font-semibold text-indigo-600">Our Mission</h2>
            </div>
            <p className="mt-2 text-sm text-gray-800">
              At Elderease, our mission is to enhance the quality of life for seniors by providing them with an easy-to-use
              platform that offers medication reminders, health tracking, emergency assistance, appointments scheduling, and
              seamless communication with loved ones.
            </p>
          </section>

          {/* Core Values */}
          <section className="rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-2xl mr-2">💡</span>
              <h2 className="text-xl font-semibold text-indigo-600">Our Core Values</h2>
            </div>
            <ul className="mt-2 list-inside list-disc text-sm text-gray-800">
              <li><strong>Compassion:</strong> Thoughtful and empathetic solutions.</li>
              <li><strong>Independence:</strong> Empowering seniors to manage their lifestyle.</li>
              <li><strong>Safety:</strong> Prioritizing quick access to emergency help.</li>
              <li><strong>Innovation:</strong> Using tech to improve elderly lives.</li>
            </ul>
          </section>

          {/* Team */}
          <section className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-2xl mr-2">👥</span>
              <h2 className="text-xl font-semibold text-indigo-600">Meet Our Team</h2>
            </div>
            <p className="mt-2 text-sm text-gray-800">
              Elderease is powered by a team of healthcare professionals, tech experts, and senior care specialists,
              working together to provide reliable, easy-to-use services for seniors.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-white rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-2xl mr-2">📞</span>
              <h2 className="text-xl font-semibold text-indigo-600">Contact Us</h2>
            </div>
            <p className="mt-2 text-sm text-gray-800">Have questions or need help? Reach out to us:</p>
            <p className="mt-1 text-sm text-gray-800">Email: support@elderease.com</p>
            <p className="mt-1 text-sm text-gray-800">Phone: +123 456 7890</p>
          </section>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-100 text-center p-4 mt-8">
      &copy; 2025 Elderly Care. All rights reserved.
    </footer>
  </div>
);

export default AboutUs;
