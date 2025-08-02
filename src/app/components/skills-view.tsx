import { Card, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resumeData } from '@/lib/ResumeData';
import Image from 'next/image';

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
                                        <Image 
                                            src={`/tech-logos/${skill.logo}`}
                                            alt={skill.name}
                                            width={24}
                                            height={24}
                                            className='object-contain'
                                        />
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
