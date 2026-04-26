import { AuthVisual } from "./components/AuthVisual";
import { AuthPanel } from "./components/AuthPanel";

/**
 * Full-screen auth page — fixed overlay so no Header/Footer show through.
 * z-[200] sits above the sticky header (z-[100]).
 */
export function LoginPageView() {
  return (
    <div
      className="fixed inset-0 z-[200] bg-bg overflow-hidden grid grid-cols-2"
      style={{ minHeight: "720px" }}
    >
      <AuthVisual />
      <AuthPanel />
    </div>
  );
}
