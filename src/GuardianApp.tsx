import React, { useState, useEffect } from 'react';
import { Calendar, Gift, BookOpen, Home, User, MapPin, Camera, Award, ChevronLeft, ChevronRight, Volume2, Search } from 'lucide-react';
import { DateTime } from 'luxon';

const GuardianApp = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('+65');
  const [otp, setOtp] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedDate, setSelectedDate] = useState(15);
  const [currentMonth, setCurrentMonth] = useState(DateTime.local().set({ day: 15, month: 3, year: 2025 }));
  const [language, setLanguage] = useState('English');
  const [points, setPoints] = useState(50);
  const [showNotification, setShowNotification] = useState(false);
  const [acceptedCase, setAcceptedCase] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedTab, setSelectedTab] = useState('events');
  const [events, setEvents] = useState([
    { date: 15, time: '1pm-2pm', title: 'CPR Training', location: 'Clementi CC', points: 10, isBooked: false },
    { date: 16, time: '8am-10am', title: 'Fire Drills', location: 'Jurong CC', points: 10, isBooked: false },
    { date: 17, time: '3pm-4pm', title: 'Injury Help', location: 'West Coast RC', points: 10, isBooked: false }
  ]);

  const languages = ['English', 'Chinese', 'Malay', 'Tamil'];
  const translations = {
    English: { home: 'Home', profile: 'Profile', logout: 'Log out' },
    Malay: { home: 'Rumah', profile: 'Profil', logout: 'Log keluar' },
    Chinese: { home: '首页', profile: '个人资料', logout: '登出' },
    Tamil: { home: 'வீடு', profile: 'சுயவிவரம்', logout: 'வெளியேறு' }
  };

  const rewards = [
    { type: 'CDC voucher', amount: 20, expiry: '5/6/25' },
    { type: 'NTUC voucher', amount: 20, expiry: '10/9/25' }
  ];

  const emergencyContacts = [
    { name: 'Aaron', letter: 'A' },
    { name: 'Bob', letter: 'B' },
    { name: 'Celeste', letter: 'C' }
  ];

  const guardianBuddies = [
    { name: 'Aaron', letter: 'A' },
    { name: 'Bob', letter: 'B' },
    { name: 'Crystal', letter: 'C' },
    { name: 'Cherry', letter: 'C' },
    { name: 'Danny', letter: 'D' }
  ];

  const aedLocations = [
    { name: 'Clementi Polyclinic', qty: 3, distance: 'nearest' },
    { name: 'Clementi Avenue 3', qty: 1, distance: 'near' },
    { name: '445B Clementi Crest', qty: 2, distance: 'far' },
    { name: 'Ang Mo Kio', qty: 1, distance: 'medium' },
    { name: 'Bedok', qty: 1, distance: 'medium' },
    { name: 'Choa Chu Kang', qty: 1, distance: 'medium' },
    { name: 'Dover', qty: 1, distance: 'medium' },
    { name: 'East Coast', qty: 1, distance: 'medium' },
    { name: 'Hougang', qty: 1, distance: 'medium' },
    { name: 'Jurong West', qty: 1, distance: 'medium' },
    { name: 'Punggol', qty: 1, distance: 'medium' },
    { name: 'Tampines', qty: 1, distance: 'medium' },
    { name: 'Woodlands', qty: 1, distance: 'medium' },
    { name: 'Yishun', qty: 1, distance: 'medium' },
  ];

  const learningGuides = [
    { title: 'Fire Rescue', completed: false },
    { title: 'Cardiac Arrest', completed: false },
    { title: 'Choking', completed: false },
    { title: 'Hazard Watch', completed: false }
  ];

  useEffect(() => {
    if (currentScreen === 'home') {
      const timer = setTimeout(() => setShowNotification(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = () => {
    if (phoneNumber && otp) {
      if (user) {
        setCurrentScreen('home');
      } else {
        setCurrentScreen('createProfile');
      }
    }
  };

  const handleCreateProfile = () => {
    if (userName) {
      setUser({ name: userName, phone: phoneNumber });
      setCurrentScreen('home');
    }
  };

  const handleVoiceReport = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  const Navigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        <button onClick={() => setCurrentScreen('home')} className={`flex flex-col items-center p-2 ${currentScreen === 'home' ? 'text-blue-600' : 'text-gray-500'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button onClick={() => setCurrentScreen('calendar')} className={`flex flex-col items-center p-2 ${currentScreen === 'calendar' ? 'text-blue-600' : 'text-gray-500'}`}>
          <Calendar size={24} />
          <span className="text-xs mt-1">Calendar</span>
        </button>
        <button onClick={() => setCurrentScreen('rewards')} className={`flex flex-col items-center p-2 ${currentScreen === 'rewards' ? 'text-blue-600' : 'text-gray-500'}`}>
          <Gift size={24} />
          <span className="text-xs mt-1">Rewards</span>
        </button>
        <button onClick={() => setCurrentScreen('catalogue')} className={`flex flex-col items-center p-2 ${currentScreen === 'catalogue' ? 'text-blue-600' : 'text-gray-500'}`}>
          <Search size={24} />
          <span className="text-xs mt-1">Catalogue</span>
        </button>
        <button onClick={() => setCurrentScreen('tutorial')} className={`flex flex-col items-center p-2 ${currentScreen === 'tutorial' ? 'text-blue-600' : 'text-gray-500'}`}>
          <BookOpen size={24} />
          <span className="text-xs mt-1">Tutorial</span>
        </button>
      </div>
    </div>
  );

  const toggleBookedStatus = (title) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.title === title ? { ...event, isBooked: !event.isBooked } : event
      )
    );
  };

  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {user ? 'Welcome back!' : 'Hello!'}
            </h1>
            <p className="text-gray-600">
              {user ? 'Login ID' : 'Create Login ID'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                placeholder="+65"
              />
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Enter OTP</p>
              <div className="flex justify-center space-x-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-lg">•</span>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter OTP"
              />
              <button className="text-blue-600 text-sm mt-2">resend OTP</button>
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'createProfile') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Profile!</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Camera size={32} className="text-gray-500" />
              </div>
              <button className="text-blue-600 text-sm">replace image</button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter name"
              />
            </div>
            
            <button
              onClick={handleCreateProfile}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
            >
              Create Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">Hi {user?.name || 'Sarah'}!</h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-600">Points</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">{points}</span>
                <button onClick={() => setCurrentScreen('rewards')} className="text-blue-600 text-sm">Rewards</button>
              </div>
            </div>
            <button onClick={() => setCurrentScreen('profile')} className="p-2">
              <User size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Announcements */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <h2 className="font-semibold mb-2">Announcements</h2>
            <p className="text-gray-600 text-sm">No announcements today</p>
          </div>

          {/* Events */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Events</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentScreen('calendar')}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  Booked
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  Upcoming
                </button>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => setSelectedTab('events')}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedTab === 'events' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setSelectedTab('booked')}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedTab === 'booked' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Booked
              </button>
            </div>
          </div>

          {/* Report Case Button */}
          <div className="flex space-x-3 mb-4">
            <button 
              onClick={() => setCurrentScreen('reportCase')}
              className="flex-1 bg-red-600 text-white p-4 rounded-lg font-semibold"
            >
              Report Case
            </button>
            <button 
              onClick={() => setCurrentScreen('voiceReport')}
              className="bg-blue-600 text-white p-4 rounded-lg"
            >
              <Volume2 size={24} />
            </button>
          </div>
        </div>

        {/* Emergency Notification */}
        {showNotification && (
          <div className="fixed top-4 left-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">New case nearby</p>
                <p className="text-sm">9:21</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setShowNotification(false);
                    setCurrentScreen('caseDetails');
                  }}
                  className="bg-white text-red-600 px-3 py-1 rounded text-sm font-semibold"
                >
                  Check
                </button>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'caseDetails') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('home')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Case Details</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Cardiac Arrest</h2>
              <div className="space-y-1 text-gray-600">
                <p>25/6/25</p>
                <p>11:43:39 am</p>
                <p className="mt-3">451 Clementi Ave 3, #01-307,</p>
                <p>Singapore 120451</p>
              </div>
            </div>

            <button
              onClick={() => {
                setAcceptedCase(true);
                setCurrentScreen('navigation');
              }}
              className={`w-full p-4 rounded-lg font-semibold text-lg ${
                acceptedCase 
                  ? 'bg-green-600 text-white' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {acceptedCase ? 'ACCEPTED' : 'ACCEPT'}
            </button>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'navigation') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('caseDetails')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Navigation</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin size={20} className="text-blue-600" />
              <span className="font-medium">Your location</span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>Clementi Polyclinic</p>
              <p>Lvl 1 NTUC Fairprice,</p>
              <p>Beside Self-Checkout Kiosk</p>
              <p>451 Clementi Avenue 3</p>
              <p>#01-307, 120451</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Clementi+Polyclinic', '_blank')}
                className="flex-1 bg-blue-600 text-white p-3 rounded-lg font-semibold"
              >
                Start
              </button>
              <button
                onClick={() => window.open('https://www.google.com/maps', '_blank')}
                className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-lg font-semibold"
              >
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'reportCase') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('home')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Report Case</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
              <div className="flex space-x-3">
                <input type="date" defaultValue="2025-06-20" className="flex-1 p-2 border border-gray-300 rounded" />
                <input type="time" defaultValue="12:43" className="flex-1 p-2 border border-gray-300 rounded" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Brief Description (optional)</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg h-24"
                placeholder="Describe the incident..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Add Image</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera size={32} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Before</p>
                  </div>
                </div>
                <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera size={32} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">After</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setPoints(points + 10);
                setCurrentScreen('pointsEarned');
              }}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
            >
              Submit Report
            </button>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'voiceReport') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('home')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Voice Report</h1>
        </div>

        <div className="p-4 flex flex-col items-center justify-center min-h-96">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
            isListening ? 'bg-red-100 animate-pulse' : 'bg-blue-100'
          }`}>
            <Volume2 size={48} className={isListening ? 'text-red-600' : 'text-blue-600'} />
          </div>

          <button
            onClick={handleVoiceReport}
            className={`px-8 py-4 rounded-lg font-semibold text-lg mb-4 ${
              isListening 
                ? 'bg-red-600 text-white' 
                : 'bg-blue-600 text-white'
            }`}
          >
            {isListening ? 'Stop Recording' : 'Tap to speak'}
          </button>

          {isListening && (
            <div className="text-center">
              <p className="text-gray-600">Listening...</p>
              <p className="text-sm text-gray-500 mt-2">Transcription will appear here</p>
            </div>
          )}
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'pointsEarned') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={48} className="text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">You have earned yourself 10 Points</h1>
          <p className="text-gray-600 mb-8">You are 90 points away from redeeming vouchers!</p>
          
          <button
            onClick={() => setCurrentScreen('home')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (currentScreen === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('home')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-800">User name</span>
                <span className="text-gray-600">{user?.name || 'Sarah'}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-800">Phone number</span>
                <span className="text-gray-600">{user?.phone || '+65'}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-800">Address</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              
              <button 
                onClick={() => setCurrentScreen('emergencyContacts')}
                className="flex justify-between items-center w-full py-3 border-b border-gray-100"
              >
                <span className="text-gray-800">Emergency Contacts</span>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-800">Language</span>
                <div className="flex items-center space-x-2">
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent text-gray-600"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
              
              <button 
                onClick={() => setCurrentScreen('login')}
                className="w-full py-3 text-left text-red-600"
              >
                {translations[language]?.logout || 'Log out'}
              </button>
            </div>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'emergencyContacts') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('profile')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Emergency contacts</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm">
            {emergencyContacts.map((contact, idx) => (
              <div key={idx} className="flex items-center p-4 border-b border-gray-100 last:border-b-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-blue-800">{contact.letter}</span>
                </div>
                <span className="text-gray-800">{contact.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'calendar') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentScreen('home')}>
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-semibold">{currentMonth.toFormat('MMMM yyyy')}</h1>
            <div className="flex space-x-2">
              <button onClick={() => setCurrentMonth(currentMonth.minus({ months: 1 }))}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => setCurrentMonth(currentMonth.plus({ months: 1 }))}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setSelectedTab('events')}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedTab === 'events' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setSelectedTab('booked')}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedTab === 'booked' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Booked
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <div className="grid grid-cols-4 gap-4 mb-4">
              {[15, 16, 17, 18].map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 rounded-lg text-center ${
                    selectedDate === date ? 'bg-blue-600 text-white' : 'bg-gray-100'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {events.filter(event => {
              const isSelectedDay = event.date === selectedDate;
              if (selectedTab === 'events') {
                return isSelectedDay && !event.isBooked;
              } else {
                return isSelectedDay && event.isBooked;
              }
            }).map((event, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.location}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {event.points}
                  </div>
                </div>
                <button onClick={() => toggleBookedStatus(event.title)} className="text-blue-600 text-sm mt-2">
                  {event.isBooked ? 'Unbook' : 'Book'}
                </button>
                <button className="text-blue-600 text-sm mt-2 ml-4">View Buddies attending</button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setCurrentScreen('guardianBuddies')}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold mt-4"
          >
            View Guardian Buddies
          </button>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'guardianBuddies') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('calendar')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Guardian Buddies</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm">
            {guardianBuddies.map((buddy, idx) => (
              <div key={idx} className="flex items-center p-4 border-b border-gray-100 last:border-b-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-blue-800">{buddy.letter}</span>
                </div>
                <span className="text-gray-800">{buddy.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'rewards') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('home')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Rewards</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h2 className="font-semibold mb-4">To be used:</h2>
            <div className="space-y-3">
              {rewards.map((reward, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">{reward.type}</p>
                    <p className="text-sm text-gray-600">Expires: {reward.expiry}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{reward.amount}</p>
                    <button 
                      onClick={() => setCurrentScreen('qrCode')}
                      className="text-blue-600 text-sm"
                    >
                      Use Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'qrCode') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('rewards')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">CDC Voucher</h1>
        </div>

        <div className="p-4 flex flex-col items-center justify-center min-h-96">
          <div className="w-64 h-64 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">QR Code</p>
              </div>
            </div>
          </div>
          <p className="text-lg font-semibold">Scan me</p>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'catalogue') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-xl font-semibold mb-4">Catalogue</h1>
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter location"
            />
          </div>
        </div>

        <div className="p-4">
          {searchLocation && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">{searchLocation}</p>
                <p className="font-medium">Showing results for nearest AED & First Aid box:</p>
                <p className="text-sm text-gray-500">In order of nearest to furthest</p>
              </div>

              <div className="space-y-3">
                {aedLocations.map((location, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{location.name}</h3>
                        <p className="text-sm text-gray-600">qty: {location.qty}</p>
                      </div>
                      <button 
                        onClick={() => setCurrentScreen('locationDetails')}
                        className="text-blue-600 text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'locationDetails') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('catalogue')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Location Details</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin size={16} className="text-blue-600" />
                <span className="text-sm text-gray-600">Your location</span>
              </div>
              <h2 className="font-semibold mb-2">Clementi Polyclinic</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Lvl 1 NTUC Fairprice,</p>
                <p>Beside Self-Checkout Kiosk</p>
                <p>451 Clementi Avenue 3</p>
                <p>#01-307, 120451</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Clementi+Polyclinic', '_blank')}
                className="flex-1 bg-blue-600 text-white p-3 rounded-lg font-semibold"
              >
                Start
              </button>
              <button
                onClick={() => window.open('https://www.google.com/maps', '_blank')}
                className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-lg font-semibold"
              >
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'tutorial') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-xl font-semibold mb-2">Tutorial & Games</h1>
          <p className="text-sm text-gray-600">Play to earn points</p>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h2 className="font-semibold mb-4">Essential Learning Guides</h2>
            <div className="space-y-3">
              {learningGuides.map((guide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentScreen(guide.title === 'Hazard Watch' ? 'hazardWatch' : `tutorial_${guide.title.toLowerCase().replace(' ', '')}`)}
                  className="w-full flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <span className="font-medium">{guide.title}</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold mb-4">Hazard Watch</h2>
            <div className="text-center">
              <p className="text-gray-600 mb-4">Keep an eye out for things that could endanger lives and property</p>
              <button 
                onClick={() => setCurrentScreen('hazardWatch')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                PLAY
              </button>
            </div>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'hazardWatch') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('tutorial')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Hazard Watch</h1>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Do your part by helping to clear the hazard & earn rewards</h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
                <Camera size={48} className="text-gray-400" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera size={24} className="text-gray-400 mb-1" />
                    <p className="text-xs text-gray-600">Before</p>
                  </div>
                </button>
                <button className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera size={24} className="text-gray-400 mb-1" />
                    <p className="text-xs text-gray-600">After</p>
                  </div>
                </button>
              </div>
            </div>

            <button 
              onClick={() => {
                setPoints(points + 10);
                setCurrentScreen('pointsEarned');
              }}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
            >
              Submit & Earn Points
            </button>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'tutorial_firerescue') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('tutorial')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Fire Rescue Tutorial</h1>
          <p className="text-gray-600 mt-2">Fire Safety Tips:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
            <li>Know your escape routes and practice fire drills regularly.</li>
            <li>Install smoke detectors and carbon monoxide alarms on every level of your home.</li>
            <li>Have a designated meeting point outside your home.</li>
            <li>Never go back inside a burning building.</li>
          </ul>
        </div>
        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'tutorial_cardiacarrest') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('tutorial')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Cardiac Arrest Tutorial</h1>
          <p className="text-gray-600 mt-2">Recognizing Cardiac Arrest and Performing CPR:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
            <li>Call emergency services immediately.</li>
            <li>Begin chest compressions: push hard and fast in the center of the chest.</li>
            <li>Continue compressions until medical help arrives or the person shows signs of recovery.</li>
            <li>If trained, alternate compressions with rescue breaths.</li>
          </ul>
        </div>
        <Navigation />
      </div>
    );
  }

  if (currentScreen === 'tutorial_choking') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 shadow-sm">
          <button onClick={() => setCurrentScreen('tutorial')} className="mb-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Choking Tutorial</h1>
          <p className="text-gray-600 mt-2">First Aid for Choking:</p>
          <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
            <li>Encourage the person to cough forcefully.</li>
            <li>If coughing is ineffective, administer 5 back blows between the shoulder blades.</li>
            <li>Perform 5 abdominal thrusts (Heimlich maneuver).</li>
            <li>Alternate between back blows and abdominal thrusts until the object is dislodged.</li>
          </ul>
        </div>
        <Navigation />
      </div>
    );
  }

  // Default fallback to home
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Guardian App</h1>
        <button 
          onClick={() => setCurrentScreen('login')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default GuardianApp;