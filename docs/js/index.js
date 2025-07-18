import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG5W4CYRdpnwUPhr6ZgDawiBMjX9glZwc",
  authDomain: "lcc-updates.firebaseapp.com",
  projectId: "lcc-updates",
  storageBucket: "lcc-updates.appspot.com",
  messagingSenderId: "59064583935",
  appId: "1:59064583935:web:8393498a3eeaa7197a6eca",
  measurementId: "G-GQJ7P5GNE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Select all links and the indicator
const links = document.querySelectorAll("nav a");
const indicator = document.querySelector(".indicator");

function regroupGalleryGroups() {
  const track = document.querySelector('.gallery-track');
  if (!track) return;

  // Only run on mobile
  if (window.innerWidth > 768) return;

  // Flatten all images into an array
  const allImgs = Array.from(track.querySelectorAll('.book-img'));
  // Remove all current groups
  track.innerHTML = '';

  // Group images into groups of 3
  for (let i = 0; i < allImgs.length; i += 3) {
    const group = document.createElement('div');
    group.className = 'gallery-group';
    for (let j = i; j < i + 3 && j < allImgs.length; j++) {
      group.appendChild(allImgs[j]);
    }
    track.appendChild(group);
  }
}

// Run on load and on resize
window.addEventListener('DOMContentLoaded', regroupGalleryGroups);
window.addEventListener('resize', () => {
  // Optional: reload page on resize to desktop to restore original groups
  if (window.innerWidth <= 768) {
    regroupGalleryGroups();
  } else {
    window.location.reload(); // reload to restore original HTML
  }
});

// Function to move the indicator
function moveIndicator(link) {
  const rect = link.getBoundingClientRect();
  const parentRect = link.parentNode.getBoundingClientRect();
  const left = rect.left - parentRect.left; // Offset from the parent
  const width = rect.width;

  // Move and resize the indicator
  indicator.style.transform = `translateX(${left}px)`;
  indicator.style.width = `${width}px`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Get the current file name without query/hash
  let currentUrl = window.location.pathname.split("/").pop() || "index.html";
  currentUrl = currentUrl.split("?")[0].split("#")[0];

  const navLinks = document.querySelectorAll("nav a.nav-link, nav .dropdown-item");
  navLinks.forEach(link => link.classList.remove("active"));

  let foundActive = false;

  navLinks.forEach(link => {
    let href = link.getAttribute("href");
    if (!href) return;
    href = href.split("?")[0].split("#")[0];

    // For Home, also match empty string (for root)
    if (
      (href === currentUrl) ||
      (href === "index.html" && (currentUrl === "" || currentUrl === "index.html"))
    ) {
      link.classList.add("active");
      foundActive = true;
      // If dropdown item, also activate parent dropdown-toggle
      if (link.classList.contains("dropdown-item")) {
        const parentDropdown = link.closest(".dropdown");
        if (parentDropdown) {
          const dropdownToggle = parentDropdown.querySelector(".nav-link.dropdown-toggle");
          if (dropdownToggle) dropdownToggle.classList.add("active");
        }
      }
    }
  });

  // If no dropdown item or other link matched, set Home as active
  if (!foundActive) {
    const homeLink = document.querySelector('nav a.nav-link[href="index.html"]');
    if (homeLink) homeLink.classList.add("active");
  }
});

  // Did You Know facts
  const facts = [
    // 🇵🇭 Local (Philippines)
    "The oldest library in the Philippines is the UST Miguel de Benavides Library, established in 1595.",
    "The National Library of the Philippines holds over 1.6 million books and manuscripts.",
    "The Filipiniana section in libraries houses works written by Filipino authors or about the Philippines.",
    "Zamboanga Peninsula Polytechnic State University Library has over 15,000 volumes of books.",
    "Rizal Park in Manila houses the National Library, a key historical and cultural landmark.",
    "The Philippine eLibrary offers digital access to government publications, research, and Filipiniana resources.",
    "Jose Rizal was an avid reader and polyglot, fluent in over 20 languages, and read books in multiple disciplines.",
    "Many Philippine public libraries are part of the National Library’s affiliated system, bringing access to remote areas.",
    "The Library Hub Project (DepEd) aimed to establish mini-libraries in schools across the Philippines.",
    "Davao City Library was one of the first to offer free public Wi-Fi among Philippine libraries.",
    // 🌍 International
    "The world's largest library is the Library of Congress in Washington, D.C., with over 170 million items.",
    "The oldest library still in operation is the Al-Qarawiyyin Library in Morocco, dating back to 859 AD.",
    "There are more public libraries in the U.S. than McDonald's locations.",
    "The longest novel ever written is 'In Search of Lost Time' by Marcel Proust with 9.6 million characters.",
    "The first eBook was created in 1971 and was the U.S. Declaration of Independence.",
    "Bibliosmia is the love of the smell of books.",
    "The Bodleian Library at Oxford requires readers to swear an oath before borrowing books.",
    "The British Library adds about 3 million new items to its collection every year.",
    "Iceland publishes more books per capita than any other country in the world.",
    "Every book published in the UK and Ireland is legally required to be deposited in the British Library.",
    "A library in Turkey is made entirely from discarded books collected by sanitation workers.",
    "Japan has vending machines that dispense books.",
    "The largest fine ever paid for an overdue library book was $345.14 for a book 47 years late.",
  ];

  function rotateFact() {
    const factElement = document.getElementById("didYouKnowText");
    const randomIndex = Math.floor(Math.random() * facts.length);
    factElement.textContent = facts[randomIndex];
  }

  // Initial fact
  rotateFact();
  // Rotate every 100 seconds (100,000 ms)
  setInterval(rotateFact, 100000);

  // Sticky navbar shadow on scroll
  document.addEventListener("scroll", function() {
    const nav = document.querySelector("nav.navbar");
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
  
  // Fetch and display only the latest 4 announcements
  fetchAnnouncements();

// Hover behavior for nav links
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    if (!link.classList.contains("active")) {
      link.classList.add("hovered");
    }
    moveIndicator(link);
  });

  link.addEventListener("mouseleave", () => {
    link.classList.remove("hovered");
    const activeLink = document.querySelector("nav a.active");
    if (activeLink) {
      moveIndicator(activeLink); // Restore active indicator
    }
  });
});

