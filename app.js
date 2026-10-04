// SDLC Swarm Skills Visualizer — Industry Standard SDLC Models Engine
// Features: Double Diamond (UX/Design Council), V-Model (Pressman/Sommerville), DevOps Infinity Loop (AWS/CI-CD), Jagged Track Line, & MTA System Trunk

const SDLC_SWARM_NODES = [
  { id: 'skill_builder', stop: 1, label: 'PROJECT_BUILDER_SKILL.md', mta: 'S', color: 'bg-[#808183] text-white', border: 'border-[#808183]', line: 'S Shuttle', category: 'Swarm Hub Controller', icon: '👑', desc: 'Master Swarm Controller: Sets autonomy modes (BALANCED / AUTOPILOT / SUPERVISED) and manages system lifecycle.' },
  { id: 'skill_orchestrator', stop: 1, label: 'orchestrator', mta: 'S', color: 'bg-[#808183] text-white', border: 'border-[#808183]', line: 'S Shuttle', category: 'State Engine', icon: '🎼', desc: 'State Engine: Overwrites docs/PROJECT_STATUS.md every turn to maintain rolling 3-session state and routing.' },

  { id: 'skill_it', stop: 2, label: 'it_consultant', phase: 'Phase 1', mta: 'A', color: 'bg-[#0039A6] text-white', border: 'border-[#0039A6]', line: 'A 8th Ave Express', category: 'Phase 1: IT Consultant', icon: '💼', desc: 'Phase 1 — IT Consultant (Solutions Architect): Scope discovery, trade-off negotiation, & 01_ARCH_BRIEF.md.' },
  { id: 'skill_po', stop: 3, label: 'product_owner', phase: 'Phase 2', mta: 'C', color: 'bg-[#0039A6] text-white', border: 'border-[#0039A6]', line: 'C 8th Ave Local', category: 'Phase 2: Product Owner', icon: '🎯', desc: 'Phase 2 — Product Owner: 02_PRD.md & full-stack vertical 03_USER_STORIES.md.' },
  { id: 'skill_architect', stop: 4, label: 'techincal_architect', phase: 'Phase 3', mta: 'F', color: 'bg-[#FF6319] text-white', border: 'border-[#FF6319]', line: 'F 6th Ave Express', category: 'Phase 3: Technical Architect', icon: '📐', desc: 'Phase 3 — Technical Architect: Defines system architecture, 04_TECHNICAL_SPEC.md, and 05_TASK_MANIFEST.md.' },
  { id: 'skill_design', stop: 5, label: 'apple_design', phase: 'Phase 3 UX', mta: 'B', color: 'bg-[#FF6319] text-white', border: 'border-[#FF6319]', line: 'B 6th Ave Local', category: 'Phase 3: UI/UX System', icon: '🎨', desc: 'Apple Design Rules: HIG design specs, SF typography, & glassmorphism tokens.' },
  { id: 'skill_parser', stop: 6, label: 'content_parser', phase: 'Phase 4', mta: 'M', color: 'bg-[#FF6319] text-white', border: 'border-[#FF6319]', line: 'M 6th Ave Local', category: 'Phase 4: Content Parser', icon: '📄', desc: 'Phase 4 — Content Parser: JSON Schemas & Zod Contracts in src/assets/schemas/.' },
  { id: 'skill_frontend', stop: 7, label: 'frontend_developer', phase: 'Phase 5', mta: '1', color: 'bg-[#EE352E] text-white', border: 'border-[#EE352E]', line: '1 Broadway Local', category: 'Phase 5: Frontend Developer', icon: '💻', desc: 'Phase 5 — Frontend Developer: UI Slices & Step 0 Visual Gate mockups.' },
  { id: 'skill_service', stop: 8, label: 'service_engineer', phase: 'Phase 6', mta: '3', color: 'bg-[#EE352E] text-white', border: 'border-[#EE352E]', line: '3 7th Ave Express', category: 'Phase 6: Service Engineer', icon: '⚙️', desc: 'Phase 6 — Service Engineer: Database setup first, followed by backend services & APIs.' },
  { id: 'skill_qa', stop: 9, label: 'qa_agent', phase: 'Phase 7', mta: '7', color: 'bg-[#B933AD] text-white', border: 'border-[#B933AD]', line: '7 Flushing Express', category: 'Phase 7: QA Agent', icon: '🧪', desc: 'Phase 7 — QA Agent: Automated test suites, visual diff checks, & 07_TEST_MANIFEST.md.' },
  { id: 'skill_uat', stop: 10, label: 'uat', phase: 'Phase 6 UAT', mta: 'N', color: 'bg-[#FCCC0A] text-slate-900', border: 'border-[#FCCC0A]', line: 'N Broadway Express', category: 'Cloud UAT Coordinator', icon: '⚡', desc: 'Cloud UAT Coordinator: Deploys temporary zero-config StackBlitz cloud sandbox.' },
  { id: 'skill_deploy', stop: 11, label: 'deployment', phase: 'Release', mta: '4', color: 'bg-[#00933C] text-white', border: 'border-[#00933C]', line: '4 Lex Express', category: 'Release: Deployment Lead', icon: '🚀', desc: 'Release — Deployment Lead: Provider setup, approval gates, EAS OTA, & Vercel release.' },
  { id: 'skill_arch_review', stop: 12, label: 'architecture_reviewer', phase: 'Audit', mta: 'L', color: 'bg-[#A7A9AC] text-slate-900', border: 'border-[#A7A9AC]', line: 'L Canarsie Line', category: 'Audit: Architecture Reviewer', icon: '🔍', desc: 'Audit — Architecture Reviewer: Zero-Trust Security Gatekeeper & audit log report.' }
];

