/**

* AURA Hindi Interaction Engine
* Version: 1.0.0
* Status: Hindi First Interface
  */

const HindiInteractionEngine = (() => {

const VERSION = "1.0.0";

const INTENTS = {

    quote: [
        "सुविचार",
        "विचार",
        "quote"
    ],

    shayari: [
        "शायरी",
        "shayari"
    ],

    caption: [
        "caption",
        "कैप्शन"
    ],

    status: [
        "status",
        "स्टेटस"
    ]
};

const TOPICS = {

    krishna: [
        "कृष्ण",
        "कृष्ण जी",
        "श्रीकृष्ण"
    ],

    motivation: [
        "प्रेरणा",
        "प्रेरणादायक",
        "सफलता",
        "मेहनत"
    ],

    discipline: [
        "अनुशासन"
    ],

    life: [
        "जीवन",
        "जिंदगी"
    ]
};

function normalize(text) {

    return String(text || "")
        .trim()
        .toLowerCase();
}

function detectIntent(text) {

    const input =
        normalize(text);

    for (
        const intent in INTENTS
    ) {

        const keywords =
            INTENTS[intent];

        if (
            keywords.some(
                keyword =>

                    input.includes(
                        normalize(keyword)
                    )
            )
        ) {

            return intent;
        }
    }

    return null;
}

function detectTopic(text) {

    const input =
        normalize(text);

    for (
        const topic in TOPICS
    ) {

        const keywords =
            TOPICS[topic];

        if (
            keywords.some(
                keyword =>

                    input.includes(
                        normalize(keyword)
                    )
            )
        ) {

            return topic;
        }
    }

    return "general";
}

function parse(text) {

    return {

        intent:
            detectIntent(text),

        topic:
            detectTopic(text),

        originalText:
            text
    };
}

function process(text) {

    const request =
        parse(text);

    if (
        !request.intent
    ) {

        return {

            success: false,

            error:
                "Intent not recognized",

            request
        };
    }

    if (
        typeof
        CreativeMindEngine ===
        "undefined"
    ) {

        return {

            success: false,

            error:
                "CreativeMindEngine not loaded"
        };
    }

    const result =

        CreativeMindEngine.create({

            type:
                request.intent,

            topic:
                request.topic
        });

    return {

        success: true,

        request,

        result
    };
}

function getCapabilities() {

    return {

        version:
            VERSION,

        intents:
            Object.keys(
                INTENTS
            ),

        topics:
            Object.keys(
                TOPICS
            )
    };
}

return {

    VERSION,

    parse,

    process,

    getCapabilities
};

})();
