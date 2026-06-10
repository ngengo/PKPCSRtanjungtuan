// ── DID YOU KNOW FACTS ──────────────────────────────────────────────
var facts = [
  "Rumah Api Tanjung Tuan is the oldest lighthouse in Malaysia, built by the Dutch in 1817.",
  "Every year, thousands of migratory raptors pass through Tanjung Tuan during the spring migration — making it one of the best birdwatching spots in Southeast Asia.",
  "The name 'Tanjung Tuan' means 'Cape of the Lord' in Malay, historically linked to Portuguese and Dutch colonial presence.",
  "The footprint of legendary Malay warrior Hang Tuah is said to be imprinted on a stone on the beach here.",
  "Tanjung Tuan is part of the Malaysia Raptor Watch — a conservation event held annually each March.",
  "The forest around Cape Rachado is one of the last remaining patches of coastal lowland forest in Negeri Sembilan.",
  "Otters, hornbills, and long-tailed macaques are commonly spotted along the Cape Rachado hiking trails.",
  "The Perigi Keramat (Mystical Well) is believed by locals to have been used by Hang Tuah himself.",
  "The Malacca Strait, visible from Tanjung Tuan, is one of the world's busiest shipping lanes.",
  "The jungle trail to the lighthouse passes through 200-year-old trees and limestone rock formations."
];

var currentFact = 0;

function showFact(index) {
  document.getElementById('factbox-text').textContent = facts[index];
}

function nextFact() {
  currentFact = (currentFact + 1) % facts.length;
  showFact(currentFact);
}

// Rotate facts every 12 seconds
showFact(0);
setInterval(nextFact, 12000);

// Show a random fact on the landing overlay
document.getElementById('fact-text').textContent = facts[Math.floor(Math.random() * facts.length)];


// ── LANDING OVERLAY ──────────────────────────────────────────────────
function startExploring() {
  var landing = document.getElementById('landing');
  landing.classList.add('fade-out');
  setTimeout(function() {
    landing.style.display = 'none';
  }, 800);
}


// ── MAP SETUP ────────────────────────────────────────────────────────
var map = L.map('map', { zoomControl: true });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// ── ICON CLASSES ─────────────────────────────────────────────────────
var CustomIcon = L.Icon.extend({
  options: {
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -46],
    className: 'custom-icon'
  }
});

var SmallIcon = L.Icon.extend({
  options: {
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    className: 'custom-icon'
  }
});


