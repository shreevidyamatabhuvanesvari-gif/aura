const AURA = (() => {

    const VERSION = "0.6.0";

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
        "knowledgestats"
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
                    trimmed
                    .substring(6)
                    .trim()
            };
        }

        if (cmd.startsWith("study ")) {

            return {
                action: "learn",
                target:
                    trimmed
                    .substring(6)
                    .trim()
            };
        }

        if (cmd.startsWith("explain ")) {

            return {
                action: "explain",
                target:
                    trimmed
                    .substring(8)
                    .trim()
            };
        }

        if (cmd.startsWith("create ")) {

            return {
                action: "create",
                target:
                    trimmed
                    .substring(7)
                    .trim()
            };
        }

        if (cmd.startsWith("import ")) {

            const raw =
                trimmed
                .substring(7)
                .trim();

            const separator =
                raw.indexOf(":");

            if (separator === -1) {

                return {
                    action: "invalid_import",
                    target: raw
                };
            }

            return {

                action: "import",

                topic:
                    raw
                    .substring(
                        0,
                        separator
                    )
                    .trim(),

                content:
                    raw
                    .substring(
                        separator + 1
                    )
                    .trim()
            };
        }

        if (cmd.startsWith("knowledge ")) {

            return {

                action: "knowledge",

                target:
                    trimmed
                    .substring(10)
                    .trim()
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
                    trimmed
                    .substring(15)
                    .trim()
            };
        }

        if (cmd === "tasks") {

            return {
                action: "tasks",
                target: null
            };
        }

        if (cmd === "topics") {

            return {
                action: "topics",
                target: null
            };
        }

        if (cmd === "stats") {

            return {
                action: "stats",
                target: null
            };
        }

        return {

            action: "unknown",
            target: command
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

            success: false,

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

                success: false,

                error:
                    "Invalid import format",

                expected:
                    "Import Topic: Content"
            };
        }

        if (
            intent.action ===
            "tasks"
        ) {

            return {

                auraVersion:
                    VERSION,

                success: true,

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

                success: true,

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

                success: true,

                taskStats:
                    TaskManager
                    .getStats(),

                knowledgeStats:
                    KnowledgeEngine
                    .stats()
            };
        }

        if (
            intent.action ===
            "import"
        ) {

            const result =
                KnowledgeImportEngine
                .importText(
                    intent.topic,
                    intent.content,
                    "command"
                );

            return {

                auraVersion:
                    VERSION,

                success: true,

                importResult:
                    result
            };
        }

        if (
            intent.action ===
            "knowledge"
        ) {

            return {

                auraVersion:
                    VERSION,

                success: true,

                topic:
                    intent.target,

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

                success: true,

                stats:
                    KnowledgeImportEngine
                    .stats(
                        intent.target
                    )
            };
        }

        const task =
            createTask(intent);

        TaskManager
            .addTask(task);

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

            success: true,

            memorySaved: true,

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
