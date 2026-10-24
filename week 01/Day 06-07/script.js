// Mobile navigation, theme switch, typing effect, and demo contact form.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const themeToggle = document.querySelector("#themeToggle");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.innerHTML = `<span class="iconify" data-icon="${isOpen ? "lucide:x" : "lucide:menu"}"></span>`;
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<span class="iconify" data-icon="lucide:menu"></span>';
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.innerHTML = `<span class="iconify" data-icon="${isDark ? "lucide:moon" : "lucide:sun"}"></span>`;
});

const typingElement = document.querySelector("#typingText");
const phrases = ["Web Developer", "Problem Solver", "Lifelong Learner", "Creative Builder"];
let phraseIndex = 0;
let characterIndex = phrases[0].length;
let deleting = false;

function typePhrase() {
  const currentPhrase = phrases[phraseIndex];
  if (!deleting) {
    characterIndex++;
    typingElement.textContent = currentPhrase.slice(0, characterIndex);
    if (characterIndex >= currentPhrase.length) {
      deleting = true;
      setTimeout(typePhrase, 1400);
      return;
    }
  } else {
    characterIndex--;
    typingElement.textContent = currentPhrase.slice(0, characterIndex);
    if (characterIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typePhrase, deleting ? 48 : 90);
}
setTimeout(typePhrase, 1600);

document.querySelector("#year").textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please complete all fields before sending.";
    return;
  }
  // Front-end demo only; no message is sent until you connect a form backend.
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  formStatus.textContent = "Opening your email app to send this message…";
  window.location.href = `mailto:hello@naitikgour.dev?subject=${subject}&body=${body}`;
});