// ── LANDMARKS DATA ───────────────────────────────────────────────────
var landmarks = [
  {
    name: "Bukit Batu Putih",
    lat: 2.411133, lng: 101.849444,
    info: "A limestone peak at Cape Rachado with panoramic views of the Malacca Strait. Easily reached via a gentle jungle trail from the lighthouse.",
    img: "https://www.portdickson.info/img/bukit-batu-putih-peak.jpg",
    icon: "https://i.imgur.com/6n7uahL.png",
    category: "landmark"
  },
  {
    name: "Rumah Api Tanjung Tuan",
    lat: 2.407222, lng: 101.851744,
    info: "The oldest lighthouse in Malaysia, built by the Dutch in 1817. It stands on a rocky promontory overlooking the Malacca Strait and is a popular heritage and birdwatching destination.",
    img: "https://images-je.jomexplore.io/wp-content/uploads/2023/12/99ae0ed8.jpg?auto=format&w=1053",
    icon: "https://i.postimg.cc/ZnvcX2zs/lighthouse.png",
    category: "landmark"
  },
  {
    name: "Tapak Kaki Hang Tuah",
    lat: 2.406867, lng: 101.855500,
    info: "A large stone block on the beach bearing what is widely claimed to be the imprint of legendary Malay warrior Hang Tuah's right foot. A significant piece of local folklore and heritage.",
    img: "https://dusunraja.wordpress.com/wp-content/uploads/2012/07/tt141.jpg",
    icon: "https://i.postimg.cc/zfBHvh2T/footprint.png",
    category: "landmark"
  },
  {
    name: "Perigi Keramat",
    lat: 2.408056, lng: 101.853889,
    info: "The Mystical Well — an old well believed by locals to have been used by Hang Tuah. It is considered a sacred site and draws visitors curious about its historical and spiritual significance.",
    img: "https://assets.bharian.com.my/images/articles/tuah02.transformed.jpg",
    icon: "https://i.postimg.cc/YChQfX6Z/perigi-kerama.png",
    category: "landmark"
  },
  {
    name: "Perigi Belanda",
    lat: 2.406533, lng: 101.855678,
    info: "A well built during the Dutch colonial era. A quiet reminder of the European presence that shaped this coastline centuries ago.",
    img: "https://3.bp.blogspot.com/-CYAmfbmdZpU/TvcLp2LYQhI/AAAAAAAACBQ/aHQFpyZ_Xcs/s320/IMG_0196.JPG",
    icon: "https://i.postimg.cc/HnnLDNkC/perigi-belanda.png",
    category: "landmark"
  },
  {
    name: "Monkey Bay",
    lat: 2.41307778, lng: 101.85098889,
    info: "A serene, mostly untouched beach accessible via a steep roped trail through the jungle. A hidden gem away from the crowds — perfect for those who love a short adventure.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtvNy61lOloO9ngJ06WVQAenRWP8BAtbKc1A&s",
    icon: "https://i.postimg.cc/sXYNh1Xg/6-removebg-preview.png",
    category: "trail"
  },
  {
    name: "Gua Bawah Rumah Api",
    lat: 2.40577556, lng: 101.85138889,
    info: "A cave located beneath the old lighthouse, carved into the limestone hillside. An atmospheric spot that adds to the mystique of Cape Rachado.",
    img: "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTgwOTg5NTAvZTU1MGY4NTQxYmU1ZjhhZGY3N2JjMWU1NDk0N2FlZWUuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==",
    icon: "https://i.postimg.cc/14h0crjx/9-removebg-preview.png",
    category: "trail"
  },
  {
    name: "Pulau Masjid",
    lat: 2.40853333, lng: 101.85888889,
    info: "A peaceful coastal spot away from the crowds of the main Port Dickson beaches. A quiet place to enjoy the sea breeze and watch the ships pass through the Malacca Strait.",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZZfFOntRw5yDtdvoqJgKFVKWI46Qt3tKg12QpwQ0bQWIBrOZlz8Th3VaYS9rfvw6vYYXeqcv9Qfxmdd75ANe6R4xNTTEL1LHxrbYSSVD2MNl8dD_MDjZjVvBiDNom7DiOLLH3EdbOU_w/s1600/pic+3.JPG",
    icon: "https://i.postimg.cc/63KNSk4T/8-removebg-preview.png",
    category: "landmark"
  },
  {
    name: "Pulau Intan",
    lat: 2.40277778, lng: 101.85361111,
    info: "A popular spot for birdwatching, hiking, and running. The trail is open year-round and offers beautiful coastal scenery. Great for families and solo explorers alike.",
    img: "https://imgproxy.geocaching.com/f1a4ea3adede0b477f44b875051c75a4476d6c20?url=http%3A%2F%2Fgeocaching.nouveaustere.com%2FGC7C74Y%2Ftanjung_tuan_pulau_intan_south_01.jpg",
    icon: "https://i.postimg.cc/020KBv6K/7-removebg-preview.png",
    category: "trail"
  }
];

// ── ICON-ONLY MARKERS DATA ───────────────────────────────────────────
var iconOnly = [
  { lat: 2.41222222, lng: 101.85111111, icon: "https://i.postimg.cc/sXQwFvzf/Camp-removebg-preview.png", category: "camp" },
  { lat: 2.40416667, lng: 101.85305556, icon: "https://i.postimg.cc/sXQwFvzf/Camp-removebg-preview.png", category: "camp" },
  { lat: 2.41222222, lng: 101.84805556, icon: "https://i.postimg.cc/Vsr1LRg4/Wave-removebg-preview.png", category: "water" },
  { lat: 2.40416667, lng: 101.85388889, icon: "https://i.postimg.cc/Vsr1LRg4/Wave-removebg-preview.png", category: "water" },
  { lat: 2.40944444, lng: 101.85111111, icon: "https://i.postimg.cc/4NZqcQZz/Hiking-removebg-preview.png", category: "trail" },
  { lat: 2.40777778, lng: 101.84888889, icon: "https://i.postimg.cc/wTqCRQcS/sea-otter-removebg-preview.png", category: "wildlife" },
  { lat: 2.40611111, lng: 101.85305556, icon: "https://i.postimg.cc/BvTLy3LL/Birds-removebg-preview.png", category: "wildlife" },
  { lat: 2.40583333, lng: 101.85638889, icon: "https://i.postimg.cc/nh6BgT35/BAtu-removebg-preview.png", category: "trail" },
  { lat: 2.41277778, lng: 101.85055556, icon: "https://i.postimg.cc/nh6BgT35/BAtu-removebg-preview.png", category: "trail" },
  { lat: 2.41000000, lng: 101.85527778, icon: "https://i.postimg.cc/gjMJvkwR/Family-removebg-preview.png", category: "landmark" },
  { lat: 2.41194444, lng: 101.85472222, icon: "https://i.postimg.cc/634VTgyB/m-ONKEY-removebg-preview.png", category: "wildlife" },
  { lat: 2.41416667, lng: 101.85027778, icon: "https://i.postimg.cc/N039CMjw/ship-removebg-preview.png", category: "water" },
  { lat: 2.40638889, lng: 101.84833333, icon: "https://i.postimg.cc/N039CMjw/ship-removebg-preview.png", category: "water" },
  { lat: 2.40722222, lng: 101.86138889, icon: "https://i.postimg.cc/N039CMjw/ship-removebg-preview.png", category: "water" },
  { lat: 2.41194444, lng: 101.86083333, icon: "https://i.postimg.cc/N039CMjw/ship-removebg-preview.png", category: "water" },
  { lat: 2.40722222, lng: 101.85666667, icon: "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png", category: "wildlife" },
  { lat: 2.40805556, lng: 101.85722222, icon: "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png", category: "wildlife" },
  { lat: 2.41305556, lng: 101.85861111, icon: "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png", category: "wildlife" },
  { lat: 2.41250000, lng: 101.85888889, icon: "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png", category: "wildlife" },
  { lat: 2.41166667, lng: 101.85916667, icon: "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png", category: "wildlife" },
  { lat: 2.40361111, lng: 101.85388889, icon: "https://i.postimg.cc/vTD12VwX/Mangrove-removebg-preview.png", category: "wildlife" }
];


