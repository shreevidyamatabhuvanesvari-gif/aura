const ReasoningEngine = (() => {

    function getGraph() {

        return KnowledgeGraphEngine
            .getGraph();
    }

    function findSharedConcepts() {

        return KnowledgeGraphEngine
            .findCommonTargets();
    }

    function findRelatedNodes(node) {

        const graph =
            getGraph();

        const related =
            [];

        graph.edges.forEach(
            edge => {

                if (
                    edge.source === node
                ) {

                    related.push({

                        relation:
                            edge.relation,

                        target:
                            edge.target
                    });
                }

                if (
                    edge.target === node
                ) {

                    related.push({

                        relation:
                            edge.relation,

                        source:
                            edge.source
                    });
                }
            }
        );

        return related;
    }

    function compareNodes(
        nodeA,
        nodeB
    ) {

        const graph =
            getGraph();

        const targetsA =
            graph.edges
                .filter(
                    edge =>
                        edge.source ===
                        nodeA
                )
                .map(
                    edge =>
                        edge.target
                );

        const targetsB =
            graph.edges
                .filter(
                    edge =>
                        edge.source ===
                        nodeB
                )
                .map(
                    edge =>
                        edge.target
                );

        const common =
            targetsA.filter(
                target =>
                    targetsB.includes(
                        target
                    )
            );

        return {

            nodeA,
            nodeB,

            commonConcepts:
                common,

            similarityScore:
                common.length
        };
    }

    function generateInsights() {

        const shared =
            findSharedConcepts();

        const insights =
            [];

        shared.forEach(
            item => {

                insights.push({

                    type:
                        "relationship",

                    message:
                        item.related.join(
                            ", "
                        ) +
                        " share concept " +
                        item.concept
                });
            }
        );

        return insights;
    }

    function run() {

        return {

            timestamp:
                new Date()
                .toISOString(),

            insights:
                generateInsights()
        };
    }

    return {

        run,

        compareNodes,

        findRelatedNodes,

        generateInsights
    };

})();
