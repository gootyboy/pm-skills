// Multi-View SDLC Swarm Skills Visualizer — Engine & UI Controller

const APPLE_SWARM_NODES = [
  // --- Central Hub (Controller & Orchestrator) ---
  { id: 'skill_builder', label: 'PROJECT_BUILDER_SKILL.md', isCenter: true, category: 'Swarm Controller', icon: '👑', desc: 'Lead System Architect & Engineering Director. Sets autonomy modes and manages system lifecycle.' },
  { id: 'skill_orchestrator', label: 'orchestrator', isCenter: true, category: 'State Engine', icon: '🎼', desc: 'State machine engine routing handoffs and keeping PROJECT_STATUS.md & progress.html synchronized.' },

  // --- 12 SDLC Roles ---
  { id: 'skill_pm', label: 'pm', category: 'Phase 1: Discovery', icon: '📋', desc: 'Project Manager: Conducts scope discovery, locks trade-offs, and creates PROJECT_CONTRACT.md.' },
  { id: 'skill_po', label: 'product_owner', category: 'Phase 2: Requirements', icon: '🎯', desc: 'Product Owner: Transforms contract into PRD.md and full-stack USER_STORIES.md.' },
  { id: 'skill_architect', label: 'techincal_architect', category: 'Phase 3: Architecture', icon: '📐', desc: 'Technical Architect: Defines component architecture, database schemas, and API contracts.' },
  { id: 'skill_design', label: 'apple_design', category: 'Phase 3: UI/UX System', icon: '🎨', desc: 'Apple Design: Crafts Apple HIG-compliant UI design specs, SF typography, and glassmorphism.' },
  { id: 'skill_frontend', label: 'frontend_developer', category: 'Phase 4: Frontend', icon: '💻', desc: 'Frontend Developer: Implements modular UI components, interactions, and client logic.' },
  { id: 'skill_service', label: 'service_engineer', category: 'Phase 4: Backend', icon: '⚙️', desc: 'Service Engineer: Implements backend services, database connections, and REST/GraphQL APIs.' },
  { id: 'skill_qa', label: 'qa_agent', category: 'Phase 5: Quality', icon: '🧪', desc: 'QA Agent: Generates automated test suites, boundary checks, and QA_REPORT.md.' },
  { id: 'skill_uat', label: 'uat', category: 'Phase 6: Cloud UAT', icon: '⚡', desc: 'UAT Coordinator: Deploys temporary StackBlitz cloud sandbox for stakeholder evaluation.' },
  { id: 'skill_deploy', label: 'deployment', category: 'Phase 7: Release', icon: '🚀', desc: 'Deployment Agent: Configures production cloud hosting (Vercel, Netlify, Cloudflare).' },
  { id: 'skill_arch_review', label: 'architecture_reviewer', category: 'Support: Audit', icon: '🔍', desc: 'Architecture Reviewer: Audits deliverables against contract for zero-trust security and scalability.' },
  { id: 'skill_it', label: 'it_consultant', category: 'Support: Ops', icon: '💼', desc: 'IT Consultant: Evaluates third-party vendor APIs, database setups, and infrastructure.' },
  { id: 'skill_parser', label: 'content_parser', category: 'Support: Ingestion', icon: '📄', desc: 'Content Parser: Extracts structured technical schemas from raw briefs and PDFs.' }
];

const APPLE_CENTER = { cx: 450, cy: 300, radius: 210 };
const outerSkills = APPLE_SWARM_NODES.filter(s => !s.isCenter);
const totalOuter = outerSkills.length;

