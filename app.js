/* ======================================================
   PATTISPY – Music Player App JavaScript
   Full Spotify-like functionality
====================================================== */

// ─── Song Data ───────────────────────────────────────
const SONGS = [
  {
    id: 0,
    title: "TVK Campaign Song",
    artist: "Vijay · TVK",
    album: "TVK 2025",
    year: "2025",
    genre: "Tamil Political",
    src: "https://res.cloudinary.com/dgeepzbu9/video/upload/q_auto/f_auto/v1779538239/Tvk_Campaign_Song_tcd6iz.mp3",
    img: "img/tvk_campaign_song.png",
    color: "#1a3a5c",
    accent: "#4a8fcc"
  },
  {
    id: 1,
    title: "Pavazha Malli",
    artist: "Tamil Hits · 2024",
    album: "Romantic Tamil",
    year: "2024",
    genre: "Tamil Romance",
    src: "https://res.cloudinary.com/dgeepzbu9/video/upload/q_auto/f_auto/v1779538127/Pavazha_Malli_vhua8z.mp3",
    img: "img/pavazha_malli.png",
    color: "#3d1a2a",
    accent: "#cc4488"
  },
  {
    id: 2,
    title: "Loveah Sollitalea",
    artist: "Romantic Tamil · 2024",
    album: "Love Songs Tamil",
    year: "2024",
    genre: "Tamil Love",
    src: "https://res.cloudinary.com/dgeepzbu9/video/upload/q_auto/f_auto/v1779538004/Loveah_Sollitalea_ua1wrf.mp3",
    img: "img/loveah_sollitalea.png",
    color: "#2a1a3d",
    accent: "#8844cc"
  },
  {
    id: 3,
    title: "Mutta Kalakki",
    artist: "Unplugged · 2024",
    album: "Unplugged Sessions",
    year: "2024",
    genre: "Tamil Acoustic",
    src: "https://res.cloudinary.com/dgeepzbu9/video/upload/q_auto/f_auto/v1779537703/Mutta_Kalakki_Unplugged_Version_umrshs.mp3",
    img: "img/mutta_kalakki.png",
    color: "#2a1e0e",
    accent: "#cc8844"
  }
];

// ─── State ───────────────────────────────────────────
let state = {
  currentIndex: 0,
  isPlaying: false,
  isShuffle: false,
  repeatMode: 0,     // 0 = off, 1 = all, 2 = one
  volume: 0.7,
  isMuted: false,
  likedSongs: new Set(),
  shuffleOrder: [],
  isDraggingProgress: false,
  isDraggingVolume: false,
};

// ─── DOM References ───────────────────────────────────
const audio          = document.getElementById('audio-player');
const btnPlay        = document.getElementById('btn-play');
const playIcon       = document.getElementById('play-icon');
const pauseIcon      = document.getElementById('pause-icon');
const btnPrev        = document.getElementById('btn-prev');
const btnNext        = document.getElementById('btn-next');
const btnShuffle     = document.getElementById('btn-shuffle');
const btnRepeat      = document.getElementById('btn-repeat');
const btnMute        = document.getElementById('btn-mute');
const volIcon        = document.getElementById('vol-icon');
const muteIcon       = document.getElementById('mute-icon');
const progressBar    = document.getElementById('progress-bar');
const progressFill   = document.getElementById('progress-fill');
const progressThumb  = document.getElementById('progress-thumb');
const currentTimeEl  = document.getElementById('current-time');
const totalTimeEl    = document.getElementById('total-time');
const volumeBar      = document.getElementById('volume-bar');
const volumeFill     = document.getElementById('volume-fill');
const volumeThumb    = document.getElementById('volume-thumb');
const playerArt      = document.getElementById('player-art');
const playerName     = document.getElementById('player-track-name');
const playerArtist   = document.getElementById('player-track-artist');
const playerLikeBtn  = document.getElementById('player-like-btn');
const tracklist      = document.getElementById('tracklist');
const cardsGrid      = document.getElementById('cards-grid');
const heroImg        = document.getElementById('hero-img');
const heroTitle      = document.getElementById('hero-title');
const heroDesc       = document.getElementById('hero-desc');
const heroBg         = document.getElementById('hero-bg');
const heroGlow       = document.getElementById('hero-glow');
const btnPlayHero    = document.getElementById('btn-play-hero');
const btnShuffleHero = document.getElementById('btn-shuffle-hero');
const btnHeartHero   = document.getElementById('btn-heart-hero');
const btnQueue       = document.getElementById('btn-queue');
const queuePanel     = document.getElementById('queue-panel');
const queueClose     = document.getElementById('queue-close');
const queueNowItem   = document.getElementById('queue-now-item');
const queueNextItems = document.getElementById('queue-next-items');
const searchInput    = document.getElementById('search-input');
const searchOverlay  = document.getElementById('search-overlay');
const searchResults  = document.getElementById('search-results');
const navItems       = document.querySelectorAll('.nav-item');
const sidebarItems   = document.querySelectorAll('.playlist-item');

