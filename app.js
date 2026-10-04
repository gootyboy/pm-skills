// SDLC Swarm Skills Visualizer — Engine & UI Controller
// Supports SDLC Pipeline Board + Authentic NYC Subway In-Car Digital LED Station Strip

const SDLC_SWARM_NODES = [
  { id: 'skill_builder', stop: 1, label: 'PROJECT_BUILDER_SKILL.md', mta: 'S', line: 'Shuttle Bus', category: 'Swarm Hub Controller', icon: '👑', desc: 'Master Swarm Controller: Sets autonomy modes (BALANCED / AUTOPILOT / SUPERVISED) and manages system lifecycle.' },
  { id: 'skill_orchestrator', stop: 1, label: 'orchestrator', mta: 'S', line: 'Shuttle Bus', category: 'State Engine', icon: '🎼', desc: 'State Engine: Overwrites docs/PROJECT_STATUS.md every turn to maintain rolling 3-session state and routing.' },

  { id: 'skill_it', stop: 2, label: 'it_consultant', phase: 'Phase 1', mta: 'A', line: '8th Ave Express', category: 'Phase 1: IT Consultant', icon: '💼', desc: 'Phase 1 — IT Consultant (Solutions Architect): Conducts scope discovery, technology evaluation, and outputs 01_ARCH_BRIEF.md.' },
  { id: 'skill_po', stop: 3, label: 'product_owner', phase: 'Phase 2', mta: 'C', line: '8th Ave Local', category: 'Phase 2: Product Owner', icon: '🎯', desc: 'Phase 2 — Product Owner: Transforms architectural brief into 02_PRD.md and full-stack vertical 03_USER_STORIES.md.' },
  { id: 'skill_architect', stop: 4, label: 'techincal_architect', phase: 'Phase 3', mta: 'F', line: '6th Ave Express', category: 'Phase 3: Technical Architect', icon: '📐', desc: 'Phase 3 — Technical Architect: Defines system architecture, 04_TECHNICAL_SPEC.md, and 05_TASK_MANIFEST.md.' },
  { id: 'skill_parser', stop: 5, label: 'content_parser', phase: 'Phase 4', mta: 'M', line: '6th Ave Local', category: 'Phase 4: Content Parser', icon: '📄', desc: 'Phase 4 — Content Parser (Schema Engine): Generates strict JSON Schemas & Zod Contracts in src/assets/schemas/.' },
  { id: 'skill_frontend', stop: 6, label: 'frontend_developer', phase: 'Phase 5', mta: '1', line: 'Broadway Local', category: 'Phase 5: Frontend Developer', icon: '💻', desc: 'Phase 5 — Frontend Developer: Implements visual components (Step 0: Visual Gate mockups -> UI component code).' },
  { id: 'skill_design', stop: 6, label: 'apple_design', phase: 'Phase 5 Guide', mta: '2', line: 'Broadway Express', category: 'Phase 5: UI/UX Rules', icon: '🎨', desc: 'Apple Design System Rules: Provides Apple HIG tokens, SF typography, and glassmorphism specs for Frontend Dev.' },
  { id: 'skill_service', stop: 7, label: 'service_engineer', phase: 'Phase 6', mta: '3', line: '7th Ave Express', category: 'Phase 6: Service Engineer', icon: '⚙️', desc: 'Phase 6 — Service Engineer: Database setup first, followed by backend services, data access layers, and API endpoints.' },
  { id: 'skill_qa', stop: 8, label: 'qa_agent', phase: 'Phase 7', mta: '7', line: 'Flushing Express', category: 'Phase 7: QA Agent', icon: '🧪', desc: 'Phase 7 — QA Agent: Automated test suites, visual diff checks against mockups, and 07_TEST_MANIFEST.md.' },
  { id: 'skill_deploy', stop: 9, label: 'deployment', phase: 'Release', mta: '4', line: 'Lexington Express', category: 'Release: Deployment Lead', icon: '🚀', desc: 'Release — Deployment Lead: Handles provider setup, approval checkpoints, EAS OTA / Native, and Vercel cloud deployment.' },
  { id: 'skill_arch_review', stop: 10, label: 'architecture_reviewer', phase: 'Audit', mta: 'L', line: 'Canarsie Local', category: 'Audit: Architecture Reviewer', icon: '🔍', desc: 'Audit — Architecture Reviewer: Zero-Trust Security & Quality Gatekeeper auditing all deliverables against contracts.' }
];

