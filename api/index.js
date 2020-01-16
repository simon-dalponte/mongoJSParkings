const fetch = require('node-fetch');
const router = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../lib/mongo');
const $ = require('jquery')
const ajax = require('ajax')

router.use(bodyParser.json());

router.get('/', (req, res) => {
    var requestOptions = {
    method: 'GET',
    "Content-Type": "application/json",
    redirect: 'follow'
    };

    fetch("https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=false&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=nom%2Cadresse%2Cplaces%2Ccapacite&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson", requestOptions)
    .then(response => response.text())
    .then(result =>  {
        tab = [JSON.parse(result).features]
        tab[0].forEach(element => {
            db.get('PARKING').insertOne({
                nom: element.attributes.NOM,
                coord: element.geometry,
                place: element.attributes.PLACES,
                rue: element.attributes.ADRESSE,
                capacite : element.attributes.CAPACITE
            });
            console.log("La requête est un succès !")

    });
    res.redirect("/")
});

})



// router to see all of bdd
router.get('/bdd', (req, res) => {
    const cursor = db.get('PARKING').find().toArray(function (err,result) { 
        res.json(result)
    });
});


module.exports = router;
