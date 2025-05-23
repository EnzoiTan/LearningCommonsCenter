// Select all links and the indicator
const links = document.querySelectorAll("nav a");
const indicator = document.querySelector(".indicator");

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

// Set initial active state on page load
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop(); // Get the current page name
  const navLinks = document.querySelectorAll("nav a"); // Select all nav links

  // Loop through all nav links
  navLinks.forEach(link => {
    const href = link.getAttribute("href");

    // Check if the current page matches the link's href
    if (href === currentPage) {
      // If the link is inside a dropdown, add active to the parent dropdown only
      const parentDropdown = link.closest(".dropdown");
      if (parentDropdown) {
        parentDropdown.querySelector(".dropbtn").classList.add("active");
      } else {
        link.classList.add("active"); // Add active class to the matching link
      }
    } else {
      link.classList.remove("active"); // Remove active class from other links
    }
  });

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
    factElement = document.getElementById("didYouKnowText");
    randomIndex = Math.floor(Math.random() * facts.length);
    factElement.textContent = facts[randomIndex];
  }

  // Initial fact
  rotateFact();

  // Rotate every 2 minutes (120,000 ms)
  setInterval(rotateFact, 100000);

  document.addEventListener("DOMContentLoaded", () => {
    const updatesSection = document.getElementById("announcementUpdates");
    const seeMoreButton = document.getElementById("seeMoreButton");

    // Toggle the expanded state
    seeMoreButton.addEventListener("click", () => {
      if (updatesSection.classList.contains("expanded")) {
        updatesSection.classList.remove("expanded");
        seeMoreButton.textContent = "See More";
      } else {
        updatesSection.classList.add("expanded");
        seeMoreButton.textContent = "See Less";
      }
    });
  });

  // Handle dropdown parent links
  const dropdownButtons = document.querySelectorAll(".dropbtn");
  dropdownButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault(); // Prevent navigation

      // Remove active class from all dropdown buttons
      dropdownButtons.forEach(btn => btn.classList.remove("active"));

      // Add active class only if a dropdown content link is clicked
      const dropdownContentLinks = button.nextElementSibling.querySelectorAll("a");
      dropdownContentLinks.forEach(link => {
        link.addEventListener("click", () => {
          // Remove active class from all dropdown buttons
          dropdownButtons.forEach(btn => btn.classList.remove("active"));

          // Add active class to the parent dropdown button
          button.classList.add("active");
        });
      });
    });
  });
});

// Hover behavior
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

  link.addEventListener("click", (e) => {
    const id = link.getAttribute("data-id");
    const href = link.getAttribute("href");

    // Save active state
    localStorage.setItem("activeLink", id);
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    moveIndicator(link); // Move indicator to clicked link

    // Allow navigation if href exists
    if (href && href !== "#") {
      window.location.href = href;
    }

    // Prevent default only if href is "#"
    if (href === "#") {
      e.preventDefault();
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

// Play button functionality
document.getElementById("play-button").addEventListener("click", function () {
  document.getElementById("video-thumbnail").style.display = "none";
  this.style.display = "none";
  document.getElementById("video-iframe").src += "?autoplay=1";
});
