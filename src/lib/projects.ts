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
    slug: 'learnmate',
    title: 'LearnMate (Mobile-Based Android App)',
    description:
      'An Android app to streamline remote learning with session booking, messaging, and video conferencing.',
    longDescription:
      'Learnmate is an Android-based mobile application designed to streamline remote learning and tutoring. It enables tutors and tutees to connect, communicate, and collaborate through an intuitive interface that supports session booking, in-app messaging, and video conferencing — all from a mobile device. The goal was to create a seamless and accessible platform for education, breaking down geographical barriers.',
    challenges: 'One of the main challenges was implementing a reliable and low-latency video conferencing feature within the app. Integrating the Agora SDK required careful handling of state management and native platform differences. Another challenge was designing an intuitive booking system that could handle multiple time zones and tutor availability.',
    learnings: 'This project was a deep dive into cross-platform mobile development with Flutter and Dart. I gained significant experience with real-time communication technologies and third-party SDK integration. I also learned a lot about UX/UI design for mobile applications and the importance of user feedback in the development cycle.',
    image: images.learnmateMain,
    imageHint: 'mobile learning',
    gallery: [],
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
      { label: 'Complexity Score', value: '8.5 / 10', description: 'Real-time multi-user coordination & video streams' },
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
    image: images.woodKnotMain,
    imageHint: 'wood detection',
    gallery: [
      { url: 'https://i.ibb.co/rNj98hm/57eddd60-ec3a-4c1e-bc25-80333fc1b024.jpg', hint: 'wood knot detection on device' },
      { url: 'https://i.ibb.co/MX38mgH/ea13b409-af46-4562-a88e-947b801dcb4e.jpg', hint: 'model output visualization' },
      { url: 'https://i.ibb.co/RTzy79HW/b7fd349a-1189-4f96-a9c1-15e27e0845f8.jpg', hint: 'custom dataset sample' },
      { url: 'https://i.ibb.co/HptFPfhG/5d8825e2-1fc8-4619-8909-2d53a9ece1c1.jpg', hint: 'real-time model inference' }
    ],
    tags: ['Mobile App', 'AI', 'Flutter', 'Dart', 'TensorFlow Lite', 'YOLOv8'],
    github: null,
    live: null,
    metrics: [
      { label: 'Dataset Size', value: '10,000+ Images', description: 'Custom-annotated lumber surface images' },
      { label: 'Training Iterations', value: '75 Epochs', description: 'YOLOv8 custom feature convergence' },
      { label: 'Inference Latency', value: '<45ms', description: 'Highly responsive real-time on-device execution' },
      { label: 'Model Compaction', value: '85% Size Reduction', description: 'ONNX to quantized TensorFlow Lite format' },
      { label: 'Complexity Score', value: '9.4 / 10', description: 'Edge device optimization & custom AI pipeline' }
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
    image: images.brailleReaderMain,
    imageHint: 'braille reader device',
    gallery: [
      { url: 'https://i.ibb.co/zWdb3tRW/image-2026-07-10-150400735.png', hint: 'braille reader physical prototype' },
      { url: 'https://i.ibb.co/67KX0cSP/image-2026-07-10-150441522.png', hint: 'OCR extraction processing interface' },
      { url: 'https://i.ibb.co/qMYv8Bc2/image-2026-07-10-150507050.png', hint: 'on-device translation flow' }
    ],
    tags: ['AI', 'IoT', 'Python', 'Raspberry Pi', 'YOLOv5', 'OCR'],
    github: null,
    live: null,
    metrics: [
      { label: 'OCR Accuracy', value: '97.82%', description: 'Custom translation accuracy under varied lighting' },
      { label: 'Pipeline Latency', value: '~1.2s', description: 'Full image-to-haptic-pattern latency' },
      { label: 'Codebase Scale', value: '~4,200 LOC', description: 'Python scripts, YOLOv5 integration, solenoid driver loops' },
      { label: 'Hardware Nodes', value: '4 Components', description: 'Raspberry Pi 4, high-res camera, 3D-printed haptic cell array' },
      { label: 'Complexity Score', value: '9.6 / 10', description: 'Deep tech integration pairing computer vision & physical solenoids' }
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
    slug: 'inventory-system',
    title: 'Accountability and Inventory System',
    description: 'A robust PHP-based inventory system for streamlined asset tracking with dynamic form generation.',
    longDescription: 'This comprehensive inventory and accountability system, built with PHP, revolutionizes asset management. It provides a centralized platform for tracking equipment, generating dynamic accountability forms on-the-fly, and maintaining a clear chain of custody. Powerful search and sorting capabilities allow for instant access to asset information, significantly improving operational efficiency and reducing manual paperwork.',
    challenges: 'Developing a dynamic form generation engine that was both flexible and secure was a key challenge. It required careful database schema design and server-side logic to prevent injection vulnerabilities while allowing for customizable forms. Implementing an efficient search algorithm to handle a large inventory database was also a priority.',
    learnings: 'This project deepened my expertise in backend development with PHP and SQL. I mastered techniques for building secure, data-driven web applications and learned the importance of database normalization for scalability. It was also a great exercise in designing user-centric features like advanced search and dynamic content generation.',
    image: images.inventorySystemMain,
    imageHint: 'inventory management',
    gallery: [
      { url: images.inventorySystemGallery1, hint: 'dashboard screen' },
      { url: images.inventorySystemGallery2, hint: 'asset list' },
      { url: (images as any).inventorySystemGallery3, hint: 'accountability form' },
      { url: (images as any).inventorySystemGallery4, hint: 'user management' },
      { url: (images as any).inventorySystemGallery5, hint: 'item details' },
      { url: (images as any).inventorySystemGallery6, hint: 'search functionality' },
      { url: (images as any).inventorySystemGallery7, hint: 'reports generation' },
      { url: (images as any).inventorySystemGallery8, hint: 'login page' },
    ],
    tags: ['Web App', 'PHP', 'SQL'],
    github: null,
    live: null,
    metrics: [
      { label: 'Active Records', value: '1,500+ Assets', description: 'Centralized live hardware tracking' },
      { label: 'Relational Schema', value: '14 Tables', description: 'Highly optimized 3NF normalized SQL database structure' },
      { label: 'Codebase Scale', value: '~6,800 LOC', description: 'PHP server-side code & custom web interfaces' },
      { label: 'Security Grade', value: 'Enterprise Ready', description: 'Full protection against SQL injection & XSS' },
      { label: 'Complexity Score', value: '7.8 / 10', description: 'Dynamic form generation engine & audit logging' }
    ],
    timeline: [
      {
        phase: 'Phase 1: DB Normalization',
        duration: 'Week 1',
        title: '3NF Relational Schema Design',
        description: 'Engineered a highly resilient SQL architecture spanning 14 tables to track comprehensive asset lifetimes and custody transfers.'
      },
      {
        phase: 'Phase 2: PHP MVC Core Setup',
        duration: 'Weeks 2-3',
        title: 'Server Foundations & RBAC Protocols',
        description: 'Constructed custom PHP MVC file controllers and integrated strict Role-Based Access Control and action audit loggers.'
      },
      {
        phase: 'Phase 3: Form Generation Engine',
        duration: 'Week 4',
        title: 'Dynamic Templates & PDF Outputs',
        description: 'Coded a highly flexible rendering loop that constructs user accountability templates on-the-fly, complete with automated PDF exports.'
      },
      {
        phase: 'Phase 4: Search & Indexes Tuning',
        duration: 'Week 5',
        title: 'Query Optimization & SLA Logs',
        description: 'Optimized complex SQL join queries and configured appropriate database indexes for fast search operations under heavy loads.'
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
  },
  {
    slug: 'couple-budget-tracker',
    title: 'Couple Budget Tracker & Predictive Grocery List',
    description: 'A smart, full-stack Financial Ledger and predictive grocery organizer built with Remix for collaborative household budgeting.',
    longDescription: 'This custom Financial Ledger Application is a fully-featured, full-stack platform designed for couples to coordinate their budgets and track expenses cooperatively. Built using Remix for rapid server-side rendering and responsive client interaction, the app features dynamic expense reporting, shared balances, custom category budgeting, and an intelligent predictive shopping engine. The application empowers users to log joint expenses, track individual contributions, visualize statistical trends, and receive smart, automated predictions of upcoming grocery needs based on historical consumption cycles, turning transactional tracking into actionable intelligence.',
    challenges: 'The major challenge lay in creating a synchronized real-time ledger that manages concurrent transactions from two different users without discrepancies in shared balances. Ensuring a clean data schema to dynamically compute running totals, individual debt splits, and historical averages was key. Additionally, building a predictive analytics parser that evaluates non-linear intervals of item purchases to compile a smart grocery forecast list demanded robust server-side algorithms.',
    learnings: 'Through this project, I gained comprehensive experience with the Remix framework and optimized server-side state hydration. I sharpened my database modeling skills to handle complex transaction splits and balance ledgers securely. I also learned to translate low-level transaction logs into highly user-friendly forecasting tools, enhancing the overall experience with real-time UI/UX feedback loops.',
    image: 'https://i.ibb.co/hFDPNdVx/image-2026-07-10-152231603.png',
    imageHint: 'financial ledger dashboard',
    gallery: [
      { url: 'https://i.ibb.co/7tskL6Cq/image-2026-07-10-152301369.png', hint: 'couple dashboard showing shared balances' },
      { url: 'https://i.ibb.co/hxzfJ3Qr/image-2026-07-10-152431013.png', hint: 'monthly expense stats and breakdowns' },
      { url: 'https://i.ibb.co/207Bj7QM/image-2026-07-10-152447668.png', hint: 'predictive grocery list with suggestions' },
      { url: 'https://i.ibb.co/Q7vjMbdc/image-2026-07-10-152509882.png', hint: 'dynamic ledger search and transaction history' },
      { url: 'https://i.ibb.co/tw6qp9s3/image-2026-07-10-152528916.png', hint: 'budget limits and category alert settings' },
      { url: 'https://i.ibb.co/yc7tgNcX/image-2026-07-10-152545473.png', hint: 'mobile-optimized layout for on-the-go logging' },
      { url: 'https://i.ibb.co/mFzGB6Dk/image-2026-07-10-152602485.png', hint: 'account settlements and balance transfers' },
      { url: 'https://i.ibb.co/1GHnPJ9D/image-2026-07-10-152727814.png', hint: 'detailed transaction audit and filtering interface' }
    ],
    tags: ['Web App', 'Remix', 'TypeScript', 'SQL', 'Tailwind CSS', 'Data Analysis', 'Predictive Analytics'],
    github: null,
    live: 'https://remix-couple-budget-tracker-predictive-grocery-en-242891057226.asia-southeast1.run.app',
    metrics: [
      { label: 'Codebase Scale', value: '~5,400 LOC', description: 'Type-safe full-stack Remix & TypeScript code' },
      { label: 'Sync Latency', value: 'Optimistic', description: 'Near-instant client UI state feedback' },
      { label: 'Predictive Range', value: '30-Day Window', description: 'Grocery consumption analysis interval' },
      { label: 'Relational Schema', value: '11 SQL Tables', description: 'Joint finances ledger design pattern' },
      { label: 'Complexity Score', value: '9.0 / 10', description: 'Non-linear consumption calculations & server state hydration' }
    ],
    timeline: [
      {
        phase: 'Phase 1: Remix Architecture',
        duration: 'Week 1',
        title: 'Full-Stack Server & Schema Blueprinting',
        description: 'Established the initial Remix code routes and modeled 11 SQL relational tables supporting shared accounts and concurrent edits.'
      },
      {
        phase: 'Phase 2: Real-time Ledger',
        duration: 'Week 2',
        title: 'Shared Balances & Optimistic State UI',
        description: 'Built immediate ledger update views in React, applying optimistic state updates to keep balances updated without UI sluggishness.'
      },
      {
        phase: 'Phase 3: Prediction Logic',
        duration: 'Weeks 3-4',
        title: 'Consumption Tracking Algorithms',
        description: 'Programmed math patterns on the server evaluating non-linear frequencies of past purchase records to output a smart 30-day forecast list.'
      },
      {
        phase: 'Phase 4: Responsive Tuning',
        duration: 'Week 5',
        title: 'User Interface Refinement & Alerts',
        description: 'Optimized touch layouts for mobile logging and added reactive warning bars when expenses approach budget category limits.'
      }
    ]
  },
];
