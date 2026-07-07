import { PortfolioData } from '../models/portfolio.models';

export const FALLBACK_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Aunt Phone Nyi',
    title: 'Web Developer',
    tagline: 'Angular · .NET · MySQL',
    about:
      'MIIT graduate in Electronics & Communications Engineering with over two years ' +
      'of experience in web development, including a three-month internship. Passionate ' +
      'about web development and data analytics, currently working as a developer and ' +
      'continuously expanding skills in full-stack development and data-driven applications ' +
      'while exploring new technologies and challenges.',
    email: 'auntphonenyi23@gmail.com',
    phone: '+959964665258',
    location: 'Mahar Aung Myay Township, Mandalay, Myanmar',
    linkedIn: 'https://www.linkedin.com/in/aunt-phone-nyi-9685b5296',
    openToWork: true
  },
  skills: [
    { partNumber: 'U1', category: 'Markup & Styling', items: ['HTML', 'CSS'] },
    { partNumber: 'U2', category: 'Languages & Frameworks', items: ['C#', '.NET', 'TypeScript', 'JavaScript', 'Angular'] },
    { partNumber: 'U3', category: 'Data', items: ['MySQL', 'R'] }
  ],
  experience: [
    {
      company: 'Kumo Solutions Mandalay',
      role: 'Junior Web Developer',
      employmentType: 'Full-time · On-site',
      period: 'Mar 2024 - Present',
      duration: '2 yrs 5 mos',
      location: 'Mandalay, Myanmar',
      highlights: [
        'Developed and maintained a CRM system (BrennanIT Procurement Automation) to automate IT product sales and subscription management, improving operational efficiency.',
        'Implemented tracking and reporting features to support data-driven decision-making and improve sales visibility.',
        'Performed system maintenance, debugging, and troubleshooting to ensure system stability and reliability.',
        'Refactored existing code to improve application performance, maintainability, and overall system efficiency.'
      ],
      isCurrent: true
    },
    {
      company: 'Kumo Solutions Mandalay',
      role: 'Junior Web Developer',
      employmentType: 'Internship · On-site',
      period: 'Dec 2023 - Feb 2024',
      duration: '3 mos',
      location: 'Mandalay District, Mandalay Region, Myanmar',
      highlights: [
        'Onboarded onto the web development team, learning the C#/.NET and Angular stack in production.',
        'Contributed to early groundwork on the BrennanIT procurement platform ahead of converting to a full-time role.'
      ],
      isCurrent: false
    }
  ],
  education: [
    {
      credential: 'B.E. (Hons.) in Electronics & Communications Engineering',
      institution: 'Myanmar Institute of Information Technology',
      period: ''
    },
    {
      credential: 'Diploma in English',
      institution: 'Mandalay University of Foreign Languages',
      period: ''
    }
  ],
  projects: [
    {
      name: 'Real-Time Vehicle Tracking System',
      subtitle: 'University capstone project',
      description:
        'A live GPS tracking system built on GSM/GPRS hardware, reporting vehicle location in ' +
        'real time — the same systems-thinking now applied to full-stack web apps.',
      stack: ['A9G GSM/GPRS+GPS Module', 'NEO-6M GPS Module', 'Arduino Uno']
    }
  ],
  strengths: [
    { label: 'Positive attitude and optimism' },
    { label: 'Multi-tasking' },
    { label: 'Teamwork and collaborative skills' },
    { label: 'Ability to learn quickly' },
    { label: 'Empathy' },
    { label: 'Problem solving' }
  ],
  languages: [{ name: 'English', level: 'Intermediate' }]
};
