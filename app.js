// SDLC Swarm Skills Visualizer — Engine & UI Controller
// Supports SDLC Pipeline Board + Authentic NYC Subway (MTA) System Map

const SDLC_SWARM_NODES = [
  { id: 'skill_builder', label: 'PROJECT_BUILDER_SKILL.md', isCenter: true, line: 'S', lineColor: 'bg-[#808183] text-white', mta: 'S', category: 'Swarm Hub Controller', icon: '👑', desc: 'Master Swarm Controller: Sets autonomy modes (BALANCED / AUTOPILOT / SUPERVISED) and manages system lifecycle.' },
  { id: 'skill_orchestrator', label: 'orchestrator', isCenter: true, line: 'S', lineColor: 'bg-[#808183] text-white', mta: 'S', category: 'State Engine', icon: '🎼', desc: 'State Engine: Overwrites docs/PROJECT_STATUS.md every turn to maintain rolling 3-session state and routing.' },

  { id: 'skill_it', label: 'it_consultant', phase: 'Phase 1', line: 'A C E', lineColor: 'bg-[#0039A6] text-white', mta: 'A', category: 'Phase 1: Scope Discovery', icon: '💼', desc: 'Phase 1 — IT Consultant (Solutions Architect): Conducts scope discovery, technology evaluation, and outputs 01_ARCH_BRIEF.md.' },
  { id: 'skill_po', label: 'product_owner', phase: 'Phase 2', line: 'A C E', lineColor: 'bg-[#0039A6] text-white', mta: 'C', category: 'Phase 2: Product Owner', desc: 'Phase 2 — Product Owner: Transforms architectural brief into 02_PRD.md and full-stack vertical 03_USER_STORIES.md.' },

  { id: 'skill_architect', label: 'techincal_architect', phase: 'Phase 3', line: 'B D F M', lineColor: 'bg-[#FF6319] text-white', mta: 'F', category: 'Phase 3: Technical Architect', desc: 'Phase 3 — Technical Architect: Defines system architecture, 04_TECHNICAL_SPEC.md, and 05_TASK_MANIFEST.md.' },
  { id: 'skill_parser', label: 'content_parser', phase: 'Phase 4', line: 'B D F M', lineColor: 'bg-[#FF6319] text-white', mta: 'M', category: 'Phase 4: Content Parser', desc: 'Phase 4 — Content Parser (Schema Engine): Generates strict JSON Schemas & Zod Contracts in src/assets/schemas/.' },

  { id: 'skill_frontend', label: 'frontend_developer', phase: 'Phase 5', line: '1 2 3', lineColor: 'bg-[#EE352E] text-white', mta: '1', category: 'Phase 5: Frontend Developer', desc: 'Phase 5 — Frontend Developer: Implements visual components (Step 0: Visual Gate mockups -> UI component code).' },
  { id: 'skill_design', label: 'apple_design', phase: 'Phase 5 Guide', line: '1 2 3', lineColor: 'bg-[#EE352E] text-white', mta: '2', category: 'Phase 5: UI/UX Rules', desc: 'Apple Design System Rules: Provides Apple HIG tokens, SF typography, and glassmorphism specs for Frontend Dev.' },
  { id: 'skill_service', label: 'service_engineer', phase: 'Phase 6', line: '1 2 3', lineColor: 'bg-[#EE352E] text-white', mta: '3', category: 'Phase 6: Service Engineer', desc: 'Phase 6 — Service Engineer: Database setup first, followed by backend services, data access layers, and API endpoints.' },

  { id: 'skill_qa', label: 'qa_agent', phase: 'Phase 7', line: '7 Line', lineColor: 'bg-[#B933AD] text-white', mta: '7', category: 'Phase 7: QA Agent', desc: 'Phase 7 — QA Agent: Automated test suites, visual diff checks against mockups, and 07_TEST_MANIFEST.md.' },
  { id: 'skill_deploy', label: 'deployment', phase: 'Release', line: '4 5 6', lineColor: 'bg-[#00933C] text-white', mta: '4', category: 'Release: Deployment Lead', desc: 'Release — Deployment Lead: Handles provider setup, approval checkpoints, EAS OTA / Native, and Vercel cloud deployment.' },
  { id: 'skill_arch_review', label: 'architecture_reviewer', phase: 'Audit', line: 'L Line', lineColor: 'bg-[#A7A9AC] text-slate-900', mta: 'L', category: 'Audit: Architecture Reviewer', desc: 'Audit — Architecture Reviewer: Zero-Trust Security & Quality Gatekeeper auditing all deliverables against contracts.' }
];

