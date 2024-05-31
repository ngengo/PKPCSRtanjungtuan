// Initialize the map and set its view to Port Dickson, Negeri Sembilan coordinates and zoom level
var map = L.map('map').setView([2.4153, 101.8536], 14);

// Add a tile layer to the map (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add geolocation control to the map
L.control.locate({
  position: 'topright',
  strings: {
    title: "Show me where I am"
  },
  locateOptions: {
    enableHighAccuracy: true,
    maxZoom: 16
  }
}).addTo(map);


// Custom icon class with larger icons
var CustomIcon = L.Icon.extend({
  options: {
    iconSize: [100, 100], // Normal size
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
    className: 'custom-icon' // Add a custom class
  }
});

// Custom icon class for icons without pop-ups
var SmallIcon = L.Icon.extend({
  options: {
    iconSize: [50, 50], // Smaller size
    iconAnchor: [25, 50],
    className: 'custom-icon' // Add a custom class
  }
});

// Landmarks data
var landmarks = [
    { "name": "Bukit Batu Putih", "lat": 2.411133, "lng": 101.849444, "info": "Bukit Batu Putih is a limestone peak on a hill at Cape Rachado. The summit provides for a panoramic view. Easily accessible via an easy jungle trail from the lighthouse.", 
    "img": "https://www.portdickson.info/img/bukit-batu-putih-peak.jpg", "icon": "https://i.imgur.com/6n7uahL.png" },
    
    { "name": "Rumah Api Tanjung Tuan", "lat": 2.407222, "lng": 101.851744, "info": "This lighthouse was built by the Dutch in 1817. It is the oldest lighthouse in Malaysia.", 
    "img": "https://images-je.jomexplore.io/wp-content/uploads/2023/12/99ae0ed8.jpg?auto=format&w=1053", "icon": "https://i.postimg.cc/ZnvcX2zs/lighthouse.png" },
    
    { "name": "Tapak Kaki Hang Tuah", "lat": 2.406867, "lng": 101.855500, "info": "The imprint of Hang Tuah's right foot, as it is widely claimed, can be clearly seen on a large stone block on the beach in Tanjung Tuan.",
     "img": "https://dusunraja.wordpress.com/wp-content/uploads/2012/07/tt141.jpg", "icon": "https://i.postimg.cc/zfBHvh2T/footprint.png" },
    
    { "name": "Perigi Keramat", "lat": 2.408056, "lng": 101.853889, "info": "This old well is known as Perigi Keramat or Mystical Well.",
     "img": "https://assets.bharian.com.my/images/articles/tuah02.transformed.jpg", "icon": "https://i.postimg.cc/YChQfX6Z/perigi-kerama.png" },
    
    { "name": "Perigi Belanda", "lat": 2.406533, "lng": 101.855678, "info": "Built in the colonial era.",
     "img": "https://3.bp.blogspot.com/-CYAmfbmdZpU/TvcLp2LYQhI/AAAAAAAACBQ/aHQFpyZ_Xcs/s320/IMG_0196.JPG", "icon": "https://i.postimg.cc/HnnLDNkC/perigi-belanda.png" },
    
    { "name": "Monkey Bay", "lat": 2.41307778, "lng": 101.85098889, "info": "This Port Dickson hiking trail leads down a serene, untouched beach through a rather steep and slippery route that is luckily roped on one side for safety. ",
     "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtvNy61lOloO9ngJ06WVQAenRWP8BAtbKc1A&s", "icon": "https://i.postimg.cc/sXYNh1Xg/6-removebg-preview.png" },
    
    { "name": "Gua Bawah Rumah Api", "lat": 2.40577556, "lng": 101.85138889, "info": "Gua di bawah Rumah Api Tua", 
    "img": "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTgwOTg5NTAvZTU1MGY4NTQxYmU1ZjhhZGY3N2JjMWU1NDk0N2FlZWUuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==", "icon": "https://i.postimg.cc/14h0crjx/9-removebg-preview.png" },
    
    { "name": "Pulau Masjid", "lat": 2.40853333, "lng": 101.85888889, "info": "If you are looking for a peaceful spot away from the crowds on the nearby Port Dickson beaches you could consider this place.", 
    "img": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZZfFOntRw5yDtdvoqJgKFVKWI46Qt3tKg12QpwQ0bQWIBrOZlz8Th3VaYS9rfvw6vYYXeqcv9Qfxmdd75ANe6R4xNTTEL1LHxrbYSSVD2MNl8dD_MDjZjVvBiDNom7DiOLLH3EdbOU_w/s1600/pic+3.JPG", "icon": "https://i.postimg.cc/63KNSk4T/8-removebg-preview.png" },
    
    { "name": "Pulau Intan", "lat": 2.40277778, "lng": 101.85361111, "info": "This is a very popular area for bird, hiking, and running, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime.", 
    "img": "https://imgproxy.geocaching.com/f1a4ea3adede0b477f44b875051c75a4476d6c20?url=http%3A%2F%2Fgeocaching.nouveaustere.com%2FGC7C74Y%2Ftanjung_tuan_pulau_intan_south_01.jpg", "icon": "https://i.postimg.cc/020KBv6K/7-removebg-preview.png" }
];

// Data for markers with only icons (no pop-ups)
var iconOnly = [
//ICON ONLY
//campfire
{ "lat": 2.41222222, "lng": 101.85111111, "icon": "https://i.postimg.cc/sXQwFvzf/Camp-removebg-preview.png" },
{ "lat": 2.40416667, "lng": 101.85305556, "icon": "https://i.postimg.cc/sXQwFvzf/Camp-removebg-preview.png" },
//ocean
{  "lat": 2.41222222, "lng": 101.84805556, "icon": "https://i.postimg.cc/Vsr1LRg4/Wave-removebg-preview.png" },
{ "lat": 2.40416667, "lng": 101.85388889, "icon": "https://i.postimg.cc/Vsr1LRg4/Wave-removebg-preview.png" },
//hiker
{  "lat": 2.40944444, "lng": 101.85111111, "icon": "https://i.postimg.cc/4NZqcQZz/Hiking-removebg-preview.png" },  
//otter
{  "lat": 2.40777778, "lng": 101.84888889, "icon": "https://i.postimg.cc/wTqCRQcS/sea-otter-removebg-preview.png" },
//bird
{  "lat": 2.40611111, "lng": 101.85305556, "icon": "https://i.postimg.cc/BvTLy3LL/Birds-removebg-preview.png" },
//batu
{ "lat": 2.40583333, "lng": 101.85638889, "icon": "https://i.postimg.cc/nh6BgT35/BAtu-removebg-preview.png" },
{  "lat": 2.41277778, "lng": 101.85055556, "icon": "https://i.postimg.cc/nh6BgT35/BAtu-removebg-preview.png" },
//family
{ "lat": 2.41000000, "lng": 101.85527778, "icon": "https://i.postimg.cc/gjMJvkwR/Family-removebg-preview.png" },
//monkey
{"lat": 2.41194444, "lng": 101.85472222, "icon": "https://i.postimg.cc/634VTgyB/m-ONKEY-removebg-preview.png" },
//ship
{ "lat": 2.41416667, "lng": 101.85027778, "icon": "https://i.postimg.cc/N039CMjw/ship-removebg-preview.png" },
{ "lat": 2.40638889, "lng": 101.84833333, "icon": "https://i.postimg.cc/N039CMjw/ship-removebg-preview.png" },
{ "lat": 2.40722222, "lng": 101.86138889, "icon": "https://i.postimg.cc/N039CMjw/ship-removebg-preview.png" },
{ "lat": 2.41194444, "lng": 101.86083333, "icon": "https://i.postimg.cc/N039CMjw/ship-removebg-preview.png" },
//bakau
{ "lat": 2.40722222, "lng": 101.85666667, "icon": "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png" },
{  "lat": 2.40805556, "lng": 101.85722222, "icon": "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png" },
{  "lat": 2.41305556, "lng": 101.85861111, "icon": "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png" },
{ "lat": 2.41250000, "lng": 101.85888889, "icon": "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png" },
{ "lat": 2.41166667, "lng": 101.85916667, "icon": "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png" },
{  "lat": 2.40361111, "lng": 101.85388889, "icon": "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png" },
];

// Add markers for landmarks
landmarks.forEach(function(landmark) {
  var icon = new CustomIcon({ iconUrl: landmark.icon });
  L.marker([landmark.lat, landmark.lng], { icon: icon })
    .bindPopup('<div style="text-align: center;"><strong>' + landmark.name + '</strong><br><img src="' + landmark.img + '" width="200"><br><div style="white-space: normal;">' + landmark.info + '</div></div>')
    .addTo(map);
});

// Add markers for iconOnly
iconOnly.forEach(function(marker) {
  var icon = new SmallIcon({ iconUrl: marker.icon });
  L.marker([marker.lat, marker.lng], { icon: icon })
    .addTo(map);
});
