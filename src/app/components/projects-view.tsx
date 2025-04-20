'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { resumeData } from '@/lib/ResumeData';

import { Calendar, Clock, ExternalLink, FileCode2, Github, MoreHorizontal, Star } from 'lucide-react';
import Image from 'next/image'



// Map the projects to match the expected format
const projects = resumeData.projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.images,
    status: project.category.includes('IN DEVELOPMENT') ? 'In Progress' : 'Completed',
    date: project.year,
    technologies: project.category,
    github: 'https://github.com',
    demo: project.url,
    featured: true
}));

export default function ProjectsView() {
    const [filter, setFilter] = useState('all');

    const filteredProjects =
        filter === 'all'
            ? projects
            : filter === 'featured'
                ? projects.filter((p) => p.featured)
                : projects.filter((p) => p.status.toLowerCase() === filter);

    return (
        <div className='space-y-8'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <h2 className='text-foreground/90 text-2xl font-normal tracking-tight'>Projects</h2>
                    <p className='text-muted-foreground'>Browse through my portfolio of {projects.length} projects</p>
                </div>
                <div className='flex items-center gap-2'>
                    <Input
                        placeholder='Search projects...'
                        className='border-border/30 bg-background/50 focus:border-primary/30 max-w-[200px] transition-colors duration-200'
                    />
                    <Select defaultValue='all' onValueChange={setFilter}>
                        <SelectTrigger className='border-border/30 bg-background/50 w-[180px] font-normal transition-colors duration-200'>
                            <SelectValue placeholder='Filter' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='all'>All Projects</SelectItem>
                            <SelectItem value='featured'>Featured</SelectItem>
                            <SelectItem value='completed'>Completed</SelectItem>
                            <SelectItem value='in progress'>In Progress</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {filteredProjects.map((project) => (
                    <Card
                        key={project.id}
                        className='border-border/20 hover-card group overflow-hidden border shadow-none'>
                        <div className='relative overflow-hidden'>
                            <Image src={project.image[0]} alt="Picture of the author" width={150} height={150} />
                            <div className='absolute top-2 right-2'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant='ghost'
                                            size='icon'
                                            className='bg-background/80 hover:bg-background rounded-full backdrop-blur-sm'>
                                            <MoreHorizontal className='h-4 w-4' />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end'>
                                        {project.github && (
                                            <DropdownMenuItem asChild>
                                                <a
                                                    href={project.github}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='flex cursor-pointer items-center'>
                                                    <Github className='mr-2 h-4 w-4' />
                                                    View Code
                                                </a>
                                            </DropdownMenuItem>
                                        )}
                                        {project.demo && (
                                            <DropdownMenuItem asChild>
                                                <a
                                                    href={project.demo}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='flex cursor-pointer items-center'>
                                                    <ExternalLink className='mr-2 h-4 w-4' />
                                                    Live Demo
                                                </a>
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <CardHeader className='p-4 pb-2'>
                            <div className='flex items-start justify-between'>
                                <CardTitle className='text-lg font-normal'>{project.title}</CardTitle>
                                <Badge
                                    variant={project.status === 'Completed' ? 'default' : 'secondary'}
                                    className='text-xs font-normal'>
                                    {project.status}
                                </Badge>
                            </div>
                            <CardDescription className='mt-1 line-clamp-2'>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className='p-4 pt-0'>
                            <div className='flex flex-wrap gap-1'>
                                {project.technologies.map((tech) => (
                                    <Badge
                                        key={tech}
                                        variant='outline'
                                        className='bg-secondary/30 border-border/20 text-xs font-normal'>
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className='border-border/20 text-muted-foreground flex items-center justify-between border-t p-4 text-sm'>
                            <div className='flex items-center'>
                                <Calendar className='mr-1 h-3 w-3' />
                                {project.date}
                            </div>
                            <div className='flex items-center gap-2'>
                                {project.featured && (
                                    <div className='flex items-center text-yellow-500/70'>
                                        <Star className='mr-1 h-3 w-3 fill-yellow-500/70' />
                                        Featured
                                    </div>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className='grid gap-6 md:grid-cols-3'>
                <Card className='border-border/20 hover-card border shadow-none'>
                    <CardHeader className='pb-2'>
                        <CardTitle className='text-sm font-normal'>Project Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid gap-4'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <FileCode2 className='text-muted-foreground h-4 w-4' />
                                    <span className='text-sm'>Total Projects</span>
                                </div>
                                <span className='font-normal'>{projects.length}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Star className='text-muted-foreground h-4 w-4' />
                                    <span className='text-sm'>Featured Projects</span>
                                </div>
                                <span className='font-normal'>{projects.filter((p) => p.featured).length}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Clock className='text-muted-foreground h-4 w-4' />
                                    <span className='text-sm'>In Progress</span>
                                </div>
                                <span className='font-normal'>
                                    {projects.filter((p) => p.status === 'In Progress').length}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className='border-border/20 hover-card col-span-2 border shadow-none'>
                    <CardHeader className='pb-2'>
                        <CardTitle className='text-sm font-normal'>Technologies Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid gap-4'>
                            {['React', 'Node.js', 'Next.js'].map((tech) => (
                                <div key={tech} className='space-y-1'>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span>{tech}</span>
                                        <span className='text-muted-foreground'>
                                            {projects.filter((p) => p.technologies.includes(tech)).length} projects
                                        </span>
                                    </div>
                                    <Progress
                                        value={
                                            (projects.filter((p) => p.technologies.includes(tech)).length /
                                                projects.length) *
                                            100
                                        }
                                        className='bg-secondary/30 progress-animate h-1'
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
