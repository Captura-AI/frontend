import { type Metadata } from "next";
import { LoginPageView } from "@/presentation/features/login";

export const metadata: Metadata = {
  title: "Sign in — Captura",
  description: "Sign in or create an account to find and license your moments.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginPageView />;
}
