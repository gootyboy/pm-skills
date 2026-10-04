// Complete Network Graph Data: All 14 Skills (Zero Rules, Clean Light Theme)
const GRAPH_NODES = [
  // --- CORE CONTROLLERS ---
  { id: 'skill_builder', label: 'PROJECT_BUILDER_SKILL.md', type: 'controller', category: 'Controllers', icon: '👑', x: 120, y: 140, desc: 'Multi-Agent SDLC Swarm Lead System Architect & Engineering Director Controller.' },
  { id: 'skill_orchestrator', label: 'orchestrator', type: 'controller', category: 'Controllers', icon: '🎼', x: 380, y: 140, desc: 'State machine engine routing handoffs and managing PROJECT_STATUS.md & progress.html.' },

  // --- PHASE SKILLS (SDLC Pipeline) ---
  { id: 'skill_pm', label: 'pm', type: 'phase', phaseNum: 1, category: 'SDLC Pipeline', icon: '📋', x: 80, y: 290, desc: 'Project Manager: Scope discovery, feature trade-offs, and project contract creation.' },
  { id: 'skill_po', label: 'product_owner', type: 'phase', phaseNum: 2, category: 'SDLC Pipeline', icon: '🎯', x: 240, y: 290, desc: 'Product Owner: Generates PRD.md, full-stack user stories, and acceptance criteria.' },
  { id: 'skill_architect', label: 'techincal_architect', type: 'phase', phaseNum: 3, category: 'SDLC Pipeline', icon: '📐', x: 400, y: 290, desc: 'Technical Architect: Selects tech stack, data schemas, and API contracts.' },
  { id: 'skill_design', label: 'apple_design', type: 'phase', phaseNum: 3, category: 'SDLC Pipeline', icon: '🎨', x: 560, y: 290, desc: 'Apple Design: Crafts Apple HIG-compliant UI design specs, typography, and glassmorphism.' },
  { id: 'skill_frontend', label: 'frontend_developer', type: 'phase', phaseNum: 4, category: 'SDLC Pipeline', icon: '💻', x: 720, y: 290, desc: 'Frontend Developer: Builds modular UI components, interactions, and client logic.' },
  { id: 'skill_service', label: 'service_engineer', type: 'phase', phaseNum: 4, category: 'SDLC Pipeline', icon: '⚙️', x: 880, y: 290, desc: 'Service Engineer: Implements backend services, database connections, and REST/GraphQL APIs.' },
  { id: 'skill_qa', label: 'qa_agent', type: 'phase', phaseNum: 5, category: 'SDLC Pipeline', icon: '🧪', x: 720, y: 460, desc: 'QA Agent: Generates automated test suites, executes boundary checks, and produces QA_REPORT.md.' },
  { id: 'skill_uat', label: 'uat', type: 'phase', phaseNum: 6, category: 'SDLC Pipeline', icon: '⚡', x: 520, y: 460, desc: 'UAT Coordinator: Deploys temporary StackBlitz cloud sandbox for stakeholder evaluation.' },
  { id: 'skill_deploy', label: 'deployment', type: 'phase', phaseNum: 7, category: 'SDLC Pipeline', icon: '🚀', x: 320, y: 460, desc: 'Deployment Agent: Configures production cloud hosting (Vercel, Netlify, Cloudflare).' },

  // --- SUPPORTING SKILLS ---
  { id: 'skill_arch_review', label: 'architecture_reviewer', type: 'support', category: 'Specialized Support', icon: '🔍', x: 620, y: 140, desc: 'Architecture Reviewer: Audits deliverables against contract, checking scalability and zero-trust security.' },
  { id: 'skill_it', label: 'it_consultant', type: 'support', category: 'Specialized Support', icon: '💼', x: 800, y: 140, desc: 'IT Consultant: Evaluates third-party vendor APIs, database setups, and infrastructure requirements.' },
  { id: 'skill_parser', label: 'content_parser', type: 'support', category: 'Specialized Support', icon: '📄', x: 120, y: 460, desc: 'Content Parser: Extracts structured technical schemas from raw briefs and PDFs.' }
];

