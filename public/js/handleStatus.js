const statusIndicators = document.querySelectorAll(".task__status-indicator");

statusIndicators.forEach((indicator) => {
    const task = indicator.closest(".task");
    if (!task) return;

    const id = task.dataset.id;
    indicator.addEventListener("click", async (event) => {
        event.stopPropagation();

        try {
            const response = await fetch(`/updateStatus/${id}`, {
                method: "PATCH",
            });

            if (!response.ok) {
                throw new Error("Failed to update task status");
            }

            window.location.reload();
        } catch (error) {
            console.error("Error updating task status:", error);
            alert("Não foi possível atualizar o status da tarefa.");
        }
    });
});
