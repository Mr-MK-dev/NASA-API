async function httpGetPlanets() {
    const res = await fetch('http://localhost:3030/api/launch');
    return res.json();
    // Load planets and return as JSON.
}

async function httpGetLaunches() {
    const res = await fetch('http://localhost:3030/api/history');
    return res.json();
}

async function httpSubmitLaunch(launch) {
    try {
        return (res = await fetch('http://localhost:3030/api/launch', {
            method: 'POST',
            headers: {
                'Content-Typr': 'application/json',
            },
            body: JSON.stringify(launch),
        }));
    } catch (err) {
        return {
            ok: false,
        };
    }
}

async function httpAbortLaunch(id) {
    // TODO: Once API is ready.
    // Delete launch with given ID.
    try {
        return (res = await fetch('http://localhost:3030/api/rockets/:id', {
            method: 'DELETE',
            headers: {
                'Content-Typr': 'application/json',
            },
            body: JSON.stringify(launch),
        }));
    } catch (err) {
        return {
            ok: false,
        };
    }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
