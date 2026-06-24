(() => {

    function registerPhilosophy() {

        CommandRegistry.register(

            "philosophy",

            payload =>

                PhilosophyEngine.answer(

                    payload.question ||

                    payload.raw ||

                    ""
                )
        );
    }

    function registerReasoning() {

        CommandRegistry.register(

            "reasoning",

            payload =>

                HumanReasoningEngine.answer(

                    payload.question ||

                    payload.raw ||

                    ""
                )
        );
    }

    function registerComparison() {

        CommandRegistry.register(

            "compare",

            payload =>

                ComparisonEngine.answer(

                    payload.question ||

                    payload.raw ||

                    ""
                )
        );
    }

    function bootstrap() {

        registerPhilosophy();

        registerReasoning();

        registerComparison();
    }

    bootstrap();

})();
