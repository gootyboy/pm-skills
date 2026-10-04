// SDLC Swarm Skills Visualizer — Engine & UI Controller
// Supports SDLC Pipeline Board + Authentic Winding S-Curve NYC Subway Track Map

const SDLC_SWARM_NODES = [
  { id: 'skill_builder', stop: 1, label: 'PROJECT_BUILDER_SKILL.md', category: 'Swarm Hub Controller', icon: '👑', desc: 'Master Swarm Controller: Sets autonomy modes (BALANCED / AUTOPILOT / SUPERVISED) and manages system lifecycle.' },
  { id: 'skill_orchestrator', stop: 1, label: 'orchestrator', category: 'State Engine', icon: '🎼', desc: 'State Engine: Overwrites docs/PROJECT_STATUS.md every turn to maintain rolling 3-session state and routing.' },

  { id: 'skill_it', stop: 2, label: 'it_consultant', phase: 'Phase 1', category: 'Phase 1: IT Consultant', icon: '💼', desc: 'Phase 1 — IT Consultant (Solutions Architect): Scope discovery, trade-off negotiation, & 01_ARCH_BRIEF.md.' },
  { id: 'skill_po', stop: 3, label: 'product_owner', phase: 'Phase 2', category: 'Phase 2: Product Owner', icon: '🎯', desc: 'Phase 2 — Product Owner: 02_PRD.md & full-stack vertical 03_USER_STORIES.md.' },
  { id: 'skill_architect', stop: 4, label: 'techincal_architect', phase: 'Phase 3', category: 'Phase 3: Technical Architect', icon: '📐', desc: 'Phase 3 — Technical Architect: 04_TECHNICAL_SPEC.md & 05_TASK_MANIFEST.md.' },
  { id: 'skill_design', stop: 5, label: 'apple_design', phase: 'Phase 3 UX', category: 'Phase 3: UI/UX System', icon: '🎨', desc: 'Apple Design Rules: HIG design specs, SF typography, & glassmorphism tokens.' },
  { id: 'skill_parser', stop: 6, label: 'content_parser', phase: 'Phase 4', category: 'Phase 4: Content Parser', icon: '📄', desc: 'Phase 4 — Content Parser: JSON Schemas & Zod Contracts in src/assets/schemas/.' },
  { id: 'skill_frontend', stop: 7, label: 'frontend_developer', phase: 'Phase 5', category: 'Phase 5: Frontend Developer', icon: '💻', desc: 'Phase 5 — Frontend Developer: UI Slices & Step 0 Visual Gate mockups.' },
  { id: 'skill_service', stop: 8, label: 'service_engineer', phase: 'Phase 6', category: 'Phase 6: Service Engineer', icon: '⚙️', desc: 'Phase 6 — Service Engineer: Database setup first, followed by backend services & APIs.' },
  { id: 'skill_qa', stop: 9, label: 'qa_agent', phase: 'Phase 7', category: 'Phase 7: QA Agent', icon: '🧪', desc: 'Phase 7 — QA Agent: Automated test suites, visual diff checks, & 07_TEST_MANIFEST.md.' },
  { id: 'skill_uat', stop: 10, label: 'uat', phase: 'Phase 6 UAT', category: 'Cloud UAT Coordinator', icon: '⚡', desc: 'Cloud UAT Coordinator: Deploys temporary zero-config StackBlitz cloud sandbox.' },
  { id: 'skill_deploy', stop: 11, label: 'deployment', phase: 'Release', category: 'Release: Deployment Lead', icon: '🚀', desc: 'Release — Deployment Lead: Provider setup, approval gates, EAS OTA, & Vercel release.' },
  { id: 'skill_arch_review', stop: 12, label: 'architecture_reviewer', phase: 'Audit', category: 'Audit: Architecture Reviewer', icon: '🔍', desc: 'Audit — Architecture Reviewer: Zero-Trust Security Gatekeeper & audit log report.' }
];

