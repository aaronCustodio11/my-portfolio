const imgs = import.meta.glob('./assets/Images/**/*.{png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' })
const img = (path) => imgs[`./assets/Images/${path}`]

const globeIcon = (color) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const gamepadIcon = (color) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12"/>
    <line x1="8" y1="10" x2="8" y2="14"/>
    <line x1="15" y1="13" x2="15.01" y2="13"/>
    <line x1="18" y1="11" x2="18.01" y2="11"/>
    <rect x="2" y="6" width="20" height="12" rx="2"/>
  </svg>
)

const deviceIcon = (color) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)

const codeIcon = (color) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
)

const projectIcons = {
  web: globeIcon,
  game: gamepadIcon,
  mobile: deviceIcon,
  code: codeIcon,
}

export function getProjectIcon(type) {
  const t = type.toLowerCase()
  if (t.includes('mobile')) return projectIcons.mobile
  if (t.includes('game')) return projectIcons.game
  if (t.includes('web')) return projectIcons.web
  return projectIcons.code
}

export const navItems = [
  { label: 'Home',     href: '#home'     },
  { label: 'Projects', href: '#projects' },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
]

export const SUMMARY = `A dedicated Information Technology fresh graduate with a strong foundation in project management, software development, web development, and game design. I aim to apply my technical and leadership skills in a real-world setting, and I am open to roles across the software development spectrum including quality assurance and business analysis, while further developing my teamwork, communication, and problem-solving abilities. `

