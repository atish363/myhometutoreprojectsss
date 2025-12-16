// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden")
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      // Close mobile menu if open
      mobileMenu.classList.add("hidden")
    }
  })
})

// Mortgage calculator function
function calculateMortgage(principal, rate, years) {
  const monthlyRate = rate / 100 / 12
  const numPayments = years * 12
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  return monthlyPayment
}

// Quick estimate form
document.getElementById("quick-estimate").addEventListener("submit", (e) => {
  e.preventDefault()
  const homePrice = Number.parseFloat(document.getElementById("home-price").value) || 0
  const downPayment = Number.parseFloat(document.getElementById("down-payment").value) || 0
  const interestRate = Number.parseFloat(document.getElementById("interest-rate").value) || 0

  const loanAmount = homePrice - downPayment
  const monthlyPayment = calculateMortgage(loanAmount, interestRate, 30)

  document.getElementById("monthly-payment").textContent =
    "$" + monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })
  document.getElementById("payment-result").classList.remove("hidden")
})

// Full mortgage calculator
function updateCalculator() {
  const homePrice = Number.parseFloat(document.getElementById("calc-home-price").value) || 0
  const downPayment = Number.parseFloat(document.getElementById("calc-down-payment").value) || 0
  const interestRate = Number.parseFloat(document.getElementById("calc-interest-rate").value) || 0
  const loanTerm = Number.parseInt(document.getElementById("calc-loan-term").value) || 30

  const loanAmount = homePrice - downPayment
  const monthlyPayment = calculateMortgage(loanAmount, interestRate, loanTerm)
  const totalPaid = monthlyPayment * loanTerm * 12
  const totalInterest = totalPaid - loanAmount

  document.getElementById("calc-monthly-payment").textContent =
    "$" + monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })
  document.getElementById("calc-principal-interest").textContent =
    "$" + monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })
  document.getElementById("calc-total-interest").textContent =
    "$" + totalInterest.toLocaleString("en-US", { maximumFractionDigits: 0 })
  document.getElementById("calc-total-paid").textContent =
    "$" + totalPaid.toLocaleString("en-US", { maximumFractionDigits: 0 })
}
// Update calculator on input change
;["calc-home-price", "calc-down-payment", "calc-interest-rate", "calc-loan-term"].forEach((id) => {
  document.getElementById(id).addEventListener("input", updateCalculator)
})

// Initialize calculator
updateCalculator()

// Contact form submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault()
  alert("Thank you for your message! We will contact you within 24 hours.")
  this.reset()
})

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})

// Add active state to navigation
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll('nav a[href^="#"]')

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("text-primary")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-primary")
    }
  })
})