// ─── Init ─────────────────────────────────────────────
function init() {
  renderTracklist();
  renderCards();
  loadSong(state.currentIndex, false);
  audio.volume = state.volume;
  setVolumeUI(state.volume);
  bindEvents();
  generateShuffleOrder();
}

// ─── Render Tracklist ─────────────────────────────────
function renderTracklist() {
  tracklist.innerHTML = '';
  SONGS.forEach((song, i) => {
    const row = document.createElement('div');
    row.className = 'track-row' + (i === state.currentIndex ? ' playing' : '');
    row.dataset.index = i;
    row.innerHTML = `
      <div class="track-num">
        <span class="track-num-text">${i + 1}</span>
        <span class="track-play-icon">
          ${i === state.currentIndex && state.isPlaying
            ? `<span class="eq-bars"><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span></span>`
            : `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z"/></svg>`}
        </span>
      </div>
      <div class="track-title-wrap">
        <img src="${song.img}" alt="${song.title}" class="track-thumb" />
        <div class="track-info">
          <div class="track-name">${song.title}</div>
          <div class="track-artist">${song.artist}</div>
        </div>
      </div>
      <div class="track-album">${song.album}</div>
      <div class="track-duration" id="track-dur-${i}">--:--</div>
    `;
    row.addEventListener('click', () => playSongAt(i));
    tracklist.appendChild(row);
    loadDuration(song.src, i);
  });
}

function loadDuration(src, index) {
  const tempAudio = new Audio();
  tempAudio.preload = 'metadata';
  tempAudio.src = src;
  tempAudio.addEventListener('loadedmetadata', () => {
    const el = document.getElementById(`track-dur-${index}`);
    if (el) el.textContent = formatTime(tempAudio.duration);
  });
}

// ─── Render Cards ─────────────────────────────────────
function renderCards() {
  cardsGrid.innerHTML = '';
  SONGS.forEach((song, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-art-wrap">
        <img src="${song.img}" alt="${song.title}" class="card-art" />
        <button class="card-play-btn" title="Play">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
      <div class="card-name">${song.title}</div>
      <div class="card-artist">${song.artist}</div>
    `;
    card.addEventListener('click', () => playSongAt(i));
    card.querySelector('.card-play-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      playSongAt(i);
    });
    cardsGrid.appendChild(card);
  });
}

