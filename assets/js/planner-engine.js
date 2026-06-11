const PlannerEngine = (() => {

    function normalize(text) {

        return text
            .trim()
            .toLowerCase();
    }

    function getPresetPlan(goal) {

        const normalized =
            normalize(goal);

        if (
            normalized.includes("java")
        ) {

            return [

                "Java Basics",
                "Variables",
                "Data Types",
                "Operators",
                "Control Flow",
                "Methods",
                "OOP",
                "Collections",
                "Exception Handling",
                "File IO",
                "Multithreading",
                "JVM"
            ];
        }

        if (
            normalized.includes("python")
        ) {

            return [

                "Python Basics",
                "Variables",
                "Data Types",
                "Functions",
                "Modules",
                "OOP",
                "Exceptions",
                "File Handling",
                "Collections",
                "Async Programming"
            ];
        }

        return [

            "Research Topic",
            "Learn Fundamentals",
            "Learn Intermediate Concepts",
            "Learn Advanced Concepts",
            "Review Knowledge"
        ];
    }

    function createPlan(goal) {

        const tasks =
            getPresetPlan(goal);

        const plan = {

            id:
                crypto.randomUUID(),

            goal,

            createdAt:
                new Date()
                .toISOString(),

            status:
                "active",

            currentStep:
                1,

            totalSteps:
                tasks.length,

            steps:
                tasks.map(
                    (
                        task,
                        index
                    ) => ({

                        order:
                            index + 1,

                        title:
                            task,

                        completed:
                            false,

                        priority:
                            index + 1
                    })
                )
        };

        return plan;
    }

    function savePlan(plan) {

        return StorageEngine.save(

            "plan_" +
            normalize(
                plan.goal
            ),

            plan
        );
    }

    function createAndSave(goal) {

        const plan =
            createPlan(goal);

        savePlan(plan);

        return plan;
    }

    function getPlan(goal) {

        return StorageEngine.load(

            "plan_" +
            normalize(goal)
        );
    }

    function completeStep(
        goal,
        stepNumber
    ) {

        const plan =
            getPlan(goal);

        if (!plan) {
            return false;
        }

        const step =
            plan.steps.find(

                item =>
                    item.order ===
                    stepNumber
            );

        if (!step) {
            return false;
        }

        step.completed =
            true;

        const nextStep =
            plan.steps.find(

                item =>
                    !item.completed
            );

        if (nextStep) {

            plan.currentStep =
                nextStep.order;
        }

        savePlan(plan);

        return true;
    }

    function getProgress(goal) {

        const plan =
            getPlan(goal);

        if (!plan) {

            return null;
        }

        const completed =
            plan.steps.filter(

                item =>
                    item.completed
            ).length;

        return {

            goal:
                plan.goal,

            completed,

            total:
                plan.steps.length,

            progress:
                Math.round(
                    (
                        completed /
                        plan.steps.length
                    ) * 100
                ),

            currentStep:
                plan.currentStep
        };
    }

    function getCurrentStep(goal) {

        const plan =
            getPlan(goal);

        if (!plan) {

            return null;
        }

        return plan.steps.find(

            item =>
                item.order ===
                plan.currentStep
        );
    }

    function listSteps(goal) {

        const plan =
            getPlan(goal);

        if (!plan) {

            return [];
        }

        return plan.steps;
    }

    return {

        createPlan,

        createAndSave,

        getPlan,

        completeStep,

        getProgress,

        getCurrentStep,

        listSteps
    };

})();
