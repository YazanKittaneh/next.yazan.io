import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { PostHogProvider } from '@/components/PostHogProvider';
import { Toaster } from '@/components/ui/sonner';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Yazan Kittaneh',
    description: 'Welcome to my dashboard-esk personal page'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}>
                <PostHogProvider>
                    <ThemeProvider attribute='class'>
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </PostHogProvider>
            </body>
        </html>
    );
};

export default Layout;
