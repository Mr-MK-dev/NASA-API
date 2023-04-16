const fs = require('fs');
const csv = require('csv-parse');

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

function getPlanets() {
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

// getPlanets();
getPlanets();
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
