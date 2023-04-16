async function httpGetPlanets() {
  const res = await fetch("http://localhost:8080/launch")
  return res.json()
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const res = await fetch("http://localhost:8080/upcoming")
  return res.json()
}

async function httpSubmitLaunch(launch) {
  console.log(launch);
  try {
    return res = await fetch("http://localhost:8080/launch", {
      method: "POST",
      headers: {
        "Content-Typr": "application/json"
      },
      body: JSON.stringify(launch)
    })
  } catch (err) {
    return {
      ok: false
    }
  }

}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};