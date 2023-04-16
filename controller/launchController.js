const fs = require('fs');
const csv = require('csv-parse');

const jsonFile = './csv/rockets.json';
const csvFile1 = './csv/kepler_data.csv';

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
    const loadData = JSON.parse(fs.readFileSync(jsonFile));

    loadData.push(rocket1);

    return fs.writeFileSync(jsonFile, JSON.stringify(loadData));
}

// destinationExoplanet();
destinationExoplanet();
exports.getHabitablePlantes = (req, res) => {
    const mapData = items.map((el) => {
        return el['kepler_name'];
    });
    // console.log(items);
    res.json({
        status: 'success',
        mapData,
    });
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

    res.json({
        status: 'success',
        data: {
            rocket1,
        },
    });
};

exports.getAllRockets = (req, res) => {
    const rockets = JSON.parse(fs.readFileSync(jsonFile));

    console.log(rockets);
    res.json({
        status: 'success',
        data: rockets,
    });
};
