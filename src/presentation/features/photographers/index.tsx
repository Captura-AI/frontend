"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { type PhotographerProfile, type PhotographersPage } from "@/domains/photographers";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import styles from "./PhotographersPage.module.css";

interface PhotographersPageViewProps {
  content: PhotographersPage;
}

export function PhotographersPageView({ content }: PhotographersPageViewProps) {
  const [activeFilter, setActiveFilter] = useState(content.filters[0]?.label ?? "All");
  const selectedPhotographer = content.photographers[0];
  const [sessionType, setSessionType] = useState(content.booking.sessionTypes[0] ?? "Personal");
  const [timeSlot, setTimeSlot] = useState("17:00 golden hour");

  const selectedSpec = useMemo(
    () =>
      selectedPhotographer
        ? `${selectedPhotographer.spec.split(" · ").slice(0, 2).join(" · ")} · ${selectedPhotographer.ratingMeta.split(" · ")[0]}`
        : "",
    [selectedPhotographer]
  );

  const { ref: directoryRef, isVisible: directoryVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal<HTMLElement>();
  const { ref: bookingLeftRef, isVisible: bookingLeftVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: bookingFormRef, isVisible: bookingFormVisible } = useScrollReveal<HTMLFormElement>();

  if (!selectedPhotographer) {
    return (
      <div className={styles.page}>
        <section
          className={`${styles.hero} opacity-0`}
          style={{ animation: "fadeIn 0.8s ease forwards" }}
        >
          <div className={styles.heroInner}>
            <div>
              <span className={styles.eyebrow}>{content.hero.eyebrow}</span>
              <h1>
                {content.hero.headline} <em>{content.hero.headlineEmphasis}</em>.
              </h1>
              <p className={styles.lede}>
                Photographer profiles will appear here as soon as the first
                Captura contributors are indexed.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section
        className={`${styles.hero} opacity-0`}
        style={{ animation: "fadeIn 0.8s ease forwards" }}
      >
        <div className={styles.heroInner}>
          <div>
            <span className={styles.eyebrow}>{content.hero.eyebrow}</span>
            <h1>
              {content.hero.headline} <em>{content.hero.headlineEmphasis}</em>.
            </h1>
            <p className={styles.lede}>{content.hero.description}</p>
          </div>
          <div className={styles.heroStats}>
            {content.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className={styles.heroStatNumber}>
                  {stat.emphasized ? <em>{stat.value}</em> : stat.value}
                </div>
                <div className={styles.heroStatLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className={`${styles.filterbar} opacity-0`}
        style={{ animation: "fadeIn 0.8s ease 0.15s forwards" }}
      >
        <span className={styles.filterLabel}>Filter by</span>
        {content.filters.map((filter) => (
          <button
            className={`${styles.chip} ${activeFilter === filter.label ? styles.chipActive : ""}`}
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            type="button"
            aria-pressed={activeFilter === filter.label}
          >
            {filter.label} <em>{filter.count}</em>
          </button>
        ))}
        <div className={styles.filterRight}>
          <span>{content.visibleCountLabel}</span>
          <span className={styles.sortLabel}>Sort: <em>{content.sortLabel}</em></span>
        </div>
      </div>

      <section className={styles.directory}>
        <div
          ref={directoryRef}
          className={`${styles.grid} reveal ${directoryVisible ? "is-visible" : ""}`}
        >
          {content.photographers.map((photographer, i) => (
            <PhotographerCard
              key={photographer.name}
              photographer={photographer}
              delay={i * 80}
            />
          ))}
        </div>
      </section>

      <section
        ref={ctaRef}
        className={`${styles.becomeCta} reveal-scale ${ctaVisible ? "is-visible" : ""}`}
      >
        <div className={styles.becomeCtaInner}>
          <span className={styles.becomeCtaGlow} aria-hidden="true" />
          <div>
            <h2>
              Know these streets? <em>Shoot them</em> for Captura.
            </h2>
            <p>
              Set your areas and specialties, let our AI handle plate, vehicle, and tag matching, and
              keep 70% of every sale.
            </p>
          </div>
          <Link className={styles.becomeCtaButton} href="/onboarding/photographer">
            Become a photographer
          </Link>
        </div>
      </section>

      <section className={styles.booking} id="booking">
        <div className={styles.bookingInner}>
          <div
            ref={bookingLeftRef}
            className={`${styles.bookingLeft} reveal-left ${bookingLeftVisible ? "is-visible" : ""}`}
          >
            <span className={styles.eyebrow}>{content.booking.eyebrow}</span>
            <h2>
              {content.booking.headline} <em>{content.booking.headlineEmphasis}</em> Take it home.
            </h2>
            <p>{content.booking.description}</p>
            <div className={styles.picked}>
              <div className={styles.pickedAvatar}>
                <Image
                  src={selectedPhotographer.avatarUrl}
                  alt={selectedPhotographer.name}
                  fill
                  sizes="48px"
                  className={styles.image}
                />
              </div>
              <div className={styles.pickedWho}>
                <div className={styles.pickedName}>{selectedPhotographer.name}</div>
                <div className={styles.pickedSpec}>{selectedSpec}</div>
              </div>
              <a className={styles.changeButton} href="#top">Change</a>
            </div>
            <p className={styles.bookingQuote}>
              {content.booking.quote}
              <span>{content.booking.quoteBy}</span>
            </p>
          </div>

          <form
            ref={bookingFormRef}
            className={`${styles.form} reveal ${bookingFormVisible ? "is-visible" : ""}`}
            onSubmit={(event) => event.preventDefault()}
          >
            <div className={styles.formHead}>
              <span>Your booking</span>
              <span>Estimated total <em>Rp 675k</em></span>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Session type</label>
              <div className={styles.segmented}>
                {content.booking.sessionTypes.map((type) => (
                  <button
                    className={sessionType === type ? styles.segmentedActive : ""}
                    key={type}
                    onClick={() => setSessionType(type)}
                    type="button"
                    aria-pressed={sessionType === type}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Date</label>
                <input className={styles.field} readOnly value="Sat · 16 May 2026" />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Duration</label>
                <select className={styles.field} defaultValue="90 minutes — Rp 675k">
                  <option>60 minutes — Rp 450k</option>
                  <option>90 minutes — Rp 675k</option>
                  <option>2 hours — Rp 900k</option>
                  <option>Half-day · 4 hrs — Rp 1.700k</option>
                </select>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Time of day</label>
              <div className={styles.slots}>
                {content.booking.timeSlots.map((slot) => (
                  <button
                    className={`${timeSlot === slot.label ? styles.slotActive : ""} ${slot.disabled ? styles.slotDisabled : ""}`}
                    disabled={slot.disabled}
                    key={slot.label}
                    onClick={() => setTimeSlot(slot.label)}
                    type="button"
                    aria-pressed={timeSlot === slot.label}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Location · Sari&apos;s territory</label>
              <select className={styles.field} defaultValue={content.booking.locations[1]}>
                {content.booking.locations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Brief — what should we capture?</label>
              <textarea className={styles.field} defaultValue={content.booking.brief} />
            </div>

            <div className={styles.formFoot}>
              <div className={styles.total}>
                <div>Rp 675.000</div>
                <span>90 min · {selectedPhotographer.name} · golden hour</span>
              </div>
              <button className={styles.submitButton} type="submit">
                Send booking request <span>→</span>
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}

function PhotographerCard({
  photographer,
  delay,
}: {
  photographer: PhotographerProfile;
  delay: number;
}) {
  const profileHref = `/photographers/${photographer.slug}`;
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`${styles.card} reveal ${isVisible ? "is-visible" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <div className={styles.cardTop}>
        <div className={styles.avatar}>
          <Image
            src={photographer.avatarUrl}
            alt={photographer.name}
            fill
            sizes="64px"
            className={styles.image}
          />
          {photographer.isLive && <span />}
        </div>
        <div className={styles.photographerMeta}>
          <h2>{photographer.name}</h2>
          <div><span />{photographer.spec}</div>
        </div>
        <div className={styles.rating}>
          <div><span>{photographer.ratingStars}</span>{photographer.mutedStars}</div>
          <small>{photographer.ratingMeta}</small>
        </div>
      </div>
      <p className={styles.quote}>{photographer.quote}</p>
      <div className={styles.thumbs}>
        {photographer.thumbnails.map((thumb) => (
          <Link className={styles.thumb} href="/explorer" key={`${photographer.name}-${thumb}`}>
            <Image
              src={thumb}
              alt=""
              fill
              sizes="(max-width: 720px) 30vw, 120px"
              className={styles.image}
            />
          </Link>
        ))}
      </div>
      <div className={styles.tags}>
        {photographer.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className={styles.cardStats}>
        <div><strong>{photographer.momentsCaptured}</strong><span>Moments captured</span></div>
        <div><strong>{photographer.sessionsBooked}</strong><span>Sessions booked</span></div>
        <div><strong>{photographer.hourlyRate}</strong><span>From / hour</span></div>
      </div>
      <div className={styles.cardCta}>
        <Link className={styles.ghostButton} href={profileHref}>View profile</Link>
        <Link
          className={styles.darkButton}
          href={`${profileHref}#booking`}
        >
          Book session <span>→</span>
        </Link>
      </div>
    </article>
  );
}
