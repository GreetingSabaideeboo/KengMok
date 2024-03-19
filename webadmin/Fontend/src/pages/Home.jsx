import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import axios from 'axios';
import Emotionpic from './image/emotion.png'
import User from './image/people.png'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Home = () => {
  const [emotionsCount, setEmotionsCount] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [eventDistribution, setEventDistribution] = useState({ labels: [], datasets: [] });
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const emotionResponse = await axios('http://localhost:6956/getEventForHome');
        processEmotionData(emotionResponse.data);
        const eventResponse = await axios('http://localhost:6956/getEventMount');
        processEventDistribution(eventResponse.data);
      } catch (error) {
        console.error('Failed to fetch event data:', error);
      }
    };

    fetchEventData();
  }, []);

  const processEmotionData = (data) => {
    let emotionsCounter = { neutral: 0, happy: 0, sad: 0, angry: 0, fear: 0, surprise: 0, disgust: 0 };
    data.forEach(event => {
      if (emotionsCounter.hasOwnProperty(event.Emotion)) {
        emotionsCounter[event.Emotion]++;
      }
    });
    setEmotionsCount(Object.values(emotionsCounter));
    setTotalUser(data.length);
  };

  const processEventDistribution = (data) => {
    let hourlyCounts = new Array(24).fill(0);
    data.forEach(event => {
      const hour = new Date(event.EDateTime).getHours();
      hourlyCounts[hour]++;
    });

    setEventDistribution({
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [{
        label: 'Events',
        data: hourlyCounts,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    });
  };

  const pieData = {
    labels: ['neutral', 'happy', 'sad', 'angry', 'fear', 'surprise', 'disgust'],
    datasets: [{
      data: emotionsCount,
      backgroundColor: [
        'rgba(102, 255, 255, 0.8)', // Neutral - White
        'rgba(255, 235, 59, 0.8)', // Happy - Yellow
        'rgba(33, 150, 243, 0.8)', // Sad - Blue
        'rgba(244, 67, 54, 0.8)', // Angry - Red
        'rgba(103, 58, 183, 0.8)', // Fear - Purple
        'rgba(255, 152, 0, 0.8)', // Surprise - Orange
        'rgba(96, 125, 139, 0.8)' // Disgust - Grey
      ],
      borderColor: [
        'rgba(255, 255, 255, 1)',
        'rgba(255, 235, 59, 1)',
        'rgba(33, 150, 243, 1)',
        'rgba(244, 67, 54, 1)',
        'rgba(103, 58, 183, 1)',
        'rgba(255, 152, 0, 1)',
        'rgba(96, 125, 139, 1)'
      ],
      borderWidth: 1
    }]
  };


  const lineOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Emotion Today',
        font: {
          size: 20
        }
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row mt-3">
      <div className="flex-1 p-4 bg-white rounded-xl mx-3" >
        <h2 className='text-center font-extrabold text-xl'>Event Distribution Over 24 Hours</h2>
        <Line data={eventDistribution} options={lineOptions} />
      </div>
      <div className='w-[28%] h-[100%]'>
        <div className='h-[50%] flex flex-col items-center bg-white rounded-3xl'>
          <div className='flex justify-center mt-2'>
            <img src={User} className='w-[20%]' />
            <p className='text-xl mr-10'>Total User</p>
          </div>

          <p className='text-xl font-extrabold'>{totalUser} People</p>
        </div>
        <div className=' h-70 bg-white rounded-3xl text-center mt-5'>
          {/* <h2>Emotion Today</h2> */}
          <Pie data={pieData} options={options} />
        </div>
      </div>

    </div>
  );
};

export default Home;
