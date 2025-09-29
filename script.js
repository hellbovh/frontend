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
        const response = await fetch('http://localhost:5000/save', {
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