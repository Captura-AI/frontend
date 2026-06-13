"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type PhotographerDetail,
  type PhotographerHotspot,
  type PhotographerLatestMoment,
  type PhotographerPackage,
  type PhotographerPortfolioItem,
  type PhotographerReview,
} from "@/domains/photographers";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import styles from "./PhotographerDetailPage.module.css";

interface PhotographerDetailPageViewProps {
  detail: PhotographerDetail;
}

export function PhotographerDetailPageView({ detail }: PhotographerDetailPageViewProps) {
  const portfolioItems = detail.portfolio.slice(0, 5);
  const hasMorePortfolioItems = detail.portfolio.length > portfolioItems.length;

  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLElement>();
  const { ref: storyRef, isVisible: storyVisible } = useScrollReveal<HTMLElement>();
  const { ref: portfolioRef, isVisible: portfolioVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: hotspotsRef, isVisible: hotspotsVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: packagesRef, isVisible: packagesVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: reviewsRef, isVisible: reviewsVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: latestRef, isVisible: latestVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div className={styles.page}>
      <section
        className={`${styles.hero} opacity-0`}
        style={{ animation: "fadeIn 0.8s ease forwards" }}
      >
        <div className={styles.heroCopy}>
          <Link className={styles.backLink} href="/photographers">
            Photographers
          </Link>
          <span className={styles.eyebrow}>{detail.city} · Public profile</span>
          <h1>
            {detail.name}
            <em>{detail.headline}</em>
          </h1>
          <p>{detail.bio}</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href={detail.bookingAnchor}>
              Book session
            </Link>
            <Link className={styles.secondaryButton} href={detail.searchHref}>
              Search this photographer&apos;s moments
            </Link>
          </div>
        </div>

        <aside
          className={`${styles.heroPanel} opacity-0`}
          style={{ animation: "fadeIn 0.8s ease 0.2s forwards" }}
        >
          <div className={styles.heroImage}>
            <Image
              src={detail.heroImageUrl}
              alt={`${detail.name} portfolio hero`}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 42vw"
              className={styles.image}
            />
          </div>
          <div className={styles.profileStrip}>
            <div className={styles.avatar}>
              <Image
                src={detail.avatarUrl}
                alt=""
                fill
                sizes="72px"
                className={styles.image}
              />
            </div>
            <div>
              <strong>{detail.name}</strong>
              <span>{detail.area}</span>
            </div>
            <div className={styles.rating}>
              <strong>{detail.rating}</strong>
              <span>{detail.ratingMeta}</span>
            </div>
          </div>
        </aside>
      </section>

      <section
        ref={statsRef}
        className={`${styles.statsBand} reveal ${statsVisible ? "is-visible" : ""}`}
        aria-label="Photographer stats"
      >
        {detail.stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <strong>{stat.emphasized ? <em>{stat.value}</em> : stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section
        ref={storyRef}
        className={`${styles.storySection} reveal ${storyVisible ? "is-visible" : ""}`}
      >
        <div>
          <span className={styles.eyebrow}>Specialties</span>
          <div className={styles.specialties}>
            {detail.specialties.map((specialty) => (
              <span key={specialty}>{specialty}</span>
            ))}
          </div>
        </div>
        <blockquote>{detail.philosophy}</blockquote>
      </section>

      <section className={styles.section}>
        <SectionHead
          eyebrow="Portfolio"
          title="A street portfolio, not a sales grid."
          text="Curated frames from the routes this photographer knows best."
        />
        {portfolioItems.length === 0 ? (
          <EmptyState
            title="No portfolio frames yet."
            text="This photographer hasn't published any portfolio moments yet — check back soon."
          />
        ) : (
          <>
            <div
              ref={portfolioRef}
              className={`${styles.portfolioGrid} ${getPortfolioGridClass(portfolioItems.length)} reveal ${portfolioVisible ? "is-visible" : ""}`}
            >
              {portfolioItems.map((item) => (
                <PortfolioCard item={item} key={item.id} />
              ))}
            </div>
            {hasMorePortfolioItems ? (
              <div className={styles.portfolioMore}>
                <Link className={styles.secondaryButton} href={detail.searchHref}>
                  View more moments
                </Link>
              </div>
            ) : null}
          </>
        )}
      </section>

      <section className={styles.twoColumnSection}>
        <div>
          <SectionHead
            eyebrow="Active areas"
            title="Corners with a point of view."
            text="Hotspots show where this photographer is most likely to be active, and when the light usually works."
          />
          {detail.hotspots.length === 0 ? (
            <EmptyState
              title="No active areas yet."
              text="This photographer hasn't mapped any hotspots yet."
            />
          ) : (
            <div
              ref={hotspotsRef}
              className={`${styles.hotspotList} reveal-left ${hotspotsVisible ? "is-visible" : ""}`}
            >
              {detail.hotspots.map((hotspot) => (
                <HotspotCard hotspot={hotspot} key={hotspot.name} />
              ))}
            </div>
          )}
        </div>
        <div id="booking">
          <SectionHead
            eyebrow="Packages"
            title="Book the walk, keep the evidence."
            text="Rates are starting points. Captura can route special requests into the photographer dashboard in later phases."
          />
          {detail.packages.length === 0 ? (
            <EmptyState
              title="No packages yet."
              text="This photographer hasn't published booking packages yet."
            />
          ) : (
            <div
              ref={packagesRef}
              className={`${styles.packageList} reveal ${packagesVisible ? "is-visible" : ""}`}
            >
              {detail.packages.map((item) => (
                <PackageCard item={item} key={item.name} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.reviewSection}>
        <SectionHead
          eyebrow="Reviews"
          title="What people remember after the walk."
          text="Testimonials focus on the session experience, not just the final files."
        />
        {detail.reviews.length === 0 ? (
          <EmptyState
            title="No reviews yet."
            text="Be the first to book a session and share your story."
            dark
          />
        ) : (
          <div
            ref={reviewsRef}
            className={`${styles.reviewGrid} reveal-scale ${reviewsVisible ? "is-visible" : ""}`}
          >
            {detail.reviews.map((review) => (
              <ReviewCard review={review} key={review.author} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <SectionHead
          eyebrow="Latest moments"
          title="Recently uploaded frames."
          text="Freshly indexed photos from this photographer, ready to search or purchase."
        />
        {detail.latestMoments.length === 0 ? (
          <EmptyState
            title="No moments uploaded yet."
            text="New frames from this photographer will appear here as soon as they're indexed."
          />
        ) : (
          <div
            ref={latestRef}
            className={`${styles.latestGrid} reveal ${latestVisible ? "is-visible" : ""}`}
          >
            {detail.latestMoments.map((moment, i) => (
              <LatestMomentCard moment={moment} key={moment.id} delay={i * 80} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <header className={styles.sectionHead}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </header>
  );
}

function EmptyState({ title, text, dark }: { title: string; text: string; dark?: boolean }) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-lg border py-[100px] text-center"
      style={
        dark
          ? { borderColor: "rgba(251,250,246,0.12)", background: "rgba(251,250,246,0.05)" }
          : { borderColor: "var(--color-line-soft)", background: "var(--color-bg-soft)" }
      }
    >
      <p className="font-serif text-[28px] leading-none">{title}</p>
      <p
        className="max-w-[360px] text-[14px]"
        style={{ color: dark ? "rgba(251,250,246,0.58)" : "var(--color-ink-soft)" }}
      >
        {text}
      </p>
    </div>
  );
}

function PortfolioCard({
  item,
}: {
  item: PhotographerPortfolioItem;
}) {
  return (
    <Link className={styles.portfolioCard} href={item.momentHref}>
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
        className={styles.image}
      />
      <span>{item.category}</span>
      <div>
        <strong>{item.title}</strong>
        <small>{item.location} · {item.time}</small>
      </div>
    </Link>
  );
}

function getPortfolioGridClass(count: number): string {
  switch (count) {
    case 0:
    case 1:
      return styles.portfolioCount1 ?? "";
    case 2:
      return styles.portfolioCount2 ?? "";
    case 3:
      return styles.portfolioCount3 ?? "";
    case 4:
      return styles.portfolioCount4 ?? "";
    default:
      return styles.portfolioCount5 ?? "";
  }
}

function HotspotCard({ hotspot }: { hotspot: PhotographerHotspot }) {
  return (
    <article className={styles.hotspotCard}>
      <span>{hotspot.area}</span>
      <strong>{hotspot.name}</strong>
      <p>{hotspot.cadence}</p>
      <small>{hotspot.bestTime}</small>
    </article>
  );
}

function PackageCard({ item }: { item: PhotographerPackage }) {
  return (
    <article className={styles.packageCard}>
      <div className={styles.packageTop}>
        <div>
          <strong>{item.name}</strong>
          <span>{item.duration}</span>
        </div>
        <em>{item.price}</em>
      </div>
      <p>{item.description}</p>
      <ul>
        {item.includes.map((included) => (
          <li key={included}>{included}</li>
        ))}
      </ul>
      <Link href="#booking">Request this package</Link>
    </article>
  );
}

function ReviewCard({ review }: { review: PhotographerReview }) {
  return (
    <blockquote className={styles.reviewCard}>
      <p>{review.quote}</p>
      <footer>
        <strong>{review.author}</strong>
        <span>{review.context}</span>
      </footer>
    </blockquote>
  );
}

function LatestMomentCard({ moment, delay }: { moment: PhotographerLatestMoment; delay: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      className={`${styles.latestCard} reveal ${isVisible ? "is-visible" : ""}`}
      href={moment.href}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <div>
        <Image
          src={moment.imageUrl}
          alt={moment.title}
          fill
          sizes="(max-width: 720px) 100vw, 33vw"
          className={styles.image}
        />
      </div>
      <span>{moment.meta}</span>
      <strong>{moment.title}</strong>
    </Link>
  );
}
