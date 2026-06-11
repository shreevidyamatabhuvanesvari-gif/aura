const CommandRegistry = (() => {

    const commands = new Map();

    function normalize(name) {

        return String(name)
            .trim()
            .toLowerCase();
    }

    function register(
        name,
        handler
    ) {

        const key =
            normalize(name);

        if (
            typeof handler !==
            "function"
        ) {

            throw new Error(
                "Command handler must be a function."
            );
        }

        commands.set(
            key,
            handler
        );

        return true;
    }

    function unregister(name) {

        return commands.delete(
            normalize(name)
        );
    }

    function exists(name) {

        return commands.has(
            normalize(name)
        );
    }

    function execute(
        name,
        payload = {}
    ) {

        const key =
            normalize(name);

        const handler =
            commands.get(key);

        if (!handler) {

            return {

                success: false,

                error:
                    "Command not registered",

                command:
                    name
            };
        }

        try {

            return handler(
                payload
            );

        } catch (error) {

            console.error(
                error
            );

            return {

                success: false,

                error:
                    error.message
            };
        }
    }

    function list() {

        return Array.from(
            commands.keys()
        ).sort();
    }

    function count() {

        return commands.size;
    }

    function clear() {

        commands.clear();

        return true;
    }

    return {

        register,

        unregister,

        exists,

        execute,

        list,

        count,

        clear
    };

})();