// ── TRAIL PATH ───────────────────────────────────────────────────────
// Hiking route connecting main landmarks in order
var trailCoords = [
  [2.40277778, 101.85361111], // Pulau Intan (start)
  [2.40416667, 101.85305556], // Campsite south
  [2.40577556, 101.85138889], // Cave
  [2.406533,   101.855678  ], // Perigi Belanda
  [2.406867,   101.855500  ], // Tapak Kaki Hang Tuah
  [2.407222,   101.851744  ], // Lighthouse
  [2.408056,   101.853889  ], // Perigi Keramat
  [2.40944444, 101.85111111], // Hiker marker
  [2.411133,   101.849444  ], // Bukit Batu Putih
  [2.41222222, 101.85111111], // Campsite north
  [2.41307778, 101.85098889]  // Monkey Bay (end)
];

var trailLayer = L.polyline(trailCoords, {
  color: '#2a9d5c',
  weight: 3,
  opacity: 0.75,
  dashArray: '8, 6'
}).addTo(map);


// ── PLACE MARKERS ────────────────────────────────────────────────────
var allMarkers = []; // { marker, category, type }

landmarks.forEach(function(lm) {
  var icon = new CustomIcon({ iconUrl: lm.icon });
  var marker = L.marker([lm.lat, lm.lng], { icon: icon });

  marker.on('click', function() {
    openSidebar(lm.name, lm.img, lm.info);
  });

  marker.addTo(map);
  allMarkers.push({ marker: marker, category: lm.category, type: 'landmark' });
});

iconOnly.forEach(function(m) {
  var icon = new SmallIcon({ iconUrl: m.icon });
  var marker = L.marker([m.lat, m.lng], { icon: icon });
  marker.addTo(map);
  allMarkers.push({ marker: marker, category: m.category, type: 'icon' });
});


// ── AUTO FIT BOUNDS ──────────────────────────────────────────────────
var bounds = L.latLngBounds();
landmarks.forEach(function(lm) { bounds.extend([lm.lat, lm.lng]); });
iconOnly.forEach(function(m)  { bounds.extend([m.lat, m.lng]); });
map.fitBounds(bounds, { padding: [60, 60] });


// ── SIDEBAR ──────────────────────────────────────────────────────────
function openSidebar(name, img, info) {
  document.getElementById('sidebar-name').textContent = name;
  document.getElementById('sidebar-img').src = img;
  document.getElementById('sidebar-info').textContent = info;
  document.getElementById('sidebar').classList.remove('sidebar-hidden');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.add('sidebar-hidden');
}

// Close sidebar when clicking the map
map.on('click', function() { closeSidebar(); });


// ── LEGEND TOGGLE ────────────────────────────────────────────────────
function toggleLegend() {
  document.getElementById('legend').classList.toggle('legend-hidden');
}


// ── FILTER MARKERS ───────────────────────────────────────────────────
function filterMarkers(category, btn) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // Show/hide markers
  allMarkers.forEach(function(item) {
    if (category === 'all' || item.category === category) {
      if (!map.hasLayer(item.marker)) {
        item.marker.addTo(map);
      }
    } else {
      if (map.hasLayer(item.marker)) {
        map.removeLayer(item.marker);
      }
    }
  });

  // Show/hide trail line
  if (category === 'all' || category === 'trail') {
    if (!map.hasLayer(trailLayer)) trailLayer.addTo(map);
  } else {
    if (map.hasLayer(trailLayer)) map.removeLayer(trailLayer);
  }
}
