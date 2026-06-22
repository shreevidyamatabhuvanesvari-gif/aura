/**
 * AURA Pattern Extraction Engine
 * Version: 1.2.0
 * Status: Production Foundation
 */

const PatternExtractionEngine = (() => {

    const VERSION = "1.2.0";

    function normalize(text) {

        return String(text || "")
            .trim();
    }

    function buildConcepts(memory) {

        const conceptMap =
            new Map();

        memory.forEach(item => {

            const topic =
                String(
                    item.topic || "general"
                );

            const content =
                normalize(
                    item.content ||
                    item.text ||
                    ""
                );

            if (!content) {

                return;
            }

            const key =
                (
                    topic +
                    "::" +
                    content
                )
                .toLowerCase();

            if (!conceptMap.has(key)) {

                conceptMap.set(

                    key,

                    {

                        concept:
                            content,

                        topic,

                        score: 10,

                        frequency: 1
                    }
                );

                return;
            }

            const existing =
                conceptMap.get(
                    key
                );

            existing.frequency += 1;

            existing.score =
                Math.min(

                    100,

                    existing.score + 10
                );
        });

        return Array.from(
            conceptMap.values()
        )
        .sort(

            (
                a,
                b
            ) =>

                b.score -
                a.score
        );
    }

    function extractPatterns(memory) {

        const concepts =
            buildConcepts(
                memory
            );

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

        extractPatterns,

        analyzeMemory
    };

})();
