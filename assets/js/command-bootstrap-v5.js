(() => {

    function registerMetaLearningCommands() {

        CommandRegistry.register(

            "metareport",

            () => ({

                success: true,

                report:
                    MetaLearningEngine
                    .generateReport()
            })
        );

        CommandRegistry.register(

            "metasummary",

            () => ({

                success: true,

                summary:
                    MetaLearningEngine
                    .summary()
            })
        );

        CommandRegistry.register(

            "knowledgegaps",

            () => ({

                success: true,

                gaps:
                    MetaLearningEngine
                    .detectKnowledgeGaps()
            })
        );

        CommandRegistry.register(

            "nextlearning",

            () => ({

                success: true,

                recommendations:
                    MetaLearningEngine
                    .suggestNextLearning()
            })
        );

        CommandRegistry.register(

            "weaktopics",

            () => ({

                success: true,

                topics:
                    MetaLearningEngine
                    .findWeakTopics()
            })
        );

        CommandRegistry.register(

            "learningscore",

            () => ({

                success: true,

                score:
                    MetaLearningEngine
                    .calculateLearningScore()
            })
        );
    }

    registerMetaLearningCommands();

})();
