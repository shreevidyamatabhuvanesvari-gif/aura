/**
 * AURA Command Bootstrap
 * Version: 8.1.0
 * Status: Philosophy + Reasoning + Comparison + Question Integration
 */

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

    function registerQuestion() {

        CommandRegistry.register(

            "question",

            payload =>

                QuestionAnswerEngine.answer(

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

        registerQuestion();
    }

    bootstrap();

})();
