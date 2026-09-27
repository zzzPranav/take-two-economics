import Link from "next/link";
import { Document } from "@/components/Document";

export default function Home() {
  return (
    <>
      <header className="topbar">
        <strong>Take-Two Interactive · economics project</strong>
        <nav>
          <Link href="/" aria-current="page">
            Research memo
          </Link>
          <Link href="/present">Slide deck</Link>
        </nav>
      </header>
      <Document />
    </>
  );
}
