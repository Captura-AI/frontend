import Link from "next/link";
import { type BreadcrumbItem } from "@/domains/explorer";

interface ExplorerDetailBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function ExplorerDetailBreadcrumb({ items }: ExplorerDetailBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center flex-wrap gap-[10px] pt-7 pb-2 font-mono text-[11px] tracking-[0.06em] uppercase text-ink-soft"
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-[10px]">
          {i > 0 && <span className="text-ink-faint">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-ink transition-colors duration-200">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
