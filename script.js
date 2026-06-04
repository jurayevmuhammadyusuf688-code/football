// Sound Processing Engine Architecture
let audioEnabled = false;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playStadiumSound() {
  if (!audioEnabled) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.value = 110;
  gain.gain.value = 0.15;
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1.2);
  osc.stop(audioCtx.currentTime + 1.2);
}

document.getElementById('audioToggle')?.addEventListener('click', () => {
  audioEnabled = !audioEnabled;
  document.getElementById('audioToggle').innerHTML = audioEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
  if (audioEnabled && audioCtx.state === 'suspended') audioCtx.resume();
});

// Loading screen synchronization hook
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loadingScreen');
    if(loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }
    document.querySelector('.main-content').style.display = 'block';
    initAll();
  }, 1200);
});

// Global Content Datasets
const worldcups = [
  { year: "Qatar 2022", champion: "Argentina", stats: "Messi Legend Journey", code: "AR", goals: "172 goals" },
  { year: "Russia 2018", champion: "France", stats: "Mbappé Peak Speed Runs", code: "FR", goals: "169 goals" },
  { year: "Brazil 2014", champion: "Germany", stats: "Historic Semi-Final Runs", code: "DE", goals: "171 goals" }
];

const players = [
  { name: "Lionel Messi", nation: "Argentina", goals: "821+", achievements: "World Cup 2022, Ballon d'Or 8", image: 'https://i.pinimg.com/736x/28/84/18/28841880b613e3b0a7a75010356d2b9f.jpg '},
  { name: "Cristiano Ronaldo", nation: "Portugal", goals: "873+", achievements: "5x Champions League, Euro 2016", image: 'https://d2x51gyc4ptf2q.cloudfront.net/content/uploads/2026/02/10085811/cristiano-ronaldo-al-nassr.jpg' },
  { name: "Kylian Mbappé", nation: "France", goals: "300+", achievements: "World Cup 2018, Hat-trick Final 2022", image: 'https://icdn.football-espana.net/wp-content/uploads/2024/10/kylian-mbappe.jpg' },
  { name: "Neymar Jr", nation: "Brazil", goals: "430+", achievements: "Champions League Winner, Olympic Gold", image: 'https://tse2.mm.bing.net/th/id/OIP.iUNat2iHcor_CFDWYCIk1gHaI6?rs=1&pid=ImgDetMain&o=7&rm=3'},
  { name: "Erling Haaland", nation: "Norway", goals: "250+", achievements: "Premier League Treble, Golden Boot", image:   'https://tse2.mm.bing.net/th/id/OIP.Mwidybu44NvCSjw6G-AENwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { name: "Jude Bellingham", nation: "England", goals: "80+", achievements: "La Liga MVP, UCL Champion", image: 'https://i.pinimg.com/736x/12/4b/86/124b864ebbf1b6150ccd5e8f9329a728.jpg' },
  { name: "KUHUSANOV", nation: "UZBEKISTAN", goals: "80+", achievements: "La Liga MVP, UCL Champion", image: 'https://www.mancity.com/meta/media/4ovlibec/khusanov-no-overlay-6.jpg' },
  { name: "CHERKI", nation: "FRANSIA", goals: "80+", achievements: "La Liga MVP, UCL Champion", image: 'https://ichef.bbci.co.uk/ace/standard/963/cpsprodpb/80e4/live/6c6c4ff0-8687-11f0-9e03-99ad5cbcdd73.jpg' },
];

const newsItems = [
  { title: "Championship Tournament Structure Set", category: "Transfer", desc: "Clubs begin formatting operational frameworks for tournament extensions." },
  { title: "Expanded Global Cup Format Launching", category: "World Cup", desc: "48 matching entities confirmed to perform during global fixtures schedules." },
  { title: "Manga Animation Style Influences Football League", category: "Culture", desc: "High intensity anime rendering structures inspire tactical player aesthetics." }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1518091043644-c2e5e0fd6542?w=400", "https://images.unsplash.com/photo-1522778119029-d647692128b0?w=400", 
  "https://images.unsplash.com/photo-1459862105998-e4f9823be7d6?w=400", "https://images.unsplash.com/photo-1508096821946-55968e7302f3?w=400", 
  "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400"
];

const rankingsData = [
  { country: "ARGENTINA", points: 1860, progress: 99 },
  { country: "FRANCE", points: 1840, progress: 94 },
  { country: "BELGIUM", points: 1795, progress: 89 },
  { country: "ENGLAND", points: 1790, progress: 88 },
  { country: "BRAZIL", points: 1785, progress: 87 }
];

const fans = [
  { name: "Shinji K.", comment: "The localized filtering architecture responses are incredibly prompt.", icon: "fa-user-ninja" },
  { name: "Maria L.", comment: "Excellent transitions and interface execution properties.", icon: "fa-user-astronaut" },
  { name: "LeoFan", comment: "The graphics elements add a clean appearance to matching rosters.", icon: "fa-user-shield" }
];

// Rendering Layout Assemblers
function buildWorldcup() {
  const container = document.getElementById('worldcupGrid');
  if (!container) return;
  container.innerHTML = worldcups.map(w => `
    <div class="glass-card">
      <div style="font-size:1.5rem; margin-bottom:10px;"><i class="fas fa-trophy" style="color:var(--neon-green)"></i></div>
      <h3 class="card-title-layout">FIFA World Cup ${w.year}</h3>
      <div class="card-stat-row"><i class="fas fa-crown"></i> <span>Champion: ${w.champion}</span></div>
      <div class="card-stat-row"><i class="fas fa-chart-bar"></i> <span>${w.stats}</span></div>
      <div class="card-stat-row"><i class="fas fa-futbol"></i> <span>${w.goals} Matrix</span></div>
      <div class="rank-bar" style="margin-top:15px;"><div class="rank-fill" style="width:100%"></div></div>
    </div>
  `).join('');
}

function buildPlayers(filterText = "") {
  const cont = document.getElementById('playersGrid');
  if (!cont) return;

  const filtered = players.filter(p => 
    p.name.toLowerCase().includes(filterText) || 
    p.nation.toLowerCase().includes(filterText) ||
    p.achievements.toLowerCase().includes(filterText)
  );

  cont.innerHTML = filtered.map(p => `
    <div class="glass-card">
      <div class="player-card-image-wrap">
        <span class="player-nation-badge"><i class="fas fa-flag"></i> ${p.nation}</span>
        <img src="${p.image}" alt="${p.name}">
      </div>
      <h3 class="card-title-layout">${p.name}</h3>
      <div class="card-stat-row"><i class="fas fa-bullseye"></i> <span>Metrics: ${p.goals} Career Goals</span></div>
      <div class="card-stat-row"><i class="fas fa-medal"></i> <small>${p.achievements}</small></div>
      <div class="rank-bar" style="margin-top:15px;"><div class="rank-fill" style="width:90%"></div></div>
    </div>
  `).join('');
}

function buildNews() {
  const cont = document.getElementById('newsGrid');
  if (!cont) return;
  cont.innerHTML = newsItems.map(n => `
    <div class="glass-card">
      <h3 class="card-title-layout"><i class="fas fa-fire" style="color:var(--neon-blue); margin-right:8px;"></i>${n.title}</h3>
      <span style="color:var(--neon-green); font-weight:700; font-size:0.85rem; letter-spacing:1px; text-transform:uppercase; margin:8px 0; display:block;">
        <i class="fas fa-tags"></i> ${n.category}
      </span>
      <p style="font-size:0.95rem; opacity:0.8; line-height:1.5; margin-bottom:15px;">${n.desc}</p>
      <button class="glow-btn" style="padding:8px 20px; font-size:0.85rem;">READ ARTIFACT</button>
    </div>
  `).join('');
}

function buildGallery() {
  const cont = document.getElementById('galleryMasonry');
  if (cont) cont.innerHTML = galleryImages.map(img => `<div class="gallery-img" onclick="openLightbox('${img}')"><img src="${img}" alt="Football snapshot"></div>`).join('');
}

function buildRankings() {
  const cont = document.getElementById('rankingsList');
  if (!cont) return;
  cont.innerHTML = rankingsData.map((r, idx) => `
    <div class="rank-item glass-card" style="padding: 15px; margin:12px 0; flex-direction:row; justify-content:space-between; align-items:center;">
      <span style="font-weight:700;"><i class="fas fa-hashtag" style="color:var(--neon-blue); font-size:0.8rem;"></i> ${idx+1} &nbsp;${r.country}</span>
      <span class="countNum" data-target="${r.points}" style="font-family:monospace; font-weight:700; color:var(--neon-green)">0</span>
      <div class="rank-bar"><div class="rank-fill" data-progress="${r.progress}" style="width:0%"></div></div>
    </div>
  `).join('');
  
  document.querySelectorAll('.countNum').forEach(span => {
    let target = parseInt(span.dataset.target);
    let current = 0;
    let increment = Math.ceil(target / 40);
    let upd = setInterval(() => {
      current += increment;
      if (current >= target) {
        span.innerText = target;
        clearInterval(upd);
      } else {
        span.innerText = current;
      }
    }, 20);
  });
  
  setTimeout(() => {
    document.querySelectorAll('.rank-fill[data-progress]').forEach(bar => {
      bar.style.width = bar.dataset.progress + '%';
    });
  }, 200);
}

function buildFanComments() {
  const cont = document.getElementById('fanComments');
  if (cont) cont.innerHTML = fans.map(f => `
    <div class="glass-card">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
        <i class="fas ${f.icon} fa-2x" style="color:var(--neon-blue)"></i> 
        <strong>${f.name}</strong>
      </div>
      <p style="font-style:italic; opacity:0.9; font-size:0.95rem; margin-bottom:15px;">"${f.comment}"</p>
      <div style="font-size:0.85rem; color:var(--neon-green)"><i class="fas fa-heart"></i> VERIFIED FAN</div>
    </div>
  `).join('');
}

// Scoreboard Match Clock Configuration
let matchTime = 2700;
let matchInterval;
function updateMatchTimer() {
  const timerDiv = document.getElementById('matchTimer');
  if (!timerDiv) return;
  if (matchTime <= 0) { clearInterval(matchInterval); timerDiv.innerText = "FULL TIME"; return; }
  let minutes = Math.floor(matchTime / 60);
  let seconds = matchTime % 60;
  timerDiv.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  matchTime--;
}

document.getElementById('simulateGoalBtn')?.addEventListener('click', () => {
  let scoreA = parseInt(document.getElementById('scoreA').innerText);
  let scoreB = parseInt(document.getElementById('scoreB').innerText);
  if (Math.random() > 0.5) {
    document.getElementById('scoreA').innerText = scoreA + 1;
  } else {
    document.getElementById('scoreB').innerText = scoreB + 1;
  }
  if (audioEnabled) playStadiumSound();
  
  const effectDiv = document.createElement('div');
  effectDiv.innerHTML = '<i class="fas fa-futbol"></i> GOAL GOAL GOAL!';
  effectDiv.style.cssText = 'position:fixed; bottom:50%; left:50%; transform:translate(-50%,50%); color:var(--neon-green); font-size:2.5rem; font-weight:800; z-index:5000; text-shadow:0 0 20px #000; background:rgba(0,0,0,0.8); padding:15px 30px; border-radius:20px; border:2px solid var(--neon-blue);';
  document.body.appendChild(effectDiv);
  setTimeout(() => effectDiv.remove(), 1000);
});

function createFloatingBalls() {
  for (let i = 0; i < 8; i++) {
    let ball = document.createElement('div');
    ball.classList.add('floating-football');
    ball.innerHTML = '<i class="fas fa-futbol"></i>';
    ball.style.left = Math.random() * 100 + '%';
    ball.style.bottom = '-50px';
    ball.style.animationDuration = 12 + Math.random() * 12 + 's';
    ball.style.animationDelay = Math.random() * 6 + 's';
    ball.style.fontSize = 1 + Math.random() * 1.5 + 'rem';
    document.body.appendChild(ball);
  }
}

window.openLightbox = (src) => {
  let overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:9000; display:flex; align-items:center; justify-content:center;';
  let img = document.createElement('img');
  img.src = src;
  img.style.cssText = 'max-width:90%; max-height:85%; border-radius:16px; border:2px solid var(--neon-green); box-shadow:0 0 30px rgba(10,255,157,0.3);';
  overlay.onclick = () => overlay.remove();
  overlay.appendChild(img);
  document.body.appendChild(overlay);
};

document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--x', e.clientX + 'px');
  document.body.style.setProperty('--y', e.clientY + 'px');
});

