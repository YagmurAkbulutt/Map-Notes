import { detecType, setStorage, detecIcon } from "./helper.js";

const form = document.querySelector("form");
const list = document.querySelector("ul");


//OLAY İZLEYİCİLERİ
form.addEventListener("submit" , handleSubmit);
list.addEventListener("click", handleClick);

//ORTAK KULLANIM
var map;
var notes = JSON.parse(localStorage.getItem("notes")) || [];
var coords = [];
var layerGroup = [];

navigator.geolocation.getCurrentPosition(
  loadMap,
  console.log("Kullanıcı Kabul Etmedi.")
);

//HARİTAYA TIKLANINCA ÇALIŞIR, form getirir ve koordinatlar
function onMapClick(e) {
  form.style.display = "flex";
  coords = [e.latlng.lat, e.latlng.lng];
  console.log(coords);
}

//kullanıcı konumuna göre ekrana haritayı getirme
function loadMap(e) {
  
  //HARİTA KURULUM
  map = new L.map("map").setView([e.coords.latitude, e.coords.longitude], 10);
  L.control;
  //HARİTANIN NASIL GÖRÜNECEĞİNİ BELİRLER
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //haritada ekrana basılacak imleçleri tutacağımız katman
  layerGroup = L.layerGroup().addTo(map);

    //giirlen notları haritayı açtığında getirme
  renderNoteList(notes);

  //haritada tıklanma olunca çalışacak fonk.
  map.on("click", onMapClick);
}

//MARKER OLUŞTURMA
function renderMarker(item){
    //marker oluştur
    L.marker(item.coords, {icon: detecIcon(item.status)})
    .addTo(layerGroup)
    .bindPopup(`${item.desc}`); //tıklanınca açılacak not
}

//formun gönderilme olayı
function handleSubmit(e){
    e.preventDefault();
    console.log(e);
    const desc = e.target[0].value;
    if(!desc) return;
    const date = e.target[1].value;
    const status = e.target[2].value;
    //notes dizisine eleman ekleme
    notes.push({id: new Date().getTime(), desc, date, status, coords});
    console.log(notes);
    //local storage güncelleme
    setStorage(notes);
    //rendernoteliste notes dizisini gönderme
    renderNoteList(notes);
    //formu kapatma
    form.style.display = "none"
}

//ekrana notları yazdırma
function renderNoteList(item){
    //notlar alanını temizler
    list.innerHTML = "";
    //markerları temizleme
    layerGroup.clearLayers();
    //her not için diziyi tekrar döndürme
    item.forEach((item) => {
        const listElement = document.createElement("li");
        //datasına sahip id ekleme
        listElement.dataset.id = item.id;
        listElement.innerHTML = `
        <div>
          <p>${item.desc}</p>
          <p><span>Date:</span> ${item.date}</p>
          <p><span>Status:</span> ${detecType(item.status)}</p>

          <i class="bi bi-x" id="delete"></i>
          <i class="bi bi-airplane-fill" id="fly"></i>
        </div>
      `;
      list.insertAdjacentElement("afterbegin",listElement);
      renderMarker(item);
    });
}

function handleClick(e){
    const id = e.target.parentElement.parentElement.dataset.id;
    if(e.target.id == "delete"){
        //id sine ulaşılan elemanı diziden kaldırma
        notes = notes.filter((note) => note.id != id);
        //locali güncelleme
        setStorage(notes);
        //ekranı güncelleme
        renderNoteList(notes);
    }
    if(e.target.id == "fly"){
        const note = notes.find((note) => note.id == id);
        console.log(note);
        map.flyTo(note.coords);
    }
}

