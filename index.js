document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const formButton = document.getElementById('form-button');
  
    const validators = {
      'first-name': validateName,
      'last-name': validateName,
      'email': validateEmail,
      'password': validatePassword,
      'password-confirm': validatePasswordConfirm,
      'birth-day': validateBirthDay
    };
  
    form.addEventListener('input', () => {
      let isValid = true;
  
      for (const field in validators) {
        const input = document.getElementById(field);
        const errorDiv = document.getElementById(`${field}-error`);
        const valid = validators[field](input.value);
  
        if (valid) {
          input.classList.remove('invalid');
          input.classList.add('valid');
          errorDiv.textContent = '';
        } else {
          input.classList.remove('valid');
          input.classList.add('invalid');
          errorDiv.textContent = getErrorMessage(field);
          isValid = false;
        }
      }
  
      formButton.disabled = !isValid;
    });
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!formButton.disabled) {
        alert('Форма успешно отправлена!');
      }
    });
  
    function validateName(name) {
      return /^[a-zA-Zа-яА-Я\s]{1,50}$/.test(name);
    }
  
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function validatePassword(password) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password);
    }
  
    function validatePasswordConfirm(passwordConfirm) {
      const password = document.getElementById('password').value;
      return passwordConfirm === password && validatePassword(passwordConfirm);
    }
  
    function validateBirthDay(birthDay) {
      const date = new Date(birthDay);
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 18;
    }
  
    function getErrorMessage(field) {
      switch (field) {
        case 'first-name':
        case 'last-name':
          return 'Имя и фамилия должны содержать только буквы и быть длиной от 1 до 50 символов.';
        case 'email':
          return 'Введите корректный email адрес.';
        case 'password':
          return 'Пароль должен содержать не менее 8 символов, включая хотя бы одну цифру, одну заглавную и строчную буквы, и один специальный символ.';
        case 'password-confirm':
          return 'Пароли не совпадают.';
        case 'birth-day':
          return 'Вам должно быть не менее 18 лет.';
        default:
          return 'Это поле обязательно для заполнения.';
      }
    }
  });
  