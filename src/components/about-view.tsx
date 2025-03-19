import { GraduationCap, Briefcase, Award, MapPin } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { resumeData } from "@/lib/ResumeData"

export default function AboutView() {
  const { name, contact, experiences, education } = resumeData;
  const latestExperience = experiences[0];
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-normal tracking-tight text-foreground/90">About Me</h2>
        <p className="text-muted-foreground">Learn more about my background, experience, and interests</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border border-border/20 shadow-none hover-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Avatar className="h-24 w-24 border-0 ring-2 ring-border/20 ring-offset-2 ring-offset-background">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">{initials}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="font-normal">{name}</CardTitle>
            <CardDescription>{latestExperience.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{latestExperience.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>{education[0].degree}, {education[0].institution}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{experiences.length}+ Years Experience</span>
              </div>

              <Separator className="bg-border/20" />

              <div>
                <h4 className="mb-2 font-normal">Interests</h4>
                <div className="flex flex-wrap gap-1">
                  {resumeData.technologies.slice(0, 5).flatMap(category => 
                    category.skills.slice(0, 1).map(skill => (
                      <Badge key={skill} variant="outline" className="bg-secondary/30 border-border/20 font-normal text-xs">
                        {skill}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border border-border/20 shadow-none hover-card">
          <CardHeader>
            <CardTitle className="font-normal">Professional Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              I'm a passionate {latestExperience.title} with over {experiences.length} years of experience building web applications and
              digital experiences. I specialize in {resumeData.technologies[0].skills.slice(0, 2).join(" and ")}, and have a
              strong foundation in software architecture and design patterns.
            </p>
            <p>
              {latestExperience.achievements[0].replace(/\*\*/g, '')}
            </p>
            <p>
              When I'm not coding, you can find me contributing to open source projects, writing technical articles, or
              exploring the latest web technologies.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="experience" className="space-y-6">
        <TabsList className="bg-secondary/30 p-0.5">
          <TabsTrigger
            value="experience"
            className="font-normal data-[state=active]:bg-background data-[state=active]:shadow-none transition-all duration-200"
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Experience
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="font-normal data-[state=active]:bg-background data-[state=active]:shadow-none transition-all duration-200"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Education
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="font-normal data-[state=active]:bg-background data-[state=active]:shadow-none transition-all duration-200"
          >
            <Award className="mr-2 h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="experience" className="space-y-4 animate-in fade-in-50 duration-300">
          {experiences.slice(0, 2).map((exp, index) => (
            <Card key={index} className="border border-border/20 shadow-none hover-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-normal">{exp.title}</CardTitle>
                    <CardDescription>{exp.company}</CardDescription>
                  </div>
                  <Badge className="font-normal text-xs bg-secondary/50 text-secondary-foreground">{exp.period}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement.replace(/\*\*/g, '')}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="education" className="space-y-4 animate-in fade-in-50 duration-300">
          {education.map((edu, index) => (
            <Card key={index} className="border border-border/20 shadow-none hover-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-normal">{edu.degree}</CardTitle>
                    <CardDescription>{edu.institution}</CardDescription>
                  </div>
                  <Badge className="font-normal text-xs bg-secondary/50 text-secondary-foreground">{edu.graduationDate}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>Location: {edu.location}</p>
                <p className="mt-2">Graduated: {edu.graduationDate}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 animate-in fade-in-50 duration-300">
          <Card className="border border-border/20 shadow-none hover-card">
            <CardHeader>
              <CardTitle className="font-normal">Awards & Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <p className="font-normal">Best Web Application Award</p>
                    <p className="text-sm text-muted-foreground">Regional Tech Conference, 2022</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <p className="font-normal">AWS Certified Solutions Architect</p>
                    <p className="text-sm text-muted-foreground">Amazon Web Services, 2021</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <p className="font-normal">Open Source Contributor Award</p>
                    <p className="text-sm text-muted-foreground">GitHub, 2020</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

