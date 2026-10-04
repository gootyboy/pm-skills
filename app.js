// SDLC Swarm Skills Visualizer — NYC Subway Style Variants Engine

const SDLC_SWARM_NODES = [
  { id: 'skill_builder', stop: 1, label: 'PROJECT_BUILDER_SKILL.md', mta: 'S', color: 'bg-[#808183] text-white', border: 'border-[#808183]', line: 'S Shuttle', category: 'Swarm Hub Controller', icon: '👑', desc: 'Master Swarm Controller: Sets autonomy modes (BALANCED / AUTOPILOT / SUPERVISED) and manages system lifecycle.' },
  { id: 'skill_orchestrator', stop: 1, label: 'orchestrator', mta: 'S', color: 'bg-[#808183] text-white', border: 'border-[#808183]', line: 'S Shuttle', category: 'State Engine', icon: '🎼', desc: 'State Engine: Overwrites docs/PROJECT_STATUS.md every turn to maintain rolling 3-session state and routing.' },

  { id: 'skill_it', stop: 2, label: 'it_consultant', phase: 'Phase 1', mta: 'A', color: 'bg-[#0039A6] text-white', border: 'border-[#0039A6]', line: 'A 8th Ave Express', category: 'Phase 1: IT Consultant', icon: '💼', desc: 'Phase 1 — IT Consultant (Solutions Architect): Scope discovery, trade-off negotiation, & 01_ARCH_BRIEF.md.' },
  { id: 'skill_po', stop: 3, label: 'product_owner', phase: 'Phase 2', mta: 'C', color: 'bg-[#0039A6] text-white', border: 'border-[#0039A6]', line: 'C 8th Ave Local', category: 'Phase 2: Product Owner', icon: '🎯', desc: 'Phase 2 — Product Owner: 02_PRD.md & full-stack vertical 03_USER_STORIES.md.' },
  { id: 'skill_architect', stop: 4, label: 'techincal_architect', phase: 'Phase 3', mta: 'F', color: 'bg-[#FF6319] text-white', border: 'border-[#FF6319]', line: 'F 6th Ave Express', category: 'Phase 3: Technical Architect', icon: '📐', desc: 'Phase 3 — Technical Architect: 04_TECHNICAL_SPEC.md & 05_TASK_MANIFEST.md.' },
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
let currentActiveView = 'mta_system'; // Default: MTA System Map

function initApp() {
  switchView('mta_system');
  renderNodeDetails(selectedNodeId);
}

function switchView(viewName) {
  currentActiveView = viewName;

  const views = ['mta_system', 'winding', 'vertical', 'junction'];
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

  if (viewName === 'mta_system') renderMtaSystemView();
  if (viewName === 'winding') renderWindingRouteView();
  if (viewName === 'vertical') renderVerticalPillarView();
  if (viewName === 'junction') renderJunctionTerminalView();
}

// -------------------------------------------------------------
// VARIANT 1: 🗺️ MTA System Trunk Line Map
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

// -------------------------------------------------------------
// VARIANT 2: 🚇 Winding S-Curve Route Map (3 Rows of 4 Stations)
// -------------------------------------------------------------
function renderWindingRouteView() {
  const container = document.getElementById('windingRouteContainer');
  if (!container) return;

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1] || SUBWAY_STATIONS[1];

  const row1 = SUBWAY_STATIONS.slice(0, 4);
  const row2 = SUBWAY_STATIONS.slice(4, 8);
  const row3 = SUBWAY_STATIONS.slice(8, 12);

  const renderRow = (stations) => {
    return stations.map(st => {
      const isPassed = st.stop < currentStoryStep;
      const isCurrent = st.stop === currentStoryStep;

      return `
        <div onclick="setStoryStep(${st.stop})" class="flex-1 p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
          isCurrent
            ? 'bg-blue-600 text-white border-blue-600 shadow-lg ring-4 ring-blue-500/20 scale-[1.03] z-10'
            : isPassed
            ? 'bg-white border-blue-400 text-slate-900 shadow-sm hover:border-blue-500'
            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 shadow-sm'
        }">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
            isCurrent
              ? 'bg-white text-blue-600 shadow-md'
              : isPassed
              ? 'bg-blue-500 text-white'
              : 'bg-slate-100 text-slate-700 border border-slate-300'
          }">
            ${st.stop}
          </div>

          <div class="min-w-0 pr-1">
            <div class="flex items-center gap-1 font-bold text-xs truncate">
              <span>${st.icon}</span>
              <span class="truncate ${isCurrent ? 'text-white font-extrabold' : 'text-slate-900'}">${st.name}</span>
            </div>
            <div class="text-[10px] ${isCurrent ? 'text-blue-100' : 'text-slate-500'} mt-0.5 font-mono truncate">
              Stop ${st.stop} / 12
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-8 select-none font-sans">
      
      <div class="space-y-6">
        <div class="flex items-center justify-between gap-4">${renderRow(row1)}</div>
        <div class="flex justify-end pr-12 -my-2"><div class="w-8 h-8 border-r-4 border-b-4 border-blue-500 rounded-br-2xl"></div></div>
        <div class="flex items-center justify-between gap-4">${renderRow(row2)}</div>
        <div class="flex justify-start pl-12 -my-2"><div class="w-8 h-8 border-l-4 border-b-4 border-blue-500 rounded-bl-2xl"></div></div>
        <div class="flex items-center justify-between gap-4">${renderRow(row3)}</div>
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
// VARIANT 3: 📊 Vertical Station Strip & Platform Pillars
// -------------------------------------------------------------
function renderVerticalPillarView() {
  const container = document.getElementById('verticalPillarContainer');
  if (!container) return;

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1] || SUBWAY_STATIONS[1];
  const activeNode = SDLC_SWARM_NODES.find(n => activeStation.focusNodes.includes(n.id)) || SDLC_SWARM_NODES[0];

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 shadow-xl flex gap-6">
      
      <!-- Left Column: Vertical MTA Station Column -->
      <div class="w-80 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-2 overflow-y-auto h-[500px]">
        <div class="font-bold text-xs text-slate-800 pb-2 border-b border-slate-200 uppercase font-mono">Subway Line Column</div>
        
        <div class="space-y-2">
          ${SUBWAY_STATIONS.map(st => {
            const isCur = st.stop === currentStoryStep;
            const isPas = st.stop < currentStoryStep;

            return `
              <div onclick="setStoryStep(${st.stop})" class="p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                isCur ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold' : isPas ? 'bg-white border-blue-300 text-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                    isCur ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }">${st.stop}</span>
                  <span class="text-base">${st.icon}</span>
                  <span class="text-xs font-bold truncate">${st.name}</span>
                </div>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isCur ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}">MTA (${st.mta})</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Right Column: Station Deliverable Canvas -->
      <div class="flex-1 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pb-4 border-b border-slate-200">
            <div class="flex items-center gap-3">
              <span class="text-3xl">${activeNode.icon}</span>
              <div>
                <h3 class="text-base font-bold text-slate-900">Station ${activeStation.stop}: ${activeNode.label}</h3>
                <span class="text-xs text-blue-600 font-mono font-semibold">${activeNode.category}</span>
              </div>
            </div>
            <span class="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow">
              ${activeStation.stop}
            </span>
          </div>

          <div class="mt-4">
            <h4 class="text-xs font-bold uppercase text-slate-400 tracking-wider">PROJECT_BUILDER Directive</h4>
            <p class="text-sm text-slate-700 mt-1 leading-relaxed">${activeNode.desc}</p>
          </div>
        </div>

        <div class="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-700">Subway Handoff Status:</span>
          <span class="px-3 py-1 bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-200 rounded-full">STOP ACTIVE — DELIVERABLE LOCKED</span>
        </div>
      </div>

    </div>
  `;
}

// -------------------------------------------------------------
// VARIANT 4: 🔀 Metro Transfer Terminal Grid
// -------------------------------------------------------------
function renderJunctionTerminalView() {
  const container = document.getElementById('junctionTerminalContainer');
  if (!container) return;

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1] || SUBWAY_STATIONS[1];

  const junctions = [
    { title: '🏢 Times Sq-42 St Hub (Discovery)', stops: [1, 2, 3] },
    { title: '📐 Grand Central Terminal (Architecture)', stops: [4, 5, 6] },
    { title: '💻 Fulton St Terminal (Engineering)', stops: [7, 8] },
    { title: '🚀 Union Sq Station (QA, UAT & Release)', stops: [9, 10, 11, 12] }
  ];

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6">
      <div class="pb-3 border-b border-slate-200">
        <h2 class="text-base font-bold text-slate-900">METRO TRANSFER TERMINAL JUNCTION GRID</h2>
        <p class="text-xs text-slate-500">Major NYC Subway Handoff Terminals across 12 Station Stops</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${junctions.map(j => `
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 class="font-bold text-xs text-slate-800 uppercase tracking-tight pb-2 border-b border-slate-200">${j.title}</h3>
            <div class="space-y-2">
              ${j.stops.map(stNum => {
                const st = SUBWAY_STATIONS[stNum - 1];
                const isCur = st.stop === currentStoryStep;

                return `
                  <div onclick="setStoryStep(${st.stop})" class="p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isCur ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-md' : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                  }">
                    <div class="flex items-center gap-2.5">
                      <span class="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                        isCur ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }">${st.stop}</span>
                      <span class="text-base">${st.icon}</span>
                      <span class="text-xs font-bold">${st.name}</span>
                    </div>
                    <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isCur ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}">MTA (${st.mta})</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('');
      }
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
