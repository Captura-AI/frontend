"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { type CheckoutPage, type PaymentTabId } from "@/domains/checkout";
import styles from "./CheckoutPage.module.css";

interface CheckoutPageViewProps {
  content: CheckoutPage;
}

const payLabels: Record<string, string> = {
  qris: "with QRIS",
  va: "with Virtual Account",
  gopay: "with GoPay",
  ovo: "with OVO",
  dana: "with DANA",
  alfamart: "at Alfamart",
  card: "with card",
  apple: "with Apple Pay",
  google: "with Google Pay",
  paypal: "with PayPal",
  alipay: "with Alipay",
  sepa: "via SEPA",
  wise: "via Wise",
  ach: "via ACH",
};

export function CheckoutPageView({ content }: CheckoutPageViewProps) {
  const [activeTab, setActiveTab] = useState<PaymentTabId>("local");
  const [activeMethods, setActiveMethods] = useState<Record<PaymentTabId, string>>({
    local: "qris",
    card: "card",
    wallet: "apple",
    bank: "sepa",
  });
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [qrSeconds, setQrSeconds] = useState(5 * 60 - 2);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setQrSeconds((seconds) => (seconds > 0 ? seconds - 1 : 5 * 60));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const totals = useMemo(() => {
    const discountedSubtotal = content.summary.subtotal - discount;
    const service = roundCurrency(discountedSubtotal * content.summary.serviceFeePct);
    const tax = roundCurrency(discountedSubtotal * content.summary.taxPct);
    const total = roundCurrency(discountedSubtotal + service + tax);
    return {
      service,
      tax,
      total,
      idr: Math.round(total * content.summary.rateToIdr),
    };
  }, [content.summary, discount]);

  const activeMethod = activeMethods[activeTab];
  const qrTime = `${String(Math.floor(qrSeconds / 60)).padStart(2, "0")}:${String(qrSeconds % 60).padStart(2, "0")}`;

  function applyPromo() {
    if (promo.trim().toUpperCase() === content.summary.promoCode) {
      setDiscount(roundCurrency(content.summary.subtotal * content.summary.promoPct));
    }
  }

  return (
    <div className={styles.page}>
      <nav className={styles.top}>
        <Link href="/" className={styles.brand}>
          <span />
          Captura
        </Link>
        <div className={styles.steps} aria-label="Checkout progress">
          <span className={styles.done}><span>✓</span> Cart</span>
          <i />
          <span className={styles.activeStep}><span>2</span> Checkout</span>
          <i />
          <span><span>3</span> Confirmation</span>
        </div>
        <span className={styles.secure}>
          <LockIcon />
          Secure · 256-bit
        </span>
      </nav>

      <div className={styles.wrap}>
        <header className={styles.pageHead}>
          <h1>{content.header.title} <em>{content.header.emphasis}</em>.</h1>
          <span className={styles.tag}><span />{content.header.status}</span>
        </header>

        <div className={styles.layout}>
          <div>
            <section className={styles.section}>
              <SectionTitle title="Contact" number="01 / 03" />
              <div className={styles.fieldGrid}>
                <div className={`${styles.field} ${styles.full}`}>
                  <label htmlFor="email">Email · for receipt &amp; download link</label>
                  <input id="email" type="email" defaultValue={content.contact.email} />
                </div>
                <div className={styles.field}>
                  <label htmlFor="fname">First name</label>
                  <input id="fname" type="text" placeholder="Ayaka" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="lname">Last name</label>
                  <input id="lname" type="text" placeholder="Mori" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="phone">Phone <span>— optional, only for QRIS confirmation</span></label>
                  <input id="phone" type="tel" placeholder="+62 812 3456 7890" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="country">Billing country</label>
                  <select id="country">
                    {content.contact.countries.map((country) => <option key={country}>{country}</option>)}
                  </select>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <SectionTitle title="Payment" emphasis="method" number="02 / 03" />
              <div className={styles.payTabs} role="tablist">
                {content.payment.tabs.map((tab) => (
                  <button
                    className={activeTab === tab.id ? styles.payTabActive : ""}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                  >
                    {tab.id === "local" ? "ID " : ""}{tab.label}
                  </button>
                ))}
              </div>

              {content.payment.tabs.map((tab) => (
                <div className={activeTab === tab.id ? styles.payList : styles.hidden} key={tab.id}>
                  {tab.methods.map((method) => (
                    <button
                      className={`${styles.pay} ${activeMethods[tab.id] === method.id ? styles.payActive : ""}`}
                      key={method.id}
                      onClick={() => setActiveMethods((current) => ({ ...current, [tab.id]: method.id }))}
                      type="button"
                    >
                      <span className={styles.radio} />
                      <span className={`${styles.logo} ${method.darkLogo ? styles.logoDark : ""}`}>{method.logo}</span>
                      <span className={styles.payBody}>
                        <strong>{method.title}</strong>
                        <small>{method.subtitle}</small>
                      </span>
                      {method.meta ? (
                        <span className={styles.payMeta}>
                          <em className={method.feeType === "free" ? styles.free : styles.fee}>
                            {method.meta.split(" · ")[0]}
                          </em>
                          <br />
                          {method.meta.split(" · ")[1]}
                        </span>
                      ) : (
                        <span className={styles.cardBrands}>
                          {content.payment.cardBrands.map((brand) => <i key={brand}>{brand}</i>)}
                        </span>
                      )}
                    </button>
                  ))}
                  {tab.id === "card" && <CardForm />}
                </div>
              ))}

              {activeTab === "local" && (
                <div className={styles.qrisPanel}>
                  <div className={styles.qrFrame}>
                    <QrPattern />
                    <span>QRIS</span>
                  </div>
                  <div className={styles.qrisInfo}>
                    <h3>Scan with <em>any</em> Indonesian payment app.</h3>
                    <p>Open your favorite e-wallet or m-banking app, scan the code, and confirm. We&apos;ll detect the payment automatically — usually within seconds.</p>
                    <div className={styles.qrisApps}>
                      {content.payment.qrisApps.map((app) => <span key={app}>{app}</span>)}
                    </div>
                    <div className={styles.timer}><span />QR refreshes in <strong>{qrTime}</strong></div>
                  </div>
                </div>
              )}
            </section>

            <section className={styles.section}>
              <SectionTitle title="Almost there" number="03 / 03" />
              <div className={styles.review}>
                <CheckIcon />
                <div>
                  <h3>Your download will arrive in your email <em>the moment payment clears</em>.</h3>
                  <p>Plus a permanent download link inside your account. We never store your card details — payments handled by Stripe &amp; Midtrans.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className={styles.summary}>
            <div className={styles.eyebrow}>{content.summary.eyebrow}</div>
            <div className={styles.sumItem}>
              <div className={styles.sumThumb}>
                <Image
                  src={content.summary.imageUrl}
                  alt=""
                  fill
                  sizes="64px"
                  className={styles.image}
                />
              </div>
              <div>
                <h2>{content.summary.title} <em>{content.summary.emphasis}</em>.</h2>
                <div className={styles.sumMeta}>
                  <div><span>{content.summary.photographer}</span></div>
                  <div><span>{content.summary.license}</span><span>{content.summary.edition}</span></div>
                  <div><span>{content.summary.file}</span><span>{content.summary.frame}</span></div>
                </div>
              </div>
            </div>

            <div className={styles.promoRow}>
              <input
                placeholder="Promo code · DUSK15"
                value={promo}
                onChange={(event) => setPromo(event.target.value)}
              />
              <button onClick={applyPromo} type="button">Apply</button>
            </div>

            <div className={styles.lines}>
              <Line label="Subtotal" value={formatUsd(content.summary.subtotal)} />
              {discount > 0 && <Line className={styles.discount} label={`Discount · ${content.summary.promoCode}`} value={`-${formatUsd(discount)}`} />}
              <Line label="Service fee" value={formatUsd(totals.service)} info />
              <Line label="Tax · VAT (11%)" value={formatUsd(totals.tax)} info />
              <div className={styles.note}>Shown in USD · Rp {totals.idr.toLocaleString("id-ID")} at checkout</div>
            </div>

            <div className={styles.totalLine}>
              <span>Total due</span>
              <strong><em>USD</em>{totals.total.toFixed(2)}</strong>
            </div>

            <Link className={styles.payButton} href="/checkout/success">
              Pay {formatUsd(totals.total)} {payLabels[activeMethod]} <span>→</span>
            </Link>

            <div className={styles.trustRow}>
              <span><LockIcon />256-bit SSL</span>
              <span><CheckIcon />PCI-DSS L1</span>
              <span><ShieldIcon />BI-licensed</span>
            </div>

            <p className={styles.legal}>
              By placing this order, you agree to Captura&apos;s <a href="#">Terms</a>, <a href="#">License Agreement</a>, and <a href="#">Refund Policy</a>. All sales support the photographer directly — 70% of every transaction.
            </p>

            <div className={styles.reassureGrid}>
              <Reassure icon={<DownloadIcon />} title="Instant" text="Download seconds after payment" />
              <Reassure icon={<CheckIcon />} title="7-day" text="No-questions refunds" />
              <Reassure icon={<LayersIcon />} title="70/30" text="Goes to the photographer" />
            </div>
          </aside>
        </div>
      </div>

      <footer className={styles.foot}>
        <div className={styles.wrap}>
          <div className={styles.footRow}>
            <span>© 2026 Captura Studio · Lisbon</span>
            <span><a href="#">Need help?</a> · <a href="#">Contact support</a> · <a href="#">Refund policy</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ title, emphasis, number }: { title: string; emphasis?: string; number: string }) {
  return (
    <div className={styles.sectionTitle}>
      <h2>{title} {emphasis && <em>{emphasis}</em>}</h2>
      <span>{number}</span>
    </div>
  );
}

