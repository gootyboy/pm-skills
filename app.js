// Multi-View SDLC Swarm Skills Visualizer — Engine & UI Controller
// Supports SDLC Pipeline + 5 Outside-the-Box Concepts: Mission Control, PCB Circuit, Keynote Filmstrip, Tactical Radar, Metro Transit

const SDLC_SWARM_NODES = [
  { id: 'skill_builder', label: 'PROJECT_BUILDER_SKILL.md', isCenter: true, category: 'Swarm Hub Controller', icon: '👑', desc: 'Master Swarm Controller: Sets autonomy modes (BALANCED / AUTOPILOT / SUPERVISED) and manages system lifecycle.' },
  { id: 'skill_orchestrator', label: 'orchestrator', isCenter: true, category: 'State Engine', icon: '🎼', desc: 'State Engine: Overwrites docs/PROJECT_STATUS.md every turn to maintain rolling 3-session state and routing.' },

  { id: 'skill_it', label: 'it_consultant', phase: 'Phase 1', icon: '💼', category: 'Phase 1: IT Consultant', desc: 'Phase 1 — IT Consultant (Solutions Architect): Conducts scope discovery, technology evaluation, and outputs 01_ARCH_BRIEF.md.' },
  { id: 'skill_po', label: 'product_owner', phase: 'Phase 2', icon: '🎯', category: 'Phase 2: Product Owner', desc: 'Phase 2 — Product Owner: Transforms architectural brief into 02_PRD.md and full-stack vertical 03_USER_STORIES.md.' },
  { id: 'skill_architect', label: 'techincal_architect', phase: 'Phase 3', icon: '📐', category: 'Phase 3: Technical Architect', desc: 'Phase 3 — Technical Architect: Defines system architecture, 04_TECHNICAL_SPEC.md, and 05_TASK_MANIFEST.md.' },
  { id: 'skill_parser', label: 'content_parser', phase: 'Phase 4', icon: '📄', category: 'Phase 4: Content Parser', desc: 'Phase 4 — Content Parser (Schema Engine): Generates strict JSON Schemas & Zod Contracts in src/assets/schemas/.' },
  { id: 'skill_frontend', label: 'frontend_developer', phase: 'Phase 5', icon: '💻', category: 'Phase 5: Frontend Developer', desc: 'Phase 5 — Frontend Developer: Implements visual components (Step 0: Visual Gate mockups -> UI component code).' },
  { id: 'skill_design', label: 'apple_design', phase: 'Phase 5 Guide', icon: '🎨', category: 'Phase 5: UI/UX Rules', desc: 'Apple Design System Rules: Provides Apple HIG tokens, SF typography, and glassmorphism specs for Frontend Dev.' },
  { id: 'skill_service', label: 'service_engineer', phase: 'Phase 6', icon: '⚙️', desc: 'Phase 6 — Service Engineer: Database setup first, followed by backend services, data access layers, and API endpoints.' },
  { id: 'skill_qa', label: 'qa_agent', phase: 'Phase 7', icon: '🧪', category: 'Phase 7: QA Agent', desc: 'Phase 7 — QA Agent: Automated test suites, visual diff checks against mockups, and 07_TEST_MANIFEST.md.' },
  { id: 'skill_deploy', label: 'deployment', phase: 'Release', icon: '🚀', category: 'Release: Deployment Lead', desc: 'Release — Deployment Lead: Handles provider setup, approval checkpoints, EAS OTA / Native, and Vercel cloud deployment.' },
  { id: 'skill_arch_review', label: 'architecture_reviewer', phase: 'Audit', icon: '🔍', category: 'Audit: Architecture Reviewer', desc: 'Audit — Architecture Reviewer: Zero-Trust Security & Quality Gatekeeper auditing all deliverables against contracts.' }
];

