const signinBtn = document.getElementById('signin-btn');
const signupBtn = document.getElementById('signup-btn');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const imageInputSection = document.getElementById('image-input-section');
const generatedImageContainer = document.getElementById('generated-image');

function showSigninForm() {
    signinForm.classList.add('active');
    signupForm.classList.remove('active');
    imageInputSection.classList.remove('active');
}

function showSignupForm() {
    signinForm.classList.remove('active');
    signupForm.classList.add('active');
    imageInputSection.classList.remove('active');
}

signinBtn.addEventListener('click', showSigninForm);
signupBtn.addEventListener('click', showSignupForm);

signupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
});

signinForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        console.log('Login successful');
        showImageInputSection();
    } else {
        console.log('Invalid email or password');
    }
});

function showImageInputSection() {
    signinForm.classList.remove('active');
    signupForm.classList.remove('active');
    imageInputSection.classList.add('active');
}

// Получаем форму для ввода описания и добавляем обработчик отправки формы
const imageInputForm = document.getElementById('image-input-section').querySelector('form');
imageInputForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    const imageDescription = document.getElementById('image-description').value.trim();
    if (imageDescription === '') {
        alert('Please enter image description');
        return;
    }

    // Вызываем функцию для отправки запроса на API для генерации изображения
    generateImage(imageDescription);
});

// Функция для отправки запроса на API для генерации изображения
function generateImage(description) {
    fetch('https://fal.run/fal-ai/fooocus', {
        method: 'POST',
        headers: {
            'Authorization': 'fd3cdb08-c865-45f2-8a7a-ab82bb5cf84d:b0f8734a55b19963cf28ae28b1d6ba88', // Замените YOUR_FAL_KEY на ваш ключ
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: description
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to generate image');
        }
        return response.json();
    })
    .then(data => {
        // Обработка ответа от API
        const imageUrl = data.imageUrl;
        // Отображаем сгенерированное изображение на странице
        generatedImageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while generating the image. Please try again later.');
    });
}

