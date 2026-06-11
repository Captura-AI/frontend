"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  type PrivacyRemovalPage,
  type RemovalRequestTypeId,
} from "@/domains/privacy-removal";
import styles from "../PrivacyRemovalPage.module.css";

interface RemovalRequestFormProps {
  content: PrivacyRemovalPage;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConfirmationPanel({ confirmation }: { confirmation: PrivacyRemovalPage["confirmation"] }) {
  return (
    <div className={`${styles.panel} ${styles.confirmationCard}`}>
      <span className={styles.confirmationIcon}>
        <CheckIcon />
      </span>
      <h2>{confirmation.title}</h2>
      <p>{confirmation.description}</p>
      <ul className={styles.nextStepsList}>
        {confirmation.nextSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <Link className={styles.secondaryButton} href="/">
        Back to home
      </Link>
    </div>
  );
}

export function RemovalRequestForm({ content }: RemovalRequestFormProps) {
  const [selectedType, setSelectedType] = useState<RemovalRequestTypeId>(
    content.requestTypes[0]?.id ?? "remove-photo",
  );
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return <ConfirmationPanel confirmation={content.confirmation} />;
  }

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
      <div className={styles.sectionTitle}>
        <h2>{content.form.sectionTitle}</h2>
        <span>{content.form.sectionMeta}</span>
      </div>

      <fieldset className={styles.requestTypeGrid}>
        <legend className={styles.fieldsetLabel}>What&apos;s the issue?</legend>
        {content.requestTypes.map((type) => (
          <label
            className={`${styles.requestTypeCard} ${
              selectedType === type.id ? styles.requestTypeCardActive : ""
            }`}
            key={type.id}
          >
            <input
              checked={selectedType === type.id}
              name="request-type"
              onChange={() => setSelectedType(type.id)}
              type="radio"
              value={type.id}
            />
            <strong>{type.label}</strong>
            <p>{type.description}</p>
          </label>
        ))}
      </fieldset>

      <div className={styles.fieldGrid}>
        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="moment-ref">Moment URL or photo ID</label>
          <input
            id="moment-ref"
            name="moment-ref"
            placeholder="https://captura.id/explorer/m-1428 or m-1428"
            required
            type="text"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">
            Email <span>— for updates on this request</span>
          </label>
          <input id="email" name="email" placeholder="you@email.com" required type="email" />
        </div>
        <div className={styles.field}>
          <label htmlFor="phone">
            Phone <span>— optional</span>
          </label>
          <input id="phone" name="phone" placeholder="+62 812 3456 7890" type="tel" />
        </div>
        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="reason">Reason &amp; details</label>
          <textarea
            id="reason"
            name="reason"
            placeholder="Tell us what's wrong and why — the more context, the faster we can review."
            required
            rows={4}
          />
        </div>
        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="evidence">
            Supporting evidence <span>— optional</span>
          </label>
          <textarea
            id="evidence"
            name="evidence"
            placeholder="Link to a screenshot, ID document, or anything that helps us verify this request."
            rows={3}
          />
        </div>
      </div>

      <div className={styles.formFoot}>
        <p>By submitting, you agree we may contact you about this request and the moment in question.</p>
        <button className={styles.primaryButton} type="submit">
          Submit request
        </button>
      </div>
    </form>
  );
}