const SUBWAY_STATIONS = [
  { stop: 1, name: 'Swarm Hub Station', mta: 'S', line: 'Shuttle Loop', focusNodes: ['skill_builder', 'skill_orchestrator'], desc: 'State Engine initializes workspace state in docs/PROJECT_STATUS.md.' },
  { stop: 2, name: 'Scope Discovery Station', mta: 'A', line: '8th Ave Line', focusNodes: ['skill_it'], desc: 'it_consultant conducts scope discovery and locks 01_ARCH_BRIEF.md.' },
  { stop: 3, name: 'PRD & Stories Station', mta: 'C', line: '8th Ave Line', focusNodes: ['skill_po'], desc: 'product_owner converts brief into 02_PRD.md and 03_USER_STORIES.md.' },
  { stop: 4, name: 'Tech Spec Station', mta: 'F', line: '6th Ave Line', focusNodes: ['skill_architect'], desc: 'techincal_architect defines 04_TECHNICAL_SPEC.md and 05_TASK_MANIFEST.md.' },
  { stop: 5, name: 'Data Schemas Station', mta: 'M', line: '6th Ave Line', focusNodes: ['skill_parser'], desc: 'content_parser generates JSON Schemas & Zod Contracts.' },
  { stop: 6, name: 'UI Component Station', mta: '1', line: 'Broadway Line', focusNodes: ['skill_frontend', 'skill_design'], desc: 'frontend_developer creates Visual Gate mockups and UI code.' },
  { stop: 7, name: 'Database & Service Station', mta: '3', line: '7th Ave Line', focusNodes: ['skill_service'], desc: 'service_engineer performs DB setup first, then backend APIs.' },
  { stop: 8, name: 'QA Verification Station', mta: '7', line: 'Flushing Line', focusNodes: ['skill_qa'], desc: 'qa_agent executes automated test suites & visual diff checks.' },
  { stop: 9, name: 'Cloud Release Station', mta: '4', line: 'Lexington Line', focusNodes: ['skill_deploy'], desc: 'deployment manages provider setup and publishes release.' },
  { stop: 10, name: 'Zero-Trust Audit Terminal', mta: 'L', line: 'Canarsie Line', focusNodes: ['skill_arch_review'], desc: 'architecture_reviewer enforces zero-trust audit gate.' }
];

let currentStoryStep = 2; // Default Stop 2: Scope Discovery Station
let selectedNodeId = 'skill_it';
let currentActiveView = 'pipeline';

function initApp() {
  switchView('pipeline');
  renderNodeDetails(selectedNodeId);
}

function switchView(viewName) {
  currentActiveView = viewName;

  const views = ['pipeline', 'subway'];
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

  if (viewName === 'pipeline') renderPipelineView();
  if (viewName === 'subway') renderSubwayCarView();
}

