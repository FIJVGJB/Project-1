// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = "0.2s"
      entry.target.classList.add("slide-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".slide-up")
  animateElements.forEach((el) => {
    observer.observe(el)
  })
})

// Project card hover effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})

// Skill card animations
document.querySelectorAll(".skill-card").forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "var(--white)"
    navbar.style.backdropFilter = "none"
  }
})

// Image gallery functionality for projects
document.addEventListener("DOMContentLoaded", () => {
  // Initialize image galleries
  const galleries = document.querySelectorAll(".gallery-container")

  galleries.forEach((gallery) => {
    const images = gallery.querySelectorAll(".gallery-image")
    let currentIndex = 0

    // Add click event to cycle through images
    gallery.addEventListener("click", () => {
      if (images.length <= 1) return

      // Hide current image
      images[currentIndex].classList.remove("active")

      // Move to next image
      currentIndex = (currentIndex + 1) % images.length

      // Show next image with fade effect
      setTimeout(() => {
        images[currentIndex].classList.add("active")
      }, 250)

      console.log("[v0] Gallery image switched to index:", currentIndex)
    })

    // Add hover effect for gallery indication
    if (images.length > 1) {
      gallery.style.cursor = "pointer"
      gallery.title = "Click to view more images"
    }
  })
})

// Console log for debugging
console.log("[v0] Portfolio website with enhanced functionality loaded successfully")