// ─── Load Song ────────────────────────────────────────
function loadSong(index, autoPlay = true) {
  const song = SONGS[index];
  state.currentIndex = index;

  audio.src = song.src;
  audio.load();

  // Player bar
  playerArt.src = song.img;
  playerName.textContent = song.title;
  playerArtist.textContent = song.artist;

  // Hero section
  heroImg.src = song.img;
  heroTitle.textContent = song.title;
  heroDesc.textContent = `${song.title} · ${song.artist} · ${song.year} · ${song.genre}`;

  // Hero background gradient
  heroBg.style.background = `linear-gradient(135deg, ${song.color}CC 0%, ${song.color}88 40%, var(--bg-elevated) 100%)`;
  heroGlow.style.background = song.accent;

  // Update like button
  updateLikeButton();

  // Update tracklist highlights
  document.querySelectorAll('.track-row').forEach((row, i) => {
    row.classList.toggle('playing', i === index);
    const playIconEl = row.querySelector('.track-play-icon');
    if (playIconEl) {
      if (i === index) {
        playIconEl.innerHTML = `<span class="eq-bars ${autoPlay ? '' : 'paused'}">
          <span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span>
        </span>`;
      } else {
        playIconEl.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z"/></svg>`;
      }
    }
  });

  // Sidebar playlist highlight
  sidebarItems.forEach((item, i) => {
    item.style.background = i === index ? 'rgba(29,185,84,0.1)' : '';
  });

  // Queue panel
  updateQueue();

  if (autoPlay) {
    playAudio();
  } else {
    state.isPlaying = false;
    setPlayUI(false);
  }
}

// ─── Play / Pause ─────────────────────────────────────
function playAudio() {
  audio.play().then(() => {
    state.isPlaying = true;
    setPlayUI(true);
    updateEqBars(true);
  }).catch(err => {
    console.warn('Playback error:', err);
  });
}

function pauseAudio() {
  audio.pause();
  state.isPlaying = false;
  setPlayUI(false);
  updateEqBars(false);
}

function togglePlay() {
  if (state.isPlaying) pauseAudio();
  else playAudio();
}

function setPlayUI(playing) {
  playIcon.style.display = playing ? 'none' : 'block';
  pauseIcon.style.display = playing ? 'block' : 'none';
  playerArt.style.borderRadius = playing ? '50%' : '4px';
  playerArt.style.animation = playing ? 'spin-slow 8s linear infinite' : 'none';
}

function updateEqBars(playing) {
  document.querySelectorAll('.track-row.playing .eq-bars').forEach(bars => {
    bars.classList.toggle('paused', !playing);
  });
}

// ─── Navigation ───────────────────────────────────────
function playNext() {
  if (state.repeatMode === 2) {
    audio.currentTime = 0;
    playAudio();
    return;
  }
  let next;
  if (state.isShuffle) {
    const currentPos = state.shuffleOrder.indexOf(state.currentIndex);
    const nextPos = (currentPos + 1) % state.shuffleOrder.length;
    next = state.shuffleOrder[nextPos];
  } else {
    next = (state.currentIndex + 1) % SONGS.length;
  }
  playSongAt(next);
}

function playPrev() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  let prev;
  if (state.isShuffle) {
    const currentPos = state.shuffleOrder.indexOf(state.currentIndex);
    const prevPos = (currentPos - 1 + state.shuffleOrder.length) % state.shuffleOrder.length;
    prev = state.shuffleOrder[prevPos];
  } else {
    prev = (state.currentIndex - 1 + SONGS.length) % SONGS.length;
  }
  playSongAt(prev);
}

function playSongAt(index) {
  loadSong(index, true);
}

function generateShuffleOrder() {
  state.shuffleOrder = [...Array(SONGS.length).keys()];
  for (let i = state.shuffleOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.shuffleOrder[i], state.shuffleOrder[j]] = [state.shuffleOrder[j], state.shuffleOrder[i]];
  }
}

// ─── Shuffle ──────────────────────────────────────────
function toggleShuffle() {
  state.isShuffle = !state.isShuffle;
  btnShuffle.classList.toggle('active', state.isShuffle);
  btnShuffleHero.style.color = state.isShuffle ? 'var(--accent)' : '';
  if (state.isShuffle) generateShuffleOrder();
  showToast(state.isShuffle ? '🔀 Shuffle on' : 'Shuffle off');
}

// ─── Repeat ───────────────────────────────────────────
function toggleRepeat() {
  state.repeatMode = (state.repeatMode + 1) % 3;
  const modes = ['off', 'all', 'one'];
  btnRepeat.classList.toggle('active', state.repeatMode > 0);
  showToast(
    state.repeatMode === 0 ? 'Repeat off'
    : state.repeatMode === 1 ? '🔁 Repeat all'
    : '🔂 Repeat one'
  );
}

