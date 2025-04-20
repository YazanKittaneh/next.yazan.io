'use client';

import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { resumeData } from '@/lib/ResumeData';

import { AtSign, Github, Linkedin, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactView() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success('Message sent!', {
                description: "Thanks for reaching out. I'll get back to you soon."
            });
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 1500);
    };

    return (
        <div className='space-y-8'>
            <div>
                <h2 className='text-foreground/90 text-2xl font-normal tracking-tight'>Contact Me</h2>
                <p className='text-muted-foreground'>
                    Get in touch for collaborations, opportunities, or just to say hello
                </p>
            </div>

            <div className='grid gap-6 md:grid-cols-2'>
                <Card className='border-border/20 hover-card border shadow-none'>
                    <CardHeader>
                        <CardTitle className='font-normal'>Send a Message</CardTitle>
                        <CardDescription>
                            Fill out the form below and I'll get back to you as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='name' className='font-normal'>
                                    Name
                                </Label>
                                <Input
                                    id='name'
                                    name='name'
                                    placeholder='Your name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className='border-border/30 bg-background/50 focus:border-primary/30 transition-colors duration-200'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='email' className='font-normal'>
                                    Email
                                </Label>
                                <Input
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='your.email@example.com'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className='border-border/30 bg-background/50 focus:border-primary/30 transition-colors duration-200'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='subject' className='font-normal'>
                                    Subject
                                </Label>
                                <Input
                                    id='subject'
                                    name='subject'
                                    placeholder="What's this about?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className='border-border/30 bg-background/50 focus:border-primary/30 transition-colors duration-200'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='message' className='font-normal'>
                                    Message
                                </Label>
                                <Textarea
                                    id='message'
                                    name='message'
                                    placeholder='Your message...'
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className='border-border/30 bg-background/50 focus:border-primary/30 resize-none transition-colors duration-200'
                                />
                            </div>
                            <Button
                                type='submit'
                                className='w-full font-normal transition-all duration-200'
                                disabled={isSubmitting}
                                variant='default'>
                                {isSubmitting ? (
                                    <>
                                        <span className='mr-2'>Sending...</span>
                                        <Send className='h-4 w-4 animate-pulse' />
                                    </>
                                ) : (
                                    <>
                                        <span className='mr-2'>Send Message</span>
                                        <Send className='h-4 w-4' />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className='space-y-6'>
                    <Card className='border-border/20 hover-card border shadow-none'>
                        <CardHeader>
                            <CardTitle className='font-normal'>Contact Information</CardTitle>
                            <CardDescription>Here are the different ways you can reach me.</CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-primary/5 group-hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200'>
                                    <Mail className='text-primary/70 h-5 w-5' />
                                </div>
                                <div>
                                    <p className='text-sm font-normal'>Email</p>
                                    <p className='text-muted-foreground text-sm'>{resumeData.contact.email}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='bg-primary/5 group-hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200'>
                                    <Phone className='text-primary/70 h-5 w-5' />
                                </div>
                                <div>
                                    <p className='text-sm font-normal'>Phone</p>
                                    <p className='text-muted-foreground text-sm'>{resumeData.contact.phone}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='bg-primary/5 group-hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200'>
                                    <MapPin className='text-primary/70 h-5 w-5' />
                                </div>
                                <div>
                                    <p className='text-sm font-normal'>Location</p>
                                    <p className='text-muted-foreground text-sm'>
                                        {resumeData.experiences[0].location}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-border/20 hover-card border shadow-none'>
                        <CardHeader>
                            <CardTitle className='font-normal'>Connect With Me</CardTitle>
                            <CardDescription>Find me on these platforms and social media channels.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols-2 gap-4'>
                                <Button
                                    variant='outline'
                                    className='border-border/30 hover:bg-secondary flex items-center justify-start gap-2 font-normal transition-colors duration-200'
                                    asChild>
                                    <a
                                        href={`https://${resumeData.contact.github}`}
                                        target='_blank'
                                        rel='noopener noreferrer'>
                                        <Github className='h-4 w-4' />
                                        <span>GitHub</span>
                                    </a>
                                </Button>
                                <Button
                                    variant='outline'
                                    className='border-border/30 hover:bg-secondary flex items-center justify-start gap-2 font-normal transition-colors duration-200'
                                    asChild>
                                    <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
                                        <Linkedin className='h-4 w-4' />
                                        <span>LinkedIn</span>
                                    </a>
                                </Button>
                                <Button
                                    variant='outline'
                                    className='border-border/30 hover:bg-secondary flex items-center justify-start gap-2 font-normal transition-colors duration-200'
                                    asChild>
                                    <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
                                        <Twitter className='h-4 w-4' />
                                        <span>Twitter</span>
                                    </a>
                                </Button>
                                <Button
                                    variant='outline'
                                    className='border-border/30 hover:bg-secondary flex items-center justify-start gap-2 font-normal transition-colors duration-200'
                                    asChild>
                                    <a href={`mailto:${resumeData.contact.email}`}>
                                        <AtSign className='h-4 w-4' />
                                        <span>Email</span>
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