const STORY_STEPS = [
  { step: 1, title: 'State: Orchestrator State Engine', mta: 'S', line: 'Shuttle Bus', focusNodes: ['skill_builder', 'skill_orchestrator'], desc: 'Orchestrator initializes state engine, maintaining docs/PROJECT_STATUS.md across rolling 3 sessions.' },
  { step: 2, title: 'Phase 1: IT Consultant Scope Discovery', mta: 'A', line: 'Blue Line (8th Ave Express)', focusNodes: ['skill_it'], desc: 'it_consultant conducts scope discovery and generates 01_ARCH_BRIEF.md.' },
  { step: 3, title: 'Phase 2: Product Owner Requirements', mta: 'C', line: 'Blue Line (8th Ave Local)', focusNodes: ['skill_po'], desc: 'product_owner converts architectural brief into 02_PRD.md and 03_USER_STORIES.md.' },
  { step: 4, title: 'Phase 3: Technical Architect Specs', mta: 'F', line: 'Orange Line (6th Ave Express)', focusNodes: ['skill_architect'], desc: 'techincal_architect defines 04_TECHNICAL_SPEC.md and 05_TASK_MANIFEST.md.' },
  { step: 5, title: 'Phase 4: Content Parser Data Contracts', mta: 'M', line: 'Orange Line (6th Ave Local)', focusNodes: ['skill_parser'], desc: 'content_parser extracts JSON Schemas and Zod Data Contracts into src/assets/schemas/.' },
  { step: 6, title: 'Phase 5: Frontend Developer UI Slices', mta: '1', line: 'Red Line (Broadway Local)', focusNodes: ['skill_frontend', 'skill_design'], desc: 'frontend_developer creates Step 0: Visual Gate mockups guided by apple_design, then implements UI components.' },
  { step: 7, title: 'Phase 6: Service Engineer DB & Backend', mta: '3', line: 'Red Line (7th Ave Express)', focusNodes: ['skill_service'], desc: 'service_engineer performs database setup first, followed by backend services and API implementations.' },
  { step: 8, title: 'Phase 7: QA Agent Verification', mta: '7', line: 'Purple Line (Flushing Express)', focusNodes: ['skill_qa'], desc: 'qa_agent executes automated test suites, visual diff checks, and generates 07_TEST_MANIFEST.md.' },
  { step: 9, title: 'Release: Deployment Lead Shipping', mta: '4', line: 'Green Line (Lexington Ave Express)', focusNodes: ['skill_deploy'], desc: 'deployment manages provider setup, founder approval checkpoints, and releases to cloud hosting.' },
  { step: 10, title: 'Audit: Architecture Reviewer Gate', mta: 'L', line: 'Gray Line (Canarsie Local)', focusNodes: ['skill_arch_review'], desc: 'architecture_reviewer enforces zero-trust quality gates and writes audit logs in docs/reviews/.' }
];

