document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const fullNameError = document.getElementById('fullNameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  const successMessage = document.getElementById('successMessage');

  // Check if email is valid
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Validate Full Name
  function validateFullName() {
    const value = fullNameInput.value.trim();
    const formGroup = fullNameInput.closest('.form-group');

    if (value === '') {
      showError(formGroup, fullNameError, 'Full name is required');
      return false;
    } else if (value.length < 2) {
      showError(formGroup, fullNameError, 'Full name must be at least 2 characters');
      return false;
    } else {
      hideError(formGroup, fullNameError);
      return true;
    }
  }

  // Validate Email
  function validateEmail() {
    const value = emailInput.value.trim();
    const formGroup = emailInput.closest('.form-group');

    if (value === '') {
      showError(formGroup, emailError, 'Email is required');
      return false;
    } else if (!isValidEmail(value)) {
      showError(formGroup, emailError, 'Please enter a valid email (e.g., name@example.com)');
      return false;
    } else {
      hideError(formGroup, emailError);
      return true;
    }
  }

//   Validate Subject
  function validateSubject() {
    const value = subjectInput.value.trim();
    const formGroup = subjectInput.closest('.form-group');

    if (value === '') {
      showError(formGroup, subjectError, 'Subject is required');
      return false;
    } else if (value.length < 3) {
      showError(formGroup, subjectError, 'Subject must be at least 3 characters');
      return false;
    } else {
      hideError(formGroup, subjectError);
      return true;
    }
  }

  // Validate Message
  function validateMessage() {
    const value = messageInput.value.trim();
    const formGroup = messageInput.closest('.form-group');

    if (value === '') {
      showError(formGroup, messageError, 'Message is required');
      return false;
    } else if (value.length < 10) {
      showError(formGroup, messageError, 'Message must be at least 10 characters');
      return false;
    } else {
      hideError(formGroup, messageError);
      return true;
    }
  }

  // Show error
  function showError(formGroup, errorElement, message) {
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }

  // Hide error
  function hideError(formGroup, errorElement) {
    formGroup.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
  }

  // Clear on input
  function clearErrorOnInput(input, errorElement) {
    const formGroup = input.closest('.form-group');
    hideError(formGroup, errorElement);
  }

  // Blur validation
  fullNameInput.addEventListener('blur', validateFullName);
  emailInput.addEventListener('blur', validateEmail);
  subjectInput.addEventListener('blur', validateSubject);
  messageInput.addEventListener('blur', validateMessage);

  // Input clearing
  fullNameInput.addEventListener('input', () => clearErrorOnInput(fullNameInput, fullNameError));
  emailInput.addEventListener('input', () => clearErrorOnInput(emailInput, emailError));
  subjectInput.addEventListener('input', () => clearErrorOnInput(subjectInput, subjectError));
  messageInput.addEventListener('input', () => clearErrorOnInput(messageInput, messageError));

  // Submit validation
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    successMessage.classList.remove('show');
    successMessage.textContent = '';

    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      successMessage.textContent = '✓ Your message has been sent successfully! I\'ll get back to you soon.';
      successMessage.classList.add('show');
      contactForm.reset();

      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        successMessage.classList.remove('show');
        successMessage.textContent = '';
      }, 5000);
    } else {
      const firstError = contactForm.querySelector('.form-group.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const firstInput = firstError.querySelector('input, textarea');
        if (firstInput) firstInput.focus();
      }
    }
  });
});
