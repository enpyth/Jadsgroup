'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/home/header';
import Footer from '@/components/home/footer';
import { noLayoutRoutes } from '@/constants/config'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isNoLayout = noLayoutRoutes.some((route) => pathname.startsWith(route));

    return (
        <div className="flex flex-col min-h-screen">
            {!isNoLayout && <Header />}
            {children}
            {!isNoLayout && <Footer />}
        </div>
    );
}