const GRAPH_NODES = APPLE_SWARM_NODES.map((skill) => {
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

// Keynote-Style Guided Story Steps (1 to 8)
const STORY_STEPS = [
  { step: 1, title: '1. Swarm Controller & State Engine Kickoff', focusNodes: ['skill_builder', 'skill_orchestrator'], desc: 'The Swarm Controller (PROJECT_BUILDER_SKILL) initializes workspace autonomy and engages Orchestrator.' },
  { step: 2, title: '2. Scope Discovery & Capability Contract', focusNodes: ['skill_pm'], desc: 'Project Manager (pm) conducts discovery, negotiates trade-offs, and locks PROJECT_CONTRACT.md.' },
  { step: 3, title: '3. PRD & Full-Stack User Stories', focusNodes: ['skill_po', 'skill_parser'], desc: 'Product Owner (product_owner) creates PRD.md and full-stack USER_STORIES.md with acceptance criteria.' },
  { step: 4, title: '4. System Architecture & Apple HIG System', focusNodes: ['skill_architect', 'skill_design', 'skill_arch_review'], desc: 'Technical Architect defines tech stack while Apple Design specifies SF typography and glassmorphic UI.' },
  { step: 5, title: '5. Full-Stack Parallel Engineering', focusNodes: ['skill_frontend', 'skill_service', 'skill_it'], desc: 'Frontend Developer and Service Engineer build modular components, APIs, and DB schemas in parallel.' },
  { step: 6, title: '6. Automated QA & Boundary Assertions', focusNodes: ['skill_qa'], desc: 'QA Agent executes unit tests, checks boundary conditions, and generates QA_REPORT.md.' },
  { step: 7, title: '7. StackBlitz Temporary Cloud Sandbox UAT', focusNodes: ['skill_uat'], desc: 'UAT Coordinator packages the build into a zero-config StackBlitz sandbox and updates progress.html.' },
  { step: 8, title: '8. Production Cloud Release', focusNodes: ['skill_deploy'], desc: 'Deployment Agent publishes final release to production cloud hosting (Vercel/Netlify).' }
];

let currentStoryStep = 0;
let selectedNodeId = 'skill_pm';
let currentZoom = 1.0;
let currentActiveView = 'pipeline'; // Default: Pipeline Kanban

function initApp() {
  switchView('pipeline');
  renderNodeDetails(selectedNodeId);
}

// View Switcher
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

  // Render content for active view
  if (viewName === 'pipeline') renderPipelineView();
  if (viewName === 'linear') renderLinearView();
  if (viewName === 'dashboard') renderDashboardView();
  if (viewName === 'grid') renderGridMatrixView();
  if (viewName === 'wheel') renderAppleWheel();
}

// -------------------------------------------------------------
// VIEW 1: SDLC Pipeline Board (Kanban Columns)
// -------------------------------------------------------------
function renderPipelineView() {
  const container = document.getElementById('pipelineBoard');
  if (!container) return;

  const columns = [
    { title: '👑 Swarm Hub', phase: 'Hub', ids: ['skill_builder', 'skill_orchestrator'], color: 'border-purple-300 bg-purple-50/40' },
    { title: '📋 Discovery & PRD', phase: 'Specs', ids: ['skill_pm', 'skill_po', 'skill_parser'], color: 'border-blue-300 bg-blue-50/40' },
    { title: '📐 Architecture & UX', phase: 'Design', ids: ['skill_architect', 'skill_design', 'skill_arch_review'], color: 'border-indigo-300 bg-indigo-50/40' },
    { title: '💻 Core Engineering', phase: 'Build', ids: ['skill_frontend', 'skill_service', 'skill_it'], color: 'border-emerald-300 bg-emerald-50/40' },
    { title: '🧪 QA & Cloud UAT', phase: 'Testing', ids: ['skill_qa', 'skill_uat'], color: 'border-amber-300 bg-amber-50/40' },
    { title: '🚀 Release & Ops', phase: 'Deploy', ids: ['skill_deploy'], color: 'border-rose-300 bg-rose-50/40' }
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
      <div class="flex-1 min-w-[240px] rounded-3xl border ${col.color} p-3 flex flex-col gap-3">
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
// VIEW 2: Linear Flow Storyboard (Step-by-Step Sequence Map)
// -------------------------------------------------------------
function renderLinearView() {
  const container = document.getElementById('linearFlowContainer');
  if (!container) return;

  const storyStepObj = currentStoryStep > 0 ? STORY_STEPS[currentStoryStep - 1] : null;

  container.innerHTML = STORY_STEPS.map((stepObj) => {
    const isActiveStep = currentStoryStep === stepObj.step;
    const focusSkills = GRAPH_NODES.filter(n => stepObj.focusNodes.includes(n.id));

    return `
      <div onclick="setStoryStep(${stepObj.step})" class="relative flex-1 min-w-[260px] max-w-[320px] rounded-3xl border p-4 cursor-pointer transition-all ${
        isActiveStep
          ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white border-blue-700 shadow-xl ring-4 ring-blue-500/30 scale-[1.03]'
          : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
      }">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            isActiveStep ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
          }">Step ${stepObj.step}</span>
          <span class="text-xs font-mono font-semibold ${isActiveStep ? 'text-blue-100' : 'text-slate-400'}">${focusSkills.length} Agents</span>
        </div>

        <h3 class="font-bold text-xs ${isActiveStep ? 'text-white' : 'text-slate-900'} leading-snug">${stepObj.title}</h3>
        <p class="text-[11px] ${isActiveStep ? 'text-blue-100' : 'text-slate-500'} mt-1.5 leading-relaxed">${stepObj.desc}</p>

        <!-- Focus Skill Badges -->
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

  const categories = ['Swarm Controller', 'State Engine', 'Phase 1: Discovery', 'Phase 2: Requirements', 'Phase 3: Architecture', 'Phase 3: UI/UX System', 'Phase 4: Frontend', 'Phase 4: Backend', 'Phase 5: Quality', 'Phase 6: Cloud UAT', 'Phase 7: Release', 'Support: Audit', 'Support: Ops', 'Support: Ingestion'];

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
        <span class="text-[9px] opacity-75 font-mono shrink-0">${s.category.split(':')[0]}</span>
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
            ${node.isCenter ? 'HUB CONTROLLER' : 'SDLC AGENT'}
          </span>
        </div>

        <div class="mt-4">
          <h3 class="text-xs uppercase font-bold text-slate-400 tracking-wider">Role & Capabilities Directive</h3>
          <p class="text-slate-700 mt-1.5 leading-relaxed text-sm">${node.desc}</p>
        </div>

        ${storyStepObj ? `
          <div class="mt-5 p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <span class="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">Active Story Focus (Step ${storyStepObj.step})</span>
            <p class="text-xs text-slate-800 leading-relaxed">${storyStepObj.desc}</p>
          </div>
        ` : ''}
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <span class="text-xs uppercase font-bold text-slate-400 block mb-1">Execution Mode</span>
          <span class="text-sm font-semibold text-slate-800">Autonomous Reactive Agent</span>
          <p class="text-xs text-slate-500 mt-1">Operates within the Antigravity multi-agent workspace loop.</p>
        </div>
        <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <span class="text-xs uppercase font-bold text-slate-400 block mb-1">Artifact Deliverable</span>
          <span class="text-sm font-semibold text-slate-800 font-mono">${node.label}.md</span>
          <p class="text-xs text-slate-500 mt-1">Creates & maintains structured Markdown specs in workspace.</p>
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
          <span class="font-mono ${isStoryFocused ? 'text-blue-100' : 'text-slate-400'}">${s.isCenter ? 'Hub Directive' : 'SDLC Skill'}</span>
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
        ${node.isCenter ? 'CENTER HUB' : 'ORBITAL SPOKE'}
      </span>
    </div>

    <div class="mt-3 space-y-3 text-xs">
      <div>
        <label class="text-[10.5px] uppercase font-semibold text-slate-400 tracking-wider">Skill Directive</label>
        <p class="text-slate-700 mt-1 leading-relaxed font-normal">${node.desc}</p>
      </div>

      <div class="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80">
        <span class="text-[10.5px] uppercase font-semibold text-slate-400 block mb-1">Architecture Category</span>
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

  for (let i = 1; i <= 8; i++) {
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
  if (currentStoryStep < 8) {
    setStoryStep(currentStoryStep + 1);
  } else {
    setStoryStep(1);
  }
}

function prevStoryStep() {
  if (currentStoryStep > 1) {
    setStoryStep(currentStoryStep - 1);
  } else {
    setStoryStep(8);
  }
}

window.addEventListener('DOMContentLoaded', initApp);
