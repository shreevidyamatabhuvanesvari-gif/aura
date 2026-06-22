/**
 * AURA Hindi Intent Engine
 * Version: 1.0.0
 * Status: Production Foundation
 */

const HindiIntentEngine = (() => {

    const VERSION = "1.0.0";

    function normalize(text) {

        return String(text || "")
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
    }

    function extractTopic(text) {

        const cleaned =
            text
            .replace("श्री", "")
            .replace("के विषय में बताओ", "")
            .replace("पर सुविचार लिखो", "")
            .replace("पर शायरी लिखो", "")
            .replace("पर स्टेटस लिखो", "")
            .replace("पर कैप्शन लिखो", "")
            .trim();

        return cleaned || "general";
    }

    function detectIntent(input) {

        const text =
            normalize(input);

        if (
            text.includes("सुविचार")
        ) {

            return {

                intent:
                    "quote",

                topic:
                    extractTopic(
                        text
                    )
            };
        }

        if (
            text.includes("शायरी")
        ) {

            return {

                intent:
                    "shayari",

                topic:
                    extractTopic(
                        text
                    )
            };
        }

        if (
            text.includes("स्टेटस")
        ) {

            return {

                intent:
                    "status",

                topic:
                    extractTopic(
                        text
                    )
            };
        }

        if (
            text.includes("कैप्शन")
        ) {

            return {

                intent:
                    "caption",

                topic:
                    extractTopic(
                        text
                    )
            };
        }

        if (
            text.includes("विषय में बताओ")
        ) {

            return {

                intent:
                    "knowledge",

                topic:
                    extractTopic(
                        text
                    )
            };
        }

        if (

            text.includes("मुझे प्रेरित करो") ||

            text.includes("कुछ अच्छा बताओ") ||

            text.includes("ज्ञान दो")

        ) {

            return {

                intent:
                    "quote",

                topic:
                    "general"
            };
        }

        return null;
    }

    return {

        VERSION,

        detectIntent

    };

})();
