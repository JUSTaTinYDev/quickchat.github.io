const validUsers = {
    noahM: "noahpass1",
    callumR: "callumpass1",
    lucaM: "fatboi"
};

const adminUsers = {
    loganH: "loganpass1",
    shaneT: "shanepass1"
};

let currentUser = '';
let isAdmin = false;

document.getElementById('login-button').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (validUsers[username] && validUsers[username] === password) {
        currentUser = username; // Store the current user
        isAdmin = false; // Regular user
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'flex';
    } else if (adminUsers[username] && adminUsers[username] === password) {
        currentUser = username; // Store the current user
        isAdmin = true; // Admin user
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'flex';
        document.getElementById('admin-controls').style.display = 'block'; // Show admin controls
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});

// Timeout functionality
const timeoutUsers = {};

document.getElementById('send-button').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const messagesDiv = document.getElementById('messages');

    if (messageInput.value) {
        if (isAdmin) {
            // Admin can send messages
            const message = document.createElement('div');
            message.textContent = `${currentUser} (Admin): ${messageInput.value}`;
            messagesDiv.appendChild(message);
        } else if (!timeoutUsers[currentUser]) {
            // Regular user can send messages if not timed out
            const message = document.createElement('div');
            message.textContent = `${currentUser}: ${messageInput.value}`;
            messagesDiv.appendChild(message);
        }
        messageInput.value = '';
    }
});

// Admin timeout function
function timeoutUser(username) {
    timeoutUsers[username] = true; // Mark user as timed out
    setTimeout(() => {
        delete timeoutUsers[username]; // Remove timeout after 30 seconds
    }, 30000); // Timeout duration (30 seconds)
}

// Example of how to timeout a user
document.getElementById('timeout-button').addEventListener('click', function() {
    const usernameToTimeout = document.getElementById('timeout-username').value;
    if (validUsers[usernameToTimeout]) {
        timeoutUser(usernameToTimeout);
        alert(`${usernameToTimeout} has been timed out for 30 seconds.`);
    } else {
        alert('User not found.');
    }
});document.getElementById('send-button').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const messagesDiv = document.getElementById('messages');

    if (messageInput.value) {
        const message = document.createElement('div');
        if (isAdmin) {
            message.innerHTML = `<span class="admin-tag">Admin: ✨</span> ${messageInput.value}`; // Add admin tag with sparkle
        } else {
            message.textContent = `${currentUser}: ${messageInput.value}`;
        }
        messagesDiv.appendChild(message);
        messageInput.value = '';
    }

});