function CardForm() {
  return (
    <div className={styles.cardForm}>
      <div className={styles.fieldGrid}>
        <div className={`${styles.field} ${styles.full}`}><label htmlFor="cnum">Card number</label><input id="cnum" inputMode="numeric" placeholder="1234 5678 9012 3456" /></div>
        <div className={styles.field}><label htmlFor="cexp">Expiry</label><input id="cexp" placeholder="MM / YY" /></div>
        <div className={styles.field}><label htmlFor="ccvc">CVC</label><input id="ccvc" placeholder="123" /></div>
        <div className={`${styles.field} ${styles.full}`}><label htmlFor="cname">Name on card</label><input id="cname" placeholder="As printed" /></div>
      </div>
    </div>
  );
}

function Line({ label, value, info, className }: { label: string; value: string; info?: boolean; className?: string }) {
  return (
    <div className={`${styles.line} ${className ?? ""}`}>
      <span>{label}{info && <i title="Configurable fee">i</i>}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Reassure({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className={styles.reassure}>{icon}<h3>{title}</h3><p>{text}</p></div>;
}

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

function formatUsd(value: number) {
  return `$${value.toFixed(2)}`;
}

function LockIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="10" height="7" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" /></svg>;
}

function CheckIcon() {
  return <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="9" r="7.5" /><path d="M5.5 9l2.5 2.5L12.5 6.5" /></svg>;
}

function ShieldIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1l6 3v4c0 4-3 6-6 7-3-1-6-3-6-7V4l6-3z" /></svg>;
}

function DownloadIcon() {
  return <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 1v8m0 0l-3-3m3 3l3-3M2 14h14" /></svg>;
}

function LayersIcon() {
  return <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7l6-3 6 3-6 3-6-3z" /><path d="M3 11l6 3 6-3" /></svg>;
}

function QrPattern() {
  const modules = [
    [8, 0, 1], [10, 0, 1], [11, 0, 2], [9, 1, 2], [12, 1, 1], [8, 2, 1], [10, 2, 1], [13, 2, 1],
    [9, 3, 1], [11, 3, 2], [8, 4, 2], [12, 4, 1], [10, 5, 1], [13, 5, 1], [8, 6, 1], [11, 6, 1],
    [0, 8, 1], [2, 8, 2], [5, 8, 1], [7, 8, 2], [11, 8, 1], [13, 8, 2], [16, 8, 1], [18, 8, 1], [20, 8, 1],
    [1, 9, 1], [4, 9, 2], [8, 9, 1], [10, 9, 2], [14, 9, 1], [17, 9, 2], [0, 10, 2], [3, 10, 1], [6, 10, 1],
    [9, 10, 2], [13, 10, 2], [16, 10, 1], [19, 10, 2], [2, 11, 1], [4, 11, 2], [8, 11, 1], [11, 11, 1],
    [14, 11, 2], [18, 11, 1], [0, 12, 1], [3, 12, 2], [6, 12, 1], [9, 12, 1], [12, 12, 1], [15, 12, 1], [17, 12, 2],
    [20, 12, 1], [8, 13, 2], [11, 13, 1], [13, 13, 2], [17, 13, 1], [19, 13, 2], [8, 14, 1], [10, 14, 1],
    [13, 14, 1], [15, 14, 2], [18, 14, 2], [9, 15, 2], [12, 15, 1], [14, 15, 1], [17, 15, 1], [19, 15, 1],
    [8, 16, 1], [11, 16, 1], [13, 16, 2], [16, 16, 1], [18, 16, 2], [9, 17, 1], [12, 17, 2], [15, 17, 1],
    [17, 17, 1], [20, 17, 1], [8, 18, 2], [11, 18, 1], [13, 18, 1], [16, 18, 2], [19, 18, 1], [9, 19, 1],
    [11, 19, 2], [14, 19, 2], [18, 19, 1], [20, 19, 1], [8, 20, 1], [10, 20, 1], [12, 20, 1], [15, 20, 2], [18, 20, 2],
  ];

  return (
    <svg viewBox="0 0 21 21" shapeRendering="crispEdges">
      <rect width="21" height="21" fill="#fff" />
      <g fill="#141311"><rect x="0" y="0" width="7" height="7" /><rect x="14" y="0" width="7" height="7" /><rect x="0" y="14" width="7" height="7" /></g>
      <g fill="#fff"><rect x="1" y="1" width="5" height="5" /><rect x="15" y="1" width="5" height="5" /><rect x="1" y="15" width="5" height="5" /></g>
      <g fill="#141311"><rect x="2" y="2" width="3" height="3" /><rect x="16" y="2" width="3" height="3" /><rect x="2" y="16" width="3" height="3" /></g>
      <g fill="#141311">{modules.map(([x, y, w]) => <rect key={`${x}-${y}-${w}`} x={x} y={y} width={w} height="1" />)}</g>
    </svg>
  );
}
