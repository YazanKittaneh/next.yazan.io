import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resumeData } from '@/lib/ResumeData';

import { BarChart3, Code, Database, FileCode2, Layers, Palette, Server } from 'lucide-react';

const PROFICIENCY_COLORS = {
    Expert: 'text-blue-600 dark:text-blue-400',
    Advanced: 'text-green-600 dark:text-green-400',
    Intermediate: 'text-yellow-600 dark:text-yellow-400',
    Beginner: 'text-muted-foreground'
};

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

export default function SkillsView() {
    return (
        <div className='space-y-8'>
            <div>
                <h2 className='text-foreground/90 text-2xl font-normal tracking-tight'>Skills & Technologies</h2>
                <p className='text-muted-foreground'>Professional skills assessment</p>
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
                        className='animate-in fade-in-50 space-y-6 duration-300'>
                        <div className='grid gap-4 md:grid-cols-2'>
                            {category.skills.map((skill) => (
                                <Card key={skill.name} className='border-border/20 hover:bg-accent/10 transition-colors border shadow-none'>
                                    <CardHeader className='pb-2'>
                                        <CardTitle className='text-sm font-normal'>{skill.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className='pb-4'>
                                        <div className='flex items-center justify-between text-sm'>
                                            <span className='text-muted-foreground'>Proficiency</span>
                                            <span className={`font-medium ${PROFICIENCY_COLORS[skill.level]}`}>
                                                {skill.level}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

        </div>
    );
}
