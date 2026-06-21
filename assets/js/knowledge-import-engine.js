const KnowledgeImportEngine = (() => {

    function normalizeTopic(topic) {

        return String(topic || "")
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

            getKnowledgeKey(
                topic
            ),

            knowledge
        );
    }

    function importText(

        topic,

        content,

        source = "manual"
    ) {

        const knowledge =

            getKnowledge(
                topic
            );

        const entry = {

            id:

                crypto.randomUUID(),

            timestamp:

                new Date()
                    .toISOString(),

            source,

            content
        };

        knowledge.entries.push(
            entry
        );

        saveKnowledge(

            topic,

            knowledge
        );

        /*
         * Sync with ContentMemoryEngine
         */

        if (

            typeof ContentMemoryEngine !==
            "undefined"

        ) {

            ContentMemoryEngine
                .addContent({

                    type:
                        "knowledge",

                    topic,

                    content,

                    source,

                    language:
                        "hindi"
                });
        }

        return {

            success: true,

            topic:

                normalizeTopic(
                    topic
                ),

            totalEntries:

                knowledge.entries.length
        };
    }

    function getEntries(topic) {

        const knowledge =

            getKnowledge(
                topic
            );

        return knowledge.entries;
    }

    function clearTopic(topic) {

        if (

            typeof ContentMemoryEngine !==
            "undefined"

        ) {

            const items =

                ContentMemoryEngine
                    .getByTopic(
                        topic
                    );

            items.forEach(

                item => {

                    ContentMemoryEngine
                        .remove(
                            item.id
                        );

                }
            );
        }

        return StorageEngine.remove(

            getKnowledgeKey(
                topic
            )
        );
    }

    function stats(topic) {

        const knowledge =

            getKnowledge(
                topic
            );

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
