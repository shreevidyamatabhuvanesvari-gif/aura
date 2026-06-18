Knowledge Fragment Interface v1.0

STATUS: FROZEN

DATE: 2026-06-19

PRIORITY: HIGH

---

Purpose

Define the data contract between:

Pattern Extraction Engine

↓

Knowledge Fragment Engine

↓

Learning Core Engine

↓

Creative Mind Engine

This interface must remain stable.

Future engines should consume fragments through this contract.

---

Core Principle

KFI-001

One Fragment

One Concept

One Meaning

A fragment represents a single reusable unit of knowledge.

---

Fragment Object

KFI-002

Standard Fragment Structure

{
"id": "",
"concept": "",
"topic": "",
"type": "",
"language": "",
"frequencyScore": 0,
"qualityScore": 0,
"confidenceScore": 0,
"relationships": [],
"source": "",
"createdAt": ""
}

---

Required Fields

KFI-003

id

Unique fragment identifier.

---

concept

Primary knowledge concept.

Example:

"अनुशासन"

---

topic

Higher level category.

Example:

"motivation"

---

type

Allowed values:

- concept
- topic
- theme
- relationship

---

language

Allowed values:

- hindi
- english

Reserved:

- sanskrit

---

Score Fields

KFI-004

frequencyScore

How often concept appears.

Range:

0 - 100

---

qualityScore

Knowledge usefulness estimate.

Range:

0 - 100

---

confidenceScore

Confidence in extraction accuracy.

Range:

0 - 100

---

Relationships

KFI-005

Fragments may link to other fragments.

Example:

{
"concept": "अनुशासन",
"relationships": [
"सफलता"
]
}

---

Source Tracking

KFI-006

Allowed Sources:

- user
- import
- content_pack
- web_assisted

Future:

- voice
- video

---

Pattern Extraction Output

KFI-007

Pattern Extraction Engine must provide:

{
"concept": "",
"topic": "",
"frequency": 0
}

Knowledge Fragment Engine converts
this into a complete fragment object.

---

Learning Core Input

KFI-008

Learning Core Engine consumes:

Knowledge Fragment Objects

Learning Core may:

- Update Scores
- Consolidate Fragments

Learning Core may not:

- Change Fragment Identity

---

Creative Mind Input

KFI-009

Creative Mind receives:

Knowledge Fragment Collections

Example:

[
"कर्म",
"धर्म",
"भक्ति"
]

and uses them for generation.

---

Fragment Lifecycle

KFI-010

Pattern
↓
Fragment
↓
Scoring
↓
Consolidation
↓
Creative Use

---

Versioning Rule

KFI-011

Changes to fragment structure require:

1. Review
2. Interface Update
3. Version Increment

---

Freeze Record

Document:
Knowledge Fragment Interface v1.0

Status:
FROZEN

Next Planned Component:
assets/js/knowledge-fragment-engine.js
