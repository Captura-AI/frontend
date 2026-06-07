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
import styles from "./PhotographerDetailPage.module.css";

interface PhotographerDetailPageViewProps {
  detail: PhotographerDetail;
}

export function PhotographerDetailPageView({ detail }: PhotographerDetailPageViewProps) {
  const portfolioItems = detail.portfolio.slice(0, 5);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
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

        <aside className={styles.heroPanel}>
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

      <section className={styles.statsBand} aria-label="Photographer stats">
        {detail.stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <strong>{stat.emphasized ? <em>{stat.value}</em> : stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.storySection}>
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
        <div className={`${styles.portfolioGrid} ${getPortfolioGridClass(portfolioItems.length)}`}>
          {portfolioItems.map((item) => (
            <PortfolioCard item={item} key={item.id} />
          ))}
        </div>
      </section>

      <section className={styles.twoColumnSection}>
        <div>
          <SectionHead
            eyebrow="Active areas"
            title="Corners with a point of view."
            text="Hotspots show where this photographer is most likely to be active, and when the light usually works."
          />
          <div className={styles.hotspotList}>
            {detail.hotspots.map((hotspot) => (
              <HotspotCard hotspot={hotspot} key={hotspot.name} />
            ))}
          </div>
        </div>
        <div id="booking">
          <SectionHead
            eyebrow="Packages"
            title="Book the walk, keep the evidence."
            text="Rates are starting points. Captura can route special requests into the photographer dashboard in later phases."
          />
          <div className={styles.packageList}>
            {detail.packages.map((item) => (
              <PackageCard item={item} key={item.name} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.reviewSection}>
        <SectionHead
          eyebrow="Reviews"
          title="What people remember after the walk."
          text="Testimonials focus on the session experience, not just the final files."
        />
        <div className={styles.reviewGrid}>
          {detail.reviews.map((review) => (
            <ReviewCard review={review} key={review.author} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHead
          eyebrow="Latest moments"
          title="Recently uploaded frames."
          text="Freshly indexed photos from this photographer, ready to search or purchase."
        />
        <div className={styles.latestGrid}>
          {detail.latestMoments.map((moment) => (
            <LatestMomentCard moment={moment} key={moment.id} />
          ))}
        </div>
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

function LatestMomentCard({ moment }: { moment: PhotographerLatestMoment }) {
  return (
    <Link className={styles.latestCard} href={moment.href}>
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
