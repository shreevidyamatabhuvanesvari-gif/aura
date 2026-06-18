/**

* AURA Content Memory Engine
* Version: 1.0.0
* Status: Production Foundation
  */

const ContentMemoryEngine = (() => {

const VERSION = "1.0.0";

const STORAGE_KEY =
    "aura_content_memory";

let memory = [];

function generateId() {

    return (
        "cnt_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );
}

function load() {

    try {

        const raw =
            localStorage.getItem(
                STORAGE_KEY
            );

        memory =
            raw
                ? JSON.parse(raw)
                : [];

    } catch (error) {

        console.error(
            "ContentMemoryEngine load failed",
            error
        );

        memory = [];
    }
}

function save() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(memory)
    );
}

function normalize(value) {

    return String(value || "")
        .trim();
}

function addContent(data) {

    const entry = {

        id:
            generateId(),

        type:
            normalize(
                data.type
            ),

        topic:
            normalize(
                data.topic
            ),

        language:
            normalize(
                data.language ||
                "hindi"
            ),

        content:
            normalize(
                data.content
            ),

        tags:
            Array.isArray(
                data.tags
            )
                ? data.tags
                : [],

        source:
            normalize(
                data.source ||
                "user"
            ),

        rating:
            Number(
                data.rating || 0
            ),

        learningScore:
            Number(
                data.learningScore || 0
            ),

        createdAt:
            new Date()
                .toISOString()
    };

    memory.push(entry);

    save();

    return entry;
}

function getAll() {

    return [...memory];
}

function getById(id) {

    return memory.find(
        item =>
            item.id === id
    );
}

function remove(id) {

    const before =
        memory.length;

    memory =
        memory.filter(
            item =>
                item.id !== id
        );

    save();

    return (
        before !==
        memory.length
    );
}

function search(query) {

    const q =
        normalize(query)
            .toLowerCase();

    return memory.filter(
        item =>

            item.content
                .toLowerCase()
                .includes(q) ||

            item.topic
                .toLowerCase()
                .includes(q)
    );
}

function getByType(type) {

    const t =
        normalize(type)
            .toLowerCase();

    return memory.filter(
        item =>
            item.type
                .toLowerCase() === t
    );
}

function getByTopic(topic) {

    const t =
        normalize(topic)
            .toLowerCase();

    return memory.filter(
        item =>
            item.topic
                .toLowerCase() === t
    );
}

function getByLanguage(language) {

    const lang =
        normalize(language)
            .toLowerCase();

    return memory.filter(
        item =>
            item.language
                .toLowerCase() ===
            lang
    );
}

function getStatistics() {

    const stats = {

        totalEntries:
            memory.length,

        byType: {},

        byLanguage: {}
    };

    memory.forEach(
        item => {

            stats.byType[
                item.type
            ] =
                (
                    stats.byType[
                        item.type
                    ] || 0
                ) + 1;

            stats.byLanguage[
                item.language
            ] =
                (
                    stats.byLanguage[
                        item.language
                    ] || 0
                ) + 1;
        }
    );

    return stats;
}

function clear() {

    memory = [];

    save();
}

load();

return {

    VERSION,

    addContent,

    getAll,

    getById,

    remove,

    search,

    getByType,

    getByTopic,

    getByLanguage,

    getStatistics,

    clear
};

})();
