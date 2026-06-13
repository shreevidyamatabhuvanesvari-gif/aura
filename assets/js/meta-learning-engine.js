const MetaLearningEngine = (() => {

    function getKnownTopics() {

        try {

            return KnowledgeEngine
                .listTopics()
                .map(
                    topic =>
                        String(topic)
                        .toLowerCase()
                );

        } catch {

            return [];
        }
    }

    function getLearningPlan(topic) {

        try {

            return PlannerEngine
                .getPlan(topic);

        } catch {

            return null;
        }
    }

    function getMissingModules(topic) {

        const plan =
            getLearningPlan(topic);

        if (!plan) {

            return [];
        }

        return plan.steps
            .filter(
                step =>
                    !step.completed
            )
            .map(
                step =>
                    step.title
            );
    }

    function getCompletedModules(topic) {

        const plan =
            getLearningPlan(topic);

        if (!plan) {

            return [];
        }

        return plan.steps
            .filter(
                step =>
                    step.completed
            )
            .map(
                step =>
                    step.title
            );
    }

    function analyzeTopic(topic) {

        const progress =
            PlannerEngine
            .getProgress(topic);

        const memory =
            MemoryConsolidationEngine
            .calculateHealth(topic);

        return {

            topic,

            progress:
                progress
                    ? progress.progress
                    : 0,

            completedModules:
                getCompletedModules(
                    topic
                ),

            missingModules:
                getMissingModules(
                    topic
                ),

            memoryHealth:
                memory.score,

            entries:
                memory.entries
        };
    }

    function detectKnowledgeGaps() {

        const topics =
            getKnownTopics();

        return topics.map(
            topic =>
                analyzeTopic(
                    topic
                )
        );
    }

    function suggestNextLearning() {

        const gaps =
            detectKnowledgeGaps();

        const suggestions =
            [];

        gaps.forEach(item => {

            if (
                item.missingModules
                    .length > 0
            ) {

                suggestions.push({

                    topic:
                        item.topic,

                    nextModule:
                        item
                        .missingModules[0],

                    reason:
                        "Next unfinished module"
                });
            }
        });

        return suggestions;
    }

    function findWeakTopics() {

        const gaps =
            detectKnowledgeGaps();

        return gaps.filter(

            item =>

                item.progress < 50 ||

                item.memoryHealth < 80
        );
    }

    function calculateLearningScore() {

        const gaps =
            detectKnowledgeGaps();

        if (
            gaps.length === 0
        ) {

            return 0;
        }

        let total = 0;

        gaps.forEach(item => {

            total +=
                item.progress;
        });

        return Math.round(

            total /
            gaps.length
        );
    }

    function generateReport() {

        return {

            timestamp:
                new Date()
                .toISOString(),

            learningScore:
                calculateLearningScore(),

            knownTopics:
                getKnownTopics(),

            knowledgeGaps:
                detectKnowledgeGaps(),

            weakTopics:
                findWeakTopics(),

            nextLearning:
                suggestNextLearning()
        };
    }

    function summary() {

        const report =
            generateReport();

        return {

            timestamp:
                report.timestamp,

            learningScore:
                report.learningScore,

            topics:
                report.knownTopics
                    .length,

            weakTopics:
                report.weakTopics
                    .length,

            recommendations:
                report.nextLearning
                    .length
        };
    }

    return {

        generateReport,

        summary,

        detectKnowledgeGaps,

        suggestNextLearning,

        findWeakTopics,

        calculateLearningScore
    };

})();
