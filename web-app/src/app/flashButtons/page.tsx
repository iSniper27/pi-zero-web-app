'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './flashButtons.css';
import { Button } from '@mui/material';
import Flash from '../api/flash';

type FlashEvent = {
  color: string;
};

export default function FlashButtons() {
  const colors = ['red', 'green', 'blue'];
  const [ledStates, setLedStates] = useState({
    red: false,
    green: false,
    blue: false,
  });

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_IP, {
      withCredentials: true
    });

    socket.emit("join_room", "flash");

    socket.on('led_flashed', (data: FlashEvent) => {
      const { color } = data;
      if (color && colors.includes(color)) {
        setLedStates(prev => ({ ...prev, [color]: true }));
        setTimeout(() => {
          setLedStates(prev => ({ ...prev, [color]: false }));
        }, 1000);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="liveUpdate">
      {colors.map(color => (
        <div className="ledsContainer" key={color}>
          <Button onClick={() => Flash(color)}>{color.charAt(0).toUpperCase() + color.slice(1)}</Button>
          <div
            className="leds"
            style={{
              backgroundColor: ledStates[color as keyof typeof ledStates] ? color : 'transparent',
            }}
          />
        </div>
      ))}
    </div>
  );
}
