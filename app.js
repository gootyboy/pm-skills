// SDLC Swarm Wheel Diagram: 14 Skills Arranged in a Symmetrical Radial Wheel
const CENTER_HUB = {
  cx: 380,
  cy: 250,
  radius: 170
};

// 12 Outer Spokes around the Wheel + 2 Center Hub Skills = 14 Skills Total
const RAW_SKILLS = [
  // --- Center Hub (2 Skills) ---
  { id: 'skill_builder', label: 'PROJECT_BUILDER_SKILL.md', isCenter: true, category: 'Swarm Controller', icon: '👑', desc: 'Lead System Architect & Engineering Director Controller.' },
  { id: 'skill_orchestrator', label: 'orchestrator', isCenter: true, category: 'State Engine', icon: '🎼', desc: 'State machine engine routing handoffs and managing project state.' },

  // --- 12 Outer Wheel Spokes (Clockwise Order) ---
  { id: 'skill_pm', label: 'pm', category: 'Phase 1: Discovery', icon: '📋', desc: 'Project Manager: Scope discovery & project contract creation.' },
  { id: 'skill_po', label: 'product_owner', category: 'Phase 2: Product', icon: '🎯', desc: 'Product Owner: Generates PRD.md & user stories.' },
  { id: 'skill_architect', label: 'techincal_architect', category: 'Phase 3: Architecture', icon: '📐', desc: 'Technical Architect: Tech stack & database schemas.' },
  { id: 'skill_design', label: 'apple_design', category: 'Phase 3: UI/UX Design', icon: '🎨', desc: 'Apple Design: HIG UI specs & typography.' },
  { id: 'skill_frontend', label: 'frontend_developer', category: 'Phase 4: Frontend', icon: '💻', desc: 'Frontend Dev: UI components & client logic.' },
  { id: 'skill_service', label: 'service_engineer', category: 'Phase 4: Backend', icon: '⚙️', desc: 'Service Engineer: APIs & database connections.' },
  { id: 'skill_qa', label: 'qa_agent', category: 'Phase 5: Quality', icon: '🧪', desc: 'QA Agent: Automated test suites & verification.' },
  { id: 'skill_uat', label: 'uat', category: 'Phase 6: Sandbox UAT', icon: '⚡', desc: 'UAT Coordinator: Temporary StackBlitz cloud sandbox.' },
  { id: 'skill_deploy', label: 'deployment', category: 'Phase 7: Release', icon: '🚀', desc: 'Deployment Agent: Production cloud deployment.' },
  { id: 'skill_arch_review', label: 'architecture_reviewer', category: 'Support: Audit', icon: '🔍', desc: 'Architecture Reviewer: Audits scalability & security.' },
  { id: 'skill_it', label: 'it_consultant', category: 'Support: Ops', icon: '💼', desc: 'IT Consultant: Vendor APIs & DB architecture.' },
  { id: 'skill_parser', label: 'content_parser', category: 'Support: Parsing', icon: '📄', desc: 'Content Parser: Extracts specs from briefs & PDFs.' }
];

// Calculate Wheel Coordinates
const outerSkills = RAW_SKILLS.filter(s => !s.isCenter);
const totalOuter = outerSkills.length;

const GRAPH_NODES = RAW_SKILLS.map((skill, index) => {
  if (skill.isCenter) {
    const isFirst = skill.id === 'skill_builder';
    return {
      ...skill,
      x: CENTER_HUB.cx + (isFirst ? -55 : 55),
      y: CENTER_HUB.cy
    };
  } else {
    const outerIndex = outerSkills.findIndex(s => s.id === skill.id);
    // Angle starting from top (-PI/2) moving clockwise
    const angle = (outerIndex / totalOuter) * 2 * Math.PI - Math.PI / 2;
    return {
      ...skill,
      x: Math.round(CENTER_HUB.cx + CENTER_HUB.radius * Math.cos(angle)),
      y: Math.round(CENTER_HUB.cy + CENTER_HUB.radius * Math.sin(angle)),
      angle
    };
  }
});

// Guided Wheel Story Steps (1 to 8)
const STORY_STEPS = [
  { step: 1, title: '1. Central Swarm Controller Kickoff', focus: ['skill_builder', 'skill_orchestrator'], desc: 'The Swarm Controller (PROJECT_BUILDER_SKILL) activates the wheel, engaging Orchestrator.' },
  { step: 2, title: '2. Scope Discovery (PM)', focus: ['skill_pm'], desc: 'Project Manager (pm) conducts requirement discovery and locks PROJECT_CONTRACT.md.' },
  { step: 3, title: '3. Product Requirements (PO)', focus: ['skill_po', 'skill_parser'], desc: 'Product Owner (product_owner) creates PRD.md and full-stack USER_STORIES.md.' },
  { step: 4, title: '4. Architecture & Design System', focus: ['skill_architect', 'skill_design', 'skill_arch_review'], desc: 'Technical Architect defines tech stack while Apple Design defines UI HIG tokens.' },
  { step: 5, title: '5. Parallel Full-Stack Build', focus: ['skill_frontend', 'skill_service', 'skill_it'], desc: 'Frontend Dev and Service Engineer build modular components, APIs, and DB schemas.' },
  { step: 6, title: '6. Quality Assurance Testing', focus: ['skill_qa'], desc: 'QA Agent runs automated test suites and validates boundary conditions.' },
  { step: 7, title: '7. Temporary StackBlitz Cloud UAT', focus: ['skill_uat'], desc: 'UAT Coordinator deploys build to a temporary StackBlitz sandbox and updates progress.html.' },
  { step: 8, title: '8. Production Release', focus: ['skill_deploy'], desc: 'Deployment Agent publishes final release to production cloud hosting.' }
];

