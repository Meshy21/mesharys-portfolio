export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  tags: string[];
  bullets: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 'freelance-software-engineer',
    title: 'Freelance Software Engineer',
    company: 'Part-time, Concurrent',
    location: 'Remote',
    period: 'September 2024 – Present',
    isCurrent: true,
    tags: ['Dart', 'Flutter', 'Firebase', 'WebRTC', 'YOLOv8', 'Python', 'TensorFlow Lite'],
    bullets: [
      'Delivered low-latency video and messaging for two user roles on LearnMate, a cross-platform tutoring app, by designing the Firebase data model, authentication and role-based access, and implementing WebRTC signalling. Dart, Flutter, Firebase.',
      'Achieved on-device inference for Wood Knot Detection as sole engineer, by training a YOLOv8 detector on a 12,000-image dataset and building the ONNX-to-TFLite pipeline. Python, TensorFlow Lite.'
    ]
  },
  {
    id: 'abubakar-it-specialist',
    title: 'IT Specialist',
    company: 'M. Abubakar Construction and Engineering',
    location: 'Zamboanga City',
    period: 'June 2025 – June 2026',
    tags: ['Python', 'PyQt6', 'PostgreSQL', 'RBAC', 'Git', 'Database Schema'],
    bullets: [
      'Cut document and certificate reconciliation from three days to under four hours by designing a normalized PostgreSQL schema and building the tracking system that replaced a shared-spreadsheet process, with authentication and role-based access control across three user tiers.',
      'Removed 15+ hours of weekly manual data entry from a payroll cycle covering 50+ employees by building a payroll application end to end (Python, PyQt6), automating computation, statutory deductions and payslip generation.',
      'Shipped to production across two live systems with zero downtime by owning the full Git workflow — feature branching, code review and versioned releases.'
    ]
  },
  {
    id: 'rtc9-intern',
    title: 'Software Developer Intern',
    company: 'Regional Trial Court, Region 9',
    location: 'Zamboanga City',
    period: 'August 2024 – April 2025',
    tags: ['Offline-First', 'Desktop Client', 'Bi-Directional Sync', 'Conflict Resolution', 'SQL'],
    bullets: [
      'Kept court operations running for 10+ daily staff through repeated network outages by building an offline-first desktop client with automated cloud synchronization.',
      'Reconciled 1,000+ legal records after outages with zero data loss by engineering bi-directional sync with conflict resolution between offline clients and the live database.'
    ]
  }
];
