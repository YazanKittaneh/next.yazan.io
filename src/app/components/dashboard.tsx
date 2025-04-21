'use client';

import { useState } from 'react';

import AboutView from '@/app/components/about-view';
import ContactView from '@/app/components/contact-view';
import ProjectsView from '@/app/components/projects-view';
import SkillsView from '@/app/components/skills-view';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image'

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

import { Activity, Code2, Folder, Github, Mail, User2 } from 'lucide-react';

export default function Dashboard() {
    const [activeView, setActiveView] = useState('projects');
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
                                            onClick={() => setActiveView('projects')}
                                            tooltip='Projects'
                                            className='text-sm font-normal'>
                                            <Folder className='h-4 w-4' />
                                            <span>Projects</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            isActive={activeView === 'skills'}
                                            onClick={() => setActiveView('skills')}
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
                                            onClick={() => setActiveView('contact')}
                                            tooltip='Contact'
                                            className='text-sm font-normal'>
                                            <Mail className='h-4 w-4' />
                                            <span>Contact</span>
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
                        </h1>
                    </header>
                    <main className='flex-1 overflow-auto p-6'>
                        <div className='animate-in fade-in duration-500'>
                            {activeView === 'projects' && <ProjectsView />}
                            {activeView === 'skills' && <SkillsView />}
                            {activeView === 'about' && <AboutView />}
                            {activeView === 'contact' && <ContactView />}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
