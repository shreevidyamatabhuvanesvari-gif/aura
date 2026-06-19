/**

* AURA Feedback Engine
* Version: 1.0.0
* Status: FROZEN
* 
* Based On:
* docs/feedback-spec.md
  */

const FeedbackEngine = (() => {

const VERSION = "1.0.0";

const feedbackStore = [];

const topicScores = new Map();

/**
 * Create Feedback Record
 */
function createFeedback(
    contentId,
    feedbackType,
    topic = null
) {

    const feedback = {

        id: createId(),

        contentId,

        feedbackType,

        topic,

        score:
            resolveScore(
                feedbackType
            ),

        timestamp:
            Date.now()
    };

    feedbackStore.push(
        feedback
    );

    if (topic) {

        updateTopicScore(
            topic,
            feedback.score
        );

    }

    return feedback;
}

/**
 * Feedback Score
 */
function resolveScore(
    type
) {

    switch (type) {

        case "positive":
            return 1;

        case "negative":
            return -1;

        default:
            return 0;
    }
}

/**
 * Update Topic Score
 */
function updateTopicScore(
    topic,
    score
) {

    const current =
        topicScores.get(
            topic
        ) || 0;

    topicScores.set(
        topic,
        current + score
    );
}

/**
 * Positive Feedback
 */
function approve(
    contentId,
    topic
) {

    return createFeedback(
        contentId,
        "positive",
        topic
    );
}

/**
 * Negative Feedback
 */
function reject(
    contentId,
    topic
) {

    return createFeedback(
        contentId,
        "negative",
        topic
    );
}

/**
 * Neutral Feedback
 */
function neutral(
    contentId,
    topic
) {

    return createFeedback(
        contentId,
        "neutral",
        topic
    );
}

/**
 * Get Topic Score
 */
function getTopicScore(
    topic
) {

    return (
        topicScores.get(
            topic
        ) || 0
    );
}

/**
 * Preferred Topics
 */
function getPreferredTopics(
    limit = 10
) {

    return Array
        .from(
            topicScores.entries()
        )
        .sort(
            (a, b) =>
                b[1] - a[1]
        )
        .slice(
            0,
            limit
        )
        .map(
            ([topic, score]) => ({
                topic,
                score
            })
        );
}

/**
 * Feedback History
 */
function getHistory() {

    return [
        ...feedbackStore
    ];
}

/**
 * Content Feedback
 */
function getContentFeedback(
    contentId
) {

    return feedbackStore
        .filter(
            item =>
                item.contentId ===
                contentId
        );
}

/**
 * Statistics
 */
function stats() {

    const positive =
        feedbackStore.filter(
            f =>
                f.feedbackType ===
                "positive"
        ).length;

    const negative =
        feedbackStore.filter(
            f =>
                f.feedbackType ===
                "negative"
        ).length;

    const neutral =
        feedbackStore.filter(
            f =>
                f.feedbackType ===
                "neutral"
        ).length;

    return {

        version:
            VERSION,

        totalFeedback:
            feedbackStore.length,

        positive,

        negative,

        neutral,

        trackedTopics:
            topicScores.size
    };
}

/**
 * Clear Feedback
 */
function clear() {

    feedbackStore.length = 0;

    topicScores.clear();
}

/**
 * Generate ID
 */
function createId() {

    return (
        "fb_" +
        Math.random()
            .toString(36)
            .substring(2, 10)
    );
}

return {

    VERSION,

    approve,

    reject,

    neutral,

    getTopicScore,

    getPreferredTopics,

    getHistory,

    getContentFeedback,

    stats,

    clear
};

})();
