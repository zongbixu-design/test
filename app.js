const stems = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const branches = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const stemElement = { 갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수" };
const branchElement = { 자: "수", 축: "토", 인: "목", 묘: "목", 진: "토", 사: "화", 오: "화", 미: "토", 신: "금", 유: "금", 술: "토", 해: "수" };
const timeOptions = [
  { value: 0, ko: "자시 (23:00~00:59)", zh: "子时 (23:00~00:59)" },
  { value: 1, ko: "축시 (01:00~02:59)", zh: "丑时 (01:00~02:59)" },
  { value: 3, ko: "인시 (03:00~04:59)", zh: "寅时 (03:00~04:59)" },
  { value: 5, ko: "묘시 (05:00~06:59)", zh: "卯时 (05:00~06:59)" },
  { value: 7, ko: "진시 (07:00~08:59)", zh: "辰时 (07:00~08:59)" },
  { value: 9, ko: "사시 (09:00~10:59)", zh: "巳时 (09:00~10:59)" },
  { value: 11, ko: "오시 (11:00~12:59)", zh: "午时 (11:00~12:59)" },
  { value: 13, ko: "미시 (13:00~14:59)", zh: "未时 (13:00~14:59)" },
  { value: 15, ko: "신시 (15:00~16:59)", zh: "申时 (15:00~16:59)" },
  { value: 17, ko: "유시 (17:00~18:59)", zh: "酉时 (17:00~18:59)" },
  { value: 19, ko: "술시 (19:00~20:59)", zh: "戌时 (19:00~20:59)" },
  { value: 21, ko: "해시 (21:00~22:59)", zh: "亥时 (21:00~22:59)" }
];

const translations = {
  ko: {
    pageTitle: "AI 사주 운세",
    eyebrow: "초보자도 바로 쓰는 웹 사주 프로그램",
    heroTitle: "AI 사주 운세",
    heroDescription: "출생 정보만 입력하면 사주팔자, 오행, 대운, 오늘의 운세와 재물·건강·직업운을 한국어로 쉽게 해석해 드립니다.",
    languageLabel: "언어 선택",
    koButton: "한국어",
    zhButton: "中文",
    formTitle: "출생 정보 입력",
    yearLabel: "출생연도",
    monthLabel: "출생월",
    dayLabel: "출생일",
    hourLabel: "출생시간",
    genderLegend: "성별",
    male: "남성",
    female: "여성",
    submit: "운세 보기",
    notice: "※ 이 서비스는 전통 명리학 규칙을 바탕으로 한 재미용 해석입니다. 중요한 의사결정은 전문가와 상의하세요.",
    placeholder: "왼쪽 양식에 출생 정보를 입력하고 <strong>운세 보기</strong>를 눌러보세요.",
    invalidDate: "올바른 날짜를 입력해 주세요.",
    elements: { 목: "목", 화: "화", 토: "토", 금: "금", 수: "수" },
    elementText: {
      목: "성장, 기획, 배움의 기운입니다. 새로운 일을 키우는 힘이 좋습니다.",
      화: "표현, 열정, 인기의 기운입니다. 사람 앞에서 빛나는 힘이 좋습니다.",
      토: "안정, 신뢰, 균형의 기운입니다. 꾸준히 쌓아 올리는 힘이 좋습니다.",
      금: "결단, 정리, 원칙의 기운입니다. 기준을 세우고 성과를 내는 힘이 좋습니다.",
      수: "지혜, 유연함, 소통의 기운입니다. 흐름을 읽고 적응하는 힘이 좋습니다."
    },
    pillarNames: ["년주", "월주", "일주", "시주"],
    luckCycle: (age, pillar) => `${age}세~${age + 9}세: ${pillar} 대운`,
    result: (data, input, helpers) => `
    <article class="result-card">
      <h3>🔮 1. 사주팔자</h3>
      <div class="pill-row">
        ${data.pillars.map((p) => `<div class="pillar"><strong>${p.name}</strong>${p.value}</div>`).join("")}
      </div>
      <p>${input.gender} 기준 일간은 <strong>${data.pillars[2].value[0]}(${helpers.element(data.dayMaster)})</strong>입니다. 자신을 나타내는 중심 기운은 ${helpers.element(data.dayMaster)}이며, ${helpers.elementText(data.dayMaster)}</p>
    </article>
    <article class="result-card">
      <h3>🌿 2. 오행 분석</h3>
      ${helpers.elementBars()}
      <p>가장 강한 오행은 <strong>${helpers.element(data.strongest)}</strong>, 보완하면 좋은 오행은 <strong>${helpers.element(data.weakest)}</strong>입니다. 강한 기운은 장점으로 살리고 약한 기운은 생활 습관으로 채우면 균형이 좋아집니다.</p>
    </article>
    <article class="result-card">
      <h3>⏳ 3. 대운 분석</h3>
      <p>대운은 약 <strong>${data.luckStart}세</strong>부터 10년 단위로 바뀌는 큰 흐름으로 보았습니다.</p>
      ${htmlList(data.luckCycles)}
    </article>
    <article class="result-card"><h3>☀️ 4. 오늘의 운세</h3><p>오늘의 일진은 <strong>${data.todayPillar}</strong>입니다. 서두르기보다 우선순위를 정하면 기회가 또렷해집니다. 약속, 문서, 금전 거래는 한 번 더 확인하세요.</p></article>
    <article class="result-card"><h3>💰 5. 재물운</h3>${htmlList(["지출을 줄이는 것보다 수입과 지출의 이름표를 분명히 하는 날입니다.", `${helpers.element(data.strongest)} 기운이 강하므로 본인의 장점을 살린 부업·협업 아이디어가 좋습니다.`, "충동구매는 하루 뒤 다시 확인하면 손실을 줄일 수 있습니다."])}</article>
    <article class="result-card"><h3>🧘 6. 건강운</h3>${htmlList([`${helpers.element(data.weakest)} 기운을 보완하는 색상, 음식, 산책 루틴을 활용해 보세요.`, "수면 시간과 물 섭취를 먼저 챙기면 컨디션 회복이 빠릅니다.", "불편한 증상이 지속되면 운세가 아니라 의료 전문가의 조언을 우선하세요."])}</article>
    <article class="result-card"><h3>💼 7. 직업운</h3>${htmlList([`${helpers.element(data.dayMaster)} 일간은 ${helpers.elementText(data.dayMaster)}`, "오늘은 혼자 해결하기보다 역할을 나누면 성과가 커집니다.", "기록, 정리, 포트폴리오 업데이트가 다음 기회를 부릅니다."])}</article>`
  },
  zh: {
    pageTitle: "AI 八字运势",
    eyebrow: "新手也能立即使用的网页八字程序",
    heroTitle: "AI 八字运势",
    heroDescription: "只需输入出生信息，即可用中文轻松解读四柱八字、五行、大运、今日运势以及财运、健康运、事业运。",
    languageLabel: "选择语言",
    koButton: "한국어",
    zhButton: "中文",
    formTitle: "输入出生信息",
    yearLabel: "出生年份",
    monthLabel: "出生月份",
    dayLabel: "出生日期",
    hourLabel: "出生时辰",
    genderLegend: "性别",
    male: "男性",
    female: "女性",
    submit: "查看运势",
    notice: "※ 本服务基于传统命理规则提供娱乐性解读。重要决策请咨询专业人士。",
    placeholder: "请在左侧表单输入出生信息，然后点击 <strong>查看运势</strong>。",
    invalidDate: "请输入正确的日期。",
    elements: { 목: "木", 화: "火", 토: "土", 금: "金", 수: "水" },
    elementText: {
      목: "这是成长、规划与学习的能量。适合培育新事物。",
      화: "这是表达、热情与人气的能量。适合在人前展现光芒。",
      토: "这是稳定、信任与平衡的能量。适合持续累积成果。",
      금: "这是决断、整理与原则的能量。适合建立标准并产出成果。",
      수: "这是智慧、弹性与沟通的能量。适合观察趋势并灵活适应。"
    },
    pillarNames: ["年柱", "月柱", "日柱", "时柱"],
    luckCycle: (age, pillar) => `${age}岁~${age + 9}岁：${pillar}大运`,
    result: (data, input, helpers) => `
    <article class="result-card"><h3>🔮 1. 四柱八字</h3><div class="pill-row">${data.pillars.map((p) => `<div class="pillar"><strong>${p.name}</strong>${p.value}</div>`).join("")}</div><p>以${input.gender}为准，日干为 <strong>${data.pillars[2].value[0]}（${helpers.element(data.dayMaster)}）</strong>。代表自身的核心能量是${helpers.element(data.dayMaster)}，${helpers.elementText(data.dayMaster)}</p></article>
    <article class="result-card"><h3>🌿 2. 五行分析</h3>${helpers.elementBars()}<p>最强的五行为 <strong>${helpers.element(data.strongest)}</strong>，建议补足的五行为 <strong>${helpers.element(data.weakest)}</strong>。发挥强势能量，并通过生活习惯补足弱项，整体会更平衡。</p></article>
    <article class="result-card"><h3>⏳ 3. 大运分析</h3><p>大运约从 <strong>${data.luckStart}岁</strong> 开始，每十年转换一次整体趋势。</p>${htmlList(data.luckCycles)}</article>
    <article class="result-card"><h3>☀️ 4. 今日运势</h3><p>今日日辰为 <strong>${data.todayPillar}</strong>。与其急于行动，不如先排好优先顺序，机会会更清晰。约定、文件与金钱往来请再确认一次。</p></article>
    <article class="result-card"><h3>💰 5. 财运</h3>${htmlList(["今天与其一味减少支出，不如明确收入和支出的分类。", `${helpers.element(data.strongest)}能量较强，适合发挥自身优势来思考副业或合作点子。`, "冲动消费请隔一天再确认，可减少损失。"])}</article>
    <article class="result-card"><h3>🧘 6. 健康运</h3>${htmlList([`可用颜色、饮食和散步习惯来补足${helpers.element(data.weakest)}能量。`, "先照顾睡眠时间与饮水量，状态会恢复得更快。", "若不适症状持续，请优先咨询医疗专业人士，而不是依赖运势。"])}</article>
    <article class="result-card"><h3>💼 7. 事业运</h3>${htmlList([`${helpers.element(data.dayMaster)}日干：${helpers.elementText(data.dayMaster)}`, "今天与其独自承担，不如分工合作，成果会更大。", "记录、整理与更新作品集，会带来下一次机会。"])}</article>`
  }
};

let currentLanguage = "ko";
let lastInput = null;
let lastAnalysis = null;

const $ = (selector) => document.querySelector(selector);

function mod(n, m) { return ((n % m) + m) % m; }
function pillarFromIndex(index) { return stems[mod(index, 10)] + branches[mod(index, 12)]; }
function getTimeBranch(hour) { return branches[Math.floor(((hour + 1) % 24) / 2)]; }
function getTimeStem(dayStemIndex, branchIndex) { return stems[mod(dayStemIndex * 2 + branchIndex, 10)]; }
function htmlList(items) { return `<ul class="list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`; }

function t() { return translations[currentLanguage]; }

function localizeInput(input) {
  if (!input) return input;
  return { ...input, gender: input.genderKey === "male" ? t().male : t().female };
}

function analyze({ year, month, day, hour, genderKey }) {
  const birth = new Date(year, month - 1, day, hour);
  if (Number.isNaN(birth.getTime()) || birth.getMonth() !== month - 1 || birth.getDate() !== day) {
    throw new Error(t().invalidDate);
  }

  const base = new Date(1900, 0, 31);
  const days = Math.floor((birth - base) / 86400000);
  const yearIndex = year - 4;
  const monthIndex = (year - 1900) * 12 + month + 13;
  const dayIndex = days + 40;
  const timeBranchIndex = branches.indexOf(getTimeBranch(hour));
  const timeStem = getTimeStem(mod(dayIndex, 10), timeBranchIndex);

  const pillars = [
    { key: "year", value: pillarFromIndex(yearIndex) },
    { key: "month", value: pillarFromIndex(monthIndex) },
    { key: "day", value: pillarFromIndex(dayIndex) },
    { key: "time", value: timeStem + branches[timeBranchIndex] }
  ];

  const counts = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  pillars.forEach(({ value }) => {
    counts[stemElement[value[0]]] += 1;
    counts[branchElement[value[1]]] += 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const strongest = sorted[0][0];
  const weakest = sorted[sorted.length - 1][0];
  const dayMaster = stemElement[pillars[2].value[0]];
  const direction = (genderKey === "male" && yearIndex % 2 === 0) || (genderKey === "female" && yearIndex % 2 !== 0) ? 1 : -1;
  const luckStart = ((month + day + hour) % 8) + 3;
  const todayIndex = Math.floor((new Date() - base) / 86400000) + 40;
  const todayPillar = pillarFromIndex(todayIndex);

  return { pillars, counts, strongest, weakest, dayMaster, luckStart, monthIndex, direction, todayPillar };
}

function localizeAnalysis(data) {
  return {
    ...data,
    pillars: data.pillars.map((pillar, index) => ({ ...pillar, name: t().pillarNames[index] })),
    luckCycles: Array.from({ length: 6 }, (_, i) => {
      const age = data.luckStart + i * 10;
      return t().luckCycle(age, pillarFromIndex(data.monthIndex + data.direction * (i + 1)));
    })
  };
}

function makeHelpers(data) {
  const maxCount = Math.max(...Object.values(data.counts));
  return {
    element: (key) => t().elements[key],
    elementText: (key) => t().elementText[key],
    elementBars: () => Object.entries(data.counts).map(([key, value]) => `<div class="element-pill"><strong>${t().elements[key]}</strong> ${value}${currentLanguage === "ko" ? "개" : "个"}<div class="bar"><span style="width:${(value / maxCount) * 100}%"></span></div></div>`).join("")
  };
}

function render(data, input) {
  const localizedData = localizeAnalysis(data);
  $("#results").innerHTML = t().result(localizedData, localizeInput(input), makeHelpers(localizedData));
}

function setStaticLanguage() {
  const copy = t();
  document.documentElement.lang = currentLanguage === "ko" ? "ko" : "zh-Hans";
  document.title = copy.pageTitle;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = copy[node.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", copy[node.dataset.i18nAria]);
  });
  document.querySelectorAll(".language-switcher__button").forEach((button) => {
    const isActive = button.dataset.language === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  const hourSelect = $("#hour");
  hourSelect.innerHTML = timeOptions.map((option) => `<option value="${option.value}">${option[currentLanguage]}</option>`).join("");
  hourSelect.value = lastInput?.hour ?? "0";
  $("#male-label").lastChild.textContent = ` ${copy.male}`;
  $("#female-label").lastChild.textContent = ` ${copy.female}`;
  if (lastAnalysis && lastInput) {
    render(lastAnalysis, lastInput);
  } else {
    $("#results").innerHTML = `<div class="result-card placeholder">${copy.placeholder}</div>`;
  }
}

$("#saju-form").addEventListener("submit", (event) => {
  event.preventDefault();
  lastInput = {
    year: Number($("#year").value),
    month: Number($("#month").value),
    day: Number($("#day").value),
    hour: Number($("#hour").value),
    genderKey: document.querySelector('input[name="gender"]:checked').value
  };
  try {
    lastAnalysis = analyze(lastInput);
    render(lastAnalysis, lastInput);
  } catch (error) {
    lastAnalysis = null;
    $("#results").innerHTML = `<div class="result-card">${error.message}</div>`;
  }
});

document.querySelectorAll(".language-switcher__button").forEach((button) => {
  button.addEventListener("click", () => {
    currentLanguage = button.dataset.language;
    setStaticLanguage();
  });
});

setStaticLanguage();