const SUBWAY_STATIONS = [
  { stop: 1, name: 'orchestrator', mta: 'S', icon: '🎼', focusNodes: ['skill_builder', 'skill_orchestrator'], desc: 'State Engine initializes state in docs/PROJECT_STATUS.md.' },
  { stop: 2, name: 'it_consultant', mta: 'A', icon: '💼', focusNodes: ['skill_it'], desc: 'it_consultant conducts scope discovery and locks 01_ARCH_BRIEF.md.' },
  { stop: 3, name: 'product_owner', mta: 'C', icon: '🎯', focusNodes: ['skill_po'], desc: 'product_owner creates 02_PRD.md and 03_USER_STORIES.md.' },
  { stop: 4, name: 'techincal_architect', mta: 'F', icon: '📐', focusNodes: ['skill_architect'], desc: 'techincal_architect defines 04_TECHNICAL_SPEC.md and 05_TASK_MANIFEST.md.' },
  { stop: 5, name: 'apple_design', mta: 'B', icon: '🎨', focusNodes: ['skill_design'], desc: 'apple_design specifies HIG UI design rules and SF typography.' },
  { stop: 6, name: 'content_parser', mta: 'M', icon: '📄', focusNodes: ['skill_parser'], desc: 'content_parser extracts JSON Schemas & Zod Contracts.' },
  { stop: 7, name: 'frontend_developer', mta: '1', icon: '💻', focusNodes: ['skill_frontend'], desc: 'frontend_developer creates Visual Gate mockups & UI code.' },
  { stop: 8, name: 'service_engineer', mta: '3', icon: '⚙️', focusNodes: ['skill_service'], desc: 'service_engineer performs DB setup first, then backend APIs.' },
  { stop: 9, name: 'qa_agent', mta: '7', icon: '🧪', focusNodes: ['skill_qa'], desc: 'qa_agent executes automated test suites & visual diff checks.' },
  { stop: 10, name: 'uat', mta: 'N', icon: '⚡', focusNodes: ['skill_uat'], desc: 'uat deploys temporary StackBlitz cloud sandbox for evaluation.' },
  { stop: 11, name: 'deployment', mta: '4', icon: '🚀', focusNodes: ['skill_deploy'], desc: 'deployment manages provider setup and publishes release.' },
  { stop: 12, name: 'architecture_reviewer', mta: 'L', icon: '🔍', focusNodes: ['skill_arch_review'], desc: 'architecture_reviewer enforces zero-trust audit gate.' }
];

