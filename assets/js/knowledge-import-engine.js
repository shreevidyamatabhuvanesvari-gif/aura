const KnowledgeImportEngine = (() => {

    function normalizeTopic(topic) {

        return topic
            .trim()
            .toLowerCase();
    }

    function getKnowledgeKey(topic) {

        return (
            "knowledge_content_" +
            normalizeTopic(topic)
        );
    }

    function createEmptyKnowledge(topic) {

        return {

            topic:
                normalizeTopic(topic),

            createdAt:
                new Date()
                .toISOString(),

            updatedAt:
                new Date()
                .toISOString(),

            entries: []
        };
    }

    function getKnowledge(topic) {

        const key =
            getKnowledgeKey(topic);

        const data =
            StorageEngine.load(key);

        if (data) {
            return data;
        }

        return createEmptyKnowledge(
            topic
        );
    }

    function saveKnowledge(
        topic,
        knowledge
    ) {

        knowledge.updatedAt =
            new Date()
            .toISOString();

        return StorageEngine.save(
            getKnowledgeKey(topic),
            knowledge
        );
    }

    function importText(
        topic,
        content,
        source = "manual"
    ) {

        const knowledge =
            getKnowledge(topic);

        knowledge.entries.push({

            id:
                crypto.randomUUID(),

            timestamp:
                new Date()
                .toISOString(),

            source:
                source,

            content:
                content
        });

        saveKnowledge(
            topic,
            knowledge
        );

        return {

            success: true,

            topic:
                normalizeTopic(topic),

            totalEntries:
                knowledge.entries.length
        };
    }

    function getEntries(topic) {

        const knowledge =
            getKnowledge(topic);

        return knowledge.entries;
    }

    function clearTopic(topic) {

        return StorageEngine.remove(
            getKnowledgeKey(topic)
        );
    }

    function stats(topic) {

        const knowledge =
            getKnowledge(topic);

        return {

            topic:
                knowledge.topic,

            totalEntries:
                knowledge.entries.length,

            lastUpdated:
                knowledge.updatedAt
        };
    }

    return {

        importText,

        getEntries,

        clearTopic,

        stats
    };

})();
