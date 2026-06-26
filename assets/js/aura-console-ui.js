/**
 * AURA Console UI
 * Version: 1.0.0
 * Status: Production UI Layer
 */

(() => {
    "use strict";

    const STORAGE_KEYS = {
        history: "aura_console_history_v1",
        commandCount: "aura_console_command_count_v1"
    };

    const MAX_HISTORY = 50;

    const state = {
        bootTime: new Date(),
        history: [],
        historyIndex: -1,
        commandCount: 0,
        lastResult: null,
        lastOutputText: "",
        initialized: false
    };

    const cache = {};

    function byId(...ids) {
        for (const id of ids) {
            const el = document.getElementById(id);
            if (el) return el;
        }
        return null;
    }

    function getElements() {
        if (cache.input) return cache;

        cache.input = byId("commandInput", "command");
        cache.output = byId("outputConsole", "output");
        cache.executeButton = byId("executeButton");
        cache.copyButton = byId("copyButton");
        cache.clearButton = byId("clearButton");
        cache.downloadButton = byId("downloadButton");
        cache.characterCount = byId("characterCount");
        cache.shortcutInfo = byId("shortcutInfo");
        cache.executionTime = byId("executionTime");
        cache.commandCount = byId("commandCount");
        cache.bootTime = byId("bootTime");
        cache.engineStatus = byId("engineStatus");
        cache.systemStatus = byId("systemStatus");
        cache.systemIndicator = byId("systemIndicator");
        cache.toastContainer = byId("toastContainer");
        cache.modalContainer = byId("modalContainer");
        return cache;
    }

    function safeParseJSON(value) {
        try {
            return JSON.parse(value);
        } catch {
            return null;
        }
    }

    function readHistory() {
        const raw = localStorage.getItem(STORAGE_KEYS.history);
        const data = raw ? safeParseJSON(raw) : null;
        state.history = Array.isArray(data) ? data.slice(0, MAX_HISTORY) : [];
        state.historyIndex = state.history.length;
    }

    function writeHistory() {
        localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(state.history));
    }

    function readCommandCount() {
        const raw = localStorage.getItem(STORAGE_KEYS.commandCount);
        const count = Number(raw);
        state.commandCount = Number.isFinite(count) ? count : 0;
    }

    function writeCommandCount() {
        localStorage.setItem(STORAGE_KEYS.commandCount, String(state.commandCount));
    }

    function normalizeCommand(value) {
        return String(value || "").replace(/\r/g, "").trim();
    }

    function prettyPrint(value) {
        if (typeof value === "string") return value;
        if (value === undefined) return "";
        try {
            return JSON.stringify(value, null, 4);
        } catch {
            return String(value);
        }
    }

    function formatTimestamp(date) {
        return date.toLocaleString();
    }

    function getOutputText() {
        const { output } = getElements();
        return output ? (output.textContent || output.innerText || "") : "";
    }

    function setOutputText(text, status) {
        const { output } = getElements();
        if (!output) return;

        output.textContent = text;

        output.classList.remove(
            "output-success",
            "output-error",
            "output-warning",
            "output-info"
        );

        if (status === "success") {
            output.classList.add("output-success");
        } else if (status === "error") {
            output.classList.add("output-error");
        } else if (status === "warning") {
            output.classList.add("output-warning");
        } else {
            output.classList.add("output-info");
        }

        output.scrollTop = output.scrollHeight;
        state.lastOutputText = text;
    }

    function updateCounters() {
        const { characterCount, commandCount, input } = getElements();

        if (characterCount) {
            const len = input ? input.value.length : 0;
            characterCount.textContent = `Characters : ${len}`;
        }

        if (commandCount) {
            commandCount.textContent = String(state.commandCount);
        }
    }

    function updateBootInfo() {
        const { bootTime, engineStatus, systemStatus, systemIndicator } = getElements();

        if (bootTime) {
            bootTime.textContent = formatTimestamp(state.bootTime);
        }

        const engineReady = !!(window.AURA && typeof window.AURA.execute === "function");
        const registryReady = !!(window.CommandRegistry && typeof window.CommandRegistry.execute === "function");

        if (engineStatus) {
            engineStatus.textContent = engineReady
                ? "Ready"
                : (registryReady ? "Registry Ready" : "Waiting");
        }

        if (systemStatus) {
            systemStatus.textContent = engineReady
                ? "System Ready"
                : (registryReady ? "Command Layer Ready" : "Booting...");
        }

        if (systemIndicator) {
            systemIndicator.style.background = engineReady ? "var(--accent)" : "var(--warning)";
            systemIndicator.style.boxShadow = engineReady
                ? "0 0 0 6px rgba(34, 197, 94, 0.15)"
                : "0 0 0 6px rgba(245, 158, 11, 0.14)";
        }
    }

    function showToast(title, message, type) {
        const { toastContainer } = getElements();
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = `toast toast-${type || "info"}`;
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");

        const close = document.createElement("button");
        close.className = "toast-close";
        close.type = "button";
        close.setAttribute("aria-label", "Close notification");
        close.textContent = "×";

        const header = document.createElement("div");
        header.className = "toast-title";

        const titleText = document.createElement("span");
        titleText.textContent = title || "AURA";

        header.appendChild(titleText);
        header.appendChild(close);

        const body = document.createElement("div");
        body.className = "toast-message";
        body.textContent = message || "";

        toast.appendChild(header);
        toast.appendChild(body);

        function dismiss() {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }

        close.addEventListener("click", dismiss);
        toastContainer.appendChild(toast);

        window.setTimeout(dismiss, 2800);
    }

    async function copyText(text) {
        const value = String(text || "");
        if (!value.trim()) {
            showToast("Copy", "Nothing to copy.", "warning");
            return false;
        }

        try {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
                await navigator.clipboard.writeText(value);
            } else {
                const temp = document.createElement("textarea");
                temp.value = value;
                temp.setAttribute("readonly", "readonly");
                temp.style.position = "fixed";
                temp.style.left = "-9999px";
                document.body.appendChild(temp);
                temp.select();
                document.execCommand("copy");
                document.body.removeChild(temp);
            }

            showToast("Copy", "Output copied to clipboard.", "success");
            return true;
        } catch (error) {
            console.error("Copy failed:", error);
            showToast("Copy Failed", "Unable to copy output.", "error");
            return false;
        }
    }

    function downloadText(filename, content) {
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
    }

    function downloadOutput() {
        const output = getOutputText().trim();
        if (!output) {
            showToast("Download", "Nothing to download.", "warning");
            return;
        }

        const stamp = new Date().toISOString().replace(/[:.]/g, "-");
        downloadText(`aura-output-${stamp}.txt`, output);
        showToast("Download", "Output downloaded.", "success");
    }

    function clearOutput() {
        const { output, executionTime } = getElements();

        if (output) {
            output.textContent = "Awaiting command...";
            output.classList.remove(
                "output-success",
                "output-error",
                "output-warning",
                "output-info"
            );
        }

        if (executionTime) {
            executionTime.textContent = "Ready";
        }

        state.lastResult = null;
        state.lastOutputText = "";
        showToast("Clear", "Output cleared.", "info");
    }

    function addToHistory(command) {
        const normalized = normalizeCommand(command);
        if (!normalized) return;

        const last = state.history[state.history.length - 1];
        if (last === normalized) {
            state.historyIndex = state.history.length;
            return;
        }

        state.history.push(normalized);

        if (state.history.length > MAX_HISTORY) {
            state.history = state.history.slice(-MAX_HISTORY);
        }

        state.historyIndex = state.history.length;
        writeHistory();
    }

    function setInputValue(value) {
        const { input } = getElements();
        if (!input) return;
        input.value = value;
        updateCounters();
    }

    function moveCaretToEnd(element) {
        if (!element) return;
        const length = element.value.length;
        try {
            element.setSelectionRange(length, length);
        } catch {
            // ignore
        }
    }

    function navigateHistory(direction) {
        const { input } = getElements();
        if (!input || !state.history.length) return;

        if (direction === -1) {
            if (state.historyIndex > 0) {
                state.historyIndex--;
            }
        } else if (direction === 1) {
            if (state.historyIndex < state.history.length - 1) {
                state.historyIndex++;
            } else {
                state.historyIndex = state.history.length;
                input.value = "";
                updateCounters();
                return;
            }
        }

        const value = state.history[state.historyIndex] || "";
        input.value = value;
        updateCounters();
        moveCaretToEnd(input);
    }

    function renderResult(command, result, elapsedMs) {
        const timestamp = formatTimestamp(new Date());
        const pretty = prettyPrint(result);

        return [
            `Timestamp: ${timestamp}`,
            `Command: ${command}`,
            `Execution Time: ${elapsedMs} ms`,
            "",
            pretty
        ].join("\n");
    }

    function resolveExecutor(command) {
        if (window.AURA && typeof window.AURA.execute === "function") {
            return window.AURA.execute(command);
        }

        if (typeof window.CommandRegistry !== "undefined" && typeof window.CommandRegistry.execute === "function") {
            if (typeof window.AURA !== "undefined" && window.AURA && typeof window.AURA.execute === "function") {
                return window.AURA.execute(command);
            }
        }

        throw new Error("AURA executor is not ready");
    }

    function executeCommand(commandOverride) {
        const { input, executionTime } = getElements();
        const command = normalizeCommand(
            typeof commandOverride === "string" ? commandOverride : (input ? input.value : "")
        );

        if (!command) {
            showToast("Execute", "Command is empty.", "warning");
            return null;
        }

        addToHistory(command);
        state.commandCount += 1;
        writeCommandCount();
        updateCounters();

        if (executionTime) {
            executionTime.textContent = "Running...";
        }

        const start = (window.performance && typeof window.performance.now === "function")
            ? window.performance.now()
            : Date.now();

        let result;
        let success = true;

        try {
            result = resolveExecutor(command);
            success = !(result && typeof result === "object" && result.success === false);
        } catch (error) {
            success = false;
            result = {
                auraVersion: (window.AURA && window.AURA.VERSION) || "1.4.0",
                success: false,
                error: error && error.message ? error.message : String(error)
            };
        }

        const end = (window.performance && typeof window.performance.now === "function")
            ? window.performance.now()
            : Date.now();

        const elapsed = Math.max(0, Math.round(end - start));
        const outputText = renderResult(command, result, elapsed);

        state.lastResult = result;
        setOutputText(outputText, success ? "success" : "error");

        if (executionTime) {
            executionTime.textContent = `${elapsed} ms`;
        }

        showToast(
            success ? "Execute" : "Error",
            success ? "Command executed successfully." : "Command execution failed.",
            success ? "success" : "error"
        );

        if (input) {
            input.focus();
        }

        return result;
    }

    function bindEvents() {
        const {
            input,
            executeButton,
            copyButton,
            clearButton,
            downloadButton
        } = getElements();

        if (input) {
            input.addEventListener("input", updateCounters);

            input.addEventListener("keydown", function (event) {
                const key = event.key;

                if (event.ctrlKey && key === "Enter") {
                    event.preventDefault();
                    executeCommand();
                    return;
                }

                if (key === "ArrowUp") {
                    event.preventDefault();
                    navigateHistory(-1);
                    return;
                }

                if (key === "ArrowDown") {
                    event.preventDefault();
                    navigateHistory(1);
                    return;
                }
            });
        }

        if (executeButton) {
            executeButton.addEventListener("click", function () {
                executeCommand();
            });
        }

        if (copyButton) {
            copyButton.addEventListener("click", function () {
                copyText(getOutputText());
            });
        }

        if (clearButton) {
            clearButton.addEventListener("click", function () {
                clearOutput();
            });
        }

        if (downloadButton) {
            downloadButton.addEventListener("click", function () {
                downloadOutput();
            });
        }
    }

    function init() {
        if (state.initialized) return;

        getElements();
        readHistory();
        readCommandCount();
        bindEvents();
        updateCounters();
        updateBootInfo();

        const { input, output } = getElements();

        if (output && !String(output.textContent || "").trim()) {
            output.textContent = "Awaiting command...";
        }

        if (input) {
            input.focus();
            moveCaretToEnd(input);
        }

        state.initialized = true;

        if (window.runCommand !== executeCommand) {
            window.runCommand = executeCommand;
        }

        showToast("AURA", "Console UI is ready.", "success");
    }

    function refreshStatus() {
        updateBootInfo();
        updateCounters();
    }

    function getState() {
        return {
            bootTime: state.bootTime,
            historySize: state.history.length,
            commandCount: state.commandCount,
            lastResult: state.lastResult
        };
    }

    window.AuraConsoleUI = {
        init,
        executeCommand,
        clearOutput,
        copyText,
        downloadOutput,
        refreshStatus,
        getState
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
