const SelfImprovementEngine = (() => {

    function identifyWeakAreas() {

        const weakTopics =
            MetaLearningEngine
            .findWeakTopics();

        const critic =
            SelfCriticEngine
            .evaluate();

        return {

            weakTopics,

            graphWarnings:
                critic.graphWarnings,

            insightWarnings:
                critic.insightWarnings,

            isolatedNodes:
                critic.isolatedNodes
        };
    }

    function generateActions() {

        const weaknesses =
            identifyWeakAreas();

        const actions =
            [];

        weaknesses.weakTopics
            .forEach(
                topic => {

                    actions.push({

                        type:
                            "learning",

                        target:
                            topic.topic,

                        action:
                            "Create learning plan"
                    });

                    actions.push({

                        type:
                            "knowledge",

                        target:
                            topic.topic,

                        action:
                            "Add knowledge entries"
                    });
                }
            );

        weaknesses.isolatedNodes
            .forEach(
                node => {

                    actions.push({

                        type:
                            "graph",

                        target:
                            node,

                        action:
                            "Create graph relations"
                    });
                }
            );

        weaknesses.graphWarnings
            .forEach(
                warning => {

                    actions.push({

                        type:
                            "graph",

                        action:
                            warning
                    });
                }
            );

        weaknesses.insightWarnings
            .forEach(
                warning => {

                    actions.push({

                        type:
                            "insight",

                        action:
                            warning
                    });
                }
            );

        return actions;
    }

    function createImprovementPlan() {

        const report =
            identifyWeakAreas();

        const actions =
            generateActions();

        return {

            timestamp:
                new Date()
                .toISOString(),

            improvementScore:
                calculateImprovementScore(),

            weaknesses:
                report,

            recommendedActions:
                actions
        };
    }

    function calculateImprovementScore() {

        const weakTopics =
            MetaLearningEngine
            .findWeakTopics();

        const critic =
            SelfCriticEngine
            .evaluate();

        let score =
            100;

        score -=
            weakTopics.length * 10;

        score -=
            critic.graphWarnings
            .length * 5;

        score -=
            critic.insightWarnings
            .length * 5;

        score -=
            critic.isolatedNodes
            .length * 3;

        return Math.max(
            score,
            0
        );
    }

    function summary() {

        const plan =
            createImprovementPlan();

        return {

            timestamp:
                plan.timestamp,

            score:
                plan.improvementScore,

            actions:
                plan.recommendedActions
                .length
        };
    }

    return {

        identifyWeakAreas,

        generateActions,

        createImprovementPlan,

        calculateImprovementScore,

        summary
    };

})();
