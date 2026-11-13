/* ---------- Kalkulator plače (neto/bruto) — Slovenija, 2026 ----------
   Viri parametrov:
   - Dohodninska lestvica in olajšave 2026: FURS, Obvestilo z dne 15. 12. 2025
     (Pravilnik o določitvi usklajenih zneskov olajšav ... za leto 2026, Uradni list RS, št. 104/25)
   - Prispevki: delojemalec 23,10 %, delodajalec 17,10 % (vključno s prispevkom za dolgotrajno oskrbo 1 % + 1 %)
   - Povračila stroškov (Uredba o davčni obravnavi povračil stroškov in drugih dohodkov iz delovnega razmerja):
     malica do 7,96 € na dan, prevoz na delo 0,21 € na polni kilometer razdalje (min. 140 € na mesec)
   Izračun je okviren in ne predstavlja davčnega svetovanja. */

(function () {
  const EMPLOYEE_RATE = 0.2310;
  const EMPLOYER_RATE = 0.1710;

  // mesečna dohodninska lestvica 2026
  const BRACKETS = [
    { over: 0,       upTo: 810.12,   base: 0,       rate: 0.16 },
    { over: 810.12,  upTo: 2382.70,  base: 129.62,  rate: 0.26 },
    { over: 2382.70, upTo: 4765.41,  base: 538.49,  rate: 0.33 },
    { over: 4765.41, upTo: 6862.19,  base: 1324.78, rate: 0.39 },
    { over: 6862.19, upTo: Infinity, base: 2142.53, rate: 0.50 },
  ];
  const ANNUAL_BRACKET_LIMITS = [9721.43, 28592.44, 57184.88, 82346.23]; // za informativni izračun olajšave za mlade
  const ANNUAL_RATES = [0.16, 0.26, 0.33, 0.39, 0.50];

  const GENERAL_ALLOWANCE = 462.66;          // mesečno
  const INCREASED_LIMIT = 1480.51;           // mesečni bruto, do katerega velja povečana splošna olajšava
  const INCREASED_BASE = 1736.03;
  const INCREASED_COEF = 1.17259;

  const ALLOWANCE_INVALID = 1683.03;         // invalid s 100 % telesno okvaro, mesečno
  const ALLOWANCE_OVER70 = 138.80;           // po dopolnjenem 70. letu, mesečno
  const CHILD_ALLOWANCES = [249.65, 271.40, 452.67, 633.94, 815.21]; // 1.–5. otrok, mesečno
  const CHILD_STEP = 181.27;                 // vsak nadaljnji otrok
  const CHILD_SPECIAL = 904.69;              // otrok, ki potrebuje posebno nego in varstvo
  const OTHER_DEPENDENT = 249.65;            // drug vzdrževani družinski član
  const YOUNG_ANNUAL = 1443.50;              // olajšava za mlade do 29 let (letna odmera)

  const MEAL_LIMIT_PER_DAY = 7.96;
  const COMMUTE_LIMIT_PER_KM = 0.21;
  const COMMUTE_MIN_TAXFREE = 140;

  const round2 = (n) => Math.round(n * 100) / 100;

  function taxOn(base) {
    if (base <= 0) return 0;
    for (const b of BRACKETS) {
      if (base <= b.upTo) return b.base + (base - b.over) * b.rate;
    }
    return 0;
  }

  function generalAllowance(totalGross) {
    if (totalGross <= INCREASED_LIMIT) {
      return GENERAL_ALLOWANCE + Math.max(INCREASED_BASE - INCREASED_COEF * totalGross, 0);
    }
    return GENERAL_ALLOWANCE;
  }

  // Navadni otroci (po vrstnem redu) + otroci s posebno nego (se ne štejejo še enkrat med navadne)
  function childAllowances(normal, special) {
    const n = Math.max(0, normal | 0);
    const s = Math.max(0, special | 0);
    let sum = s * CHILD_SPECIAL;
    for (let i = 0; i < n; i++) {
      sum += i < CHILD_ALLOWANCES.length
        ? CHILD_ALLOWANCES[i]
        : CHILD_ALLOWANCES[CHILD_ALLOWANCES.length - 1] + CHILD_STEP * (i - CHILD_ALLOWANCES.length + 1);
    }
    return sum;
  }

  // Povračila stroškov: prikaz izplačanega, neobdavčenega in obdavčljivega dela
  function reimbursements(o) {
    const days = Math.max(0, o.days || 0);
    const mealPaid = Math.max(0, o.mealPerDay || 0) * days;
    const mealFree = Math.min(Math.max(0, o.mealPerDay || 0), MEAL_LIMIT_PER_DAY) * days;

    let travelPaid = 0, travelFree = 0;
    if (o.travelType === 'car') {
      const km = Math.max(0, o.km || 0);
      const rate = Math.max(0, o.kmRate || 0);
      travelPaid = km * rate * days;
      if (travelPaid > 0) {
        const cap = Math.max(COMMUTE_MIN_TAXFREE, km * COMMUTE_LIMIT_PER_KM * days);
        travelFree = Math.min(travelPaid, cap);
      }
    } else if (o.travelType === 'public') {
      travelPaid = Math.max(0, o.publicAmount || 0);
      travelFree = travelPaid; // imenska vozovnica javnega prevoza — v celoti neobdavčeno
    }
    return {
      mealPaid, mealFree, travelPaid, travelFree,
      taxFree: mealFree + travelFree,
      taxableExcess: (mealPaid - mealFree) + (travelPaid - travelFree),
    };
  }

  // Bruto plača -> vse postavke
  function compute(gross, ctx) {
    const benefits = ctx.benefits || 0;
    const excess = ctx.reimb.taxableExcess;
    const totalGross = gross + benefits + excess;
    const contributions = totalGross * EMPLOYEE_RATE;
    const general = ctx.skipGeneral ? 0 : generalAllowance(totalGross);
    const otherAllowances = ctx.otherAllowances || 0;
    const taxBase = Math.max(0, totalGross - contributions - general - otherAllowances);
    const tax = taxOn(taxBase);
    const netSalary = totalGross - contributions - tax - benefits - excess;
    const employerContrib = totalGross * EMPLOYER_RATE;
    const taxFree = ctx.reimb.taxFree;
    return {
      gross, benefits, excess, totalGross, contributions, general, otherAllowances, taxBase, tax,
      netSalary, taxFree, employerContrib,
      payout: netSalary + taxFree + excess,
      employerCost: totalGross + employerContrib + taxFree,
    };
  }

  function grossFromNet(targetNet, ctx) {
    let low = 0, high = Math.max(targetNet * 3, 1000) + (ctx.benefits || 0) + ctx.reimb.taxableExcess;
    for (let i = 0; i < 80; i++) {
      const mid = (low + high) / 2;
      if (compute(mid, ctx).netSalary > targetNet) high = mid; else low = mid;
    }
    return compute((low + high) / 2, ctx);
  }

  function annualMarginalRate(monthlyTaxBase) {
    const a = monthlyTaxBase * 12;
    for (let i = 0; i < ANNUAL_BRACKET_LIMITS.length; i++) {
      if (a <= ANNUAL_BRACKET_LIMITS[i]) return ANNUAL_RATES[i];
    }
    return ANNUAL_RATES[ANNUAL_RATES.length - 1];
  }

  const eur = (n) => n.toLocaleString('sl-SI', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  window.HRCalc = { compute, grossFromNet, reimbursements, childAllowances, generalAllowance };

  const MIN_WAGE_2026 = 1481.88;

  function initCalculator() {
    const $ = (id) => document.getElementById(id);
    if (!$('calc-amount')) return;

    let mode = 'gross2net';   // gross2net | net2gross
    let period = 'month';     // month | hour

    const setActive = (selector, attr, value) =>
      document.querySelectorAll(selector).forEach(b => b.classList.toggle('active', b.dataset[attr] === value));

    document.querySelectorAll('[data-mode]').forEach(btn => btn.addEventListener('click', () => {
      mode = btn.dataset.mode; setActive('[data-mode]', 'mode', mode); updateLabels(); run();
    }));
    document.querySelectorAll('[data-period]').forEach(btn => btn.addEventListener('click', () => {
      period = btn.dataset.period; setActive('[data-period]', 'period', period); updateLabels(); run();
    }));

    function updateLabels() {
      const what = mode === 'gross2net' ? 'Bruto' : 'Neto';
      $('calc-amount-label').textContent = what + (period === 'month' ? ' mesečna plača (€)' : ' urna postavka (€ na uro)');
      $('calc-hours-field').style.display = period === 'hour' ? '' : 'none';
    }
    const travelType = $('calc-travel-type');
    function updateTravel() {
      const t = travelType.value;
      $('calc-travel-car').style.display = t === 'car' ? '' : 'none';
      $('calc-travel-public').style.display = t === 'public' ? '' : 'none';
    }
    travelType.addEventListener('change', updateTravel);
    updateTravel(); updateLabels();

    const num = (id, def = 0) => { const v = parseFloat(String($(id).value).replace(',', '.')); return isNaN(v) ? def : v; };
    const set = (id, v) => { $(id).textContent = v; };
    const show = (id, visible) => { $(id).style.display = visible ? '' : 'none'; };

    function hideResult() { show('calc-result', false); show('calc-placeholder', true); }

    function run() {
      const amountIn = num('calc-amount');
      if (!amountIn || amountIn <= 0) { hideResult(); return; }
      const hours = num('calc-hours', 174) || 174;
      const monthlyInput = period === 'hour' ? amountIn * hours : amountIn;

      const reimb = reimbursements({
        days: num('calc-days', 21),
        mealPerDay: num('calc-meal'),
        travelType: travelType.value,
        km: num('calc-km'),
        kmRate: num('calc-km-rate', COMMUTE_LIMIT_PER_KM),
        publicAmount: num('calc-public'),
      });

      let others = 0;
      if ($('calc-invalid').checked) others += ALLOWANCE_INVALID;
      if ($('calc-over70').checked) others += ALLOWANCE_OVER70;
      others += childAllowances(num('calc-children'), num('calc-children-special'));
      others += num('calc-dependents') * OTHER_DEPENDENT;

      const ctx = { benefits: Math.max(0, num('calc-benefits')), reimb, otherAllowances: others, skipGeneral: $('calc-nogeneral').checked };
      const r = mode === 'gross2net' ? compute(monthlyInput, ctx) : grossFromNet(monthlyInput, ctx);

      // glavne vrstice
      set('o-gross', eur(r.gross));
      set('o-net', eur(r.netSalary));
      set('o-extras', eur(r.taxFree + r.excess));
      set('o-payout', eur(r.payout));
      set('o-cost', eur(r.employerCost));

      // podrobnosti
      set('r-gross', eur(r.gross));
      show('row-benefits', r.benefits > 0); set('r-benefits', eur(r.benefits));
      show('row-excess', r.excess > 0.005); set('r-excess', eur(r.excess));
      set('r-total-gross', eur(r.totalGross));
      set('r-contrib', '− ' + eur(r.contributions));
      set('r-general', '− ' + eur(r.general));
      show('row-other', r.otherAllowances > 0); set('r-other', '− ' + eur(r.otherAllowances));
      set('r-base', eur(r.taxBase));
      set('r-tax', '− ' + eur(r.tax));
      show('row-meal', reimb.mealPaid > 0); set('r-meal', '+ ' + eur(reimb.mealFree));
      show('row-travel', reimb.travelPaid > 0); set('r-travel', '+ ' + eur(reimb.travelFree));
      set('r-employer-contrib', eur(r.employerContrib));

      set('h-hours', String(hours).replace('.', ','));
      set('h-net', eur(r.netSalary / hours));
      set('h-gross', eur(r.gross / hours));
      set('h-cost', eur(r.employerCost / hours));

      const notes = [];
      if (r.excess > 0.005) notes.push('Znesek povračil nad zakonsko neobdavčeno mejo (malica 7,96 € na dan, prevoz 0,21 € na km) je obdavčen kot del plače.');
      if (r.gross < MIN_WAGE_2026 - 0.005) notes.push('Bruto plača je pod minimalno plačo za polni delovni čas (' + eur(MIN_WAGE_2026) + ').');
      if ($('calc-young').checked) notes.push('Olajšava za mlade: pri letni odmeri dohodnine se vam lahko vrne približno ' + eur(YOUNG_ANNUAL * annualMarginalRate(r.taxBase)) + '.');
      show('calc-notes', notes.length > 0); set('calc-notes', notes.join(' '));

      show('calc-placeholder', false); show('calc-result', true);
    }

    document.querySelectorAll('.calc3 input, .calc3 select').forEach(el => {
      el.addEventListener('input', run);
      el.addEventListener('change', run);
    });
    hideResult();
  }

  document.addEventListener('DOMContentLoaded', initCalculator);
})();
