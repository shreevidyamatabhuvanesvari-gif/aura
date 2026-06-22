/**
 * AURA Creative Mind Engine
 * Version: 1.1.0
 * Status: Creative Intelligence Upgrade
 */

const CreativeMindEngine = (() => {

    const VERSION = "1.1.0";

    function randomItem(items) {

        if (
            !Array.isArray(items) ||
            !items.length
        ) {

            return null;
        }

        return items[
            Math.floor(
                Math.random() *
                items.length
            )
        ];
    }

    function getFragments() {

        if (
            typeof LearningCoreEngine ===
            "undefined"
        ) {

            throw new Error(
                "LearningCoreEngine not loaded"
            );
        }

        const learningData =
            LearningCoreEngine
                .learnFromMemory();

        return learningData.fragments || [];
    }

    function getTopicFragments(topic) {

        const fragments =
            getFragments();

        return fragments.filter(
            fragment =>

                String(
                    fragment.topic || ""
                )
                .toLowerCase() ===

                String(topic || "")
                .toLowerCase()
        );
    }

    function uniqueConcepts(
        fragments
    ) {

        const map =
            new Map();

        fragments.forEach(
            fragment => {

                const key =
                    String(
                        fragment.concept
                    )
                    .trim()
                    .toLowerCase();

                if (
                    !map.has(key)
                ) {

                    map.set(
                        key,
                        fragment
                    );
                }

            }
        );

        return Array.from(
            map.values()
        );
    }

    function generateQuote(
        topic
    ) {

        const concepts =
            uniqueConcepts(
                getTopicFragments(
                    topic
                )
            );

        if (
            !concepts.length
        ) {

            return {

                success: false,

                error:
                    "No learned concepts found"
            };
        }

        if (
            concepts.length === 1
        ) {

            return {

                success: true,

                type: "quote",

                topic,

                content:
                    concepts[0]
                    .concept +
                    " जीवन को सही दिशा देने का आधार है।"
            };
        }

        const first =
            randomItem(
                concepts
            );

        let second =
            randomItem(
                concepts
            );

        while (

            second &&
            first &&
            second.concept ===
            first.concept &&

            concepts.length > 1

        ) {

            second =
                randomItem(
                    concepts
                );
        }

        const templates = [

            `${first.concept} जबकि ${second.concept} मनुष्य को महान बनाता है।`,

            `${first.concept} अपनाने वाला व्यक्ति ${second.concept} की ओर स्वतः अग्रसर होता है।`,

            `${first.concept} और ${second.concept} जीवन के दो महत्वपूर्ण स्तंभ हैं।`,

            `${first.concept} का पालन करने से ${second.concept} का मार्ग प्रशस्त होता है।`

        ];

        return {

            success: true,

            type: "quote",

            topic,

            content:
                randomItem(
                    templates
                )
        };
    }

    function generateShayari(
        topic
    ) {

        const concepts =
            uniqueConcepts(
                getTopicFragments(
                    topic
                )
            );

        if (
            !concepts.length
        ) {

            return {

                success: false,

                error:
                    "No learned concepts found"
            };
        }

        const concept =
            randomItem(
                concepts
            );

        return {

            success: true,

            type: "shayari",

            topic,

            content:

`${concept.concept}
से जीवन में प्रकाश आता है,
सत्य और कर्म का मार्ग
मनुष्य को ऊँचा उठाता है।`
        };
    }

    function generateCaption(
        topic
    ) {

        const concepts =
            uniqueConcepts(
                getTopicFragments(
                    topic
                )
            );

        if (
            !concepts.length
        ) {

            return {

                success: false,

                error:
                    "No learned concepts found"
            };
        }

        const concept =
            randomItem(
                concepts
            );

        return {

            success: true,

            type: "caption",

            topic,

            content:
                concept.concept,

            hashtags: [

                "#AURA",

                "#" + topic
            ]
        };
    }

    function generateStatus(
        topic
    ) {

        const concepts =
            uniqueConcepts(
                getTopicFragments(
                    topic
                )
            );

        if (
            !concepts.length
        ) {

            return {

                success: false,

                error:
                    "No learned concepts found"
            };
        }

        const concept =
            randomItem(
                concepts
            );

        return {

            success: true,

            type: "status",

            topic,

            content:
                concept.concept
        };
    }

    function create(
        options = {}
    ) {

        const type =
            String(
                options.type || ""
            )
            .toLowerCase();

        const topic =
            String(
                options.topic ||
                "general"
            );

        switch (
            type
        ) {

            case "quote":

                return generateQuote(
                    topic
                );

            case "shayari":

                return generateShayari(
                    topic
                );

            case "caption":

                return generateCaption(
                    topic
                );

            case "status":

                return generateStatus(
                    topic
                );

            default:

                return {

                    success: false,

                    error:
                        "Unsupported content type"
                };
        }
    }

    function getMindReport() {

        const fragments =
            getFragments();

        return {

            version:
                VERSION,

            totalConcepts:
                fragments.length,

            timestamp:
                new Date()
                    .toISOString()
        };
    }

    return {

        VERSION,

        create,

        getMindReport
    };

})();
