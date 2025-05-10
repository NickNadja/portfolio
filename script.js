function opentab(tabname) {
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

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
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

document.addEventListener('DOMContentLoaded', () => {
  const typingText = document.getElementById('typing-text');
  const texts = [
    "Hello, Welcome to my portfolio",
    "Bonjour, Bienvenue sur mon portfolio",
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

  setTimeout(() => {
    document.querySelector('.intro-overlay').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('.intro-overlay').style.display = 'none';
    }, 500);
  }, 6000);

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

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});