const SUBWAY_STATIONS = [
  { stop: 1, name: 'orchestrator', icon: '🎼', focusNodes: ['skill_builder', 'skill_orchestrator'], desc: 'State Engine initializes state in docs/PROJECT_STATUS.md.' },
  { stop: 2, name: 'it_consultant', icon: '💼', focusNodes: ['skill_it'], desc: 'it_consultant conducts scope discovery and locks 01_ARCH_BRIEF.md.' },
  { stop: 3, name: 'product_owner', icon: '🎯', focusNodes: ['skill_po'], desc: 'product_owner creates 02_PRD.md and 03_USER_STORIES.md.' },
  { stop: 4, name: 'techincal_architect', icon: '📐', focusNodes: ['skill_architect'], desc: 'techincal_architect defines 04_TECHNICAL_SPEC.md and 05_TASK_MANIFEST.md.' },
  { stop: 5, name: 'apple_design', icon: '🎨', focusNodes: ['skill_design'], desc: 'apple_design specifies HIG UI design rules and SF typography.' },
  { stop: 6, name: 'content_parser', icon: '📄', focusNodes: ['skill_parser'], desc: 'content_parser extracts JSON Schemas & Zod Contracts.' },
  { stop: 7, name: 'frontend_developer', icon: '💻', focusNodes: ['skill_frontend'], desc: 'frontend_developer creates Visual Gate mockups & UI code.' },
  { stop: 8, name: 'service_engineer', icon: '⚙️', focusNodes: ['skill_service'], desc: 'service_engineer performs DB setup first, then backend APIs.' },
  { stop: 9, name: 'qa_agent', icon: '🧪', focusNodes: ['skill_qa'], desc: 'qa_agent executes automated test suites & visual diff checks.' },
  { stop: 10, name: 'uat', icon: '⚡', focusNodes: ['skill_uat'], desc: 'uat deploys temporary StackBlitz cloud sandbox for evaluation.' },
  { stop: 11, name: 'deployment', icon: '🚀', focusNodes: ['skill_deploy'], desc: 'deployment manages provider setup and publishes release.' },
  { stop: 12, name: 'architecture_reviewer', icon: '🔍', focusNodes: ['skill_arch_review'], desc: 'architecture_reviewer enforces zero-trust audit gate.' }
];

let currentStoryStep = 2; // Default Stop 2: it_consultant
let selectedNodeId = 'skill_it';
let currentActiveView = 'subway';

function initApp() {
  switchView('subway');
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
    { title: '📐 Phase 3: Tech Architecture', phase: 'Phase 3', ids: ['skill_architect', 'skill_design'], color: 'border-indigo-300 bg-indigo-50/40' },
    { title: '📄 Phase 4: Data Contracts', phase: 'Phase 4', ids: ['skill_parser'], color: 'border-teal-300 bg-teal-50/40' },
    { title: '💻 Phase 5: Frontend UI', phase: 'Phase 5', ids: ['skill_frontend'], color: 'border-emerald-300 bg-emerald-50/40' },
    { title: '⚙️ Phase 6: Service & DB', phase: 'Phase 6', ids: ['skill_service'], color: 'border-amber-300 bg-amber-50/40' },
    { title: '⚡ Phase 6: Cloud UAT', phase: 'UAT', ids: ['skill_uat'], color: 'border-amber-400 bg-amber-100/40' },
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
      <div class="flex-1 min-w-[220px] rounded-3xl border ${col.color} p-3 flex flex-col gap-3">
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
// VIEW 2: Spacious Winding S-Curve Subway Track Map (Zero Overlap!)
// 3 Rows of 4 Stations with Curved Handoff Tracks
// -------------------------------------------------------------
function renderSubwayCarView() {
  const container = document.getElementById('nycSubwayContainer');
  if (!container) return;

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1] || SUBWAY_STATIONS[1];

  // Divide 12 stations into 3 horizontal rows of 4 stations each
  const row1 = SUBWAY_STATIONS.slice(0, 4);   // Stops 1, 2, 3, 4 (Left -> Right)
  const row2 = SUBWAY_STATIONS.slice(4, 8);   // Stops 5, 6, 7, 8 (Left -> Right)
  const row3 = SUBWAY_STATIONS.slice(8, 12);  // Stops 9, 10, 11, 12 (Left -> Right)

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
          <!-- Circle with Number INSIDE -->
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
            isCurrent
              ? 'bg-white text-blue-600 shadow-md'
              : isPassed
              ? 'bg-blue-500 text-white'
              : 'bg-slate-100 text-slate-700 border border-slate-300'
          }">
            ${st.stop}
          </div>

          <!-- Station Info -->
          <div class="min-w-0 pr-1">
            <div class="flex items-center gap-1.5 font-bold text-xs truncate">
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
      
      <!-- S-Curve Winding Subway Track Rows (3 Tiers of 4 Stations) -->
      <div class="space-y-6">
        
        <!-- Tier 1: Stops 1 to 4 -->
        <div class="flex items-center justify-between gap-4">
          ${renderRow(row1)}
        </div>

        <!-- Connecting Curved Track Connector 1 -> 2 -->
        <div class="flex justify-end pr-12 -my-2">
          <div class="w-8 h-8 border-r-4 border-b-4 border-blue-500 rounded-br-2xl"></div>
        </div>

        <!-- Tier 2: Stops 5 to 8 -->
        <div class="flex items-center justify-between gap-4">
          ${renderRow(row2)}
        </div>

        <!-- Connecting Curved Track Connector 2 -> 3 -->
        <div class="flex justify-start pl-12 -my-2">
          <div class="w-8 h-8 border-l-4 border-b-4 border-blue-500 rounded-bl-2xl"></div>
        </div>

        <!-- Tier 3: Stops 9 to 12 -->
        <div class="flex items-center justify-between gap-4">
          ${renderRow(row3)}
        </div>

      </div>

      <!-- Active Station Directive Card -->
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
