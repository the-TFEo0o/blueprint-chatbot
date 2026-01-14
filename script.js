const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const WEBHOOK_URL = "https://TON-N8N/webhook/chatbot";

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = input.value;
    input.value = "";

    addMessage(message, "user");

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        addMessage(data.reply || "Pas de réponse du bot", "bot");

    } catch (error) {
        addMessage("Erreur de connexion au serveur", "bot");
        console.error(error);
    }
});
