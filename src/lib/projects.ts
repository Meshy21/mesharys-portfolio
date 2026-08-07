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
  image: string;
  imageHint: string;
  gallery: { url: string; hint: string }[];
  videos?: string[];
  tags: string[];
  github: string | null;
  live: string | null;
  metrics?: ProjectMetric[];
  timeline?: ProjectMilestone[];
}


export const projects: Project[] = [
  {
    slug: 'payroll-online-web',
    title: 'Enterprise Online Secured Payroll Web Application',
    description: 'A full-stack, enterprise-grade payroll web app with Next.js 14, FastAPI (Python), TailwindCSS, and PostgreSQL/SQLite. Automates BIR Withholding Tax calculations, statutory contribution tables (SSS 2025, PhilHealth 5%, Pag-IBIG Circular 460), AES-256 field encryption, and 1-payslip-per-page print exports.',
    longDescription: 'Enterprise Online Secured Payroll Web Application is a full-stack, enterprise-grade payroll system engineered for modern Philippine corporate payroll management. Built using Next.js 14 (App Router, React 18, TypeScript) and FastAPI (Python 3.10+, Pydantic v2), it automates statutory contributions and tax calculations while delivering bank-grade security and print-ready reporting.\n\nKey Core System Architecture & Features:\n\n1. Philippine Statutory & BIR Tax Compliance Engine:\n- BIR TRAIN Law Tax Engine (2023 Revised Schedules): Automatically evaluates semi-monthly (₱10,417), weekly (₱4,808), and daily (₱685) tax-exemption thresholds.\n- 2025 SSS Contribution Schedule: Supports up to ₱35,000 Monthly Salary Credit (MSC) with exact EE/ER shares.\n- PhilHealth 5.0% Premium Rate: 50/50 split between employee and employer (₱10,000 floor to ₱100,000 ceiling).\n- Pag-IBIG Mandatory Contribution: Circular No. 460 standards (₱200/₱200 share).\n\n2. Printable Reports & Payslips:\n- 1-Payslip-Per-Page Printing: Clean @media print layout featuring company headers, rate basis, itemized earnings/deductions, net pay banner, and employee signature lines.\n- Location Breakdown Summary: Executive summary metrics and location-level payroll breakdown tables.\n\n3. Bank-Grade Security & Governance:\n- AES-256 Fernet Encryption: Sensitive employee identification (SSS, PhilHealth, Pag-IBIG, TIN, Bank account numbers) encrypted at rest in the database.\n- JWT & Role-Based Access Control (RBAC): Protected API endpoints with Admin and Manager permission checks.\n- Audit Logging: Every sensitive action (logins, payroll locks, profile updates) recorded in an immutable audit trail.\n\n4. Flexible Workflows:\n- Configurable Weekly Cycles: Custom start and cutoff day configurations (e.g. Wed-Tue) with dynamic live UI updates.\n- Location Management: Dynamic site assignment with safety guards preventing deletion of active branch locations.',
    challenges: 'Engineered precise floating-point rounding for multi-tiered Philippine statutory compliance (BIR tax schedules, SSS 2025 MSC brackets, PhilHealth 5% ceilings, and Pag-IBIG Circular 460) while maintaining AES-256 field-level encryption for sensitive employee Identifiers without degrading database query performance or report generation speed.',
    learnings: 'Mastered full-stack architecture combining Next.js 14 App Router with FastAPI and Pydantic v2. Gained deep expertise in cryptography (Fernet AES-256 field encryption at rest), statutory payroll math engine design, role-based JWT security, and CSS @media print optimization for single-page corporate payslips.',
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
      { label: 'Export Engine', value: '@media Print', description: '1-Payslip-per-page print layout & executive summary reports' },
      { label: 'Complexity Score', value: '9.3 / 10', description: 'Multi-tiered statutory compliance, RBAC & immutable audit trails' }
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
    slug: 'syncsolve-api',
    title: 'SyncSolve API — Conflict Resolution Engine',
    description: 'Engineered for offline-first bi-directional synchronization. Reconciles JSON payload collisions via Last-Write-Wins, Vector Clock causality graph analysis, and JSON Delta patches.',
    longDescription: 'SyncSolve API is a high-performance, stateless, mathematical conflict-resolution service designed for offline-first mobile applications, collaborative tools, and distributed databases. When multiple users or devices edit the same record offline and synchronize at different times, conflicts inevitably occur. SyncSolve acts as a pure deterministic engine that reconciles data collisions using distributed systems algorithms.\n\nKey Core Engines & Capabilities:\n\n1. Last-Write-Wins (LWW) Engine (POST /api/v1/resolve/lww):\nMerges conflicting JSON payloads by timestamp at field-level granularity (e.g. User A updated title at 10:05, User B updated status at 10:06 -> keeps User A\'s title and User B\'s status). Handles nested JSON objects recursively with custom tie-breaker logic.\n\n2. Vector Clock Causality Evaluator (POST /api/v1/resolve/vector):\nUses version vectors (Va vs Vb) to mathematically evaluate causal relationships. Automatically selects the dominant state (200 OK) or detects simultaneous offline edits (Va || Vb) with no clear winner, returning an HTTP 409 Conflict response containing exact conflicting JSON dot-paths, delta diffs, and an LWW fallback proposal.\n\n3. JSON Delta & RFC 6902 Patch Engine (POST /api/v1/diff & POST /api/v1/patch):\nComputes minimal bandwidth diffs between any two JSON documents. Generates structured deltas (added, updated, deleted fields with dot-notation paths) and standard RFC 6902 JSON Patch operation arrays (add, replace, remove).\n\n4. Built-in Visual Dashboard UI:\nIncludes a responsive, glassmorphic Web Dashboard hosted at the root route (/) allowing developers to interactively test conflict resolution algorithms, select pre-built payload presets, and visually inspect JSON diffs.',
    challenges: 'Designing a stateless mathematical reconciliation engine capable of handling deeply nested JSON trees while maintaining strict determinism required fine-tuned recursion and tie-breaker handling. Distinguishing between true causal dominance and simultaneous concurrent updates required rigorous vector clock comparison logic to safely issue HTTP 409 Conflict states with structured diff payloads without data loss.',
    learnings: 'Built with Python 3.11/3.14 and FastAPI + Pydantic v2, this project honed my skills in distributed systems algorithms, vector clock causality graphs, field-level CRDT-like delta patching (RFC 6902), and writing 100% covered Pytest suites for deterministic backend APIs.',
    image: 'https://i.ibb.co/VWDFM2tG/Screenshot-2026-08-05-132613.png',
    imageHint: 'SyncSolve API Web Dashboard UI',
    gallery: [
      { url: 'https://i.ibb.co/VWDFM2tG/Screenshot-2026-08-05-132613.png', hint: 'SyncSolve API Web Dashboard & Visual JSON Diff Inspector' }
    ],
    tags: ['API', 'Web App', 'Python', 'FastAPI', 'Distributed Systems', 'Offline-First'],
    github: null,
    live: 'https://scratch-anye.onrender.com',
    metrics: [
      { label: 'Test Coverage', value: '100% Pytest', description: 'Comprehensive suite for all causality & delta edge cases' },
      { label: 'Core Engines', value: '3 Modules', description: 'Field-level LWW, Vector Clock causality & RFC 6902 Patch' },
      { label: 'Conflict Delta', value: 'Minimal Overhead', description: 'Field-level JSON dot-path diffing minimizes payload transfers' },
      { label: 'Response Time', value: '<10ms', description: 'Stateless, lightweight deterministic mathematical reconciliation' },
      { label: 'Complexity Score', value: '9.5 / 10', description: 'Vector clock causality graph math & recursive JSON delta patching' }
    ],
    timeline: [
      {
        phase: 'Phase 1: Causality Math & Vector Clocks',
        duration: 'Week 1',
        title: 'Vector Clock Causality Evaluator',
        description: 'Implemented version vector comparison routines to evaluate causal dominance (Va > Vb) vs concurrency (Va || Vb) returning HTTP 409 Conflict payloads.'
      },
      {
        phase: 'Phase 2: Field-Level LWW Merging',
        duration: 'Week 2',
        title: 'Recursive Last-Write-Wins Engine',
        description: 'Engineered recursive field-level JSON merging algorithms with timestamp comparison and deterministic client_id tie-breakers.'
      },
      {
        phase: 'Phase 3: RFC 6902 Patch Engine',
        duration: 'Week 3',
        title: 'JSON Dot-Path Diff & Patch Generator',
        description: 'Built diff calculations generating minimal dot-notation change arrays and compliant RFC 6902 add/replace/remove operations.'
      },
      {
        phase: 'Phase 4: Dashboard UI & Deployment',
        duration: 'Week 4',
        title: 'FastAPI Web UI & Serverless Deployment',
        description: 'Created a responsive glassmorphic web dashboard for live payload testing and deployed the production service to Render.'
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
      { url: (images as any).customPayrollGallery8, hint: 'user permissions' },
    ],
    tags: ['Desktop App', 'Python', 'PyQt', 'PostgreSQL'],
    github: null,
    live: null,
    metrics: [
      { label: 'Active Personnel', value: '500+ Files', description: 'Scalable personnel data structure logs' },
      { label: 'Database Engine', value: 'PostgreSQL', description: 'Secure relational database backend setup' },
      { label: 'Logic Modules', value: '8 Algorithms', description: 'Automated complex tax deduction models' },
      { label: 'GUI Panels', value: '15 Windows', description: 'Fully custom responsive PyQt6 interface layouts' },
      { label: 'Complexity Score', value: '8.2 / 10', description: 'Multi-threaded calculations & transaction-safe logs' }
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
  }
];
