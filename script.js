function sendMessage() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    
    if (username === '' || message === '') {
        alert('Username and message cannot be empty!');
        return;
    }

    const chatWindow = document.getElementById('output');
    const userMessage = document.createElement('div');
    userMessage.classList.add('message');
    userMessage.innerHTML = `<strong>${username}</strong>: ${message} <button class="delete" onclick="deleteMessage(this)">X</button>`;
    chatWindow.appendChild(userMessage);

 
    document.getElementById('message').value = '';

    
    chatWindow.scrollTop = chatWindow.scrollHeight;


    setTimeout(() => {
        botReply(chatWindow);
    }, 1000);

    saveMessages();
}

function botReply(chatWindow) {
    const botMessage = document.createElement('div');
    botMessage.classList.add('message');
    botMessage.innerHTML = `<strong>Bot</strong>: ${generateBotResponse()} <button class="delete" onclick="deleteMessage(this)">X</button>`;
    chatWindow.appendChild(botMessage);


    chatWindow.scrollTop = chatWindow.scrollHeight;

    saveMessages();
}

function generateBotResponse() {
    const responses = [
        "Hello! How can I assist you today?",
        "That's interesting! Tell me more.",
        "I'm here to help. What do you need?",
        "Can you elaborate on that?",
        "I see. Do you have any other questions?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function deleteMessage(button) {
    const message = button.parentElement;
    message.remove();
    saveMessages();
}

function sendImage() {
    document.getElementById('image-input').click();
}

document.getElementById('image-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const username = document.getElementById('username').value;
        if (username === '') {
            alert('Username cannot be empty!');
            return;
        }
        
        const chatWindow = document.getElementById('output');
        const userMessage = document.createElement('div');
        userMessage.classList.add('message');
        userMessage.innerHTML = `<strong>${username}</strong>: <img src="${e.target.result}" alt="Sent Image" width="100" /> <button class="delete" onclick="deleteMessage(this)">X</button>`;
        chatWindow.appendChild(userMessage);

     
        chatWindow.scrollTop = chatWindow.scrollHeight;

        saveMessages();
    }
    reader.readAsDataURL(file);
});


function saveMessages() {
    const chatWindow = document.getElementById('output');
    const messages = Array.from(chatWindow.getElementsByClassName('message')).map(msg => {
        const [username, ...messageParts] = msg.innerText.split(': ');
        return { username, message: messageParts.join(': ') };
    });

    localStorage.setItem('chatMessages', JSON.stringify(messages));
}


window.onload = function() {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    const chatWindow = document.getElementById('output');

    savedMessages.forEach(msg => {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `<strong>${msg.username}</strong>: ${msg.message} <button class="delete" onclick="deleteMessage(this)">X</button>`;
        chatWindow.appendChild(newMessage);
    });

    chatWindow.scrollTop = chatWindow.scrollHeight;
};
