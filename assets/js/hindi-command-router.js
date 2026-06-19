/**
 * AURA Hindi Command Router
 * Version: 1.0.0
 * Status: FROZEN
 *
 * Based On:
 * docs/hindi-command-routing-spec.md
 */

const HindiCommandRouter = (() => {

    const VERSION = "1.0.0";

    const patterns = [

        {
            intent: "quote",
            regex: /^(.+)\sपर\sसुविचार\sलिखो$/i
        },

        {
            intent: "shayari",
            regex: /^(.+)\sपर\sशायरी\sलिखो$/i
        },

        {
            intent: "status",
            regex: /^(.+)\sपर\sस्टेटस\sलिखो$/i
        },

        {
            intent: "caption",
            regex: /^(.+)\sपर\sकैप्शन\sलिखो$/i
        },

        {
            intent: "festival_wish",
            regex: /^(.+)\sकी\sशुभकामना\sलिखो$/i
        }

    ];

    function route(input) {

        const text =
            String(input || "")
            .trim();

        if (!text) {

            return null;
        }

        for (const pattern of patterns) {

            const match =
                text.match(
                    pattern.regex
                );

            if (!match) {
                continue;
            }

            return {

                success: true,

                intent:
                    pattern.intent,

                topic:
                    match[1]
                        .trim()
            };
        }

        return null;
    }

    function supportedIntents() {

        return patterns.map(
            item =>
                item.intent
        );
    }

    function stats() {

        return {

            version:
                VERSION,

            routes:
                patterns.length
        };
    }

    return {

        VERSION,

        route,

        supportedIntents,

        stats
    };

})();
