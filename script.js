// Select elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to add a message to the chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    
    // Allow HTML in bot messages for nicer formatting
    messageDiv.innerHTML = text; 
    
    chatBox.appendChild(messageDiv);
    // Auto scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to handle the Logic
function handleInput() {
    const text = userInput.value.trim();
    if (text === "") return;

    // 1. Show User Message
    addMessage(text, 'user');
    userInput.value = '';

    // 2. Process Math (Simulating AI)
    setTimeout(() => {
        try {
            // "math" is provided by the math.js library we loaded in HTML
            const result = math.evaluate(text);
            
            // Format the output nicely
            addMessage(`Result: <strong>${result}</strong>`, 'bot');
        } catch (error) {
            addMessage(`🤔 I couldn't solve that directly. Try checking your syntax! <br><br><i>Error: ${error.message}</i>`, 'bot');
        }
    }, 500); // Small delay to feel like "thinking"
}

// Event Listeners (Click and Enter key)
sendBtn.addEventListener('click', handleInput);

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleInput();
    }
});