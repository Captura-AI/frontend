import { type CheckoutPage } from "../entities/CheckoutPage";

export function getCheckoutPageContent(): CheckoutPage {
  return {
    header: {
      title: "Almost",
      emphasis: "yours",
      status: "Order will complete in under a minute",
    },
    contact: {
      email: "ayaka@captura.studio",
      countries: ["Indonesia", "Singapore", "United States", "Japan", "United Kingdom", "Germany", "Australia"],
    },
    payment: {
      tabs: [
        {
          id: "local",
          label: "Indonesia",
          methods: [
            {
              id: "qris",
              logo: "QRIS",
              title: "QRIS · scan with any Indonesian app",
              subtitle: "GoPay · OVO · DANA · ShopeePay · LinkAja · BCA · Mandiri · BRI",
              meta: "No fee · Instant",
              feeType: "free",
              darkLogo: true,
            },
            {
              id: "va",
              logo: "VA",
              title: "Virtual Account · BCA, Mandiri, BNI, BRI, Permata",
              subtitle: "Pay from any Indonesian bank · 24-hour window",
              meta: "+ Rp 4,000 · ~5 min",
              feeType: "fee",
            },
            {
              id: "gopay",
              logo: "GoPay",
              title: "GoPay direct",
              subtitle: "Open Gojek app · approve · done",
              meta: "No fee · Instant",
              feeType: "free",
            },
            {
              id: "ovo",
              logo: "OVO",
              title: "OVO direct",
              subtitle: "Receive a push notification in OVO app",
              meta: "No fee · Instant",
              feeType: "free",
            },
            {
              id: "dana",
              logo: "DANA",
              title: "DANA",
              subtitle: "Approve from your DANA balance",
              meta: "No fee · Instant",
              feeType: "free",
            },
            {
              id: "alfamart",
              logo: "A·M",
              title: "Alfamart / Indomaret · over the counter",
              subtitle: "Pay cash at any minimarket within 24 hours",
              meta: "+ Rp 5,000 · <= 24h",
              feeType: "fee",
            },
          ],
        },
        {
          id: "card",
          label: "Card",
          methods: [
            {
              id: "card",
              logo: "VISA",
              title: "Credit / Debit card",
              subtitle: "Visa · Mastercard · JCB · American Express · Discover",
              darkLogo: true,
            },
          ],
        },
        {
          id: "wallet",
          label: "E-wallet",
          methods: [
            { id: "apple", logo: "Pay", title: "Apple Pay", subtitle: "Authenticate with Face ID · one tap", meta: "No fee · Instant", feeType: "free", darkLogo: true },
            { id: "google", logo: "G·Pay", title: "Google Pay", subtitle: "Approve from Android · one tap", meta: "No fee · Instant", feeType: "free" },
            { id: "paypal", logo: "PayPal", title: "PayPal", subtitle: "Log in to your PayPal account in a new window", meta: "+ 1.5% · Instant", feeType: "fee" },
            { id: "alipay", logo: "Ali", title: "Alipay", subtitle: "Scan from the Alipay app", meta: "No fee · Instant", feeType: "free" },
          ],
        },
        {
          id: "bank",
          label: "Bank transfer",
          methods: [
            { id: "sepa", logo: "SEPA", title: "SEPA bank transfer · EU", subtitle: "For accounts in 36 European countries", meta: "No fee · 1-2 days", feeType: "free" },
            { id: "wise", logo: "Wise", title: "Wise (international)", subtitle: "Mid-market rate · 40+ currencies", meta: "+ 0.4% · Same day", feeType: "fee" },
            { id: "ach", logo: "ACH", title: "ACH transfer · US", subtitle: "Verify with your US bank login", meta: "No fee · 2-3 days", feeType: "free" },
          ],
        },
      ],
      qrisApps: ["GoPay", "OVO", "DANA", "ShopeePay", "LinkAja", "BCA Mobile", "Livin' Mandiri", "BRImo", "Jenius"],
      cardBrands: ["VISA", "MC", "JCB", "AMEX"],
    },
    summary: {
      eyebrow: "Order summary · 1 moment",
      imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=200&q=70&auto=format&fit=crop",
      title: "Seen near Shibuya,",
      emphasis: "just before dusk",
      photographer: "By Ayaka Mori",
      license: "Personal print",
      edition: "Edition 1/25",
      file: "6720 x 8400 · TIFF",
      frame: "Frame No. 01428",
      subtotal: 48,
      serviceFeePct: 0.05,
      taxPct: 0.11,
      rateToIdr: 15750,
      promoCode: "DUSK15",
      promoPct: 0.15,
    },
  };
}
