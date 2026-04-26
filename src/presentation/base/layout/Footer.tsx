import Link from "next/link";

const FOOTER_LINKS = {
  product: [
    { label: "Search", href: "#search" },
    { label: "Saved moments", href: "#" },
    { label: "Request removal", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  photographers: [
    { label: "Join the roster", href: "#" },
    { label: "Upload guide", href: "#" },
    { label: "Licensing", href: "#" },
    { label: "Journal", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Ethics & privacy", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Press", href: "#" },
  ],
} as const;

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-soft font-normal mb-[18px]">
        {heading}
      </h4>
      <ul className="space-y-[11px]">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-ink transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-line">
      <div className="max-w-[1320px] mx-auto px-10 pt-[50px] pb-9">
        {/* Top grid: 2fr 1fr 1fr 1fr */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-[50px] pb-[60px] border-b border-line">
          {/* Brand column */}
          <div>
            <p className="font-serif text-[42px] leading-none tracking-[-0.02em] text-ink mb-5">
              Capt<em className="italic text-accent">ura</em>.
            </p>
            <p className="text-[14px] leading-[1.55] text-ink-soft max-w-[260px]">
              A home for the photographs of everyday life — yours, somebody else&apos;s,
              somewhere out there.
            </p>
          </div>

          <FooterColumn heading="Product" links={FOOTER_LINKS.product} />
          <FooterColumn heading="Photographers" links={FOOTER_LINKS.photographers} />
          <FooterColumn heading="Company" links={FOOTER_LINKS.company} />
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-[28px]">
          <p className="font-mono text-[11px] tracking-[0.04em] uppercase text-ink-soft">
            &copy; {year} Captura Studio
          </p>
          <p className="font-mono text-[11px] tracking-[0.04em] uppercase text-ink-soft">
            All photographs remain property of their respective owners
          </p>
        </div>
      </div>
    </footer>
  );
}
