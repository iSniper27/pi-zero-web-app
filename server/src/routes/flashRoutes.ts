import { Router } from 'express';
import { sendFlash } from '../controller/flashController';
import { getRGB, setRGB } from '../controller/RGBController';

const router = Router();

router.post('/lights/', sendFlash);
router.get('/RGB/', getRGB);
router.post('/RGB/', setRGB);

export default router;