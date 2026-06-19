/**

* AURA Vector Search Engine
* Version: 1.0.0
* Status: FROZEN
* 
* Depends On:
* - EmbeddingEngine
    */

const VectorSearchEngine = (() => {

const VERSION = "1.0.0";

/**
 * Search similar concepts
 */
function search(
    queryConcept,
    limit = 10
) {

    if (!queryConcept) {
        return [];
    }

    const embedding =
        EmbeddingEngine
            .getEmbedding(
                queryConcept
            );

    if (!embedding) {
        return [];
    }

    return EmbeddingEngine
        .nearest(
            queryConcept,
            limit
        );
}

/**
 * Expand concept context
 */
function expandConcept(
    concept,
    limit = 10
) {

    const related =
        search(
            concept,
            limit
        );

    return {

        concept,

        expansion:
            related.map(
                item =>
                    item.concept
            ),

        results:
            related
    };
}

/**
 * Exact match search
 */
function exactSearch(
    concept
) {

    const embedding =
        EmbeddingEngine
            .getEmbedding(
                concept
            );

    if (!embedding) {
        return null;
    }

    return {

        concept,

        vector:
            embedding.vector
    };
}

/**
 * Search with score threshold
 */
function searchByThreshold(
    concept,
    threshold = 0.7,
    limit = 20
) {

    const results =
        search(
            concept,
            limit
        );

    return results.filter(
        item =>
            item.score >=
            threshold
    );
}

/**
 * Topic Expansion
 */
function topicExpansion(
    concept,
    limit = 15
) {

    const related =
        search(
            concept,
            limit
        );

    const topics =
        related.map(
            item => ({
                concept:
                    item.concept,

                score:
                    item.score
            })
        );

    return {

        root:
            concept,

        topics
    };
}

/**
 * Ranked Results
 */
function rankedSearch(
    concept,
    limit = 10
) {

    return search(
        concept,
        limit
    )
    .sort(
        (a, b) =>
            b.score -
            a.score
    );
}

/**
 * Creative Context
 */
function buildCreativeContext(
    concept,
    limit = 10
) {

    const ranked =
        rankedSearch(
            concept,
            limit
        );

    return {

        root:
            concept,

        context:
            ranked.map(
                item =>
                    item.concept
            ),

        ranking:
            ranked
    };
}

/**
 * Statistics
 */
function stats() {

    return {

        version:
            VERSION,

        ready:
            typeof
            EmbeddingEngine !==
            "undefined"
    };
}

return {

    VERSION,

    search,

    exactSearch,

    searchByThreshold,

    expandConcept,

    topicExpansion,

    rankedSearch,

    buildCreativeContext,

    stats
};

})();