// ─── Progress Bar ─────────────────────────────────────
audio.addEventListener('timeupdate', () => {
  if (state.isDraggingProgress) return;
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + '%';
  progressThumb.style.left = pct + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  if (state.repeatMode === 2) {
    audio.currentTime = 0;
    playAudio();
  } else if (state.repeatMode === 1 || state.currentIndex < SONGS.length - 1 || state.isShuffle) {
    playNext();
  } else {
    state.isPlaying = false;
    setPlayUI(false);
    updateEqBars(false);
  }
});

function seekTo(e) {
  const rect = progressBar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audio.currentTime = pct * audio.duration;
  progressFill.style.width = (pct * 100) + '%';
  progressThumb.style.left = (pct * 100) + '%';
}

progressBar.addEventListener('mousedown', (e) => {
  state.isDraggingProgress = true;
  seekTo(e);
});

document.addEventListener('mousemove', (e) => {
  if (state.isDraggingProgress) seekTo(e);
  if (state.isDraggingVolume) setVolumeFromEvent(e);
});

document.addEventListener('mouseup', () => {
  state.isDraggingProgress = false;
  state.isDraggingVolume = false;
});

// ─── Volume ───────────────────────────────────────────
function setVolumeUI(vol) {
  const pct = vol * 100;
  volumeFill.style.width = pct + '%';
  volumeThumb.style.left = pct + '%';
}

function setVolumeFromEvent(e) {
  const rect = volumeBar.getBoundingClientRect();
  const vol = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  state.volume = vol;
  audio.volume = vol;
  state.isMuted = vol === 0;
  setVolumeUI(vol);
  updateMuteIcon();
}

volumeBar.addEventListener('mousedown', (e) => {
  state.isDraggingVolume = true;
  setVolumeFromEvent(e);
});

volumeBar.addEventListener('click', setVolumeFromEvent);

function toggleMute() {
  if (state.isMuted) {
    state.isMuted = false;
    audio.volume = state.volume || 0.5;
    setVolumeUI(audio.volume);
  } else {
    state.isMuted = true;
    audio.volume = 0;
    setVolumeUI(0);
  }
  updateMuteIcon();
}

function updateMuteIcon() {
  volIcon.style.display = state.isMuted || audio.volume === 0 ? 'none' : 'block';
  muteIcon.style.display = state.isMuted || audio.volume === 0 ? 'block' : 'none';
}

// ─── Like / Heart ─────────────────────────────────────
function toggleLike(index) {
  if (state.likedSongs.has(index)) {
    state.likedSongs.delete(index);
    showToast('Removed from Liked Songs');
  } else {
    state.likedSongs.add(index);
    showToast('❤️ Added to Liked Songs');
  }
  updateLikeButton();
  playerLikeBtn.classList.add('heart-pop');
  setTimeout(() => playerLikeBtn.classList.remove('heart-pop'), 300);
}

function updateLikeButton() {
  const liked = state.likedSongs.has(state.currentIndex);
  playerLikeBtn.classList.toggle('liked', liked);
  btnHeartHero.classList.toggle('liked', liked);
}

// ─── Queue Panel ──────────────────────────────────────
function updateQueue() {
  const current = SONGS[state.currentIndex];
  queueNowItem.innerHTML = `
    <img src="${current.img}" alt="${current.title}" />
    <div class="queue-item-info">
      <div class="queue-item-name">${current.title}</div>
      <div class="queue-item-artist">${current.artist}</div>
    </div>
  `;

  queueNextItems.innerHTML = '';
  SONGS.forEach((song, i) => {
    if (i === state.currentIndex) return;
    const item = document.createElement('div');
    item.className = 'queue-item';
    item.innerHTML = `
      <img src="${song.img}" alt="${song.title}" />
      <div class="queue-item-info">
        <div class="queue-item-name">${song.title}</div>
        <div class="queue-item-artist">${song.artist}</div>
      </div>
    `;
    item.addEventListener('click', () => playSongAt(i));
    queueNextItems.appendChild(item);
  });
}

