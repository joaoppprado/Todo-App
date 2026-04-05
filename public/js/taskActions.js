document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "edit") {
        const taskElement = btn.parentElement.parentElement;
    }
    if (action === "delete") {
        const confirmed = confirm("Do you want to delete this task?");
        if (confirmed) {
            try {
                const response = await fetch(`/delete/${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    window.location.reload();
                } else {
                    alert("Failed to delete the task. Server respond with an error.");
                }
            } catch (error) {
                console.error("Failed to delete:", error);
            }
        }
    }
});
