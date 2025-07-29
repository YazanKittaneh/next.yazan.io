'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from '@/components/ui/dialog';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ModeToggle } from '@/components/mode-toggle';
import { ComponentWrapper } from '@/components/component-wrapper';

export default function ComponentsPage() {
    return (
        <div className="container mx-auto py-10 px-4 max-w-6xl">
            <h1 className="text-4xl font-bold mb-8">Component Showcase</h1>
            
            {/* Buttons Section */}
            <ComponentWrapper name="buttons" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button>Default Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </ComponentWrapper>

            <Separator className="my-8" />

            {/* Form Inputs Section */}
            <ComponentWrapper name="form-inputs" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Form Inputs</h2>
                <div className="space-y-4 max-w-md">
                    <Input placeholder="Enter text..." />
                    <Input type="email" placeholder="Email address" />
                    <Input disabled placeholder="Disabled input" />
                    <Textarea placeholder="Enter a message..." rows={4} />
                </div>
            </ComponentWrapper>

            <Separator className="my-8" />

            {/* Dialog Section */}
            <ComponentWrapper name="dialog" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Dialog</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Dialog Title</DialogTitle>
                            <DialogDescription>
                                This is a dialog description. It provides context about the dialog content.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <p>Dialog content goes here.</p>
                        </div>
                    </DialogContent>
                </Dialog>
            </ComponentWrapper>

            <Separator className="my-8" />

            {/* Sheet Section */}
            <ComponentWrapper name="sheet" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Sheet</h2>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Sheet Title</SheetTitle>
                            <SheetDescription>
                                This is a sheet that slides in from the side.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="py-4">
                            <p>Sheet content goes here.</p>
                        </div>
                    </SheetContent>
                </Sheet>
            </ComponentWrapper>

            <Separator className="my-8" />

            {/* Tabs Section */}
            <ComponentWrapper name="tabs" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Tabs</h2>
                <Tabs defaultValue="tab1" className="w-full max-w-md">
                    <TabsList>
                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Content for tab 1</TabsContent>
                    <TabsContent value="tab2">Content for tab 2</TabsContent>
                    <TabsContent value="tab3">Content for tab 3</TabsContent>
                </Tabs>
            </ComponentWrapper>

            <Separator className="my-8" />

            {/* Tooltip Section */}
            <ComponentWrapper name="tooltip" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Tooltip</h2>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>This is a tooltip!</p>
                    </TooltipContent>
                </Tooltip>
            </ComponentWrapper>

            <Separator className="my-8" />

            {/* Skeleton Section */}
            <ComponentWrapper name="skeleton" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Skeleton</h2>
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full max-w-sm" />
                    <Skeleton className="h-4 w-full max-w-md" />
                    <Skeleton className="h-4 w-full max-w-lg" />
                    <div className="flex gap-4">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                </div>
            </ComponentWrapper>

            <Separator className="my-8" />

            {/* Theme Toggle Section */}
            <ComponentWrapper name="theme-toggle" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Theme Toggle</h2>
                <div className="flex items-center gap-4">
                    <p>Click to toggle theme:</p>
                    <ModeToggle />
                </div>
            </ComponentWrapper>
        </div>
    );
}
