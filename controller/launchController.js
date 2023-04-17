const fs = require('fs');
const csv = require('csv-parse');

const jsonFile = './csv/rockets.json';
const csvFile1 = './csv/kepler_data.csv';
var rockets = JSON.parse(fs.readFileSync(jsonFile));

function habitablePlanetsChecker(planet) {
    return (
        planet['koi_disposition'] == 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
    );
}

let items = [];

function destinationExoplanet() {
    // let items = [];
    fs.createReadStream(csvFile1)
        .pipe(csv.parse({ comment: '#', columns: true }))

        .on('data', (raw) => {
            if (habitablePlanetsChecker(raw) === true) {
                items.push(raw);
            }
        })

        .on('end', () => {
            return items;
        })
        .on('error', () => {
            console.log(`💥💥`, error);
        });
}

function handlePostReq(rocket1) {
    rocket1 = Object.assign(rocket1, { id: Date.now() });
    const loadData = JSON.parse(fs.readFileSync(jsonFile));

    loadData.push(rocket1);

    return fs.writeFileSync(jsonFile, JSON.stringify(loadData));
}

// destinationExoplanet();
exports.getHabitablePlantes = (req, res) => {
    destinationExoplanet();
    const mapData = items.map((el) => {
        return el['kepler_name'];
    });
    const uniqueValue = [...new Set(mapData)];
    // console.log(items);
    res.json(uniqueValue);
};

exports.postNewLaunch = (req, res) => {
    const { missionName, rocketType, destinationExoplanet } = req.body;
    const date = new Date(req.body.date);

    class launchRocket {
        constructor(date, missionName, rocketType, destinationExoplanet) {
            this.date = date;
            this.missionName = missionName;
            this.rocketType = rocketType;
            this.destinationExoplanet = destinationExoplanet;
        }
        showData() {
            console.log(
                `date : ${this.date} , missionName : ${this.missionName} ,rocketType : ${this.rocketType}
            destinationExoplanet : ${this.destinationExoplanet}
            
            `
            );
        }
    }

    const rocket1 = new launchRocket(
        date,
        missionName,
        rocketType,
        destinationExoplanet
    );

    handlePostReq(rocket1);

    res.json(rocket1);
};

exports.getAllRockets = (req, res) => {
    res.json(uniqueArray);
};

exports.history = (req, res) => {
    var rockets = JSON.parse(fs.readFileSync(jsonFile));
    rockets.forEach((ele, i) => {
        return !!ele['date'] ? true : rockets.splice(i, 1);
    });

    rockets.forEach((ele, i) => {
        Date.parse(ele.date) <= Date.now() ? true : rockets.splice(i, 1);
    });

    res.json(rockets);
};

exports.upcomming = (req, res) => {
    var rockets = JSON.parse(fs.readFileSync(jsonFile));

    rockets.forEach((ele, i) => {
        return !!ele['date'] ? true : rockets.splice(i, 1);
    });

    rockets.forEach((ele, i) => {
        Date.parse(ele.date) > Date.now() ? true : rockets.splice(i, 1);
    });

    res.json(rockets);
};

exports.deleteRocket = (req, res) => {
    const id = req.params.id * 1;

    const parseJson = JSON.parse(fs.readFileSync(jsonFile));
    parseJson.forEach((el, i) => {
        if (el['id'] === id) return parseJson.splice(i, 1);
    });
    const str = JSON.stringify(parseJson);
    fs.writeFileSync(jsonFile, str);
    res.json(rockets);
};
