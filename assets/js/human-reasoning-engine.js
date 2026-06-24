/**
 * AURA Human Reasoning Engine
 * Version: 1.0.0
 * Status: Human Reasoning Layer
 */

const HumanReasoningEngine = (() => {

    const VERSION = "1.0.0";

    function normalize(text) {

        return String(text || "")
            .trim()
            .toLowerCase();
    }

    function answer(question) {

        const q =
            normalize(question);

        if (

            q.includes("दुःखी क्यों") ||
            q.includes("दुखी क्यों")

        ) {

            return {

                success: true,

                type: "reasoning",

                topic: "suffering",

                content:
                    "मनुष्य की अपेक्षाएँ, आसक्ति और परिस्थितियों के प्रति दृष्टिकोण दुःख का कारण बन सकते हैं।"
            };
        }

        if (

            q.includes("क्रोध") ||
            q.includes("गुस्सा")

        ) {

            return {

                success: true,

                type: "reasoning",

                topic: "anger",

                content:
                    "क्रोध स्वाभाविक भावना है, किन्तु विवेक के बिना किया गया क्रोध हानि का कारण बन सकता है।"
            };
        }

        if (

            q.includes("उचित") ||
            q.includes("सही")

        ) {

            return {

                success: true,

                type: "reasoning",

                topic: "ethics",

                content:
                    "किसी कार्य की उचितता का निर्णय उसके उद्देश्य, परिणाम और नैतिक मूल्यों के आधार पर करना चाहिए।"
            };
        }

        if (

            q.includes("क्यों")

        ) {

            return {

                success: true,

                type: "reasoning",

                topic: "cause",

                content:
                    "किसी भी घटना को समझने के लिए उसके कारण, परिस्थितियों और परिणामों का संतुलित विश्लेषण आवश्यक है।"
            };
        }

        return {

            success: true,

            type: "reasoning",

            topic: "general",

            content:
                "तथ्य, तर्क और अनुभव तीनों का संतुलन विवेकपूर्ण निर्णय का आधार है।"
        };
    }

    return {

        VERSION,

        answer

    };

})();