const STORY_STEPS = [
  { step: 1, title: 'State: Orchestrator State Engine', target: 'Orchestrator', focusNodes: ['skill_builder', 'skill_orchestrator'], desc: 'Orchestrator initializes state engine, maintaining docs/PROJECT_STATUS.md across rolling 3 sessions.', telemetry: 'TELEMETRY: STATE_LOOP_ACTIVE [OK]', line: 'Core Bus' },
  { step: 2, title: 'Phase 1: IT Consultant Scope Discovery', target: 'IT Consultant', focusNodes: ['skill_it'], desc: 'it_consultant conducts scope discovery and generates 01_ARCH_BRIEF.md.', telemetry: 'TELEMETRY: SCOPE_LOCK 100%', line: 'Discovery Line' },
  { step: 3, title: 'Phase 2: Product Owner Requirements', target: 'Product Owner', focusNodes: ['skill_po'], desc: 'product_owner converts architectural brief into 02_PRD.md and 03_USER_STORIES.md.', telemetry: 'TELEMETRY: PRD_VALIDATED [OK]', line: 'Discovery Line' },
  { step: 4, title: 'Phase 3: Technical Architect Specs', target: 'Technical Architect', focusNodes: ['skill_architect'], desc: 'techincal_architect defines 04_TECHNICAL_SPEC.md and 05_TASK_MANIFEST.md.', telemetry: 'TELEMETRY: TECH_SPEC_VERIFIED', line: 'Architecture Line' },
  { step: 5, title: 'Phase 4: Content Parser Data Contracts', target: 'Content Parser', focusNodes: ['skill_parser'], desc: 'content_parser extracts JSON Schemas and Zod Data Contracts into src/assets/schemas/.', telemetry: 'TELEMETRY: SCHEMAS_COMPILED', line: 'Architecture Line' },
  { step: 6, title: 'Phase 5: Frontend Developer UI Slices', target: 'Frontend Developer', focusNodes: ['skill_frontend', 'skill_design'], desc: 'frontend_developer creates Step 0: Visual Gate mockups guided by apple_design, then implements UI components.', telemetry: 'TELEMETRY: VISUAL_GATE_PASS', line: 'Engineering Line' },
  { step: 7, title: 'Phase 6: Service Engineer DB & Backend', target: 'Service Engineer', focusNodes: ['skill_service'], desc: 'service_engineer performs database setup first, followed by backend services and API implementations.', telemetry: 'TELEMETRY: DB_SETUP_SUCCESS', line: 'Engineering Line' },
  { step: 8, title: 'Phase 7: QA Agent Verification', target: 'QA Agent', focusNodes: ['skill_qa'], desc: 'qa_agent executes automated test suites, visual diff checks, and generates 07_TEST_MANIFEST.md.', telemetry: 'TELEMETRY: TEST_COVERAGE 100%', line: 'Verification Line' },
  { step: 9, title: 'Release: Deployment Lead Shipping', target: 'Deployment Lead', focusNodes: ['skill_deploy'], desc: 'deployment manages provider setup, founder approval checkpoints, and releases to cloud hosting.', telemetry: 'TELEMETRY: SHIPPED_TO_CLOUD', line: 'Shipping Line' },
  { step: 10, title: 'Audit: Architecture Reviewer Gate', target: 'Architecture Reviewer', focusNodes: ['skill_arch_review'], desc: 'architecture_reviewer enforces zero-trust quality gates and writes audit logs in docs/reviews/.', telemetry: 'TELEMETRY: AUDIT_CLEAN_PASS', line: 'Audit Line' }
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

  const views = ['pipeline', 'mission', 'pcb', 'filmstrip', 'radar', 'metro'];
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
        tabBtn.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm transition-all";
      } else {
        tabBtn.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors";
      }
    }
  });

  if (viewName === 'pipeline') renderPipelineView();
  if (viewName === 'mission') renderMissionControlView();
  if (viewName === 'pcb') renderPcbCircuitView();
  if (viewName === 'filmstrip') renderFilmstripView();
  if (viewName === 'radar') renderRadarMapView();
  if (viewName === 'metro') renderMetroTransitView();
}

