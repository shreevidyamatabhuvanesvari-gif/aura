const LearningEngine = (() => {

    function normalizeTopic(topic) {

        return topic
            .trim()
            .toLowerCase();
    }

    function getLearningKey(topic) {

        return (
            "learning_" +
            normalizeTopic(topic)
        );
    }

    function getDefaultModules(topic) {

        const normalized =
            normalizeTopic(topic);

        const presets = {

            java: [
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
            ],

            python: [
                "Python Basics",
                "Variables",
                "Data Types",
                "Functions",
                "Modules",
                "OOP",
                "File Handling",
                "Exceptions",
                "Collections",
                "Async Programming"
            ]
        };

        return presets[
            normalized
        ] || [
            "Introduction",
            "Core Concepts",
            "Intermediate Concepts",
            "Advanced Concepts"
        ];
    }

    function createPlan(topic) {

        const existing =
            getPlan(topic);

        if (existing) {

            return {
                success: true,
                exists: true,
                plan: existing
            };
        }

        const modules =
            getDefaultModules(
                topic
            );

        const plan = {

            topic:
                normalizeTopic(
                    topic
                ),

            createdAt:
                new Date()
                .toISOString(),

            progress: 0,

            completedModules: 0,

            totalModules:
                modules.length,

            modules:
                modules.map(
                    module => ({
                        name: module,
                        completed: false
                    })
                )
        };

        StorageEngine.save(
            getLearningKey(
                topic
            ),
            plan
        );

        return {

            success: true,
            exists: false,
            plan
        };
    }

    function getPlan(topic) {

        return StorageEngine.load(
            getLearningKey(
                topic
            )
        );
    }

    function completeModule(
        topic,
        moduleName
    ) {

        const plan =
            getPlan(topic);

        if (!plan) {
            return false;
        }

        const module =
            plan.modules.find(
                item =>
                    item.name ===
                    moduleName
            );

        if (!module) {
            return false;
        }

        module.completed =
            true;

        const completed =
            plan.modules.filter(
                item =>
                    item.completed
            ).length;

        plan.completedModules =
            completed;

        plan.progress =
            Math.round(
                (
                    completed /
                    plan.totalModules
                ) * 100
            );

        StorageEngine.save(
            getLearningKey(
                topic
            ),
            plan
        );

        return true;
    }

    function listModules(topic) {

        const plan =
            getPlan(topic);

        if (!plan) {
            return [];
        }

        return plan.modules;
    }

    function getProgress(topic) {

        const plan =
            getPlan(topic);

        if (!plan) {

            return {
                progress: 0
            };
        }

        return {

            topic:
                plan.topic,

            progress:
                plan.progress,

            completedModules:
                plan.completedModules,

            totalModules:
                plan.totalModules
        };
    }

    return {

        createPlan,

        getPlan,

        completeModule,

        listModules,

        getProgress
    };

})();
