/**
 * AURA Creative Mind Engine
 * Version: 1.2.1
 * Status: General Fallback Upgrade
 */

const CreativeMindEngine = (() => {

    const VERSION = "1.2.1";

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

    function cleanSentence(text) {

        return String(text || "")
            .trim()
            .replace(/[।.]$/, "");
    }

    function getFragments() {

        const learningData =
            LearningCoreEngine
                .learnFromMemory();

        return learningData.fragments || [];
    }

    function getTopicFragments(topic) {

        return getFragments()
            .filter(
                fragment =>

                    String(
                        fragment.topic || ""
                    )
                    .toLowerCase() ===

                    String(topic || "")
                    .toLowerCase()
            );
    }

    function uniqueConcepts(fragments) {

        const map =
            new Map();

        fragments.forEach(
            fragment => {

                const key =
                    cleanSentence(
                        fragment.concept
                    )
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

    function resolveConcepts(topic) {

        let concepts =
            uniqueConcepts(
                getTopicFragments(
                    topic
                )
            );

        if (
            concepts.length
        ) {

            return concepts;
        }

        return uniqueConcepts(
            getFragments()
        );
    }

    function generateQuote(topic) {

        const concepts =
            resolveConcepts(
                topic
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
                    cleanSentence(
                        concepts[0]
                        .concept
                    ) +
                    " जीवन को श्रेष्ठ दिशा प्रदान करता है।"
            };
        }

        const first =
            cleanSentence(
                randomItem(
                    concepts
                ).concept
            );

        let second =
            cleanSentence(
                randomItem(
                    concepts
                ).concept
            );

        while (

            second === first &&
            concepts.length > 1

        ) {

            second =
                cleanSentence(
                    randomItem(
                        concepts
                    ).concept
                );
        }

        const templates = [

            `${first} और ${second} जीवन के दो महत्वपूर्ण आधार हैं।`,

            `${first} तथा ${second} मनुष्य को महान बनने की प्रेरणा देते हैं।`,

            `${first} के साथ ${second} जीवन को नई दिशा प्रदान करता है।`,

            `${first} और ${second} सफलता तथा आत्मविकास के स्तंभ हैं।`

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

    function generateShayari(topic) {

        const concepts =
            resolveConcepts(
                topic
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
            cleanSentence(
                randomItem(
                    concepts
                ).concept
            );

        return {

            success: true,

            type: "shayari",

            topic,

            content:

`${concept},
जीवन में प्रकाश लाता है,
सत्य और कर्म का पथ,
मनुष्य को ऊँचा उठाता है।`
        };
    }

    function generateCaption(topic) {

        const concepts =
            resolveConcepts(
                topic
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

        return {

            success: true,

            type: "caption",

            topic,

            content:
                cleanSentence(
                    randomItem(
                        concepts
                    ).concept
                ),

            hashtags: [

                "#AURA",

                "#" + topic
            ]
        };
    }

    function generateStatus(topic) {

        const concepts =
            resolveConcepts(
                topic
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

        return {

            success: true,

            type: "status",

            topic,

            content:
                cleanSentence(
                    randomItem(
                        concepts
                    ).concept
                )
        };
    }

    function create(options = {}) {

        const type =
            String(
                options.type || ""
            )
            .toLowerCase();

        switch (type) {

            case "quote":

                return generateQuote(
                    options.topic
                );

            case "shayari":

                return generateShayari(
                    options.topic
                );

            case "caption":

                return generateCaption(
                    options.topic
                );

            case "status":

                return generateStatus(
                    options.topic
                );

            default:

                return {

                    success: false,

                    error:
                        "Unsupported content type"
                };
        }
    }

    return {

        VERSION,

        create
    };

})();
