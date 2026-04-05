document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const task = btn.closest(".task");
    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "edit") {
        const taskView = task.querySelector(".task__view");
        const editView = task.querySelector(".task__edit-view");
        taskView.classList.add("hidden");
        editView.classList.remove("hidden");

        const form = editView.querySelector(".edit-view__form");
        const currentTitle = taskView.querySelector(".task__title").textContent;
        const currentDescription = taskView.querySelector(".task__description").textContent;
        form.querySelector(`input[name="title"]`).value = currentTitle.trim();
        form.querySelector(`input[name="description"]`).value = currentDescription.trim();

        form.onsubmit = async (SubmitEvent) => {
            SubmitEvent.preventDefault();
            const formData = new FormData(form);
            const updatedData = {
                title: formData.get("title"),
                description: formData.get("description"),
            };

            try {
                const response = await fetch(`/edit/${id}`, {
                    method: "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(updatedData),
                });
                if (response.ok) {
                    window.location.reload();
                } else {
                    alert("Failed to edit task");
                }
            } catch (error) {
                console.error("Error - Failed to edit task:", error);
            }
        };
        const cancelBtn = form.querySelector(".edit-view__btn--cancel");
        cancelBtn.onclick = () => {
            taskView.classList.remove("hidden");
            editView.classList.add("hidden");
            form.onsubmit = null;
        };
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
                alert("An error occurred while trying to delete the task.");
            }
        }
    }
});
