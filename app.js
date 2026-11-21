(() => {
  // Курс выбранной валюты к базовой валюте ($ USD): сколько единиц валюты за 1 USD
  const FX_TO_USD = {
    "$": 1,
    "€": 0.92,
    "₽": 95,
    "֏": 390,
  };

  const MONEY_FIELDS = new Set(["marketingBudget", "avgCheck", "fixedCosts"]);

  // Базовые пресеты заданы в USD ($)
  const PRESETS = {
    saas: {
      marketingBudget: 3000,
      leadsCount: 1200,
      conversionRate: 10,
      avgCheck: 50,
      repeatPurchases: 1.0,
      lifetimeMonths: 8,
      cogsPercent: 20,
      fixedCosts: 4500,
    },
    ecom: {
      marketingBudget: 5000,
      leadsCount: 4000,
      conversionRate: 5,
      avgCheck: 65,
      repeatPurchases: 1.4,
      lifetimeMonths: 4,
      cogsPercent: 52,
      fixedCosts: 4000,
    },
    service: {
      marketingBudget: 2000,
      leadsCount: 350,
      conversionRate: 18,
      avgCheck: 130,
      repeatPurchases: 1.2,
      lifetimeMonths: 6,
      cogsPercent: 35,
      fixedCosts: 3400,
    },
  };

  const I18N = {
    en: {
      locale: "en-US",
      appTitle: "Unit Economics & Break-even",
      appSubtitle: "Interactive calculator for CAC, LTV, contribution margin, and break-even point",
      presetSaas: "SaaS",
      presetEcom: "E-commerce",
      presetService: "Service",
      fxRateLabel: "Rate to $:",
      fxAutoLabel: "Auto",
      infoBtnText: "Info",
      paramsTitle: "Model Parameters",
      resetBtn: "Reset",
      secAcquisition: "1. Acquisition & Traffic",
      lblBudget: "Marketing Budget / mo",
      lblLeads: "Leads / Inquiries",
      unitPcs: "pcs",
      lblCr: "Conversion Rate (CR)",
      secMonetization: "2. Monetization & Retention",
      lblAov: "Average Order Value (AOV)",
      lblApc: "Purchases per Customer (APC / mo)",
      unitTimes: "times",
      lblLifetime: "Customer Lifetime",
      unitMonths: "mo",
      secCosts: "3. Costs (COGS & OPEX)",
      lblCogs: "Variable Costs (COGS)",
      unitOfCheck: "% of AOV",
      lblOpex: "Fixed Costs (OPEX / mo)",
      btnCopy: "Copy Report",
      kpiCacTitle: "CAC (Customer Acquisition Cost)",
      kpiLtvTitle: "LTV (Customer Gross Profit)",
      kpiBepTitle: "Break-even Point",
      kpiContribTitle: "Contribution Margin / mo",
      kpiProfitTitle: "Net Profit / mo (EBITDA)",
      chartBepTitle: "Break-even Analysis Chart",
      chartBepBadge: "Revenue vs Costs",
      chartLtvTitle: "Cohort Payback (CAC vs LTV)",
      chartLtvBadge: "By Customer Lifetime",
      tableTitle: "Breakdown & Sensitivity Formulas",
      tableBadge: "Formulas Summary",
      thMetric: "Metric",
      thFormula: "Formula",
      thCurrent: "Current Value",
      thTarget: "Target Benchmark",
      modalTitle: "Unit Economics Guide & Instructions",
      modalCloseBtn: "Got it",
      customersLbl: "Customers",
      ltvRevLbl: "LTV Revenue",
      paybackLbl: "CAC Payback",
      moShort: "mo",
      salesUnit: "sales",
      unreachable: "Unreachable",
      bepRevLbl: "BEP Revenue",
      marginLbl: "Margin",
      perUnit: "unit",
      safetyLbl: "Margin of safety",
      healthGoodTitle: "Healthy Unit Economics & Operating Profit",
      healthGoodDesc: (ratio) => `LTV/CAC = ${ratio}x (target ≥ 3x), business operates above the break-even point.`,
      healthWarnVolTitle: "Strong LTV/CAC, but Volume Below Break-even",
      healthWarnVolDesc: (ratio, bep) => `Acquisition pays off (${ratio}x), but you need at least ${bep} sales/mo to cover OPEX.`,
      healthWarnMargTitle: "Borderline Unit Economics",
      healthWarnMargDesc: (ratio) => `LTV/CAC = ${ratio}x. Consider improving conversion rate, AOV, or retention.`,
      healthBadTitle: "Unprofitable Unit Economics (LTV ≤ CAC)",
      healthBadDesc: "Acquiring each new customer loses money. Reduce CAC or increase gross margin immediately.",
      rowCpl: "CPL (Cost Per Lead)",
      formCpl: "Marketing Budget / Leads",
      targMin: "Minimize",
      rowCac: "CAC (Customer Acquisition Cost)",
      formCac: "Marketing Budget / Customers",
      rowLtv: "LTV (Gross Profit)",
      formLtv: "AOV × Frequency × Margin × Lifetime",
      rowRatio: "LTV / CAC Ratio",
      formRatio: "LTV / CAC",
      rowPayback: "CAC Payback Period",
      formPayback: "CAC / Monthly Customer Margin",
      targPayback: "≤ 6–12 mo",
      rowBepUnits: "Break-even Point (units)",
      formBepUnits: "(OPEX + Marketing) / Unit Margin",
      targPlan: "Current plan",
      rowBepRev: "Break-even Point (revenue)",
      formBepRev: "(OPEX + Marketing) / Margin %",
      targCurr: "Current",
      dsRevenue: "Revenue",
      dsTotalCost: "Total Costs (OPEX + Marketing + COGS)",
      dsFixedCost: "Fixed + Marketing",
      dsCumLtv: "Cumulative Customer Margin (LTV)",
      dsCacLine: "Acquisition Cost (CAC)",
      axisPcs: "pcs",
      axisMo: "Mo",
      toastReset: "Parameters reset to preset",
      toastCopied: "Report copied to clipboard",
      toastCopyErr: "Failed to copy report",
      toastCsv: "unit-economics.csv downloaded",
      toastJson: "unit-economics.json downloaded",
      repHeader: "Unit Economics Report",
      repBep: "Break-even Point",
      repProfit: "Net Profit / mo",
      csvMetric: "Metric",
      csvValue: "Value",
      csvCurrency: "Currency",
      infoHowTitle: "How to Use This Calculator",
      infoSteps: [
        "Pick a business model preset in the header (SaaS, E-commerce, or Service) or enter your custom figures.",
        "When Auto is enabled, changing currency converts monetary inputs, formulas, and charts via the rate to $ (editable anytime).",
        "Set your acquisition funnel: monthly marketing budget, total leads, and lead-to-customer conversion rate.",
        "Specify Average Order Value (AOV), monthly purchase frequency, and average customer lifetime in months.",
        "Enter variable order costs (COGS %) and fixed monthly overhead expenses (OPEX)."
      ],
      infoTermsTitle: "Key Metrics Glossary",
      glossary: [
        { term: "CPL (Cost Per Lead)", desc: "The cost of generating a single lead or inquiry. Calculated as Marketing Budget / Leads." },
        { term: "CAC (Customer Acquisition Cost)", desc: "Total marketing spend required to acquire one paying customer." },
        { term: "LTV (Lifetime Value)", desc: "Total gross profit generated by a single customer over their entire relationship." },
        { term: "LTV / CAC Ratio", desc: "Core unit economics benchmark. A ratio of ≥ 3.0x indicates a healthy business model." },
        { term: "COGS & OPEX", desc: "COGS: variable costs per order. OPEX: fixed overhead (salaries, rent, software)." },
        { term: "Break-even Point", desc: "The sales volume and revenue where contribution margin covers all fixed costs and marketing." }
      ]
    },

    ru: {
      locale: "ru-RU",
      appTitle: "Unit-экономика & Break-even",
      appSubtitle: "Интерактивный расчет CAC, LTV, маржинальности и точки безубыточности",
      presetSaas: "SaaS",
      presetEcom: "E-commerce",
      presetService: "Сервис",
      fxRateLabel: "Курс к $:",
      fxAutoLabel: "Авто",
      infoBtnText: "Инфо",
      paramsTitle: "Параметры модели",
      resetBtn: "Сбросить",
      secAcquisition: "1. Привлечение и трафик",
      lblBudget: "Маркетинговый бюджет / мес",
      lblLeads: "Лиды / заявки (Leads)",
      unitPcs: "шт.",
      lblCr: "Конверсия в покупку (CR)",
      secMonetization: "2. Монетизация и удержание",
      lblAov: "Средний чек (AOV)",
      lblApc: "Покупок на клиента (APC / мес)",
      unitTimes: "раз",
      lblLifetime: "Срок жизни клиента (Lifetime)",
      unitMonths: "мес.",
      secCosts: "3. Расходы (COGS и OPEX)",
      lblCogs: "Переменные расходы (COGS)",
      unitOfCheck: "% от чека",
      lblOpex: "Постоянные расходы (OPEX / мес)",
      btnCopy: "Копировать отчет",
      kpiCacTitle: "CAC (Стоимость клиента)",
      kpiLtvTitle: "LTV (Валовая прибыль с клиента)",
      kpiBepTitle: "Точка безубыточности",
      kpiContribTitle: "Маржинальный доход / мес",
      kpiProfitTitle: "Чистая прибыль / мес (EBITDA)",
      chartBepTitle: "График точки безубыточности (Break-even)",
      chartBepBadge: "Выручка vs Расходы",
      chartLtvTitle: "Когортная окупаемость клиента (CAC vs LTV)",
      chartLtvBadge: "По месяцам жизни",
      tableTitle: "Детализация и анализ чувствительности",
      tableBadge: "Сводка формул",
      thMetric: "Метрика",
      thFormula: "Формула расчета",
      thCurrent: "Текущее значение",
      thTarget: "Целевой ориентир",
      modalTitle: "Справка по Unit-экономике и инструкция",
      modalCloseBtn: "Понятно",
      customersLbl: "Клиентов",
      ltvRevLbl: "Выручка LTV",
      paybackLbl: "Окупаемость CAC",
      moShort: "мес.",
      salesUnit: "продаж",
      unreachable: "Недостижима",
      bepRevLbl: "Выручка BEP",
      marginLbl: "Маржа",
      perUnit: "ед.",
      safetyLbl: "Запас прочности",
      healthGoodTitle: "Сильная Unit-экономика и операционная прибыль",
      healthGoodDesc: (ratio) => `LTV/CAC = ${ratio}x (норма ≥ 3x), проект выше точки безубыточности.`,
      healthWarnVolTitle: "Хороший LTV/CAC, но не хватает объема до Break-even",
      healthWarnVolDesc: (ratio, bep) => `Привлечение окупается (${ratio}x), но нужно минимум ${bep} продаж/мес для покрытия OPEX.`,
      healthWarnMargTitle: "Пограничная Unit-экономика",
      healthWarnMargDesc: (ratio) => `LTV/CAC = ${ratio}x. Рекомендуется повысить конверсию, чек или Retention.`,
      healthBadTitle: "Убыточная Unit-экономика (LTV ≤ CAC)",
      healthBadDesc: "Привлечение каждого нового клиента сжигает бюджет. Срочно снизьте CAC или поднимите маржу.",
      rowCpl: "CPL (Цена лида)",
      formCpl: "Маркетинг / Лиды",
      targMin: "Минимизация",
      rowCac: "CAC (Цена клиента)",
      formCac: "Маркетинг / Клиенты",
      rowLtv: "LTV (Валовая прибыль)",
      formLtv: "Чек × Частота × Маржа × Lifetime",
      rowRatio: "Соотношение LTV / CAC",
      formRatio: "LTV / CAC",
      rowPayback: "CAC Payback Period",
      formPayback: "CAC / Месячная маржа клиента",
      targPayback: "≤ 6–12 мес.",
      rowBepUnits: "Точка безубыточности (шт.)",
      formBepUnits: "(OPEX + Маркетинг) / Маржа ед.",
      targPlan: "Текущий план",
      rowBepRev: "Точка безубыточности (выручка)",
      formBepRev: "(OPEX + Маркетинг) / Маржа %",
      targCurr: "Текущая",
      dsRevenue: "Выручка",
      dsTotalCost: "Общие расходы (OPEX + Маркетинг + COGS)",
      dsFixedCost: "Постоянные + Маркетинг",
      dsCumLtv: "Накопленная маржа с клиента (LTV)",
      dsCacLine: "Стоимость привлечения (CAC)",
      axisPcs: "шт.",
      axisMo: "Мес.",
      toastReset: "Параметры сброшены к пресету",
      toastCopied: "Отчет скопирован в буфер обмена",
      toastCopyErr: "Не удалось скопировать отчет",
      toastCsv: "Файл unit-economics.csv скачан",
      toastJson: "Файл unit-economics.json скачан",
      repHeader: "Отчет Unit-экономики",
      repBep: "Точка безубыточности",
      repProfit: "Чистая прибыль / мес",
      csvMetric: "Показатель",
      csvValue: "Значение",
      csvCurrency: "Валюта",
      infoHowTitle: "Как пользоваться калькулятором",
      infoSteps: [
        "Выберите шаблон бизнес-модели в шапке (SaaS, E-commerce или Сервис) либо задайте свои значения.",
        "При включенном «Авто» смена валюты пересчитывает денежные параметры и графики по курсу к $ (курс можно поправить вручную).",
        "Настройте воронку привлечения: рекламный бюджет, количество заявок (лидов) и конверсию в оплату.",
        "Укажите средний чек, частоту покупок в месяц и средний срок жизни клиента (Lifetime).",
        "Внесите переменные расходы на заказ (COGS %) и постоянные ежемесячные расходы компании (OPEX)."
      ],
      infoTermsTitle: "Словарь ключевых метрик",
      glossary: [
        { term: "CPL (Cost Per Lead)", desc: "Стоимость привлечения одного лида или заявки. Рассчитывается как Бюджет / Лиды." },
        { term: "CAC (Customer Acquisition Cost)", desc: "Стоимость привлечения одного платящего клиента с учетом конверсии." },
        { term: "LTV (Lifetime Value)", desc: "Совокупная валовая прибыль, которую приносит один клиент за все время работы с вами." },
        { term: "LTV / CAC", desc: "Главный индикатор эффективности. Значение ≥ 3.0x считается здоровым и готовым к масштабированию." },
        { term: "COGS & OPEX", desc: "COGS — переменные расходы на исполнение заказа. OPEX — постоянные расходы (офис, ФОТ, софт)." },
        { term: "Break-even (Точка безубыточности)", desc: "Объем продаж и выручки, при котором маржа полностью покрывает постоянные расходы и маркетинг." }
      ]
    },

    hy: {
      locale: "hy-AM",
      appTitle: "Unit-տնտեսագիտություն & Break-even",
      appSubtitle: "CAC, LTV, մարժինալության և անվնասաբերության կետի ինտերակտիվ հաշվարկ",
      presetSaas: "SaaS",
      presetEcom: "E-commerce",
      presetService: "Ծառայություն",
      fxRateLabel: "Կուրսը $-ով:",
      fxAutoLabel: "Ավտո",
      infoBtnText: "Ինֆո",
      paramsTitle: "Մոդելի պարամետրեր",
      resetBtn: "Վերականգնել",
      secAcquisition: "1. Ներգրավում և տրաֆիկ",
      lblBudget: "Մարքեթինգային բյուջե / ամիս",
      lblLeads: "Լիդեր / հայտեր (Leads)",
      unitPcs: "հատ",
      lblCr: "Գնման փոխարկում (CR)",
      secMonetization: "2. Մոնետիզացիա և պահպանում",
      lblAov: "Միջին չեկ (AOV)",
      lblApc: "Գնումներ մեկ հաճախորդից (APC / ամիս)",
      unitTimes: "անգամ",
      lblLifetime: "Հաճախորդի կյանքի տևողություն (Lifetime)",
      unitMonths: "ամիս",
      secCosts: "3. Ծախսեր (COGS և OPEX)",
      lblCogs: "Փոփոխական ծախսեր (COGS)",
      unitOfCheck: "% չեկից",
      lblOpex: "Հաստատուն ծախսեր (OPEX / ամիս)",
      btnCopy: "Պատճենել հաշվետվությունը",
      kpiCacTitle: "CAC (Հաճախորդի ներգրավման արժեք)",
      kpiLtvTitle: "LTV (Համախառն շահույթ մեկ հաճախորդից)",
      kpiBepTitle: "Անվնասաբերության կետ (Break-even)",
      kpiContribTitle: "Մարժինալ եկամուտ / ամիս",
      kpiProfitTitle: "Զուտ շահույթ / ամիս (EBITDA)",
      chartBepTitle: "Անվնասաբերության կետի գրաֆիկ (Break-even)",
      chartBepBadge: "Հասույթ vs Ծախսեր",
      chartLtvTitle: "Հաճախորդի հետգնման գրաֆիկ (CAC vs LTV)",
      chartLtvBadge: "Ըստ ամիսների",
      tableTitle: "Մանրամասն հաշվարկ և բանաձևեր",
      tableBadge: "Բանաձևերի ամփոփում",
      thMetric: "Ցուցանիշ",
      thFormula: "Հաշվարկի բանաձև",
      thCurrent: "Ընթացիկ արժեք",
      thTarget: "Թիրախային կողմնորոշիչ",
      modalTitle: "Unit-տնտեսագիտության ուղեցույց և բացատրություն",
      modalCloseBtn: "Հասկանալի է",
      customersLbl: "Հաճախորդներ",
      ltvRevLbl: "LTV հասույթ",
      paybackLbl: "CAC հետգնում",
      moShort: "ամիս",
      salesUnit: "վաճառք",
      unreachable: "Անհասանելի է",
      bepRevLbl: "BEP հասույթ",
      marginLbl: "Մարժա",
      perUnit: "միավոր",
      safetyLbl: "Անվտանգության պաշար",
      healthGoodTitle: "Առողջ Unit-տնտեսագիտություն և գործառնական շահույթ",
      healthGoodDesc: (ratio) => `LTV/CAC = ${ratio}x (նորման ≥ 3x), նախագիծը բարձր է անվնասաբերության կետից։`,
      healthWarnVolTitle: "Լավ LTV/CAC, բայց ծավալը չի բավականացնում Break-even-ի համար",
      healthWarnVolDesc: (ratio, bep) => `Ներգրավումը ծախսածածկվում է (${ratio}x), սակայն OPEX-ը փակելու համար անհրաժեշտ է առնվազն ${bep} վաճառք/ամիս։`,
      healthWarnMargTitle: "Սահմանային Unit-տնտեսագիտություն",
      healthWarnMargDesc: (ratio) => `LTV/CAC = ${ratio}x։ Խորհուրդ է տրվում բարձրացնել փոխարկումը (CR), միջին չեկը կամ պահպանումը։`,
      healthBadTitle: "Վնասաբեր Unit-տնտեսագիտություն (LTV ≤ CAC)",
      healthBadDesc: "Յուրաքանչյուր նոր հաճախորդի ներգրավումը վնաս է բերում։ Անհրաժեշտ է նվազեցնել CAC-ը կամ բարձրացնել մարժան։",
      rowCpl: "CPL (Լիդի արժեք)",
      formCpl: "Մարքեթինգ / Լիդեր",
      targMin: "Նվազագույնի հասցնել",
      rowCac: "CAC (Հաճախորդի արժեք)",
      formCac: "Մարքեթինգ / Հաճախորդներ",
      rowLtv: "LTV (Համախառն շահույթ)",
      formLtv: "Չեկ × Հաճախականություն × Մարժա × Lifetime",
      rowRatio: "LTV / CAC հարաբերակցություն",
      formRatio: "LTV / CAC",
      rowPayback: "CAC Payback Period",
      formPayback: "CAC / Հաճախորդի ամսական մարժա",
      targPayback: "≤ 6–12 ամիս",
      rowBepUnits: "Անվնասաբերության կետ (քանակ)",
      formBepUnits: "(OPEX + Մարքեթինգ) / Միավորի մարժա",
      targPlan: "Ընթացիկ պլան",
      rowBepRev: "Անվնասաբերության կետ (հասույթ)",
      formBepRev: "(OPEX + Մարքեթինգ) / Մարժա %",
      targCurr: "Ընթացիկ",
      dsRevenue: "Հասույթ",
      dsTotalCost: "Ընդհանուր ծախսեր (OPEX + Մարքեթինգ + COGS)",
      dsFixedCost: "Հաստատուն + Մարքեթինգ",
      dsCumLtv: "Կուտակված մարժա հաճախորդից (LTV)",
      dsCacLine: "Ներգրավման արժեք (CAC)",
      axisPcs: "հատ",
      axisMo: "Ամիս",
      toastReset: "Պարամետրերը վերականգնված են",
      toastCopied: "Հաշվետվությունը պատճենված է",
      toastCopyErr: "Չհաջողվեց պատճենել հաշվետվությունը",
      toastCsv: "unit-economics.csv ֆայլը ներբեռնվեց",
      toastJson: "unit-economics.json ֆայլը ներբեռնվեց",
      repHeader: "Unit-տնտեսագիտության հաշվետվություն",
      repBep: "Անվնասաբերության կետ",
      repProfit: "Զուտ շահույթ / ամիս",
      csvMetric: "Ցուցանիշ",
      csvValue: "Արժեք",
      csvCurrency: "Արժույթ",
      infoHowTitle: "Ինչպես օգտվել հաշվիչից",
      infoSteps: [
        "Վերևի վահանակից ընտրեք բիզնես մոդելի նախատիպը (SaaS, E-commerce կամ Ծառայություն) կամ մուտքագրեք Ձեր տվյալները։",
        "«Ավտո» միացված լինելու դեպքում արժույթի փոփոխության ժամանակ դրամական դաշտերն ու գրաֆիկները վերահաշվարկվում են $-ի նկատմամբ կուրսով։",
        "Կարգավորեք ներգրավման ձագարը՝ մարքեթինգային բյուջեն, լիդերի քանակը և գնման փոխարկման տոկոսը (CR)։",
        "Նշեք միջին չեկը, ամսական գնումների հաճախականությունը և հաճախորդի կյանքի տևողությունը (Lifetime)։",
        "Մուտքագրեք պատվերի փոփոխական ծախսերը (COGS %) և ընկերության ամսական հաստատուն ծախսերը (OPEX)։"
      ],
      infoTermsTitle: "Հիմնական տերմինների բառարան",
      glossary: [
        { term: "CPL (Cost Per Lead)", desc: "Մեկ լիդի կամ հայտի ներգրավման արժեքը։ Հաշվարկվում է՝ Բյուջե / Լիդեր։" },
        { term: "CAC (Customer Acquisition Cost)", desc: "Մեկ վճարող հաճախորդի ներգրավման արժեքը՝ հաշվի առնելով փոխարկման տոկոսը։" },
        { term: "LTV (Lifetime Value)", desc: "Ընդհանուր համախառն շահույթը, որը բերում է մեկ հաճախորդը համագործակցության ողջ ընթացքում։" },
        { term: "LTV / CAC", desc: "Արդյունավետության գլխավոր ցուցանիշը։ ≥ 3.0x արժեքը համարվում է առողջ։" },
        { term: "COGS & OPEX", desc: "COGS՝ փոփոխական ծախսեր։ OPEX՝ հաստատուն ծախսեր (գրասենյակ, աշխատավարձ)։" },
        { term: "Break-even", desc: "Վաճառքի և հասույթի այն ծավալը, որի դեպքում շահույթը հավասար է 0-ի։" }
      ]
    }
  };

  const FIELD_IDS = [
    "marketingBudget",
    "leadsCount",
    "conversionRate",
    "avgCheck",
    "repeatPurchases",
    "lifetimeMonths",
    "cogsPercent",
    "fixedCosts",
  ];

  let currentLang = "en";
  let currentCurrency = "$";
  let rates = { ...FX_TO_USD };
  let activePreset = "saas";
  let bepChart = null;
  let ltvChart = null;
  let lastMetrics = null;

  const $ = (id) => document.getElementById(id);
  const t = () => I18N[currentLang];

  function getRate() {
    const r = parseFloat($("fxRateInput").value);
    return Number.isFinite(r) && r > 0 ? r : rates[currentCurrency] || 1;
  }

  function formatMoney(value) {
    if (!Number.isFinite(value)) return `${currentCurrency}0`;
    const absVal = Math.abs(value);
    const digits = absVal > 0 && absVal < 10 ? 2 : 0;
    const formatted = value.toLocaleString(t().locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    return currentCurrency === "$" ? `${value < 0 ? "-" : ""}$${Math.abs(Math.round(value * (digits ? 100 : 1)) / (digits ? 100 : 1)).toLocaleString(t().locale, { minimumFractionDigits: digits, maximumFractionDigits: digits })}` : `${formatted} ${currentCurrency}`;
  }

  function formatNum(value, digits = 2) {
    if (!Number.isFinite(value)) return "0";
    return value.toLocaleString(t().locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function renderModalContent() {
    const dict = t();
    const stepsHtml = dict.infoSteps.map((step) => `<li>${step}</li>`).join("");
    const glossaryHtml = dict.glossary
      .map(
        (item) => `
        <div class="glossary-item">
          <strong>${item.term}</strong>
          <p>${item.desc}</p>
        </div>`
      )
      .join("");

    $("modalBody").innerHTML = `
      <div class="info-section">
        <h3>${dict.infoHowTitle}</h3>
        <ol class="info-steps">${stepsHtml}</ol>
      </div>
      <div class="info-section">
        <h3>${dict.infoTermsTitle}</h3>
        <div class="glossary-grid">${glossaryHtml}</div>
      </div>
    `;
  }

  function applyLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;

    const dict = t();
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    renderModalContent();
    recalculate();
  }

  function readInputs() {
    const data = {};
    FIELD_IDS.forEach((id) => {
      data[id] = Math.max(0, parseFloat($(id).value) || 0);
    });
    return data;
  }

  function syncPair(id, value) {
    const numInput = $(id);
    const rangeInput = $(`${id}Range`);
    if (numInput) numInput.value = value;
    if (rangeInput) {
      const max = parseFloat(rangeInput.max);
      if (value > max) rangeInput.max = Math.ceil(value * 1.5);
      rangeInput.value = Math.min(value, parseFloat(rangeInput.max));
    }
  }

  function applyPreset(presetKey) {
    const preset = PRESETS[presetKey];
    if (!preset) return;
    activePreset = presetKey;

    document.querySelectorAll(".btn-preset").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.preset === presetKey);
    });

    const rate = getRate();
    FIELD_IDS.forEach((id) => {
      const usdVal = preset[id];
      const converted = MONEY_FIELDS.has(id) ? usdVal * rate : usdVal;
      const val = MONEY_FIELDS.has(id)
        ? (converted > 0 && converted < 10 ? Number(converted.toFixed(2)) : Math.round(converted))
        : usdVal;
      syncPair(id, val);
    });
    recalculate();
  }

  // Пересчет из прошлой валюты (oldRate единиц за 1$) в новую (newRate единиц за 1$)
  function convertInputsBetweenCurrencies(oldRate, newRate) {
    if (!oldRate || !newRate || oldRate === newRate) return;
    const factor = newRate / oldRate;
    MONEY_FIELDS.forEach((id) => {
      const currentVal = parseFloat($(id).value) || 0;
      const converted = currentVal * factor;
      const rounded = converted > 0 && converted < 10 ? Number(converted.toFixed(2)) : Math.round(converted);
      syncPair(id, rounded);
    });
  }

  function calculateMetrics(inputs) {
    const {
      marketingBudget,
      leadsCount,
      conversionRate,
      avgCheck,
      repeatPurchases,
      lifetimeMonths,
      cogsPercent,
      fixedCosts,
    } = inputs;

    const customers = leadsCount * (conversionRate / 100);
    const cpl = leadsCount > 0 ? marketingBudget / leadsCount : 0;
    const cac = customers > 0 ? marketingBudget / customers : 0;

    const monthlyRevenuePerCustomer = avgCheck * repeatPurchases;
    const grossMarginRatio = Math.max(0, (100 - cogsPercent) / 100);
    const monthlyContributionPerCustomer = monthlyRevenuePerCustomer * grossMarginRatio;

    const ltvRevenue = monthlyRevenuePerCustomer * lifetimeMonths;
    const ltv = monthlyContributionPerCustomer * lifetimeMonths;
    const ltvToCac = cac > 0 ? ltv / cac : 0;

    const paybackMonths =
      monthlyContributionPerCustomer > 0 ? cac / monthlyContributionPerCustomer : Infinity;

    const monthlyOrders = customers * repeatPurchases;
    const monthlyRevenue = monthlyOrders * avgCheck;
    const variableCostsTotal = monthlyRevenue * (cogsPercent / 100);
    const totalContributionMargin = monthlyRevenue - variableCostsTotal;

    const unitContribution = avgCheck * grossMarginRatio;

    const totalFixedMonthly = fixedCosts + marketingBudget;
    const bepUnits = unitContribution > 0 ? Math.ceil(totalFixedMonthly / unitContribution) : Infinity;
    const bepRevenue = grossMarginRatio > 0 ? totalFixedMonthly / grossMarginRatio : Infinity;

    const netProfit = totalContributionMargin - totalFixedMonthly;
    const safetyMargin =
      monthlyRevenue > 0 && Number.isFinite(bepRevenue)
        ? ((monthlyRevenue - bepRevenue) / monthlyRevenue) * 100
        : -100;

    return {
      inputs,
      customers,
      cpl,
      cac,
      monthlyRevenuePerCustomer,
      monthlyContributionPerCustomer,
      grossMarginRatio,
      ltvRevenue,
      ltv,
      ltvToCac,
      paybackMonths,
      monthlyOrders,
      monthlyRevenue,
      variableCostsTotal,
      totalContributionMargin,
      unitContribution,
      totalFixedMonthly,
      bepUnits,
      bepRevenue,
      netProfit,
      safetyMargin,
    };
  }

  function updateUI(m) {
    lastMetrics = m;
    const dict = t();

    $("kpiCac").textContent = formatMoney(m.cac);
    $("kpiCpl").textContent = `CPL: ${formatMoney(m.cpl)} • ${dict.customersLbl}: ${formatNum(m.customers, 1)}`;

    $("kpiLtv").textContent = formatMoney(m.ltv);
    $("kpiRevenuePerUser").textContent = `${dict.ltvRevLbl}: ${formatMoney(m.ltvRevenue)}`;

    const ratioEl = $("kpiRatio");
    ratioEl.textContent = `${formatNum(m.ltvToCac, 2)}x`;
    ratioEl.className =
      "kpi-value " + (m.ltvToCac >= 3 ? "text-good" : m.ltvToCac >= 1.5 ? "text-warn" : "text-bad");

    $("kpiPayback").textContent = Number.isFinite(m.paybackMonths)
      ? `${dict.paybackLbl}: ${formatNum(m.paybackMonths, 2)} ${dict.moShort}`
      : `${dict.paybackLbl}: —`;

    $("kpiBepUnits").textContent = Number.isFinite(m.bepUnits)
      ? `${m.bepUnits.toLocaleString(dict.locale)} ${dict.salesUnit}`
      : dict.unreachable;
    $("kpiBepRevenue").textContent = Number.isFinite(m.bepRevenue)
      ? `${dict.bepRevLbl}: ${formatMoney(m.bepRevenue)}`
      : `${dict.bepRevLbl}: —`;

    $("kpiContribution").textContent = formatMoney(m.totalContributionMargin);
    $("kpiMarginPercent").textContent = `${dict.marginLbl}: ${formatNum(m.grossMarginRatio * 100, 1)}% (${formatMoney(m.unitContribution)}/${dict.perUnit})`;

    const netEl = $("kpiNetProfit");
    netEl.textContent = formatMoney(m.netProfit);
    netEl.className = "kpi-value " + (m.netProfit >= 0 ? "text-good" : "text-bad");

    $("kpiSafetyMargin").textContent = Number.isFinite(m.safetyMargin)
      ? `${dict.safetyLbl}: ${formatNum(m.safetyMargin, 1)}%`
      : `${dict.safetyLbl}: —`;

    const banner = $("healthBanner");
    const title = $("healthTitle");
    const desc = $("healthDesc");
    const ratioStr = formatNum(m.ltvToCac, 2);

    banner.classList.remove("status-good", "status-warn", "status-bad");
    if (m.ltvToCac >= 3 && m.netProfit >= 0) {
      banner.classList.add("status-good");
      title.textContent = dict.healthGoodTitle;
      desc.textContent = dict.healthGoodDesc(ratioStr);
    } else if (m.ltvToCac >= 3 && m.netProfit < 0) {
      banner.classList.add("status-warn");
      title.textContent = dict.healthWarnVolTitle;
      desc.textContent = dict.healthWarnVolDesc(ratioStr, m.bepUnits.toLocaleString(dict.locale));
    } else if (m.ltvToCac >= 1.2) {
      banner.classList.add("status-warn");
      title.textContent = dict.healthWarnMargTitle;
      desc.textContent = dict.healthWarnMargDesc(ratioStr);
    } else {
      banner.classList.add("status-bad");
      title.textContent = dict.healthBadTitle;
      desc.textContent = dict.healthBadDesc;
    }

    const rows = [
      [dict.rowCpl, `<code>${dict.formCpl}</code>`, formatMoney(m.cpl), dict.targMin],
      [dict.rowCac, `<code>${dict.formCac}</code>`, formatMoney(m.cac), `< ${formatMoney(m.ltv / 3)}`],
      [dict.rowLtv, `<code>${dict.formLtv}</code>`, formatMoney(m.ltv), `> ${formatMoney(m.cac * 3)}`],
      [dict.rowRatio, `<code>${dict.formRatio}</code>`, `${ratioStr}x`, "≥ 3.0x"],
      [
        dict.rowPayback,
        `<code>${dict.formPayback}</code>`,
        Number.isFinite(m.paybackMonths) ? `${formatNum(m.paybackMonths, 2)} ${dict.moShort}` : "∞",
        dict.targPayback,
      ],
      [
        dict.rowBepUnits,
        `<code>${dict.formBepUnits}</code>`,
        Number.isFinite(m.bepUnits) ? `${m.bepUnits.toLocaleString(dict.locale)} ${dict.unitPcs}` : "∞",
        `${dict.targPlan}: ${Math.round(m.monthlyOrders)} ${dict.unitPcs}`,
      ],
      [
        dict.rowBepRev,
        `<code>${dict.formBepRev}</code>`,
        Number.isFinite(m.bepRevenue) ? formatMoney(m.bepRevenue) : "∞",
        `${dict.targCurr}: ${formatMoney(m.monthlyRevenue)}`,
      ],
    ];

    $("summaryTableBody").innerHTML = rows
      .map(
        ([name, formula, val, target]) => `
        <tr>
          <td><strong>${name}</strong></td>
          <td>${formula}</td>
          <td><strong>${val}</strong></td>
          <td>${target}</td>
        </tr>`
      )
      .join("");

    updateCharts(m);
  }

  function getChartColors() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    return {
      text: isLight ? "#475569" : "#94a3b8",
      grid: isLight ? "rgba(15, 23, 42, 0.08)" : "rgba(148, 163, 184, 0.12)",
    };
  }

  function roundChartMoney(val) {
    return Math.abs(val) > 0 && Math.abs(val) < 10 ? Number(val.toFixed(2)) : Math.round(val);
  }

  function updateCharts(m) {
    if (typeof Chart === "undefined") return;
    const colors = getChartColors();
    const dict = t();

    const maxUnits = Math.max(
      20,
      Math.ceil(Math.max(m.monthlyOrders, Number.isFinite(m.bepUnits) ? m.bepUnits : 100) * 1.6)
    );
    const steps = 8;
    const labels = [];
    const revenueSeries = [];
    const totalCostSeries = [];
    const fixedCostSeries = [];

    for (let i = 0; i <= steps; i++) {
      const units = Math.round((maxUnits / steps) * i);
      labels.push(`${units} ${dict.axisPcs}`);
      const rev = units * m.inputs.avgCheck;
      const varCost = rev * (m.inputs.cogsPercent / 100);
      revenueSeries.push(roundChartMoney(rev));
      totalCostSeries.push(roundChartMoney(m.totalFixedMonthly + varCost));
      fixedCostSeries.push(roundChartMoney(m.totalFixedMonthly));
    }

    if (bepChart) bepChart.destroy();
    bepChart = new Chart($("bepChart"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${dict.dsRevenue} (${currentCurrency})`,
            data: revenueSeries,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            borderWidth: 2.5,
            tension: 0.1,
            fill: false,
          },
          {
            label: `${dict.dsTotalCost} (${currentCurrency})`,
            data: totalCostSeries,
            borderColor: "#ef4444",
            borderWidth: 2.5,
            tension: 0.1,
            fill: false,
          },
          {
            label: `${dict.dsFixedCost} (${currentCurrency})`,
            data: fixedCostSeries,
            borderColor: "#64748b",
            borderDash: [5, 5],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: colors.text, boxWidth: 12 } },
        },
        scales: {
          x: { ticks: { color: colors.text }, grid: { color: colors.grid } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid } },
        },
      },
    });

    const months = Math.max(6, Math.min(36, Math.round(m.inputs.lifetimeMonths * 1.5)));
    const monthLabels = [];
    const cumLtvData = [];
    const cacLineData = [];

    for (let step = 0; step <= months; step++) {
      monthLabels.push(`${dict.axisMo} ${step}`);
      const effectiveMonths = Math.min(step, m.inputs.lifetimeMonths);
      cumLtvData.push(roundChartMoney(m.monthlyContributionPerCustomer * effectiveMonths));
      cacLineData.push(roundChartMoney(m.cac));
    }

    if (ltvChart) ltvChart.destroy();
    ltvChart = new Chart($("ltvChart"), {
      type: "line",
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: `${dict.dsCumLtv} (${currentCurrency})`,
            data: cumLtvData,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            borderWidth: 2.5,
            fill: true,
            tension: 0.15,
          },
          {
            label: `${dict.dsCacLine} (${currentCurrency})`,
            data: cacLineData,
            borderColor: "#f59e0b",
            borderDash: [6, 4],
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: colors.text, boxWidth: 12 } },
        },
        scales: {
          x: { ticks: { color: colors.text }, grid: { color: colors.grid } },
          y: { ticks: { color: colors.text }, grid: { color: colors.grid } },
        },
      },
    });
  }

  function recalculate() {
    const inputs = readInputs();
    const metrics = calculateMetrics(inputs);
    updateUI(metrics);
  }

  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function openModal() {
    $("infoModal").hidden = false;
  }

  function closeModal() {
    $("infoModal").hidden = true;
  }

  function bindEvents() {
    FIELD_IDS.forEach((id) => {
      const numEl = $(id);
      const rangeEl = $(`${id}Range`);

      numEl.addEventListener("input", () => {
        const val = parseFloat(numEl.value) || 0;
        if (val > parseFloat(rangeEl.max)) rangeEl.max = Math.ceil(val * 1.5);
        rangeEl.value = Math.min(val, parseFloat(rangeEl.max));
        recalculate();
      });

      rangeEl.addEventListener("input", () => {
        numEl.value = rangeEl.value;
        recalculate();
      });
    });

    document.querySelectorAll(".btn-preset").forEach((btn) => {
      btn.addEventListener("click", () => applyPreset(btn.dataset.preset));
    });

    $("resetBtn").addEventListener("click", () => {
      applyPreset(activePreset);
      showToast(t().toastReset);
    });

    $("langSelect").addEventListener("change", (e) => {
      applyLanguage(e.target.value);
    });

    $("currencySelect").addEventListener("change", (e) => {
      const prevRate = getRate();
      currentCurrency = e.target.value;
      const nextRate = rates[currentCurrency] || 1;
      $("fxRateInput").value = nextRate;

      document.querySelectorAll("[data-currency]").forEach((el) => {
        el.textContent = currentCurrency;
      });

      if ($("autoConvertFx").checked) {
        convertInputsBetweenCurrencies(prevRate, nextRate);
      }
      recalculate();
    });

    $("fxRateInput").addEventListener("input", () => {
      const val = parseFloat($("fxRateInput").value);
      if (Number.isFinite(val) && val > 0) {
        rates[currentCurrency] = val;
        recalculate();
      }
    });

    $("themeToggle").addEventListener("click", () => {
      const html = document.documentElement;
      const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
      html.setAttribute("data-theme", next);
      $("themeIcon").textContent = next === "light" ? "🌙" : "☀️";
      recalculate();
    });

    $("infoBtn").addEventListener("click", openModal);
    $("closeModalBtn").addEventListener("click", closeModal);
    $("modalOkBtn").addEventListener("click", closeModal);
    $("infoModal").addEventListener("click", (e) => {
      if (e.target === $("infoModal")) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("infoModal").hidden) closeModal();
    });

    $("copyReportBtn").addEventListener("click", async () => {
      if (!lastMetrics) return;
      const m = lastMetrics;
      const dict = t();
      const text = [
        `${dict.repHeader} (${activePreset.toUpperCase()})`,
        `CAC: ${formatMoney(m.cac)} | CPL: ${formatMoney(m.cpl)}`,
        `LTV: ${formatMoney(m.ltv)} | LTV/CAC: ${formatNum(m.ltvToCac, 2)}x`,
        `${dict.paybackLbl}: ${Number.isFinite(m.paybackMonths) ? formatNum(m.paybackMonths, 2) + " " + dict.moShort : "—"}`,
        `${dict.repBep}: ${m.bepUnits} ${dict.salesUnit} (${formatMoney(m.bepRevenue)})`,
        `${dict.repProfit}: ${formatMoney(m.netProfit)}`,
      ].join("\n");

      try {
        await navigator.clipboard.writeText(text);
        showToast(dict.toastCopied);
      } catch {
        showToast(dict.toastCopyErr);
      }
    });

    $("exportCsvBtn").addEventListener("click", () => {
      if (!lastMetrics) return;
      const m = lastMetrics;
      const dict = t();
      const csvRows = [
        [dict.csvMetric, dict.csvValue, dict.csvCurrency],
        ["CAC", Math.round(m.cac * 100) / 100, currentCurrency],
        ["CPL", Math.round(m.cpl * 100) / 100, currentCurrency],
        ["LTV", Math.round(m.ltv * 100) / 100, currentCurrency],
        ["LTV/CAC", m.ltvToCac.toFixed(2), "x"],
        ["CAC Payback", Number.isFinite(m.paybackMonths) ? m.paybackMonths.toFixed(2) : "Inf", dict.moShort],
        ["Break-even (units)", m.bepUnits, dict.unitPcs],
        ["Break-even (revenue)", Math.round(m.bepRevenue * 100) / 100, currentCurrency],
        ["Net Profit", Math.round(m.netProfit * 100) / 100, currentCurrency],
      ];
      const csv = "\uFEFF" + csvRows.map((r) => r.join(";")).join("\n");
      downloadFile("unit-economics.csv", csv, "text/csv;charset=utf-8;");
      showToast(dict.toastCsv);
    });

    $("exportJsonBtn").addEventListener("click", () => {
      if (!lastMetrics) return;
      downloadFile(
        "unit-economics.json",
        JSON.stringify(
          {
            language: currentLang,
            currency: currentCurrency,
            fxRateToUsd: getRate(),
            ...lastMetrics,
          },
          null,
          2
        ),
        "application/json"
      );
      showToast(t().toastJson);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    $("langSelect").value = "en";
    $("currencySelect").value = "$";
    $("fxRateInput").value = rates["$"];
    document.querySelectorAll("[data-currency]").forEach((el) => {
      el.textContent = "$";
    });
    renderModalContent();
    applyLanguage("en");
    applyPreset("saas");
  });
})();