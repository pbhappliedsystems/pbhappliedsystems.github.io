# PBH Applied Systems, LLC

**Applied AI research, quantized model evaluation, and AI infrastructure consulting.**

🌐 [pbhappliedsystems.com](https://pbhappliedsystems.com) &nbsp;·&nbsp;
🤖 [Live AI Demo](https://pbhappliedsystems.com/assistant.html) &nbsp;·&nbsp;
🤗 [Hugging Face](https://huggingface.co/pbhappliedsystems) &nbsp;·&nbsp;
📧 [admin@pbhappliedsystems.com](mailto:admin@pbhappliedsystems.com)

---

## This Repository

This is the public GitHub Pages repository for [pbhappliedsystems.com](https://pbhappliedsystems.com) — the business website and live AI agent demo for PBH Applied Systems, LLC.

| File | Description |
|---|---|
| `index.html` | Main business website |
| `assistant.html` | Live AI Agent Demo |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Service |
| `thinker.jpg` | Demo background image |
| `favicon.ico` | Site favicon |
| `CNAME` | Custom domain configuration |

---

## Live AI Agent Demo

**[▶ Try it now → pbhappliedsystems.com/assistant.html](https://pbhappliedsystems.com/assistant.html)**

A production-grade agentic AI demo that lets you interact in real time with quantized open-weight language models evaluated by PBH Applied Systems' proprietary `quant_eval` framework. No cloud LLM API. No data sent to OpenAI, Anthropic, or any third-party model provider. Every inference runs on private GPU infrastructure.

### Three Agent Templates

| Template | Lead Model | Capability |
|---|---|---|
| **Reasoning & Analysis** | Ministral-3 14B Reasoning | Full visible chain-of-thought traces — every reasoning step exposed |
| **Document Intelligence** | Qwen-2.5 14B (1M context) | Private document Q&A and structured data extraction |
| **Code & Automation** | Qwen-2.5 32B | Production-quality code generation, ETL pipelines, API scaffolding |

### 16 Models — 3B to 32B Parameters

All models are available in both **Q4_K_M quantized** and **F16 full-precision** variants:

| Model | Precision | GPU | Size |
|---|---|---|---|
| Ministral-3 14B Instruct | Q4_K_M / F16 | T4 / A100-40GB | 7.67 GB / 25.17 GB |
| Ministral-3 14B Reasoning | Q4_K_M / F16 | T4 / A100-40GB | 7.67 GB / 25.17 GB |
| Mistral-Nemo Instruct 2407 | Q4_K_M / F16 | T4 / A10G | 6.96 GB / 22.82 GB |
| Phi-4 Reasoning Plus | Q4_K_M / F16 | T4 / A100-40GB | 8.43 GB / 27.31 GB |
| Qwen-2.5 3B Instruct | Q4_K_M / F16 | T4 | 1.80 GB / 5.75 GB |
| Qwen-2.5 7B Instruct | Q4_K_M / F16 | T4 / A10G | 4.36 GB / 14.19 GB |
| Qwen-2.5 14B Instruct (1M ctx) | Q4_K_M / F16 | A10G / A100-40GB | 8.37 GB / 27.52 GB |
| Qwen-2.5 32B Instruct | Q4_K_M / F16 | A10G / A100-80GB | 18.49 GB / 61.04 GB |

### How It Works

1. Select an agent template and model
2. Enter a prompt — 2 free queries, no sign-up required
3. See the response with real `quant_eval` benchmark scores, GPU tier, precision, and inference time
4. The reasoning agent exposes every step of the model's thought process in a collapsible trace panel
5. Every response surfaces two engagement CTAs: **Book a Scoping Call** and **Request Evaluation Report**

### Lead Capture

- 2 free queries with no friction
- GDPR-compliant email gate at query 3 — unlocks 10 additional queries
- Automated follow-up email via Resend
- Session data stored in PostgreSQL on Railway

---

## quant_eval Framework

Every model in this demo was benchmarked using `quant_eval` — a proprietary evaluation framework built to eliminate the guesswork of which LLM to use for which type of agent.

Unlike traditional benchmarks (MMLU, HellaSwag, HumanEval) that measure general capability in isolation, `quant_eval` measures what matters for agentic deployment:

| Metric | What It Measures |
|---|---|
| **Coherence** | Logical consistency and fluency across extended outputs |
| **Instruction Following** | Compliance with format requirements, constraints, and output structure |
| **Reasoning** | Multi-step problem decomposition and chain-of-thought quality |
| **Task Completion** | End-to-end delivery on the stated objective |

Each metric is scored against the model's own F16 full-precision baseline — not an abstract leaderboard. This makes quantization-induced degradation directly measurable before deployment decisions are made.

**Full `quant_eval` scores are embedded in every model card on Hugging Face:**
[huggingface.co/pbhappliedsystems](https://huggingface.co/pbhappliedsystems)

---

## Hugging Face Model Repository

All 16 GGUFs are published at **[huggingface.co/pbhappliedsystems](https://huggingface.co/pbhappliedsystems)** with:

- Full `quant_eval` benchmark scores on each model card
- Both Q4_K_M and F16 precision variants
- Deployment notes and hardware requirements
- Direct links to the live demo for interactive testing

---

## Tech Stack

### Frontend
- **Hosting:** GitHub Pages with Cloudflare proxy (Free plan)
- **Security:** Grade A — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **DNSSEC:** Enabled via Cloudflare
- **Rendering:** marked.js + DOMPurify + highlight.js

### Backend
- **API:** Flask on Railway (europe-west4)
- **Architecture:** Async polling — POST `/api/agent/submit` → GET `/api/agent/status/<job_id>` (bypasses Railway's 30-second HTTP proxy timeout)
- **Database:** PostgreSQL on Railway — persistent sessions, lead capture, invocation audit log
- **Email:** Resend HTTP API — CAN-SPAM compliant, unsubscribe token system

### GPU Inference
- **Platform:** Modal.com serverless GPU containers
- **Runtime:** llama-cpp-python 0.3.20 (CUDA 12.4, pre-built wheel)
- **GPU tiers:** T4 · A10G · A100-40GB · A100-80GB
- **Models:** 16 GGUF files stored in Modal Volume (`pbh-model-weights`, ~298 GB)
- **Scaling:** Containers scale to zero after 120 seconds idle — per-second billing only

### Infrastructure Cost
| Service | Cost |
|---|---|
| Modal GPU compute | ~$5–15/month (covered by $30/month Starter credit) |
| Railway hosting | ~$1.75/month (extrapolated from usage) |
| GitHub Pages | Free |
| Cloudflare | Free plan |
| **Total** | **~$7–17/month** |

---

## Services

### Consulting Engagements
Deploy quantized AI infrastructure in your organization. Scoped, fixed-fee projects from initial architecture through production deployment.

### Quantized Model Evaluation Report
A written analysis of the right model, quantization level, and deployment architecture for your specific use case and data. Typically $2,500–$4,000. Includes `quant_eval` benchmark results on your task type and a concrete deployment recommendation.

**[Book a Scoping Call](https://pbhappliedsystems.com/#contact) · [Request Evaluation Report](https://pbhappliedsystems.com/#contact)**

---

## Related Repositories

| Repository | Description |
|---|---|
| [pbhappliedsystems/pbhappliedsystems.github.io](https://github.com/pbhappliedsystems/pbhappliedsystems.github.io) | This repository — public website and demo frontend |
| [pbhappliedsystems/pbh-agent-backend](https://github.com/pbhappliedsystems/pbh-agent-backend) | Private — Flask API backend, Modal inference containers |
| [huggingface.co/pbhappliedsystems](https://huggingface.co/pbhappliedsystems) | GGUF model files with quant_eval scores |

---

## Legal

- [Privacy Policy](https://pbhappliedsystems.com/privacy.html)
- [Terms of Service](https://pbhappliedsystems.com/terms.html)

&copy; 2026 PBH Applied Systems, LLC &nbsp;·&nbsp; Oklahoma City, OK
