import React, { useEffect, useState } from "react";
import "./DigitalClock.css";

const DigitalClock = ({ name, className }) => {
  const [time, setTime] = useState(new Date());
  const [daytime, setDaytime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
      setDaytime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function mainTimeFormat() {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${ZeroPad(hours)}:${ZeroPad(minutes)}:${ZeroPad(seconds)} ${ampm}`;
  }

  function ZeroPad(num) {
    return num < 10 ? `0${num}` : num;
  }

  function newDateTime() {
    let hour = daytime.getHours();

    if (hour < 12) return "Morning";
    else if (hour < 16) return "Afternoon";
    else return "Evening";
  }

  return (
    <div className={className}>
      <p className="greeting">
        Good {newDateTime()} {name}
      </p>

      <div className="digitalClockContainer">
        <div className="digitalClock">
          <span className="clock">{mainTimeFormat()}</span>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