let currentStoryStep = 2; // Default Stop 2: it_consultant
let selectedNodeId = 'skill_it';
let currentActiveView = 'v_model'; // Default: V-Model

function initApp() {
  switchView('v_model');
  renderNodeDetails(selectedNodeId);
}

function switchView(viewName) {
  currentActiveView = viewName;

  const views = ['v_model', 'double_diamond', 'devops_loop', 'jagged_strip', 'mta_system'];
  views.forEach(v => {
    const el = document.getElementById(`view_${v}`);
    const tabBtn = document.getElementById(`tab_${v}`);
    if (el) {
      if (v === viewName) {
        el.classList.remove('hidden');
        el.classList.add('flex');
      } else {
        el.classList.add('hidden');
        el.classList.remove('flex');
      }
    }
    if (tabBtn) {
      if (v === viewName) {
        tabBtn.className = "px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm transition-all";
      } else {
        tabBtn.className = "px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors";
      }
    }
  });

  if (viewName === 'v_model') renderVModelView();
  if (viewName === 'double_diamond') renderDoubleDiamondView();
  if (viewName === 'devops_loop') renderDevOpsLoopView();
  if (viewName === 'jagged_strip') renderJaggedStripView();
  if (viewName === 'mta_system') renderMtaSystemView();
}

