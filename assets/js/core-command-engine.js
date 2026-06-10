const AURA = (() => {

    const VERSION = "0.1.0";

    function normalize(input) {
        return input
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
    }

    function detectIntent(command) {

        const cmd = normalize(command);

        if (cmd.startsWith("learn ")) {
            return {
                action: "learn",
                target: command.substring(6).trim()
            };
        }

        if (cmd.startsWith("study ")) {
            return {
                action: "learn",
                target: command.substring(6).trim()
            };
        }

        if (cmd.startsWith("explain ")) {
            return {
                action: "explain",
                target: command.substring(8).trim()
            };
        }

        if (cmd.startsWith("create ")) {
            return {
                action: "create",
                target: command.substring(7).trim()
            };
        }

        return {
            action: "unknown",
            target: command
        };
    }

    function createTask(intent) {

        const timestamp = new Date().toISOString();

        return {
            id: crypto.randomUUID(),
            timestamp,
            action: intent.action,
            target: intent.target,
            status: "accepted"
        };
    }

    function execute(command) {

        const intent = detectIntent(command);

        const task = createTask(intent);

        return {
            auraVersion: VERSION,
            success: true,
            task
        };
    }

    return {
        execute
    };

})();

function runCommand() {

    const command =
        document.getElementById("command").value.trim();

    const output =
        document.getElementById("output");

    if (!command) {

        output.innerText =
            "No command provided.";

        return;
    }

    const result = AURA.execute(command);

    output.innerText =
        JSON.stringify(result, null, 4);
}
