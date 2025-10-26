const BACKEND_URL = 'http://backend:5000'

async function sendData() {
    const input = document.getElementById('dataInput');
    const statusMessage = document.getElementById('statusMessage');
    const data = input.value.trim();

    if (!data) {
        statusMessage.textContent = 'Пожалуйста, введите текст';
        statusMessage.style.color = 'red';
        return;
    }

    try {
        const response = await fetch('${BACKEND_URL}/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: data })
        });

        const result = await response.json();

        if (result.status === 'success') {
            statusMessage.textContent = 'Данные успешно отправлены!';
            statusMessage.style.color = 'green';
            input.value = '';
        } else {
            statusMessage.textContent = 'Ошибка: ' + result.message;
            statusMessage.style.color = 'red';
        }
    } catch (error) {
        statusMessage.textContent = 'Ошибка соединения с сервером';
        statusMessage.style.color = 'red';
        console.error('Error:', error);
    }
}

async function loadData() {
    const output = document.getElementById('output');
    const statusMessage = document.getElementById('statusMessage');

    try {
        const response = await fetch('${BACKEND_URL}/read');
        const result = await response.json();

        if (result.status === 'success') {
            if (result.data.length === 0) {
                output.innerHTML = '<em>Нет данных</em>';
            } else {
                output.innerHTML = '<strong>Данные из файла:</strong><br>' + 
                    result.data.join('<br>');
            }
            statusMessage.textContent = 'Данные успешно загружены!';
            statusMessage.style.color = 'green';
        } else {
            output.innerHTML = '';
            statusMessage.textContent = 'Ошибка: ' + result.message;
            statusMessage.style.color = 'red';
        }
    } catch (error) {
        output.innerHTML = '';
        statusMessage.textContent = 'Ошибка соединения с сервером';
        statusMessage.style.color = 'red';
        console.error('Error:', error);
    }
}