AURA Architecture Manifest v1

Status: ACTIVE

Architecture Freeze: ACCEPTED

---

Project Overview

AURA is a local-first AI knowledge system designed to run without external servers or APIs.

Core Principles:

- No API Dependency
- No Server Dependency
- User Controlled Repository
- User Controlled Commits
- Modular Architecture
- Knowledge-Centric Design

---

Freeze Rules

Rule #001

AURA NEVER COMMITS

USER COMMITS FILES

---

Rule #002

REASONING ENGINE MUST NOT EXIST BEFORE KNOWLEDGE GRAPH ENGINE

---

Rule #003

ALL COMMANDS MUST BE REGISTERED THROUGH COMMAND REGISTRY

---

Layer Architecture

USER

↓

UI Layer

↓

Command Layer

↓

Cognitive Layer

↓

Knowledge Layer

↓

Memory Layer

↓

Browser Storage

---

UI Layer

index.html

Responsibility:

- User Interface
- Command Input
- Result Display

Dependencies:

- All JavaScript Modules

Status:

ACTIVE

---

Memory Layer

task-manager.js

Responsibility:

- Task Creation
- Task Tracking
- Task Retrieval

Status:

ACTIVE

---

storage-engine.js

Responsibility:

- Persistent Storage
- Save
- Load
- Delete

Storage Prefix:

aura_

Status:

ACTIVE

---

Knowledge Layer

knowledge-engine.js

Responsibility:

- Topic Registration
- Topic Management

Depends On:

- storage-engine.js

Status:

ACTIVE

---

knowledge-import-engine.js

Responsibility:

- Knowledge Import
- Knowledge Retrieval

Depends On:

- storage-engine.js

Status:

ACTIVE

---

knowledge-graph-engine.js

Responsibility:

- Node Creation
- Relationship Creation
- Graph Analysis

Depends On:

- storage-engine.js

Status:

ACTIVE

---

Learning Layer

learning-engine.js

Responsibility:

- Learning Plans
- Module Tracking
- Progress Tracking

Depends On:

- storage-engine.js

Status:

ACTIVE

---

planner-engine.js

Responsibility:

- Goal Decomposition
- Step Planning
- Progress Monitoring

Depends On:

- storage-engine.js

Status:

ACTIVE

---

Cognitive Layer

reasoning-engine.js

Responsibility:

- Relationship Analysis
- Similarity Detection
- Insight Generation

Depends On:

- knowledge-graph-engine.js

Status:

ACTIVE

---

self-critic-engine.js

Responsibility:

- Self Evaluation
- Warning Detection
- Graph Review

Depends On:

- reasoning-engine.js
- knowledge-graph-engine.js

Status:

ACTIVE

---

Command Layer

command-registry.js

Responsibility:

- Command Registration
- Command Execution

Status:

ACTIVE

---

command-bootstrap.js

Responsibility:

- Engine Command Registration

Status:

ACTIVE

---

core-command-engine

Responsibility:

- Command Parsing
- Registry Routing

Status:

PLANNED REFACTOR

---

Registered Commands

learn

topics

import

knowledge

graph

graphstats

graphinsights

reason

compare

related

insights

plan

planprogress

planstep

completestep

critic

criticscore

criticwarnings

criticnodes

---

Current Capability Level

Knowledge Storage

AVAILABLE

Knowledge Graph

AVAILABLE

Reasoning

AVAILABLE

Planning

AVAILABLE

Self Criticism

AVAILABLE

---

Not Yet Implemented

Memory Consolidation

Insight Engine

Goal Manager

Research Engine

Meta Learning

Hypothesis Testing

World Modeling

Autonomous Learning

---

Planned Files

assets/js/memory-consolidation-engine.js

assets/js/insight-engine.js

assets/js/goal-manager.js

assets/js/core-command-engine-v9.js

---

Repository Policy

All New Features Must:

- Follow Existing Architecture
- Register Commands Through Registry
- Use Storage Engine For Persistence
- Remain API Free
- Remain Server Free

---
# Command Lifecycle Policy

A command is considered part of AURA only when:

1. It is registered in CommandRegistry.
2. It is listed in CommandManifest.
3. It is parsed by Core Command Engine.
4. It passes command tests.

Commands that fail any of the above requirements are considered incomplete and must not be treated as production-ready.
End Of Manifest
