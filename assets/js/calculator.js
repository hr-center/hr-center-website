/* ---------- Kalkulator plače (neto/bruto) — Slovenija, 2026 ----------
   Vir podatkov: Uradni list RS, št. 104/25 (dohodninska lestvica in olajšave za 2026).
   Izračun je okviren (glej opozorilo na strani) in ne predstavlja davčnega svetovanja. */

(function () {
  const EMPLOYEE_CONTRIB_RATE = 0.2310; // prispevki delojemalca (vključno z dolgotrajno oskrbo)
  const EMPLOYER_CONTRIB_RATE = 0.1710; // prispevki delodajalca (vključno z dolgotrajno oskrbo)

  // Letna dohodninska lestvica 2026, pretvorjena na mesečno osnovo (deljeno z 12)
  // vsak razred: { upTo: zgornja meja mesečne osnove (Infinity za zadnji), base: fiksni znesek, rate: stopnja nad spodnjo mejo, over: spodnja meja }
  const MONTHLY_BRACKETS = [
    { over: 0,       upTo: 810.12,   base: 0,       rate: 0.16 },
    { over: 810.12,  upTo: 2382.70,  base: 129.62,  rate: 0.26 },
    { over: 2382.70, upTo: 4765.41,  base: 538.49,  rate: 0.33 },
    { over: 4765.41, upTo: 6862.19,  base: 1324.78, rate: 0.39 },
    { over: 6862.19, upTo: Infinity, base: 2142.53, rate: 0.50 },
  ];

  const GENERAL_ALLOWANCE_MONTHLY = 462.66; // splošna olajšava, mesečno (5.551,93 / 12)
  // Povečana splošna olajšava velja, če je letni skupni dohodek (ocenjen kot 12x mesečni bruto) pod tem pragom
  const INCREASED_ALLOWANCE_ANNUAL_THRESHOLD = 17766.18;

  function increasedAnnualAllowance(annualIncome) {
    // formula: 5.551,93 + (20.832,39 - 1,17259 x skupni letni dohodek)
    const val = 5551.93 + (20832.39 - 1.17259 * annualIncome);
    return Math.max(val, 5551.93); // ne sme pasti pod osnovno splošno olajšavo
  }

  function generalAllowanceMonthly(grossMonthly) {
    const annualEquivalent = grossMonthly * 12;
    if (annualEquivalent < INCREASED_ALLOWANCE_ANNUAL_THRESHOLD) {
      return increasedAnnualAllowance(annualEquivalent) / 12;
    }
    return GENERAL_ALLOWANCE_MONTHLY;
  }

  function incomeTaxMonthly(taxBase) {
    if (taxBase <= 0) return 0;
    for (const b of MONTHLY_BRACKETS) {
      if (taxBase <= b.upTo) {
        return b.base + (taxBase - b.over) * b.rate;
      }
    }
    return 0;
  }

  // Bruto -> neto
  function grossToNet(gross) {
    const contributions = gross * EMPLOYEE_CONTRIB_RATE;
    const preAllowanceBase = gross - contributions;
    const allowance = generalAllowanceMonthly(gross);
    const taxBase = Math.max(preAllowanceBase - allowance, 0);
    const tax = incomeTaxMonthly(taxBase);
    const net = gross - contributions - tax;
    const employerCost = gross * (1 + EMPLOYER_CONTRIB_RATE);
    return { gross, net, contributions, taxBase, allowance, tax, employerCost };
  }

  // Neto -> bruto (iterativno iskanje, ker formula ni direktno invertibilna zaradi progresivnosti in olajšave)
  function netToGross(targetNet) {
    let low = targetNet;               // bruto je vedno vsaj toliko kot neto
    let high = targetNet * 2.2;        // varna zgornja meja
    for (let i = 0; i < 60; i++) {
      const mid = (low + high) / 2;
      const result = grossToNet(mid);
      if (result.net > targetNet) {
        high = mid;
      } else {
        low = mid;
      }
    }
    return grossToNet((low + high) / 2);
  }

  function formatEUR(n) {
    return n.toLocaleString('sl-SI', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  }

  function initCalculator() {
    const amountInput = document.getElementById('calc-amount');
    const amountLabel = document.getElementById('calc-amount-label');
    const runBtn = document.getElementById('calc-run');
    const toggleBtns = document.querySelectorAll('.calc-toggle-btn');
    const resultBox = document.getElementById('calc-result');

    if (!amountInput || !runBtn) return; // ni na tej strani

    let mode = 'gross2net';

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mode = btn.dataset.mode;
        amountLabel.textContent = mode === 'gross2net' ? 'Bruto mesečna plača' : 'Neto mesečna plača';
        resultBox.style.display = 'none';
      });
    });

    function run() {
      const val = parseFloat(amountInput.value);
      if (!val || val <= 0) {
        amountInput.focus();
        return;
      }
      const result = mode === 'gross2net' ? grossToNet(val) : netToGross(val);

      document.getElementById('calc-result-main-label').textContent = mode === 'gross2net' ? 'Neto plača' : 'Bruto plača';
      document.getElementById('calc-result-main-value').textContent = formatEUR(mode === 'gross2net' ? result.net : result.gross);
      document.getElementById('calc-result-secondary-label').textContent = mode === 'gross2net' ? 'Bruto plača' : 'Neto plača';
      document.getElementById('calc-result-secondary-value').textContent = formatEUR(mode === 'gross2net' ? result.gross : result.net);

      document.getElementById('calc-contrib').textContent = formatEUR(result.contributions);
      document.getElementById('calc-base').textContent = formatEUR(result.taxBase);
      document.getElementById('calc-allowance').textContent = formatEUR(result.allowance);
      document.getElementById('calc-tax').textContent = formatEUR(result.tax);
      document.getElementById('calc-employer-cost').textContent = formatEUR(result.employerCost);

      resultBox.style.display = 'block';
    }

    runBtn.addEventListener('click', run);
    amountInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') run(); });
  }

  document.addEventListener('DOMContentLoaded', initCalculator);
})();
