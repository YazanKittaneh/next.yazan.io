import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resumeData } from '@/lib/ResumeData';

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

const skillCategories = resumeData.technologies.map((category) => ({
    name: category.category,
    icon: getIconForCategory(category.category),
    skills: category.skills.map((skill, index) => ({
        name: skill,
        // Generate a random level between 70 and 95 based on the index
        level: 95 - ((index * 5) % 25)
    }))
}));

export default function SkillsView() {
    return (
        <div className='space-y-8'>
            <div>
                <h2 className='text-foreground/90 text-2xl font-normal tracking-tight'>Skills & Technologies</h2>
                <p className='text-muted-foreground'>An overview of my technical skills and proficiency levels</p>
            </div>

            <Tabs defaultValue='frontend' className='space-y-6'>
                <TabsList className='bg-secondary/30 p-0.5'>
                    {skillCategories.map((category) => (
                        <TabsTrigger
                            key={category.name}
                            value={category.name.toLowerCase()}
                            className='data-[state=active]:bg-background font-normal transition-all duration-200 data-[state=active]:shadow-none'>
                            <div className='flex items-center gap-2'>
                                {category.icon}
                                <span>{category.name}</span>
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>

                {skillCategories.map((category) => (
                    <TabsContent
                        key={category.name}
                        value={category.name.toLowerCase()}
                        className='animate-in fade-in-50 space-y-6 duration-300'>
                        <div className='grid gap-4 md:grid-cols-2'>
                            {category.skills.map((skill) => (
                                <Card key={skill.name} className='border-border/20 hover-card border shadow-none'>
                                    <CardHeader className='pb-2'>
                                        <CardTitle className='text-sm font-normal'>{skill.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className='pb-4'>
                                        <div className='flex items-center justify-between text-sm'>
                                            <span className='text-muted-foreground'>Proficiency</span>
                                            <span className='font-normal'>{skill.level}%</span>
                                        </div>
                                        <Progress
                                            value={skill.level}
                                            className='bg-secondary/30 progress-animate mt-2 h-1'
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            <div className='grid gap-6 md:grid-cols-3'>
                <Card className='border-border/20 hover-card border shadow-none'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2 font-normal'>
                            <Code className='h-5 w-5' />
                            Languages
                        </CardTitle>
                        <CardDescription>Programming languages I work with</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className='space-y-2'>
                            <li className='flex items-center justify-between'>
                                <span>JavaScript/TypeScript</span>
                                <span className='text-muted-foreground text-sm'>Expert</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>Python</span>
                                <span className='text-muted-foreground text-sm'>Advanced</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>PHP</span>
                                <span className='text-muted-foreground text-sm'>Intermediate</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>Java</span>
                                <span className='text-muted-foreground text-sm'>Intermediate</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>Go</span>
                                <span className='text-muted-foreground text-sm'>Beginner</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className='border-border/20 hover-card border shadow-none'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2 font-normal'>
                            <FileCode2 className='h-5 w-5' />
                            Frameworks
                        </CardTitle>
                        <CardDescription>Frameworks and libraries I use</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className='space-y-2'>
                            <li className='flex items-center justify-between'>
                                <span>React/Next.js</span>
                                <span className='text-muted-foreground text-sm'>Expert</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>Express.js</span>
                                <span className='text-muted-foreground text-sm'>Advanced</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>Django</span>
                                <span className='text-muted-foreground text-sm'>Intermediate</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>Vue.js</span>
                                <span className='text-muted-foreground text-sm'>Intermediate</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>Laravel</span>
                                <span className='text-muted-foreground text-sm'>Beginner</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className='border-border/20 hover-card border shadow-none'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2 font-normal'>
                            <BarChart3 className='h-5 w-5' />
                            Tools
                        </CardTitle>
                        <CardDescription>Development tools I'm proficient with</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className='space-y-2'>
                            <li className='flex items-center justify-between'>
                                <span>Git/GitHub</span>
                                <span className='text-muted-foreground text-sm'>Expert</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>VS Code</span>
                                <span className='text-muted-foreground text-sm'>Expert</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>Docker</span>
                                <span className='text-muted-foreground text-sm'>Advanced</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>Figma</span>
                                <span className='text-muted-foreground text-sm'>Intermediate</span>
                            </li>
                            <li className='flex items-center justify-between'>
                                <span>Postman</span>
                                <span className='text-muted-foreground text-sm'>Advanced</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
