const stems = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const branches = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const stemElement = { 갑: "목", 을: "목", 병: "화", 정: "화", 무: "토", 기: "토", 경: "금", 신: "금", 임: "수", 계: "수" };
const branchElement = { 자: "수", 축: "토", 인: "목", 묘: "목", 진: "토", 사: "화", 오: "화", 미: "토", 신: "금", 유: "금", 술: "토", 해: "수" };
const elementText = {
  목: "성장, 기획, 배움의 기운입니다. 새로운 일을 키우는 힘이 좋습니다.",
  화: "표현, 열정, 인기의 기운입니다. 사람 앞에서 빛나는 힘이 좋습니다.",
  토: "안정, 신뢰, 균형의 기운입니다. 꾸준히 쌓아 올리는 힘이 좋습니다.",
  금: "결단, 정리, 원칙의 기운입니다. 기준을 세우고 성과를 내는 힘이 좋습니다.",
  수: "지혜, 유연함, 소통의 기운입니다. 흐름을 읽고 적응하는 힘이 좋습니다."
};

const $ = (selector) => document.querySelector(selector);

function mod(n, m) { return ((n % m) + m) % m; }
function pillarFromIndex(index) { return stems[mod(index, 10)] + branches[mod(index, 12)]; }
function getTimeBranch(hour) { return branches[Math.floor(((hour + 1) % 24) / 2)]; }
function getTimeStem(dayStemIndex, branchIndex) { return stems[mod(dayStemIndex * 2 + branchIndex, 10)]; }
function htmlList(items) { return `<ul class="list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`; }

function analyze({ year, month, day, hour, gender }) {
  const birth = new Date(year, month - 1, day, hour);
  if (Number.isNaN(birth.getTime()) || birth.getMonth() !== month - 1 || birth.getDate() !== day) {
    throw new Error("올바른 날짜를 입력해 주세요.");
  }

  const base = new Date(1900, 0, 31);
  const days = Math.floor((birth - base) / 86400000);
  const yearIndex = year - 4;
  const monthIndex = (year - 1900) * 12 + month + 13;
  const dayIndex = days + 40;
  const timeBranchIndex = branches.indexOf(getTimeBranch(hour));
  const timeStem = getTimeStem(mod(dayIndex, 10), timeBranchIndex);

  const pillars = [
    { name: "년주", value: pillarFromIndex(yearIndex) },
    { name: "월주", value: pillarFromIndex(monthIndex) },
    { name: "일주", value: pillarFromIndex(dayIndex) },
    { name: "시주", value: timeStem + branches[timeBranchIndex] }
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
  const direction = (gender === "남성" && yearIndex % 2 === 0) || (gender === "여성" && yearIndex % 2 !== 0) ? 1 : -1;
  const luckStart = ((month + day + hour) % 8) + 3;
  const luckCycles = Array.from({ length: 6 }, (_, i) => {
    const age = luckStart + i * 10;
    return `${age}세~${age + 9}세: ${pillarFromIndex(monthIndex + direction * (i + 1))} 대운`;
  });
  const todayIndex = Math.floor((new Date() - base) / 86400000) + 40;
  const todayPillar = pillarFromIndex(todayIndex);

  return { pillars, counts, strongest, weakest, dayMaster, luckStart, luckCycles, todayPillar };
}

function render(data, input) {
  const maxCount = Math.max(...Object.values(data.counts));
  $("#results").innerHTML = `
    <article class="result-card">
      <h3>🔮 1. 사주팔자</h3>
      <div class="pill-row">
        ${data.pillars.map((p) => `<div class="pillar"><strong>${p.name}</strong>${p.value}</div>`).join("")}
      </div>
      <p>${input.gender} 기준 일간은 <strong>${data.pillars[2].value[0]}(${data.dayMaster})</strong>입니다. 자신을 나타내는 중심 기운은 ${data.dayMaster}이며, ${elementText[data.dayMaster]}</p>
    </article>
    <article class="result-card">
      <h3>🌿 2. 오행 분석</h3>
      ${Object.entries(data.counts).map(([key, value]) => `<div class="element-pill"><strong>${key}</strong> ${value}개<div class="bar"><span style="width:${(value / maxCount) * 100}%"></span></div></div>`).join("")}
      <p>가장 강한 오행은 <strong>${data.strongest}</strong>, 보완하면 좋은 오행은 <strong>${data.weakest}</strong>입니다. 강한 기운은 장점으로 살리고 약한 기운은 생활 습관으로 채우면 균형이 좋아집니다.</p>
    </article>
    <article class="result-card">
      <h3>⏳ 3. 대운 분석</h3>
      <p>대운은 약 <strong>${data.luckStart}세</strong>부터 10년 단위로 바뀌는 큰 흐름으로 보았습니다.</p>
      ${htmlList(data.luckCycles)}
    </article>
    <article class="result-card">
      <h3>☀️ 4. 오늘의 운세</h3>
      <p>오늘의 일진은 <strong>${data.todayPillar}</strong>입니다. 서두르기보다 우선순위를 정하면 기회가 또렷해집니다. 약속, 문서, 금전 거래는 한 번 더 확인하세요.</p>
    </article>
    <article class="result-card">
      <h3>💰 5. 재물운</h3>
      ${htmlList(["지출을 줄이는 것보다 수입과 지출의 이름표를 분명히 하는 날입니다.", `${data.strongest} 기운이 강하므로 본인의 장점을 살린 부업·협업 아이디어가 좋습니다.`, "충동구매는 하루 뒤 다시 확인하면 손실을 줄일 수 있습니다."])}
    </article>
    <article class="result-card">
      <h3>🧘 6. 건강운</h3>
      ${htmlList([`${data.weakest} 기운을 보완하는 색상, 음식, 산책 루틴을 활용해 보세요.`, "수면 시간과 물 섭취를 먼저 챙기면 컨디션 회복이 빠릅니다.", "불편한 증상이 지속되면 운세가 아니라 의료 전문가의 조언을 우선하세요."])}
    </article>
    <article class="result-card">
      <h3>💼 7. 직업운</h3>
      ${htmlList([`${data.dayMaster} 일간은 ${elementText[data.dayMaster]}`, "오늘은 혼자 해결하기보다 역할을 나누면 성과가 커집니다.", "기록, 정리, 포트폴리오 업데이트가 다음 기회를 부릅니다."])}
    </article>`;
}

$("#saju-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = {
    year: Number($("#year").value),
    month: Number($("#month").value),
    day: Number($("#day").value),
    hour: Number($("#hour").value),
    gender: document.querySelector('input[name="gender"]:checked').value
  };
  try { render(analyze(input), input); } catch (error) { $("#results").innerHTML = `<div class="result-card">${error.message}</div>`; }
});

$("#results").innerHTML = `<div class="result-card placeholder">왼쪽 양식에 출생 정보를 입력하고 <strong>운세 보기</strong>를 눌러보세요.</div>`;
