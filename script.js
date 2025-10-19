function showCode(activity) {
  fetch(`codes/${activity}.html`)
    .then(response => response.text())
    .then(data => {
      const codeBlock = document.getElementById("codeDisplay").querySelector("code");
      codeBlock.textContent = data;
      document.getElementById("codeModal").style.display = "block";
      document.getElementById("codeTitle").textContent = activity;

      // Store code temporarily for preview
      document.getElementById("codePreview").srcdoc = "";
      window.currentCode = data;
    })
    .catch(error => {
      console.error("Error loading code:", error);
    });
}

function closeModal() {
  document.getElementById("codeModal").style.display = "none";
}

function runCode() {
  const iframe = document.getElementById("codePreview");
  iframe.srcdoc = window.currentCode || "<p>No code loaded.</p>";
}
Prism.highlightAll();

function openProjectModal(projectId) {
  const modalBody = document.getElementById("projectModalBody");
  let content = "";

  if (projectId === "project1") {
    content = `
     
      <h3>JP Fitness Web</h3>
      <p>A fitness-themed website built using Wix that features workout plans, progress tracking, and membership content.</p>
      <a href="https://tempestgreatrimuru.wixsite.com/my-site" target="_blank" class="btn">View Project</a>
    `;
  } 
  else if (projectId === "project2") {
    content = `
     
      <h3>iPhone 17 Promotional Poster</h3>
      <p>A modern promotional poster concept for the iPhone 17, designed using Canva with a focus on sleek visuals and branding.</p>
      <a href="https://www.canva.com/design/DAGzHaRhrW8/nl1dJ69EVLSDdhpC_hhLeQ/edit?utm_content=DAGzHaRhrW8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank" class="btn">View Project</a>
    `;
  } 
  else if (projectId === "project3") {
    content = `
      
      <h3>Laravel Project | Food Ordering System</h3>
      <p>A web application for ordering food, featuring menu selection, cart, and order placement functionality.</p>
      <a href="http://foodordering2.test" target="_blank" class="btn">View Project</a>
    `;
  }

  modalBody.innerHTML = content;
  document.getElementById("projectModal").style.display = "block";
}

function closeProjectModal() {
  document.getElementById("projectModal").style.display = "none";
}

const form = document.querySelector(".contact-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  if (response.ok) {
    alert("✅ Thank you! Your message has been sent successfully.");
    form.reset();
  } else {
    alert("❌ Oops! Something went wrong. Please try again.");
  }
});
// === LAB SECTION: Smooth Auto Slider + Manual Scroll + Seamless Loop ===
document.addEventListener("DOMContentLoaded", () => {
  const labSlider = document.getElementById("labSlider");
  if (!labSlider) return;

  // Clone slides to make infinite illusion
  const slides = Array.from(labSlider.children);
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    labSlider.appendChild(clone);
  });

  // --- Manual Scroll Buttons ---
  window.scrollLab = function(direction) {
    labSlider.scrollBy({
      left: direction * 300,
      behavior: "smooth",
    });
  };

  // --- Drag to Scroll ---
  let isDown = false;
  let startX;
  let scrollLeft;

  labSlider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - labSlider.offsetLeft;
    scrollLeft = labSlider.scrollLeft;
    labSlider.classList.add("dragging");
  });

  labSlider.addEventListener("mouseleave", () => {
    isDown = false;
    labSlider.classList.remove("dragging");
  });

  labSlider.addEventListener("mouseup", () => {
    isDown = false;
    labSlider.classList.remove("dragging");
  });

  labSlider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - labSlider.offsetLeft;
    const walk = (x - startX) * 2.5; // 💨 drag speed multiplier
    labSlider.scrollLeft = scrollLeft - walk;
  });

  // --- Smooth Auto Scroll ---
  let scrollSpeed = 0.4; // slower = smoother
  let autoScroll = true;

  function smoothAutoScroll() {
    if (autoScroll) {
      labSlider.scrollLeft += scrollSpeed;

      // Infinite looping illusion
      if (labSlider.scrollLeft >= labSlider.scrollWidth / 2) {
        labSlider.scrollLeft = 0;
      }
    }
    requestAnimationFrame(smoothAutoScroll);
  }

  // Pause on hover
  labSlider.addEventListener("mouseenter", () => (autoScroll = false));
  labSlider.addEventListener("mouseleave", () => (autoScroll = true));

  smoothAutoScroll();
});



const projectSlider = document.getElementById('projectSlider');

function scrollProj(direction) {
  projectSlider.scrollBy({ left: direction * 300, behavior: 'smooth' });
}
// Zoom modal logic
function openZoom(element) {
  const modal = document.getElementById("zoomModal");
  const img = document.getElementById("zoomImage");
  const vid = document.getElementById("zoomVideo");

  if (element.tagName === "VIDEO") {
    img.style.display = "none";
    vid.style.display = "block";
    vid.src = element.querySelector("source").src;
  } else {
    vid.style.display = "none";
    img.style.display = "block";
    img.src = element.src;
  }

  modal.style.display = "flex";
}

function closeZoom() {
  const modal = document.getElementById("zoomModal");
  const vid = document.getElementById("zoomVideo");

  modal.style.display = "none";
  vid.pause(); // Stop video when closing
}
 const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn.querySelector('i');
  const body = document.body;

  // Load previous theme preference
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  // Toggle on click
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    icon.classList.toggle('fa-sun', isLight);
    icon.classList.toggle('fa-moon', !isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });