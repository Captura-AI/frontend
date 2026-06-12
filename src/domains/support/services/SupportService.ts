import { type SupportPage } from "../entities/SupportPage";

/**
 * Returns static mock content for the Support page.
 *
 * TODO: When the backend is ready, replace this with ISupportRepository:
 *   import { type ISupportRepository } from "@/infrastructure/repositories/ISupportRepository";
 *   return supportRepository.getSupportPageContent();
 */
export function getSupportPageContent(): SupportPage {
  return {
    hero: {
      eyebrow: "Support",
      titlePrefix: "How can we ",
      titleEmphasis: "help",
      lede:
        "Search the categories below for quick answers, or reach our team directly. A real person reads every message — usually within a day.",
    },
    categories: [
      {
        id: "payment",
        label: "Payments & billing",
        description: "Failed charges, payment methods, and receipts.",
      },
      {
        id: "download",
        label: "Downloads & files",
        description: "Trouble accessing or re-downloading a purchased moment.",
      },
      {
        id: "license",
        label: "Licenses & usage rights",
        description: "What you can and can't do with each license type.",
        href: "/licenses",
        linkLabel: "View license terms",
      },
      {
        id: "refund",
        label: "Refunds",
        description: "Request a refund within the 7-day window.",
      },
      {
        id: "account",
        label: "Account & profile",
        description: "Update your details, password, or notification settings.",
        href: "/account/profile",
        linkLabel: "Go to your profile",
      },
      {
        id: "privacy",
        label: "Privacy & removal",
        description: "Ask us to remove, hide, or correct a public moment.",
        href: "/privacy/removal",
        linkLabel: "Start a removal request",
      },
    ],
    faqs: [
      {
        category: "payment",
        question: "My card was charged but the order shows as failed.",
        answer:
          "This usually resolves itself within a few minutes as the payment confirms. If the order still shows as failed after 30 minutes, contact us with your order ID and we'll fix it or refund the charge in full.",
      },
      {
        category: "payment",
        question: "What payment methods does Captura accept?",
        answer:
          "We accept major debit and credit cards, QRIS, and the most common Indonesian e-wallets and bank transfer options at checkout.",
      },
      {
        category: "download",
        question: "Where can I find files I've already purchased?",
        answer:
          "Open Account → Library to see every moment you've licensed, along with download links, invoices, and license details for each order.",
      },
      {
        category: "download",
        question: "My download link expired — can I get a new one?",
        answer:
          "Download links don't expire for licenses you own. If a link isn't working, refresh the order from your library or contact us with the order ID and we'll re-issue it.",
      },
      {
        category: "license",
        question: "Can I use a Personal license photo on a brand's social media?",
        answer:
          "No — Personal licenses are for individual, non-commercial use only. For brand or business use, including social media promotion, choose the Commercial license.",
      },
      {
        category: "refund",
        question: "How long does a refund take to process?",
        answer:
          "Refunds are issued immediately on our side and typically appear on your statement within 3-7 business days, depending on your bank or payment provider.",
      },
      {
        category: "account",
        question: "How do I update my email or phone number?",
        answer:
          "Go to Account → Profile and edit your contact details directly. We'll send a confirmation link to any new email address before the change takes effect.",
      },
      {
        category: "privacy",
        question: "How do I ask for a photo of me to be removed?",
        answer:
          "Use the privacy and removal form to tell us which moment is affected and why. A real person reviews every request, usually within two business days.",
      },
    ],
    contact: {
      sectionTitle: "Still need help?",
      sectionMeta: "We're here for you",
      channels: [
        {
          label: "Email support",
          description: "Send the details of your issue, including any order ID, and we'll follow up by email.",
          actionLabel: "support@captura.id",
          href: "mailto:support@captura.id",
        },
        {
          label: "Live chat",
          description: "Chat with our team in real time, available daily from 9am to 9pm WIB.",
          actionLabel: "Start a conversation",
          href: "#",
        },
      ],
    },
  };
}
