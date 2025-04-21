import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
      <h1>Homepage</h1>
      <Button component={Link} href="/flashButtons">Flash Buttons</Button>
      <Button component={Link} href="/RGBLight">RGB Light</Button>
    </div>
  );
}
