import Link from "next/link";
import type { ReactNode } from "react";
import { type DashboardNavItem } from "@/domains/photographer-dashboard";
import styles from "./DashboardShell.module.css";

interface DashboardShellProps {
  photographer: {
    name: string;
    handle: string;
  };
  nav: DashboardNavItem[];
  activeHref: string;
  children: ReactNode;
}

export function DashboardShell({ photographer, nav, activeHref, children }: DashboardShellProps) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Photographer dashboard navigation">
        <Link className={styles.brand} href="/">
          <span aria-hidden="true" />
          Captura
        </Link>
        <div className={styles.photographerCard}>
          <span className={styles.avatar}>SP</span>
          <div>
            <strong>{photographer.name}</strong>
            <p>{photographer.handle}</p>
          </div>
        </div>
        <nav className={styles.nav}>
          {nav.map((item) => (
            <Link
              className={item.href === activeHref ? styles.navActive : ""}
              href={item.href}
              key={item.href}
              aria-current={item.href === activeHref ? "page" : undefined}
            >
              <span>{item.label}</span>
              {item.status ? <small>{item.status}</small> : null}
            </Link>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
