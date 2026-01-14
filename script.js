const WEBHOOK_URL = "TON_WEBHOOK_N8N_ICI";

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
