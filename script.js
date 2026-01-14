const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const WEBHOOK_URL = "https://theoia2.app.n8n.cloud/webhook-test/a636b7eb-4d91-4014-a6e3-2c0d1996c63b";

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

        addMessage(data.reply, "bot");

    } catch (error) {
        addMessage("Erreur de connexion au serveur", "bot");
        console.error(error);
    }
});
