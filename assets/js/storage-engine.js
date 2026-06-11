const StorageEngine = (() => {

    const PREFIX = "aura_knowledge_";

    function buildKey(key) {
        return PREFIX + key.toLowerCase().trim();
    }

    function save(key, value) {

        try {

            localStorage.setItem(
                buildKey(key),
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error(
                "StorageEngine.save",
                error
            );

            return false;
        }
    }

    function load(key) {

        try {

            const data =
                localStorage.getItem(
                    buildKey(key)
                );

            if (!data) {
                return null;
            }

            return JSON.parse(data);

        } catch (error) {

            console.error(
                "StorageEngine.load",
                error
            );

            return null;
        }
    }

    function exists(key) {

        return (
            localStorage.getItem(
                buildKey(key)
            ) !== null
        );
    }

    function remove(key) {

        try {

            localStorage.removeItem(
                buildKey(key)
            );

            return true;

        } catch (error) {

            console.error(
                "StorageEngine.remove",
                error
            );

            return false;
        }
    }

    function listKeys() {

        const keys = [];

        for (
            let i = 0;
            i < localStorage.length;
            i++
        ) {

            const key =
                localStorage.key(i);

            if (
                key &&
                key.startsWith(PREFIX)
            ) {

                keys.push(
                    key.replace(
                        PREFIX,
                        ""
                    )
                );
            }
        }

        return keys.sort();
    }

    function clearAll() {

        const keys =
            listKeys();

        for (const key of keys) {

            localStorage.removeItem(
                buildKey(key)
            );
        }

        return true;
    }

    function stats() {

        const keys =
            listKeys();

        return {

            totalRecords:
                keys.length,

            keys
        };
    }

    return {

        save,

        load,

        exists,

        remove,

        listKeys,

        clearAll,

        stats
    };

})();
