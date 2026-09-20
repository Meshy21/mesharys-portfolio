import images from '@/app/lib/placeholder-images.json';

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectMilestone {
  phase: string;
  duration: string;
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  challenges: string;
  learnings: string;
  /** Honest hindsight — the trade-off you'd revisit. Rendered as "What I'd Do Differently". */
  retrospective?: string;
  image: string;
  imageHint: string;
  gallery: { url: string; hint: string }[];
  videos?: string[];
  tags: string[];
  github: string | null;
  githubLabel?: string;
  live: string | null;
  liveLabel?: string;
  readmeUrl?: string | null;
  readmeLabel?: string;
  metrics?: ProjectMetric[];
  timeline?: ProjectMilestone[];
}


export const projects: Project[] = [
  {
    slug: 'n8n-gmail-email-pipeline',
    title: 'n8n AI-Powered Email Processing Pipeline',
    description: 'Automated inbound Gmail ingestion using OpenAI to classify email categories, managing Gmail labels, logging senders to Google Sheets, and archiving attachments to Google Drive in parallel.',
    longDescription: 'n8n AI-Powered Email Processing Pipeline is a production-grade automation workflow built in n8n demonstrating AI classification, idempotent resource management, conditional branching, and parallel Google Workspace integration.\n\nWorkflow Execution & Architecture:\n\n1. Inbound Ingestion & OpenAI Classification:\nTriggers on every inbound Gmail message. An OpenAI Chat Model extracts email content and assigns a category label dynamically, eliminating hardcoded rules.\n\n2. Parallel Branch Fan-out:\n- Log to Sheet: Appends sender info to a Google Sheets correspondence audit log and marks the email as read in Gmail.\n- Manage Labels: Fetches Gmail labels, resolves category, checks if label exists, and either applies the existing label or creates a new label then applies it (idempotent).\n- Store Attachments: Evaluates whether attachments exist. If true, checks/provisions a sender-specific Google Drive directory and uploads attachments.',
    challenges: 'Designing idempotent label and folder creation logic to prevent duplicate labels and directories during repeat executions required careful conditional branching. Fanning out three execution pipelines in parallel after OpenAI classification maintained high throughput and low execution latency.',
    learnings: 'Mastered n8n workflow design, AI-driven routing, parallel branch management, and Google Workspace (Gmail, Drive, Sheets) OAuth2 API integrations.',
    // DRAFT: drafted from this project's existing copy - review and rewrite in your own words
    retrospective: 'Every inbound email hits the LLM classifier, which is the slowest and most expensive step in the workflow, and most mail does not need it. A cheap rules pass for the obvious cases with the model as fallback would cut both cost and latency substantially. The bigger gap is that nothing handles a classification the model gets wrong: the label is applied silently and low-confidence results are treated exactly like confident ones. I would add a confidence threshold and route anything below it to an \'unsorted\' label for review rather than assuming every answer is correct.',
    image: 'https://i.ibb.co/Mkp5T6vs/image.png',
    imageHint: 'n8n Gmail AI Email Processing Pipeline Overview',
    gallery: [
      { url: 'https://i.ibb.co/Mkp5T6vs/image.png', hint: 'n8n Gmail AI Email Processing Pipeline Workflow Overview' },
      { url: 'https://i.ibb.co/ympGCjJF/image.png', hint: 'n8n Gmail AI Email Processing Pipeline Execution Details' }
    ],
    tags: ['AI / LLM', 'n8n', 'OpenAI', 'Gmail', 'Google Drive', 'Google Sheets', 'AI'],
    github: null,
    live: '/workflows/n8n-gmail-email-pipeline.json',
    liveLabel: 'View JSON file',
    readmeUrl: '/workflows/n8n-gmail-email-pipeline-README.md',
    readmeLabel: 'README.md',
    metrics: [
      { label: 'Platform', value: 'n8n v1.x', description: 'Self-hosted workflow automation engine' },
      { label: 'AI Engine', value: 'OpenAI Chat', description: 'Dynamic email classification model' },
      { label: 'Fan-out', value: '3 Parallel Branches', description: 'Simultaneous logging, labeling, and storage' },
      { label: 'Resource Guards', value: '100% Idempotent', description: 'Prevents duplicate Gmail labels & Drive folders' }
    ],
    timeline: [
      {
        phase: 'Phase 1: Ingestion & AI Classification',
        duration: 'Step 1',
        title: 'Gmail Ingestion & OpenAI Routing',
        description: 'Listens for incoming emails and extracts categories dynamically using OpenAI.'
      },
      {
        phase: 'Phase 2: Audit Logging',
        duration: 'Branch 1',
        title: 'Google Sheets Sender Logging',
        description: 'Appends sender data to correspondence sheet and marks message as read.'
      },
      {
        phase: 'Phase 3: Label Management',
        duration: 'Branch 2',
        title: 'Idempotent Label Provisioning',
        description: 'Checks existing Gmail labels and dynamically creates or applies category tags.'
      },
      {
        phase: 'Phase 4: Attachment Archival',
        duration: 'Branch 3',
        title: 'Sender Directory & File Upload',
        description: 'Provisions sender folder in Google Drive and uploads files asynchronously.'
      }
    ]
  },
  {
    slug: 'n8n-telegram-receipt-engine',
    title: 'n8n Telegram Receipt Processing & Expense Logging Engine',
    description: 'Intercepts mobile receipt photos via Telegram Webhook, uses Google Gemini multimodal vision (temp=0) to extract merchant, amount, and date into Google Sheets, and archives timestamped receipts in Google Drive.',
    longDescription: 'n8n Telegram Receipt Processing & Expense Logging Engine is a multimodal vision automation workflow built in n8n. It allows users to snap receipt photos from Telegram and instantly log structured financial data into Google Sheets while archiving files in Google Drive.\n\nWorkflow Execution & Architecture:\n\n1. Ingestion & Multimodal Vision Extraction:\nInterception via Telegram Webhook. Binary payload is passed to Google Gemini vision configured with temperature=0 and a strict JSON prompt contract (merchant_name, amount, date).\n\n2. Expense Audit Logging:\nParsed JSON data is automatically appended to a central expense tracking table in Google Sheets.\n\n3. Binary State Bridging & Drive Archival:\nSearches Google Drive for a date-partitioned folder ("YYYY-MM-DD"). If missing, provisions the folder on demand. Uses an Edit Fields node to re-attach binary context across conditional branches, uploading receipts as timestamped files ("receipt_YYYY-MM-DD_HHmmss.ext").',
    challenges: 'Solving binary payload state loss when branching across n8n conditional (If) nodes. Solved by implementing an Edit Fields bridge node to re-attach binary payload streams before Google Drive upload.',
    learnings: 'Gained deep expertise in n8n binary data manipulation, Google Gemini multimodal vision zero-temperature prompt structuring, and idempotent cloud storage folder provisioning.',
    // DRAFT: drafted from this project's existing copy - review and rewrite in your own words
    retrospective: 'Temperature 0 makes the extraction deterministic, not correct. A blurry or folded receipt still returns confidently wrong values that land straight in the expense sheet with nothing flagging them. I would add a validation pass — does the amount parse, is the date plausible, does the merchant string look like a name — and push failures to a review queue instead of the ledger. The binary-payload loss I fixed with an Edit Fields bridge node was also a symptom rather than the disease: I was branching before the upload, and restructuring the order would have removed the problem instead of working around it.',
    image: 'https://i.ibb.co/bgVQWvCn/image.png',
    imageHint: 'n8n Telegram Receipt Processing Engine Overview',
    gallery: [
      { url: 'https://i.ibb.co/bgVQWvCn/image.png', hint: 'n8n Telegram Receipt Processing Engine Workflow Overview' }
    ],
    tags: ['AI / LLM', 'n8n', 'Gemini AI', 'Telegram', 'Google Drive', 'Google Sheets', 'AI Vision'],
    github: null,
    live: '/workflows/n8n-telegram-receipt-engine.json',
    liveLabel: 'View JSON file',
    readmeUrl: '/workflows/n8n-telegram-receipt-engine-README.md',
    readmeLabel: 'README.md',
    metrics: [
      { label: 'Platform', value: 'n8n v1.x', description: 'Self-hosted workflow engine' },
      { label: 'Vision Model', value: 'Gemini (Temp=0)', description: 'Deterministic multimodal JSON extraction' },
      { label: 'Ingestion', value: 'Telegram Webhook', description: 'Instant mobile photo ingestion' },
      { label: 'Payload Bridge', value: 'Binary Re-attachment', description: 'Edit Fields node bridges state across branches' }
    ],
    timeline: [
      {
        phase: 'Phase 1: Ingestion',
        duration: 'Step 1',
        title: 'Telegram Photo Webhook Ingestion',
        description: 'Receives image payloads directly from Telegram client messages.'
      },
      {
        phase: 'Phase 2: Vision OCR',
        duration: 'Step 2',
        title: 'Gemini Multimodal Data Extraction',
        description: 'Extracts merchant name, transaction date, and total amount with zero-temperature JSON enforcement.'
      },
      {
        phase: 'Phase 3: Audit Logging',
        duration: 'Step 3',
        title: 'Google Sheets Expense Logging',
        description: 'Parses JSON output and appends structured rows into expense ledger.'
      },
      {
        phase: 'Phase 4: Cloud Storage',
        duration: 'Step 4',
        title: 'Idempotent Drive Archival & Binary Bridge',
        description: 'Re-attaches binary data via Edit Fields node and uploads timestamped receipt file into daily Drive folder.'
      }
    ]
  },
  {
    slug: 'payroll-online-web',
    title: 'Enterprise Online Secured Payroll Web Application',
    description: 'A full-stack, enterprise-grade payroll web app with Next.js 14, FastAPI (Python), TailwindCSS, and PostgreSQL/SQLite. Automates BIR Withholding Tax calculations, statutory contribution tables (SSS 2025, PhilHealth 5%, Pag-IBIG Circular 460), AES-256 field encryption, and 1-payslip-per-page print exports.',
    longDescription: 'Enterprise Online Secured Payroll Web Application is a full-stack, enterprise-grade payroll system engineered for modern Philippine corporate payroll management. Built using Next.js 14 (App Router, React 18, TypeScript) and FastAPI (Python 3.10+, Pydantic v2), it automates statutory contributions and tax calculations while delivering bank-grade security and print-ready reporting.\n\nKey Core System Architecture & Features:\n\n1. Philippine Statutory & BIR Tax Compliance Engine:\n- BIR TRAIN Law Tax Engine (2023 Revised Schedules): Automatically evaluates semi-monthly (₱10,417), weekly (₱4,808), and daily (₱685) tax-exemption thresholds.\n- 2025 SSS Contribution Schedule: Supports up to ₱35,000 Monthly Salary Credit (MSC) with exact EE/ER shares.\n- PhilHealth 5.0% Premium Rate: 50/50 split between employee and employer (₱10,000 floor to ₱100,000 ceiling).\n- Pag-IBIG Mandatory Contribution: Circular No. 460 standards (₱200/₱200 share).\n\n2. Printable Reports & Payslips:\n- 1-Payslip-Per-Page Printing: Clean @media print layout featuring company headers, rate basis, itemized earnings/deductions, net pay banner, and employee signature lines.\n- Location Breakdown Summary: Executive summary metrics and location-level payroll breakdown tables.\n\n3. Bank-Grade Security & Governance:\n- AES-256 Fernet Encryption: Sensitive employee identification (SSS, PhilHealth, Pag-IBIG, TIN, Bank account numbers) encrypted at rest in the database.\n- JWT & Role-Based Access Control (RBAC): Protected API endpoints with Admin and Manager permission checks.\n- Audit Logging: Every sensitive action (logins, payroll locks, profile updates) recorded in an immutable audit trail.\n\n4. Flexible Workflows:\n- Configurable Weekly Cycles: Custom start and cutoff day configurations (e.g. Wed-Tue) with dynamic live UI updates.\n- Location Management: Dynamic site assignment with safety guards preventing deletion of active branch locations.',
    challenges: 'Engineered precise floating-point rounding for multi-tiered Philippine statutory compliance (BIR tax schedules, SSS 2025 MSC brackets, PhilHealth 5% ceilings, and Pag-IBIG Circular 460) while maintaining AES-256 field-level encryption for sensitive employee Identifiers without degrading database query performance or report generation speed.',
    learnings: 'Mastered full-stack architecture combining Next.js 14 App Router with FastAPI and Pydantic v2. Gained deep expertise in cryptography (Fernet AES-256 field encryption at rest), statutory payroll math engine design, role-based JWT security, and CSS @media print optimization for single-page corporate payslips.',
    // DRAFT: drafted from this project's existing copy - review and rewrite in your own words
    retrospective: 'Encrypting the SSS, PhilHealth, TIN and bank fields at rest made them unsearchable, so any lookup by those identifiers has to decrypt row by row in application code. I would keep the encryption but add a deterministic blind index — an HMAC of the normalised value — per searchable field so the database can still match on equality. I would also move the statutory tables out of code and into versioned, effective-dated configuration rows; with the 2025 SSS brackets hardcoded, a rate change ships as a code deploy instead of a data update, which is the wrong cost for something that changes on a government schedule.',
    image: 'https://i.ibb.co/Kz0TVHX4/image.png',
    imageHint: 'Enterprise Secured Payroll Web Application Dashboard',
    gallery: [
      { url: 'https://i.ibb.co/Kz0TVHX4/image.png', hint: 'Main Executive Payroll Dashboard' },
      { url: 'https://i.ibb.co/0V1C9f3p/image.png', hint: 'Employee Records & AES-256 Encrypted Profile Management' },
      { url: 'https://i.ibb.co/rRL8KHW2/image.png', hint: 'Automated BIR & Statutory Tax Calculation Breakdown' },
      { url: 'https://i.ibb.co/Vspkk0S/image.png', hint: 'Print-Ready Individual Payslip Export' },
      { url: 'https://i.ibb.co/prySq3pj/image.png', hint: 'Location Breakdown & Branch Summary Report' },
      { url: 'https://i.ibb.co/Z1SKm8Jc/image.png', hint: 'Configurable Weekly Payroll Cycle Settings' },
      { url: 'https://i.ibb.co/WNy54PPL/image.png', hint: 'Role-Based Access Control & Security Settings' },
      { url: 'https://i.ibb.co/65X0NDM/image.png', hint: 'Immutable Audit Trail & System Log Visualizer' },
      { url: 'https://i.ibb.co/jkBNPxdf/image.png', hint: 'Interactive API Documentation & Endpoint Controller' }
    ],
    tags: ['Web App', 'Next.js', 'FastAPI', 'Python', 'Tailwind CSS', 'PostgreSQL', 'TypeScript', 'Security'],
    github: 'https://github.com/Meshy21/payroll-online-web',
    live: 'https://payroll-online-web.vercel.app/',
    metrics: [
      { label: 'Tax Compliance', value: '100% BIR TRAIN', description: 'Automated BIR TRAIN Law & 2025 statutory math engine' },
      { label: 'Security Grade', value: 'AES-256 Fernet', description: 'Field-level encryption for SSS, PhilHealth, TIN & Bank IDs' },
      { label: 'Stack Architecture', value: 'Next.js + FastAPI', description: 'Modern decoupled App Router & Pydantic v2 API backend' },
      { label: 'Export Engine', value: '@media Print', description: '1-Payslip-per-page print layout & executive summary reports' }
    ],
    timeline: [
      {
        phase: 'Phase 1: Backend & Tax Engine',
        duration: 'Weeks 1-2',
        title: 'BIR TRAIN & Statutory Math Calculation Core',
        description: 'Engineered FastAPI tax calculators for BIR TRAIN Law, SSS 2025 MSC brackets, PhilHealth 5% rates, and Pag-IBIG Circular 460.'
      },
      {
        phase: 'Phase 2: Cryptography & Security',
        duration: 'Week 3',
        title: 'AES-256 Fernet Encryption & JWT RBAC Auth',
        description: 'Implemented AES-256 field-level encryption for sensitive PII data and JWT authentication with Admin/Manager RBAC scope checks.'
      },
      {
        phase: 'Phase 3: Next.js 14 Web Frontend',
        duration: 'Weeks 4-5',
        title: 'App Router Web Client & Glassmorphism System',
        description: 'Constructed responsive dashboards, employee list management, location branch safety controls, and audit trail visualizers.'
      },
      {
        phase: 'Phase 4: Print Layouts & Deployment',
        duration: 'Week 6',
        title: '@media Print Layouts & Railway/Vercel Pipelines',
        description: 'Designed clean 1-payslip-per-page print layouts and deployed backend services to Railway PostgreSQL and web frontend to Vercel.'
      }
    ]
  },
  {
    slug: 'learnmate',
    title: 'LearnMate (Mobile-Based Android App)',
    description:
      'An Android app to streamline remote learning with session booking, messaging, and video conferencing.',
    longDescription:
      'Learnmate is an Android-based mobile application designed to streamline remote learning and tutoring. It enables tutors and tutees to connect, communicate, and collaborate through an intuitive interface that supports session booking, in-app messaging, and video conferencing — all from a mobile device. The goal was to create a seamless and accessible platform for education, breaking down geographical barriers.\n\nThe platform runs on three roles. Tutees post subject-tagged requests for help and pay for enrolled classes via GCash; tutors browse that request feed and apply to teach, submitting credentials (diploma and transcript of records) for review; and an admin console approves pending tutor applications while tracking user and lesson activity across the platform. Accounts are verified by one-time passcode on signup.',
    challenges: 'One of the main challenges was implementing a reliable and low-latency video conferencing feature within the app. Integrating the Agora SDK required careful handling of state management and native platform differences. Another challenge was designing an intuitive booking system that could handle multiple time zones and tutor availability.',
    learnings: 'This project was a deep dive into cross-platform mobile development with Flutter and Dart. I gained significant experience with real-time communication technologies and third-party SDK integration. I also learned a lot about UX/UI design for mobile applications and the importance of user feedback in the development cycle.',
    // DRAFT: drafted from this project's existing copy - review and rewrite in your own words
    retrospective: 'Leaning on the Agora SDK got working video far sooner than raw WebRTC would have, but it put a paid third-party dependency at the centre of the core feature and let its native state handling leak into the widget tree. I would isolate it behind an interface so the call engine is swappable and testable without a live session. The clearer mistake was storing session times as local device time: the booking flow works until a tutor and tutee are in different zones, and persisting UTC while rendering in the viewer\'s zone costs almost nothing on day one and a great deal to retrofit.',
    image: '/projects/learnmate/hero.jpg',
    imageHint: 'LearnMate tutee, tutor and admin screens',
    gallery: [
      { url: '/projects/learnmate/tutee-enrolled-classes.jpg', hint: 'Tutee dashboard — enrolled classes with tutor, learning goal and GCash payment' },
      { url: '/projects/learnmate/tutor-request-feed.jpg', hint: 'Tutor home feed — open tutee requests by subject and grade level' },
      { url: '/projects/learnmate/admin-dashboard.jpg', hint: 'Admin console — user and lesson statistics with pending tutor approvals' },
      { url: '/projects/learnmate/tutee-post-composer.jpg', hint: 'Post composer — tutees publish a subject-tagged request for help' },
      { url: '/projects/learnmate/my-posts.jpg', hint: 'My Posts — a tutee\'s active tutoring requests' },
      { url: '/projects/learnmate/chat-thread.jpg', hint: 'In-app chat thread between a tutor and a tutee' },
      { url: '/projects/learnmate/tutor-application.jpg', hint: 'Tutor application — credential upload (diploma / TOR) and commitment screening' },
      { url: '/projects/learnmate/otp-verification.jpg', hint: 'Phone number verification via one-time passcode' },
      { url: '/projects/learnmate/subject-preferences.jpg', hint: 'Profile preferences — subjects of interest that drive tutor matching' },
      { url: '/projects/learnmate/role-selection.jpg', hint: 'Role selection at signup — tutor or tutee' },
      { url: 'https://i.ibb.co/zTCvzWd6/signaling_flow.png', hint: 'Learnmate WebRTC & Agora signaling flow diagram' }
    ],
    videos: [
      'https://youtu.be/FhnaQuVrfIk',
      'https://youtu.be/aFihW9-FOl4'
    ],
    tags: ['Mobile App', 'Dart', 'Flutter', 'Agora'],
    github: null,
    live: null,
    metrics: [
      { label: 'Codebase Scale', value: '~8,500 LOC', description: 'Highly modular Flutter & Dart codebase' },
      { label: 'Development Time', value: '120 Hours', description: 'End-to-end design, implementation & QA' },
      { label: 'Core Modules', value: '12 Modules', description: 'Session bookings, in-app messaging, Agora video SDK' }
    ],
    timeline: [
      {
        phase: 'Phase 1: Wireframing & UX Map',
        duration: 'Week 1',
        title: 'Requirement Gathering & UX Architecture',
        description: 'Designed key mobile views and mapped out tutor-student appointment and video stream session flows.'
      },
      {
        phase: 'Phase 2: Core Frontend & Client Setup',
        duration: 'Weeks 2-3',
        title: 'Flutter UI Composition & Local Caching',
        description: 'Developed highly modular components in Dart, establishing responsive client layouts and internal application routing.'
      },
      {
        phase: 'Phase 3: Real-Time Engine & Live streams',
        duration: 'Week 4',
        title: 'Agora RTC Native Integration & Firestore Hooks',
        description: 'Wired up the Agora SDK wrapper for stable on-device live video tutoring feeds and coupled session metadata with cloud triggers.'
      },
      {
        phase: 'Phase 4: Optimization, Security & QA',
        duration: 'Week 5',
        title: 'Stress Testing & Performance Fine-Tuning',
        description: 'Debugged low-bandwidth exceptions and tuned device audio latency, resulting in a successful release candidate.'
      }
    ]
  },
  {
    slug: 'wood-knot-detection',
    title: 'Wood Knot Detection App',
    description: 'An on-device, real-time app identifying wood knots using a YOLOv8 model trained on 10,000+ images, optimized via ONNX, and run on TensorFlow Lite.',
    longDescription: 'This project involved building an on-device, real-time computer vision application for identifying wood knots. The core AI model was developed by training YOLOv8 on an extensive custom dataset of over 10,000 annotated wood images for under 75 epochs to achieve optimal feature convergence. To facilitate highly efficient deployment on mobile hardware, the trained YOLOv8 model was first exported to the ONNX (Open Neural Network Exchange) format and subsequently converted to a quantized TensorFlow Lite (TFLite) model. This robust pipeline enables high-accuracy, real-time, on-device inference without relying on external server resources.',
    challenges: 'Optimizing a complex object detection model like YOLOv8 for real-time mobile execution was a multi-stage challenge. It required selecting the right model scale, converting the model architecture through ONNX with correct tensor layouts, and applying integer quantization in TensorFlow Lite to drastically reduce the memory footprint without degrading detection accuracy. Additionally, managing real-time camera frames and rendering bounding boxes with minimal latency on low-to-mid range mobile processors required writing highly efficient multi-threaded operations in Dart and Flutter.',
    learnings: 'Through this project, I mastered the end-to-end edge AI pipeline. I gained deep experience in custom dataset curation (annotating over 10,000 images), hyperparameter tuning during YOLOv8 training across multiple epochs, cross-framework model translation using ONNX, and quantized hardware-accelerated inference with TFLite in Flutter. It proved that deep learning models can be effectively compacted and deployed directly to the edge with high reliability.',
    // DRAFT: drafted from this project's existing copy - review and rewrite in your own words
    retrospective: 'The accuracy figures come from a split of the dataset I collected myself, so they describe how the model performs on wood that resembles what I photographed rather than on a mill floor. I would hold out a genuinely independent test set before training instead of reporting on the same distribution I curated. I also confirmed that accuracy \'held up\' after integer quantization by eye; a per-class comparison between the float and quantized models would have told me what the 85% size reduction actually cost, which is the number that matters when deciding whether the trade was worth it.',
    image: images.woodKnotMain,
    imageHint: 'wood detection',
    gallery: [
      { url: 'https://i.ibb.co/rNj98hm/57eddd60-ec3a-4c1e-bc25-80333fc1b024.jpg', hint: 'wood knot detection on device' },
      { url: 'https://i.ibb.co/MX38mgH/ea13b409-af46-4562-a88e-947b801dcb4e.jpg', hint: 'model output visualization' },
      { url: 'https://i.ibb.co/RTzy79HW/b7fd349a-1189-4f96-a9c1-15e27e0845f8.jpg', hint: 'custom dataset sample' },
      { url: 'https://i.ibb.co/HptFPfhG/5d8825e2-1fc8-4619-8909-2d53a9ece1c1.jpg', hint: 'real-time model inference' }
    ],
    tags: ['Mobile App', 'AI', 'Flutter', 'Dart', 'TensorFlow Lite', 'YOLOv8'],
    github: 'https://github.com/Meshy21/woodknot',
    live: null,
    metrics: [
      { label: 'Dataset Size', value: '10,000+ Images', description: 'Custom-annotated lumber surface images' },
      { label: 'Training Iterations', value: '75 Epochs', description: 'YOLOv8 custom feature convergence' },
      { label: 'Inference Latency', value: '<45ms', description: 'Highly responsive real-time on-device execution' },
      { label: 'Model Compaction', value: '85% Size Reduction', description: 'ONNX to quantized TensorFlow Lite format' }
    ],
    timeline: [
      {
        phase: 'Phase 1: Dataset Curation',
        duration: 'Weeks 1-2',
        title: 'Image Acquisition & Custom Labeling',
        description: 'Sourced and manually annotated over 10,000 high-resolution wood surface samples, carefully highlighting wood knot defects.'
      },
      {
        phase: 'Phase 2: YOLOv8 Training',
        duration: 'Weeks 3-4',
        title: 'Model Training & Validation Iterations',
        description: 'Trained a custom YOLOv8 detection architecture for 75 epochs, achieving precise and optimal weight convergence.'
      },
      {
        phase: 'Phase 3: Model Conversion',
        duration: 'Week 5',
        title: 'ONNX Translation & INT8 Quantization',
        description: 'Exported weight states into intermediate ONNX format and applied structural integer quantization to reduce model weight by 85%.'
      },
      {
        phase: 'Phase 4: Client Integration',
        duration: 'Week 6',
        title: 'Flutter Camera Frame Processing Loop',
        description: 'Implemented an optimized camera thread in Dart that streams frames to TensorFlow Lite, rendering immediate overlay boxes under 45ms.'
      }
    ]
  },
  {
    slug: 'braille-haptic-reader',
    title: 'Capstone: Braille Haptic Reader',
    description: "An OCR-to-Braille translation pipeline on Raspberry Pi using YOLOv5 for visually impaired users.",
    longDescription: "As my capstone project, I developed an OCR-to-Braille translation pipeline running on a Raspberry Pi. The system uses a camera to capture text, which is then processed by a custom-trained YOLOv5-based AI model for accurate text detection. The detected text is run through an OCR engine and translated into Braille, which is then outputted to a haptic display. The system achieved a 97.82% OCR accuracy, enabling real-time translation for visually impaired users.",
    challenges: 'Training a highly accurate text detection model for various fonts and lighting conditions was a significant challenge. Integrating the entire pipeline—camera capture, AI inference, OCR, and haptic output—on a resource-constrained device like the Raspberry Pi required extensive optimization. The real-time constraint meant every part of the process had to be as efficient as possible.',
    learnings: 'This project taught me a great deal about the practical application of machine learning models on edge devices. I learned about optimizing deep learning models for performance, working with hardware interfaces, and building a complete, end-to-end system that serves a real-world purpose.',
    // DRAFT: drafted from this project's existing copy - review and rewrite in your own words
    retrospective: '97.82% is character-level accuracy on test images I chose, and that flatters the system. For someone reading by touch, what matters is whether a line comes through intelligibly, and a single wrong character inside a word is far more disruptive than the percentage implies. I would report word-level accuracy and test with visually impaired users rather than optimising a metric I picked myself. Technically, capture, OCR and haptic output shared one thread budget and I fought the 1.2s latency head-on; decoupling capture from playback with a queue would have let the reader start feeling output before the frame finished processing.',
    image: images.brailleReaderMain,
    imageHint: 'braille reader device',
    gallery: [
      { url: 'https://i.ibb.co/zWdb3tRW/image-2026-07-10-150400735.png', hint: 'braille reader physical prototype' },
      { url: 'https://i.ibb.co/67KX0cSP/image-2026-07-10-150441522.png', hint: 'OCR extraction processing interface' },
      { url: 'https://i.ibb.co/qMYv8Bc2/image-2026-07-10-150507050.png', hint: 'on-device translation flow' },
      { url: 'https://i.ibb.co/BKYSs021/pipeline.png', hint: 'ConBraillient system pipeline architecture diagram' }
    ],
    tags: ['AI', 'IoT', 'Python', 'Raspberry Pi', 'YOLOv5', 'OCR'],
    github: null,
    live: null,
    metrics: [
      { label: 'OCR Accuracy', value: '97.82%', description: 'Custom translation accuracy under varied lighting' },
      { label: 'Pipeline Latency', value: '~1.2s', description: 'Full image-to-haptic-pattern latency' },
      { label: 'Codebase Scale', value: '~4,200 LOC', description: 'Python scripts, YOLOv5 integration, solenoid driver loops' },
      { label: 'Hardware Nodes', value: '4 Components', description: 'Raspberry Pi 4, high-res camera, 3D-printed haptic cell array' }
    ],
    timeline: [
      {
        phase: 'Phase 1: Physical R&D',
        duration: 'Weeks 1-2',
        title: 'Hardware Prototyping & Pin Mapping',
        description: 'Sourced Raspberry Pi 4 board, configured custom-designed circuit connections, and soldered 3D-printed haptic cell solenoid relays.'
      },
      {
        phase: 'Phase 2: Vision Model Training',
        duration: 'Weeks 3-4',
        title: 'YOLOv5 Character Box Detections',
        description: 'Trained high-accuracy character and paragraph boundary detection anchors with YOLOv5 on various distinct printed fonts.'
      },
      {
        phase: 'Phase 3: Translation Pipeline',
        duration: 'Week 5',
        title: 'Python Braille Mapping Core Engine',
        description: 'Developed low-level Python scripts converting OCR string characters into 6-dot haptic grid arrays mapped directly to GPIO pin nodes.'
      },
      {
        phase: 'Phase 4: Latency Calibration',
        duration: 'Week 6',
        title: 'Thread Tuning & Validation testing',
        description: 'Streamlined image processing threads to cut pipeline lag to ~1.2 seconds, achieving solid 97.82% overall accuracy.'
      }
    ]
  },
  {
    slug: 'custom-payroll-system',
    title: 'Custom Payroll Management System',
    description: 'A bespoke desktop payroll system using Python and PyQt for precise, efficient financial management.',
    longDescription: 'This custom-built payroll management system is a desktop application designed for precision and reliability. Developed with Python, PyQt for the GUI, and a powerful PostgreSQL database, it automates complex payroll calculations, tax deductions, and reporting. The system provides a secure and intuitive interface for managing employee data, processing pay runs, and generating detailed financial reports, ensuring accuracy and compliance.',
    challenges: 'The primary challenge was ensuring the accuracy of all financial calculations, including various tax laws and benefit deductions, which required meticulous logic and extensive testing. Building a responsive and user-friendly desktop interface with PyQt while managing a complex backend database connection was another significant hurdle. Data security was paramount, involving encrypted storage and access controls.',
    learnings: 'Through this project, I honed my skills in Python application development and GUI design with PyQt. I gained valuable experience in database management with PostgreSQL, including designing robust schemas for financial data. It also provided a deep understanding of the complexities involved in building business-critical software where accuracy and security are non-negotiable.',
    // DRAFT: drafted from this project's existing copy - review and rewrite in your own words
    retrospective: 'Building it as a PyQt desktop client bound to a PostgreSQL instance meant every deployment was a manual install on a specific machine — and the web payroll system I built later is the same problem solved the way it should have been. The calculation logic also lived directly in the GUI event handlers, so the tax rules could not be exercised without driving the interface. I would extract the payroll math into a pure, separately tested module first and treat the GUI as one possible front end rather than the program itself.',
    image: images.customPayrollMain,
    imageHint: 'payroll software',
    gallery: [
      { url: images.customPayrollGallery1, hint: 'employee records' },
      { url: images.customPayrollGallery2, hint: 'report generation' },
      { url: (images as any).customPayrollGallery3, hint: 'payroll calculation' },
      { url: (images as any).customPayrollGallery4, hint: 'settings page' },
      { url: (images as any).customPayrollGallery5, hint: 'login screen' },
      { url: (images as any).customPayrollGallery6, hint: 'payslip view' },
      { url: (images as any).customPayrollGallery7, hint: 'dashboard analytics' },
      { url: (images as any).customPayrollGallery8, hint: 'user permissions' }
    ],
    tags: ['Desktop App', 'Python', 'PyQt', 'PostgreSQL'],
    github: null,
    live: null,
    metrics: [
      { label: 'Active Personnel', value: '500+ Files', description: 'Scalable personnel data structure logs' },
      { label: 'Database Engine', value: 'PostgreSQL', description: 'Secure relational database backend setup' },
      { label: 'Logic Modules', value: '8 Algorithms', description: 'Automated complex tax deduction models' },
      { label: 'GUI Panels', value: '15 Windows', description: 'Fully custom responsive PyQt6 interface layouts' }
    ],
    timeline: [
      {
        phase: 'Phase 1: Algorithmic Modeling',
        duration: 'Weeks 1-2',
        title: 'Taxation & Calculation Foundations',
        description: 'Engineered 8 custom Python-backed math engines mapping complex national taxation, benefit metrics, and deductions.'
      },
      {
        phase: 'Phase 2: PostgreSQL Schema Setup',
        duration: 'Week 3',
        title: 'Transaction-Safe Database Tuning',
        description: 'Built isolated relational PostgreSQL schema and configured row transaction locks to guarantee arithmetic consistency.'
      },
      {
        phase: 'Phase 3: PyQt6 GUI Design',
        duration: 'Weeks 4-5',
        title: 'Multi-threaded Desktop Application Layouts',
        description: 'Constructed 15 custom panels in PyQt6 with clean status states, routing heavy data calculation work onto background worker threads.'
      },
      {
        phase: 'Phase 4: Audits & Mail Generators',
        duration: 'Week 6',
        title: 'Secure Logging & PDF Exports',
        description: 'Built high-security activity logs and combined them with secure PDF generators to instantly compile and email employee payslips.'
      }
    ]
  },
];

