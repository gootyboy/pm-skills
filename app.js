// Multi-View SDLC Swarm Skills Visualizer — Engine & UI Controller
// Aligned strictly with PROJECT_BUILDER_SKILL.md & README.md target agent phase mapping

const SDLC_SWARM_NODES = [
  // --- Swarm Hub & State Engine ---
  { id: 'skill_builder', label: 'PROJECT_BUILDER_SKILL.md', isCenter: true, category: 'Swarm Hub Controller', icon: '👑', desc: 'Master Swarm Controller: Sets autonomy modes (BALANCED / AUTOPILOT / SUPERVISED) and manages system lifecycle.' },
  { id: 'skill_orchestrator', label: 'orchestrator', isCenter: true, category: 'State Engine', icon: '🎼', desc: 'State Engine: Overwrites docs/PROJECT_STATUS.md every turn to maintain rolling 3-session state and routing.' },

  // --- Sequential SDLC Target Agents (Phases 1 - 7 + Release & Audit) ---
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

const APPLE_CENTER = { cx: 450, cy: 300, radius: 210 };
const outerSkills = SDLC_SWARM_NODES.filter(s => !s.isCenter);
const totalOuter = outerSkills.length;

const GRAPH_NODES = SDLC_SWARM_NODES.map((skill) => {
  if (skill.isCenter) {
    const isFirst = skill.id === 'skill_builder';
    return {
      ...skill,
      x: APPLE_CENTER.cx + (isFirst ? -55 : 55),
      y: APPLE_CENTER.cy
    };
  } else {
    const outerIndex = outerSkills.findIndex(s => s.id === skill.id);
    const angle = (outerIndex / totalOuter) * 2 * Math.PI - Math.PI / 2;
    return {
      ...skill,
      x: Math.round(APPLE_CENTER.cx + APPLE_CENTER.radius * Math.cos(angle)),
      y: Math.round(APPLE_CENTER.cy + APPLE_CENTER.radius * Math.sin(angle)),
      angle
    };
  }
});

// Exact PROJECT_BUILDER_SKILL.md 10-Step Sequential Handoff Story
const STORY_STEPS = [
  { step: 1, title: 'State: Orchestrator State Engine', target: 'Orchestrator', focusNodes: ['skill_builder', 'skill_orchestrator'], desc: 'Orchestrator initializes state engine, maintaining docs/PROJECT_STATUS.md across rolling 3 sessions.' },
  { step: 2, title: 'Phase 1: IT Consultant Scope Discovery', target: 'IT Consultant', focusNodes: ['skill_it'], desc: 'it_consultant conducts scope discovery and generates 01_ARCH_BRIEF.md.' },
  { step: 3, title: 'Phase 2: Product Owner Requirements', target: 'Product Owner', focusNodes: ['skill_po'], desc: 'product_owner converts architectural brief into 02_PRD.md and 03_USER_STORIES.md.' },
  { step: 4, title: 'Phase 3: Technical Architect Specs', target: 'Technical Architect', focusNodes: ['skill_architect'], desc: 'techincal_architect defines 04_TECHNICAL_SPEC.md and 05_TASK_MANIFEST.md.' },
  { step: 5, title: 'Phase 4: Content Parser Data Contracts', target: 'Content Parser', focusNodes: ['skill_parser'], desc: 'content_parser extracts JSON Schemas and Zod Data Contracts into src/assets/schemas/.' },
  { step: 6, title: 'Phase 5: Frontend Developer UI Slices', target: 'Frontend Developer', focusNodes: ['skill_frontend', 'skill_design'], desc: 'frontend_developer creates Step 0: Visual Gate mockups guided by apple_design, then implements UI components.' },
  { step: 7, title: 'Phase 6: Service Engineer DB & Backend', target: 'Service Engineer', focusNodes: ['skill_service'], desc: 'service_engineer performs database setup first, followed by backend services and API implementations.' },
  { step: 8, title: 'Phase 7: QA Agent Verification', target: 'QA Agent', focusNodes: ['skill_qa'], desc: 'qa_agent executes automated test suites, visual diff checks, and generates 07_TEST_MANIFEST.md.' },
  { step: 9, title: 'Release: Deployment Lead Shipping', target: 'Deployment Lead', focusNodes: ['skill_deploy'], desc: 'deployment manages provider setup, founder approval checkpoints, and releases to cloud hosting.' },
  { step: 10, title: 'Audit: Architecture Reviewer Gate', target: 'Architecture Reviewer', focusNodes: ['skill_arch_review'], desc: 'architecture_reviewer enforces zero-trust quality gates and writes audit logs in docs/reviews/.' }
];

let currentStoryStep = 0;
let selectedNodeId = 'skill_it';
let currentZoom = 1.0;
let currentActiveView = 'pipeline';

function initApp() {
  switchView('pipeline');
  renderNodeDetails(selectedNodeId);
}

function switchView(viewName) {
  currentActiveView = viewName;

  const views = ['pipeline', 'linear', 'dashboard', 'grid', 'wheel'];
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
  if (viewName === 'linear') renderLinearView();
  if (viewName === 'dashboard') renderDashboardView();
  if (viewName === 'grid') renderGridMatrixView();
  if (viewName === 'wheel') renderAppleWheel();
}

// -------------------------------------------------------------
// VIEW 1: SDLC Pipeline Board (Strict Phase Sequence 1 - 7 + Release/Audit)
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
    const colSkills = GRAPH_NODES.filter(n => col.ids.includes(n.id));

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
// VIEW 2: Linear Flow Storyboard (Exact Steps 1 - 10)
// -------------------------------------------------------------
function renderLinearView() {
  const container = document.getElementById('linearFlowContainer');
  if (!container) return;

  container.innerHTML = STORY_STEPS.map((stepObj) => {
    const isActiveStep = currentStoryStep === stepObj.step;
    const focusSkills = GRAPH_NODES.filter(n => stepObj.focusNodes.includes(n.id));

    return `
      <div onclick="setStoryStep(${stepObj.step})" class="relative flex-1 min-w-[260px] max-w-[300px] rounded-3xl border p-4 cursor-pointer transition-all ${
        isActiveStep
          ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white border-blue-700 shadow-xl ring-4 ring-blue-500/30 scale-[1.03]'
          : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
      }">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            isActiveStep ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
          }">Step ${stepObj.step}</span>
          <span class="text-xs font-mono font-semibold ${isActiveStep ? 'text-blue-100' : 'text-blue-600'}">${stepObj.target}</span>
        </div>

        <h3 class="font-bold text-xs ${isActiveStep ? 'text-white' : 'text-slate-900'} leading-snug">${stepObj.title}</h3>
        <p class="text-[11px] ${isActiveStep ? 'text-blue-100' : 'text-slate-500'} mt-1.5 leading-relaxed">${stepObj.desc}</p>

        <div class="mt-4 pt-3 border-t ${isActiveStep ? 'border-white/20' : 'border-slate-100'} flex flex-wrap gap-1.5">
          ${focusSkills.map(s => `
            <div onclick="event.stopPropagation(); selectNode('${s.id}')" class="px-2 py-1 rounded-xl text-[10.5px] font-semibold flex items-center gap-1 transition-transform hover:scale-105 ${
              isActiveStep ? 'bg-white/20 text-white border border-white/30' : 'bg-slate-100 text-slate-700 border border-slate-200'
            }">
              <span>${s.icon}</span>
              <span>${s.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// VIEW 3: Master-Detail Dashboard View
// -------------------------------------------------------------
function renderDashboardView() {
  const sidebar = document.getElementById('dashboardSidebar');
  const mainCanvas = document.getElementById('dashboardMainCanvas');
  if (!sidebar || !mainCanvas) return;

  sidebar.innerHTML = GRAPH_NODES.map(s => {
    const isSel = selectedNodeId === s.id;
    return `
      <div onclick="selectNode('${s.id}')" class="p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
        isSel ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-md' : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }">
        <div class="flex items-center gap-2 truncate">
          <span>${s.icon}</span>
          <span class="truncate">${s.label}</span>
        </div>
        <span class="text-[9px] opacity-75 font-mono shrink-0">${s.phase || 'Hub'}</span>
      </div>
    `;
  }).join('');

  const node = GRAPH_NODES.find(n => n.id === selectedNodeId) || GRAPH_NODES[0];
  const storyStepObj = currentStoryStep > 0 ? STORY_STEPS[currentStoryStep - 1] : null;

  mainCanvas.innerHTML = `
    <div class="max-w-3xl w-full mx-auto space-y-6">
      <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <span class="text-3xl">${node.icon}</span>
            <div>
              <h2 class="text-lg font-bold text-slate-900">${node.label}</h2>
              <span class="text-xs text-blue-600 font-mono font-semibold">${node.category}</span>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold ${node.isCenter ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}">
            ${node.isCenter ? 'HUB CONTROLLER' : node.phase || 'SDLC AGENT'}
          </span>
        </div>

        <div class="mt-4">
          <h3 class="text-xs uppercase font-bold text-slate-400 tracking-wider">PROJECT_BUILDER Directive & Role Spec</h3>
          <p class="text-slate-700 mt-1.5 leading-relaxed text-sm">${node.desc}</p>
        </div>

        ${storyStepObj ? `
          <div class="mt-5 p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <span class="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Active Step ${storyStepObj.step}: ${storyStepObj.target}</span>
            <p class="text-xs text-slate-800 leading-relaxed">${storyStepObj.desc}</p>
          </div>
        ` : ''}
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <span class="text-xs uppercase font-bold text-slate-400 block mb-1">Skill Path Location</span>
          <span class="text-sm font-semibold text-slate-800 font-mono">${node.label}/SKILL.md</span>
          <p class="text-xs text-slate-500 mt-1">Autonomous skill definition file loaded by Antigravity.</p>
        </div>
        <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <span class="text-xs uppercase font-bold text-slate-400 block mb-1">Target Handoff Artifact</span>
          <span class="text-sm font-semibold text-slate-800 font-mono">docs/ & src/ Deliverables</span>
          <p class="text-xs text-slate-500 mt-1">Passes structured markdown or code to next phase agent.</p>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// VIEW 4: Categorized Grid Matrix View
// -------------------------------------------------------------
function renderGridMatrixView() {
  const container = document.getElementById('gridMatrixContainer');
  if (!container) return;

  const storyStepObj = currentStoryStep > 0 ? STORY_STEPS[currentStoryStep - 1] : null;

  container.innerHTML = GRAPH_NODES.map(s => {
    const isSel = selectedNodeId === s.id;
    const isStoryFocused = storyStepObj && storyStepObj.focusNodes.includes(s.id);

    return `
      <div onclick="selectNode('${s.id}')" class="p-5 rounded-3xl border transition-all cursor-pointer shadow-sm flex flex-col justify-between ${
        isStoryFocused
          ? 'bg-blue-600 text-white border-blue-600 shadow-lg ring-2 ring-blue-400 scale-[1.02]'
          : isSel
          ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-md'
          : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
      }">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl">${s.icon}</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full ${
              isStoryFocused ? 'bg-white/20 text-white font-bold' : 'bg-slate-100 text-slate-600 border border-slate-200'
            }">${s.category}</span>
          </div>

          <h3 class="font-bold text-sm ${isStoryFocused ? 'text-white' : 'text-slate-900'}">${s.label}</h3>
          <p class="text-xs ${isStoryFocused ? 'text-blue-100' : 'text-slate-500'} mt-2 leading-relaxed">${s.desc}</p>
        </div>

        <div class="mt-4 pt-3 border-t ${isStoryFocused ? 'border-white/20' : 'border-slate-100'} flex items-center justify-between text-[11px]">
          <span class="font-mono ${isStoryFocused ? 'text-blue-100' : 'text-slate-400'}">${s.phase || 'Hub'}</span>
          <span class="font-bold ${isStoryFocused ? 'text-white' : 'text-blue-600'}">Inspect ↗</span>
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// VIEW 5: Concentric Orbital Wheel View
// -------------------------------------------------------------
function zoomIn() {
  currentZoom = Math.min(1.8, currentZoom + 0.15);
  applyZoom();
}

function zoomOut() {
  currentZoom = Math.max(0.6, currentZoom - 0.15);
  applyZoom();
}

function resetZoom() {
  currentZoom = 1.0;
  applyZoom();
}

function applyZoom() {
  const container = document.getElementById('zoomWrapper');
  const label = document.getElementById('zoomLabel');
  if (container) {
    container.style.transform = `scale(${currentZoom})`;
    container.style.transformOrigin = 'center center';
  }
  if (label) {
    label.innerText = `${Math.round(currentZoom * 100)}%`;
  }
}

function renderAppleWheel() {
  const svg = document.getElementById('wheelSvg');
  const nodesContainer = document.getElementById('wheelNodes');
  
  if (!svg || !nodesContainer) return;

  const isStoryActive = currentStoryStep > 0;
  const storyStepObj = isStoryActive ? STORY_STEPS[currentStoryStep - 1] : null;

  let svgContent = `
    <circle cx="${APPLE_CENTER.cx}" cy="${APPLE_CENTER.cy}" r="${APPLE_CENTER.radius}" stroke="rgba(0, 122, 255, 0.18)" stroke-width="2" fill="none" stroke-dasharray="6 6"/>
    <circle cx="${APPLE_CENTER.cx}" cy="${APPLE_CENTER.cy}" r="${APPLE_CENTER.radius * 0.55}" stroke="rgba(142, 142, 147, 0.12)" stroke-width="1.5" fill="none"/>
    <circle cx="${APPLE_CENTER.cx}" cy="${APPLE_CENTER.cy}" r="78" stroke="rgba(88, 86, 214, 0.2)" stroke-width="2" fill="url(#hubGradient)"/>
    <defs>
      <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(88, 86, 214, 0.12)" />
        <stop offset="100%" stop-color="rgba(0, 122, 255, 0.04)" />
      </radialGradient>
    </defs>
  `;

  GRAPH_NODES.filter(n => !n.isCenter).forEach(node => {
    const isSelected = selectedNodeId === node.id;
    const isStoryFocused = storyStepObj && storyStepObj.focusNodes.includes(node.id);
    const isHighlighted = isSelected || isStoryFocused;

    svgContent += `
      <line 
        x1="${APPLE_CENTER.cx}" y1="${APPLE_CENTER.cy}" 
        x2="${node.x}" y2="${node.y}" 
        stroke="${isHighlighted ? '#007aff' : 'rgba(226, 232, 240, 0.8)'}" 
        stroke-width="${isHighlighted ? '2.5' : '1.5'}"
        ${isHighlighted ? 'stroke-dasharray="4 4"' : ''}
      />
    `;
  });

  svg.innerHTML = svgContent;
  nodesContainer.innerHTML = '';

  GRAPH_NODES.forEach(node => {
    const isSelected = selectedNodeId === node.id;
    const isStoryFocused = storyStepObj && storyStepObj.focusNodes.includes(node.id);
    const isActive = isSelected || isStoryFocused;

    const el = document.createElement('div');
    el.className = `absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-300 ease-out border select-none flex items-center gap-1.5 whitespace-nowrap shadow-sm ${
      isActive 
        ? 'bg-gradient-to-r from-[#007aff] to-[#0056b3] text-white border-transparent shadow-xl scale-110 ring-4 ring-blue-500/25 z-20 font-bold' 
        : node.isCenter
        ? 'bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 backdrop-blur-xl border-purple-500/30 text-purple-950 hover:border-purple-400 z-10 font-semibold'
        : 'bg-white/90 backdrop-blur-md border-slate-200/90 text-slate-800 hover:border-blue-400 hover:shadow-md z-10 font-medium'
    }`;

    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    el.onclick = () => selectNode(node.id);

    el.innerHTML = `
      <span class="text-sm">${node.icon}</span>
      <span class="text-xs font-semibold tracking-tight">${node.label}</span>
    `;

    nodesContainer.appendChild(el);
  });

  applyZoom();
}

function selectNode(nodeId) {
  selectedNodeId = nodeId;
  renderNodeDetails(nodeId);
  if (currentActiveView === 'pipeline') renderPipelineView();
  if (currentActiveView === 'linear') renderLinearView();
  if (currentActiveView === 'dashboard') renderDashboardView();
  if (currentActiveView === 'grid') renderGridMatrixView();
  if (currentActiveView === 'wheel') renderAppleWheel();
}

function renderNodeDetails(nodeId) {
  const node = GRAPH_NODES.find(n => n.id === nodeId);
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
        ${node.isCenter ? 'CENTER HUB' : node.phase || 'SDLC AGENT'}
      </span>
    </div>

    <div class="mt-3 space-y-3 text-xs">
      <div>
        <label class="text-[10.5px] uppercase font-semibold text-slate-400 tracking-wider">PROJECT_BUILDER Skill Directive</label>
        <p class="text-slate-700 mt-1 leading-relaxed font-normal">${node.desc}</p>
      </div>

      <div class="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80">
        <span class="text-[10.5px] uppercase font-semibold text-slate-400 block mb-1">Target Handoff Category</span>
        <span class="text-xs text-slate-800 font-medium">${node.category}</span>
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

  for (let i = 1; i <= 10; i++) {
    const btn = document.getElementById(`storyBtn${i}`);
    if (btn) {
      if (i === stepNum) {
        btn.className = "px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20";
      } else {
        btn.className = "px-3 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-medium border border-slate-200/80";
      }
    }
  }

  switchView(currentActiveView);
}

function nextStoryStep() {
  if (currentStoryStep < 10) {
    setStoryStep(currentStoryStep + 1);
  } else {
    setStoryStep(1);
  }
}

function prevStoryStep() {
  if (currentStoryStep > 1) {
    setStoryStep(currentStoryStep - 1);
  } else {
    setStoryStep(10);
  }
}

window.addEventListener('DOMContentLoaded', initApp);
