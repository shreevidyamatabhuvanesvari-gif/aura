/**
 * AURA Bootstrap
 * Version: 1.0.0
 * Status: Production Startup Orchestrator
 */

(() => {
    "use strict";

    const VERSION = "1.0.0";

    const MODULES = [
        { name: "StorageEngine", label: "Storage" },
        { name: "TaskManager", label: "Task Manager" },

        { name: "KnowledgeEngine", label: "Knowledge" },
        { name: "LearningEngine", label: "Learning" },
        { name: "KnowledgeImportEngine", label: "Knowledge Import" },

        { name: "ContentMemoryEngine", label: "Content Memory" },
        { name: "PatternExtractionEngine", label: "Pattern Extraction" },
        { name: "MemoryConsolidationEngine", label: "Memory Consolidation" },
        { name: "KnowledgeFragmentEngine", label: "Knowledge Fragment" },

        { name: "KnowledgeGraphEngine", label: "Knowledge Graph" },
        { name: "SemanticNetworkEngine", label: "Semantic Network" },

        { name: "LearningCoreEngine", label: "Learning Core" },

        { name: "ReasoningEngine", label: "Reasoning" },
        { name: "HumanReasoningEngine", label: "Human Reasoning" },
        { name: "SelfCriticEngine", label: "Self Critic" },
        { name: "PlannerEngine", label: "Planner" },
        { name: "InsightEngine", label: "Insight" },

        { name: "CreativeMindEngine", label: "Creative Mind" },

        { name: "PhilosophyEngine", label: "Philosophy" },
        { name: "QuestionAnswerEngine", label: "Question Answer" },
        { name: "ComparisonEngine", label: "Comparison" },

        { name: "GoalManager", label: "Goal Manager" },
        { name: "MetaLearningEngine", label: "Meta Learning" },
        { name: "SelfImprovementEngine", label: "Self Improvement" },

        { name: "EmbeddingEngine", label: "Embedding" },
        { name: "VectorSearchEngine", label: "Vector Search" },

        { name: "FeedbackEngine", label: "Feedback" },

        { name: "HindiInteractionEngine", label: "Hindi Interaction" },
        { name: "HindiIntentEngine", label: "Hindi Intent" },
        { name: "HindiCommandRouter", label: "Hindi Command Router" },

        { name: "CommandManifest", label: "Command Manifest" },
        { name: "CommandRegistry", label: "Command Registry" },

        { name: "AURA", label: "Core Command Engine" }
    ];

    const state = {
        startedAt: new Date(),
        booted: false,
        ready: false,
        report: null
    };

    function exists(globalName) {
        try {
            return typeof window[globalName] !== "undefined" && window[globalName] !== null;
        } catch {
            return false;
        }
    }

    function safeCall(fn, fallback = null) {
        try {
            return fn();
        } catch (error) {
            return fallback;
        }
    }

    function collectReport() {
        const modules = MODULES.map((module) => {
            const loaded = exists(module.name);

            return {
                name: module.name,
                label: module.label,
                loaded,
                type: loaded ? "ready" : "missing"
            };
        });

        const loadedCount = modules.filter((item) => item.loaded).length;
        const missing = modules.filter((item) => !item.loaded).map((item) => item.name);

        return {
            version: VERSION,
            startedAt: state.startedAt.toISOString(),
            checkedAt: new Date().toISOString(),
            totalModules: modules.length,
            loadedCount,
            missingCount: missing.length,
            ready: missing.length === 0,
            modules,
            missing
        };
    }

    function setWindowFlags(report) {
        window.AURA_BOOTSTRAP_VERSION = VERSION;
        window.AURA_BOOT_REPORT = report;
        window.AURA_READY = Boolean(report.ready);
        window.AURA_BOOTED = true;
    }

    function updateConsoleStatus(report) {
        const engineStatus = document.getElementById("engineStatus");
        const systemStatus = document.getElementById("systemStatus");
        const systemIndicator = document.getElementById("systemIndicator");
        const bootTime = document.getElementById("bootTime");

        if (bootTime) {
            bootTime.textContent = report.startedAt;
        }

        if (engineStatus) {
            engineStatus.textContent = report.ready
                ? "Ready"
                : `Partial (${report.loadedCount}/${report.totalModules})`;
        }

        if (systemStatus) {
            systemStatus.textContent = report.ready
                ? "System Ready"
                : `Booting (${report.loadedCount}/${report.totalModules})`;
        }

        if (systemIndicator) {
            systemIndicator.style.background = report.ready ? "var(--accent)" : "var(--warning)";
            systemIndicator.style.boxShadow = report.ready
                ? "0 0 0 6px rgba(34, 197, 94, 0.15)"
                : "0 0 0 6px rgba(245, 158, 11, 0.14)";
        }

        const countEl = document.getElementById("commandCount");
        if (countEl && typeof window.CommandRegistry !== "undefined" && typeof window.CommandRegistry.list === "function") {
            const list = safeCall(() => window.CommandRegistry.list(), []);
            countEl.textContent = String(Array.isArray(list) ? list.length : 0);
        }

        if (window.AuraConsoleUI && typeof window.AuraConsoleUI.refreshStatus === "function") {
            safeCall(() => window.AuraConsoleUI.refreshStatus(), null);
        }
    }

    function logBoot(report) {
        const readyText = report.ready
            ? "AURA boot completed successfully."
            : `AURA boot completed with ${report.missingCount} missing module(s).`;

        if (console && typeof console.info === "function") {
            console.info("[AURA Bootstrap]", readyText, report);
        }
    }

    function boot() {
        if (state.booted) {
            return state.report;
        }

        const report = collectReport();
        state.report = report;
        state.ready = report.ready;
        state.booted = true;

        setWindowFlags(report);
        logBoot(report);

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => updateConsoleStatus(report), { once: true });
        } else {
            updateConsoleStatus(report);
        }

        window.dispatchEvent(
            new CustomEvent("aura:booted", {
                detail: report
            })
        );

        return report;
    }

    function getReport() {
        return state.report || collectReport();
    }

    function isReady() {
        const report = getReport();
        return Boolean(report && report.ready);
    }

    function refresh() {
        const report = collectReport();
        state.report = report;
        state.ready = report.ready;
        setWindowFlags(report);
        updateConsoleStatus(report);
        return report;
    }

    function waitForReady(timeoutMs = 5000, intervalMs = 100) {
        return new Promise((resolve) => {
            const started = Date.now();

            const tick = () => {
                const report = refresh();
                if (report.ready) {
                    resolve(report);
                    return;
                }

                if (Date.now() - started >= timeoutMs) {
                    resolve(report);
                    return;
                }

                window.setTimeout(tick, intervalMs);
            };

            tick();
        });
    }

    window.AuraBootstrap = {
        VERSION,
        boot,
        refresh,
        getReport,
        isReady,
        waitForReady
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
        boot();
    }
})();
