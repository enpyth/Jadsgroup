import { auth } from '@/lib/auth';
import Providers from '@/components/layout/providers';
import { LanguageProvider } from "@/components/layout/language-context"
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import LayoutShell from '@/components/layout/layoutshell';

export const metadata: Metadata = {
  title: 'JADS',
  description: 'Jadsgroup'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang='en' className={`${lato.className}`} suppressHydrationWarning>
      <body className={'overflow-y-auto'}>
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <Providers session={session}>
            <Toaster />
            <LanguageProvider>
              <LayoutShell>
                {children}
              </LayoutShell>
            </LanguageProvider>
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
