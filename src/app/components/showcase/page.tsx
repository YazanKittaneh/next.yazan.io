'use client';

import React from 'react';
import { componentRegistry } from '@/lib/component-registry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';

export default function ComponentShowcase() {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

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
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <Link href="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Component Showcase</h1>
        <p className="text-muted-foreground mb-6">
          Interactive React components with live preview and code examples. Test and explore different UI patterns.
        </p>

        <div className="flex items-center gap-4">
          <Label htmlFor="category">Filter by category:</Label>
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

function Label({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" {...props}>
      {children}
    </label>
  );
}