// ─── Search ───────────────────────────────────────────
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  if (!q) {
    searchOverlay.style.display = 'none';
    return;
  }
  searchOverlay.style.display = 'block';
  const matches = SONGS.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.artist.toLowerCase().includes(q) ||
    s.genre.toLowerCase().includes(q)
  );
  if (matches.length === 0) {
    searchResults.innerHTML = '<p style="color:var(--text-secondary);padding:12px">No results found.</p>';
    return;
  }
  searchResults.innerHTML = matches.map(s => `
    <div class="search-result-item" data-id="${s.id}">
      <img src="${s.img}" alt="${s.title}" />
      <div>
        <div class="search-result-name">${s.title}</div>
        <div class="search-result-artist">${s.artist}</div>
      </div>
    </div>
  `).join('');
  searchResults.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () => {
      playSongAt(parseInt(item.dataset.id));
      searchInput.value = '';
      searchOverlay.style.display = 'none';
    });
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.topbar-search') && !e.target.closest('.search-overlay')) {
    searchOverlay.style.display = 'none';
  }
});

// ─── Toast Notification ───────────────────────────────
let toastTimeout;
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── Format Time ──────────────────────────────────────
function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ─── Keyboard Shortcuts ───────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  switch (e.code) {
    case 'Space':
      e.preventDefault();
      togglePlay();
      break;
    case 'ArrowRight':
      audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
      break;
    case 'ArrowLeft':
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
      break;
    case 'ArrowUp':
      state.volume = Math.min(1, state.volume + 0.1);
      audio.volume = state.volume;
      setVolumeUI(state.volume);
      break;
    case 'ArrowDown':
      state.volume = Math.max(0, state.volume - 0.1);
      audio.volume = state.volume;
      setVolumeUI(state.volume);
      break;
    case 'KeyN':
      playNext();
      break;
    case 'KeyP':
      playPrev();
      break;
    case 'KeyS':
      toggleShuffle();
      break;
    case 'KeyR':
      toggleRepeat();
      break;
    case 'KeyM':
      toggleMute();
      break;
  }
});

// ─── Bind All Events ──────────────────────────────────
function bindEvents() {
  btnPlay.addEventListener('click', togglePlay);
  btnPrev.addEventListener('click', playPrev);
  btnNext.addEventListener('click', playNext);
  btnShuffle.addEventListener('click', toggleShuffle);
  btnRepeat.addEventListener('click', toggleRepeat);
  btnMute.addEventListener('click', toggleMute);
  playerLikeBtn.addEventListener('click', () => toggleLike(state.currentIndex));
  btnHeartHero.addEventListener('click', () => toggleLike(state.currentIndex));

  btnPlayHero.addEventListener('click', () => {
    if (state.isPlaying) pauseAudio();
    else playAudio();
  });

  btnShuffleHero.addEventListener('click', toggleShuffle);

  // Queue
  btnQueue.addEventListener('click', () => {
    queuePanel.classList.toggle('open');
    updateQueue();
  });
  queueClose.addEventListener('click', () => queuePanel.classList.remove('open'));

  // Sidebar playlist items
  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(item.dataset.playlist);
      playSongAt(idx);
    });
  });

  // Nav items
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Hero play button sync
  audio.addEventListener('play', () => {
    btnPlayHero.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      Pause
    `;
  });

  audio.addEventListener('pause', () => {
    btnPlayHero.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
      Play
    `;
  });

  // Main content scroll → topbar blur intensity
  document.getElementById('main-content').addEventListener('scroll', function() {
    const topbar = document.querySelector('.topbar');
    if (this.scrollTop > 20) {
      topbar.style.background = 'rgba(10,10,10,0.95)';
    } else {
      topbar.style.background = 'rgba(18,18,18,0.85)';
    }
  });
}

// ─── Start ────────────────────────────────────────────
init();
