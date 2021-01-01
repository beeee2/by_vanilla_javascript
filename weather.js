const weather = document.querySelector(".js-weather");
const API_KEY = "49e496df554de32778eb2965503246ad";
// API는 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단
const COORDS = "coords";
// 자바스크립트는 웹사이트로 Request를 보내고 응답을 통해서 데이터를 얻을 수 있는데
// 가져온 데이터를 refresh없이도 나의 웹사이트에 적용시킬 수 있다.

function getWheather(lat, lng) {
    // 데이터를 얻는 방법, fetch
    // fetch() 괄호안에 가져올 데이터가 들어간다.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
    //then은 데이터가 우리에게 완전히 넘어왔을 때 함수를 호출한다.
    //변수이름은 json이라 짓고(JSON데이터를 받을것이기에-니콜라스센스)
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    // 객체의 변수의 이름과 객체의 key 이름을 같게 저장
    // latitude = latitude, longitude = longitude를 의미
    saveCoords(coordsObj);
    getwheater(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadedCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWheather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadedCoords();
}
init();