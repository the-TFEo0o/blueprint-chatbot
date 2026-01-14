const WEBHOOK_URL = "https://theoia2.app.n8n.cloud/webhook-test/a636b7eb-4d91-4014-a6e3-2c0d1996c63b";

const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

/* ===== ENVOI MANUEL ===== */
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    sendPrompt(input.value);
    input.value = "";
});

/* ===== ENVOI VIA BOUTONS ===== */
async function sendPrompt(prompt) {
    if (!prompt) return;

    chatBox.innerHTML += `<div class="user">${prompt}</div>`;

    const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt: prompt
        })
    });

    const data = await res.json();

    chatBox.innerHTML += `<div class="bot">${data.response || JSON.stringify(data)}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
