/**

* AURA Learning Core Engine
* Version: 1.0.0
* Status: Production Foundation
  */

const LearningCoreEngine = (() => {

const VERSION = "1.0.0";

function clamp(value) {

    return Math.max(
        0,
        Math.min(
            100,
            Number(value || 0)
        )
    );
}

function calculateFrequencyScore(
    fragment
) {

    return clamp(
        fragment.frequencyScore
    );
}

function calculateQualityScore(
    fragment
) {

    let score =
        fragment.qualityScore || 50;

    if (
        fragment.relationships &&
        fragment.relationships.length
    ) {

        score += 10;
    }

    return clamp(score);
}

function calculateConfidenceScore(
    fragment
) {

    return clamp(
        fragment.confidenceScore || 50
    );
}

function evaluateFragment(
    fragment
) {

    const frequencyScore =
        calculateFrequencyScore(
            fragment
        );

    const qualityScore =
        calculateQualityScore(
            fragment
        );

    const confidenceScore =
        calculateConfidenceScore(
            fragment
        );

    const learningScore =
        Math.round(

            (
                frequencyScore +
                qualityScore +
                confidenceScore
            ) / 3
        );

    return {

        ...fragment,

        frequencyScore,

        qualityScore,

        confidenceScore,

        learningScore
    };
}

function evaluateFragments(
    fragments
) {

    return fragments.map(
        evaluateFragment
    );
}

function consolidate(
    fragments
) {

    const minimumScore =
        20;

    return fragments.filter(
        fragment =>

            fragment.learningScore >=
            minimumScore
    );
}

function rankFragments(
    fragments
) {

    return [...fragments]
        .sort(

            (
                a,
                b
            ) =>

                b.learningScore -
                a.learningScore
        );
}

function buildTrainingData(
    fragments
) {

    return fragments.map(
        fragment => ({

            concept:
                fragment.concept,

            topic:
                fragment.topic,

            learningScore:
                fragment.learningScore
        })
    );
}

function learn(
    fragments
) {

    const evaluated =
        evaluateFragments(
            fragments
        );

    const consolidated =
        consolidate(
            evaluated
        );

    const ranked =
        rankFragments(
            consolidated
        );

    const trainingData =
        buildTrainingData(
            ranked
        );

    return {

        version:
            VERSION,

        timestamp:
            new Date()
                .toISOString(),

        totalFragments:
            fragments.length,

        retainedFragments:
            ranked.length,

        trainingData,

        fragments:
            ranked
    };
}

function learnFromMemory() {

    if (
        typeof
        KnowledgeFragmentEngine ===
        "undefined"
    ) {

        throw new Error(

            "KnowledgeFragmentEngine not loaded"
        );
    }

    const knowledge =

        KnowledgeFragmentEngine
            .analyzeMemory();

    return learn(

        knowledge.fragments
    );
}

return {

    VERSION,

    evaluateFragment,

    evaluateFragments,

    consolidate,

    rankFragments,

    buildTrainingData,

    learn,

    learnFromMemory
};

})();
