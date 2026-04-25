import { type Metadata } from "next";
import { generatePageSeo } from "@/application/seo";
import { LoginPageView } from "@/presentation/features/login";

export const metadata: Metadata = generatePageSeo({
  title: "Sign In to Your Account",
  description:
    "Sign in to your FE Scanner account to access your dashboard and manage your projects.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return <LoginPageView />;
}
