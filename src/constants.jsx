import React from 'react'
const imgs = import.meta.glob('./assets/Images/**/*.{png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' })
const img = (path) => imgs[`./assets/Images/${path}`]

const GlobeIcon = (color) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const GamepadIcon = (color) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12"/>
    <line x1="8" y1="10" x2="8" y2="14"/>
    <line x1="15" y1="13" x2="15.01" y2="13"/>
    <line x1="18" y1="11" x2="18.01" y2="11"/>
    <rect x="2" y="6" width="20" height="12" rx="2"/>
  </svg>
)

const DeviceIcon = (color) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)

const ControllerIcon = (color) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
)

const CODEIcon = (color) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
)

const projectIcons = {
  web: GlobeIcon,
  game: GamepadIcon,
  mobile: DeviceIcon,
  code: CODEIcon,
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
      'Represented the IT department at the CEIT Research Colloquium, competing against 8 other teams from CE, EE, and IT departments, and earned 3rd Place Best Presentation. ',
    ],
    tags: ['Flutter', 'Dart', 'Firebase'],
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

export const ABOUT_SUMMARY = `As a graduating Bachelor of Science in Information Technology student, currently completing my degree and preparing for my transition into the professional field, I am eager to begin my career in a role that aligns with my passion for software development and my technical expertise. I am actively seeking an opportunity where I can contribute my skills while continuing to learn and grow alongside experienced professionals.

I have always enjoyed building applications, games, and software because I find fulfillment in turning ideas into functional solutions that create real value. Seeing a project progress from planning and development to a finished product motivates me to continuously improve my skills and explore new technologies. I enjoy collaborating with a team, solving problems, and contributing to projects that make a meaningful impact on both the organization and its users.

My goal is to become a well-rounded software developer who not only writes quality code but also understands the bigger picture of creating successful products. As I gain experience, I aspire to grow into a Project Manager role where I can combine my technical knowledge, leadership skills, and passion for delivering innovative solutions. I am committed to contributing to the success of the company I join while continuously challenging myself to learn, improve, and take on greater responsibilities.`

export const ABOUT_FACTS = [
  { label: 'Location',  value: 'Valenzuela City, Philippines' },
  { label: 'Degree',    value: 'BS Information Technology' },
  { label: 'Specialization',     value: 'Project Management & Software Development' },
  { label: 'Status',    value: 'Open for Opportunities' },
]

export const EDUCATION = {
  school: 'Pamantasan ng Lungsod ng Valenzuela',
  level: 'College',
  degree: 'Bachelor of Science in Information Technology',
  address: 'Tongco St. Maysan, Valenzuela City',
  period: '2022 – 2026',
  note: 'Graduating Aug 2026',
  imageLight: img('plvlight.jpg'),
  imageDark: img('plvnight.png'),
}

export const SKILL_LOGOS = [
  { src: 'https://cdn.simpleicons.org/figma', alt: 'Figma' },
  { src: 'https://cdn.simpleicons.org/mysql', alt: 'MySQL' },
  { src: 'https://cdn.simpleicons.org/firebase', alt: 'Firebase' },
  { src: 'https://cdn.simpleicons.org/flutter', alt: 'Flutter' },
  { src: 'https://cdn.simpleicons.org/dart', alt: 'Dart' },
  { src: 'https://cdn.simpleicons.org/html5', alt: 'HTML' },
  { src: 'https://cdn.simpleicons.org/css', alt: 'CSS' },
  { src: 'https://cdn.simpleicons.org/javascript', alt: 'JavaScript' },
  { src: 'https://cdn.simpleicons.org/php', alt: 'PHP' },
  { src: 'https://cdn.simpleicons.org/react', alt: 'React' },
  { src: 'https://cdn.simpleicons.org/vite', alt: 'Vite' },
  { src: 'https://cdn.simpleicons.org/supabase', alt: 'Supabase' },
  { src: 'https://cdn.simpleicons.org/unity', alt: 'Unity' },
  { src: 'https://cdn.simpleicons.org/blender', alt: 'Blender' },
  { src: img('icons/c-sharp.png'), alt: 'C#' },
  { src: img('icons/java.png'), alt: 'Java' },
  { src: 'https://cdn.simpleicons.org/jira', alt: 'Jira' },
]

