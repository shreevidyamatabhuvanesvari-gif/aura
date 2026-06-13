const CommandManifest = (() => {

    const MANIFEST = {

        version: "1.0.0",

        generatedAt:
            new Date()
            .toISOString(),

        categories: [

            {
                name: "Knowledge",

                commands: [

                    "learn",
                    "topics",
                    "knowledge",
                    "import"
                ]
            },

            {
                name: "Graph",

                commands: [

                    "graph",
                    "graphstats",
                    "graphinsights"
                ]
            },

            {
                name: "Reasoning",

                commands: [

                    "reason",
                    "insights",
                    "compare",
                    "related"
                ]
            },

            {
                name: "Planning",

                commands: [

                    "plan",
                    "planprogress",
                    "planstep",
                    "completestep"
                ]
            },

            {
                name: "Critic",

                commands: [

                    "critic",
                    "criticscore",
                    "criticwarnings",
                    "criticnodes"
                ]
            },

            {
                name: "Memory",

                commands: [

                    "memory",
                    "memoryreport",
                    "memoryhealth",
                    "memoryduplicates",
                    "memoryrank"
                ]
            },

            {
                name: "Insight",

                commands: [

                    "insight",
                    "insightsummary",
                    "learninginsights",
                    "memoryinsights",
                    "sharedconcepts",
                    "clusters"
                ]
            },

            {
                name: "Goals",

                commands: [

                    "goalcreate",
                    "goallist",
                    "goalactive",
                    "goalcompleted",
                    "goalcomplete",
                    "goaldelete",
                    "goalpriority",
                    "goalstats",
                    "topgoal"
                ]
            },

            {
                name: "Meta Learning",

                commands: [

                    "metareport",
                    "metasummary",
                    "knowledgegaps",
                    "nextlearning",
                    "weaktopics",
                    "learningscore"
                ]
            }
        ],

        capabilities: [

            "Knowledge Storage",

            "Knowledge Import",

            "Knowledge Graph",

            "Reasoning",

            "Planning",

            "Self Criticism",

            "Memory Consolidation",

            "Insight Generation",

            "Goal Management",

            "Meta Learning"
        ]
    };

    function getManifest() {

        return structuredClone(
            MANIFEST
        );
    }

    function getCategories() {

        return MANIFEST
            .categories
            .map(
                category =>
                    category.name
            );
    }

    function getCapabilities() {

        return [
            ...MANIFEST
                .capabilities
        ];
    }

    function getCommands() {

        return MANIFEST
            .categories
            .flatMap(
                category =>
                    category.commands
            );
    }

    function getCommandCount() {

        return getCommands()
            .length;
    }

    function findCommand(
        command
    ) {

        const target =
            String(command || "")
            .toLowerCase();

        for (
            const category
            of MANIFEST.categories
        ) {

            if (
                category.commands
                .includes(target)
            ) {

                return {

                    found: true,

                    category:
                        category.name,

                    command:
                        target
                };
            }
        }

        return {

            found: false,

            command:
                target
        };
    }

    function summary() {

        return {

            version:
                MANIFEST.version,

            categories:
                MANIFEST
                .categories
                .length,

            commands:
                getCommandCount(),

            capabilities:
                MANIFEST
                .capabilities
                .length
        };
    }

    return {

        getManifest,

        getCategories,

        getCapabilities,

        getCommands,

        getCommandCount,

        findCommand,

        summary
    };

})();