// Network Edges / Connections
const GRAPH_EDGES = [
  // Pipeline Handoff Edges
  { from: 'skill_builder', to: 'skill_pm', label: '1. Init Scope' },
  { from: 'skill_pm', to: 'skill_po', label: '2. Contract Handoff' },
  { from: 'skill_po', to: 'skill_architect', label: '3a. Specs' },
  { from: 'skill_po', to: 'skill_design', label: '3b. UI Tokens' },
  { from: 'skill_architect', to: 'skill_frontend', label: '4a. Tech Spec' },
  { from: 'skill_architect', to: 'skill_service', label: '4b. DB Schema' },
  { from: 'skill_design', to: 'skill_frontend', label: '4c. HIG Mockups' },
  { from: 'skill_frontend', to: 'skill_qa', label: '5a. Code Base' },
  { from: 'skill_service', to: 'skill_qa', label: '5b. API Endpoints' },
  { from: 'skill_qa', to: 'skill_uat', label: '6. QA Verified' },
  { from: 'skill_uat', to: 'skill_deploy', label: '7. UAT Approved' },

  // Orchestration & Support Links
  { from: 'skill_orchestrator', to: 'skill_pm', label: 'Sync State' },
  { from: 'skill_orchestrator', to: 'skill_uat', label: 'Sync UAT Link' },
  { from: 'skill_arch_review', to: 'skill_architect', label: 'Audit Arch' },
  { from: 'skill_it', to: 'skill_service', label: 'Vendor Consult' },
  { from: 'skill_parser', to: 'skill_po', label: 'Parse Specs' }
];

// Guided Story Steps
const STORY_STEPS = [
  {
    step: 1,
    title: "1. Swarm Controller & Orchestrator Kickoff",
    focusNodes: ['skill_builder', 'skill_orchestrator'],
    desc: "The SDLC Swarm Controller (PROJECT_BUILDER_SKILL) initializes the workspace, sets autonomy mode, and engages Orchestrator to track project state."
  },
  {
    step: 2,
    title: "2. Scope Discovery & Project Contract",
    focusNodes: ['skill_pm'],
    desc: "The Project Manager (pm) conducts requirement discovery, establishes feature trade-offs, and locks PROJECT_CONTRACT.md."
  },
  {
    step: 3,
    title: "3. PRD & User Stories Definition",
    focusNodes: ['skill_po', 'skill_parser'],
    desc: "The Product Owner (product_owner) expands scope into PRD.md and granular USER_STORIES.md with acceptance criteria."
  },
  {
    step: 4,
    title: "4. Technical Architecture & Apple Design",
    focusNodes: ['skill_architect', 'skill_design', 'skill_arch_review'],
    desc: "Technical Architect specifies tech stack and schemas while Apple Design crafts HIG typography, glassmorphism tokens, and layout specs."
  },
  {
    step: 5,
    title: "5. Parallel Engineering (Frontend & Service)",
    focusNodes: ['skill_frontend', 'skill_service', 'skill_it'],
    desc: "Frontend Developer builds modular UI components while Service Engineer implements backend APIs and database connections."
  },
  {
    step: 6,
    title: "6. Automated QA Verification",
    focusNodes: ['skill_qa'],
    desc: "QA Agent executes automated test suites, validates boundary conditions, and produces QA_REPORT.md."
  },
  {
    step: 7,
    title: "7. StackBlitz Temporary Cloud Sandbox UAT",
    focusNodes: ['skill_uat'],
    desc: "UAT Coordinator packages the build into a zero-config StackBlitz WebContainer cloud sandbox for stakeholder evaluation."
  },
  {
    step: 8,
    title: "8. Production Release Automation",
    focusNodes: ['skill_deploy'],
    desc: "Upon UAT sign-off, Deployment Agent publishes the final build to production cloud hosting (Vercel/Netlify)."
  }
];

// App State
let currentStoryStep = 0;
let selectedNodeId = 'skill_pm';

function initApp() {
  renderNetworkGraph();
  renderNodeDetails(selectedNodeId);
  renderSkillsList();
}