// Player local isolated filtering hook
document.getElementById('playerLocalSearchInput')?.addEventListener('input', (e) => {
  const localQuery = e.target.value.toLowerCase().trim();
  buildPlayers(localQuery);
});

// Mobile Responsive Drawer Controller
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  if(navLinks.classList.contains('active')) {
    icon.className = 'fas fa-times';
  } else {
    icon.className = 'fas fa-bars';
  }
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    if(menuToggle) menuToggle.querySelector('i').className = 'fas fa-bars';
  });
});

// Light/Dark System Theme Matrix Hook
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  const htmlRoot = document.documentElement;
  const currentTheme = htmlRoot.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlRoot.setAttribute('data-theme', nextTheme);
  
  const icon = themeToggle.querySelector('i');
  icon.className = nextTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// Background Ambient Animation Pipeline
const canvas = document.getElementById('particle-canvas');
const ctx = canvas?.getContext('2d');
let particles = [];
function resizeCanvas() { if(canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } }
window.addEventListener('resize', resizeCanvas);

function initParticles() {
  resizeCanvas();
  particles = [];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.15
    });
  }
  animateParticles();
}

function animateParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const colorStr = currentTheme === 'dark' ? '10, 255, 157' : '0, 114, 255';
  
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${colorStr}, ${p.alpha})`;
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(animateParticles);
}

// Orchestrator initialization block
function initAll() {
  buildWorldcup();
  buildPlayers();
  buildNews();
  buildGallery();
  buildRankings();
  buildFanComments();
  
  matchInterval = setInterval(updateMatchTimer, 1000);
  createFloatingBalls();
  initParticles();

  document.getElementById('exploreBtn')?.addEventListener('click', () => {
    document.getElementById('worldcup')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('watchTrailer')?.addEventListener('click', () => {
    alert("Displaying High Intensity Manga Feature Matches Trailer Presentation.");
  });
  document.getElementById('subscribeBtn')?.addEventListener('click', () => {
    let mail = document.getElementById('newsEmail').value;
    if (mail) alert(`Registration Sequence Complete: Welcome to Legacy FC.`);
    else alert('Processing Error: Input accurate syntax email values.');
  });
}