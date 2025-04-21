export async function GetRGB() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/RGB`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching RGB data:", err);
    return null;
  }
}

  
export async function SetRGB(colors: Array<number>) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/api/RGB`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ colors })
    })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {
      console.error("Error flashing light:", err);
    });
  }