function renderNetworkGraph() {
  const svg = document.getElementById('networkSvg');
  const nodesContainer = document.getElementById('networkNodes');
  
  if (!svg || !nodesContainer) return;

  svg.innerHTML = `
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"/>
      </marker>
      <marker id="arrow-active" viewBox="0 0 10 10" refX="18" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#007aff"/>
      </marker>
    </defs>
  `;
  nodesContainer.innerHTML = '';

  const isStoryActive = currentStoryStep > 0;
  const storyStepObj = isStoryActive ? STORY_STEPS[currentStoryStep - 1] : null;

  // Render Edges (Light Theme Slate / Blue Line)
  GRAPH_EDGES.forEach(edge => {
    const fromNode = GRAPH_NODES.find(n => n.id === edge.from);
    const toNode = GRAPH_NODES.find(n => n.id === edge.to);

    if (!fromNode || !toNode) return;

    const isConnectedToSelected = (edge.from === selectedNodeId || edge.to === selectedNodeId);
    const isStoryFocused = storyStepObj && (storyStepObj.focusNodes.includes(edge.from) || storyStepObj.focusNodes.includes(edge.to));
    const isHighlighted = isConnectedToSelected || isStoryFocused;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', fromNode.x);
    line.setAttribute('y1', fromNode.y);
    line.setAttribute('x2', toNode.x);
    line.setAttribute('y2', toNode.y);
    line.setAttribute('stroke', isHighlighted ? '#007aff' : '#cbd5e1');
    line.setAttribute('stroke-width', isHighlighted ? '2.5' : '1.5');
    line.setAttribute('marker-end', isHighlighted ? 'url(#arrow-active)' : 'url(#arrow)');
    if (isHighlighted) line.setAttribute('stroke-dasharray', '4 4');

    svg.appendChild(line);
  });

  // Render Nodes (Light Theme Cards)
  GRAPH_NODES.forEach(node => {
    const isSelected = selectedNodeId === node.id;
    const isStoryFocused = storyStepObj && storyStepObj.focusNodes.includes(node.id);
    const isActive = isSelected || isStoryFocused;

    const el = document.createElement('div');
    el.className = `absolute transform -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-2xl cursor-pointer transition-all border select-none flex items-center gap-2 ${
      isActive 
        ? 'bg-blue-50/90 border-blue-500 text-blue-950 shadow-xl scale-105 ring-4 ring-blue-500/20 z-20 font-semibold' 
        : node.type === 'controller'
        ? 'bg-purple-50/90 border-purple-300 text-purple-950 hover:border-purple-400 shadow-sm z-10'
        : node.type === 'support'
        ? 'bg-amber-50/90 border-amber-300 text-amber-950 hover:border-amber-400 shadow-sm z-10'
        : 'bg-white border-slate-200 text-slate-900 hover:border-slate-300 hover:shadow shadow-sm z-10'
    }`;

    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    el.onclick = () => selectNode(node.id);

    el.innerHTML = `
      <span class="text-lg">${node.icon}</span>
      <div>
        <div class="font-bold text-xs leading-none whitespace-nowrap">${node.label}</div>
        <div class="text-[9.5px] text-slate-500 font-mono mt-0.5 whitespace-nowrap">${node.type === 'phase' ? `PHASE ${node.phaseNum}` : node.category.toUpperCase()}</div>
      </div>
    `;

    nodesContainer.appendChild(el);
  });
}

function selectNode(nodeId) {
  selectedNodeId = nodeId;
  renderNetworkGraph();
  renderNodeDetails(nodeId);
}

function renderNodeDetails(nodeId) {
  const node = GRAPH_NODES.find(n => n.id === nodeId);
  const detailEl = document.getElementById('nodeDetailContainer');

  if (!node || !detailEl) return;

  const connectedEdges = GRAPH_EDGES.filter(e => e.from === nodeId || e.to === nodeId);
  
  let handoffsHtml = connectedEdges.map(e => {
    const isOut = e.from === nodeId;
    const target = GRAPH_NODES.find(n => n.id === (isOut ? e.to : e.from));
    return `
      <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
        <span class="text-slate-500 font-medium">${isOut ? 'Outputs To →' : '← Inputs From'}</span>
        <span class="font-bold text-blue-600 font-mono">${target ? target.label : e.to}</span>
      </div>
    `;
  }).join('');

  detailEl.innerHTML = `
    <div class="flex items-center justify-between pb-3 border-b border-slate-200">
      <div class="flex items-center gap-2.5">
        <span class="text-2xl">${node.icon}</span>
        <div>
          <h3 class="text-base font-bold text-slate-900">${node.label}</h3>
          <span class="text-xs text-slate-500 font-mono">${node.category}</span>
        </div>
      </div>
      <span class="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
        ${node.type.toUpperCase()}
      </span>
    </div>

    <div class="mt-3 space-y-3 text-xs">
      <div>
        <label class="text-[10.5px] uppercase font-semibold text-slate-400 tracking-wider">Directive & Responsibility</label>
        <p class="text-slate-700 mt-1 leading-relaxed font-normal">${node.desc}</p>
      </div>

      <div>
        <label class="text-[10.5px] uppercase font-semibold text-slate-400 tracking-wider mb-1.5 block">Graph Connections</label>
        <div class="space-y-1.5">
          ${handoffsHtml}
        </div>
      </div>
    </div>
  `;
}

// Story Playback Controls
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
        btn.className = "px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs shadow";
      } else {
        btn.className = "px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 text-xs border border-slate-200";
      }
    }
  }

  renderNetworkGraph();
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

function renderSkillsList() {
  const container = document.getElementById('allSkillsGrid');
  if (!container) return;

  container.innerHTML = GRAPH_NODES.map(s => `
    <div class="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
      <div class="min-w-0 pr-2">
        <div class="flex items-center gap-1.5">
          <span>${s.icon}</span>
          <span class="font-mono text-xs font-bold text-slate-900 truncate">${s.label}</span>
        </div>
        <span class="text-[11px] text-slate-500 block mt-0.5 truncate">${s.desc}</span>
      </div>
      <span class="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono border border-slate-200 shrink-0">${s.category}</span>
    </div>
  `).join('');
}

window.addEventListener('DOMContentLoaded', initApp);
