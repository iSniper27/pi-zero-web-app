'use client';

import { InputLabel, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { SetRGB } from "../api/RGBLight";
import { io } from "socket.io-client";

type RGBEvent = {
  colors: Array<number>;
};

export default function RgbComponent({ rgb }: { rgb: Array<number> }) {
  const [ledStates, setLedStates] = useState({
    red: 0,
    green: 0,
    blue: 0,
  });

  function changeRGB(rgb: Array<number>) {
    if (rgb && rgb.length === 3) {
      setLedStates({
        red: rgb[0],
        green: rgb[1],
        blue: rgb[2],
      });
    }
  }

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_IP, {
    });

    socket.emit("join_room", "rgb");

    socket.on('RGBChange', (data: RGBEvent) => {
      const { colors } = data;
      changeRGB(colors)
    })

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    changeRGB(rgb)
  }, [rgb]);

  const handleSliderChange = (color: string) => (_event: unknown, value: number | number[]) => {
    setLedStates((prev) => ({
      ...prev,
      [color]: value,
    }));
  };

  const handleRGBChange = () => {
    SetRGB([ledStates.red, ledStates.green, ledStates.blue]);
  };

  return (
    <div className="RGB">
      <div className='slidersContainer'>
        {Object.entries(ledStates).map(([color, value]) => (
          <div key={color}>
            <InputLabel sx={{ color: color }}>{color}</InputLabel>
            <Slider value={value} onChange={handleSliderChange(color)} onChangeCommitted={handleRGBChange} min={0} max={1} step={0.1} />
          </div>
        ))}
      </div>

      <div
        className='RGBvisualizer'
        style={{
          backgroundColor: `rgb(${Math.round(ledStates.red * 255)}, ${Math.round(ledStates.green * 255)}, ${Math.round(ledStates.blue * 255)})`,
        }}
      />
    </div>
  )
}