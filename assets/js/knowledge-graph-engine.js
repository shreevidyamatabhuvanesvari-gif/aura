const KnowledgeGraphEngine = (() => {

    const GRAPH_KEY =
        "knowledge_graph";

    function loadGraph() {

        const graph =
            StorageEngine.load(
                GRAPH_KEY
            );

        if (graph) {
            return graph;
        }

        return {
            nodes: [],
            edges: []
        };
    }

    function saveGraph(graph) {

        return StorageEngine.save(
            GRAPH_KEY,
            graph
        );
    }

    function nodeExists(
        graph,
        node
    ) {

        return graph.nodes.includes(
            node
        );
    }

    function addNode(node) {

        const graph =
            loadGraph();

        const normalized =
            node.trim();

        if (
            !nodeExists(
                graph,
                normalized
            )
        ) {

            graph.nodes.push(
                normalized
            );

            saveGraph(graph);
        }

        return true;
    }

    function edgeExists(
        graph,
        source,
        relation,
        target
    ) {

        return graph.edges.some(
            edge =>
                edge.source ===
                    source &&
                edge.relation ===
                    relation &&
                edge.target ===
                    target
        );
    }

    function addRelation(
        source,
        relation,
        target
    ) {

        const graph =
            loadGraph();

        addNode(source);
        addNode(target);

        const freshGraph =
            loadGraph();

        if (
            !edgeExists(
                freshGraph,
                source,
                relation,
                target
            )
        ) {

            freshGraph.edges.push({

                id:
                    crypto.randomUUID(),

                source,

                relation,

                target,

                createdAt:
                    new Date()
                    .toISOString()
            });

            saveGraph(
                freshGraph
            );
        }

        return true;
    }

    function getGraph() {

        return loadGraph();
    }

    function getNodeRelations(
        node
    ) {

        const graph =
            loadGraph();

        return graph.edges.filter(
            edge =>
                edge.source ===
                    node ||
                edge.target ===
                    node
        );
    }

    function findCommonTargets() {

        const graph =
            loadGraph();

        const insights =
            [];

        const targetMap =
            {};

        graph.edges.forEach(
            edge => {

                if (
                    !targetMap[
                        edge.target
                    ]
                ) {

                    targetMap[
                        edge.target
                    ] = [];
                }

                targetMap[
                    edge.target
                ].push(
                    edge.source
                );
            }
        );

        Object.keys(
            targetMap
        ).forEach(
            target => {

                const sources =
                    targetMap[
                        target
                    ];

                if (
                    sources.length >=
                    2
                ) {

                    insights.push({

                        type:
                            "shared_concept",

                        concept:
                            target,

                        related:
                            sources
                    });
                }
            }
        );

        return insights;
    }

    function stats() {

        const graph =
            loadGraph();

        return {

            nodes:
                graph.nodes.length,

            relations:
                graph.edges.length
        };
    }

    function clearGraph() {

        return StorageEngine.save(
            GRAPH_KEY,
            {
                nodes: [],
                edges: []
            }
        );
    }

    return {

        addNode,

        addRelation,

        getGraph,

        getNodeRelations,

        findCommonTargets,

        stats,

        clearGraph
    };

})();
