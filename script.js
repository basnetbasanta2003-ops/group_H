// =============================================
// Mobile navigation toggle
// =============================================
var navToggle = document.querySelector('.nav-toggle');
var navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
  });
}

var allNavLinks = document.querySelectorAll('.nav-links a');
allNavLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('open');
  });
});

// =============================================
// jQuery Animations
// =============================================
$(document).ready(function() {

  // Fade in hero/page-header content on page load
  $('.hero-content').hide().fadeIn(1200);
  $('.page-header .section-inner').hide().fadeIn(1200);

  // Card hover lift using jQuery
  $('.card').on('mouseenter', function() {
    $(this).stop(true).animate({ marginTop: '-6px' }, 200);
  }).on('mouseleave', function() {
    $(this).stop(true).animate({ marginTop: '0px' }, 200);
  });

  // Scroll-based section fade-in using jQuery + IntersectionObserver
  var fadeSections = document.querySelectorAll('section');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        $(entry.target).animate({ opacity: 1 }, 600);
        $(entry.target).css('transform', 'translateY(0)');
      }
    });
  }, { threshold: 0.08 });

  fadeSections.forEach(function(section) {
    $(section).css({ opacity: 0, transform: 'translateY(24px)', transition: 'transform 0.6s ease' });
    observer.observe(section);
  });

});

// =============================================
// Character counter for message textarea
// =============================================
var messageBox = document.getElementById('message');
var charCount = document.getElementById('char-count');

if (messageBox) {
  messageBox.addEventListener('input', function() {
    var count = messageBox.value.length;
    charCount.textContent = count + ' / 500 characters';
    if (count >= 450) {
      charCount.style.color = '#ef4444';
    } else {
      charCount.style.color = '#94a3b8';
    }
  });
}

// =============================================
// Form validation
// =============================================
var form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var valid = true;

    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('phone-error').textContent = '';
    document.getElementById('subject-error').textContent = '';
    document.getElementById('message-error').textContent = '';

    $('input, select, textarea').css('border-color', '#e2e8f0');

    var nameField = document.getElementById('name');
    if (nameField.value.trim() === '') {
      document.getElementById('name-error').textContent = 'Please enter your full name.';
      $(nameField).css('border-color', '#ef4444');
      valid = false;
    }

    var emailField = document.getElementById('email');
    var email = emailField.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      document.getElementById('email-error').textContent = 'Please enter your email address.';
      $(emailField).css('border-color', '#ef4444');
      valid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById('email-error').textContent = 'Please enter a valid email address.';
      $(emailField).css('border-color', '#ef4444');
      valid = false;
    }

    var phoneField = document.getElementById('phone');
    var phone = phoneField.value.trim();
    var phonePattern = /^[0-9\s\+\-]{7,15}$/;
    if (phone !== '' && !phonePattern.test(phone)) {
      document.getElementById('phone-error').textContent = 'Please enter a valid phone number.';
      $(phoneField).css('border-color', '#ef4444');
      valid = false;
    }

    var subjectField = document.getElementById('subject');
    if (subjectField.value === '') {
      document.getElementById('subject-error').textContent = 'Please select a subject.';
      $(subjectField).css('border-color', '#ef4444');
      valid = false;
    }

    var messageField = document.getElementById('message');
    if (messageField.value.trim() === '') {
      document.getElementById('message-error').textContent = 'Please write a message before sending.';
      $(messageField).css('border-color', '#ef4444');
      valid = false;
    }

    // jQuery fadeOut form, fadeIn success message
    if (valid) {
      $(form).fadeOut(400, function() {
        $('#form-success').fadeIn(600);
      });
    }
  });
}