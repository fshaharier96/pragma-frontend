import { Check } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PLANS = [
  {
    id: "standard",
    accent: "green",
    name: "Standard",
    tagline: "Track one location at a time. Pause or cancel anytime.",
    price: "$29",
    priceUnit: "/m",
    priceSub: "Pause or cancel anytime",
    ctaLabel: "Subscribe today",
    features: [
      { text: "Up to 500 SKUs tracked" },
      { text: "1 warehouse location" },
      { text: "Mobile barcode scanning" },
      { text: "Low-stock email alerts" },
      { text: "CSV import & export" },
      { text: "Credit card payments" },
      { text: "Pause or cancel anytime" },
    ],
    services: ["Stock tracking", "Barcode scanning", "CSV tools"],
  },
  {
    id: "growth",
    accent: "purple",
    name: "Growth",
    badge: "Popular",
    tagline: "Multi-channel, multi-location. Pause or cancel anytime.",
    price: "$89",
    priceUnit: "/m",
    priceSub: "Pause or cancel anytime",
    ctaLabel: "Subscribe today",
    features: [
      { text: "Up to 5,000 SKUs tracked", strong: true },
      { text: "5 warehouse locations", strong: true },
      { text: "Shopify & Amazon sync" },
      { text: "Purchase order automation" },
      { text: "Batch & lot tracking" },
      { text: "Credit card payments" },
      { text: "Pause or cancel anytime" },
    ],
    services: ["Multi-channel sync", "PO automation", "Batch tracking"],
  },
  {
    id: "scale",
    accent: "green",
    name: "Enterprise",
    tagline: "Ideal for large catalogs. Custom project scope.",
    price: "from $249",
    priceUnit: "/m",
    priceSub: "50% setup, 50% on go-live",
    ctaLabel: "Request quote",
    features: [
      { text: "Unlimited SKUs & locations" },
      { text: "Demand forecasting" },
      { text: "Full API access" },
      { text: "SSO & audit logs" },
      { text: "Tailored onboarding" },
      { text: "Flexible payment options" },
      { text: "Dedicated account manager" },
    ],
    services: ["API access", "Forecasting", "SSO"],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  return (
    <div className="pricing-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .pricing-root {
          --bg: #F4F3EE;
          --ink: #17181B;
          --muted: #706F6A;
          --card-border-alpha: 0.5;
          --green: #96AF41;
          --green-tint: #EEF3DC;
          --purple: #8B7EDB;
          --purple-tint: #ECE9F9;
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--bg);
          color: var(--ink);
          padding: 64px 20px;
          min-height: 100%;
        }
        .pricing-root * { box-sizing: border-box; }

        .wrap { max-width: 1080px; margin: 0 auto; }

        .page-head { text-align: center; margin-bottom: 40px; }
        .page-head h1 {
          font-size: clamp(26px, 4vw, 36px);
          font-weight: 700;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }
        .page-head p {
          color: var(--muted);
          font-size: 15px;
          margin: 0;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .cards { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
        }

        .card {
          position: relative;
          border-radius: 28px;
          padding: 30px 26px 28px;
          background: #FFFFFF;
          color: var(--ink);
        }
        .card.accent-green {
          border: 1.5px solid var(--green);
          background: radial-gradient(120% 100% at 50% 0%, var(--green-tint) 0%, #FFFFFF 100%);
          box-shadow: 0 0 0 1px rgba(150,175,65,0.08), 0 20px 44px -28px rgba(150,175,65,0.35);
        }
        .card.accent-purple {
          border: 1.5px solid var(--purple);
          background: radial-gradient(120% 100% at 50% 0%, var(--purple-tint) 0%, #FFFFFF 100%);
          box-shadow: 0 0 0 1px rgba(139,126,219,0.08), 0 20px 44px -28px rgba(139,126,219,0.35);
        }

        .badge {
          position: absolute;
          top: 24px;
          right: 24px;
          background: #050505;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .plan-name { font-size: 20px; font-weight: 700; margin: 0 0 6px; }
        .plan-tagline { font-size: 13px; color: var(--muted); line-height: 1.45; min-height: 36px; margin: 0 0 20px; }

        .price-row { display: flex; align-items: baseline; gap: 4px; }
        .price { font-size: 34px; font-weight: 700; letter-spacing: -0.02em; }
        .price-unit { font-size: 15px; color: var(--muted); }
        .price-sub { font-size: 12.5px; color: var(--muted); margin: 4px 0 22px; }

        .cta-btn {
          width: 100%;
          padding: 13px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: #050505;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s ease, transform 0.1s ease;
        }
        .cta-btn:hover { opacity: 0.88; }
        .cta-btn:active { transform: scale(0.99); }

        .call-link {
          display: block;
          text-align: center;
          margin-top: 12px;
          font-size: 13px;
          color: var(--ink);
          text-decoration: underline;
          text-underline-offset: 3px;
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          font-family: inherit;
        }
        .call-link:hover { color: var(--muted); }

        .divider {
          height: 1px;
          background: rgba(0,0,0,0.08);
          margin: 24px 0 20px;
        }

        .feature-list { list-style: none; margin: 0 0 22px; padding: 0; display: flex; flex-direction: column; gap: 11px; }
        .feature-list li { display: flex; align-items: flex-start; gap: 9px; font-size: 13.5px; color: #55564F; line-height: 1.4; }
        .feature-list li.strong { color: var(--ink); font-weight: 600; }
        .feature-list svg { flex: none; margin-top: 2px; color: var(--ink); opacity: 0.85; }

        .services-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 10px;
        }
        .services-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .pill {
          font-size: 12px;
          color: #4B4B46;
          background: rgba(0,0,0,0.035);
          border: 1px solid rgba(0,0,0,0.1);
          padding: 5px 11px;
          border-radius: 999px;
        }
      `}</style>

      <div className="wrap">
        <div className="page-head">
          <h1>Choose your plan</h1>
          <p>Every tier ships with real-time stock counts and barcode scanning.</p>
        </div>

        <div className="cards">
          {PLANS.map((plan) => (
            <div key={plan.id} className={`card accent-${plan.accent}`}>
              {plan.badge && <span className="badge">{plan.badge}</span>}

              <h2 className="plan-name">{plan.name}</h2>
              <p className="plan-tagline">{plan.tagline}</p>

              <div className="price-row">
                <span className="price">{plan.price}</span>
                <span className="price-unit">{plan.priceUnit}</span>
              </div>
              <p className="price-sub">{plan.priceSub}</p>

              <button className="cta-btn">{plan.ctaLabel}</button>
              <button className="call-link">Book a call</button>

              <div className="divider" />

              <ul className="feature-list">
                {plan.features.map((f) => (
                  <li key={f.text} className={f.strong ? "strong" : ""}>
                    <Check size={15} strokeWidth={2.5} />
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <p className="services-label">Included services</p>
              <div className="services-pills">
                {plan.services.map((s) => (
                  <span key={s} className="pill">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}