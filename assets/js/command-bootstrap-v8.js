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

            () => ({

                success: true,

                type:
                    "comparison",

                content:
                    "श्रेष्ठता परिस्थितियों, उद्देश्यों और गुणों पर निर्भर करती है; उचित तुलना विवेक के साथ करनी चाहिए।"
            })
        );
    }

    function bootstrap() {

        registerPhilosophy();

        registerReasoning();

        registerComparison();
    }

    bootstrap();

})();
