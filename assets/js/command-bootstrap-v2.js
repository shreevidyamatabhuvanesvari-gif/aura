(() => {

    function registerMemoryCommands() {

        CommandRegistry.register(

            "memory",

            payload => {

                if (!payload.topic) {

                    return {

                        success: false,

                        error:
                            "Topic is required"
                    };
                }

                return {

                    success: true,

                    report:
                        MemoryConsolidationEngine
                        .consolidate(
                            payload.topic
                        )
                };
            }
        );

        CommandRegistry.register(

            "memoryreport",

            payload => {

                if (!payload.topic) {

                    return {

                        success: false,

                        error:
                            "Topic is required"
                    };
                }

                const report =
                    MemoryConsolidationEngine
                    .getReport(
                        payload.topic
                    );

                return {

                    success: true,

                    report
                };
            }
        );

        CommandRegistry.register(

            "memoryhealth",

            payload => {

                if (!payload.topic) {

                    return {

                        success: false,

                        error:
                            "Topic is required"
                    };
                }

                return {

                    success: true,

                    health:
                        MemoryConsolidationEngine
                        .calculateHealth(
                            payload.topic
                        )
                };
            }
        );

        CommandRegistry.register(

            "memoryduplicates",

            payload => {

                if (!payload.topic) {

                    return {

                        success: false,

                        error:
                            "Topic is required"
                    };
                }

                return {

                    success: true,

                    duplicates:
                        MemoryConsolidationEngine
                        .findDuplicates(
                            payload.topic
                        )
                };
            }
        );

        CommandRegistry.register(

            "memoryrank",

            payload => {

                if (!payload.topic) {

                    return {

                        success: false,

                        error:
                            "Topic is required"
                    };
                }

                return {

                    success: true,

                    ranking:
                        MemoryConsolidationEngine
                        .rankKnowledge(
                            payload.topic
                        )
                };
            }
        );
    }

    registerMemoryCommands();

})();
