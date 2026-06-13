const MemoryConsolidationEngine = (() => {

    function normalizeText(text) {

        return String(text)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");
    }

    function getTopicKnowledge(topic) {

        return KnowledgeImportEngine
            .getEntries(topic);
    }

    function findDuplicates(topic) {

        const entries =
            getTopicKnowledge(topic);

        const seen =
            new Map();

        const duplicates =
            [];

        entries.forEach(entry => {

            const content =
                normalizeText(
                    entry.content || ""
                );

            if (
                seen.has(content)
            ) {

                duplicates.push({

                    original:
                        seen.get(content),

                    duplicate:
                        entry
                });

            } else {

                seen.set(
                    content,
                    entry
                );
            }
        });

        return duplicates;
    }

    function calculateHealth(topic) {

        const entries =
            getTopicKnowledge(topic);

        const duplicates =
            findDuplicates(topic);

        if (
            entries.length === 0
        ) {

            return {
                score: 100,
                entries: 0,
                duplicates: 0
            };
        }

        const duplicateRatio =
            duplicates.length /
            entries.length;

        const score =
            Math.max(
                0,
                Math.round(
                    100 -
                    (
                        duplicateRatio *
                        100
                    )
                )
            );

        return {

            score,

            entries:
                entries.length,

            duplicates:
                duplicates.length
        };
    }

    function rankKnowledge(topic) {

        const entries =
            getTopicKnowledge(topic);

        return entries.map(
            entry => ({

                id:
                    entry.id,

                source:
                    entry.source,

                content:
                    entry.content,

                score:
                    normalizeText(
                        entry.content
                    ).length
            })
        )
        .sort(
            (
                a,
                b
            ) =>
                b.score -
                a.score
        );
    }

    function buildReport(topic) {

        return {

            topic,

            timestamp:
                new Date()
                .toISOString(),

            health:
                calculateHealth(
                    topic
                ),

            duplicates:
                findDuplicates(
                    topic
                ),

            ranking:
                rankKnowledge(
                    topic
                )
            .slice(0, 10)
        };
    }

    function consolidate(topic) {

        const report =
            buildReport(topic);

        StorageEngine.save(

            "memory_report_" +
            topic.toLowerCase(),

            report
        );

        return report;
    }

    function getReport(topic) {

        return StorageEngine.load(

            "memory_report_" +
            topic.toLowerCase()
        );
    }

    return {

        consolidate,

        getReport,

        calculateHealth,

        findDuplicates,

        rankKnowledge,

        buildReport
    };

})();
