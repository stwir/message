// Get elements
const messageText = document.getElementById('messageText');
const sendBtn = document.getElementById('sendBtn');
const messagesList = document.getElementById('messagesList');

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Display existing messages on load
displayMessages();

// Send message event
sendBtn.addEventListener('click', sendMessage);
messageText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const text = messageText.value.trim();
    
    if (text === '') {
        return;
    }
    
    const message = {
        content: text,
        timestamp: new Date().toISOString()
    };
    
    messages.unshift(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    messageText.value = '';
    displayMessages();
}

function displayMessages() {
    messagesList.innerHTML = '';
    
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = message.content;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = formatTime(message.timestamp);
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        messagesList.appendChild(messageDiv);
    });
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // Less than a minute
    if (diff < 60000) {
        return 'Just now';
    }
    
    // Less than an hour
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    
    // Less than a day
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    // Otherwise show date and time
    return date.toLocaleString();
}