let currentStoryStep = 0;
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
  if (viewName === 'subway') renderNycSubwayView();
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

  const storyStepObj = currentStoryStep > 0 ? STORY_STEPS[currentStoryStep - 1] : null;

  container.innerHTML = columns.map(col => {
    const colSkills = SDLC_SWARM_NODES.filter(n => col.ids.includes(n.id));

    const cardHtml = colSkills.map(s => {
      const isSelected = selectedNodeId === s.id;
      const isStoryFocused = storyStepObj && storyStepObj.focusNodes.includes(s.id);
      
      return `
        <div onclick="selectNode('${s.id}')" class="p-3.5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
          isStoryFocused
            ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400 scale-[1.02]'
            : isSelected
            ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-md'
            : 'bg-white/90 border-slate-200 hover:border-slate-300 hover:shadow'
        }">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-lg">${s.icon}</span>
              <h4 class="font-bold text-xs ${isStoryFocused ? 'text-white' : 'text-slate-900'}">${s.label}</h4>
            </div>
            ${s.isCenter ? `<span class="text-[9px] font-mono px-2 py-0.5 rounded-full ${isStoryFocused ? 'bg-purple-400/30 text-white' : 'bg-purple-100 text-purple-700 font-semibold'}">HUB</span>` : ''}
          </div>
          <p class="text-[11px] ${isStoryFocused ? 'text-blue-100' : 'text-slate-500'} mt-2 leading-relaxed line-clamp-2">${s.desc}</p>
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
// VIEW 2: Authentic NYC Subway (MTA) System Map
// -------------------------------------------------------------
function renderNycSubwayView() {
  const container = document.getElementById('nycSubwayContainer');
  if (!container) return;

  const stepObj = currentStoryStep > 0 ? STORY_STEPS[currentStoryStep - 1] : STORY_STEPS[0];

  const mtaLines = [
    { title: 'A C E Line (8th Ave Express / Local)', color: 'bg-[#0039A6]', border: 'border-[#0039A6]', bullet: 'A', ids: ['skill_it', 'skill_po'], desc: 'Discovery & Requirements Trunk' },
    { title: 'B D F M Line (6th Ave Express / Local)', color: 'bg-[#FF6319]', border: 'border-[#FF6319]', bullet: 'F', ids: ['skill_architect', 'skill_parser'], desc: 'Architecture & Data Schemas Trunk' },
    { title: '1 2 3 Line (7th Ave - Broadway Express)', color: 'bg-[#EE352E]', border: 'border-[#EE352E]', bullet: '1', ids: ['skill_frontend', 'skill_design', 'skill_service'], desc: 'Core Engineering & Database Trunk' },
    { title: '7 Line (Flushing Express)', color: 'bg-[#B933AD]', border: 'border-[#B933AD]', bullet: '7', ids: ['skill_qa'], desc: 'QA Automated Verification Express' },
    { title: '4 5 6 Line (Lexington Ave Express)', color: 'bg-[#00933C]', border: 'border-[#00933C]', bullet: '4', ids: ['skill_deploy'], desc: 'Cloud Deployment Express' },
    { title: 'L Line (Canarsie Local)', color: 'bg-[#A7A9AC]', border: 'border-[#A7A9AC]', bullet: 'L', ids: ['skill_arch_review'], desc: 'Zero-Trust Audit Gate' },
    { title: 'S Shuttle Line (Grand Central / Times Sq)', color: 'bg-[#808183]', border: 'border-[#808183]', bullet: 'S', ids: ['skill_builder', 'skill_orchestrator'], desc: 'Swarm Hub State Controller' }
  ];

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-[#f8f6f0] text-slate-900 rounded-3xl p-6 border-4 border-slate-900 shadow-2xl space-y-6 font-sans">
      
      <!-- MTA Header Strip -->
      <div class="bg-black text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-600 font-black text-lg flex items-center justify-center tracking-tighter">MTA</div>
          <div>
            <h2 class="text-base font-black tracking-tight uppercase">MTA NYC SUBWAY SYSTEM MAP — SDLC SWARM LINE</h2>
            <p class="text-xs text-slate-300 font-mono">Subway Station Handoffs across 7 Trunk Lines</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-3 py-1 bg-yellow-400 text-black rounded-full uppercase tracking-wider">ALL LINES OPERATING</span>
        </div>
      </div>

      <!-- MTA Line Map Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${mtaLines.map(line => {
          const lineSkills = SDLC_SWARM_NODES.filter(n => line.ids.includes(n.id));

          return `
            <div class="bg-white border-2 ${line.border} rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="w-7 h-7 rounded-full ${line.color} font-black text-xs flex items-center justify-center shadow-sm shrink-0">${line.bullet}</span>
                    <h3 class="font-black text-xs text-slate-900 uppercase tracking-tight">${line.title}</h3>
                  </div>
                  <span class="text-[10px] font-mono text-slate-500 font-semibold">${line.desc}</span>
                </div>

                <!-- Stations on this MTA line -->
                <div class="mt-3 space-y-2">
                  ${lineSkills.map(s => {
                    const isSelected = selectedNodeId === s.id;
                    const isStoryFocused = stepObj.focusNodes.includes(s.id);

                    return `
                      <div onclick="selectNode('${s.id}')" class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isStoryFocused
                          ? 'bg-black text-white border-black shadow-md font-bold scale-[1.02]'
                          : isSelected
                          ? 'bg-slate-100 border-slate-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-400'
                      }">
                        <div class="flex items-center gap-2.5">
                          <span class="w-4 h-4 rounded-full border-2 ${isStoryFocused ? 'border-yellow-400 bg-yellow-400' : 'border-slate-800 bg-white'} shrink-0"></span>
                          <span class="text-base">${s.icon}</span>
                          <span class="text-xs font-bold">${s.label}</span>
                        </div>
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded-full ${isStoryFocused ? 'bg-yellow-400 text-black font-black' : 'bg-slate-200 text-slate-700 font-bold'}">
                          ${s.mta || 'STOP'}
                        </span>
                      </div>
                    `;
                  }).join('')}
                </div>
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
      <span class="px-3 py-1 rounded-full text-xs font-mono font-bold ${node.lineColor}">
        MTA (${node.mta})
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
    const stepObj = STORY_STEPS[stepNum - 1];
    if (title) title.innerText = stepObj.title;
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
