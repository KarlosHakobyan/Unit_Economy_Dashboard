# Unit Economics & Break-even Dashboard (CAC / LTV / Break-even)

Interactive web-based calculator and analytics dashboard for modeling **Unit Economics**, **Customer Acquisition Cost (CAC)**, **Lifetime Value (LTV)**, and **Break-even Point (BEP)** in real time.

Built with vanilla **HTML5**, **CSS3**, **JavaScript (ES6+)**, and **Chart.js** with zero build steps required.

---

## Key Features

- **Real-Time Financial Modeling:** Instant recalculation of KPIs, health status indicators, formula tables, and charts as you adjust inputs via number fields or sliders.
- **Business Model Presets:** One-click templates for **SaaS**, **E-commerce**, and **Service** businesses.
- **Multi-Currency Support with Auto FX Conversion:** Switch between **$ USD**, **€ EUR**, **₽ RUB**, and **֏ AMD** with customizable exchange rates relative to `$` (USD) and automatic scaling of monetary inputs, tables, and chart axes.
- **Multi-Language Interface:** Full localization in **English (`EN`)**, **Russian (`RU`)**, and **Armenian (`HY`)**.
- **Interactive Visualizations:**
  - **Break-even Analysis Chart:** Revenue vs. Total Costs (OPEX + Marketing + COGS) and Fixed Costs across sales volumes.
  - **Cohort Payback Chart (CAC vs. LTV):** Cumulative customer gross profit over lifetime months against acquisition cost.
- **Built-in Guide & Glossary (`Info` Modal):** Step-by-step usage instructions and definitions of core financial metrics.
- **Dark & Light Themes:** Seamless theme switching with high-contrast UI components.
- **Data Export:** Copy a formatted summary report to the clipboard or export full metrics to **CSV** and **JSON**.

---

## Project Structure

```text
├── index.html   # Semantic layout, controls, KPI cards, chart containers, and Info modal
├── styles.css   # Custom CSS variables, responsive grid, dark/light themes, and modal styling
├── app.js       # Financial engine, FX rate converter, i18n dictionary, Chart.js rendering, and export logic
└── README.md    # Project documentation
```

---

## Core Formulas Used

| Metric | Formula | Benchmark |
| :--- | :--- | :--- |
| **CPL** (Cost Per Lead) | $\text{Marketing Budget} / \text{Leads}$ | Minimize |
| **CAC** (Customer Acquisition Cost) | $\text{Marketing Budget} / (\text{Leads} \times \text{CR})$ | $< \text{LTV} / 3$ |
| **LTV** (Gross Profit Lifetime Value) | $\text{AOV} \times \text{APC} \times \text{Gross Margin \%} \times \text{Lifetime}$ | $> 3 \times \text{CAC}$ |
| **LTV / CAC Ratio** | $\text{LTV} / \text{CAC}$ | $\ge 3.0\text{x}$ |
| **CAC Payback Period** | $\text{CAC} / \text{Monthly Customer Gross Margin}$ | $\le 6\text{–}12\text{ mo}$ |
| **Break-even Point (Units)** | $\lceil (\text{OPEX} + \text{Marketing Budget}) / \text{Unit Margin} \rceil$ | Lower than monthly orders |
| **Break-even Point (Revenue)** | $(\text{OPEX} + \text{Marketing Budget}) / \text{Gross Margin \%}$ | Lower than monthly revenue |
| **Net Profit (EBITDA)** | $\text{Total Contribution Margin} - (\text{OPEX} + \text{Marketing Budget})$ | $> 0$ |

---

## Getting Started

1. Clone or download the repository into a local folder:
   ```bash
   git clone <your-repository-url>
   ```
2. Open `index.html` directly in any modern web browser (Chrome, Firefox, Edge, Safari) — no server or bundler installation is required.

---

## License

(C) Karlos Hakobyan
