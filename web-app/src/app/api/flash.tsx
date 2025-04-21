export default function Flash(color: string) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/lights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ color })
    })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {
      console.error("Error flashing light:", err);
    });
  }
  