export const PROJECTS = [
  {
    number: '01',
    title: 'Rumini',
    type: 'Web Development & Mobile App',
    role: 'Project Manager & Full-Stack Developer',
    date: 'Jan 2025 - Apr 2026',
    description: 'A Web-based Counseling Management with an Android-based Mood Tracking that streamlines counseling services for students through appointment booking, chatbot support, mood tracking, form analytics, and psychoeducational resources.',
    contributions: [
      'Spearheaded project planning and task delegation for a 4-member team across 3 semesters using Agile methodology, ensuring timely delivery of all project milestones. ',
      'Developed 4 core modules (Appointment Request, Mood Tracker, User Management, and Form Analytics) for a counseling system serving 100 students, 2 counselors, and 1 admin, achieving a 3.77 out of 5 ISO 25010 quality rating across all user groups. ',
      'Engineered an NLP-driven conversational assistant to replace the platforms rule-based chatbot delivering natural English, Tagalog, and Taglish conversation with retrieval-grounded responses and a crisis-safety detection layer, eliminating the rigid keyword-matching limitations of the legacy system. ',
      'Represented the IT department at the CEIT Research Colloquium, competing against 8 other teams from CE, EE, and IT departments, and earned 3rd Place Best Presentation. ',
    ],
    tags: ['Flutter', 'Dart', 'Firebase', 'Supabase', 'Groq', ],
    link: '#',
    icon: getProjectIcon('Web Development & Mobile App'),
    image: img('works/Rumini/rumini3.png'),
    gallery: [img('works/Rumini/rumini.png'), img('works/Rumini/rumini1.png'), img('works/Rumini/rumini2.png'), img('works/Rumini/rumini3.png'), img('works/Rumini/rumini4.png'), img('works/Rumini/rumini5.png'), img('works/Rumini/rumini6.png'), img('works/Rumini/rumini7.png'), img('works/Rumini/rumini8.png'), img('works/Rumini/rumini9.png'), img('works/Rumini/rumini10.png'), img('works/Rumini/rumini11.png'), img('works/Rumini/rumini12.png'), img('works/Rumini/rumini13.png')],
    githubUrl: 'https://github.com/aaronCustodio11/Rumini',
    videoUrl: 'https://www.youtube.com/embed/ywb-crVWkGg?rel=0&modestbranding=1',
    contribution: `Developed 4 core modules (Appointment Request, Mood Tracker, User Management, and Form Analytics) for a counseling system serving 100+ students, 2 counselors, and 1 admin. Spearheaded project planning and task delegation for a 4-member team across 3 semesters using Agile methodology, ensuring timely delivery of all project milestones.`,
  },
  {
    number: '02',
    title: 'BokaDex',
    type: 'Game Development',
    role: 'Freelance Game Developer',
    date: 'Jan 2026 - Mar 2026',
    description: 'A top-down 2D RPG with a turn-based battle system built in Unity using pixel art, designed to help high school students learn associative words through an engaging game-based learning experience.',
    contributions: [
      'Engineered a top-down RPG Android mobile game with a turn-based battle system targeting word association skills, contributing to the client groups 2nd Place finish in their department.',
      'Developed a companion teacher application connected to a shared database, enabling real-time monitoring and tracking of student gameplay data.',
      'Designed 16 in-game maps using multi-layered tile mapping, creating dynamic and visually structured game environments.',
    ],
    tags: ['Unity', 'C#', 'Firebase'],
    link: '#',
    icon: getProjectIcon('Game Development'),
    image: img('works/Bokadex/bokadex.png'),
    gallery: [img('works/Bokadex/bokadex.png'), img('works/Bokadex/bokadex1.png'), img('works/Bokadex/bokadex2.jpg'), img('works/Bokadex/bokadex3.png'), img('works/Bokadex/bokadex4.jpg'), img('works/Bokadex/bokadex5.png'), img('works/Bokadex/bokadex6.png'), img('works/Bokadex/bokadex7.png'), img('works/Bokadex/bokadex8.png'), img('works/Bokadex/bokadex9.png')],
    githubUrl: 'https://github.com/aaroncustodio11/bokadex',
    videoUrl: 'https://www.youtube.com/embed/G25OegvwhIg?rel=0&modestbranding=1',
    contribution: `Engineered a top-down RPG Android mobile game with a turn-based battle system targeting word association skills. Developed a companion teacher application connected to a shared database for real-time monitoring of student gameplay data. Designed 16 in-game maps using multi-layered tile mapping.`,
  },
  {
    number: '03',
    title: 'Easy tickIT',
    type: 'Web Development',
    role: 'Front-end Developer',
    date: 'Jan 2025 - May 2025',
    description: 'A web-based ticketing system for PLV events featuring QR code tickets, event browsing, feedback, chat support, and a user-friendly UI/UX for seamless participation management.',
    contributions: [
      'Designed the complete UI/UX of the website covering all key pages, delivering a consistent and user-friendly interface across the entire platform. Built cross-platform UI with React and Node.js',
      'Led front-end development by translating UI/UX designs into a fully functional website, ensuring visual consistency and smooth user experience across all pages.',
      'Conducted quality assurance testing on the system, identifying and resolving issues to ensure the final product met functional and design standards before deployment.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    link: '#',
    icon: getProjectIcon('Web Development'),
    image: img('works/EasytickIT/easyTickIT1.png'),
    gallery: [img('works/EasytickIT/easyTickIT.png'), img('works/EasytickIT/easyTickIT1.png'), img('works/EasytickIT/easyTickIT2.png'), img('works/EasytickIT/easyTickIT3.png'), img('works/EasytickIT/easyTickIT4.png'), img('works/EasytickIT/easyTickIT5.png'), img('works/EasytickIT/easyTickIT6.png'), img('works/EasytickIT/easyTickIT7.png'), img('works/EasytickIT/easyTickIT8.png')],
    githubUrl: 'https://github.com/aaronCustodio11',
    videoUrl: null,
    contribution: `Designed the complete UI/UX of the website covering all key pages, delivering a consistent user-friendly interface across the entire platform. Built cross-platform UI with React and Node.js. Conducted quality assurance testing to ensure the final product met functional and design standards.`,
  },
  {
    number: '04',
    title: 'The Last Chapter',
    type: 'Game Development',
    role: 'Project Lead & Game Designer & Developer',
    date: 'Nov 2024 - Dec 2024',
    description: 'A one-button horror game using real video footage, where players complete research in a haunted computer lab by reacting to disturbing sounds and peeking at a lurking monster.',
    contributions: [
      'Spearheaded task delegation and quality checks for a 7-member team, ensuring consistent output across all deliverables and earning the Peoples Choice Award among 15+ competing games at GameCon.',
      'Directed the entire game mechanics concept and real video footage used as visual assets, establishing the creative foundation and visual identity of the game.',
      'Developed 6 core game scenes including the Menu, Tutorial, three monster encounters, and Game Over sequence, delivering a complete and playable game experience.',
    ],
    tags: ['Unity', 'C#'],
    link: '#',
    icon: getProjectIcon('Game Development'),
    image: img('works/TheLastChapter/thelastchapter.png'),
    gallery: [img('works/TheLastChapter/thelastchapter.png'), img('works/TheLastChapter/thelastchapter1.png'), img('works/TheLastChapter/thelastchapter2.png'), img('works/TheLastChapter/thelastchapter3.png')],
    githubUrl: 'https://github.com/aaronCustodio11/TheLastChapter',
    videoUrl: 'https://www.youtube.com/embed/StUZyVqUcds?rel=0&modestbranding=1',
    contribution: `Directed the entire game mechanics concept and real video footage used as visual assets. Developed 6 core game scenes including the Menu, Tutorial, three monster encounters, and Game Over sequence. Spearheaded task delegation and quality checks for a 7-member team, earning the People's Choice Award among 15+ competing games at GameCon.`,
  },
]

export const ABOUT_SUMMARY = `I'm Aaron, a fresh Information Technology graduate from Pamantasan ng Lungsod ng Valenzuela. I've always been drawn to building things, whether that's a website, a mobile game, or an AI system, and over the last few years I've learned that I enjoy leading a team just as much as writing the code.

My biggest project was our capstone, Rumini 2.0, where I served as project manager and technical lead. We replaced a rigid, keyword-based chatbot with an NLP-driven assistant that can hold natural conversations in English, Tagalog, and Taglish, and even detect crisis situations. Presenting it at the CEIT Research Colloquium and earning 3rd Place Best Presentation was a proud moment for me and my team.

Outside of that, I've led a game project that won the People's Choice Award at GameCon, designed and built a web system as front-end lead, and developed an Android RPG game for a client. I also did an IT support internship at People Partners Inc., where I got hands-on experience keeping a workplace running smoothly.

Now I'm looking for a role where I can keep growing, whether in software development, quality assurance, or project management, and where I can bring both my technical skills and my teamwork to real-world problems.`

export const ABOUT_FACTS = [
  { label: 'Location',  value: 'Valenzuela City, Philippines' },
  { label: 'Degree',    value: 'BS Information Technology' },
  { label: 'Specialization',     value: 'Software Engineer and AI Specialist' },
  { label: 'Status',    value: 'Open for Opportunities' },
]

export const EDUCATION = {
  school: 'Pamantasan ng Lungsod ng Valenzuela',
  level: 'College',
  degree: 'Bachelor of Science in Information Technology',
  address: 'Tongco St. Maysan, Valenzuela City',
  period: '2022 – 2026',
  note: 'Graduated Aug 2026',
  imageLight: img('plvlight.jpg'),
  imageDark: img('plvnight.png'),
}

const folderSvg = (svg) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>`)}`

const editorIcon = folderSvg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m9 11-2 2 2 2"/><path d="m15 11 2 2-2 2"/>')

export const SKILL_LOGOS = [
  { src: 'https://cdn.simpleicons.org/python', alt: 'Python' },
  { src: img('icons/java.png'), alt: 'Java' },
  { src: img('icons/c-sharp.png'), alt: 'C#' },
  { src: 'https://cdn.simpleicons.org/javascript', alt: 'JavaScript' },
  { src: 'https://cdn.simpleicons.org/typescript', alt: 'TypeScript' },
  { src: 'https://cdn.simpleicons.org/php', alt: 'PHP' },
  { src: 'https://cdn.simpleicons.org/dart', alt: 'Dart' },
  { src: 'https://cdn.simpleicons.org/html5', alt: 'HTML' },
  { src: 'https://cdn.simpleicons.org/css', alt: 'CSS' },
  { src: 'https://cdn.simpleicons.org/react', alt: 'React' },
  { src: 'https://cdn.simpleicons.org/vite', alt: 'Vite' },
  { src: 'https://cdn.simpleicons.org/flutter', alt: 'Flutter' },
  { src: 'https://cdn.simpleicons.org/expo', alt: 'Expo' },
  { src: 'https://cdn.simpleicons.org/openapiinitiative', alt: 'REST API' },
  { src: 'https://cdn.simpleicons.org/flask', alt: 'Flask' },
  { src: 'https://cdn.simpleicons.org/mysql', alt: 'MySQL' },
  { src: 'https://cdn.simpleicons.org/firebase', alt: 'Firebase' },
  { src: 'https://cdn.simpleicons.org/supabase', alt: 'Supabase' },
  { src: 'https://cdn.simpleicons.org/n8n', alt: 'n8n' },
  { src: 'https://cdn.simpleicons.org/docker', alt: 'Docker' },
  { src: 'https://cdn.simpleicons.org/figma', alt: 'Figma' },
  { src: 'https://cdn.simpleicons.org/unity', alt: 'Unity' },
  { src: 'https://cdn.simpleicons.org/aseprite', alt: 'Aseprite' },
  { src: 'https://cdn.simpleicons.org/git', alt: 'Git' },
  { src: 'https://cdn.simpleicons.org/github', alt: 'GitHub' },
  { src: editorIcon, alt: 'VS Code' },
]

export const SKILL_CATEGORIES = [
  {
    category: 'Languages',
    color: '#239120',
    folderLogo: folderSvg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
    skills: [
      { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
      { name: 'Java', logo: img('icons/java.png') },
      { name: 'C#', logo: img('icons/c-sharp.png') },
      { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript' },
      { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript' },
      { name: 'PHP', logo: 'https://cdn.simpleicons.org/php' },
      { name: 'Dart', logo: 'https://cdn.simpleicons.org/dart' },
    ],
  },
  {
    category: 'Web/Mobile',
    color: '#02569B',
    folderLogo: folderSvg('<rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="18" r="1.5"/><rect x="7" y="4" width="10" height="12" rx="1"/>'),
    skills: [
      { name: 'HTML', logo: 'https://cdn.simpleicons.org/html5' },
      { name: 'CSS', logo: 'https://cdn.simpleicons.org/css' },
      { name: 'React.js', logo: 'https://cdn.simpleicons.org/react' },
      { name: 'Vite', logo: 'https://cdn.simpleicons.org/vite' },
      { name: 'Flutter', logo: 'https://cdn.simpleicons.org/flutter' },
      { name: 'React Native', logo: 'https://cdn.simpleicons.org/react' },
      { name: 'Expo', logo: 'https://cdn.simpleicons.org/expo' },
      { name: 'REST API', logo: 'https://cdn.simpleicons.org/openapiinitiative' },
      { name: 'Flask', logo: 'https://cdn.simpleicons.org/flask' },
    ],
  },
  {
    category: 'Database/Backend',
    color: '#4479A1',
    folderLogo: folderSvg('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 5v4c0 1.66 4 3 9 3s9-1.34 9-3V5"/>'),
    skills: [
      { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql' },
      { name: 'Firebase', logo: 'https://cdn.simpleicons.org/firebase' },
      { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase' },
    ],
  },
  {
    category: 'Automation',
    color: '#2496ED',
    folderLogo: folderSvg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'),
    skills: [
      { name: 'n8n', logo: 'https://cdn.simpleicons.org/n8n' },
      { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker' },
    ],
  },
  {
    category: 'Design/Game',
    color: '#6C5CE7',
    folderLogo: folderSvg('<rect x="2" y="6" width="20" height="12" rx="3"/><circle cx="6" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/><path d="M9 10h2v2H9z"/><path d="M13 10h2v2h-2z"/>'),
    skills: [
      { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma' },
      { name: 'Unity', logo: 'https://cdn.simpleicons.org/unity' },
      { name: 'Aseprite', logo: 'https://cdn.simpleicons.org/aseprite' },
    ],
  },
  {
    category: 'Tools',
    color: '#607D8B',
    folderLogo: folderSvg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
    skills: [
      { name: 'Git', logo: 'https://cdn.simpleicons.org/git' },
      { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github' },
      { name: 'VS Code', logo: editorIcon },
    ],
  },
]

export const CERTIFICATIONS = [
  {
    name: 'Developing AI Applications with Python and Flask',
    detail: 'IBM · Coursera',
    category: 'Course Certificate',
    year: '2026',
    issued: 'Sep 25, 2026',
    url: 'https://www.coursera.org/account/accomplishments/records/0D3JFYW9CQ1G',
    image: img('Certificates/Coursera 0D3JFYW9CQ1G_page-0001.jpg'),
  },
  {
    name: 'Python for Data Science, AI & Development',
    detail: 'IBM · Coursera',
    category: 'Course Certificate',
    year: '2026',
    issued: 'Sep 23, 2026',
    url: 'https://www.coursera.org/account/accomplishments/records/RUK82L31P44L',
    image: img('Certificates/Coursera RUK82L31P44L_page-0001.jpg'),
  },
  {
    name: 'Generative AI: Prompt Engineering Basics',
    detail: 'IBM · Coursera',
    category: 'Course Certificate',
    year: '2026',
    issued: 'Sep 15, 2026',
    url: 'https://www.coursera.org/account/accomplishments/records/RRQJ63RMKPB6',
    image: img('Certificates/Coursera RRQJ63RMKPB6_page-0001.jpg'),
  },
  {
    name: 'Generative AI: Introduction and Applications',
    detail: 'IBM · Coursera',
    category: 'Course Certificate',
    year: '2026',
    issued: 'Sep 12, 2026',
    url: 'https://www.coursera.org/account/accomplishments/records/GUL20SH34784',
    image: img('Certificates/Coursera GUL20SH34784_page-0001.jpg'),
  },
  {
    name: 'Introduction to Artificial Intelligence (AI)',
    detail: 'IBM · Coursera',
    category: 'Course Certificate',
    year: '2026',
    issued: 'Sep 10, 2026',
    url: 'https://www.coursera.org/account/accomplishments/records/2PUR5FP6JGEJ',
    image: img('Certificates/Coursera 2PUR5FP6JGEJ_page-0001.jpg'),
  },
  {
    name: 'Foundations of Project Management',
    detail: 'Google · Coursera',
    category: 'Course Certificate',
    year: '2026',
    issued: 'Sep 9, 2026',
    url: 'https://www.coursera.org/account/accomplishments/records/0Q3X7P19QW36',
    image: img('Certificates/Coursera 0Q3X7P19QW36_page-0001.jpg'),
  },
  {
    name: 'Prompt Like an Engineer',
    detail: 'Cisco Networking Academy',
    category: 'Course Certificate',
    year: '2026',
    issued: 'Sep 6, 2026',
    url: 'https://www.credly.com/badges/d290209e-7d80-427a-9da6-5db95438c9c4/public_url',
    image: img('Certificates/PromptLikeanEngineer20260906-21-3a7xod_page-0001.jpg'),
  },
  {
    name: 'Introduction to Modern AI',
    detail: 'Cisco Networking Academy',
    category: 'Course Certificate',
    year: '2026',
    issued: 'Aug 29, 2026',
    url: 'https://www.credly.com/badges/bcb910ce-734c-436b-af73-a86adc883800/public_url',
    image: img('Certificates/IntrotoModernAIUpdate20260829-22-x0kpo_page-0001.jpg'),
  },
  {
    name: '3rd Place – Web Design Competition',
    detail: 'ITlympics',
    category: 'Award',
    year: '2026',
    image: img('Certificates/WebDesign.jpg'),
  },
  {
    name: '2nd Place – Python Programming Competition',
    detail: 'ITlympics',
    category: 'Award',
    year: '2026',
    image: img('Certificates/Python.jpg'),
  },
  {
    name: 'Rumini (Capstone) – Participation & 3rd Place',
    detail: '6th CEIT Research Colloquium',
    category: 'Award',
    year: '2026',
    image: img('Certificates/Colloquium.jpg'),
  },
  {
    name: "Dean's Lister",
    detail: '3rd Year, 1st Semester',
    category: 'Academic Honor',
    year: '2024',
    gwa: '1.15 GWA',
    image: img('Certificates/DL3rdYear.png'),
  },
  {
    name: "Dean's Lister",
    detail: '2nd Year, 2nd Semester',
    category: 'Academic Honor',
    year: '2023',
    gwa: '1.45 GWA',
    image: img('Certificates/DL2ndYear.png'),
  },
]