// -------------------------------------------------------------
// TEXTBOOK MODEL 1: ✌️ The V-Model (Validation & Verification — Pressman / Sommerville Standard)
// -------------------------------------------------------------
function renderVModelView() {
  const container = document.getElementById('vModelContainer');
  if (!container) return;

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1] || SUBWAY_STATIONS[1];

  const leftLeg = [
    { stop: 2, name: 'it_consultant', role: 'Scope & Architecture Brief', icon: '💼', level: 'User Needs' },
    { stop: 3, name: 'product_owner', role: 'PRD & Full-Stack User Stories', icon: '🎯', level: 'System PRD' },
    { stop: 4, name: 'techincal_architect', role: 'Technical Spec & Task Manifest', icon: '📐', level: 'Tech Architecture' },
    { stop: 6, name: 'content_parser', role: 'Data Contracts & Schemas', icon: '📄', level: 'Component Schemas' }
  ];

  const centerApex = [
    { stop: 7, name: 'frontend_developer', role: 'Frontend UI Slices', icon: '💻' },
    { stop: 8, name: 'service_engineer', role: 'Service & Database Setup', icon: '⚙️' }
  ];

  const rightLeg = [
    { stop: 9, name: 'qa_agent', role: 'Automated Test Suites', icon: '🧪', level: 'Unit/Integration Test' },
    { stop: 10, name: 'uat', role: 'Cloud UAT Sandbox', icon: '⚡', level: 'System Acceptance' },
    { stop: 12, name: 'architecture_reviewer', role: 'Zero-Trust Audit Gate', icon: '🔍', level: 'Security Audit' },
    { stop: 11, name: 'deployment', role: 'Production Cloud Release', icon: '🚀', level: 'Production Release' }
  ];

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
      <div class="pb-3 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 class="text-base font-bold text-slate-900">THE V-MODEL (VALIDATION & VERIFICATION)</h2>
          <p class="text-xs text-slate-500">Standard Pressman & Sommerville Software Engineering Lifecycle</p>
        </div>
        <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200">ISO / IEEE 12207</span>
      </div>

      <!-- V-Shape Grid Layout -->
      <div class="grid grid-cols-3 gap-6 relative p-4 bg-slate-50 rounded-2xl border border-slate-200">
        
        <!-- Left Leg: Verification (Specification) -->
        <div class="space-y-4">
          <div class="font-bold text-xs text-blue-600 uppercase tracking-wider text-center pb-2 border-b border-blue-200">Specification (Verification)</div>
          ${leftLeg.map(s => {
            const isCur = currentStoryStep === s.stop;
            return `
              <div onclick="setStoryStep(${s.stop})" class="p-3.5 rounded-2xl border cursor-pointer transition-all ${
                isCur ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-md ring-2 ring-blue-300' : 'bg-white border-slate-200 text-slate-800 hover:border-blue-400'
              }">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold">${s.icon} ${s.name}</span>
                  <span class="w-6 h-6 rounded-full ${isCur ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-700'} font-black text-xs flex items-center justify-center">${s.stop}</span>
                </div>
                <div class="text-[10.5px] opacity-80 mt-1">${s.role}</div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Apex Bottom: Coding Implementation -->
        <div class="flex flex-col justify-end space-y-4">
          <div class="font-bold text-xs text-purple-600 uppercase tracking-wider text-center pb-2 border-b border-purple-200">Implementation Apex</div>
          ${centerApex.map(s => {
            const isCur = currentStoryStep === s.stop;
            return `
              <div onclick="setStoryStep(${s.stop})" class="p-3.5 rounded-2xl border cursor-pointer transition-all ${
                isCur ? 'bg-purple-600 text-white font-bold border-purple-600 shadow-md ring-2 ring-purple-300' : 'bg-white border-purple-200 text-slate-800 hover:border-purple-400'
              }">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold">${s.icon} ${s.name}</span>
                  <span class="w-6 h-6 rounded-full ${isCur ? 'bg-white text-purple-600' : 'bg-purple-100 text-purple-700'} font-black text-xs flex items-center justify-center">${s.stop}</span>
                </div>
                <div class="text-[10.5px] opacity-80 mt-1">${s.role}</div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Right Leg: Validation (Testing) -->
        <div class="space-y-4">
          <div class="font-bold text-xs text-emerald-600 uppercase tracking-wider text-center pb-2 border-b border-emerald-200">Validation (Testing)</div>
          ${rightLeg.map(s => {
            const isCur = currentStoryStep === s.stop;
            return `
              <div onclick="setStoryStep(${s.stop})" class="p-3.5 rounded-2xl border cursor-pointer transition-all ${
                isCur ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-md ring-2 ring-emerald-300' : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400'
              }">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold">${s.icon} ${s.name}</span>
                  <span class="w-6 h-6 rounded-full ${isCur ? 'bg-white text-emerald-600' : 'bg-emerald-100 text-emerald-700'} font-black text-xs flex items-center justify-center">${s.stop}</span>
                </div>
                <div class="text-[10.5px] opacity-80 mt-1">${s.role}</div>
              </div>
            `;
          }).join('')}
        </div>

      </div>

      <!-- Directive Box -->
      <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3 text-xs">
        <span class="text-2xl">${activeStation.icon}</span>
        <div>
          <h4 class="font-bold text-slate-900">Step ${activeStation.stop}: ${activeStation.name}</h4>
          <p class="text-slate-600 mt-0.5">${activeStation.desc}</p>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// TEXTBOOK MODEL 2: 💎 Double Diamond Design & Delivery Model (British Design Council)
// -------------------------------------------------------------
function renderDoubleDiamondView() {
  const container = document.getElementById('doubleDiamondContainer');
  if (!container) return;

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1] || SUBWAY_STATIONS[1];

  const diamonds = [
    { title: 'DIAMOND 1: DISCOVER & DEFINE', phase: 'Problem Space', skills: [2, 3], desc: 'Divergent research ➔ Convergent PRD locking.' },
    { title: 'DIAMOND 2: ARCHITECT & SCHEMAS', phase: 'Solution Space', skills: [4, 5, 6], desc: 'Divergent architecture ➔ Convergent Zod schemas.' },
    { title: 'DIAMOND 3: BUILD & VERIFY', phase: 'Engineering', skills: [7, 8, 9], desc: 'Parallel coding ➔ Automated testing.' },
    { title: 'DELIVERY: UAT, AUDIT & SHIP', phase: 'Shipping', skills: [10, 11, 12], desc: 'StackBlitz sandbox UAT ➔ Zero-Trust Audit ➔ Production Cloud.' }
  ];

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
      <div class="pb-3 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 class="text-base font-bold text-slate-900">DOUBLE DIAMOND DESIGN & DELIVERY MODEL</h2>
          <p class="text-xs text-slate-500">British Design Council & UX Industry Standard Framework</p>
        </div>
        <span class="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs font-bold border border-indigo-200">DIVERGENT / CONVERGENT</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        ${diamonds.map(d => `
          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
            <div>
              <span class="text-[10px] font-bold text-indigo-600 uppercase font-mono block mb-1">${d.phase}</span>
              <h3 class="font-bold text-xs text-slate-900 leading-snug pb-2 border-b border-slate-200">${d.title}</h3>
              <p class="text-[11px] text-slate-500 mt-2">${d.desc}</p>
            </div>

            <div class="space-y-2 pt-2 border-t border-slate-200">
              ${d.skills.map(stNum => {
                const st = SUBWAY_STATIONS[stNum - 1];
                const isCur = st.stop === currentStoryStep;

                return `
                  <div onclick="setStoryStep(${st.stop})" class="p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isCur ? 'bg-indigo-600 text-white font-bold border-indigo-600 shadow-md' : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-400'
                  }">
                    <div class="flex items-center gap-2">
                      <span class="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${isCur ? 'bg-white text-indigo-600' : 'bg-indigo-100 text-indigo-700'}">${st.stop}</span>
                      <span class="text-xs font-bold">${st.name}</span>
                    </div>
                    <span>${st.icon}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center gap-3 text-xs">
        <span class="text-2xl">${activeStation.icon}</span>
        <div>
          <h4 class="font-bold text-slate-900">Active Phase: Step ${activeStation.stop} — ${activeStation.name}</h4>
          <p class="text-slate-600 mt-0.5">${activeStation.desc}</p>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// TEXTBOOK MODEL 3: ♾️ DevOps Continuous Infinity Loop (AWS / DevOps Standard)
// -------------------------------------------------------------
function renderDevOpsLoopView() {
  const container = document.getElementById('devopsLoopContainer');
  if (!container) return;

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1] || SUBWAY_STATIONS[1];

  const devopsStages = [
    { name: 'PLAN', icon: '📋', stops: [2, 3] },
    { name: 'CODE', icon: '📐', stops: [4, 5, 6] },
    { name: 'BUILD', icon: '💻', stops: [7, 8] },
    { name: 'TEST', icon: '🧪', stops: [9] },
    { name: 'UAT STAGE', icon: '⚡', stops: [10] },
    { name: 'DEPLOY', icon: '🚀', stops: [11] },
    { name: 'AUDIT & MONITOR', icon: '🔍', stops: [12] },
    { name: 'STATE LOOP', icon: '🎼', stops: [1] }
  ];

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
      <div class="pb-3 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 class="text-base font-bold text-slate-900">DEVOPS CONTINUOUS INFINITY LOOP</h2>
          <p class="text-xs text-slate-500">AWS & Enterprise CI/CD Continuous Engineering Model</p>
        </div>
        <span class="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 font-mono text-xs font-bold border border-cyan-200">CONTINUOUS AGENTIC SWARM</span>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${devopsStages.map(stg => `
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-200">
              <span class="font-bold text-xs text-cyan-700 font-mono">${stg.name}</span>
              <span class="text-base">${stg.icon}</span>
            </div>

            <div class="space-y-2">
              ${stg.stops.map(stNum => {
                const st = SUBWAY_STATIONS[stNum - 1];
                const isCur = st.stop === currentStoryStep;

                return `
                  <div onclick="setStoryStep(${st.stop})" class="p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isCur ? 'bg-cyan-600 text-white font-bold border-cyan-600 shadow-md' : 'bg-white border-slate-200 text-slate-800 hover:border-cyan-400'
                  }">
                    <div class="flex items-center gap-2">
                      <span class="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${isCur ? 'bg-white text-cyan-600' : 'bg-cyan-100 text-cyan-700'}">${st.stop}</span>
                      <span class="text-xs font-bold truncate">${st.name}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center gap-3 text-xs">
        <span class="text-2xl">${activeStation.icon}</span>
        <div>
          <h4 class="font-bold text-slate-900">DevOps Stage: Step ${activeStation.stop} — ${activeStation.name}</h4>
          <p class="text-slate-600 mt-0.5">${activeStation.desc}</p>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// VARIANT 4: ⚡ Jagged Zig-Zag Track Line Subway Map
// -------------------------------------------------------------
function renderJaggedStripView() {
  const container = document.getElementById('jaggedStripContainer');
  if (!container) return;

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1] || SUBWAY_STATIONS[1];

  const width = 900;
  const height = 200;
  const paddingX = 40;
  const stepX = (width - paddingX * 2) / (SUBWAY_STATIONS.length - 1);

  const points = SUBWAY_STATIONS.map((st, i) => {
    const x = paddingX + i * stepX;
    const y = i % 2 === 0 ? 45 : 145;
    return { ...st, x, y };
  });

  const fullPathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const activePoints = points.slice(0, currentStoryStep);
  const activePathD = activePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6 select-none font-sans">
      
      <div class="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-inner relative overflow-hidden h-[260px] flex items-center justify-center">
        
        <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 ${width} ${height}">
          <path d="${fullPathD}" fill="none" stroke="#e2e8f0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="${activePathD}" fill="none" stroke="#007aff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" class="transition-all duration-300"/>
        </svg>

        <div class="relative w-full h-full">
          ${points.map((p) => {
            const isPassed = p.stop < currentStoryStep;
            const isCurrent = p.stop === currentStoryStep;

            const leftPct = (p.x / width) * 100;
            const topPct = (p.y / height) * 100;
            const isTopNode = p.stop % 2 !== 0;

            return `
              <div onclick="setStoryStep(${p.stop})" 
                style="left: ${leftPct}%; top: ${topPct}%;" 
                class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-10">
                
                <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/30 scale-125 font-black shadow-lg z-20'
                    : isPassed
                    ? 'bg-blue-500 text-white font-bold shadow-sm'
                    : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-blue-400'
                }">
                  ${p.stop}
                </div>

                <div class="absolute ${isTopNode ? '-top-8' : 'top-12'} flex flex-col items-center whitespace-nowrap">
                  <span class="text-[10.5px] font-bold ${isCurrent ? 'text-blue-600 font-extrabold' : 'text-slate-700'}">
                    ${p.icon} ${p.name}
                  </span>
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </div>

      <div class="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-center gap-4 text-xs">
        <span class="text-3xl">${activeStation.icon}</span>
        <div>
          <h4 class="font-bold text-sm text-slate-900">Station ${activeStation.stop}: ${activeStation.name}</h4>
          <p class="text-slate-600 mt-1 leading-relaxed text-xs">${activeStation.desc}</p>
        </div>
      </div>

    </div>
  `;
}

// -------------------------------------------------------------
// VARIANT 5: 🗺️ MTA System Trunk Line Map
// -------------------------------------------------------------
function renderMtaSystemView() {
  const container = document.getElementById('mtaSystemContainer');
  if (!container) return;

  const mtaTrunks = [
    { title: 'A C E Line (Discovery Trunk)', color: 'bg-[#0039A6]', border: 'border-[#0039A6]', bullet: 'A', ids: ['skill_it', 'skill_po'] },
    { title: 'B D F M Line (Architecture & UX)', color: 'bg-[#FF6319]', border: 'border-[#FF6319]', bullet: 'F', ids: ['skill_architect', 'skill_design', 'skill_parser'] },
    { title: '1 2 3 Line (Engineering Trunk)', color: 'bg-[#EE352E]', border: 'border-[#EE352E]', bullet: '1', ids: ['skill_frontend', 'skill_service'] },
    { title: '7 / N Q R Line (QA & UAT Express)', color: 'bg-[#B933AD]', border: 'border-[#B933AD]', bullet: '7', ids: ['skill_qa', 'skill_uat'] },
    { title: '4 5 6 Line (Cloud Release)', color: 'bg-[#00933C]', border: 'border-[#00933C]', bullet: '4', ids: ['skill_deploy'] },
    { title: 'L Line (Zero-Trust Audit)', color: 'bg-[#A7A9AC]', border: 'border-[#A7A9AC]', bullet: 'L', ids: ['skill_arch_review'] },
    { title: 'S Shuttle Line (Swarm Hub)', color: 'bg-[#808183]', border: 'border-[#808183]', bullet: 'S', ids: ['skill_builder', 'skill_orchestrator'] }
  ];

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1];

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6">
      
      <div class="bg-black text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-600 font-black text-white text-base flex items-center justify-center">MTA</div>
          <div>
            <h2 class="text-sm font-black uppercase tracking-tight">MTA NYC SUBWAY SYSTEM TRUNK MAP</h2>
            <span class="text-xs text-slate-300 font-mono">12 Station Stops across 7 Color-Coded MTA Lines</span>
          </div>
        </div>
        <span class="px-3 py-1 rounded-full bg-yellow-400 text-black font-black text-xs uppercase">ALL LINES OPERATING</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${mtaTrunks.map(trunk => {
          const trunkSkills = SDLC_SWARM_NODES.filter(n => trunk.ids.includes(n.id));

          return `
            <div class="bg-slate-50 border-2 ${trunk.border} rounded-2xl p-4 shadow-sm">
              <div class="flex items-center gap-2.5 pb-3 border-b border-slate-200 mb-3">
                <span class="w-7 h-7 rounded-full ${trunk.color} font-black text-xs flex items-center justify-center shadow-sm shrink-0">${trunk.bullet}</span>
                <h3 class="font-black text-xs text-slate-900 uppercase">${trunk.title}</h3>
              </div>

              <div class="space-y-2">
                ${trunkSkills.map(s => {
                  const isSel = selectedNodeId === s.id;
                  const isCur = activeStation && activeStation.focusNodes.includes(s.id);

                  return `
                    <div onclick="selectNode('${s.id}')" class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isCur
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                        : isSel
                        ? 'bg-white border-blue-500 font-bold shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                    }">
                      <div class="flex items-center gap-2.5">
                        <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                          isCur ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }">${s.stop}</span>
                        <span class="text-base">${s.icon}</span>
                        <span class="text-xs font-bold">${s.label}</span>
                      </div>
                      <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isCur ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}">MTA (${s.mta})</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

function selectNode(nodeId) {
  selectedNodeId = nodeId;
  const node = SDLC_SWARM_NODES.find(n => n.id === nodeId);
  if (node && node.stop) {
    currentStoryStep = node.stop;
  }
  renderNodeDetails(nodeId);
  switchView(currentActiveView);
}

function renderNodeDetails(nodeId) {
  const node = SDLC_SWARM_NODES.find(n => n.id === nodeId);
  const detailEl = document.getElementById('nodeDetailContainer');

  if (!node || !detailEl) return;

  detailEl.innerHTML = `
    <div class="flex items-center justify-between pb-3 border-b border-slate-200/80">
      <div class="flex items-center gap-2.5">
        <span class="text-2xl">${node.icon}</span>
        <div>
          <h3 class="text-base font-bold text-slate-900 tracking-tight">${node.label}</h3>
          <span class="text-xs text-slate-500 font-mono">${node.category}</span>
        </div>
      </div>
      <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600 text-white">
        STOP ${node.stop || 1}
      </span>
    </div>

    <div class="mt-3 space-y-3 text-xs">
      <div>
        <label class="text-[10.5px] uppercase font-semibold text-slate-400 tracking-wider">PROJECT_BUILDER Skill Directive</label>
        <p class="text-slate-700 mt-1 leading-relaxed font-normal">${node.desc}</p>
      </div>
    </div>
  `;
}

function setStoryStep(stepNum) {
  currentStoryStep = stepNum;
  const stepObj = SUBWAY_STATIONS[stepNum - 1];
  if (stepObj) {
    selectedNodeId = stepObj.focusNodes[0];
    renderNodeDetails(selectedNodeId);
  }
  switchView(currentActiveView);
}

window.addEventListener('DOMContentLoaded', initApp);
