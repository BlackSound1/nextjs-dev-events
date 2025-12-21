import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return (
        <header>
            <nav>
                <Link className="logo" href={"/"} >
                    <Image
                        src={"/icons/logo.png"}
                        alt="logo"
                        width={24}
                        height={24}
                    />

                    <p>DevEvent</p>
                </Link>

                <ul>
                    <Link href={"/"}>Home</Link>
                    <Link href={"/"}>Events</Link>
                    <Link href={"/"}>Create Event</Link>
                </ul>
            </nav>
        </header>
    );
}
