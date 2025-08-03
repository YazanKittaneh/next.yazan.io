import { Card, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resumeData } from '@/lib/ResumeData';
import {
    SiJavascript, SiTypescript, SiPython, SiRuby, SiGo, SiKotlin, SiReact,
    SiNextdotjs, SiAstro, SiReactrouter, SiSvelte, SiVuedotjs, SiNuxtdotjs,
    SiAngular, SiNodedotjs, SiFlask, SiFastapi, SiDjango, SiNestjs, SiPostgresql,
    SiMongodb, SiRedis, SiGraphql, SiJest, SiStorybook, SiCypress, SiDocker,
    SiKubernetes, SiRabbitmq, SiGooglecloud, SiAmazondynamodb,
    SiLinux, SiNginx, SiAnsible
} from "react-icons/si";
import { PiMicrosoftExcelLogo } from "react-icons/pi";

import { BarChart3, Code, Database, FileCode2, Layers, Palette, Server } from 'lucide-react';

// Map the technology categories from resumeData to the format needed for the UI
const getIconForCategory = (category: string) => {
    switch (category) {
        case 'Frontend':
            return <Palette className='h-5 w-5' />;
        case 'Backend':
            return <Server className='h-5 w-5' />;
        case 'Infrastructure':
            return <Layers className='h-5 w-5' />;
        case 'Testing':
            return <FileCode2 className='h-5 w-5' />;
        case 'Languages':
            return <Code className='h-5 w-5' />;
        case 'LLM Models':
            return <BarChart3 className='h-5 w-5' />;
        default:
            return <Database className='h-5 w-5' />;
    }
};

// Add icon mapping function
const getIconForSkill = (name: string) => {
    // Map skill names to devicon components
    const iconMap: Record<string, JSX.Element> = {
        // Languages
        "JavaScript": <SiJavascript className="text-xl text-yellow-400" />,
        "TypeScript": <SiTypescript className="text-xl text-blue-600" />,
        "Python": <SiPython className="text-xl text-green-500" />,
        "Ruby": <SiRuby className="text-xl text-red-600" />,
        "GOlang": <SiGo className="text-xl text-blue-400" />,
        "Kotlin": <SiKotlin className="text-xl text-purple-600" />,
        "Spanish": <div className="text-xs font-bold text-foreground">ES</div>,
        "Bash": <div className="text-xs font-bold text-foreground">$</div>,

        // Frontend
        "React": <SiReact className="text-xl text-cyan-500" />,
        "Next.js": <SiNextdotjs className="text-xl" />,
        "Astro": <SiAstro className="text-xl" />,
        "React Router": <SiReactrouter className="text-xl text-pink-500" />,
        "Svelte.js": <SiSvelte className="text-xl text-orange-500" />,
        "Vue.js": <SiVuedotjs className="text-xl text-green-500" />,
        "Nuxt": <SiNuxtdotjs className="text-xl text-green-600" />,
        "Angular": <SiAngular className="text-xl text-red-600" />,

        // Backend
        "Node.js": <SiNodedotjs className="text-xl text-green-600" />,
        "Flask": <SiFlask className="text-xl text-black" />,
        "FastAPI": <SiFastapi className="text-xl text-blue-600" />,
        "Django": <SiDjango className="text-xl text-green-700" />,
        "Nest.js": <SiNestjs className="text-xl text-red-500" />,
        "PostgreSQL": <SiPostgresql className="text-xl text-blue-700" />,
        "MongoDB": <SiMongodb className="text-xl text-green-500" />,
        "Redis": <SiRedis className="text-xl text-red-600" />,
        "GraphQL": <SiGraphql className="text-xl text-pink-600" />,

        // Testing
        "Jest": <SiJest className="text-xl text-red-600" />,
        "Jasmine": <div className="text-xs font-bold text-foreground">JS</div>,
        "Cypress": <SiCypress className="text-xl" />,
        "Storybook": <SiStorybook className="text-xl text-pink-500" />,
        "Selenium": <div className="text-xs font-bold italic text-foreground">Se</div>,
        "Playwright": <div className="text-xs font-bold italic text-foreground">PW</div>,

        // Infrastructure
        "Docker": <SiDocker className="text-xl text-blue-500" />,
        "Kubernetes": <SiKubernetes className="text-xl text-blue-600" />,
        "RabbitMQ": <SiRabbitmq className="text-xl" />,
        "GCP": <SiGooglecloud className="text-xl text-blue-500" />,
        "AWS": <SiAmazondynamodb className="text-xl text-orange-600" />,
        "Linux": <SiLinux className="text-xl" />,
        "Cron": <div className="text-xs font-bold italic text-foreground">CRON</div>,
        "Proxmox": <div className="text-xs font-bold text-foreground">PX</div>,

        // LLM Models
        "OpenAI": <div className="text-xs font-bold text-foreground">AI</div>,
        "Claude": <div className="text-xs font-bold text-foreground">C</div>,
        "Llama": <div className="text-xs font-bold text-foreground">🦙</div>,
        "Mixtral": <div className="text-xs font-bold text-foreground">MX</div>,
        "DeepSeek R1": <div className="text-xs text-center font-bold text-foreground">DS R1</div>,
        "Prompt Engineering": <div className="text-xs text-center font-bold text-foreground">PE</div>,
        "Fine-tuning": <PiMicrosoftExcelLogo className="text-xl text-green-600" />,
        "Nginx": <SiNginx className="text-xl text-green-600" />,
        "Ansible": <SiAnsible className="text-xl" />
    };

    return iconMap[name] || <div className="text-xs font-bold text-foreground">?</div>;
};

export default function SkillsView() {
    return (
        <div className='space-y-8'>
            <div>
                <h2 className='text-foreground/90 text-2xl font-normal tracking-tight'>Tech Toolkit</h2>
                <p className='text-muted-foreground'>Technologies I work with daily</p>
            </div>

            <Tabs defaultValue={resumeData.technologies[0].category.toLowerCase()} className='space-y-6'>
                <TabsList className='bg-secondary/30 p-0.5'>
                    {resumeData.technologies.map((category) => (
                        <TabsTrigger
                            key={category.category}
                            value={category.category.toLowerCase()}
                            className='data-[state=active]:bg-background font-normal transition-all duration-200'>
                            <div className='flex items-center gap-2'>
                                {getIconForCategory(category.category)}
                                <span>{category.category}</span>
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>

                {resumeData.technologies.map((category) => (
                    <TabsContent
                        key={category.category}
                        value={category.category.toLowerCase()}
                        className='animate-in fade-in-50 duration-300'>
                        <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3'>
                            {category.skills.map((skill) => (
                                <Card
                                    key={skill.name}
                                    className='border border-border/20 hover:border-primary/50 transition-colors flex flex-col items-center p-3'>
                                    <div className='bg-secondary/20 h-12 w-12 rounded-lg flex items-center justify-center mb-2'>
                                        {getIconForSkill(skill.name)}
                                    </div>
                                    <CardHeader className='p-0 text-center'>
                                        <span className='text-xs tracking-tight'>{skill.name}</span>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

        </div>
    );
}
