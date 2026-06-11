const AURA = (() => {

    const VERSION = "0.3.0";

    function normalize(input) {

        return input
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
    }

    function detectIntent(command) {

        const cmd =
            normalize(command);

        if (cmd.startsWith("learn ")) {

            return {
                action: "learn",
                target: command
                    .substring(6)
                    .trim()
            };
        }

        if (cmd.startsWith("study ")) {

            return {
                action: "learn",
                target: command
                    .substring(6)
                    .trim()
            };
        }

        if (cmd.startsWith("explain ")) {

            return {
                action: "explain",
                target: command
                    .substring(8)
                    .trim()
            };
        }

        if (cmd.startsWith("create ")) {

            return {
                action: "create",
                target: command
                    .substring(7)
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

            id: crypto.randomUUID(),

            timestamp:
                new Date()
                .toISOString(),

            action:
                intent.action,

            target:
                intent.target,

            status:
                "accepted"
        };
    }

    function registerKnowledge(intent) {

        if (
            intent.action !== "learn"
        ) {
            return null;
        }

        return KnowledgeEngine
            .registerTopic(
                intent.target
            );
    }

    function execute(command) {

        const intent =
            detectIntent(command);

        if (
            intent.action === "tasks"
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
            intent.action === "topics"
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
            intent.action === "stats"
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

        const task =
            createTask(intent);

        TaskManager
            .addTask(task);

        const knowledge =
            registerKnowledge(
                intent
            );

        return {

            auraVersion:
                VERSION,

            success: true,

            memorySaved: true,

            task,

            knowledge
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
