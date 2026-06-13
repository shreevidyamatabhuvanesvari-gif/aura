const AURA = (() => {

    const VERSION = "1.3.0";

    function normalize(text) {

        return String(text || "")
            .trim()
            .replace(/\s+/g, " ");
    }

    function success(result) {

        return {

            auraVersion:
                VERSION,

            ...result
        };
    }

    function failure(message) {

        return {

            auraVersion:
                VERSION,

            success: false,

            error: message
        };
    }

    function parse(command) {

        const raw =
            normalize(command);

        if (!raw) {

            return null;
        }

        const lower =
            raw.toLowerCase();

        const simpleCommands = [

            "topics",

            "reason",
            "insights",

            "graphstats",
            "graphinsights",

            "critic",
            "criticscore",
            "criticwarnings",
            "criticnodes",

            "insight",
            "insightsummary",
            "learninginsights",
            "memoryinsights",
            "sharedconcepts",
            "clusters",

            "goallist",
            "goalactive",
            "goalcompleted",
            "goalstats",
            "topgoal",

            "metareport",
            "metasummary",
            "knowledgegaps",
            "nextlearning",
            "weaktopics",
            "learningscore",

            "help",
            "commands",
            "capabilities",
            "categories",
            "manifest"
        ];

        if (
            simpleCommands.includes(
                lower
            )
        ) {

            return {

                command:
                    lower,

                payload: {}
            };
        }

        if (
            lower.startsWith(
                "commandinfo "
            )
        ) {

            return {

                command:
                    "commandinfo",

                payload: {

                    command:
                        raw.substring(
                            12
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "learn "
            )
        ) {

            return {

                command:
                    "learn",

                payload: {

                    target:
                        raw.substring(
                            6
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "knowledge "
            )
        ) {

            return {

                command:
                    "knowledge",

                payload: {

                    topic:
                        raw.substring(
                            10
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "import "
            )
        ) {

            const content =
                raw.substring(
                    7
                );

            const index =
                content.indexOf(
                    ":"
                );

            if (
                index === -1
            ) {

                return {

                    error:
                        "Import format: Import Topic: Content"
                };
            }

            return {

                command:
                    "import",

                payload: {

                    topic:
                        content
                        .substring(
                            0,
                            index
                        )
                        .trim(),

                    content:
                        content
                        .substring(
                            index + 1
                        )
                        .trim()
                }
            };
        }

        if (
            lower.startsWith(
                "graph "
            )
        ) {

            const parts =
                raw.substring(
                    6
                )
                .split(" ");

            if (
                parts.length < 3
            ) {

                return {

                    error:
                        "Graph format: Graph Source Relation Target"
                };
            }

            return {

                command:
                    "graph",

                payload: {

                    source:
                        parts[0],

                    relation:
                        parts[1],

                    target:
                        parts
                        .slice(2)
                        .join(" ")
                }
            };
        }

        if (
            lower.startsWith(
                "compare "
            )
        ) {

            const parts =
                raw.substring(
                    8
                )
                .split(" ");

            if (
                parts.length !== 2
            ) {

                return {

                    error:
                        "Compare format: Compare NodeA NodeB"
                };
            }

            return {

                command:
                    "compare",

                payload: {

                    nodeA:
                        parts[0],

                    nodeB:
                        parts[1]
                }
            };
        }

        if (
            lower.startsWith(
                "related "
            )
        ) {

            return {

                command:
                    "related",

                payload: {

                    node:
                        raw.substring(
                            8
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "plan "
            )
        ) {

            return {

                command:
                    "plan",

                payload: {

                    goal:
                        raw.substring(
                            5
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "planprogress "
            )
        ) {

            return {

                command:
                    "planprogress",

                payload: {

                    goal:
                        raw.substring(
                            13
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "planstep "
            )
        ) {

            return {

                command:
                    "planstep",

                payload: {

                    goal:
                        raw.substring(
                            9
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "completestep "
            )
        ) {

            const body =
                raw.substring(
                    13
                );

            const parts =
                body.split(" ");

            if (
                parts.length < 2
            ) {

                return {

                    error:
                        "CompleteStep format: CompleteStep Goal Step"
                };
            }

            return {

                command:
                    "completestep",

                payload: {

                    goal:
                        parts[0],

                    step:
                        Number(
                            parts[1]
                        )
                }
            };
        }

        if (
            lower.startsWith(
                "memory "
            )
        ) {

            return {

                command:
                    "memory",

                payload: {

                    topic:
                        raw.substring(
                            7
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "memoryreport "
            )
        ) {

            return {

                command:
                    "memoryreport",

                payload: {

                    topic:
                        raw.substring(
                            13
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "memoryhealth "
            )
        ) {

            return {

                command:
                    "memoryhealth",

                payload: {

                    topic:
                        raw.substring(
                            13
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "memoryduplicates "
            )
        ) {

            return {

                command:
                    "memoryduplicates",

                payload: {

                    topic:
                        raw.substring(
                            17
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "memoryrank "
            )
        ) {

            return {

                command:
                    "memoryrank",

                payload: {

                    topic:
                        raw.substring(
                            11
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "goalcreate "
            )
        ) {

            return {

                command:
                    "goalcreate",

                payload: {

                    title:
                        raw.substring(
                            11
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "goalcomplete "
            )
        ) {

            return {

                command:
                    "goalcomplete",

                payload: {

                    id:
                        raw.substring(
                            13
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "goaldelete "
            )
        ) {

            return {

                command:
                    "goaldelete",

                payload: {

                    id:
                        raw.substring(
                            11
                        ).trim()
                }
            };
        }

        if (
            lower.startsWith(
                "goalpriority "
            )
        ) {

            const parts =
                raw.substring(
                    13
                )
                .split(" ");

            if (
                parts.length < 2
            ) {

                return {

                    error:
                        "GoalPriority format: GoalPriority GoalId Priority"
                };
            }

            return {

                command:
                    "goalpriority",

                payload: {

                    id:
                        parts[0],

                    priority:
                        Number(
                            parts[1]
                        )
                }
            };
        }

        return {

            error:
                "Unknown command"
        };
    }

    function execute(command) {

        const parsed =
            parse(command);

        if (!parsed) {

            return failure(
                "Empty command"
            );
        }

        if (
            parsed.error
        ) {

            return failure(
                parsed.error
            );
        }

        const result =
            CommandRegistry
            .execute(

                parsed.command,

                parsed.payload
            );

        return success(
            result
        );
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