// -------------------------------------------------------------
// BASELINE: SDLC Pipeline Board
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
// OPTION 1: 🚀 Mission Control / Flight Deck Console
// -------------------------------------------------------------
function renderMissionControlView() {
  const container = document.getElementById('missionControlContainer');
  if (!container) return;

  const stepObj = currentStoryStep > 0 ? STORY_STEPS[currentStoryStep - 1] : STORY_STEPS[0];
  const activeAgent = SDLC_SWARM_NODES.find(n => stepObj.focusNodes.includes(n.id)) || SDLC_SWARM_NODES[0];

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-slate-950 text-emerald-400 font-mono rounded-3xl p-6 border border-emerald-500/30 shadow-2xl space-y-6">
      
      <!-- Top Telemetry Header -->
      <div class="flex items-center justify-between pb-4 border-b border-emerald-500/20">
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
          <h2 class="text-base font-bold tracking-widest uppercase text-emerald-300">NASA / SWARM MISSION CONTROL TELEMETRY CONSOLE</h2>
        </div>
        <div class="flex items-center gap-4 text-xs text-emerald-400/80">
          <span>ALTITUDE: ${currentStoryStep * 10000} FT</span>
          <span>MODE: BALANCED_AUTONOMY</span>
          <span class="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-300">SYS_STATUS: NOMINAL</span>
        </div>
      </div>

      <!-- Main Gauges & Handoff Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Left: Agent Flight Deck Status -->
        <div class="bg-slate-900/90 border border-emerald-500/20 rounded-2xl p-4 space-y-3">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-500">Active Handoff Telemetry</div>
          <div class="p-3 bg-slate-950 rounded-xl border border-emerald-500/30">
            <div class="flex items-center gap-2 text-white">
              <span class="text-xl">${activeAgent.icon}</span>
              <span class="font-bold text-sm">${activeAgent.label}</span>
            </div>
            <div class="text-xs text-emerald-400 mt-2">${activeAgent.desc}</div>
          </div>

          <div class="space-y-1.5 text-[11px] pt-2">
            <div class="flex justify-between"><span>COMM_BUS:</span><span class="text-white">LINK_ESTABLISHED</span></div>
            <div class="flex justify-between"><span>ZERO_TRUST_AUDIT:</span><span class="text-emerald-300">PASSED</span></div>
            <div class="flex justify-between"><span>ARTIFACT_QUEUE:</span><span class="text-white">docs/${activeAgent.label}.md</span></div>
          </div>
        </div>

        <!-- Center: Flight Sequence (Steps 1-10 Buttons) -->
        <div class="bg-slate-900/90 border border-emerald-500/20 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div class="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-3">Flight Phase Checklist (1-10)</div>
            <div class="grid grid-cols-2 gap-2">
              ${STORY_STEPS.map(s => `
                <button onclick="setStoryStep(${s.step})" class="p-2 text-left rounded-xl border transition-all text-xs ${
                  currentStoryStep === s.step
                    ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                    : 'bg-slate-950 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/60'
                }">
                  <div class="text-[9px] opacity-75">PHASE ${s.step}</div>
                  <div class="truncate text-[11px]">${s.target}</div>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right: Telemetry Stream Log -->
        <div class="bg-slate-900/90 border border-emerald-500/20 rounded-2xl p-4 space-y-2">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-500">Live Telemetry Terminal Stream</div>
          <div class="bg-slate-950 p-3 rounded-xl border border-emerald-500/30 text-[11px] space-y-1.5 h-48 overflow-y-auto">
            <div>[00:01:02] INITIALIZING_AGENT_SWARM...</div>
            <div>[00:01:05] ORCHESTRATOR -> STATUS_OK</div>
            <div>[00:01:12] IT_CONSULTANT -> ARCH_BRIEF_LOCKED</div>
            <div>[00:01:25] PO -> PRD_USER_STORIES_DONE</div>
            <div>[00:01:40] ARCHITECT -> TECH_SPEC_COMPILED</div>
            <div>[00:02:01] FRONTEND -> VISUAL_GATE_APPROVED</div>
            <div>[00:02:18] SERVICE -> DB_SCHEMA_READY</div>
            <div>[00:02:35] QA -> TEST_MANIFEST_PASSED</div>
            <div>[00:02:50] DEPLOY -> VERCEL_RELEASE_LIVE 🚀</div>
            <div class="text-emerald-300 font-bold animate-pulse">${stepObj.telemetry}</div>
          </div>
        </div>

      </div>

    </div>
  `;
}

// -------------------------------------------------------------
// OPTION 2: ⚡ Interactive PCB Circuit Board
// -------------------------------------------------------------
function renderPcbCircuitView() {
  const container = document.getElementById('pcbCircuitContainer');
  if (!container) return;

  const stepObj = currentStoryStep > 0 ? STORY_STEPS[currentStoryStep - 1] : STORY_STEPS[0];

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-[#0b1d13] text-emerald-100 rounded-3xl p-6 border-4 border-[#163a26] shadow-2xl relative overflow-hidden font-mono">
      
      <!-- Copper Trace Circuit Header -->
      <div class="flex items-center justify-between pb-4 border-b border-emerald-800/60 mb-6">
        <div class="flex items-center gap-3">
          <div class="w-4 h-4 rounded bg-amber-400 border border-amber-200 animate-pulse"></div>
          <h2 class="text-base font-bold tracking-widest uppercase text-amber-300">PCB INTEGRATED CIRCUIT BUS — MAINBOARD REV 2.4</h2>
        </div>
        <span class="text-xs text-emerald-400 font-bold bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700">COPPER TRACE BUS ACTIVE</span>
      </div>

      <!-- IC Chips Grid (Skills connected as Microcontrollers) -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
        ${SDLC_SWARM_NODES.filter(n => !n.isCenter).map((s, idx) => {
          const isFocused = stepObj.focusNodes.includes(s.id);
          const isSel = selectedNodeId === s.id;

          return `
            <div onclick="selectNode('${s.id}')" class="p-3.5 rounded-2xl border-2 cursor-pointer transition-all relative ${
              isFocused
                ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-105 z-20'
                : isSel
                ? 'bg-emerald-900 border-amber-400 text-white shadow-md'
                : 'bg-[#06130c] border-emerald-800/80 text-emerald-200 hover:border-emerald-500'
            }">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold">IC-0${idx + 1}</span>
                <span class="text-[9px] opacity-75 font-mono">${s.phase || 'HUB'}</span>
              </div>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-xl">${s.icon}</span>
                <span class="font-bold text-xs truncate">${s.label}</span>
              </div>
              <div class="text-[10px] opacity-80 mt-2 truncate">${s.desc}</div>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

// -------------------------------------------------------------
// OPTION 3: 🎬 Keynote Storyboard Filmstrip
// -------------------------------------------------------------
function renderFilmstripView() {
  const container = document.getElementById('filmstripContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto space-y-6">
      
      <!-- Filmstrip Control Bar -->
      <div class="flex items-center justify-between bg-slate-900 text-white p-4 rounded-3xl border border-slate-800 shadow-lg">
        <div class="flex items-center gap-3">
          <span class="text-xl">🎬</span>
          <div>
            <h2 class="text-sm font-bold">Keynote Cinematic Storyboard Filmstrip</h2>
            <p class="text-xs text-slate-400">Step-by-step visual execution frames across 10 SDLC phases</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="prevStoryStep()" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold">⏮ Prev Frame</button>
          <button onclick="nextStoryStep()" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md">Next Frame ⏭</button>
        </div>
      </div>

      <!-- Horizontal Filmstrip Frames -->
      <div class="flex gap-4 overflow-x-auto pb-4 pt-2">
        ${STORY_STEPS.map(s => {
          const isAct = currentStoryStep === s.step;
          const focusSkills = SDLC_SWARM_NODES.filter(n => s.focusNodes.includes(n.id));

          return `
            <div onclick="setStoryStep(${s.step})" class="w-72 shrink-0 rounded-3xl border p-4 cursor-pointer transition-all bg-white ${
              isAct ? 'border-blue-600 ring-4 ring-blue-500/20 shadow-xl scale-[1.02]' : 'border-slate-200 hover:border-slate-300 shadow-sm'
            }">
              <div class="h-32 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/80 flex flex-col items-center justify-center p-3 text-center mb-3">
                <span class="text-3xl">${focusSkills[0] ? focusSkills[0].icon : '⚡'}</span>
                <span class="font-bold text-xs text-slate-900 mt-2 truncate w-full">${s.target}</span>
                <span class="text-[10px] text-slate-500 font-mono">FRAME ${s.step} / 10</span>
              </div>

              <span class="text-[10px] uppercase font-bold tracking-wider text-blue-600">Scene ${s.step}</span>
              <h3 class="font-bold text-xs text-slate-900 mt-0.5 leading-snug">${s.title}</h3>
              <p class="text-[11px] text-slate-500 mt-1.5 leading-relaxed line-clamp-3">${s.desc}</p>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

// -------------------------------------------------------------
// OPTION 4: 🗺️ Tactical Radar Map (Command & Control)
// -------------------------------------------------------------
function renderRadarMapView() {
  const container = document.getElementById('radarMapContainer');
  if (!container) return;

  const stepObj = currentStoryStep > 0 ? STORY_STEPS[currentStoryStep - 1] : STORY_STEPS[0];

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-slate-900 text-slate-100 rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
      
      <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div class="flex items-center gap-3">
          <span class="text-xl">🗺️</span>
          <h2 class="text-base font-bold uppercase tracking-wider text-cyan-400">TACTICAL COMMAND RADAR MAP</h2>
        </div>
        <span class="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">SECTOR SWEEP ACTIVE</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        ${SDLC_SWARM_NODES.filter(n => !n.isCenter).map(s => {
          const isFoc = stepObj.focusNodes.includes(s.id);
          const isSel = selectedNodeId === s.id;

          return `
            <div onclick="selectNode('${s.id}')" class="p-4 rounded-2xl border cursor-pointer transition-all ${
              isFoc ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg text-white' : isSel ? 'bg-slate-800 border-cyan-500 text-slate-100' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }">
              <div class="flex items-center justify-between">
                <span class="text-xl">${s.icon}</span>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">${s.phase || 'SECTOR'}</span>
              </div>
              <h3 class="font-bold text-xs text-white mt-2">${s.label}</h3>
              <p class="text-[11px] opacity-80 mt-1.5 leading-relaxed">${s.desc}</p>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

// -------------------------------------------------------------
// OPTION 5: 🌳 Metro Transit Tube Map
// -------------------------------------------------------------
function renderMetroTransitView() {
  const container = document.getElementById('metroTransitContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="w-full max-w-6xl mx-auto bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6">
      
      <div class="flex items-center justify-between pb-4 border-b border-slate-200">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🌳</span>
          <div>
            <h2 class="text-base font-bold text-slate-900">SDLC Metro Transit Map (Subway / Tube Line Architecture)</h2>
            <p class="text-xs text-slate-500">Color-coded station handoffs from Discovery Line to Release Line</p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        ${STORY_STEPS.map(s => {
          const isAct = currentStoryStep === s.step;
          return `
            <div onclick="setStoryStep(${s.step})" class="p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              isAct ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-500/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }">
              <div class="flex items-center gap-4">
                <div class="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">${s.step}</div>
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">${s.line}</span>
                  <h3 class="font-bold text-xs text-slate-900">${s.title}</h3>
                  <p class="text-xs text-slate-500 mt-0.5">${s.desc}</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700">${s.target} ↗</span>
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
      <span class="px-3 py-1 rounded-full text-xs font-mono font-semibold ${node.isCenter ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}">
        ${node.isCenter ? 'HUB CONTROLLER' : node.phase || 'SDLC AGENT'}
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
