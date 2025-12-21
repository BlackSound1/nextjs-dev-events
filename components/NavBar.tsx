'use client';

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

export default function NavBar() {
    const handleNavClick = (navItem: string) => {
        posthog.capture(`nav_${navItem}_clicked`, {
            nav_item: navItem,
            location: 'header',
        });
    };

    return (
        <header>
            <nav>
                <Link className="logo" href={"/"} onClick={() => handleNavClick('logo')}>
                    <Image
                        src={"/icons/logo.png"}
                        alt="logo"
                        width={24}
                        height={24}
                    />

                    <p>DevEvent</p>
                </Link>

                <ul>
                    <Link href={"/"} onClick={() => handleNavClick('home')}>Home</Link>
                    <Link href={"/"} onClick={() => handleNavClick('events')}>Events</Link>
                    <Link href={"/"} onClick={() => handleNavClick('create_event')}>Create Event</Link>
                </ul>
            </nav>
        </header>
    );
}
