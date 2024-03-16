import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/history.css'

function History() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEvent = () => {
    axios.get('http://localhost:5001/getAllEvent')
      .then((response) => {
        setEvents(response.data); // อัปเดต state ด้วยข้อมูลจาก API
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  // ฟังก์ชั่นการค้นหา
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // กรอง events ตาม searchTerm
  const filteredEvents = events.filter(
    event =>
      event.U_Firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.U_Lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4">History</h2> */}
      <div className="top-box">
        <input
          type="text"
          className="searchhis"
          placeholder="Search by name..."
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-5 mr-5">
        {filteredEvents.map((event, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <div className="font-bold text-lg mb-2">EID: {event.EID}</div>
            <div className="text-gray-700 mb-2">Name: {event.U_Firstname} {event.U_Lastname}</div>
            <div className="text-gray-700 mb-2">Emotion: {event.Emotion}</div>
            <div className="text-gray-700 mb-2">Gender: {event.Gender}</div>
            <div className="text-gray-700 mb-2">Age: {event.Age}</div>
            <div className="mb-2">
              FacePicture: <img className="w-full h-48 object-cover rounded-md mb-2" src={`data:image/png;base64,${event.FacePicture}`} alt="Face" />
            </div>
            <div className="mb-2">
              EnvironmentPicture: <img className="w-full h-48 object-cover rounded-md mb-2" src={`data:image/png;base64,${event.EnvironmentPicture}`} alt="Environment" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