// On mouse leave, restore the active state
document.querySelector("nav").addEventListener("mouseleave", () => {
  const savedId = localStorage.getItem("activeLink") || "home";
  const activeLink = document.querySelector(`nav a[data-id="${savedId}"]`);
  if (activeLink) {
    moveIndicator(activeLink);
  }
});

// Play button functionality (if you have a play button for video)
const playButton = document.getElementById("play-button");
if (playButton) {
  playButton.addEventListener("click", function () {
    document.getElementById("video-thumbnail").style.display = "none";
    this.style.display = "none";
    document.getElementById("video-iframe").src += "?autoplay=1";
  });
}

// Announcement fetcher (shows only 4)
async function fetchAnnouncements() {
  const announcementUpdates = document.getElementById('announcementUpdates');
  if (!announcementUpdates) return;

  // Query Firestore for announcements
  const q = query(collection(db, "lcc-annoucement"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  announcementUpdates.innerHTML = '';

  // Collect all announcements in an array
  const announcements = [];
  querySnapshot.forEach((doc) => {
    announcements.push(doc.data());
  });

  // Only show the first 4
  announcements.slice(0, 4).forEach((data) => {
    const announcementHTML = `
      <p class="update-content">
        <span>${data.title}</span>
        <span class="announcement-date">Posted: ${new Date(data.createdAt.seconds * 1000).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</span>
        ${data.content}
      </p>
    `;
    announcementUpdates.innerHTML += announcementHTML;
  });
}

// Burger menu toggle
document.getElementById('navbarToggler').onclick = function () {
  document.getElementById('navbarMenu').classList.toggle('show');
};

// Dropdown toggle for mobile, only one open at a time
document.querySelectorAll('.dropdown > .dropbtn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      // Close all dropdowns first
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
      // Open this one
      this.parentElement.classList.toggle('open');
    }
  });
});