import { Request, NextFunction, Response } from 'express';
import piSocket from '../sockets/piSocket';
import { io } from '../sockets/webSocket';

export const getRGB = (req: Request, res: Response, next: NextFunction) => {
  try {
    piSocket.emit('getRGB', (response: { rgb: [] }) => {
      if (response) {
        res.status(200).json({ rgb: response.rgb });
      } else {
        res.status(500).json({ message: 'Failed to get rgb status' });
      }
    });
  } catch (error) {
    next(error);
  }
};

export const setRGB = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { colors } = req.body;

    piSocket.emit('setRGB', { colors }, (response: { success: boolean, message?: string }) => {
      if (response.success) {
        io.to("rgb").emit('RGBChange', { colors: colors })
        res.status(200).json({ message: 'Light flashed successfully' });
      } else {
        res.status(500).json({ message: response.message || 'Failed to flash light' });
      }
    });
  } catch (error) {
    next(error);
  }
};