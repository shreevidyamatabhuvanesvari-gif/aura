(() => {

    function registerLearn() {

        CommandRegistry.register(

            "learn",

            payload => {

                const target =
                    payload.target;

                const knowledge =
                    KnowledgeEngine
                    .registerTopic(
                        target
                    );

                const learningPlan =
                    LearningEngine
                    .createPlan(
                        target
                    );

                return {

                    success: true,

                    knowledge,

                    learningPlan
                };
            }
        );
    }

    function registerTopics() {

        CommandRegistry.register(

            "topics",

            () => ({

                success: true,

                topics:
                    KnowledgeEngine
                    .listTopics()
            })
        );
    }

    function registerKnowledge() {

        CommandRegistry.register(

            "knowledge",

            payload => ({

                success: true,

                entries:
                    KnowledgeImportEngine
                    .getEntries(
                        payload.topic
                    )
            })
        );
    }

    function registerImport() {

        CommandRegistry.register(

            "import",

            payload => ({

                success: true,

                importResult:
                    KnowledgeImportEngine
                    .importText(

                        payload.topic,

                        payload.content,

                        "command"
                    )
            })
        );
    }

    function registerGraph() {

        CommandRegistry.register(

            "graph",

            payload => {

                KnowledgeGraphEngine
                    .addRelation(

                        payload.source,

                        payload.relation,

                        payload.target
                    );

                return {

                    success: true,

                    relationAdded: true
                };
            }
        );
    }

    function registerGraphStats() {

        CommandRegistry.register(

            "graphstats",

            () => ({

                success: true,

                graph:
                    KnowledgeGraphEngine
                    .stats()
            })
        );
    }

    function registerGraphInsights() {

        CommandRegistry.register(

            "graphinsights",

            () => ({

                success: true,

                insights:
                    KnowledgeGraphEngine
                    .findCommonTargets()
            })
        );
    }

    function registerCompare() {

        CommandRegistry.register(

            "compare",

            payload => ({

                success: true,

                comparison:
                    ReasoningEngine
                    .compareNodes(

                        payload.nodeA,

                        payload.nodeB
                    )
            })
        );
    }

    function registerRelated() {

        CommandRegistry.register(

            "related",

            payload => ({

                success: true,

                related:
                    ReasoningEngine
                    .findRelatedNodes(

                        payload.node
                    )
            })
        );
    }

    function registerInsights() {

        CommandRegistry.register(

            "insights",

            () => ({

                success: true,

                insights:
                    ReasoningEngine
                    .generateInsights()
            })
        );
    }

    function registerReason() {

        CommandRegistry.register(

            "reason",

            () => ({

                success: true,

                reasoning:
                    ReasoningEngine
                    .run()
            })
        );
    }

    function registerPlanner() {

        CommandRegistry.register(

            "plan",

            payload => ({

                success: true,

                plan:
                    PlannerEngine
                    .createAndSave(

                        payload.goal
                    )
            })
        );

        CommandRegistry.register(

            "planprogress",

            payload => ({

                success: true,

                progress:
                    PlannerEngine
                    .getProgress(

                        payload.goal
                    )
            })
        );

        CommandRegistry.register(

            "planstep",

            payload => ({

                success: true,

                step:
                    PlannerEngine
                    .getCurrentStep(

                        payload.goal
                    )
            })
        );

        CommandRegistry.register(

            "completestep",

            payload => ({

                success:
                    PlannerEngine
                    .completeStep(

                        payload.goal,

                        payload.step
                    )
            })
        );
    }

    function registerCritic() {

        CommandRegistry.register(

            "critic",

            () => ({

                success: true,

                evaluation:
                    SelfCriticEngine
                    .evaluate()
            })
        );

        CommandRegistry.register(

            "criticscore",

            () => {

                const result =
                    SelfCriticEngine
                    .evaluate();

                return {

                    success: true,

                    score:
                        result.score
                };
            }
        );

        CommandRegistry.register(

            "criticwarnings",

            () => {

                const result =
                    SelfCriticEngine
                    .evaluate();

                return {

                    success: true,

                    graphWarnings:
                        result.graphWarnings,

                    insightWarnings:
                        result.insightWarnings
                };
            }
        );

        CommandRegistry.register(

            "criticnodes",

            () => {

                const result =
                    SelfCriticEngine
                    .evaluate();

                return {

                    success: true,

                    isolatedNodes:
                        result.isolatedNodes
                };
            }
        );
    }

    function bootstrap() {

        registerLearn();
        registerTopics();

        registerKnowledge();
        registerImport();

        registerGraph();
        registerGraphStats();
        registerGraphInsights();

        registerCompare();
        registerRelated();
        registerInsights();
        registerReason();

        registerPlanner();
        registerCritic();
    }

    bootstrap();

})();
