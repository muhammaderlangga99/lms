'use client'

import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link';
import { AudioWaveform, BadgeCheck, BrainCog, Filter, LibraryBig, Menu, Presentation } from 'lucide-react';
import { ModeToggle } from './ToggleTheme';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
const menu: { title: string, href: string, icon: () => JSX.Element }[] = [
    { title: 'Home', href: '/', icon: () => <BrainCog size={20} /> },
    { title: 'Materi', href: '/materi', icon: () => <LibraryBig size={20} /> },
    { title: 'Kelas', href: '/kelas', icon: () => <Presentation size={20} /> },
    { title: 'Category', href: '/link', icon: () => <Filter size={20} /> },
    { title: 'Sertifikasi', href: '/link', icon: () => <BadgeCheck size={20} />},
    { title: 'Alur belajar', href: '/link', icon: () => <AudioWaveform size={20} /> },
]

export default function Navbar({ className }: { className?: string }) {
    const pathname = usePathname()
    const [ scroll, setScroll ] = useState(false);
    
    // count scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        }
        window.addEventListener('scroll', handleScroll); // listen scroll event
    }, []);

    return (
        <nav className={cn(`w-full fixed py-3 z-50 ${scroll ? 'bg-white dark:bg-black border-solid backdrop-filter backdrop-blur-lg bg-opacity-45 dark:bg-opacity-10 border-b dark:border-zinc-800' : 'bg-transparent dark:bg-transparent'
            }
        }`, className)}>
            <div className="max-w-7xl m-auto flex items-center justify-between px-3 lg:px-0">
                <div className='flex gap-5 items-center'>
                    <Link href="/" className="brand flex gap-1 items-center">
                        <BrainCog size={20} />
                        <h1>learning</h1>
                    </Link>
                    <NavigationMenu className='hidden lg:inline-block'>
                        <NavigationMenuList className='gap-x-3'>
                            {menu.map((item, index) => (
                                <NavigationMenuItem key={index}>
                                    <Link href={item.href} className='dark:text-zinc-400 hover:dark:text-white text-zinc-700 hover:text-black font-medium text-sm'>
                                        <span>{item.title}</span>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center gap-x-1 md:gap-x-3">
                    <ModeToggle />
                    <Link href='/sign-in' className='py-1.5 px-2 md:py-2 md:px-3 rounded-xl border hover:bg-zinc-100 hover:dark:bg-zinc-800 md:text-sm'>Log in</Link>
                    <Sheet>
                        <SheetTrigger className='border p-2 rounded-xl lg:hidden'>
                            <Menu size={20} />
                        </SheetTrigger>
                        <SheetContent className='flex flex-col items-start gap-y-2'>
                            <SheetHeader className='mb-3 px-2'>
                                <SheetTitle className='font-mono font-bold'>Menu</SheetTitle>
                                <SheetDescription className='font-light hidden'>Navigation</SheetDescription>
                            </SheetHeader>
                            {
                                menu.map((item, index) => (
                                    <Link href={item.href} key={index} className={`w-full dark:text-zinc-400 hover:dark:text-white text-zinc-700 hover:text-black font-light flex items-center gap-2 px-2 py-1 rounded-lg ${pathname == item.href && 'before:block before:w-0.5 before:h-3 before:bg-black before:dark:bg-white before:rounded-full before:absolute before:-translate-x-2'}`}>
                                        <span>{item.icon()}</span>
                                        <span>{item.title}</span>
                                    </Link>
                                ))
                            }
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
