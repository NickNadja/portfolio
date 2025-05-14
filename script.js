// Fonction pour les onglets
function opentab(tabname, event) {
  const tablinks = document.getElementsByClassName('tab-links');
  const tabcontents = document.getElementsByClassName('tab-contents');
  
  for (let tablink of tablinks) {
    tablink.classList.remove('active-link');
  }
  
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove('active-tab');
  }
  
  event.currentTarget.classList.add('active-link');
  document.getElementById(tabname).classList.add('active-tab');
}

// Initialisation de la traduction Google
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'fr', // Changé à 'fr' comme langue par défaut
    includedLanguages: 'en,fr,mg',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
  
  setTimeout(() => {
    const logo = document.querySelector('.goog-logo-link');
    if (logo) logo.style.display = 'none';
    
    const frame = document.querySelector('.goog-te-gadget');
    if (frame) frame.style.color = 'transparent';
  }, 1000);
}

// Menu Burger
function toggleMenu() {
  const nav = document.querySelector('nav ul');
  const icon = document.querySelector('.burger-menu i');
  
  nav.classList.toggle('show');
  
  if (nav.classList.contains('show')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Animation de texte
  const typingText = document.getElementById('typing-text');
  const texts = [
    "Bonjour, Bienvenue sur mon portfolio",
    "Hello, Welcome to my portfolio",
    "Miarahaba, Tongasoa eto amin'ny portfolio-ko"
  ];
  let currentText = 0;
  let index = 0;
  let isDeleting = false;
  let speed = 100;

  function type() {
    const currentString = texts[currentText];
    
    if (isDeleting) {
      typingText.textContent = currentString.substring(0, index - 1);
      index--;
      speed = 50;
    } else {
      typingText.textContent = currentString.substring(0, index + 1);
      index++;
      speed = 100;
    }

    if (!isDeleting && index === currentString.length) {
      isDeleting = true;
      speed = 1500;
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      currentText = (currentText + 1) % texts.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 1000);

  // Disparition de l'intro
  setTimeout(() => {
    document.querySelector('.intro-overlay').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('.intro-overlay').style.display = 'none';
    }, 500);
  }, 6000);

  // Animation au scroll
  const sections = document.querySelectorAll('#about, #services, #portfolio, #contact');

  function checkScroll() {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();

  // Navigation fluide
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Fermer le menu burger si ouvert
      const nav = document.querySelector('nav ul');
      if (nav.classList.contains('show')) {
        nav.classList.remove('show');
        const icon = document.querySelector('.burger-menu i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Gestion du menu burger
  const burgerMenu = document.querySelector('.burger-menu');
  if (burgerMenu) {
    burgerMenu.addEventListener('click', toggleMenu);
  }

  // Correction des onglets pour passer l'événement
  const tabLinks = document.querySelectorAll('.tab-links');
  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const tabname = link.getAttribute('onclick').match(/'(.*?)'/)[1];
      opentab(tabname, e);
    });
  });
});