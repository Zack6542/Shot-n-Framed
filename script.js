// ====== QUICK SETTINGS ======
// Add your email or Instagram below. Leave either blank if you don't want to use it.
const SETTINGS = {
  email: "zackbolau@gmail.com",                 // Example: "you@example.com"
  instagram: "https://www.instagram.com/framed_byzack/"              // Example: "https://instagram.com/yourusername"
};
// =============================

const photos = [...document.querySelectorAll(".photo")];
const filters = [...document.querySelectorAll(".filter")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
let visiblePhotos = photos.slice();
let currentIndex = 0;

function updateVisiblePhotos() {
  visiblePhotos = photos.filter(p => !p.classList.contains("hidden"));
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    photos.forEach(photo => {
      photo.classList.toggle("hidden", filter !== "all" && photo.dataset.category !== filter);
    });
    updateVisiblePhotos();
  });
});

function openLightbox(photo) {
  updateVisiblePhotos();
  currentIndex = visiblePhotos.indexOf(photo);
  renderLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function renderLightbox() {
  const photo = visiblePhotos[currentIndex];
  if (!photo) return;
  lightboxImage.src = photo.dataset.src;
  lightboxImage.alt = photo.querySelector("img").alt;
  lightboxCaption.innerHTML = `<b>${photo.dataset.title}</b> · ${photo.dataset.category}`;
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

photos.forEach(photo => photo.addEventListener("click", () => openLightbox(photo)));
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
  renderLightbox();
});
document.querySelector(".lightbox-next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % visiblePhotos.length;
  renderLightbox();
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") document.querySelector(".lightbox-prev").click();
  if (e.key === "ArrowRight") document.querySelector(".lightbox-next").click();
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

document.getElementById("year").textContent = new Date().getFullYear();

const contactButton = document.getElementById("contactButton");
if (SETTINGS.email) {
  contactButton.href = `mailto:${SETTINGS.email}?subject=Photography%20Inquiry`;
} else if (SETTINGS.instagram) {
  contactButton.href = SETTINGS.instagram;
  contactButton.target = "_blank";
  contactButton.rel = "noopener noreferrer";
} else {
  contactButton.addEventListener("click", e => {
    e.preventDefault();
    alert("Add your email or Instagram in script.js to activate this button.");
  });
}

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  document.getElementById("progress").style.width = progress + "%";
});
