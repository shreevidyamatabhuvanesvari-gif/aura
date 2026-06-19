/**

* AURA Embedding Engine
* Version: 1.0.0
* Status: FROZEN
* 
* Purpose:
* Concept -> Vector
* Semantic Layer Foundation
  */

const EmbeddingEngine = (() => {

const VERSION = "1.0.0";

const embeddings = new Map();

/**
 * Deterministic hash
 */
function hash(str) {

    let value = 0;

    for (let i = 0; i < str.length; i++) {

        value =
            ((value << 5) - value)
            + str.charCodeAt(i);

        value |= 0;
    }

    return Math.abs(value);
}

/**
 * Generate vector
 */
function generateVector(
    concept,
    dimensions = 16
) {

    const seed =
        hash(concept);

    const vector = [];

    for (
        let i = 0;
        i < dimensions;
        i++
    ) {

        const value =

            (
                (
                    seed *
                    (i + 1)
                ) % 997
            ) / 997;

        vector.push(
            Number(
                value.toFixed(4)
            )
        );
    }

    return vector;
}

/**
 * Create embedding
 */
function createEmbedding(
    concept
) {

    if (!concept) {
        return null;
    }

    const vector =
        generateVector(
            concept
        );

    const embedding = {

        concept,

        vector,

        createdAt:
            Date.now()
    };

    embeddings.set(
        concept,
        embedding
    );

    return embedding;
}

/**
 * Get embedding
 */
function getEmbedding(
    concept
) {

    return (
        embeddings.get(
            concept
        ) || null
    );
}

/**
 * Import concepts
 */
function importConcepts(
    concepts = []
) {

    concepts.forEach(
        concept => {

            createEmbedding(
                concept
            );

        }
    );
}

/**
 * Cosine Similarity
 */
function similarity(
    conceptA,
    conceptB
) {

    const a =
        getEmbedding(
            conceptA
        );

    const b =
        getEmbedding(
            conceptB
        );

    if (!a || !b) {
        return 0;
    }

    let dot = 0;
    let magA = 0;
    let magB = 0;

    for (
        let i = 0;
        i < a.vector.length;
        i++
    ) {

        dot +=
            a.vector[i] *
            b.vector[i];

        magA +=
            a.vector[i] *
            a.vector[i];

        magB +=
            b.vector[i] *
            b.vector[i];
    }

    return Number(
        (
            dot /
            (
                Math.sqrt(magA) *
                Math.sqrt(magB)
            )
        )
        .toFixed(4)
    );
}

/**
 * Find nearest concepts
 */
function nearest(
    concept,
    limit = 5
) {

    const results = [];

    embeddings.forEach(
        (embedding) => {

            if (
                embedding.concept ===
                concept
            ) {
                return;
            }

            results.push({

                concept:
                    embedding.concept,

                score:
                    similarity(
                        concept,
                        embedding.concept
                    )

            });

        }
    );

    return results
        .sort(
            (a, b) =>
                b.score - a.score
        )
        .slice(
            0,
            limit
        );
}

/**
 * Export
 */
function exportEmbeddings() {

    return Array.from(
        embeddings.values()
    );
}

/**
 * Statistics
 */
function stats() {

    return {

        version:
            VERSION,

        totalEmbeddings:
            embeddings.size
    };
}

return {

    VERSION,

    createEmbedding,

    getEmbedding,

    importConcepts,

    similarity,

    nearest,

    exportEmbeddings,

    stats
};

})();
