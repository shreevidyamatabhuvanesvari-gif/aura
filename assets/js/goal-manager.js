const GoalManager = (() => {

    const STORAGE_KEY =
        "aura_goals";

    function loadGoals() {

        const goals =
            StorageEngine.load(
                STORAGE_KEY
            );

        return Array.isArray(
            goals
        )
            ? goals
            : [];
    }

    function saveGoals(
        goals
    ) {

        StorageEngine.save(
            STORAGE_KEY,
            goals
        );

        return true;
    }

    function generateId() {

        return crypto
            .randomUUID();
    }

    function createGoal(
        title,
        priority = 5
    ) {

        const goals =
            loadGoals();

        const goal = {

            id:
                generateId(),

            title:
                String(title)
                .trim(),

            priority:
                Number(priority),

            status:
                "active",

            createdAt:
                new Date()
                .toISOString(),

            completedAt:
                null
        };

        goals.push(goal);

        saveGoals(goals);

        return goal;
    }

    function listGoals() {

        return loadGoals()
            .sort(
                (a, b) =>
                    a.priority -
                    b.priority
            );
    }

    function getGoal(
        id
    ) {

        return loadGoals()
            .find(
                goal =>
                    goal.id ===
                    id
            ) || null;
    }

    function completeGoal(
        id
    ) {

        const goals =
            loadGoals();

        const goal =
            goals.find(
                item =>
                    item.id ===
                    id
            );

        if (!goal) {

            return false;
        }

        goal.status =
            "completed";

        goal.completedAt =
            new Date()
            .toISOString();

        saveGoals(goals);

        return true;
    }

    function deleteGoal(
        id
    ) {

        const goals =
            loadGoals();

        const filtered =
            goals.filter(
                goal =>
                    goal.id !==
                    id
            );

        saveGoals(
            filtered
        );

        return true;
    }

    function updatePriority(
        id,
        priority
    ) {

        const goals =
            loadGoals();

        const goal =
            goals.find(
                item =>
                    item.id ===
                    id
            );

        if (!goal) {

            return false;
        }

        goal.priority =
            Number(priority);

        saveGoals(goals);

        return true;
    }

    function getActiveGoals() {

        return loadGoals()
            .filter(
                goal =>
                    goal.status ===
                    "active"
            )
            .sort(
                (a, b) =>
                    a.priority -
                    b.priority
            );
    }

    function getCompletedGoals() {

        return loadGoals()
            .filter(
                goal =>
                    goal.status ===
                    "completed"
            );
    }

    function getStats() {

        const goals =
            loadGoals();

        const active =
            goals.filter(
                goal =>
                    goal.status ===
                    "active"
            ).length;

        const completed =
            goals.filter(
                goal =>
                    goal.status ===
                    "completed"
            ).length;

        return {

            total:
                goals.length,

            active,

            completed
        };
    }

    function getTopGoal() {

        const active =
            getActiveGoals();

        return active.length
            ? active[0]
            : null;
    }

    return {

        createGoal,

        listGoals,

        getGoal,

        completeGoal,

        deleteGoal,

        updatePriority,

        getActiveGoals,

        getCompletedGoals,

        getStats,

        getTopGoal
    };

})();
