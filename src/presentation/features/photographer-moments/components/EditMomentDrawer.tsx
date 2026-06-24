"use client";

import { useRef, useState } from "react";
import { type Moment, type VehicleType } from "@/domains/photographer-moments";
import { patchMoment } from "../lib/momentsApi";
import { LICENSE_OPTIONS, vehicleLabels } from "../lib/moment-helpers";
import styles from "./EditMomentDrawer.module.css";

interface EditMomentDrawerProps {
  moment: Moment;
  onClose: () => void;
  onSaved: (momentId: string, updates: Partial<Moment>) => void;
}

type SaveState = "idle" | "pending" | "error";

const VEHICLE_OPTIONS: VehicleType[] = ["bicycle", "bus", "car", "motorcycle", "truck", "other"];

export function EditMomentDrawer({ moment, onClose, onSaved }: EditMomentDrawerProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  async function handleSave() {
    if (!formRef.current || saveState === "pending") return;

    setSaveState("pending");

    const data = new FormData(formRef.current);
    const rawCaption = (data.get("caption") as string).trim();
    const rawStory = (data.get("story") as string).trim();
    const rawTags = (data.get("tags") as string).trim();
    const rawLocation = (data.get("location") as string).trim();
    const rawVehicle = data.get("vehicleType") as string;
    const rawPlate = (data.get("licensePlate") as string).trim();
    const rawLicense = data.get("license") as string;

    const locationParts = rawLocation.split(",").map((s) => s.trim());
    const tags = rawTags ? rawTags.split(",").map((t) => t.trim()).filter(Boolean) : [];

    try {
      await patchMoment(moment.id, {
        caption: rawCaption,
        story: rawStory,
        tags,
        district: locationParts[0] ?? "",
        city: locationParts[1] ?? "",
        vehicleType: rawVehicle,
        licensePlate: rawPlate,
        licenses: rawLicense ? [rawLicense] : undefined,
      });

      onSaved(moment.id, {
        title: rawCaption || moment.title,
        story: rawStory,
        tags,
        location: rawLocation || moment.location,
        vehicleType: (rawVehicle as VehicleType) ?? moment.vehicleType,
        plate: { ...moment.plate, full: rawPlate || moment.plate.full },
        license: (rawLicense as Moment["license"]) ?? moment.license,
      });

      setSaveState("idle");
      onClose();
    } catch {
      setSaveState("error");
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label={`Edit metadata for ${moment.title}`}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.drawerHeader}>
          <div>
            <span className={styles.eyebrow}>Edit metadata</span>
            <h2>{moment.title}</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close drawer">
            ×
          </button>
        </header>

        <form ref={formRef} className={styles.drawerBody} onSubmit={(event) => event.preventDefault()}>
          <div className={styles.field}>
            <label htmlFor="moment-title">Title</label>
            <input id="moment-title" name="caption" type="text" defaultValue={moment.title} />
          </div>

          <div className={styles.field}>
            <label htmlFor="moment-story">Story</label>
            <textarea id="moment-story" name="story" rows={4} defaultValue={moment.story} />
          </div>

          <div className={styles.field}>
            <label htmlFor="moment-tags">Tags</label>
            <input
              id="moment-tags"
              name="tags"
              type="text"
              defaultValue={moment.tags.join(", ")}
              placeholder="Comma-separated"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="moment-location">Location</label>
            <input id="moment-location" name="location" type="text" defaultValue={moment.location} />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="moment-date">Captured date</label>
              <input id="moment-date" name="capturedDate" type="date" defaultValue={moment.capturedDate} />
            </div>
            <div className={styles.field}>
              <label htmlFor="moment-time">Captured time</label>
              <input id="moment-time" name="capturedTime" type="time" defaultValue={moment.capturedTime} />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="moment-vehicle">Vehicle type</label>
            <select id="moment-vehicle" name="vehicleType" defaultValue={moment.vehicleType}>
              {VEHICLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {vehicleLabels[option]}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>License plate</span>
            <div className={styles.plateRow}>
              <div>
                <label htmlFor="moment-plate-masked">Public (masked)</label>
                <input
                  id="moment-plate-masked"
                  name="plateMasked"
                  type="text"
                  defaultValue={moment.plate.masked}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="moment-plate-full">Internal (full)</label>
                <input id="moment-plate-full" name="licensePlate" type="text" defaultValue={moment.plate.full} />
              </div>
            </div>
            <p className={styles.helperNote}>
              The full plate stays private — only the masked version is ever shown publicly.
            </p>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="moment-price">Price (Rp)</label>
              <input id="moment-price" name="price" type="number" min={0} step={5000} defaultValue={moment.price} />
            </div>
            <div className={styles.field}>
              <label htmlFor="moment-license">License</label>
              <select id="moment-license" name="license" defaultValue={moment.license}>
                {LICENSE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        <footer className={styles.drawerFooter}>
          {saveState === "error" ? (
            <p className={styles.helperNote} style={{ color: "var(--color-danger, oklch(0.55 0.2 25))" }}>
              Failed to save — please try again.
            </p>
          ) : (
            <p className={styles.helperNote}>Changes sync immediately to your catalog.</p>
          )}

          <div className={styles.footerActions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={onClose}
              disabled={saveState === "pending"}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleSave}
              disabled={saveState === "pending"}
            >
              {saveState === "pending" ? "Saving…" : "Save changes"}
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}
