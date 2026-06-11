const SelfCriticEngine = (() => {

    function analyzeGraph() {

        const graph =
            KnowledgeGraphEngine
            .getGraph();

        const warnings =
            [];

        const relationMap =
            {};

        graph.edges.forEach(
            edge => {

                const key =
                    edge.source +
                    "::" +
                    edge.target;

                if (
                    !relationMap[key]
                ) {

                    relationMap[key] =
                        [];
                }

                relationMap[key]
                    .push(
                        edge.relation
                    );
            }
        );

        Object.keys(
            relationMap
        ).forEach(
            key => {

                const relations =
                    relationMap[key];

                const unique =
                    [
                        ...new Set(
                            relations
                        )
                    ];

                if (
                    unique.length >
                    1
                ) {

                    warnings.push({

                        type:
                            "multiple_relations",

                        target:
                            key,

                        relations:
                            unique
                    });
                }
            }
        );

        return warnings;
    }

    function analyzeInsights() {

        const insights =
            ReasoningEngine
            .generateInsights();

        const warnings =
            [];

        insights.forEach(
            insight => {

                if (
                    !insight.message ||
                    insight.message
                        .length <
                    10
                ) {

                    warnings.push({

                        type:
                            "weak_insight",

                        insight
                    });
                }
            }
        );

        return warnings;
    }

    function findIsolatedNodes() {

        const graph =
            KnowledgeGraphEngine
            .getGraph();

        const connected =
            new Set();

        graph.edges.forEach(
            edge => {

                connected.add(
                    edge.source
                );

                connected.add(
                    edge.target
                );
            }
        );

        return graph.nodes.filter(
            node =>
                !connected.has(
                    node
                )
        );
    }

    function evaluate() {

        const graphWarnings =
            analyzeGraph();

        const insightWarnings =
            analyzeInsights();

        const isolatedNodes =
            findIsolatedNodes();

        return {

            timestamp:
                new Date()
                .toISOString(),

            graphWarnings,

            insightWarnings,

            isolatedNodes,

            score:
                Math.max(
                    0,
                    100 -
                    (
                        graphWarnings
                            .length *
                            10
                    ) -
                    (
                        insightWarnings
                            .length *
                            5
                    ) -
                    (
                        isolatedNodes
                            .length *
                            2
                    )
                )
        };
    }

    return {

        evaluate,

        analyzeGraph,

        analyzeInsights,

        findIsolatedNodes
    };

})();
