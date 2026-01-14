const WEBHOOK_URL = "https://theoia2.app.n8n.cloud/webhook-test/a636b7eb-4d91-4014-a6e3-2c0d1996c63b";

const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

/* ===== UI ===== */
function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* ===== CORE SEND FUNCTION ===== */
async function sendMessage(message) {
    if (!message) return;

    addMessage(message, "user");

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message   // 👈 on garde EXACTEMENT ça
            })
        });

        const text = await response.text();
        addMessage(text, "bot");

    } catch (error) {
        addMessage("Erreur de connexion au serveur", "bot");
        console.error(error);
    }
}

/* ===== FORM SUBMIT ===== */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = input.value.trim();
    input.value = "";
    sendMessage(message);
});

/* ===== BOUTONS ===== */
function generateRoutine() {
    sendMessage("Generate my routine");
}

function generateToBuy() {
    sendMessage("Generate things to buy");
}

function generateTodo() {
    sendMessage("Generate my to-do list");
}

