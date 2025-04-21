'use client';

import { useEffect, useState } from 'react';

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
import { createClient } from '@/utils/supabase/clients';
import { Project } from '@/lib/supabase/resume.types';

import { Calendar, Clock, ExternalLink, FileCode2, Github, MoreHorizontal, Star, Terminal } from 'lucide-react';
import Image, { ImageLoader } from 'next/image';
import supabaseLoader from '@/utils/supabase/supabase-image-loader';
import { ProjectModal } from '@/components/project-modal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';



async function getProjects(): Promise<Project[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from('yk_projects').select('*');

    if (error) {
        console.error('Error fetching projects:', error);

        return [];
    }

    return data.map(project => ({
        ...project,
        status: project.category?.includes('IN DEVELOPMENT') ? 'In Progress' : 'Completed',
        github: 'https://github.com',
        featured: true
    }));
}

export default function ProjectsView() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
            const projects = await getProjects();
            setProjects(projects);
            setLoading(false);
        }
        loadProjects();
    }, []);

    const filteredProjects = projects
        .filter(project => {
            if (filter === 'featured') return project.featured;
            if (filter !== 'all') return (project.status?.toLowerCase() ?? '') === filter;

            return true;
        })
        .filter(project => {
            if (!searchTerm) return true;
            const term = searchTerm.toLowerCase();

            return (
                project.title.toLowerCase().includes(term) ||
                project.description.toLowerCase().includes(term) ||
                (project.technologies ?? []).some(tech => tech.toLowerCase().includes(term))
            )
        });

    if (loading) {
        return (
            <div className='flex h-64 items-center justify-center'>
                <div className='animate-pulse text-muted-foreground'>Loading projects...</div>
            </div>
        );
    }

    return (
        <div className='space-y-8'>
            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    I'm currently fixing my site's backend, so info here might change in real time.
                </AlertDescription>
            </Alert>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <h2 className='text-foreground/90 text-2xl font-normal tracking-tight'>Projects</h2>
                    <p className='text-muted-foreground'>Browse through my portfolio of projects</p>
                </div>
                <div className='flex items-center gap-2'>
                    <Input
                        placeholder='Search projects...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                {filteredProjects?.map((project) => (
                    <Card
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className='border-border/20 hover-card group overflow-hidden border shadow-none cursor-pointer'>
                        <div className='relative overflow-hidden'>
                            <Image
                                src={project.images[0]}
                                alt={`Screenshot of ${project.title} project`}
                                width={400}
                                height={225}
                                className="w-full h-auto aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                                loader={supabaseLoader as ImageLoader}
                            />
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
                                    variant={(project.status ?? 'In Progress') === 'Completed' ? 'default' : 'secondary'}
                                    className='text-xs font-normal'>
                                    {project.status ?? 'In Progress'}
                                </Badge>
                            </div>
                            <CardDescription className='mt-1 line-clamp-2'>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className='p-4 pt-0'>
                            <div className='flex flex-wrap gap-1'>
                                {(project.technologies ?? []).length > 0 ? (
                                    project.technologies?.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant='outline'
                                            className='bg-secondary/30 border-border/20 text-xs font-normal'>
                                            {tech}
                                        </Badge>
                                    ))
                                ) : (
                                    <Badge variant='outline' className='bg-secondary/30 border-border/20 text-xs font-normal'>
                                        No technologies listed
                                    </Badge>
                                )}
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
                {/* <Card className='border-border/20 hover-card border shadow-none'>
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
                                <span className='font-normal'>{projects?.length ?? 0}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Star className='text-muted-foreground h-4 w-4' />
                                    <span className='text-sm'>Featured Projects</span>
                                </div>
                                <span className='font-normal'>{projects?.filter((p) => p?.featured).length ?? 0}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Clock className='text-muted-foreground h-4 w-4' />
                                    <span className='text-sm'>In Progress</span>
                                </div>
                                <span className='font-normal'>
                                    {projects?.filter((p) => (p?.status ?? 'In Progress') === 'In Progress').length ?? 0}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card> */}

                {/* <Card className='border-border/20 hover-card col-span-2 border shadow-none'>
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
                                            {projects.filter((p) => p.technologies?.includes(tech) ?? false).length} projects
                                        </span>
                                    </div>
                                    <Progress
                                        value={
                                            (projects.filter((p) => p.technologies?.includes(tech) ?? false).length /
                                                Math.max(1, projects.length)) *
                                            100
                                        }
                                        className='bg-secondary/30 progress-animate h-1'
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card> */}
            </div>

            <ProjectModal
                project={selectedProject}
                open={!!selectedProject}
                onOpenChange={(open) => !open && setSelectedProject(null)}
            />
        </div>
    );
}