const folderSvg = (svg) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>`)}`

export const SKILL_CATEGORIES = [
  {
    category: 'UI/UX Prototyping',
    color: '#F24E1E',
    folderLogo: folderSvg('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'),
    skills: [{ name: 'Figma', logo: 'https://cdn.simpleicons.org/figma' }],
  },
  {
    category: 'Database Skills',
    color: '#4479A1',
    folderLogo: folderSvg('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 5v4c0 1.66 4 3 9 3s9-1.34 9-3V5"/>'),
    skills: [
      { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql' },
      { name: 'Firebase', logo: 'https://cdn.simpleicons.org/firebase' },
      { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase' },
    ],
  },
  {
    category: 'Application Development',
    color: '#02569B',
    folderLogo: folderSvg('<rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="18" r="1.5"/><rect x="7" y="4" width="10" height="12" rx="1"/>'),
    skills: [
      { name: 'Flutter', logo: 'https://cdn.simpleicons.org/flutter' },
      { name: 'Dart', logo: 'https://cdn.simpleicons.org/dart' },
      { name: 'React', logo: 'https://cdn.simpleicons.org/react' },
      { name: 'Vite', logo: 'https://cdn.simpleicons.org/vite' },
    ],
  },
  {
    category: 'Web Development',
    color: '#E34F26',
    folderLogo: folderSvg('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
    skills: [
      { name: 'HTML', logo: 'https://cdn.simpleicons.org/html5' },
      { name: 'CSS', logo: 'https://cdn.simpleicons.org/css' },
      { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript' },
      { name: 'PHP', logo: 'https://cdn.simpleicons.org/php' },
    ],
  },
  {
    category: 'Game Development',
    color: '#6C5CE7',
    folderLogo: folderSvg('<rect x="2" y="6" width="20" height="12" rx="3"/><circle cx="6" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/><path d="M9 10h2v2H9z"/><path d="M13 10h2v2h-2z"/>'),
    skills: [{ name: 'Unity', logo: 'https://cdn.simpleicons.org/unity' }],
  },
  {
    category: 'Basic 3D Modeling',
    color: '#EA7600',
    folderLogo: folderSvg('<polyline points="21 16 12 21 3 16 3 8 12 3 21 8 21 16"/><line x1="12" y1="21" x2="12" y2="8"/><line x1="3" y1="8" x2="21" y2="8"/>'),
    skills: [{ name: 'Blender', logo: 'https://cdn.simpleicons.org/blender' }],
  },
  {
    category: 'Programming Languages',
    color: '#239120',
    folderLogo: folderSvg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
    skills: [
      { name: 'C#', logo: img('icons/c-sharp.png') },
      { name: 'Java', logo: img('icons/java.png') },
    ],
  },
  {
    category: 'Project Management',
    color: '#0052CC',
    folderLogo: folderSvg('<rect x="3" y="3" width="18" height="4" rx="1"/><rect x="3" y="10" width="14" height="4" rx="1"/><rect x="3" y="17" width="10" height="4" rx="1"/>'),
    skills: [
      { name: 'Jira', logo: 'https://cdn.simpleicons.org/jira' },
    ],
  },
]

export const CERTIFICATIONS = [
  {
    name: "Dean's Lister",
    detail: '2nd Year, 2nd Semester',
    category: 'Academic Honor',
    year: '2023',
    gwa: '1.45 GWA',
    image: img('Certificates/DL2ndYear.png'),
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
    detail: '3rd Year, 2nd Semester',
    category: 'Academic Honor',
    year: '2024',
    gwa: '1.13 GWA',
    image: 'https://placehold.co/260x140/111111/333333?text=Dean%27s+List',
  },
  {
    name: 'OWWA – Education for Development Scholarships Program (EDSP)',
    detail: '3rd Year 1st Sem – 4th Year Last Sem',
    category: 'Scholarship',
    year: '2024',
    image: 'https://placehold.co/260x140/111111/333333?text=OWWA+EDSP',
  },
  {
    name: "Dean's Lister",
    detail: '4th Year, 1st Semester',
    category: 'Academic Honor',
    year: '2025',
    gwa: '1.27 GWA',
    image: 'https://placehold.co/260x140/111111/333333?text=Dean%27s+List',
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
]