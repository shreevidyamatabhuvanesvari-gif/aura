(() => {

    function registerManifestCommands() {

        CommandRegistry.register(

            "help",

            () => ({

                success: true,

                message:
                    "Use Commands, Capabilities or CommandInfo <command>",

                summary:
                    CommandManifest
                    .summary()
            })
        );

        CommandRegistry.register(

            "commands",

            () => ({

                success: true,

                totalCommands:
                    CommandManifest
                    .getCommandCount(),

                commands:
                    CommandManifest
                    .getCommands()
            })
        );

        CommandRegistry.register(

            "capabilities",

            () => ({

                success: true,

                capabilities:
                    CommandManifest
                    .getCapabilities()
            })
        );

        CommandRegistry.register(

            "categories",

            () => ({

                success: true,

                categories:
                    CommandManifest
                    .getCategories()
            })
        );

        CommandRegistry.register(

            "manifest",

            () => ({

                success: true,

                manifest:
                    CommandManifest
                    .getManifest()
            })
        );

        CommandRegistry.register(

            "commandinfo",

            payload => {

                if (
                    !payload.command
                ) {

                    return {

                        success: false,

                        error:
                            "Command name is required"
                    };
                }

                return {

                    success: true,

                    info:
                        CommandManifest
                        .findCommand(
                            payload.command
                        )
                };
            }
        );
    }

    registerManifestCommands();

})();
