import { type SupportCategoryId } from "@/domains/support";

interface SupportCategoryIconProps {
  id: SupportCategoryId;
}

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
} as const;

export function SupportCategoryIcon({ id }: SupportCategoryIconProps) {
  switch (id) {
    case "payment":
      return (
        <svg {...ICON_PROPS}>
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M2.5 10h19" strokeLinecap="round" />
        </svg>
      );
    case "download":
      return (
        <svg {...ICON_PROPS}>
          <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "license":
      return (
        <svg {...ICON_PROPS}>
          <rect x="4" y="2.5" width="16" height="19" rx="2" />
          <path d="M8 7.5h8M8 11.5h8M8 15.5h5" strokeLinecap="round" />
        </svg>
      );
    case "refund":
      return (
        <svg {...ICON_PROPS}>
          <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "account":
      return (
        <svg {...ICON_PROPS}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
        </svg>
      );
    case "privacy":
      return (
        <svg {...ICON_PROPS}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" strokeLinejoin="round" />
        </svg>
      );
  }
}
