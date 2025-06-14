import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ deliveryDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const delivery = new Date(deliveryDate).getTime();
      const difference = delivery - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [deliveryDate]);

  return (
    <div className="flex items-center space-x-4 text-sm font-medium">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{timeLeft.days}</span>
        <span className="text-gray-500">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{timeLeft.hours}</span>
        <span className="text-gray-500">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{timeLeft.minutes}</span>
        <span className="text-gray-500">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{timeLeft.seconds}</span>
        <span className="text-gray-500">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer; 