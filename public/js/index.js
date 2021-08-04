function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Browser do not support navigation");
  }
}

async function showPosition(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const data = { lat, long };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  await fetch("/", options)
  .then(location.reload());
}


let x = document.getElementById("error");
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "Geolocation permission denied"
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information unavailable"
      break;
    case error.TIMEOUT:
      x.innerHTML = "Connection timeout"
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred"
      break;
  }
}

