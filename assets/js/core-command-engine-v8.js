const AURA = (() => {

    const VERSION = "0.8.0";

    const SUPPORTED_COMMANDS = [

        "learn",
        "study",
        "explain",
        "create",
        "tasks",
        "topics",
        "stats",
        "import",
        "knowledge",
        "knowledgestats",
        "graph",
        "graphstats",
        "graphinsights",
        "reason",
        "compare",
        "related",
        "insights"
    ];

    function normalize(input) {

        return input
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
    }

    function detectIntent(command) {

        const trimmed =
            command.trim();

        const cmd =
            normalize(command);

        if (cmd.startsWith("learn ")) {

            return {
                action: "learn",
                target:
                    trimmed.substring(6).trim()
            };
        }

        if (cmd.startsWith("study ")) {

            return {
                action: "learn",
                target:
                    trimmed.substring(6).trim()
            };
        }

        if (cmd.startsWith("import ")) {

            const raw =
                trimmed.substring(7).trim();

            const separator =
                raw.indexOf(":");

            if (separator === -1) {

                return {
                    action:
                        "invalid_import"
                };
            }

            return {

                action:
                    "import",

                topic:
                    raw.substring(
                        0,
                        separator
                    ).trim(),

                content:
                    raw.substring(
                        separator + 1
                    ).trim()
            };
        }

        if (
            cmd.startsWith(
                "knowledge "
            )
        ) {

            return {

                action:
                    "knowledge",

                target:
                    trimmed.substring(10).trim()
            };
        }

        if (
            cmd.startsWith(
                "knowledgestats "
            )
        ) {

            return {

                action:
                    "knowledgestats",

                target:
                    trimmed.substring(15).trim()
            };
        }

        if (
            cmd.startsWith(
                "graph "
            )
        ) {

            const raw =
                trimmed.substring(6).trim();

            const parts =
                raw.split(" ");

            if (
                parts.length < 3
            ) {

                return {
                    action:
                        "invalid_graph"
                };
            }

            return {

                action:
                    "graph",

                source:
                    parts[0],

                relation:
                    parts[1],

                target:
                    parts.slice(2).join(" ")
            };
        }

        if (
            cmd.startsWith(
                "compare "
            )
        ) {

            const raw =
                trimmed.substring(8).trim();

            const parts =
                raw.split(" ");

            if (
                parts.length !== 2
            ) {

                return {
                    action:
                        "invalid_compare"
                };
            }

            return {

                action:
                    "compare",

                nodeA:
                    parts[0],

                nodeB:
                    parts[1]
            };
        }

        if (
            cmd.startsWith(
                "related "
            )
        ) {

            return {

                action:
                    "related",

                target:
                    trimmed.substring(8).trim()
            };
        }

        if (
            cmd ===
            "reason"
        ) {

            return {
                action:
                    "reason"
            };
        }

        if (
            cmd ===
            "insights"
        ) {

            return {
                action:
                    "insights"
            };
        }

        if (
            cmd ===
            "graphstats"
        ) {

            return {
                action:
                    "graphstats"
            };
        }

        if (
            cmd ===
            "graphinsights"
        ) {

            return {
                action:
                    "graphinsights"
            };
        }

        if (
            cmd ===
            "tasks"
        ) {

            return {
                action:
                    "tasks"
            };
        }

        if (
            cmd ===
            "topics"
        ) {

            return {
                action:
                    "topics"
            };
        }

        if (
            cmd ===
            "stats"
        ) {

            return {
                action:
                    "stats"
            };
        }

        return {

            action:
                "unknown",

            target:
                command
        };
    }

    function createTask(intent) {

        return {

            id:
                crypto.randomUUID(),

            timestamp:
                new Date()
                .toISOString(),

            action:
                intent.action,

            target:
                intent.target ||
                intent.topic,

            status:
                "accepted"
        };
    }

    function rejectUnknown(command) {

        return {

            auraVersion:
                VERSION,

            success:
                false,

            error:
                "Unknown command",

            received:
                command,

            supportedCommands:
                SUPPORTED_COMMANDS
        };
    }

    function processLearning(intent) {

        const knowledge =
            KnowledgeEngine
            .registerTopic(
                intent.target
            );

        const learningPlan =
            LearningEngine
            .createPlan(
                intent.target
            );

        return {

            knowledge,
            learningPlan
        };
    }

    function execute(command) {

        const intent =
            detectIntent(command);

        if (
            intent.action ===
            "unknown"
        ) {

            return rejectUnknown(
                command
            );
        }

        if (
            intent.action ===
            "invalid_import"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    false,

                error:
                    "Invalid import format"
            };
        }

        if (
            intent.action ===
            "invalid_graph"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    false,

                error:
                    "Invalid graph format"
            };
        }

        if (
            intent.action ===
            "invalid_compare"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    false,

                error:
                    "Usage: Compare NodeA NodeB"
            };
        }

        if (
            intent.action ===
            "reason"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                reasoning:
                    ReasoningEngine.run()
            };
        }

        if (
            intent.action ===
            "insights"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                insights:
                    ReasoningEngine.generateInsights()
            };
        }

        if (
            intent.action ===
            "related"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                related:
                    ReasoningEngine
                    .findRelatedNodes(
                        intent.target
                    )
            };
        }

        if (
            intent.action ===
            "compare"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                comparison:
                    ReasoningEngine
                    .compareNodes(
                        intent.nodeA,
                        intent.nodeB
                    )
            };
        }

        if (
            intent.action ===
            "graphstats"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                graph:
                    KnowledgeGraphEngine
                    .stats()
            };
        }

        if (
            intent.action ===
            "graphinsights"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                insights:
                    KnowledgeGraphEngine
                    .findCommonTargets()
            };
        }

        if (
            intent.action ===
            "graph"
        ) {

            KnowledgeGraphEngine
                .addRelation(
                    intent.source,
                    intent.relation,
                    intent.target
                );

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                relationAdded:
                    true
            };
        }

        if (
            intent.action ===
            "knowledge"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                entries:
                    KnowledgeImportEngine
                    .getEntries(
                        intent.target
                    )
            };
        }

        if (
            intent.action ===
            "knowledgestats"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                stats:
                    KnowledgeImportEngine
                    .stats(
                        intent.target
                    )
            };
        }

        if (
            intent.action ===
            "import"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                importResult:
                    KnowledgeImportEngine
                    .importText(
                        intent.topic,
                        intent.content,
                        "command"
                    )
            };
        }

        if (
            intent.action ===
            "tasks"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                tasks:
                    TaskManager
                    .getAllTasks()
            };
        }

        if (
            intent.action ===
            "topics"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                topics:
                    KnowledgeEngine
                    .listTopics()
            };
        }

        if (
            intent.action ===
            "stats"
        ) {

            return {

                auraVersion:
                    VERSION,

                success:
                    true,

                taskStats:
                    TaskManager.getStats(),

                knowledgeStats:
                    KnowledgeEngine.stats(),

                graphStats:
                    KnowledgeGraphEngine.stats()
            };
        }

        const task =
            createTask(intent);

        TaskManager.addTask(task);

        let learning =
            null;

        if (
            intent.action ===
            "learn"
        ) {

            learning =
                processLearning(
                    intent
                );
        }

        return {

            auraVersion:
                VERSION,

            success:
                true,

            memorySaved:
                true,

            task,

            learning
        };
    }

    return {
        execute
    };

})();

function runCommand() {

    const command =
        document
        .getElementById(
            "command"
        )
        .value
        .trim();

    const output =
        document
        .getElementById(
            "output"
        );

    if (!command) {

        output.innerText =
            "No command provided.";

        return;
    }

    const result =
        AURA.execute(
            command
        );

    output.innerText =
        JSON.stringify(
            result,
            null,
            4
        );
}
