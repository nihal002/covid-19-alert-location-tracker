// const start = document.querySelector("#start");
//         const stop = document.querySelector("stop");

//         start.addEventListener("click", () => {
//             navigator.geolocation.getCurrentPosition(data => {
//                     console.log(data);
//                 }, (error) => console.log(error)
//             );
//         });




const start = document.querySelector("#start");
const stop = document.querySelector("stop");


// variables



// const coordinates = [];
var currentlatitude;
var currentlongitude;
var currentlatituderadian;
var currentlongituderadian;
var latituderadian;
var longituderadian;
var ans;
// ans = 6;
// console.log(ans);
var R = 6371;

// start.addEventListener("click", () => {
navigator.geolocation.getCurrentPosition(meta => {
    // navigator.geolocation.watchPosition(data => {
    console.log(meta);
    // coordinates.push([data.coords.longitude, data.coords.latitude]);
    currentlatitude = meta.coords.latitude;
    currentlongitude = meta.coords.longitude;

    // console.log(currentlongitude);

    currentlatituderadian = (currentlatitude / 57.29577951);
    currentlongituderadian = (currentlongitude / 57.29577951);

    // window.localStorage.setItem(
    //     "coordinates",
    //     JSON.stringify(coordinates)
    // );
}, (error) => console.log(error),
    {
        enableHighAccuracy: true
    }
);
// });





// console.log(ans);
function UpdateMap() {
    setTimeout(function () {
        fetch("data.json")
            .then(response => response.json())
            .then(rsp => {
                // console.log(rsp)
                rsp.data.forEach(element => {

                    latitude = element.latitude;
                    longitude = element.longitude;


                    latituderadian = (latitude / 57.29577951);
                    longituderadian = (longitude / 57.29577951);

                    var dlong = currentlongituderadian - longituderadian;
                    var dlat = currentlatituderadian - latituderadian;



                    var ans = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(latituderadian) * Math.cos(currentlatituderadian) * Math.pow(Math.sin(dlong / 2), 2);

                    ans = 2 * Math.asin(Math.sqrt(ans));

                    ans = ans * R;

                    // console.log(ans);
                    if(ans<500)
                    {
                        console.log(element.name);
                        break;
                    }


                    cases = element.infected;
                    if (cases >= 1000) {
                        color = "rgb(255, 0 , 0)";
                    }
                    else if (cases >= 500 && cases < 1000) {
                        color = "rgb(255,128,0)";
                    }
                    else {
                        color = "rgb(0,255,0";
                    }

                    // mark each location given in data.json file
                    new mapboxgl.Marker({
                        draggable: false,
                        color: color
                    })
                        .setLngLat([longitude, latitude])
                        .addTo(map);
                });
            })
        // }
        // console.log(ans);
        // let interval = 200000;
        // setInterval(UpdateMap(),interval);
        // UpdateMap();
    }, 10000);
}
UpdateMap();











