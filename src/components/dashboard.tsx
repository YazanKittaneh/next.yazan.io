"use client"
import { useState } from "react"
import { Activity, Code2, Folder, Github, Mail, User2 } from "lucide-react"

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
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ProjectsView from "@/components/projects-view"
import SkillsView from "@/components/skills-view"
import AboutView from "@/components/about-view"
import ContactView from "@/components/contact-view"
import { resumeData } from "@/lib/ResumeData"

export default function Dashboard() {
  const [activeView, setActiveView] = useState("projects")
  const { name } = resumeData
  const initials = name.split(' ').map(n => n[0]).join('')

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r border-border/20">
          <SidebarHeader>
            <div className="flex items-center gap-3 px-4 py-3">
              <Avatar className="border-0 h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
                <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-normal text-sm">{name}</h3>
                <p className="text-xs text-muted-foreground">{resumeData.experiences[0].title}</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">Portfolio</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeView === "projects"}
                      onClick={() => setActiveView("projects")}
                      tooltip="Projects"
                      className="font-normal text-sm"
                    >
                      <Folder className="h-4 w-4" />
                      <span>Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeView === "skills"}
                      onClick={() => setActiveView("skills")}
                      tooltip="Skills"
                      className="font-normal text-sm"
                    >
                      <Code2 className="h-4 w-4" />
                      <span>Skills</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeView === "about"}
                      onClick={() => setActiveView("about")}
                      tooltip="About"
                      className="font-normal text-sm"
                    >
                      <User2 className="h-4 w-4" />
                      <span>About</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeView === "contact"}
                      onClick={() => setActiveView("contact")}
                      tooltip="Contact"
                      className="font-normal text-sm"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Contact</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-normal text-muted-foreground">Links</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="GitHub" className="font-normal text-sm">
                      <a href={`https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span>GitHub</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="LinkedIn" className="font-normal text-sm">
                      <a href={resumeData.contact.website} target="_blank" rel="noopener noreferrer">
                        <Activity className="h-4 w-4" />
                        <span>Website</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <Button
                variant="outline"
                className="w-full font-normal text-sm border-border/30 hover:bg-secondary transition-colors duration-200"
                onClick={() => setActiveView("contact")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b border-border/20 bg-background/80 backdrop-blur-sm px-6 sticky top-0 z-10">
            <SidebarTrigger />
            <h1 className="text-lg font-normal text-foreground/90">
              {activeView === "projects" && "Projects Dashboard"}
              {activeView === "skills" && "Skills & Technologies"}
              {activeView === "about" && "About Me"}
              {activeView === "contact" && "Contact Information"}
            </h1>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <div className="animate-in fade-in duration-500">
              {activeView === "projects" && <ProjectsView />}
              {activeView === "skills" && <SkillsView />}
              {activeView === "about" && <AboutView />}
              {activeView === "contact" && <ContactView />}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

