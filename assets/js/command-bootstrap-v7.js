(() => {

    function registerSelfImprovementCommands() {

        CommandRegistry.register(

            "improve",

            () => ({

                success: true,

                report:
                    SelfImprovementEngine
                    .createImprovementPlan()
            })
        );

        CommandRegistry.register(

            "improvementplan",

            () => ({

                success: true,

                plan:
                    SelfImprovementEngine
                    .createImprovementPlan()
            })
        );

        CommandRegistry.register(

            "improvementscore",

            () => ({

                success: true,

                score:
                    SelfImprovementEngine
                    .calculateImprovementScore()
            })
        );

        CommandRegistry.register(

            "weakareas",

            () => ({

                success: true,

                weaknesses:
                    SelfImprovementEngine
                    .identifyWeakAreas()
            })
        );

        CommandRegistry.register(

            "improvementactions",

            () => ({

                success: true,

                actions:
                    SelfImprovementEngine
                    .generateActions()
            })
        );

        CommandRegistry.register(

            "selfimprovementsummary",

            () => ({

                success: true,

                summary:
                    SelfImprovementEngine
                    .summary()
            })
        );
    }

    registerSelfImprovementCommands();

})();
