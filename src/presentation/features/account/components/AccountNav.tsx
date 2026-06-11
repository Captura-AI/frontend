"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AccountNav.module.css";

const ACCOUNT_NAV_ITEMS = [
  { label: "Profile", href: "/account/profile" },
  { label: "Library", href: "/account/library" },
  { label: "Saved", href: "/account/saved" },
  { label: "Saved searches", href: "/account/saved-searches" },
] as const;

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Account sections">
      {ACCOUNT_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
