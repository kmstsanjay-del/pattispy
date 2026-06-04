/* ======================================================
   PATTISPY – Ultimate Spotify Client-Side Replica
   Complete State, Playlist & Synced Lyrics Engine (Adaptive Mobile)
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
    accent: "#4a8fcc",
    lyrics: [
      { time: 0, text: "🎵 [Instrumental Prelude] 🎵" },
      { time: 5, text: "Tamilaga Vettri Kazhagam Kodi Parakkum!" },
      { time: 10, text: "Makkal Konda Kondaattam, Puthu Sarithiram Pirakkum." },
      { time: 16, text: "Vetri Kadi Katti, Thuninthu Ezhuvom Nee!" },
      { time: 22, text: "Nenjil Konda Anbinal Urimai Kaapom Va!" },
      { time: 28, text: "Uzhaitthidum Karangalgal Kaipidithae Selvom." },
      { time: 33, text: "Thalaivanin Kural Kettu Aniyaayatthai Velvom!" },
      { time: 38, text: "Tamilaga Vettri Kazhagam Kodi Parakkum!" },
      { time: 44, text: "🎵 [Ending Solo Guitar] 🎵" }
    ]
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
    accent: "#cc4488",
    lyrics: [
      { time: 0, text: "🌸 [Soft Piano Prelude] 🌸" },
      { time: 7, text: "Pavazha Malli Poove, Vizhiyil Puthu Kolam." },
      { time: 13, text: "Pakkathil Vanthu Konjum Konjalgalin Ragam." },
      { time: 19, text: "En Thozhai Thazhuvi Ennai Aala Vanthaaye." },
      { time: 25, text: "Kaatrodu Sollum Oru Kaadhal Kadhai Neeye." },
      { time: 31, text: "Kannaadi Valayaloasai Nenjai Thottu Ezhuthuthae." },
      { time: 37, text: "Un Paadha Viral Thadam En Jeevan Varai Paaduthae." },
      { time: 43, text: "🌸 [Soft Piano Instrumental Outro] 🌸" }
    ]
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
    accent: "#8844cc",
    lyrics: [
      { time: 0, text: "🎸 [Vibrant Strumming Intro] 🎸" },
      { time: 6, text: "Love-ah Sollittaalae, Enna Pathu Sirichuttalae!" },
      { time: 11, text: "Nenjil Vanthu Ninnalae, Aasaigalai Thanthalae." },
      { time: 17, text: "Mazhai Polae Varum Avalin Punnagaiyil Vizhunthen." },
      { time: 23, text: "Kaatrae Kaatrae Aval Solla Ketta Varthaiyil Enaindhen." },
      { time: 29, text: "Theruvoaram Aval Sellum Pothu En Nenjam Thudikuthadi." },
      { time: 35, text: "Iravellaam Kanavil Vanthu Konji Vilayaaduthadi!" },
      { time: 41, text: "⚡ [High Energy Electric Guitar Outro] ⚡" }
    ]
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
    accent: "#cc8844",
    lyrics: [
      { time: 0, text: "🕯️ [Cosy Acoustic Guitar Intro] 🕯️" },
      { time: 8, text: "Mutta Kalakki Poattu, Oru Tea-um Kudichenadi." },
      { time: 14, text: "Un Unplugged Paadalkalil En Uyirai Karaithenadi." },
      { time: 20, text: "Acoustic Inbam Ellam Nenjukkul Thangiyathey." },
      { time: 26, text: "Kaalai Maalai En Thuyillil Un Kural Kaetkuthay." },
      { time: 32, text: "Verum Kaalodu Selvom, Intha Isaiyil Midhapoam." },
      { time: 38, text: "Kalakki kalakki mutta kalakki paadum poove." },
      { time: 44, text: "🕯️ [Gentle Acoustic Outro Fade-out] 🕯️" }
    ]
  }
];

// ─── State ───────────────────────────────────────────
let state = {
  currentIndex: 0,
  isPlaying: false,
  isShuffle: false,
  repeatMode: 0,         // 0 = off, 1 = all, 2 = one
  volume: 0.7,
  isMuted: false,
  likedSongs: new Set(),
  shuffleOrder: [],
  isDraggingProgress: false,
  isDraggingVolume: false,
  
  // Custom Playlists & Views
  playlists: [],         // Array of { id, name, songs: [ids] }
  activeView: 'home',    // 'home', 'search', 'liked', 'playlist', 'library' (mobile)
  currentContext: 'all', // 'all', 'liked', or playlist ID
  
  user: {
    isLoggedIn: false,
    username: '',
    avatar: '🔥'
  }
};

// ─── DOM References ───────────────────────────────────
const audio             = document.getElementById('audio-player');
const btnPlay           = document.getElementById('btn-play');
const playIcon          = document.getElementById('play-icon');
const pauseIcon         = document.getElementById('pause-icon');
const btnPrev           = document.getElementById('btn-prev');
const btnNext           = document.getElementById('btn-next');
const btnShuffle        = document.getElementById('btn-shuffle');
const btnRepeat         = document.getElementById('btn-repeat');
const btnMute           = document.getElementById('btn-mute');
const volIcon           = document.getElementById('vol-icon');
const muteIcon          = document.getElementById('mute-icon');
const progressBar       = document.getElementById('progress-bar');
const progressFill      = document.getElementById('progress-fill');
const progressThumb     = document.getElementById('progress-thumb');
const currentTimeEl     = document.getElementById('current-time');
const totalTimeEl       = document.getElementById('total-time');
const volumeBar         = document.getElementById('volume-bar');
const volumeFill        = document.getElementById('volume-fill');
const volumeThumb       = document.getElementById('volume-thumb');
const playerArt         = document.getElementById('player-art');
const playerName        = document.getElementById('player-track-name');
const playerArtist      = document.getElementById('player-track-artist');
const playerLikeBtn     = document.getElementById('player-like-btn');
const btnQueue          = document.getElementById('btn-queue');
const queuePanel        = document.getElementById('queue-panel');
const queueClose        = document.getElementById('queue-close');
const queueNowItem      = document.getElementById('queue-now-item');
const queueNextItems    = document.getElementById('queue-next-items');

// Auth elements
const loginOverlay      = document.getElementById('login-overlay');
const topbarUserMenu    = document.getElementById('topbar-user-menu');
const userDropdown      = document.getElementById('user-dropdown');
const userNameDisplay   = document.getElementById('user-name-display');
const userAvatarEl      = document.getElementById('user-avatar');
const dropdownUserid    = document.getElementById('dropdown-userid');
const btnLogout         = document.getElementById('btn-logout');

// Form switch tabs
const authTabLogin      = document.getElementById('tab-login');
const authTabRegister   = document.getElementById('tab-register');
const formLogin         = document.getElementById('form-login');
const formRegister      = document.getElementById('form-register');
const authErrorMsg      = document.getElementById('auth-error-msg');

// Forms fields
const loginUseridInput   = document.getElementById('login-userid');
const loginPasswordInput = document.getElementById('login-password');
const registerUseridInput = document.getElementById('register-userid');
const registerPasswordInput = document.getElementById('register-password');
const avatarOptions     = document.querySelectorAll('.avatar-opt');

// Sidebar views & actions
const navHome           = document.getElementById('nav-home');
const navSearch         = document.getElementById('nav-search');
const btnCreatePlaylist = document.getElementById('btn-create-playlist');
const btnLikedSongsView = document.getElementById('btn-liked-songs-view');
const sidebarPlaylistsList = document.getElementById('sidebar-playlists-list');

// Mobile Bottom Nav elements
const mobNavHome        = document.getElementById('mobile-nav-home');
const mobNavSearch      = document.getElementById('mobile-nav-search');
const mobNavLibrary     = document.getElementById('mobile-nav-library');

// Main Views panels
const viewHome          = document.getElementById('view-home');
const viewSearch        = document.getElementById('view-search');
const viewPlaylist      = document.getElementById('view-playlist');
const viewLibrary       = document.getElementById('view-library'); // Mobile
const topbarSearchBar   = document.getElementById('topbar-search-bar');
const searchInput       = document.getElementById('search-input');
const sidebarLogoHome   = document.getElementById('sidebar-logo-home');

// Grid dynamic content
const greetingTitle     = document.getElementById('greeting-title');
const greetingGrid      = document.getElementById('greeting-grid');
const homePicksGrid     = document.getElementById('home-picks-grid');
const homeRecentGrid    = document.getElementById('home-recent-grid');

// Search Tab views
const searchInitialView = document.getElementById('search-initial-view');
const searchResultsView = document.getElementById('search-results-view');
const searchTracklist   = document.getElementById('search-tracklist');

// Playlist Tab views
const playlistHero       = document.getElementById('playlist-hero');
const playlistHeroBg     = document.getElementById('playlist-hero-bg');
const playlistHeroImg    = document.getElementById('playlist-hero-img');
const playlistHeroTitle  = document.getElementById('playlist-hero-title');
const playlistHeroDesc   = document.getElementById('playlist-hero-desc');
const playlistHeroMeta   = document.getElementById('playlist-hero-meta');
const btnPlayPlaylist    = document.getElementById('btn-play-playlist');
const btnRenamePlaylist  = document.getElementById('btn-rename-playlist');
const btnDeletePlaylist  = document.getElementById('btn-delete-playlist');
const playlistTracklist  = document.getElementById('playlist-tracklist');

// Context Menu dropdown
const contextMenu        = document.getElementById('context-menu');
const contextBtnLike     = document.getElementById('context-btn-like');
const contextPlaylistsSub = document.getElementById('context-playlists-submenu');

// Lyrics slide-in elements
const btnLyrics         = document.getElementById('btn-lyrics');
const lyricsPanel       = document.getElementById('lyrics-panel');
const lyricsClose       = document.getElementById('lyrics-close');
const lyricsScrollBody  = document.getElementById('lyrics-scroll-body');

// Mobile Fullscreen Player UI References
const mobPlayerFullscreen = document.getElementById('mobile-player-fullscreen');
const mobPlayerClose      = document.getElementById('mobile-player-close');
const mobPlayerBgGlow     = document.getElementById('mobile-player-bg-glow');
const mobPlayerArt        = document.getElementById('mobile-player-art');
const mobPlayerTitle      = document.getElementById('mobile-player-title');
const mobPlayerArtist     = document.getElementById('mobile-player-artist');
const mobPlayerLikeBtn    = document.getElementById('mobile-player-like-btn');
const mobProgressBar      = document.getElementById('mobile-progress-bar');
const mobProgressFill     = document.getElementById('mobile-progress-fill');
const mobProgressThumb    = document.getElementById('mobile-progress-thumb');
const mobCurrentTime      = document.getElementById('mobile-current-time');
const mobTotalTime        = document.getElementById('mobile-total-time');
const mobBtnShuffle       = document.getElementById('mobile-btn-shuffle');
const mobBtnPrev          = document.getElementById('mobile-btn-prev');
const mobBtnPlay          = document.getElementById('mobile-btn-play');
const mobBtnNext          = document.getElementById('mobile-btn-next');
const mobBtnRepeat        = document.getElementById('mobile-btn-repeat');
const mobPlayIcon         = document.getElementById('mobile-play-icon');
const mobPauseIcon        = document.getElementById('mobile-pause-icon');
const mobLyricsBtn        = document.getElementById('mobile-player-lyrics-btn');
const mobLyricsPreview    = document.getElementById('mobile-lyrics-preview');

// Mobile Library elements
const mobCreatePlaylistBtn = document.getElementById('mobile-create-playlist-btn');
const mobLikedSongsBtn     = document.getElementById('mobile-liked-songs-btn');
const mobPlaylistsList     = document.getElementById('mobile-playlists-list');

let activeContextTrackIndex = null;
let isDraggingMobileProgress = false;



// ─── Auth Logic ───────────────────────────────────────
function checkAuth() {
  const session = localStorage.getItem('pattispy_session');
  if (session) {
    try {
      const userData = JSON.parse(session);
      state.user = {
        isLoggedIn: true,
        username: userData.username,
        avatar: userData.avatar || '🔥'
      };
      applyProfileUI();
      loginOverlay.classList.add('hidden');
    } catch (e) {
      console.error(e);
      showLoginScreen();
    }
  } else {
    showLoginScreen();
  }
}

function showLoginScreen() {
  state.user = { isLoggedIn: false, username: '', avatar: '🔥' };
  loginOverlay.classList.remove('hidden');
  
  if (loginUseridInput) loginUseridInput.value = '';
  if (loginPasswordInput) loginPasswordInput.value = '';
  if (registerUseridInput) registerUseridInput.value = '';
  if (registerPasswordInput) registerPasswordInput.value = '';
  if (authErrorMsg) authErrorMsg.style.display = 'none';
}

function applyProfileUI() {
  userNameDisplay.textContent = state.user.username;
  dropdownUserid.textContent = `@${state.user.username.toLowerCase().replace(/\s+/g, '')}`;
  userAvatarEl.textContent = state.user.avatar;
  
  const gradients = {
    '🔥': 'linear-gradient(135deg, #FF416C, #FF4B2B)',
    '⚡': 'linear-gradient(135deg, #FDC830, #F37335)',
    '🎸': 'linear-gradient(135deg, #00B4DB, #0083B0)',
    '🎧': 'linear-gradient(135deg, #11998e, #38ef7d)',
    '🎵': 'linear-gradient(135deg, #8a2387, #e94057)'
  };
  userAvatarEl.style.background = gradients[state.user.avatar] || gradients['🔥'];
  
  const savedLikes = localStorage.getItem(`pattispy_likes_${state.user.username}`);
  if (savedLikes) {
    state.likedSongs = new Set(JSON.parse(savedLikes));
  } else {
    state.likedSongs = new Set();
  }
}

function getRegisteredUsers() {
  const users = localStorage.getItem('pattispy_users');
  return users ? JSON.parse(users) : [];
}

function registerNewUser(username, password, avatar) {
  const users = getRegisteredUsers();
  const lowerUsername = username.toLowerCase();
  
  const exists = users.some(u => u.username.toLowerCase() === lowerUsername);
  if (exists) {
    return { success: false, message: 'User ID is already taken!' };
  }
  
  users.push({ username, password, avatar });
  localStorage.setItem('pattispy_users', JSON.stringify(users));
  return { success: true };
}

function authenticateUser(username, password) {
  const users = getRegisteredUsers();
  const lowerUsername = username.toLowerCase();
  
  const user = users.find(u => u.username.toLowerCase() === lowerUsername);
  if (!user) {
    return { success: false, message: 'Username / User ID not found.' };
  }
  
  if (user.password !== password) {
    return { success: false, message: 'Incorrect password. Try again!' };
  }
  
  return { success: true, user: user };
}

// ─── Playlists Management & Memory ────────────────────
function loadPlaylistsFromStorage() {
  const savedPlaylists = localStorage.getItem(`pattispy_playlists_${state.user.username}`);
  if (savedPlaylists) {
    state.playlists = JSON.parse(savedPlaylists);
  } else {
    state.playlists = [];
  }
}

function savePlaylistsToStorage() {
  localStorage.setItem(`pattispy_playlists_${state.user.username}`, JSON.stringify(state.playlists));
}

function createNewPlaylist() {
  const playlistCount = state.playlists.length + 1;
  const newPlaylist = {
    id: Date.now(),
    name: `My Playlist #${playlistCount}`,
    songs: []
  };
  state.playlists.push(newPlaylist);
  savePlaylistsToStorage();
  renderSidebarPlaylists();
  renderMobileLibraryPlaylists();
  switchView('playlist', newPlaylist.id);
  showToast('Playlist Created ➕');
}

function renamePlaylist(id) {
  const playlist = state.playlists.find(p => p.id === id);
  if (!playlist) return;
  
  const newName = prompt('Enter a new name for your playlist:', playlist.name);
  if (newName && newName.trim()) {
    playlist.name = newName.trim();
    savePlaylistsToStorage();
    renderSidebarPlaylists();
    renderMobileLibraryPlaylists();
    renderPlaylistView(id);
    showToast('Playlist renamed successfully.');
  }
}

function deletePlaylist(id) {
  if (confirm('Are you sure you want to delete this playlist?')) {
    state.playlists = state.playlists.filter(p => p.id !== id);
    savePlaylistsToStorage();
    renderSidebarPlaylists();
    renderMobileLibraryPlaylists();
    switchView('home');
    showToast('Playlist deleted.');
  }
}

function addSongToPlaylist(playlistId, songId) {
  const playlist = state.playlists.find(p => p.id === playlistId);
  if (!playlist) return;
  
  if (playlist.songs.includes(songId)) {
    showToast('Song is already in this playlist!');
    return;
  }
  
  playlist.songs.push(songId);
  savePlaylistsToStorage();
  renderSidebarPlaylists();
  renderMobileLibraryPlaylists();
  showToast('Added to Playlist 🎵');
}

// ─── Time greetings ───────────────────────────────────
function updateGreetingHeader() {
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  greetingTitle.textContent = greeting;
}

// ─── Views Toggling & Rendering ───────────────────────
function switchView(viewName, details = null) {
  state.activeView = viewName;
  
  // Clean desktop classes
  navHome.classList.remove('active');
  navSearch.classList.remove('active');
  btnLikedSongsView.classList.remove('active');
  
  // Clean mobile bottom nav active classes
  mobNavHome.classList.remove('active');
  mobNavSearch.classList.remove('active');
  mobNavLibrary.classList.remove('active');
  
  // Hide all panels
  viewHome.style.display = 'none';
  viewSearch.style.display = 'none';
  viewPlaylist.style.display = 'none';
  viewLibrary.style.display = 'none';
  topbarSearchBar.style.display = 'none';
  
  viewHome.classList.remove('active');
  viewSearch.classList.remove('active');
  viewPlaylist.classList.remove('active');
  viewLibrary.classList.remove('active');

  if (viewName === 'home') {
    navHome.classList.add('active');
    mobNavHome.classList.add('active');
    
    viewHome.style.display = 'block';
    setTimeout(() => viewHome.classList.add('active'), 10);
    renderHomeViews();
  } 
  else if (viewName === 'search') {
    navSearch.classList.add('active');
    mobNavSearch.classList.add('active');
    
    topbarSearchBar.style.display = 'flex';
    viewSearch.style.display = 'block';
    setTimeout(() => viewSearch.classList.add('active'), 10);
    
    if (searchInput.value.trim() !== '') {
      performSearch(searchInput.value.trim());
    } else {
      searchInitialView.style.display = 'block';
      searchResultsView.style.display = 'none';
    }
  } 
  else if (viewName === 'liked') {
    btnLikedSongsView.classList.add('active');
    viewPlaylist.style.display = 'block';
    setTimeout(() => viewPlaylist.classList.add('active'), 10);
    renderPlaylistView('liked');
  } 
  else if (viewName === 'playlist') {
    viewPlaylist.style.display = 'block';
    setTimeout(() => viewPlaylist.classList.add('active'), 10);
    renderPlaylistView(details);
  }
  else if (viewName === 'library') {
    mobNavLibrary.classList.add('active');
    viewLibrary.style.display = 'block';
    setTimeout(() => viewLibrary.classList.add('active'), 10);
    renderMobileLibraryPlaylists();
  }
}

// ─── Rendering Sidebar Playlists ──────────────────────
function renderSidebarPlaylists() {
  sidebarPlaylistsList.innerHTML = '';
  state.playlists.forEach(playlist => {
    const item = document.createElement('a');
    item.className = 'playlist-item';
    item.dataset.id = playlist.id;
    
    const placeholderColors = ['#1DB954', '#4a8fcc', '#cc4488', '#cc8844'];
    const pColor = placeholderColors[playlist.id % placeholderColors.length] || '#1DB954';
    
    item.innerHTML = `
      <div class="playlist-thumb" style="background:${pColor}; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem">
        🎵
      </div>
      <div class="playlist-info">
        <span class="playlist-name">${playlist.name}</span>
        <span class="playlist-meta">Playlist · ${playlist.songs.length} songs</span>
      </div>
    `;
    item.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('playlist', playlist.id);
    });
    sidebarPlaylistsList.appendChild(item);
  });
}

// ─── Rendering Mobile Library Playlists ───────────────
function renderMobileLibraryPlaylists() {
  mobPlaylistsList.innerHTML = '';
  if (state.playlists.length === 0) {
    mobPlaylistsList.innerHTML = '<p style="color:var(--text-secondary);padding:16px 0">No custom playlists created yet.</p>';
    return;
  }
  
  state.playlists.forEach(playlist => {
    const item = document.createElement('a');
    item.className = 'playlist-item';
    item.style.paddingLeft = '0';
    
    const placeholderColors = ['#1DB954', '#4a8fcc', '#cc4488', '#cc8844'];
    const pColor = placeholderColors[playlist.id % placeholderColors.length] || '#1DB954';
    
    item.innerHTML = `
      <div class="playlist-thumb" style="background:${pColor}; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem; width:44px; height:44px">
        🎵
      </div>
      <div class="playlist-info">
        <span class="playlist-name" style="font-size:0.95rem">${playlist.name}</span>
        <span class="playlist-meta" style="font-size:0.78rem">Playlist · ${playlist.songs.length} songs</span>
      </div>
    `;
    item.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('playlist', playlist.id);
    });
    mobPlaylistsList.appendChild(item);
  });
}

// ─── Rendering Home View elements ─────────────────────
function renderHomeViews() {
  greetingGrid.innerHTML = '';
  const fillTracks = [...SONGS, SONGS[0], SONGS[1]].slice(0, 6);
  fillTracks.forEach((song, i) => {
    const card = document.createElement('div');
    card.className = 'greeting-card';
    card.innerHTML = `
      <img src="${song.img}" alt="${song.title}" />
      <span>${song.title}</span>
      <button class="greeting-play-btn" title="Play">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    `;
    card.addEventListener('click', () => {
      state.currentContext = 'all';
      playSongAt(song.id);
    });
    greetingGrid.appendChild(card);
  });

  homePicksGrid.innerHTML = '';
  SONGS.forEach(song => {
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
    card.addEventListener('click', () => {
      state.currentContext = 'all';
      playSongAt(song.id);
    });
    homePicksGrid.appendChild(card);
  });

  homeRecentGrid.innerHTML = '';
  [...SONGS].reverse().forEach(song => {
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
    card.addEventListener('click', () => {
      state.currentContext = 'all';
      playSongAt(song.id);
    });
    homeRecentGrid.appendChild(card);
  });
}

// ─── Searching filter ─────────────────────────────────
searchInput.addEventListener('input', (e) => {
  const val = e.target.value.trim();
  if (state.activeView !== 'search') return;
  
  if (val === '') {
    searchInitialView.style.display = 'block';
    searchResultsView.style.display = 'none';
  } else {
    performSearch(val);
  }
});

function performSearch(query) {
  searchInitialView.style.display = 'none';
  searchResultsView.style.display = 'block';
  
  searchTracklist.innerHTML = '';
  const matches = SONGS.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.artist.toLowerCase().includes(query.toLowerCase()) ||
    s.genre.toLowerCase().includes(query.toLowerCase())
  );
  
  if (matches.length === 0) {
    searchTracklist.innerHTML = '<p style="color:var(--text-secondary);padding:16px">No results found.</p>';
    return;
  }
  
  matches.forEach((song, idx) => {
    const row = document.createElement('div');
    row.className = 'track-row' + (song.id === state.currentIndex ? ' playing' : '');
    row.dataset.id = song.id;
    row.innerHTML = `
      <div class="track-num">
        <span class="track-num-text">${idx + 1}</span>
        <span class="track-play-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z"/></svg>
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
      <div class="track-duration">--:--</div>
    `;
    
    row.addEventListener('click', () => {
      state.currentContext = 'all';
      playSongAt(song.id);
    });
    
    row.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e, song.id);
    });
    
    searchTracklist.appendChild(row);
  });
}

// ─── Rendering Playlist Tab view ──────────────────────
function renderPlaylistView(playlistId) {
  playlistTracklist.innerHTML = '';
  
  let pName = '';
  let pDesc = '';
  let pImg = '';
  let pBgColor = '';
  let pMeta = '';
  let tracks = [];
  
  btnRenamePlaylist.style.display = 'none';
  btnDeletePlaylist.style.display = 'none';
  
  if (playlistId === 'liked') {
    pName = 'Liked Songs';
    pDesc = 'Your personal music collection.';
    pImg = 'img/loveah_sollitalea.png';
    pBgColor = 'linear-gradient(135deg, #450af5 0%, #1e0569 40%, var(--bg-elevated) 100%)';
    tracks = SONGS.filter(s => state.likedSongs.has(s.id));
    pMeta = `<strong>${state.user.username}</strong> · ${tracks.length} songs`;
  } 
  else {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    pName = playlist.name;
    pDesc = 'Custom user playlist.';
    pImg = playlist.songs.length > 0 ? SONGS.find(s => s.id === playlist.songs[0]).img : 'img/tvk_campaign_song.png';
    pBgColor = 'linear-gradient(135deg, #106650 0%, #06382a 40%, var(--bg-elevated) 100%)';
    
    tracks = playlist.songs.map(sid => SONGS.find(s => s.id === sid)).filter(Boolean);
    pMeta = `<strong>${state.user.username}</strong> · ${tracks.length} songs`;
    
    btnRenamePlaylist.style.display = 'block';
    btnDeletePlaylist.style.display = 'block';
    
    btnRenamePlaylist.onclick = () => renamePlaylist(playlistId);
    btnDeletePlaylist.onclick = () => deletePlaylist(playlistId);
  }
  
  playlistHeroBg.style.background = pBgColor;
  playlistHeroImg.src = pImg;
  playlistHeroTitle.textContent = pName;
  playlistHeroDesc.textContent = pDesc;
  playlistHeroMeta.innerHTML = pMeta;
  
  if (tracks.length === 0) {
    playlistTracklist.innerHTML = '<p style="color:var(--text-secondary);padding:32px;text-align:center">No tracks in this collection yet.</p>';
    return;
  }
  
  tracks.forEach((song, idx) => {
    const row = document.createElement('div');
    row.className = 'track-row' + (song.id === state.currentIndex ? ' playing' : '');
    row.dataset.id = song.id;
    row.innerHTML = `
      <div class="track-num">
        <span class="track-num-text">${idx + 1}</span>
        <span class="track-play-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z"/></svg>
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
      <div class="track-duration" id="playlist-dur-${song.id}">--:--</div>
    `;
    
    row.addEventListener('click', () => {
      state.currentContext = playlistId;
      playSongAt(song.id);
    });
    
    row.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e, song.id);
    });
    
    playlistTracklist.appendChild(row);
    loadPlaylistTrackDuration(song.src, song.id);
  });
  
  btnPlayPlaylist.onclick = () => {
    state.currentContext = playlistId;
    playSongAt(tracks[0].id);
  };
}

function loadPlaylistTrackDuration(src, id) {
  const tempAudio = new Audio();
  tempAudio.src = src;
  tempAudio.addEventListener('loadedmetadata', () => {
    const el = document.getElementById(`playlist-dur-${id}`);
    if (el) el.textContent = formatTime(tempAudio.duration);
  });
}

// ─── Playback & Loading ───────────────────────────────
function loadSong(index, autoPlay = true) {
  const song = SONGS[index];
  state.currentIndex = index;

  audio.src = song.src;
  audio.load();

  // Desktop Player UI updating
  playerArt.src = song.img;
  playerName.textContent = song.title;
  playerArtist.textContent = song.artist;

  // Mobile Player UI updating
  mobPlayerArt.src = song.img;
  mobPlayerTitle.textContent = song.title;
  mobPlayerArtist.textContent = song.artist;
  mobPlayerBgGlow.style.background = `radial-gradient(circle, ${song.accent}55 0%, transparent 60%)`;

  updateLikeButton();
  updateQueue();
  renderLyrics(song);

  document.querySelectorAll('.track-row').forEach(row => {
    const matchesId = parseInt(row.dataset.id) === index;
    row.classList.toggle('playing', matchesId);
    
    const playIconEl = row.querySelector('.track-play-icon');
    if (playIconEl) {
      if (matchesId) {
        playIconEl.innerHTML = `<span class="eq-bars ${autoPlay ? '' : 'paused'}">
          <span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span>
        </span>`;
      } else {
        playIconEl.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z"/></svg>`;
      }
    }
  });

  if (autoPlay) {
    playAudio();
  } else {
    state.isPlaying = false;
    setPlayUI(false);
  }
}

function playAudio() {
  audio.play().then(() => {
    state.isPlaying = true;
    setPlayUI(true);
    updateEqBars(true);
  }).catch(err => console.warn('Playback error:', err));
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
  // Sync Desktop Icons
  playIcon.style.display = playing ? 'none' : 'block';
  pauseIcon.style.display = playing ? 'block' : 'none';
  playerArt.classList.toggle('spin', playing);

  // Sync Mobile Icons
  mobPlayIcon.style.display = playing ? 'none' : 'block';
  mobPauseIcon.style.display = playing ? 'block' : 'none';
  mobPlayerArt.classList.toggle('spin', playing);
}

function updateEqBars(playing) {
  document.querySelectorAll('.track-row.playing .eq-bars').forEach(bars => {
    bars.classList.toggle('paused', !playing);
  });
}

// ─── Context-based Track Navigation ───────────────────
function getActiveContextTracks() {
  if (state.currentContext === 'liked') {
    return SONGS.filter(s => state.likedSongs.has(s.id));
  } 
  else if (typeof state.currentContext === 'number') {
    const playlist = state.playlists.find(p => p.id === state.currentContext);
    if (playlist) {
      return playlist.songs.map(sid => SONGS.find(s => s.id === sid)).filter(Boolean);
    }
  }
  return SONGS;
}

function playNext() {
  if (state.repeatMode === 2) {
    audio.currentTime = 0;
    playAudio();
    return;
  }
  
  const tracks = getActiveContextTracks();
  if (tracks.length === 0) return;
  
  const activeIds = tracks.map(t => t.id);
  const currentPos = activeIds.indexOf(state.currentIndex);
  
  let nextId;
  if (state.isShuffle) {
    const randIdx = Math.floor(Math.random() * activeIds.length);
    nextId = activeIds[randIdx];
  } else {
    const nextPos = (currentPos + 1) % activeIds.length;
    nextId = activeIds[nextPos];
  }
  
  playSongAt(nextId);
}

function playPrev() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  
  const tracks = getActiveContextTracks();
  if (tracks.length === 0) return;
  
  const activeIds = tracks.map(t => t.id);
  const currentPos = activeIds.indexOf(state.currentIndex);
  
  let prevId;
  if (state.isShuffle) {
    const randIdx = Math.floor(Math.random() * activeIds.length);
    prevId = activeIds[randIdx];
  } else {
    const prevPos = (currentPos - 1 + activeIds.length) % activeIds.length;
    prevId = activeIds[prevPos];
  }
  
  playSongAt(prevId);
}

function playSongAt(id) {
  const index = SONGS.findIndex(s => s.id === id);
  if (index !== -1) {
    loadSong(index, true);
  }
}

function generateShuffleOrder() {
  state.shuffleOrder = [...Array(SONGS.length).keys()];
  for (let i = state.shuffleOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.shuffleOrder[i], state.shuffleOrder[j]] = [state.shuffleOrder[j], state.shuffleOrder[i]];
  }
}

function toggleShuffle() {
  state.isShuffle = !state.isShuffle;
  btnShuffle.classList.toggle('active', state.isShuffle);
  mobBtnShuffle.classList.toggle('active', state.isShuffle);
  showToast(state.isShuffle ? '🔀 Shuffle on' : 'Shuffle off');
}

function toggleRepeat() {
  state.repeatMode = (state.repeatMode + 1) % 3;
  btnRepeat.classList.toggle('active', state.repeatMode > 0);
  mobBtnRepeat.classList.toggle('active', state.repeatMode > 0);
  
  showToast(
    state.repeatMode === 0 ? 'Repeat off'
    : state.repeatMode === 1 ? '🔁 Repeat all'
    : '🔂 Repeat one'
  );
}

// ─── Drag progress bar ────────────────────────────────
audio.addEventListener('timeupdate', () => {
  if (state.isDraggingProgress || isDraggingMobileProgress) return;
  if (!audio.duration) return;
  
  const pct = (audio.currentTime / audio.duration) * 100;
  
  // Desktop
  progressFill.style.width = pct + '%';
  progressThumb.style.left = pct + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
  
  // Mobile
  mobProgressFill.style.width = pct + '%';
  mobProgressThumb.style.left = pct + '%';
  mobCurrentTime.textContent = formatTime(audio.currentTime);
  
  updateLyricsSync(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(audio.duration);
  mobTotalTime.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  if (state.repeatMode === 2) {
    audio.currentTime = 0;
    playAudio();
  } else {
    playNext();
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

// Mobile Progress Seeking
function seekMobile(e) {
  const rect = mobProgressBar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audio.currentTime = pct * audio.duration;
  mobProgressFill.style.width = (pct * 100) + '%';
  mobProgressThumb.style.left = (pct * 100) + '%';
}

mobProgressBar.addEventListener('mousedown', (e) => {
  isDraggingMobileProgress = true;
  seekMobile(e);
});

// ─── Drag Volume bar ──────────────────────────────────
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

// ─── Document Mouse events dragging ────────────────────
document.addEventListener('mousemove', (e) => {
  if (state.isDraggingProgress) seekTo(e);
  if (isDraggingMobileProgress) seekMobile(e);
  if (state.isDraggingVolume) setVolumeFromEvent(e);
});

document.addEventListener('mouseup', () => {
  state.isDraggingProgress = false;
  isDraggingMobileProgress = false;
  state.isDraggingVolume = false;
});

// ─── Liked songs toggles ──────────────────────────────
function toggleLike(id) {
  if (state.likedSongs.has(id)) {
    state.likedSongs.delete(id);
    showToast('Removed from Liked Songs');
  } else {
    state.likedSongs.add(id);
    showToast('❤️ Added to Liked Songs');
  }
  
  localStorage.setItem(`pattispy_likes_${state.user.username}`, JSON.stringify([...state.likedSongs]));
  
  updateLikeButton();
  playerLikeBtn.classList.add('heart-pop');
  setTimeout(() => playerLikeBtn.classList.remove('heart-pop'), 300);
  
  if (state.activeView === 'liked') {
    renderPlaylistView('liked');
  }
  if (state.activeView === 'library') {
    renderMobileLibraryPlaylists();
  }
}

function updateLikeButton() {
  const liked = state.likedSongs.has(state.currentIndex);
  playerLikeBtn.classList.toggle('liked', liked);
  mobPlayerLikeBtn.classList.toggle('liked', liked);
}

// ─── Context Options Menu Popup ───────────────────────
function showContextMenu(e, songId) {
  activeContextTrackIndex = songId;
  contextMenu.style.left = `${e.clientX}px`;
  contextMenu.style.top = `${e.clientY}px`;
  contextMenu.style.display = 'block';
  
  contextBtnLike.textContent = state.likedSongs.has(songId) 
    ? 'Remove from Liked Songs' 
    : 'Add to Liked Songs';
    
  contextPlaylistsSub.innerHTML = '';
  if (state.playlists.length === 0) {
    contextPlaylistsSub.innerHTML = '<span style="color:var(--text-muted);font-size:0.75rem;padding:6px 12px;display:block">No playlists created</span>';
  } else {
    state.playlists.forEach(playlist => {
      const btn = document.createElement('button');
      btn.className = 'context-item';
      btn.textContent = playlist.name;
      btn.style.paddingLeft = '20px';
      btn.onclick = () => {
        addSongToPlaylist(playlist.id, songId);
        contextMenu.style.display = 'none';
      };
      contextPlaylistsSub.appendChild(btn);
    });
  }
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#context-menu')) {
    contextMenu.style.display = 'none';
  }
});

// ─── Queue slider panel ────────────────────────────────
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
    item.addEventListener('click', () => playSongAt(song.id));
    queueNextItems.appendChild(item);
  });
}

// ─── scrolling lyrics synchronization ──────────────────
function renderLyrics(song) {
  lyricsScrollBody.innerHTML = '';
  
  if (!song.lyrics || song.lyrics.length === 0) {
    lyricsScrollBody.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:32px">No lyrics available for this song.</p>';
    mobLyricsPreview.textContent = 'No lyrics available.';
    return;
  }
  
  // Set default preview card text
  mobLyricsPreview.textContent = song.lyrics[1] ? song.lyrics[1].text : song.lyrics[0].text;
  
  song.lyrics.forEach((line, idx) => {
    const el = document.createElement('p');
    el.className = 'lyric-line';
    el.dataset.time = line.time;
    el.textContent = line.text;
    el.onclick = () => {
      audio.currentTime = line.time;
      playAudio();
    };
    lyricsScrollBody.appendChild(el);
  });
}

function updateLyricsSync(currentTime) {
  const lines = document.querySelectorAll('.lyric-line');
  let activeLine = null;
  
  lines.forEach((line, idx) => {
    const time = parseFloat(line.dataset.time);
    const nextTime = idx < lines.length - 1 ? parseFloat(lines[idx + 1].dataset.time) : Infinity;
    
    if (currentTime >= time && currentTime < nextTime) {
      line.classList.add('active');
      activeLine = line;
      
      // Update quick preview card on mobileNowPlaying
      if (mobLyricsPreview) {
        mobLyricsPreview.textContent = line.text;
      }
    } else {
      line.classList.remove('active');
    }
  });
  
  if (state.activeView === 'lyrics' && activeLine) {
    activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ─── Event binds registry ──────────────────────────────
function bindEvents() {
  // Tabs switcher click events
  authTabLogin.addEventListener('click', () => {
    authTabLogin.classList.add('active');
    authTabRegister.classList.remove('active');
    formLogin.classList.add('active');
    formRegister.classList.remove('active');
    authErrorMsg.style.display = 'none';
  });

  authTabRegister.addEventListener('click', () => {
    authTabRegister.classList.add('active');
    authTabLogin.classList.remove('active');
    formRegister.classList.add('active');
    formLogin.classList.remove('active');
    authErrorMsg.style.display = 'none';
  });

  // Avatar Options choice
  let selectedAvatar = '🔥';
  avatarOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      avatarOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      selectedAvatar = opt.dataset.avatar;
    });
  });

  // Login form submission
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginUseridInput.value.trim();
    const password = loginPasswordInput.value;
    
    if (!username || !password) return;
    
    const result = authenticateUser(username, password);
    if (!result.success) {
      authErrorMsg.textContent = result.message;
      authErrorMsg.style.display = 'block';
      authErrorMsg.style.animation = 'none';
      setTimeout(() => authErrorMsg.style.animation = '', 10);
      return;
    }
    
    state.user = {
      isLoggedIn: true,
      username: username,
      avatar: result.user.avatar || '🔥'
    };
    
    localStorage.setItem('pattispy_session', JSON.stringify({
      username: username,
      avatar: result.user.avatar
    }));
    
    applyProfileUI();
    loadPlaylistsFromStorage();
    renderSidebarPlaylists();
    renderMobileLibraryPlaylists();
    renderHomeViews();
    
    loginOverlay.classList.add('hidden');
    showToast(`Welcome back, ${username}! 🎵`);
  });

  // Register form submission
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = registerUseridInput.value.trim();
    const password = registerPasswordInput.value;
    
    if (!username || !password) return;
    
    const result = registerNewUser(username, password, selectedAvatar);
    if (!result.success) {
      authErrorMsg.textContent = result.message;
      authErrorMsg.style.display = 'block';
      authErrorMsg.style.animation = 'none';
      setTimeout(() => authErrorMsg.style.animation = '', 10);
      return;
    }
    
    state.user = {
      isLoggedIn: true,
      username: username,
      avatar: selectedAvatar
    };
    
    localStorage.setItem('pattispy_session', JSON.stringify({
      username: username,
      avatar: selectedAvatar
    }));
    
    applyProfileUI();
    loadPlaylistsFromStorage();
    renderSidebarPlaylists();
    renderHomeViews();
    
    loginOverlay.classList.add('hidden');
    showToast(`Registered successfully! Welcome, ${username}! 🎉`);
  });

  // User Profile options dropdown triggers
  topbarUserMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#topbar-user-menu')) {
      userDropdown.classList.remove('open');
    }
  });

  btnLogout.addEventListener('click', (e) => {
    e.stopPropagation();
    pauseAudio();
    localStorage.removeItem('pattispy_session');
    userDropdown.classList.remove('open');
    showLoginScreen();
    showToast('Logged out successfully.');
  });

  // Navigation Panel Views Toggling
  navHome.addEventListener('click', (e) => { e.preventDefault(); switchView('home'); });
  navSearch.addEventListener('click', (e) => { e.preventDefault(); switchView('search'); });
  sidebarLogoHome.addEventListener('click', () => { switchView('home'); });
  btnLikedSongsView.addEventListener('click', (e) => { e.preventDefault(); switchView('liked'); });
  btnCreatePlaylist.addEventListener('click', (e) => { e.preventDefault(); createNewPlaylist(); });

  // Mobile Bottom Navigation clicks
  mobNavHome.addEventListener('click', (e) => { e.preventDefault(); switchView('home'); });
  mobNavSearch.addEventListener('click', (e) => { e.preventDefault(); switchView('search'); });
  mobNavLibrary.addEventListener('click', (e) => { e.preventDefault(); switchView('library'); });

  // Mobile Combined Library view actions
  mobCreatePlaylistBtn.addEventListener('click', createNewPlaylist);
  mobLikedSongsBtn.addEventListener('click', () => switchView('liked'));

  // Playback control buttons click events
  btnPlay.addEventListener('click', togglePlay);
  btnPrev.addEventListener('click', playPrev);
  btnNext.addEventListener('click', playNext);
  btnShuffle.addEventListener('click', toggleShuffle);
  btnRepeat.addEventListener('click', toggleRepeat);
  btnMute.addEventListener('click', toggleMute);
  playerLikeBtn.addEventListener('click', () => toggleLike(state.currentIndex));

  // Connect Mobile Fullscreen Controls
  mobBtnPlay.addEventListener('click', togglePlay);
  mobBtnPrev.addEventListener('click', playPrev);
  mobBtnNext.addEventListener('click', playNext);
  mobBtnShuffle.addEventListener('click', toggleShuffle);
  mobBtnRepeat.addEventListener('click', toggleRepeat);
  mobPlayerLikeBtn.addEventListener('click', () => toggleLike(state.currentIndex));

  // Tapping Mini-Player bar on mobile slides open Full Screen Overlay
  document.getElementById('player-bar').addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      // Prevent slide up if clicking the quick mini-play pseudo-button on the right
      const rect = document.getElementById('player-bar').getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX > rect.width - 50) {
        togglePlay();
      } else {
        mobPlayerFullscreen.classList.add('open');
      }
    }
  });

  mobPlayerClose.addEventListener('click', () => {
    mobPlayerFullscreen.classList.remove('open');
  });

  // Mobile quick lyrics card expands full screen lyrics
  mobLyricsBtn.addEventListener('click', () => {
    mobPlayerFullscreen.classList.remove('open');
    btnLyrics.classList.add('active');
    lyricsPanel.classList.add('open');
    state.activeView = 'lyrics';
    updateLyricsSync(audio.currentTime);
  });

  // Lyrics sliding panel action
  btnLyrics.addEventListener('click', () => {
    if (state.activeView === 'lyrics') {
      btnLyrics.classList.remove('active');
      lyricsPanel.classList.remove('open');
      switchView('home');
    } else {
      btnLyrics.classList.add('active');
      lyricsPanel.classList.add('open');
      state.activeView = 'lyrics';
      updateLyricsSync(audio.currentTime);
    }
  });
  
  lyricsClose.addEventListener('click', () => {
    btnLyrics.classList.remove('active');
    lyricsPanel.classList.remove('open');
    switchView('home');
  });

  // Context Menu button triggers
  contextBtnLike.addEventListener('click', () => {
    if (activeContextTrackIndex !== null) {
      toggleLike(activeContextTrackIndex);
      contextMenu.style.display = 'none';
    }
  });

  // Playback Controls Queue
  btnQueue.addEventListener('click', () => {
    queuePanel.classList.toggle('open');
    updateQueue();
  });
  queueClose.addEventListener('click', () => queuePanel.classList.remove('open'));
  
  
  // Main scroll blur styling
  document.getElementById('main-content').addEventListener('scroll', function() {
    const topbar = document.querySelector('.topbar');
    if (this.scrollTop > 20) {
      topbar.style.background = 'rgba(10,10,10,0.95)';
    } else {
      topbar.style.background = 'rgba(18,18,18,0.85)';
    }
  });
}

// ─── Toast Notifications ──────────────────────────────
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

// ─── Time Formatting ──────────────────────────────────
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
      state.volume = Math.min(1, state.volume + 0.05);
      audio.volume = state.volume;
      setVolumeUI(state.volume);
      break;
    case 'ArrowDown':
      state.volume = Math.max(0, state.volume - 0.05);
      audio.volume = state.volume;
      setVolumeUI(state.volume);
      break;
  }
});

// ─── Initializer ──────────────────────────────────────
function init() {
  bindEvents();
  
  // Set default volume
  audio.volume = state.volume;
  setVolumeUI(state.volume);
  
  updateGreetingHeader();
  
  // Load the first song on startup but don't play automatically
  loadSong(0, false);
  
  checkAuth();
  
  if (state.user.isLoggedIn) {
    loadPlaylistsFromStorage();
    renderSidebarPlaylists();
    renderMobileLibraryPlaylists();
    renderHomeViews();
  }
}

// ─── Kick-off Start ───────────────────────────────────
init();
