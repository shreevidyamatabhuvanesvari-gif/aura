/**

* AURA Knowledge Graph Engine
* Version: 1.0.0
* Status: FROZEN
  */

const KnowledgeGraphEngine = (() => {

const VERSION = "1.0.0";

const graph = {
    nodes: [],
    edges: []
};

function createNode(name, type = "concept") {

    if (!name) return null;

    const existing = graph.nodes.find(
        node => node.name === name
    );

    if (existing) {
        return existing;
    }

    const node = {
        id: createId(),
        name,
        type,
        createdAt: Date.now()
    };

    graph.nodes.push(node);

    return node;
}

function createEdge(
    source,
    target,
    relationship = "related_to",
    score = 0.5
) {

    if (!source || !target) {
        return null;
    }

    const existing = graph.edges.find(
        edge =>
            edge.source === source &&
            edge.target === target &&
            edge.relationship === relationship
    );

    if (existing) {

        existing.score =
            Math.min(
                1,
                existing.score + 0.05
            );

        return existing;
    }

    const edge = {
        id: createId(),
        source,
        target,
        relationship,
        score,
        createdAt: Date.now()
    };

    graph.edges.push(edge);

    return edge;
}

function connect(
    source,
    target,
    relationship = "related_to",
    score = 0.5
) {

    createNode(source);
    createNode(target);

    return createEdge(
        source,
        target,
        relationship,
        score
    );
}

function getNode(name) {

    return graph.nodes.find(
        node => node.name === name
    ) || null;
}

function getConnections(name) {

    return graph.edges.filter(
        edge =>
            edge.source === name ||
            edge.target === name
    );
}

function getRelatedConcepts(name) {

    const connections =
        getConnections(name);

    return connections.map(edge => {

        if (
            edge.source === name
        ) {
            return edge.target;
        }

        return edge.source;

    });

}

function strengthenConnection(
    source,
    target,
    amount = 0.05
) {

    const edge =
        graph.edges.find(
            edge =>
                edge.source === source &&
                edge.target === target
        );

    if (!edge) {
        return false;
    }

    edge.score =
        Math.min(
            1,
            edge.score + amount
        );

    return true;
}

function importFragments(
    fragments = []
) {

    fragments.forEach(fragment => {

        if (!fragment.concept) {
            return;
        }

        createNode(
            fragment.concept
        );

        if (
            fragment.relatedConcepts
        ) {

            fragment.relatedConcepts
                .forEach(concept => {

                    connect(
                        fragment.concept,
                        concept,
                        "related_to",
                        0.5
                    );

                });

        }

    });

}

function exportGraph() {

    return JSON.parse(
        JSON.stringify(graph)
    );
}

function clearGraph() {

    graph.nodes.length = 0;
    graph.edges.length = 0;
}

function createId() {

    return (
        "kg_" +
        Math.random()
            .toString(36)
            .substring(2, 10)
    );

}

function stats() {

    return {

        version: VERSION,

        nodes:
            graph.nodes.length,

        edges:
            graph.edges.length
    };

}

return {

    VERSION,

    createNode,

    createEdge,

    connect,

    getNode,

    getConnections,

    getRelatedConcepts,

    strengthenConnection,

    importFragments,

    exportGraph,

    clearGraph,

    stats
};

})();