let currentStoryStep = 0;
let selectedNodeId = 'skill_pm';

function initApp() {
  renderWheel();
  renderNodeDetails(selectedNodeId);
  renderSkillsList();
}

function renderWheel() {
  const svg = document.getElementById('wheelSvg');
  const nodesContainer = document.getElementById('wheelNodes');
  
  if (!svg || !nodesContainer) return;

  const isStoryActive = currentStoryStep > 0;
  const storyStepObj = isStoryActive ? STORY_STEPS[currentStoryStep - 1] : null;

  // Render Wheel SVG Ring & Spoke Lines
  let svgContent = `
    <!-- Outer Wheel Ring Circle -->
    <circle cx="${CENTER_HUB.cx}" cy="${CENTER_HUB.cy}" r="${CENTER_HUB.radius}" stroke="#e2e8f0" stroke-width="2.5" fill="none" stroke-dasharray="4 4"/>
    <!-- Center Hub Box -->
    <circle cx="${CENTER_HUB.cx}" cy="${CENTER_HUB.cy}" r="65" stroke="#cbd5e1" stroke-width="1.5" fill="#f8fafc"/>
  `;

  // Draw Radial Spokes from Center to Outer Nodes
  GRAPH_NODES.filter(n => !n.isCenter).forEach(node => {
    const isSelected = selectedNodeId === node.id;
    const isStoryFocused = storyStepObj && storyStepObj.focusNodes.includes(node.id);
    const isHighlighted = isSelected || isStoryFocused;

    svgContent += `
      <line 
        x1="${CENTER_HUB.cx}" y1="${CENTER_HUB.cy}" 
        x2="${node.x}" y2="${node.y}" 
        stroke="${isHighlighted ? '#007aff' : '#e2e8f0'}" 
        stroke-width="${isHighlighted ? '2.5' : '1.5'}"
        ${isHighlighted ? 'stroke-dasharray="4 4"' : ''}
      />
    `;
  });

  svg.innerHTML = svgContent;
  nodesContainer.innerHTML = '';

  // Render Nodes
  GRAPH_NODES.forEach(node => {
    const isSelected = selectedNodeId === node.id;
    const isStoryFocused = storyStepObj && storyStepObj.focusNodes.includes(node.id);
    const isActive = isSelected || isStoryFocused;

    const el = document.createElement('div');
    el.className = `absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl cursor-pointer transition-all border select-none flex items-center gap-1.5 ${
      isActive 
        ? 'bg-blue-50 border-blue-500 text-blue-950 shadow-xl scale-110 ring-4 ring-blue-500/20 z-20 font-semibold' 
        : node.isCenter
        ? 'bg-purple-50 border-purple-300 text-purple-950 hover:border-purple-400 shadow-sm z-10'
        : 'bg-white border-slate-200 text-slate-900 hover:border-slate-300 hover:shadow shadow-sm z-10'
    }`;

    el.style.left = `${node.x}px`;
    el.style.top = `${node.y}px`;
    el.onclick = () => selectNode(node.id);

    el.innerHTML = `
      <span class="text-base">${node.icon}</span>
      <div>
        <div class="font-bold text-[11px] leading-none whitespace-nowrap">${node.label}</div>
        <div class="text-[9px] text-slate-500 font-mono mt-0.5 whitespace-nowrap">${node.category}</div>
      </div>
    `;

    nodesContainer.appendChild(el);
  });
}

function selectNode(nodeId) {
  selectedNodeId = nodeId;
  renderWheel();
  renderNodeDetails(nodeId);
}

function renderNodeDetails(nodeId) {
  const node = GRAPH_NODES.find(n => n.id === nodeId);
  const detailEl = document.getElementById('nodeDetailContainer');

  if (!node || !detailEl) return;

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
        ${node.isCenter ? 'HUB' : 'SPOKE'}
      </span>
    </div>

    <div class="mt-3 space-y-3 text-xs">
      <div>
        <label class="text-[10.5px] uppercase font-semibold text-slate-400 tracking-wider">Swarm Wheel Role</label>
        <p class="text-slate-700 mt-1 leading-relaxed font-normal">${node.desc}</p>
      </div>

      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <span class="text-[10.5px] uppercase font-semibold text-slate-500 block mb-1">Wheel Position</span>
        <span class="text-xs text-slate-700 font-medium">${node.isCenter ? 'Central Control Hub' : 'Outer Wheel Spokes (Clockwise SDLC Flow)'}</span>
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

  renderWheel();
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
