const KnowledgeEngine = (() => {

    const INDEX_KEY = "knowledge_index";

    function getIndex() {

        const index =
            StorageEngine.load(
                INDEX_KEY
            );

        return Array.isArray(index)
            ? index
            : [];
    }

    function saveIndex(index) {

        return StorageEngine.save(
            INDEX_KEY,
            index
        );
    }

    function normalizeTopic(topic) {

        return topic
            .trim()
            .toLowerCase();
    }

    function registerTopic(topic) {

        const normalized =
            normalizeTopic(topic);

        const index =
            getIndex();

        if (
            index.includes(
                normalized
            )
        ) {

            return {
                success: true,
                exists: true,
                topic: normalized
            };
        }

        index.push(
            normalized
        );

        saveIndex(index);

        StorageEngine.save(
            "topic_" + normalized,
            {
                topic: normalized,
                createdAt:
                    new Date()
                    .toISOString(),
                status:
                    "registered",
                notes: [],
                progress: 0
            }
        );

        return {
            success: true,
            exists: false,
            topic: normalized
        };
    }

    function getTopic(topic) {

        return StorageEngine.load(
            "topic_" +
            normalizeTopic(topic)
        );
    }

    function updateProgress(
        topic,
        progress
    ) {

        const data =
            getTopic(topic);

        if (!data) {
            return false;
        }

        data.progress =
            progress;

        return StorageEngine.save(
            "topic_" +
            normalizeTopic(topic),
            data
        );
    }

    function addNote(
        topic,
        note
    ) {

        const data =
            getTopic(topic);

        if (!data) {
            return false;
        }

        data.notes.push({
            text: note,
            timestamp:
                new Date()
                .toISOString()
        });

        return StorageEngine.save(
            "topic_" +
            normalizeTopic(topic),
            data
        );
    }

    function listTopics() {

        return getIndex();
    }

    function stats() {

        return {

            totalTopics:
                getIndex().length,

            topics:
                getIndex()
        };
    }

    return {

        registerTopic,

        getTopic,

        updateProgress,

        addNote,

        listTopics,

        stats
    };

})();
