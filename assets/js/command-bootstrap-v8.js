(() => {

    function registerPhilosophy() {

        CommandRegistry.register(

            "philosophy",

            () => ({

                success: true,

                type:
                    "philosophy",

                content:
                    "सत्य, धर्म और कर्म का सही ज्ञान ही मनुष्य को विवेकपूर्ण जीवन की ओर ले जाता है।"
            })
        );
    }

    function registerReasoning() {

        CommandRegistry.register(

            "reasoning",

            () => ({

                success: true,

                type:
                    "reasoning",

                content:
                    "किसी भी निष्कर्ष तक पहुँचने से पहले तथ्य, तर्क और अनुभव तीनों का संतुलन आवश्यक है।"
            })
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
