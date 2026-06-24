/**
 * AURA Hindi Intent Engine
 * Version: 1.2.0
 * Status: Natural Hindi Intelligence Upgrade
 */

const HindiIntentEngine = (() => {

    const VERSION = "1.2.0";

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

        /*
        |--------------------------------------------------------------------------
        | General Motivation Requests
        |--------------------------------------------------------------------------
        */

        if (

            text.includes(
                "एक प्रेरणादायक सुविचार लिखो"
            ) ||

            text.includes(
                "एक अच्छा सुविचार लिखो"
            ) ||

            text.includes(
                "एक प्रेरक विचार बताओ"
            ) ||

            text.includes(
                "कुछ प्रेरणा दो"
            ) ||

            text.includes(
                "कुछ अच्छा बताओ"
            ) ||

            text.includes(
                "मुझे प्रेरित करो"
            ) ||

            text.includes(
                "ज्ञान दो"
            )

        ) {

            return {

                success: true,

                intent: "quote",

                topic: "general"
            };
        }

        /*
        |--------------------------------------------------------------------------
        | Topic-based Creative Requests
        |--------------------------------------------------------------------------
        */

        if (
            text.includes("सुविचार")
        ) {

            return {

                success: true,

                intent: "quote",

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

                success: true,

                intent: "shayari",

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

                success: true,

                intent: "status",

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

                success: true,

                intent: "caption",

                topic:
                    extractTopic(
                        text
                    )
            };
        }

        /*
|--------------------------------------------------------------------------
| Knowledge Requests
|--------------------------------------------------------------------------
*/

if (
    text.includes(
        "विषय में बताओ"
    )
) {

    return {

        success: true,

        intent: "knowledge",

        topic:
            extractTopic(
                text
            )
    };
}

/*
|--------------------------------------------------------------------------
| Reasoning Requests
|--------------------------------------------------------------------------
*/

if (

    text.includes(
        "क्यों"
    ) ||

    text.includes(
        "उचित"
    ) ||

    text.includes(
        "सही"
    ) ||

    text.includes(
        "क्रोध"
    ) ||

    text.includes(
        "गुस्सा"
    ) ||

    text.includes(
        "सोचना चाहिए"
    ) ||

    text.includes(
        "क्या करना चाहिए"
    ) ||

    text.includes(
        "निर्णय"
    )

) {

    return {

        success: true,

        intent: "reasoning",

        topic: "general"
    };
}

return null;
        /*
        |--------------------------------------------------------------------------
        | Philosophy Intent
        |--------------------------------------------------------------------------
        */

        if (

            text.includes(
                "सत्य और असत्य"
            ) ||

            text.includes(
                "जीवन का उद्देश्य"
            ) ||

            text.includes(
                "धर्म क्या है"
            ) ||

            text.includes(
                "कर्म क्या है"
            ) ||

            text.includes(
                "आत्मा क्या है"
            )

        ) {

            return {

                success: true,

                intent: "philosophy",

                topic: "general"
            };
        }

        /*
        |--------------------------------------------------------------------------
        | Reasoning Intent
        |--------------------------------------------------------------------------
        */

        if (

            text.includes(
                "क्यों"
            ) ||

            text.includes(
                "किस कारण"
            ) ||

            text.includes(
                "क्या यह उचित है"
            ) ||

            text.includes(
                "ऐसा क्यों होता है"
            )

        ) {

            return {

                success: true,

                intent: "reasoning",

                topic: "general"
            };
        }

        /*
        |--------------------------------------------------------------------------
        | Comparison Intent
        |--------------------------------------------------------------------------
        */

        if (

            text.includes(
                "में क्या अंतर है"
            ) ||

            text.includes(
                "कौन बेहतर है"
            )

        ) {

            return {

                success: true,

                intent: "compare",

                topic: "general"
            };
        }

        return null;
    }

    return {

        VERSION,

        detectIntent

    };

})();
