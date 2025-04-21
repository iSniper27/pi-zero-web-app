import { Request, NextFunction, Response } from 'express';
import piSocket from '../sockets/piSocket';
import { io } from '../sockets/webSocket';

export const sendFlash = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { color } = req.body;

    console.log(color)

    piSocket.emit('led_flashing', { color }, (response: { success: boolean, message?: string }) => {
      if (response.success) {
        io.emit('led_flashed', { color })
        res.status(200).json({ message: 'Light flashed successfully' });
      } else {
        res.status(500).json({ message: response.message || 'Failed to flash light' });
      }
    });
  } catch (error) {
    next(error);
  }
};