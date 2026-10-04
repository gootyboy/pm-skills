// Apple Human Interface Guidelines (HIG) Design Architecture & Data Engine
const APPLE_SWARM_NODES = [
  // --- Central Hub (Controller & Orchestrator) ---
  { id: 'skill_builder', label: 'PROJECT_BUILDER_SKILL.md', isCenter: true, category: 'Swarm Controller', icon: '👑', desc: 'Lead System Architect & Engineering Director. Sets autonomy modes and manages system lifecycle.' },
  { id: 'skill_orchestrator', label: 'orchestrator', isCenter: true, category: 'State Engine', icon: '🎼', desc: 'State machine engine routing handoffs and keeping PROJECT_STATUS.md & progress.html synchronized.' },

  // --- 12 Concentric Orbital Spokes (Clockwise SDLC Flow) ---
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

// Calculate Concentric Coordinates with Spatial Buffer
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

// Apple Keynote-Style Guided Story Steps (1 to 8)
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

function initApp() {
  renderAppleWheel();
  renderNodeDetails(selectedNodeId);
  renderSkillsDirectory();
}

// Zoom Controls with Fluid Spring Feedback
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

  // Render Apple Concentric Glass Rings & Beams
  let svgContent = `
    <!-- Outer Concentric Orbit Ring -->
    <circle cx="${APPLE_CENTER.cx}" cy="${APPLE_CENTER.cy}" r="${APPLE_CENTER.radius}" stroke="rgba(0, 122, 255, 0.18)" stroke-width="2" fill="none" stroke-dasharray="6 6"/>
    <!-- Inner Concentric Orbit Ring -->
    <circle cx="${APPLE_CENTER.cx}" cy="${APPLE_CENTER.cy}" r="${APPLE_CENTER.radius * 0.55}" stroke="rgba(142, 142, 147, 0.12)" stroke-width="1.5" fill="none"/>
    <!-- Center Hub Aura -->
    <circle cx="${APPLE_CENTER.cx}" cy="${APPLE_CENTER.cy}" r="78" stroke="rgba(88, 86, 214, 0.2)" stroke-width="2" fill="url(#hubGradient)"/>
    <defs>
      <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(88, 86, 214, 0.12)" />
        <stop offset="100%" stop-color="rgba(0, 122, 255, 0.04)" />
      </radialGradient>
    </defs>
  `;

  // Draw Radial Ray Beams from Center Hub to Outer Nodes
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

  // Render Apple-Style Glass Capsules
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
  renderAppleWheel();
  renderNodeDetails(nodeId);
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
        <label class="text-[10.5px] uppercase font-semibold text-slate-400 tracking-wider">Apple HIG Skill Directive</label>
        <p class="text-slate-700 mt-1 leading-relaxed font-normal">${node.desc}</p>
      </div>

      <div class="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80">
        <span class="text-[10.5px] uppercase font-semibold text-slate-400 block mb-1">Position in Concentric System</span>
        <span class="text-xs text-slate-800 font-medium">${node.isCenter ? 'Frosted Glass Central Core' : 'Concentric Orbital Circle (SDLC Lifecycle)'}</span>
      </div>
    </div>
  `;
}

// Keynote Scrubber Controls
function setStoryStep(stepNum) {
  currentStoryStep = stepNum;
  const banner = document.getElementById('storyBanner');
  const title = document.getElementById('storyTitle');
  const desc = document.getElementById('storyDesc');

  if (stepNum === 0) {
    banner.classList.add('hidden');
  } else {
    banner.classList.remove('hidden');
    const stepObj = STORY_STEPS[stepNum - 1];
    title.innerText = stepObj.title;
    desc.innerText = stepObj.desc;
    selectedNodeId = stepObj.focusNodes[0];
    renderNodeDetails(selectedNodeId);
  }

  for (let i = 1; i <= 8; i++) {
    const btn = document.getElementById(`storyBtn${i}`);
    if (btn) {
      if (i === stepNum) {
        btn.className = "px-3 py-1 rounded-full bg-[#007aff] text-white font-bold text-xs shadow-md shadow-blue-500/20";
      } else {
        btn.className = "px-3 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-medium border border-slate-200/80";
      }
    }
  }

  renderAppleWheel();
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

function renderSkillsDirectory() {
  const container = document.getElementById('allSkillsGrid');
  if (!container) return;

  container.innerHTML = GRAPH_NODES.map(s => `
    <div class="p-4 rounded-3xl bg-white/90 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
      <div class="min-w-0 pr-2">
        <div class="flex items-center gap-2">
          <span class="text-base">${s.icon}</span>
          <span class="font-mono text-xs font-bold text-slate-900 truncate">${s.label}</span>
        </div>
        <span class="text-[11px] text-slate-500 block mt-1 truncate">${s.desc}</span>
      </div>
      <span class="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-mono border border-slate-200 shrink-0 font-medium">${s.category}</span>
    </div>
  `).join('');
}

window.addEventListener('DOMContentLoaded', initApp);
