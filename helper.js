export const detecType = (type) => {
    switch(type){
        case "park":
            return "Car Park";
        case "home":
            return "Home";
        case "job":
            return "Job";
        case "goto":
            return "To be Visited";
    }
};




export const setStorage = (data) => {
    // veriyi locale göndermek için stringe çevirme
    const strData = JSON.stringify(data);
    // localStorage güncelleme
    localStorage.setItem("notes", strData);
};


var carIcon = L.icon({
    iconUrl: "car.png",
    iconSize: [50, 50],
});
  
var homeIcon = L.icon({
    iconUrl: "home-marker.png",
    iconSize: [50, 50],
});
  
var jobIcon = L.icon({
    iconUrl: "job.png",
    iconSize: [50, 50],
});
  
var visitIcon = L.icon({
    iconUrl: "visit.png",
    iconSize: [50, 50],
});



export function detecIcon (type){
    console.log(type)
    switch(type){
        case "park":
            return carIcon;
        case "home":
            return homeIcon;
        case "job":
            return jobIcon;
        case "goto":
            return visitIcon;
    }
}