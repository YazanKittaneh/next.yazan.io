export interface Experience {
  id: number;
  company: string;
  company_url: string | null;
  title: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Project {
  id: number;
  title: string;
  url: string | null;
  year: string;
  description: string;
  challenge: string;
  category: string[];
  approach: string;
  result: string;
  images: string[];
  status?: string;
  github?: string;
  featured?: boolean;
  demo?: string;
  date?: string;
  technologies?: string[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  location: string;
  graduation_date: string;
}

export interface TechnologyCategory {
  id: number;
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
    blog?: string;
  };
  experiences: Experience[];
  technologies: TechnologyCategory[];
  projects: Project[];
  education: Education[];
}
