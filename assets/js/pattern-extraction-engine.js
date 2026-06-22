/**
 * AURA Pattern Extraction Engine
 * Version: 1.1.0
 * Status: Production Foundation
 */

const PatternExtractionEngine = (() => {

    const VERSION = "1.1.0";

    function normalize(text) {

        return String(text || "")
            .trim()
            .toLowerCase();
    }

    function tokenize(text) {

        return normalize(text)
            .split(/\s+/)
            .filter(
                word =>
                    word.length > 1
            );
    }

    function extractPatterns(memory) {

        const concepts = [];

        memory.forEach(item => {

            const topic =
                String(
                    item.topic || "general"
                );

            const content =
                item.content ||
                item.text ||
                "";

            tokenize(content)
                .forEach(word => {

                    concepts.push({

                        concept:
                            word,

                        topic,

                        score: 10
                    });

                });

        });

        return {

            concepts,

            totalConcepts:
                concepts.length,

            timestamp:
                new Date()
                    .toISOString()
        };
    }

    function analyzeMemory() {

        if (
            typeof ContentMemoryEngine ===
            "undefined"
        ) {

            throw new Error(
                "ContentMemoryEngine not loaded"
            );
        }

        const memory =
            ContentMemoryEngine
                .getAll();

        return extractPatterns(
            memory
        );
    }

    return {

        VERSION,

        tokenize,

        extractPatterns,

        analyzeMemory
    };

})();
