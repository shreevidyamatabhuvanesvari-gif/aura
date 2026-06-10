const TaskManager = (() => {

    const STORAGE_KEY = "aura_tasks";

    function loadTasks() {

        try {

            const data =
                localStorage.getItem(STORAGE_KEY);

            if (!data) {
                return [];
            }

            const tasks = JSON.parse(data);

            return Array.isArray(tasks)
                ? tasks
                : [];

        } catch (error) {

            console.error(
                "TaskManager.loadTasks",
                error
            );

            return [];
        }
    }

    function saveTasks(tasks) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(tasks)
            );

            return true;

        } catch (error) {

            console.error(
                "TaskManager.saveTasks",
                error
            );

            return false;
        }
    }

    function addTask(task) {

        const tasks =
            loadTasks();

        tasks.push(task);

        saveTasks(tasks);

        return task;
    }

    function getTaskById(id) {

        const tasks =
            loadTasks();

        return tasks.find(
            task => task.id === id
        ) || null;
    }

    function getAllTasks() {

        return loadTasks();
    }

    function deleteTask(id) {

        const tasks =
            loadTasks();

        const filtered =
            tasks.filter(
                task => task.id !== id
            );

        saveTasks(filtered);

        return true;
    }

    function clearTasks() {

        localStorage.removeItem(
            STORAGE_KEY
        );

        return true;
    }

    function getStats() {

        const tasks =
            loadTasks();

        return {

            totalTasks:
                tasks.length,

            acceptedTasks:
                tasks.filter(
                    task =>
                        task.status ===
                        "accepted"
                ).length,

            completedTasks:
                tasks.filter(
                    task =>
                        task.status ===
                        "completed"
                ).length
        };
    }

    return {

        addTask,

        getTaskById,

        getAllTasks,

        deleteTask,

        clearTasks,

        getStats
    };

})();
