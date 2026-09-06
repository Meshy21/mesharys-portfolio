# n8n Automation Portfolio

Two production-grade automation workflows built in n8n demonstrating AI classification, multimodal vision extraction, conditional branching, and Google Workspace integration.

---

# n8n Automation Portfolio

Two production-grade automation workflows built in n8n demonstrating AI classification, multimodal vision extraction, conditional branching, and Google Workspace integration.

---

## Workflow 2 — Telegram Receipt Processing & Expense Logging Engine

### What it does

A Telegram bot intercepts receipt photos submitted from a mobile device. Google Gemini reads the image and extracts structured expense data. The result is logged to Google Sheets and the original receipt image is archived in a date-partitioned Google Drive folder, created on demand.

### Architecture

```
Telegram Webhook
    └── Download receipt as binary payload (data)
            ├── Gemini Vision  (temp=0, strict JSON contract)
            │       └── { merchant_name, amount, date }
            │
            ├── Google Sheets — Append Row
            │       └── JSON.parse($json.content.parts[0].text)
            │
            └── Google Drive — Search Folder
                    └── name = 'YYYY-MM-DD' and mimeType = 'application/vnd.google-apps.folder'
                            ├── Folder exists → skip creation
                            └── Folder missing → Create Folder
                                    └── Edit Fields  (re-attach binary across branch)
                                            └── Upload File
                                                    └── receipt_YYYY-MM-DD_HHmmss.$binary.data.fileExtension
```

### Key engineering decisions

**Deterministic AI output** — Gemini is configured with `temperature: 0` and a strict prompt contract that forbids any response outside a JSON object. This makes the downstream `JSON.parse()` call safe for production use — no try/catch fallback needed for malformed output.

**Binary state bridging** — n8n's execution engine can drop binary context when a flow forks across an If node. An `Edit Fields` node is placed at the merge point after the conditional folder creation to explicitly re-attach the original `data` binary before the upload step. Without this, the Upload node receives an empty payload on the branch that creates a new folder.

**Idempotent folder provisioning** — The Drive search uses the API's query language (`name = 'YYYY-MM-DD' and mimeType = 'application/vnd.google-apps.folder'`) to check for an existing directory before creating one. Submitting ten receipts in one day produces one date folder, not ten.

**Timestamped filenames** — Receipts are archived as `receipt_YYYY-MM-DD_HHmmss.ext`, where the extension is resolved dynamically from `$binary.data.fileExtension`. This preserves the original MIME type regardless of camera format and prevents filename collisions within the same day.

### Tech stack

| Node | Purpose |
|---|---|
| Telegram Webhook | Mobile receipt ingestion |
| Google Gemini | Multimodal vision — merchant, amount, date extraction |
| Google Sheets — Append Row | Expense audit log |
| Google Drive — Search Files | Idempotent date-folder check |
| Google Drive — Create Folder | On-demand daily directory |
| Edit Fields | Binary payload re-attachment across branch |
| Google Drive — Upload File | Timestamped receipt archival |

---

## Patterns demonstrated

| Pattern | Where |
|---|---|
| AI classification driving downstream routing | Workflow 1 — OpenAI label resolution |
| Idempotent resource creation | Both workflows — folder and label checks before creation |
| Parallel branch fan-out | Workflow 1 — three simultaneous branches post-classification |
| Multimodal vision extraction with strict output contract | Workflow 2 — Gemini at temperature 0 |
| Binary state management across conditional branches | Workflow 2 — Edit Fields bridge node |
| Dynamic file naming from runtime metadata | Workflow 2 — timestamped receipts |

---

## Running locally

1. Import the workflow JSON files into your n8n instance (`Settings → Import Workflow`)
2. Configure credentials: Gmail OAuth2, Google Drive OAuth2, Google Sheets OAuth2, OpenAI API key, Gemini API key, Telegram Bot token
3. Activate both workflows

Workflows were built and tested on n8n v1.x (self-hosted).

---

## About

Built by [Meshary Aquino](https://github.com/mesharyaquino) — backend-leaning software engineer based in the Philippines, specializing in systems where data integrity matters.