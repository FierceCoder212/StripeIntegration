/**
* Template Name: Append
* Updated: Jan 09 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/append-bootstrap-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
var stripe = Stripe(
  "pk_live_51OEvPCFe6QKUExUDJY5E9iaoaFtHXCC3LUn5bmZZhVGn2tR0igRrEIH41MoOGak4SSrOYHND2mppubjQikNR1EGN00WarewfOK"
);
document.addEventListener('DOMContentLoaded', () => {


  /**
   * Scroll top button
   */

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  const selectBody = document.querySelector('body');
  const selectHeader = document.querySelector('#header');

  function toggleScrolled() {
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function () {
    if (!selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${header.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .has-dropdown i').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  function initIsotopeLayout() {
    document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
        filters.addEventListener('click', function () {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
  }
  window.addEventListener('load', initIsotopeLayout);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function (swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);
  checkLoginStatusAndUpdateUI();
  setupPlanSelectionHandlers();
  // setupPlanToggle();

});
function checkLoginStatusAndUpdateUI() {
  // fetch("https://us-central1-extract-1-402612.cloudfunctions.net/check-login")
  //   .then((response) => response.json())
  //   .then((data) => {
  const storedUserMail = localStorage.getItem('user_email');
  const button4 = document.querySelector(".login-button");

  const logoutButton = document.querySelector(".logout-button");
  const manageSubButton = document.querySelector(
    ".manage-subscription-button"
  );

  if (storedUserMail) {
    button4.style.display = "none";

    logoutButton.style.display = "block";
    manageSubButton.style.display = "block";
  } else {
    button4.style.display = "block";
    logoutButton.style.display = "none";
    manageSubButton.style.display = "none";
  }
  // });
}

function logout() {
  window.location.href = "/logout";
}

function setupPlanSelectionHandlers() {
  const planButtons = document.querySelectorAll(".plan button");
  planButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const planName = this.parentNode.querySelector("h3").innerText;
	  
      handlePlanSelection(planName);
    });
  });
}

function handlePlanSelection(planName) {
  // fetch("https://us-central1-extract-1-402612.cloudfunctions.net/check-login")
  //   .then((response) => response.json())
  //   .then((data) => {
  const storedUserMail = localStorage.getItem('user_email');
  if (storedUserMail) {
    createCheckoutSession(planName, storedUserMail);
  } else {
    window.location.href = "/login";
  }
  // });
}

function createCheckoutSession(planName, userEmail) {
  const planIdMapping = {
    "Individual Monthly Plan": "price_1PVkWhFe6QKUExUDf3Ylij5A",
    "Small Office Monthly Plan": "price_1PVkTgFe6QKUExUD5du1iuSy",
    "Enterprise Monthly Plan": "price_1PVkQ6Fe6QKUExUDQilXZoCb",
    "Individual Yearly Plan": "price_1PVkOLFe6QKUExUDOWeu10xD",
    "Small Office Yearly Plan": "price_1PVkLHFe6QKUExUDY4t6IPsn",
    "Enterprise Yearly Plan": "price_1PVk5GFe6QKUExUDjcuHrznr"
  };

  const planId = planIdMapping[planName];
  if (!planId) {
    alert("Plan not found");
    return;
  }

  fetch("https://us-central1-extract-1-402612.cloudfunctions.net/login/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ planId: planId, email: userEmail }),
  })
    .then((response) => {
      if (!response.ok && response.status === 409) {
        // Handle the conflict response
        return response.json().then((data) => {
          throw new Error(data.error);
        });
      }
      return response.json();
    })
    .then((data) => {
      // Redirect to Stripe Checkout
      return stripe.redirectToCheckout({ sessionId: data.sessionId });
    })
    .catch((error) => {
      // This will catch the error thrown from the conflict response
      alert(error.message);
      // Optionally, redirect the user to the manage subscription page
      window.location.href = "/manage-subscription";
    });
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log("Contact Form submitted!");
  // Logic to submit contact form data
}

function handleDownload(event) {
  console.log(`Download button for ${event.target.textContent} clicked!`);
  // Logic for download action
}
function toggleNav() {
  if (window.innerWidth <= 768) { // Adjust 768 to your mobile breakpoint
    var navLinks = document.getElementById("navLinks");
    var hamburgerIcon = document.querySelector(".hamburger-icon");

    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
      hamburgerIcon.classList.remove("active");
    } else {
      navLinks.style.display = "flex";
      hamburgerIcon.classList.add("active");
    }
  }
}

function closeNav() {
  if (window.innerWidth <= 768) { // Adjust 768 to your mobile breakpoint
    var navLinks = document.getElementById("navLinks");
    var hamburgerIcon = document.querySelector(".hamburger-icon");
    navLinks.style.display = "none";
    hamburgerIcon.classList.remove("active");
  }
}



function setupPlanToggle() {
  var planToggle = document.getElementById("plan-toggle");
  var monthlyPlans = document.querySelectorAll(".plan-monthly");
  var yearlyPlans = document.querySelectorAll(".plan-yearly");
  var monthlyMiddle = document.querySelectorAll(".middle-card");
  var yearlyMiddle = document.querySelectorAll(".yearly-middle-card");

  planToggle.addEventListener("change", function () {
    toggleVisibility(yearlyPlans, planToggle.checked);
    toggleVisibility(yearlyMiddle, planToggle.checked);
    toggleVisibility(monthlyPlans, !planToggle.checked);
    toggleVisibility(monthlyMiddle, !planToggle.checked);
  });

  planToggle.dispatchEvent(new Event("change"));
}

function toggleVisibility(elements, show) {
  elements.forEach((element) => {
    element.style.display = show ? "flex" : "none";
  });
}

function show(id) {
	document.getElementById(id).style.display = "block";
}
function hide(id) {	
	document.getElementById(id).style.display = "none";
}

function click(id,clbk) {
	document.getElementById(id).addEventListener("click", clbk);	
}

function showYearly(){
	hide('IMP');
	hide('SOMP');
	hide("EMP");
	show('IYP');
	show('SOYP');
	show("EYP");	
}
function showMonthly(){
	hide('IYP');
	hide('SOYP');
	hide("EYP");
	show('IMP');
	show('SOMP');
	show("EMP");	
}

click('yp',showYearly);
click('mp',showMonthly);

//showYearly();
showMonthly();