'use client';

import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

import AboutView from '@/app/components/about-view';
import ContactView from '@/app/components/contact-view';
import ProjectsView from '@/app/components/projects-view';
import SkillsView from '@/app/components/skills-view';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { componentRegistry } from '@/lib/component-registry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar';
import { resumeData } from '@/lib/ResumeData';

import { Activity, Code2, Folder, Github, Mail, User2, Sparkles, Copy, Check } from 'lucide-react';

// ComponentShowcase component
function ComponentShowcase() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = React.useMemo(() => {
        const cats = new Set<string>();
        componentRegistry.forEach(comp => {
            if (comp.category) cats.add(comp.category);
        });

        return ['all', ...Array.from(cats)];
    }, []);

    const filteredComponents = React.useMemo(() => {
        if (selectedCategory === 'all') return componentRegistry;

        return componentRegistry.filter(comp => comp.category === selectedCategory);
    }, [selectedCategory]);

    const copyToClipboard = async (code: string, index: number) => {
        await navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Interactive Component Showcase</h1>
                <p className="text-muted-foreground mb-6">
                    Interactive React components with live preview and code examples. Test and explore different UI patterns.
                </p>

                <div className="flex items-center gap-4">
                    <label htmlFor="category" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Filter by category:</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger id="category" className="w-[180px]">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(cat => (
                                <SelectItem key={cat} value={cat} className="capitalize">
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-8">
                {filteredComponents.map((component, index) => {
                    const Component = component.component;

                    return (
                        <Card key={index} className="overflow-hidden">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{component.name}</CardTitle>
                                        {component.description && (
                                            <CardDescription className="mt-1">
                                                {component.description}
                                            </CardDescription>
                                        )}
                                    </div>
                                    {component.category && (
                                        <Badge variant="secondary">{component.category}</Badge>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="preview" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="preview">Preview</TabsTrigger>
                                        <TabsTrigger value="code">Code</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="preview" className="mt-6">
                                        <div className="flex items-center justify-center min-h-[200px] p-8 border rounded-lg bg-background">
                                            <Component {...(component.props || {})} />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="code" className="mt-6">
                                        <div className="relative">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="absolute right-2 top-2 z-10"
                                                onClick={() => copyToClipboard(component.code, index)}
                                            >
                                                {copiedIndex === index ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <SyntaxHighlighter
                                                language="tsx"
                                                style={oneDark}
                                                customStyle={{
                                                    margin: 0,
                                                    borderRadius: '0.5rem',
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                {component.code}
                                            </SyntaxHighlighter>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {filteredComponents.length === 0 && (
                <Card className="text-center py-12">
                    <CardContent>
                        <p className="text-muted-foreground">No components found in this category.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default function Dashboard() {
    const [activeView, setActiveView] = useState('projects');
    const isMobile = useIsMobile();
    const { name } = resumeData;
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('');

    return (
        <SidebarProvider>
            <div className='flex h-screen w-full'>
                <Sidebar className='border-border/20 border-r'>
                    <SidebarHeader>
                        <div className='flex items-center gap-3 px-4 py-3'>
                            <Avatar className='h-9 w-9 border-0'>
                                <AvatarImage src='/placeholder.svg?height=40&width=40' alt='Profile' />
                                <AvatarFallback className='bg-primary/10 text-primary'>{initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className='text-sm font-normal'>{name}</h3>
                                <p className='text-muted-foreground text-xs'>{resumeData.experiences[0].title}</p>
                            </div>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className='text-muted-foreground text-xs font-normal'>
                                Portfolio
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={activeView === 'projects'}
                                            onClick={() => {
                                                setActiveView('projects');
                                                if (isMobile) document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                                            }}
                                            tooltip='Projects'
                                            className='text-sm font-normal'>
                                            <Folder className='h-4 w-4' />
                                            <span>Projects</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={activeView === 'skills'}
                                            onClick={() => {
                                                setActiveView('skills');
                                                if (isMobile) document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                                            }}
                                            tooltip='Skills'
                                            className='text-sm font-normal'>
                                            <Code2 className='h-4 w-4' />
                                            <span>Skills</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    {/* <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={activeView === 'about'}
                                            onClick={() => setActiveView('about')}
                                            tooltip='About'
                                            className='text-sm font-normal'>
                                            <User2 className='h-4 w-4' />
                                            <span>About</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem> */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={activeView === 'contact'}
                                            onClick={() => {
                                                setActiveView('contact');
                                                if (isMobile) document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                                            }}
                                            tooltip='Contact'
                                            className='text-sm font-normal'>
                                            <Mail className='h-4 w-4' />
                                            <span>Contact</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={activeView === 'showcase'}
                                            onClick={() => {
                                                setActiveView('showcase');
                                                if (isMobile) document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                                            }}
                                            tooltip='Showcase'
                                            className='text-sm font-normal'>
                                            <Sparkles className='h-4 w-4' />
                                            <span>Showcase</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel className='text-muted-foreground text-xs font-normal'>
                                Links
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild tooltip='GitHub' className='text-sm font-normal'>
                                            <a
                                                href={`https://${resumeData.contact.github}`}
                                                target='_blank'
                                                rel='noopener noreferrer'>
                                                <Github className='h-4 w-4' />
                                                <span>GitHub</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild tooltip='Blog' className='text-sm font-normal'>
                                            <a
                                                href={resumeData.contact.blog}
                                                target='_blank'
                                                rel='noopener noreferrer'>
                                                <Activity className='h-4 w-4' />
                                                <span>Blog</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <div className='p-4'>
                            <Button
                                variant='outline'
                                className='border-border/30 hover:bg-secondary w-full text-sm font-normal transition-colors duration-200'
                                onClick={() => setActiveView('contact')}>
                                <Mail className='mr-2 h-4 w-4' />
                                Contact Me
                            </Button>
                        </div>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <header className='border-border/20 bg-background/80 sticky top-0 z-10 flex h-14 items-center gap-4 border-b px-6 backdrop-blur-sm'>
                        <SidebarTrigger />
                        <h1 className='text-foreground/90 text-lg font-normal'>
                            {activeView === 'projects' && 'Projects Dashboard'}
                            {activeView === 'skills' && 'Skills & Technologies'}
                            {activeView === 'about' && 'About Me'}
                            {activeView === 'contact' && 'Contact Information'}
                            {activeView === 'showcase' && 'Component Showcase'}
                        </h1>
                    </header>
                    <main className='flex-1 overflow-auto p-6'>
                        <div className='animate-in fade-in duration-500'>
                            {activeView === 'projects' && <ProjectsView />}
                            {activeView === 'skills' && <SkillsView />}
                            {activeView === 'about' && <AboutView />}
                            {activeView === 'contact' && <ContactView />}
                            {activeView === 'showcase' && <ComponentShowcase />}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
