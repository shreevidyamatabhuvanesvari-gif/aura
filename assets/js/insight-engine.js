const InsightEngine = (() => {

    function getGraphInsights() {

        return KnowledgeGraphEngine
            .findCommonTargets();
    }

    function generateSharedConceptInsights() {

        const shared =
            getGraphInsights();

        const insights =
            [];

        shared.forEach(item => {

            const related =
                item.related || [];

            if (
                related.length < 2
            ) {

                return;
            }

            insights.push({

                type:
                    "shared_concept",

                concept:
                    item.concept,

                entities:
                    related,

                message:
                    related.join(
                        ", "
                    ) +
                    " share the concept '" +
                    item.concept +
                    "'."
            });
        });

        return insights;
    }

    function generateClusterInsights() {

        const graph =
            KnowledgeGraphEngine
            .getGraph();

        const targetMap =
            {};

        graph.edges.forEach(edge => {

            if (
                !targetMap[
                    edge.target
                ]
            ) {

                targetMap[
                    edge.target
                ] = 0;
            }

            targetMap[
                edge.target
            ]++;
        });

        const clusters =
            [];

        Object.keys(
            targetMap
        ).forEach(target => {

            if (
                targetMap[
                    target
                ] >= 2
            ) {

                clusters.push({

                    concept:
                        target,

                    connections:
                        targetMap[
                            target
                        ],

                    message:
                        target +
                        " appears across multiple knowledge areas."
                });
            }
        });

        return clusters;
    }

    function generateLearningRecommendations() {

        const topics =
            KnowledgeEngine
            .listTopics();

        const recommendations =
            [];

        topics.forEach(topic => {

            const progress =
                PlannerEngine
                .getProgress(
                    topic
                );

            if (
                !progress
            ) {

                recommendations.push({

                    topic,

                    recommendation:
                        "Create a learning plan."
                });

                return;
            }

            if (
                progress.progress <
                50
            ) {

                recommendations.push({

                    topic,

                    recommendation:
                        "Continue foundational learning."
                });

            } else {

                recommendations.push({

                    topic,

                    recommendation:
                        "Move toward advanced concepts."
                });
            }
        });

        return recommendations;
    }

    function generateMemoryInsights() {

        const topics =
            KnowledgeEngine
            .listTopics();

        const results =
            [];

        topics.forEach(topic => {

            const health =
                MemoryConsolidationEngine
                .calculateHealth(
                    topic
                );

            results.push({

                topic,

                score:
                    health.score,

                entries:
                    health.entries,

                duplicates:
                    health.duplicates
            });
        });

        return results;
    }

    function generateAllInsights() {

        return {

            timestamp:
                new Date()
                .toISOString(),

            sharedConcepts:
                generateSharedConceptInsights(),

            clusters:
                generateClusterInsights(),

            learning:
                generateLearningRecommendations(),

            memory:
                generateMemoryInsights()
        };
    }

    function summary() {

        const report =
            generateAllInsights();

        return {

            timestamp:
                report.timestamp,

            totalSharedConcepts:
                report.sharedConcepts
                .length,

            totalClusters:
                report.clusters
                .length,

            learningTopics:
                report.learning
                .length,

            memoryTopics:
                report.memory
                .length
        };
    }

    return {

        generateAllInsights,

        generateSharedConceptInsights,

        generateClusterInsights,

        generateLearningRecommendations,

        generateMemoryInsights,

        summary
    };

})();
