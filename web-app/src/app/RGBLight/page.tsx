import './RGBLight.css';
import RgbComponent from '../components/rgb';

export default async function RGBLight() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/RGB`,{cache:'no-store'})
  const res = await response.json()

  return (
    <RgbComponent rgb={res.rgb}/>
  );
}