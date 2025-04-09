async function sendMessage() {
    const input = document.getElementById('userInput');
    const chatbox = document.getElementById('chatbox');
    const message = input.value.trim();
  
    if (!message) return;
  
    // Show user message
    chatbox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    input.value = '';
  
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
  
      const data = await response.json();
      chatbox.innerHTML += `<p><strong>GPT:</strong> ${data.reply}</p>`;
      chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
      chatbox.innerHTML += `<p style="color:red;"><strong>Error:</strong> ${error.message}</p>`;
    }
  }
  