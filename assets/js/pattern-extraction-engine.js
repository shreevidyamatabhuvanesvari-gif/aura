/**
 * AURA Pattern Extraction Engine
 * Version: 1.0.0
 * Status: Production Foundation
 */

const PatternExtractionEngine = (() => {

    const VERSION = "1.0.0";

    function normalize(text) {

        return String(
            text || ""
        )
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

    function countWords(texts) {

        const map =
            new Map();

        texts.forEach(text => {

            tokenize(text)
                .forEach(word => {

                    const count =
                        map.get(word) || 0;

                    map.set(
                        word,
                        count + 1
                    );

                });

        });

        return map;
    }

    function buildConcepts(wordMap) {

        const concepts = [];

        wordMap.forEach(
            (
                count,
                word
            ) => {

                concepts.push({

                    concept:
                        word,

                    topic:
                        "general",

                    score:
                        Math.min(
                            100,
                            count * 10
                        )
                });

            }
        );

        return concepts.sort(
            (
                a,
                b
            ) =>
                b.score -
                a.score
        );
    }

    function extractPatterns(contents) {

        const wordMap =
            countWords(
                contents
            );

        return {

            concepts:
                buildConcepts(
                    wordMap
                ),

            totalConcepts:
                wordMap.size,

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

        const contents =
            memory.map(item => {

                if (
                    typeof item ===
                    "string"
                ) {

                    return item;
                }

                return (
                    item.content ||
                    item.text ||
                    ""
                );

            });

        return extractPatterns(
            contents
        );
    }

    return {

        VERSION,

        tokenize,

        extractPatterns,

        analyzeMemory
    };

})();
