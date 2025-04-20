'use client';

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";
import Image, { ImageLoader } from "next/image";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string[];
  status: string;
  date: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  category?: string[];
  url?: string;
  year?: string;
  challenge?: string;
  approach?: string;
  result?: string;
}

export function ProjectModal({
  project,
  open,
  onOpenChange
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full p-0 overflow-hidden">
        < Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 bg-background/80 hover:bg-background"
          onClick={() => onOpenChange(false)
          }
        >
          <X className="h-5 w-5" />
        </Button >

        <div className="grid gap-6 md:grid-cols-1">
          <div className="relative">
            <Carousel>
              {project.image.map((img, i) => (
                <div key={i} className="relative aspect-video">
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    loader={supabaseLoader as ImageLoader}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                {project.status}
              </Badge>
            </div>

            <p className="text-muted-foreground">{project.description}</p>

            {project.challenge && (
              <div className="space-y-1">
                <h4 className="font-medium">Challenge</h4>
                <p className="text-sm text-muted-foreground">{project.challenge}</p>
              </div>
            )}

            {project.approach && (
              <div className="space-y-1">
                <h4 className="font-medium">Approach</h4>
                <p className="text-sm text-muted-foreground">{project.approach}</p>
              </div>
            )}

            {project.result && (
              <div className="space-y-1">
                <h4 className="font-medium">Result</h4>
                <p className="text-sm text-muted-foreground">{project.result}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {(project.technologies || project.category || []).map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-4">
              {project.github && (
                <Button asChild variant="outline">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button asChild>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>

            <div className="text-sm text-muted-foreground pt-4">
              <p>Created: {project.date}</p>
            </div>
          </div>
        </div>
      </DialogContent >
    </Dialog >
  );
}
