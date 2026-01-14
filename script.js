document.addEventListener("DOMContentLoaded", () => {

    const WEBHOOK_URL = "https://theoia2.app.n8n.cloud/webhook-test/a636b7eb-4d91-4014-a6e3-2c0d1996c63b";

    const chatBox = document.getElementById("chat-box");
    const form = document.getElementById("chat-form");
    const input = document.getElementById("user-input");

    const actionPanel = document.getElementById("action-panel");
    const panelTitle = document.getElementById("panel-title");
    const generateBtn = document.getElementById("panel-generate-btn");
    const addBtn = document.getElementById("panel-add-btn");
    const textarea = document.getElementById("panel-textarea");

    const btnRoutine = document.getElementById("btn-routine");
    const btnBuy = document.getElementById("btn-buy");
    const btnTodo = document.getElementById("btn-todo");

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const text = await response.text();
            addMessage(text, "bot");

        } catch (error) {
            addMessage("Erreur de connexion au serveur", "bot");
            console.error(error);
        }
    }

    /* ===== CHAT SUBMIT ===== */
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = input.value.trim();
        input.value = "";
        sendMessage(message);
    });

    /* ===== PANEL LOGIC ===== */
    function openPanel(type) {
        actionPanel.classList.remove("hidden");
        textarea.classList.add("hidden");

        if (type === "routine") {
            panelTitle.textContent = "My Routine";
            generateBtn.textContent = "Generate routine";
            generateBtn.onclick = () => sendMessage("Generate my routine");
            textarea.placeholder = "Paste or write your routine here...";
        }

        if (type === "buy") {
            panelTitle.textContent = "To Buy";
            generateBtn.textContent = "Generate list";
            generateBtn.onclick = () => sendMessage("Generate things to buy");
            textarea.placeholder = "Paste or write your shopping list here...";
        }

        if (type === "todo") {
            panelTitle.textContent = "To Do";
            generateBtn.textContent = "Generate to-do list";
            generateBtn.onclick = () => sendMessage("Generate my to-do list");
            textarea.placeholder = "Paste or write your to-do list here...";
        }

        /* 🔥 FIX VISIBILITÉ */
        actionPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    addBtn.addEventListener("click", () => {
        textarea.classList.toggle("hidden");
    });

    btnRoutine.addEventListener("click", () => openPanel("routine"));
    btnBuy.addEventListener("click", () => openPanel("buy"));
    btnTodo.addEventListener("click", () => openPanel("todo"));
});


