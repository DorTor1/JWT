let token = null;

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        document.getElementById('registerMessage').textContent = result.message || 'Ошибка регистрации';
        
        if (response.ok) {
            document.getElementById('registerMessage').style.color = 'green';
            document.getElementById('registerForm').reset();
        } else {
            document.getElementById('registerMessage').style.color = 'red';
        }
    } catch (error) {
        document.getElementById('registerMessage').textContent = 'Ошибка соединения с сервером';
        document.getElementById('registerMessage').style.color = 'red';
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (response.ok) {
            token = result.token;
            document.getElementById('loginMessage').textContent = 'Вход выполнен успешно!';
            document.getElementById('loginMessage').style.color = 'green';
            document.getElementById('loginForm').reset();
        } else {
            document.getElementById('loginMessage').textContent = result.message || 'Ошибка входа';
            document.getElementById('loginMessage').style.color = 'red';
        }
    } catch (error) {
        document.getElementById('loginMessage').textContent = 'Ошибка соединения с сервером';
        document.getElementById('loginMessage').style.color = 'red';
    }
});

document.getElementById('fetchProtectedData').addEventListener('click', async () => {
    if (!token) {
        document.getElementById('protectedData').textContent = 'Пожалуйста, войдите сначала';
        document.getElementById('protectedData').style.color = 'red';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/protected', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('protectedData').innerHTML = 
                'JWT токен:<br><code style="word-break: break-all; background-color: #f0f0f0; padding: 5px; display: block;">' + 
                token + 
                '</code><br>Ответ от сервера:<br>' + 
                JSON.stringify(result);
            document.getElementById('protectedData').style.color = 'green';
        } else {
            document.getElementById('protectedData').textContent = 'Доступ запрещен';
            document.getElementById('protectedData').style.color = 'red';
        }
    } catch (error) {
        document.getElementById('protectedData').textContent = 'Ошибка соединения с сервером';
        document.getElementById('protectedData').style.color = 'red';
    }
}); 