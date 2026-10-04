// SDLC Swarm Skills Visualizer — Pressman & Sommerville V-Model Engine

const SDLC_SWARM_NODES = [
  { id: 'skill_builder', stop: 1, label: 'PROJECT_BUILDER_SKILL.md', category: 'Swarm Hub Controller', icon: '👑', desc: 'Master Swarm Controller: Sets autonomy modes (BALANCED / AUTOPILOT / SUPERVISED) and manages system lifecycle.' },
  { id: 'skill_orchestrator', stop: 1, label: 'orchestrator', category: 'State Engine', icon: '🎼', desc: 'State Engine: Overwrites docs/PROJECT_STATUS.md every turn to maintain rolling 3-session state and routing.' },
  { id: 'skill_it', stop: 2, label: 'it_consultant', phase: 'Phase 1', category: 'Phase 1: IT Consultant', icon: '💼', desc: 'Phase 1 — IT Consultant (Solutions Architect): Scope discovery, trade-off negotiation, & 01_ARCH_BRIEF.md.' },
  { id: 'skill_po', stop: 3, label: 'product_owner', phase: 'Phase 2', category: 'Phase 2: Product Owner', icon: '🎯', desc: 'Phase 2 — Product Owner: 02_PRD.md & full-stack vertical 03_USER_STORIES.md.' },
  { id: 'skill_architect', stop: 4, label: 'techincal_architect', phase: 'Phase 3', category: 'Phase 3: Technical Architect', icon: '📐', desc: 'Phase 3 — Technical Architect: Defines system architecture, 04_TECHNICAL_SPEC.md, and 05_TASK_MANIFEST.md.' },
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

function initApp() {
  renderVModelView();
}

function setStoryStep(stepNumber) {
  currentStoryStep = stepNumber;
  renderVModelView();
}

// -------------------------------------------------------------
// TEXTBOOK MODEL: ✌️ The V-Model (Validation & Verification — Pressman / Sommerville Standard)
// -------------------------------------------------------------
function renderVModelView() {
  const container = document.getElementById('vModelContainer');
  if (!container) return;

  const activeStation = SUBWAY_STATIONS[currentStoryStep - 1] || SUBWAY_STATIONS[1];

  const leftLeg = [
    { stop: 2, name: 'it_consultant', role: 'Scope & Architecture Brief', icon: '💼', level: 'User Needs Discovery' },
    { stop: 3, name: 'product_owner', role: 'PRD & Full-Stack User Stories', icon: '🎯', level: 'System PRD Specs' },
    { stop: 4, name: 'techincal_architect', role: 'Technical Spec & Task Manifest', icon: '📐', level: 'System Architecture' },
    { stop: 6, name: 'content_parser', role: 'Data Contracts & Schemas', icon: '📄', level: 'Component Contracts' }
  ];

  const centerApex = [
    { stop: 7, name: 'frontend_developer', role: 'Frontend UI Slices', icon: '💻' },
    { stop: 8, name: 'service_engineer', role: 'Service & Database Setup', icon: '⚙️' }
  ];

  const rightLeg = [
    { stop: 9, name: 'qa_agent', role: 'Automated Test Suites', icon: '🧪', level: 'Unit/Integration Test' },
    { stop: 10, name: 'uat', role: 'Cloud UAT Sandbox', icon: '⚡', level: 'System Acceptance' },
    { stop: 12, name: 'architecture_reviewer', role: 'Zero-Trust Audit Gate', icon: '🔍', level: 'Security Audit' },
    { stop: 11, name: 'deployment', role: 'Production Cloud Release', icon: '🚀', level: 'Production Release' }
  ];

  container.innerHTML = `
    <div class="w-full max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6">
      <div class="pb-3 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 class="text-base font-bold text-slate-900">THE V-MODEL (VERIFICATION & VALIDATION)</h2>
          <p class="text-xs text-slate-500">Standard Pressman & Sommerville Software Engineering Lifecycle</p>
        </div>
      </div>

      <!-- V-Shape Grid Layout -->
      <div class="grid grid-cols-3 gap-6 relative p-4 bg-slate-50 rounded-2xl border border-slate-200">
        
        <!-- Left Leg: Verification (Specification) -->
        <div class="space-y-4">
          <div class="font-bold text-xs text-blue-600 uppercase tracking-wider text-center pb-2 border-b border-blue-200">Specification (Verification)</div>
          ${leftLeg.map(s => {
            const isCur = currentStoryStep === s.stop;
            return `
              <div onclick="setStoryStep(${s.stop})" class="p-3.5 rounded-2xl border cursor-pointer transition-all ${
                isCur ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-md ring-2 ring-blue-300' : 'bg-white border-slate-200 text-slate-800 hover:border-blue-400'
              }">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold">${s.icon} ${s.name}</span>
                  <span class="w-6 h-6 rounded-full ${isCur ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-700'} font-black text-xs flex items-center justify-center">${s.stop}</span>
                </div>
                <div class="text-[10.5px] opacity-80 mt-1">${s.role}</div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Apex Bottom: Coding Implementation -->
        <div class="flex flex-col justify-end space-y-4">
          <div class="font-bold text-xs text-purple-600 uppercase tracking-wider text-center pb-2 border-b border-purple-200">Implementation Apex</div>
          ${centerApex.map(s => {
            const isCur = currentStoryStep === s.stop;
            return `
              <div onclick="setStoryStep(${s.stop})" class="p-3.5 rounded-2xl border cursor-pointer transition-all ${
                isCur ? 'bg-purple-600 text-white font-bold border-purple-600 shadow-md ring-2 ring-purple-300' : 'bg-white border-purple-200 text-slate-800 hover:border-purple-400'
              }">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold">${s.icon} ${s.name}</span>
                  <span class="w-6 h-6 rounded-full ${isCur ? 'bg-white text-purple-600' : 'bg-purple-100 text-purple-700'} font-black text-xs flex items-center justify-center">${s.stop}</span>
                </div>
                <div class="text-[10.5px] opacity-80 mt-1">${s.role}</div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Right Leg: Validation (Testing) -->
        <div class="space-y-4">
          <div class="font-bold text-xs text-emerald-600 uppercase tracking-wider text-center pb-2 border-b border-emerald-200">Validation (Testing)</div>
          ${rightLeg.map(s => {
            const isCur = currentStoryStep === s.stop;
            return `
              <div onclick="setStoryStep(${s.stop})" class="p-3.5 rounded-2xl border cursor-pointer transition-all ${
                isCur ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-md ring-2 ring-emerald-300' : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400'
              }">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold">${s.icon} ${s.name}</span>
                  <span class="w-6 h-6 rounded-full ${isCur ? 'bg-white text-emerald-600' : 'bg-emerald-100 text-emerald-700'} font-black text-xs flex items-center justify-center">${s.stop}</span>
                </div>
                <div class="text-[10.5px] opacity-80 mt-1">${s.role}</div>
              </div>
            `;
          }).join('')}
        </div>

      </div>

      <!-- Directive Box -->
      <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3 text-xs">
        <span class="text-2xl">${activeStation.icon}</span>
        <div>
          <h4 class="font-bold text-slate-900">Step ${activeStation.stop}: ${activeStation.name}</h4>
          <p class="text-slate-600 mt-0.5">${activeStation.desc}</p>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initApp);
