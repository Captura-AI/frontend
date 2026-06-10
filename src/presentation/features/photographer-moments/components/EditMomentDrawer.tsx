import { type Moment, type VehicleType } from "@/domains/photographer-moments";
import { LICENSE_OPTIONS, vehicleLabels } from "../lib/moment-helpers";
import styles from "./EditMomentDrawer.module.css";

interface EditMomentDrawerProps {
  moment: Moment;
  onClose: () => void;
}

const VEHICLE_OPTIONS: VehicleType[] = ["bicycle", "bus", "car", "motorcycle", "truck", "other"];

export function EditMomentDrawer({ moment, onClose }: EditMomentDrawerProps) {
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

        <form className={styles.drawerBody} onSubmit={(event) => event.preventDefault()}>
          <div className={styles.field}>
            <label htmlFor="moment-title">Title</label>
            <input id="moment-title" type="text" defaultValue={moment.title} />
          </div>

          <div className={styles.field}>
            <label htmlFor="moment-story">Story</label>
            <textarea id="moment-story" rows={4} defaultValue={moment.story} />
          </div>

          <div className={styles.field}>
            <label htmlFor="moment-tags">Tags</label>
            <input id="moment-tags" type="text" defaultValue={moment.tags.join(", ")} placeholder="Comma-separated" />
          </div>

          <div className={styles.field}>
            <label htmlFor="moment-location">Location</label>
            <input id="moment-location" type="text" defaultValue={moment.location} />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="moment-date">Captured date</label>
              <input id="moment-date" type="date" defaultValue={moment.capturedDate} />
            </div>
            <div className={styles.field}>
              <label htmlFor="moment-time">Captured time</label>
              <input id="moment-time" type="time" defaultValue={moment.capturedTime} />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="moment-vehicle">Vehicle type</label>
            <select id="moment-vehicle" defaultValue={moment.vehicleType}>
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
                <input id="moment-plate-masked" type="text" defaultValue={moment.plate.masked} />
              </div>
              <div>
                <label htmlFor="moment-plate-full">Internal (full)</label>
                <input id="moment-plate-full" type="text" defaultValue={moment.plate.full} />
              </div>
            </div>
            <p className={styles.helperNote}>
              The full plate stays private — only the masked version is ever shown publicly.
            </p>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="moment-price">Price (Rp)</label>
              <input id="moment-price" type="number" min={0} step={5000} defaultValue={moment.price} />
            </div>
            <div className={styles.field}>
              <label htmlFor="moment-license">License</label>
              <select id="moment-license" defaultValue={moment.license}>
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
          <p className={styles.helperNote}>
            Editing UI is a preview — saving will sync with the catalog API in a later phase.
          </p>
          <div className={styles.footerActions}>
            <button type="button" className={styles.secondaryButton} onClick={onClose}>
              Close
            </button>
            <button type="button" className={styles.primaryButton} onClick={onClose}>
              Save changes
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}
