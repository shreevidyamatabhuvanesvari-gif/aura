/**

* AURA Knowledge Fragment Engine
* Version: 1.0.0
* Status: Production Foundation
  */

const KnowledgeFragmentEngine = (() => {

const VERSION = "1.0.0";

function generateId() {

    return (
        "frag_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );
}

function normalize(value) {

    return String(value || "")
        .trim();
}

function clampScore(value) {

    const score =
        Number(value || 0);

    return Math.max(
        0,
        Math.min(
            100,
            score
        )
    );
}

function createFragment(data) {

    return {

        id:
            generateId(),

        concept:
            normalize(
                data.concept
            ),

        topic:
            normalize(
                data.topic
            ),

        type:
            normalize(
                data.type ||
                "concept"
            ),

        language:
            normalize(
                data.language ||
                "hindi"
            ),

        frequencyScore:
            clampScore(
                data.frequencyScore
            ),

        qualityScore:
            clampScore(
                data.qualityScore
            ),

        confidenceScore:
            clampScore(
                data.confidenceScore
            ),

        relationships:
            Array.isArray(
                data.relationships
            )
                ? data.relationships
                : [],

        source:
            normalize(
                data.source ||
                "pattern"
            ),

        createdAt:
            new Date()
                .toISOString()
    };
}

function createFromConcept(
    concept,
    topic,
    frequency
) {

    return createFragment({

        concept,

        topic,

        type:
            "concept",

        frequencyScore:
            Math.min(
                100,
                frequency
            ),

        qualityScore:
            50,

        confidenceScore:
            75
    });
}

function buildFragments(
    patternData
) {

    const fragments = [];

    if (
        !patternData ||
        !Array.isArray(
            patternData.concepts
        )
    ) {

        return fragments;
    }

    patternData.concepts
        .forEach(
            concept => {

                fragments.push(

                    createFromConcept(

                        concept.concept,

                        concept.topic ||
                        "general",

                        concept.score || 0
                    )
                );
            }
        );

    return fragments;
}

function mergeDuplicates(
    fragments
) {

    const map =
        new Map();

    fragments.forEach(
        fragment => {

            const key =
                (
                    fragment.concept +
                    "::" +
                    fragment.topic
                )
                .toLowerCase();

            if (
                !map.has(
                    key
                )
            ) {

                map.set(
                    key,
                    fragment
                );

                return;
            }

            const existing =
                map.get(
                    key
                );

            existing.frequencyScore =
                Math.max(

                    existing.frequencyScore,

                    fragment.frequencyScore
                );

            existing.qualityScore =
                Math.max(

                    existing.qualityScore,

                    fragment.qualityScore
                );

            existing.confidenceScore =
                Math.max(

                    existing.confidenceScore,

                    fragment.confidenceScore
                );
        }
    );

    return Array.from(
        map.values()
    );
}

function clusterByTopic(
    fragments
) {

    const clusters =
        {};

    fragments.forEach(
        fragment => {

            const topic =
                fragment.topic ||
                "general";

            if (
                !clusters[
                    topic
                ]
            ) {

                clusters[
                    topic
                ] = [];
            }

            clusters[
                topic
            ].push(
                fragment
            );
        }
    );

    return clusters;
}

function analyzePatterns(
    patternData
) {

    const fragments =
        buildFragments(
            patternData
        );

    const unique =
        mergeDuplicates(
            fragments
        );

    const clusters =
        clusterByTopic(
            unique
        );

    return {

        version:
            VERSION,

        timestamp:
            new Date()
                .toISOString(),

        totalFragments:
            unique.length,

        fragments:
            unique,

        clusters
    };
}

function analyzeMemory() {

    if (
        typeof
        PatternExtractionEngine ===
        "undefined"
    ) {

        throw new Error(
            "PatternExtractionEngine not loaded"
        );
    }

    const patterns =
        PatternExtractionEngine
            .analyzeMemory();

    return analyzePatterns(
        patterns
    );
}

return {

    VERSION,

    createFragment,

    buildFragments,

    mergeDuplicates,

    clusterByTopic,

    analyzePatterns,

    analyzeMemory
};

})();
