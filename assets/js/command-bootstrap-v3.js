(() => {

    function registerInsightCommands() {

        CommandRegistry.register(

            "insight",

            () => ({

                success: true,

                report:
                    InsightEngine
                    .generateAllInsights()
            })
        );

        CommandRegistry.register(

            "insightsummary",

            () => ({

                success: true,

                summary:
                    InsightEngine
                    .summary()
            })
        );

        CommandRegistry.register(

            "learninginsights",

            () => ({

                success: true,

                learning:
                    InsightEngine
                    .generateLearningRecommendations()
            })
        );

        CommandRegistry.register(

            "memoryinsights",

            () => ({

                success: true,

                memory:
                    InsightEngine
                    .generateMemoryInsights()
            })
        );

        CommandRegistry.register(

            "sharedconcepts",

            () => ({

                success: true,

                concepts:
                    InsightEngine
                    .generateSharedConceptInsights()
            })
        );

        CommandRegistry.register(

            "clusters",

            () => ({

                success: true,

                clusters:
                    InsightEngine
                    .generateClusterInsights()
            })
        );
    }

    registerInsightCommands();

})();

