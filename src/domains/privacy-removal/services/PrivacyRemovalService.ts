import { type PrivacyRemovalPage } from "../entities/PrivacyRemovalPage";

export function getPrivacyRemovalPageContent(): PrivacyRemovalPage {
  return {
    hero: {
      eyebrow: "Privacy & removal",
      titlePrefix: "Ask us to ",
      titleEmphasis: "fix or remove",
      lede:
        "If you're in a moment, on a plate, or in a caption that shouldn't be public, tell us what's wrong. A real person reviews every request — usually within two business days.",
    },
    requestTypes: [
      {
        id: "remove-photo",
        label: "Remove a photo",
        description:
          "Take a moment down entirely from search, profiles, and shared links.",
      },
      {
        id: "hide-plate",
        label: "Hide a plate number",
        description:
          "Mask or blur a visible plate so it no longer appears in the public photo.",
      },
      {
        id: "correct-metadata",
        label: "Correct metadata",
        description:
          "Fix a wrong location, time, vehicle type, or other caption detail.",
      },
      {
        id: "copyright",
        label: "Report a copyright issue",
        description:
          "Flag a moment you believe was uploaded without the right permissions.",
      },
    ],
    form: {
      sectionTitle: "Tell us what's wrong",
      sectionMeta: "Takes about 2 minutes",
    },
    processSteps: [
      {
        step: "01",
        title: "You submit",
        description:
          "Share the moment link or photo ID, pick a request type, and add any helpful context.",
      },
      {
        step: "02",
        title: "We review",
        description:
          "A trust & safety reviewer checks the moment against our publishing guidelines — no automated face matching is used.",
      },
      {
        step: "03",
        title: "We act and reply",
        description:
          "We hide, blur, correct, or remove the moment as needed and email you the outcome, usually within two business days.",
      },
    ],
    confirmation: {
      title: "Got it — your request is in.",
      description:
        "We've logged your request and sent a confirmation to your email. Our trust & safety team reviews requests in the order received.",
      nextSteps: [
        "You'll get an email update once a reviewer has looked at your request.",
        "Urgent safety concerns are prioritized ahead of the queue.",
        "You can reply to the confirmation email if you have more details to add.",
      ],
    },
    relatedLinks: [
      {
        label: "Read about our privacy approach",
        href: "/support",
        description: "How Captura masks plates and handles identifiable photos.",
      },
      {
        label: "Manage your account privacy settings",
        href: "/account/profile",
        description: "Control what's visible by default for moments you appear in.",
      },
      {
        label: "Browse license terms",
        href: "/licenses",
        description: "Understand what buyers can and can't do with a moment.",
      },
    ],
  };
}
