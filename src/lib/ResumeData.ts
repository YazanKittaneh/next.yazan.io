export interface Experience {
    company: string;
    companyUrl?: string;
    title: string;
    location: string;
    period: string;
    achievements: string[];
}

export interface Project {
    id: number;
    title: string;
    url?: string;
    year: string;
    description: string;
    challenge: string;
    category: string[];
    approach: string;
    result: string;
    images: string[]
}

export interface Education {
    institution: string;
    degree: string;
    location: string;
    graduationDate: string;
}

export interface TechnologyCategory {
    category: string;
    skills: string[];
}

export interface ResumeData {
    name: string;
    contact: {
        website?: string;
        phone?: string;
        github?: string;
        email?: string;
    };
    experiences: Experience[];
    technologies: TechnologyCategory[];
    projects: Project[];
    education: Education[];
}

export const resumeData: ResumeData = {
    name: "Yazan Kittaneh",
    contact: {
        website: "https://yazan.io",
        phone: "(312) 785-4427",
        github: "github.com/yazankittaneh",
        email: "hi@yazan.io",
    },
    experiences: [
        {
            company: "VerySweet",
            companyUrl: "verysweet.co",
            title: "Senior Full Stack Developer",
            location: "New York City NY (remote)",
            period: "November 2024 - Present",
            achievements: [
                "**Sensitive Data Ingestion:** Implemented a resumable file uploading feature so users can reliably submit, organize, and modify PDFs and CSVs documents securely using Next.js.Sanitation of data and rendering of spreadsheets were done in client run Javascript and allow users to label their data on their own machines, as well as fail gracefully on network disconnection issues.",
                "**AI Augmentation:** Fine-tuned DeepSeek R1 model to efficiently ingest any CSV or PDF and automatically label the data int corresponding data structure, categorizing each transaction and flaggi any suspicious data in real time using custom prompting, framework, an data models.Distilled model to 8B model to run on a local Apple M4 device hosted in Chicago, for a projected savings of $10,000 in monthl LLM API costs."
            ]
        },
        {
            company: "Route",
            companyUrl: "getroute.com",
            title: "Senior Full Stack Developer",
            location: "Chicago, IL",
            period: "December 2023 - November 2024",
            achievements: [
                "**Legacy Application Revamp:** Lead a 3-person team in overhauling a React 16 application into Next, transitioning from legacy Redux to a Redux Toolkit implementation, and from class to functional components leading to a 50% reduction in error logs, and 75% fewer API calls throughout the entire webapp.",
                "**Backend Optimization:** Migrated backend to use Edge Network services and introduced a load balancing system which led to a reduction of 100ms in call time for APIs.",
                "**App Consolidation Leadership:** Architected Nest.js microservices to merge data from proprietary databases to a unified MongoDB instance. I managed 3 remote engineering teams across the US, Mexico, and Colombia to implement crucial data structures needed for integration alongside their existing team obligations, projecting a 50% savings in company SASS costs.",
                "**Business Longevity System Architecting:** Architected and implemented an abstract analytics layer over all applications to enable platform agnostic tracking, allowing business teams to view data seamlessly between platforms (Mixpanel, Amplitude, etc)."
            ]
        },
        {
            company: "TechMade",
            companyUrl: "techmade.co",
            title: "Senior Full Stack Developer",
            location: "Chicago, IL",
            period: "January 2021 - December 2023",
            achievements: [
                "**NFT Trading Tool Launch:** Led a 4-person development team create and launch a highly successful NFT trading platform, attracting 60,000 users within two months post-launch.",
                "**Application Architecture Overhaul:** Spearheaded the refactoring of a monolithic React/Node application into modern Next.js within 3 months. Achievements include a 200ms improvement in load time and a tenfold decrease in application crashes.",
                "**Cost-Effective Backend Transition:** Successfully migrated the client's backend infrastructure from AWS EC2 to Vercel edge functions, achieving a 30% reduction in monthly operational expenses."
            ]
        },
        {
            company: "Subetinn",
            companyUrl: "subletinn.com",
            title: "Full Stack Developer",
            location: "Chicago, IL",
            period: "January 2019 - December 2021",
            achievements: [
                "**Real Estate Dashboard Launch:** Led the development of a multi-role company dashboard as the cornerstone of a comprehensive property management and resident engagement platform, securing $100k in seed funding. This platform enabled key features for streamlined room management, significantly enhancing the efficiency of the management team's operational capabilities.",
                "**Marketing Automation:** Engineered automation solutions that resulted in a 24% increase in lead conversion rates. Developed scripts, crawlers, and pay-per-click (PPC) optimization algorithms for Facebook and Google Ads, utilizing Python, JavaScript, and React to refine the marketing funnel's efficiency."
            ]
        }
    ],
    technologies: [
        {
            category: "Languages",
            skills: ["JavaScript", "TypeScript", "Python", "Ruby", "GOlang",
                "Kotlin", "Spanish", "Bash"]
        },
        {
            category: "Frontend",
            skills: ["React (Next, Astro, React Router)", "Svelte.js",
                "Vue.js/Nuxt", "Angular"]
        },
        {
            category: "Backend",
            skills: ["Node.js", "Flask", "FastAPI", "Django", "Nest.js",
                "SQL/PostgreSQL", "NoSQL (MongoDB, Redis)", "GraphQL"]
        },
        {
            category: "Testing",
            skills: ["Jest", "Jasmine", "Cypress", "Storybooks", "Selenium",
                "Playwrite"]
        },
        {
            category: "Infrastructure",
            skills: ["Docker", "Kubernetes", "RabbitMQ", "GCP", "AWS",
                "Azure", "Linux", "Cron", "Proxmox"]
        },
        {
            category: "LLM Models",
            skills: ["OpenAI", "Claude", "Gemini", "Llama", "Mixtrel",
                "DeepSeek R1", "embedding, fine-tunning, prompt engineering, agentic  development", "On - prem(Proxmox, Nginx, Ansible)"]
      }
    ],
    projects: [
        {
            id: 1,
            title: "Jail App",
            url: "https://jail.app",
            year: "2023",
            category: ["AI INTERFACE", "IN DEVELOPMENT"],
            description: "An AI voice platform to enable US Inmates to communicate with their loved ones.",
            challenge:
              "The client needed a website that would break industry conventions and create a memorable impression on visitors. The existing website was generic and failed to capture the innovative spirit of the company.",
            approach:
              "I stripped away unnecessary decoration and focused on raw content presentation. Using a monochromatic color scheme, bold typography, and unconventional layouts, I created a website that demands attention.",
            result:
              "The redesigned website increased user engagement by 45% and extended average session duration by 2 minutes. The bold design generated significant social media attention, resulting in a 30% increase in organic traffic.",
            images: [
              "/placeholder.svg?height=800&width=1200&text=PROJECT IMAGE 1",
              "/placeholder.svg?height=600&width=1200&text=PROJECT IMAGE 2",
              "/placeholder.svg?height=800&width=1200&text=PROJECT IMAGE 3",
              "/placeholder.svg?height=600&width=1200&text=PROJECT IMAGE 4",
            ],
          },
          {
            id: 2,
            title: "Subletinn",
            url: "https://jail.app",
            year: "2023",
            category: ["AI INTERFACE", "IN DEVELOPMENT"],
            description: "An AI voice platform to enable US Inmates to communicate with their loved ones.",
            challenge:
              "The client needed a website that would break industry conventions and create a memorable impression on visitors. The existing website was generic and failed to capture the innovative spirit of the company.",
            approach:
              "I stripped away unnecessary decoration and focused on raw content presentation. Using a monochromatic color scheme, bold typography, and unconventional layouts, I created a website that demands attention.",
            result:
              "The redesigned website increased user engagement by 45% and extended average session duration by 2 minutes. The bold design generated significant social media attention, resulting in a 30% increase in organic traffic.",
            images: [
              "subletinn1.png",
            ],
          },
          {
            id: 3,
            title: "Gosu.tools",
            url: "https://jail.app",
            year: "2023",
            category: ["AI INTERFACE", "IN DEVELOPMENT"],
            description: "An AI voice platform to enable US Inmates to communicate with their loved ones.",
            challenge:
              "The client needed a website that would break industry conventions and create a memorable impression on visitors. The existing website was generic and failed to capture the innovative spirit of the company.",
            approach:
              "I stripped away unnecessary decoration and focused on raw content presentation. Using a monochromatic color scheme, bold typography, and unconventional layouts, I created a website that demands attention.",
            result:
              "The redesigned website increased user engagement by 45% and extended average session duration by 2 minutes. The bold design generated significant social media attention, resulting in a 30% increase in organic traffic.",
            images: [
              "/gosu1.png",
              "/gosu2.png"
            ],
          }
        
    ],
    education: [
        {
            institution: "Grinnell College",
            degree: "Computer Science B.A",
            location: "Grinnell, IA",
            graduationDate: "May 2017"
        }
    ]
};

