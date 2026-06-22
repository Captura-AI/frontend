"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { createHttpClient, createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";
import styles from "../PhotographerUploadsPage.module.css";

type UploadState =
  | { type: "idle" }
  | { type: "uploading"; current: number; total: number }
  | { type: "done"; count: number; errors: string[] }
  | { type: "error"; message: string };

export function UploadDropzone({ helperText, acceptedFormats, maxFileSizeMb, maxBatchSize }: {
  helperText: string;
  acceptedFormats: string[];
  maxFileSizeMb: number;
  maxBatchSize: number;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<UploadState>({ type: "idle" });
  const [isDragOver, setIsDragOver] = useState(false);

  const http = useMemo(() => {
    const session = createSessionStore();
    return createHttpClient(apiConfig.baseUrl, session);
  }, []);

  async function uploadFiles(files: File[]) {
    if (files.length === 0) return;

    const maxBytes = maxFileSizeMb * 1024 * 1024;
    const oversized = files.filter((f) => f.size > maxBytes);

    if (oversized.length > 0) {
      setState({
        type: "error",
        message: `File terlalu besar: ${oversized.map((f) => f.name).join(", ")}. Maksimum ${maxFileSizeMb}MB per file.`,
      });
      return;
    }

    if (files.length > maxBatchSize) {
      setState({
        type: "error",
        message: `Terlalu banyak file. Maksimum ${maxBatchSize} frame per batch.`,
      });
      return;
    }

    setState({ type: "uploading", current: 0, total: files.length });

    const errors: string[] = [];
    let uploaded = 0;

    for (const file of files) {
      const caption = file.name.replace(/\.[^.]+$/, "");
      const form = new FormData();
      form.append("caption", caption);
      form.append("image", file);

      try {
        await http.post("/photographers/moments", form);
        uploaded += 1;
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Upload gagal";
        errors.push(`${file.name}: ${msg}`);
      }

      setState({ type: "uploading", current: uploaded + errors.length, total: files.length });
    }

    setState({ type: "done", count: uploaded, errors });

    if (uploaded > 0) {
      router.refresh();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    void uploadFiles(files);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(false);
    const files = Array.from(event.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/") || f.name.toLowerCase().endsWith(".raw")
    );
    void uploadFiles(files);
  }

  function handleReset() {
    setState({ type: "idle" });
  }

  const isUploading = state.type === "uploading";

  return (
    <div
      className={styles.dropzone}
      style={{ borderColor: isDragOver ? "var(--color-accent)" : undefined }}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        className={styles.visuallyHidden}
        type="file"
        multiple
        accept="image/jpeg,image/png,.raw"
        disabled={isUploading}
        onChange={handleChange}
      />

      {state.type === "idle" || state.type === "error" ? (
        <>
          <label className={styles.dropzoneLabel}>
            <span
              className={styles.primaryButton}
              style={{ cursor: "pointer" }}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
            >
              Browse files
            </span>
          </label>
          <p>{helperText}</p>
          <small>
            {acceptedFormats.join(" · ")} · up to {maxFileSizeMb}MB per file · max {maxBatchSize} frames per batch
          </small>
          {state.type === "error" ? (
            <p role="alert" style={{ color: "var(--color-danger, #ef4444)", fontSize: "0.8rem", marginTop: "0.25rem" }}>
              {state.message}
              {" "}
              <button type="button" onClick={handleReset} style={{ background: "none", border: "none", color: "inherit", textDecoration: "underline", cursor: "pointer", padding: 0 }}>
                Coba lagi
              </button>
            </p>
          ) : null}
        </>
      ) : null}

      {state.type === "uploading" ? (
        <>
          <p style={{ fontWeight: 500 }}>
            Mengupload {state.current} / {state.total} foto…
          </p>
          <div
            role="progressbar"
            aria-valuenow={state.current}
            aria-valuemin={0}
            aria-valuemax={state.total}
            style={{
              width: "100%",
              maxWidth: "280px",
              height: "4px",
              background: "var(--color-line)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(state.current / state.total) * 100}%`,
                background: "var(--color-accent)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <small>AI analysis akan berjalan otomatis setelah upload selesai.</small>
        </>
      ) : null}

      {state.type === "done" ? (
        <>
          <p style={{ fontWeight: 500, color: "var(--color-ink)" }}>
            {state.count > 0
              ? `${state.count} foto berhasil diupload dan sedang dianalisis AI.`
              : "Tidak ada foto yang berhasil diupload."}
          </p>
          {state.errors.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0, margin: "0.25rem 0 0", fontSize: "0.8rem", color: "var(--color-danger, #ef4444)", textAlign: "left" }}>
              {state.errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleReset}
            style={{ marginTop: "0.5rem" }}
          >
            Upload lebih banyak
          </button>
        </>
      ) : null}
    </div>
  );
}
