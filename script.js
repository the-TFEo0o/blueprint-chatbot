const actionPanel = document.getElementById("action-panel");
const panelTitle = document.getElementById("panel-title");
const generateBtn = document.getElementById("generate-btn");
const addBtn = document.getElementById("add-btn");
const textarea = document.getElementById("panel-textarea");

/* OUVERTURE PANEL */
function openPanel(type) {
    actionPanel.classList.remove("hidden");
    textarea.classList.add("hidden");

    if (type === "routine") {
        panelTitle.textContent = "My Routine";
        generateBtn.onclick = () => sendMessage("Generate my routine");
        textarea.placeholder = "Paste or write your routine here...";
    }

    if (type === "buy") {
        panelTitle.textContent = "To Buy";
        generateBtn.onclick = () => sendMessage("Generate things to buy");
        textarea.placeholder = "Paste or write your shopping list here...";
    }

    if (type === "todo") {
        panelTitle.textContent = "To Do";
        generateBtn.onclick = () => sendMessage("Generate my to-do list");
        textarea.placeholder = "Paste or write your to-do list here...";
    }
}

/* TOGGLE TEXTAREA */
addBtn.onclick = () => {
    textarea.classList.toggle("hidden");
};