// -------------------------------------------------------------
// VIEW 1: SDLC Pipeline Board
// -------------------------------------------------------------
function renderPipelineView() {
  const container = document.getElementById('pipelineBoard');
  if (!container) return;

  const columns = [
    { title: '🎮 Swarm Hub & State', phase: 'State', ids: ['skill_builder', 'skill_orchestrator'], color: 'border-purple-300 bg-purple-50/40' },
    { title: '💡 Phase 1: Scope Discovery', phase: 'Phase 1', ids: ['skill_it'], color: 'border-blue-300 bg-blue-50/40' },
    { title: '🎯 Phase 2: Requirements', phase: 'Phase 2', ids: ['skill_po'], color: 'border-cyan-300 bg-cyan-50/40' },
    { title: '📐 Phase 3: Tech Architecture', phase: 'Phase 3', ids: ['skill_architect'], color: 'border-indigo-300 bg-indigo-50/40' },
    { title: '📄 Phase 4: Data Contracts', phase: 'Phase 4', ids: ['skill_parser'], color: 'border-teal-300 bg-teal-50/40' },
    { title: '💻 Phase 5: Frontend UI', phase: 'Phase 5', ids: ['skill_frontend', 'skill_design'], color: 'border-emerald-300 bg-emerald-50/40' },
    { title: '⚙️ Phase 6: Service & DB', phase: 'Phase 6', ids: ['skill_service'], color: 'border-amber-300 bg-amber-50/40' },
    { title: '🧪 Phase 7: QA Verification', phase: 'Phase 7', ids: ['skill_qa'], color: 'border-orange-300 bg-orange-50/40' },
    { title: '🚀 Release: Deployment Lead', phase: 'Release', ids: ['skill_deploy'], color: 'border-rose-300 bg-rose-50/40' },
    { title: '🛡️ Audit: Architecture Review', phase: 'Audit', ids: ['skill_arch_review'], color: 'border-slate-300 bg-slate-100/60' }
  ];

  const currentStation = SUBWAY_STATIONS[currentStoryStep - 1];

  container.innerHTML = columns.map(col => {
    const colSkills = SDLC_SWARM_NODES.filter(n => col.ids.includes(n.id));

    const cardHtml = colSkills.map(s => {
      const isSelected = selectedNodeId === s.id;
      const isCurrentStop = currentStation && currentStation.focusNodes.includes(s.id);
      
      return `
        <div onclick="selectNode('${s.id}')" class="p-3.5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
          isCurrentStop
            ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400 scale-[1.02]'
            : isSelected
            ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-md'
            : 'bg-white/90 border-slate-200 hover:border-slate-300 hover:shadow'
        }">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-lg">${s.icon}</span>
              <h4 class="font-bold text-xs ${isCurrentStop ? 'text-white' : 'text-slate-900'}">${s.label}</h4>
            </div>
            ${s.isCenter ? `<span class="text-[9px] font-mono px-2 py-0.5 rounded-full ${isCurrentStop ? 'bg-purple-400/30 text-white' : 'bg-purple-100 text-purple-700 font-semibold'}">HUB</span>` : ''}
          </div>
          <p class="text-[11px] ${isCurrentStop ? 'text-blue-100' : 'text-slate-500'} mt-2 leading-relaxed line-clamp-2">${s.desc}</p>
        </div>
      `;
    }).join('');

    return `
      <div class="flex-1 min-w-[230px] rounded-3xl border ${col.color} p-3 flex flex-col gap-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-200/60 px-1">
          <h3 class="font-bold text-xs text-slate-800 tracking-tight">${col.title}</h3>
          <span class="text-[10px] font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">${colSkills.length}</span>
        </div>
        <div class="flex flex-col gap-2.5 flex-1">
          ${cardHtml}
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// VIEW 2: NYC Subway In-Car Digital LED Station Indicator Bar
// -------------------------------------------------------------
function renderSubwayCarView() {
  const container = document.getElementById('nycSubwayContainer');
  if (!container) return;

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1] || SUBWAY_STATIONS[1];
  const activeAgents = SDLC_SWARM_NODES.filter(n => activeStation.focusNodes.includes(n.id));

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-slate-900 text-white rounded-3xl p-6 border-4 border-slate-700 shadow-2xl space-y-6 font-sans select-none">
      
      <!-- In-Car Metallic Overhead Banner -->
      <div class="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-4 rounded-2xl border border-slate-600 flex items-center justify-between shadow-lg">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-600 font-black text-white text-base flex items-center justify-center border-2 border-white shadow">MTA</div>
          <div>
            <div class="text-[10px] font-mono text-slate-300 uppercase tracking-widest">N.Y.C. SUBWAY CAR #7420 • R211 IN-CAR DISPLAY</div>
            <h2 class="text-sm font-black tracking-tight text-white uppercase">SDLC EXPRESS LINE — UPTOWN & THE BRONX</h2>
          </div>
        </div>

        <!-- Next Stop Digital Matrix Screen -->
        <div class="bg-black border-2 border-emerald-500/80 px-4 py-2 rounded-xl text-right font-mono shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <span class="text-[10px] text-emerald-400 block font-bold uppercase tracking-widest animate-pulse">📢 NEXT STOP</span>
          <span class="text-xs font-bold text-emerald-300">STOP ${activeStation.stop}: ${activeStation.name.toUpperCase()}</span>
        </div>
      </div>

      <!-- IN-CAR DIGITAL STATIONS LED ROUTE STRIP -->
      <div class="bg-slate-950 p-6 rounded-3xl border-2 border-slate-800 shadow-inner space-y-4">
        <div class="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
          <span>DOWNTOWN BROOKLYN ◄</span>
          <span class="text-blue-400 font-bold">ROUTE PROGRESS: STOP ${currentStoryStep} OF 10</span>
          <span>► UPTOWN BRONX</span>
        </div>

        <!-- Horizontal Track Line & LED Stations -->
        <div class="relative py-8 flex items-center justify-between px-4">
          <!-- Background Connecting Track Line -->
          <div class="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-3 bg-slate-800 rounded-full z-0"></div>
          
          <!-- Active Green Passed Line Progress Bar -->
          <div class="absolute left-6 top-1/2 -translate-y-1/2 h-3 bg-emerald-500 rounded-full z-0 transition-all duration-500" style="width: ${((currentStoryStep - 1) / 9) * 100}%"></div>

          <!-- 10 Sequential LED Station Nodes -->
          ${SUBWAY_STATIONS.map((st) => {
            const isPassed = st.stop < currentStoryStep;
            const isCurrent = st.stop === currentStoryStep;
            const isUpcoming = st.stop > currentStoryStep;

            return `
              <div onclick="setStoryStep(${st.stop})" class="relative z-10 flex flex-col items-center cursor-pointer group">
                
                <!-- Station LED Circle -->
                <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isCurrent
                    ? 'bg-yellow-400 text-slate-950 ring-4 ring-yellow-400/50 scale-125 shadow-[0_0_20px_rgba(250,204,21,0.8)] font-black'
                    : isPassed
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
                }">
                  ${st.mta}
                </div>

                <!-- Station Number & Name Tag -->
                <div class="absolute top-12 flex flex-col items-center w-20 text-center">
                  <span class="text-[10px] font-mono font-bold ${isCurrent ? 'text-yellow-400' : isPassed ? 'text-emerald-400' : 'text-slate-500'}">STOP ${st.stop}</span>
                  <span class="text-[9.5px] font-semibold ${isCurrent ? 'text-white font-bold' : 'text-slate-400'} truncate w-full mt-0.5">${st.name.replace(' Station', '')}</span>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Station Detail Inspector Box (Matches NYC Subway Car Info Panel) -->
      <div class="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-yellow-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shrink-0">
            ${activeStation.mta}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-yellow-400 uppercase tracking-wider">CURRENT TRAIN POSITION</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900 text-blue-200 border border-blue-700">${activeStation.line}</span>
            </div>
            <h3 class="text-base font-bold text-white mt-0.5">${activeStation.name} (${activeStation.focusNodes[0]})</h3>
            <p class="text-xs text-slate-300 mt-1 leading-relaxed">${activeStation.desc}</p>
          </div>
        </div>

        <!-- Train Controls -->
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="prevStoryStep()" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors">⏮ Prev Stop</button>
          <button onclick="nextStoryStep()" class="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs shadow-md transition-colors">Train Moving to Next Stop 🚆</button>
        </div>
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
      <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-yellow-400 text-slate-950">
        STOP ${node.stop || 1} (${node.mta})
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
  const banner = document.getElementById('storyBanner');
  const title = document.getElementById('storyTitle');
  const desc = document.getElementById('storyDesc');

  if (stepNum === 0) {
    if (banner) banner.classList.add('hidden');
  } else {
    if (banner) banner.classList.remove('hidden');
    const stepObj = SUBWAY_STATIONS[stepNum - 1];
    if (title) title.innerText = stepObj.name;
    if (desc) desc.innerText = stepObj.desc;
    selectedNodeId = stepObj.focusNodes[0];
    renderNodeDetails(selectedNodeId);
  }

  switchView(currentActiveView);
}

function nextStoryStep() {
  currentStoryStep = currentStoryStep < 10 ? currentStoryStep + 1 : 1;
  setStoryStep(currentStoryStep);
}

function prevStoryStep() {
  currentStoryStep = currentStoryStep > 1 ? currentStoryStep - 1 : 10;
  setStoryStep(currentStoryStep);
}

window.addEventListener('DOMContentLoaded', initApp);
