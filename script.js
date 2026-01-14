const WEBHOOK_URL = "https://theoia2.app.n8n.cloud/webhook-test/a636b7eb-4d91-4014-a6e3-2c0d1996c63b";

let currentSection = null;

const panel = document.getElementById("super-panel");
const panelTitle = document.getElementById("panel-title");
const panelContent = document.getElementById("panel-content");
const actionBtn = document.getElementById("panel-action-btn");

/* ===== OPEN SECTION ===== */
function openSection(section) {
    currentSection = section;
    panel.classList.remove("hidden");

    if (section === "routine") panelTitle.textContent = "My Routine";
    if (section === "buy") panelTitle.textContent = "Things to Buy";
    if (section === "todo") panelTitle.textContent = "To Do List";

    panelContent.innerHTML = `<p class="empty">Loading...</p>`;
    actionBtn.textContent = "Add";

    loadSection();
}

/* ===== LOAD EXISTING DATA ===== */
async function loadSection() {
    let prompt = "";

    if (currentSection === "routine") prompt = "Generate my routine";
    if (currentSection === "buy") prompt = "Generate things to buy";
    if (currentSection === "todo") prompt = "Generate my to-do list";

    const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt })
    });

    const text = await res.text();

    if (text && text.trim().length > 0) {
        panelContent.textContent = text;
        actionBtn.textContent = "Update";
    } else {
        panelContent.innerHTML = `<p class="empty">No data yet.</p>`;
        actionBtn.textContent = "Add";
    }
}

/* ===== ADD / UPDATE ===== */
async function handleAction() {
    let prompt = "";

    if (currentSection === "routine") prompt = "Generate my routine";
    if (currentSection === "buy") prompt = "Generate things to buy";
    if (currentSection === "todo") prompt = "Generate my to-do list";

    panelContent.textContent = "Updating...";

    const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt })
    });

    const text = await res.text();
    panelContent.textContent = text;
    actionBtn.textContent = "Update";
}
