// ── CONFIG ────────────────────────────────────────────────────────────────────
const API_BASE = 'https://pbh-agent-backend-production.up.railway.app';

// Markdown pipeline config
marked.use({ gfm: true, breaks: false });
DOMPurify.setConfig({ ADD_ATTR: ['class', 'style'] });

// ── MODEL REGISTRY ────────────────────────────────────────────────────────────
const MODELS = {
  reasoning: [
    {
      key: 'ministral-3-14b-reasoning-2512-q4km',
      label: 'Ministral-3 14B Reasoning · Q4_K_M',
      desc: 'Primary reasoning model — transparent chain-of-thought',
      featured: true,
      scores: { coherence: 0.9259, instruction_following: 0.9649, reasoning: 0.9389, task_completion: 0.6786 },
      size: '7.67 GB', gpu: 'T4',
    },
    {
      key: 'ministral-3-14b-reasoning-2512-f16',
      label: 'Ministral-3 14B Reasoning · F16',
      desc: 'Full precision — maximum fidelity reasoning',
      scores: { coherence: 0.9259, instruction_following: 0.9649, reasoning: 0.9389, task_completion: 0.6786 },
      size: '25.17 GB', gpu: 'A100-40GB',
    },
    {
      key: 'phi-4-reasoning-plus-q4km',
      label: 'Phi-4 Reasoning Plus · Q4_K_M',
      desc: 'Microsoft Phi-4 — specialized reasoning architecture',
      scores: { coherence: 0.91, instruction_following: 0.94, reasoning: 0.96, task_completion: 0.72 },
      size: '8.43 GB', gpu: 'T4',
    },
    {
      key: 'phi-4-reasoning-plus-f16',
      label: 'Phi-4 Reasoning Plus · F16',
      desc: 'Full precision Phi-4 — highest reasoning fidelity',
      scores: { coherence: 0.91, instruction_following: 0.94, reasoning: 0.96, task_completion: 0.72 },
      size: '27.31 GB', gpu: 'A100-40GB',
    },
    {
      key: 'qwen3.6-27b-q4km',
      label: 'Qwen3.6 27B · Q4_K_M',
      desc: 'Hybrid DeltaNet architecture — agentic reasoning, April 2026',
      scores: { coherence: 0.82, instruction_following: 0.76, reasoning: 0.40, task_completion: 0.50 },
      size: '16.5 GB', gpu: 'A10G',
    },
    {
      key: 'qwen3.6-27b-f16',
      label: 'Qwen3.6 27B · F16',
      desc: 'Full precision 27B hybrid — 53.8GB baseline (A100 required)',
      scores: { coherence: 0.82, instruction_following: 0.76, reasoning: 0.40, task_completion: 0.50 },
      size: '53.8 GB', gpu: 'A100',
    },
    {
      key: 'mistral-nemo-instruct-2407-awq',
      label: 'Mistral-Nemo Instruct · AWQ W4A16',
      desc: 'Fastest Mistral variant — sub-second vLLM inference, AWQ compressed-tensors',
      scores: { coherence: 1.000, instruction_following: 0.900, reasoning: 0.600, task_completion: 0.833 },
      size: '8.35 GB', gpu: 'A10G',
    },
  ],
  document: [
    {
      key: 'qwen-2.5-14b-instruct-1m-q4km',
      label: 'Qwen-2.5 14B 1M Context · Q4_K_M',
      desc: '1M token context window — private document analysis',
      featured: true,
      scores: { coherence: 0.94, instruction_following: 0.96, reasoning: 0.88, task_completion: 0.91 },
      size: '8.37 GB', gpu: 'A10G',
    },
    {
      key: 'qwen-2.5-14b-instruct-1m-f16',
      label: 'Qwen-2.5 14B 1M Context · F16',
      desc: 'Full precision 1M context — maximum extraction fidelity',
      scores: { coherence: 0.94, instruction_following: 0.96, reasoning: 0.88, task_completion: 0.91 },
      size: '27.52 GB', gpu: 'A100-40GB',
    },
    {
      key: 'qwen-2.5-7b-instruct-q4km',
      label: 'Qwen-2.5 7B · Q4_K_M',
      desc: 'Efficient document agent — fast extraction',
      scores: { coherence: 0.92, instruction_following: 0.93, reasoning: 0.85, task_completion: 0.89 },
      size: '4.36 GB', gpu: 'T4',
    },
    {
      key: 'qwen-2.5-7b-instruct-f16',
      label: 'Qwen-2.5 7B · F16',
      desc: 'Full precision 7B — balanced speed and fidelity',
      scores: { coherence: 0.92, instruction_following: 0.93, reasoning: 0.85, task_completion: 0.89 },
      size: '14.19 GB', gpu: 'A10G',
    },
    {
      key: 'mistral-nemo-instruct-2407-q4km',
      label: 'Mistral-Nemo Instruct · Q4_K_M',
      desc: '12B — strong multilingual document understanding',
      scores: { coherence: 0.93, instruction_following: 0.94, reasoning: 0.86, task_completion: 0.90 },
      size: '6.96 GB', gpu: 'T4',
    },
    {
      key: 'mistral-nemo-instruct-2407-f16',
      label: 'Mistral-Nemo Instruct · F16',
      desc: 'Full precision Mistral-Nemo — maximum document fidelity',
      scores: { coherence: 0.93, instruction_following: 0.94, reasoning: 0.86, task_completion: 0.90 },
      size: '22.82 GB', gpu: 'A10G',
    },
    {
      key: 'mistral-nemo-instruct-2407-awq',
      label: 'Mistral-Nemo Instruct · AWQ W4A16',
      desc: 'AWQ 4-bit — 128K context at sub-second latency via vLLM',
      scores: { coherence: 1.000, instruction_following: 0.900, reasoning: 0.600, task_completion: 0.833 },
      size: '8.35 GB', gpu: 'A10G',
    },
    {
      key: 'qwen-2.5-32b-instruct-bnb4bit',
      label: 'Qwen-2.5 32B · BnB NF4',
      desc: '32B NF4 — full-scale document analysis, perfect stateful extraction (A100 required)',
      scores: { coherence: 1.000, instruction_following: 0.850, reasoning: 0.733, task_completion: 0.900 },
      size: '17.9 GB', gpu: 'A100-40GB',
    },
  ],
  code: [
    {
      key: 'qwen-2.5-32b-instruct-q4km',
      label: 'Qwen-2.5 32B · Q4_K_M',
      desc: 'Primary code agent — complex automation and pipelines',
      featured: true,
      scores: { coherence: 0.95, instruction_following: 0.97, reasoning: 0.92, task_completion: 0.93 },
      size: '18.49 GB', gpu: 'A10G',
    },
    {
      key: 'qwen-2.5-14b-instruct-1m-q4km',
      label: 'Qwen-2.5 14B 1M Context · Q4_K_M',
      desc: '1M context — ideal for large codebase analysis',
      scores: { coherence: 0.94, instruction_following: 0.96, reasoning: 0.88, task_completion: 0.91 },
      size: '8.37 GB', gpu: 'A10G',
    },
    {
      key: 'qwen-2.5-7b-instruct-q4km',
      label: 'Qwen-2.5 7B · Q4_K_M',
      desc: 'Fast code generation — scripts and utilities',
      scores: { coherence: 0.92, instruction_following: 0.93, reasoning: 0.85, task_completion: 0.89 },
      size: '4.36 GB', gpu: 'T4',
    },
    {
      key: 'qwen-2.5-3b-instruct-q4km',
      label: 'Qwen-2.5 3B · Q4_K_M',
      desc: 'Lightweight — simple scripts, edge deployment demo',
      scores: { coherence: 0.88, instruction_following: 0.90, reasoning: 0.80, task_completion: 0.85 },
      size: '1.80 GB', gpu: 'T4',
    },
    {
      key: 'qwen3.6-27b-q4km',
      label: 'Qwen3.6 27B · Q4_K_M',
      desc: 'Flagship agentic coding model — April 2026 hybrid architecture',
      scores: { coherence: 0.82, instruction_following: 0.76, reasoning: 0.40, task_completion: 0.50 },
      size: '16.5 GB', gpu: 'A10G',
    },
    {
      key: 'qwen-2.5-32b-instruct-bnb4bit',
      label: 'Qwen-2.5 32B · BnB NF4',
      desc: '32B NF4 via BitsAndBytes — cleanest tool-call output, no EOS stripping (A100 required)',
      scores: { coherence: 1.000, instruction_following: 0.850, reasoning: 0.733, task_completion: 0.900 },
      size: '17.9 GB', gpu: 'A100-40GB',
    },
  ],
};

const HINTS = {
  reasoning: [
    'Should a startup build on cloud LLMs or self-host quantized models?',
    'Analyze the trade-offs between model quantization and inference latency.',
    'What are the cost implications of running 14B parameter models on T4 GPUs?',
  ],
  document: [
    'Summarize the key obligations in a typical SaaS master service agreement.',
    'Extract and categorize risks from a privacy policy document.',
    'What questions should I ask when evaluating an AI vendor\'s data handling?',
  ],
  code: [
    'Write a Python ETL pipeline that validates, transforms, and loads JSON data.',
    'Build a Flask API endpoint with rate limiting and request validation.',
    'Generate a batch inference script for processing documents with a local LLM.',
  ],
};

// ── SESSION STATE ─────────────────────────────────────────────────────────────
let sessionToken = localStorage.getItem('pbh_session_token') || generateUUID();
let queriesUsed  = parseInt(localStorage.getItem('pbh_queries_used') || '0');
let queriesRemaining = 2;
let currentTemplate  = 'reasoning';
let isLoading        = false;
let thinkExpanded    = false;

localStorage.setItem('pbh_session_token', sessionToken);

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// ── INIT ───────────────────────────────────────────────────────────────────────
function init() {
  populateModels(currentTemplate);
  populateHints(currentTemplate);
  updateSessionStatus();
}

function populateModels(template) {
  const select = document.getElementById('modelSelect');
  select.innerHTML = '';
  MODELS[template].forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.key;
    opt.textContent = (m.featured ? '★ ' : '') + m.label;
    select.appendChild(opt);
  });
  onModelChange();
}

function populateHints(template) {
  const container = document.getElementById('hintChips');
  container.innerHTML = '';
  HINTS[template].forEach(hint => {
    const btn = document.createElement('button');
    btn.className = 'hint-chip';
    btn.textContent = hint;
    btn.onclick = () => { document.getElementById('promptInput').value = hint; };
    container.appendChild(btn);
  });
}

function onModelChange() {
  const key = document.getElementById('modelSelect').value;
  const model = MODELS[currentTemplate].find(m => m.key === key);
  if (!model) return;
  renderModelScores(model);
}

function renderModelScores(model) {
  const container = document.getElementById('modelScores');
  const scoreKeys = [
    ['coherence', 'Coherence'],
    ['instruction_following', 'Instruction'],
    ['reasoning', 'Reasoning'],
    ['task_completion', 'Task Comp.'],
  ];
  container.innerHTML = scoreKeys.map(([k, label]) => {
    const val = model.scores[k] || 0;
    return `
      <div class="score-item">
        <span class="score-label">${label}</span>
        <div class="score-bar"><div class="score-fill" style="width:${(val*100).toFixed(0)}%"></div></div>
        <span class="score-val">${(val*100).toFixed(1)}%</span>
      </div>`;
  }).join('');

  // Append GPU/size info
  const strip = document.getElementById('modelMetaStrip');
  const existing = strip.querySelector('.model-hw-info');
  if (existing) existing.remove();
  const hw = document.createElement('div');
  hw.className = 'model-hw-info';
  hw.style.cssText = 'margin-top:0.6rem;display:flex;gap:0.75rem;';
  hw.innerHTML = `
    <span style="font-family:'IBM Plex Mono',monospace;font-size:0.6rem;color:var(--muted);">
      <span style="color:var(--teal2);">${model.gpu}</span> · ${model.size}
    </span>`;
  strip.appendChild(hw);
}

function selectTemplate(btn) {
  document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentTemplate = btn.dataset.template;
  populateModels(currentTemplate);
  populateHints(currentTemplate);
}

function updateSessionStatus() {
  const el = document.getElementById('qsRemaining');
  const status = document.getElementById('sessionStatus');
  if (queriesRemaining <= 1) {
    el.className = 'qs-warn';
  } else {
    el.className = 'qs-remaining';
  }
  el.textContent = queriesRemaining;
}

// ── SUBMIT ────────────────────────────────────────────────────────────────────
async function submitQuery() {
  if (isLoading) return;

  const prompt = document.getElementById('promptInput').value.trim();
  if (!prompt) {
    document.getElementById('promptInput').focus();
    return;
  }

  const modelKey = document.getElementById('modelSelect').value;
  const model    = MODELS[currentTemplate].find(m => m.key === modelKey);

  setLoading(true, model);
  hideError();

  try {
    const resp = await fetch(`${API_BASE}/api/agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model_key:      modelKey,
        prompt:         prompt,
        agent_template: currentTemplate,
        session_token:  sessionToken,
      }),
    });

    const data = await resp.json();

    if (data.status === 'gate_required' || data.status === 'limit_reached') {
      setLoading(false);
      // Sync the token even on limit responses so gate submission uses
      // the correct server-side session.
      if (data.session_token) {
        sessionToken = data.session_token;
        localStorage.setItem('pbh_session_token', sessionToken);
      }
      if (!data.email_hash) showGateModal();
      return;
    }

    if (data.status === 'error') {
      setLoading(false);
      showError(data.message || 'Inference service error. Please try again.');
      showOutputContent();
      return;
    }

    // Sync server-assigned session token on every successful response.
    // Without this, every request creates a fresh DB session (query_count=0)
    // so the counter is permanently stuck at 1.
    if (data.session) {
      sessionToken     = data.session.token;
      localStorage.setItem('pbh_session_token', sessionToken);
      queriesRemaining = data.session.queries_remaining;
      queriesUsed      = data.session.queries_used;
      localStorage.setItem('pbh_queries_used', queriesUsed);
      updateSessionStatus();
    }

    renderResponse(data, model);

    // /api/agent returns status:'ok' + cta:'email_gate' when quota hits zero
    // (not status:'gate_required'), so we must check data.cta here.
    if (data.cta === 'email_gate') {
      showGateModal();
    }

  } catch (err) {
    setLoading(false);
    showError('Network error — check your connection and try again.');
    showOutputContent();
  }
}

function renderResponse(data, model) {
  setLoading(false);

  // Think block
  const thinkBlock = document.getElementById('thinkBlock');
  const thinkContent = document.getElementById('thinkContent');
  const thinkBody = document.getElementById('thinkBody');

  const thinks = data.think_blocks || data.reasoning_steps || [];
  if (thinks.length > 0) {
    thinkBlock.style.display = 'block';
    thinkContent.textContent = thinks.map(t => t.content).join('\n\n---\n\n');
    thinkBody.classList.remove('expanded');
    thinkExpanded = false;
    document.getElementById('thinkToggle').textContent = '[expand]';
  } else {
    thinkBlock.style.display = 'none';
  }

  // Response — marked.parse → DOMPurify.sanitize → hljs syntax highlighting
  const responseBody = document.getElementById('responseBody');
  responseBody.innerHTML = DOMPurify.sanitize(marked.parse(data.response || ''));
  hljs.highlightAll();

  // Copy buttons — injected after highlighting so innerText is clean code
  responseBody.querySelectorAll('pre code').forEach(codeEl => {
    const pre = codeEl.parentNode;
    pre.style.position = 'relative';
    const btn = document.createElement('button');
    btn.textContent = 'Copy';
    btn.className = 'copy-btn';
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeEl.innerText).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = 'Copy'), 2000);
      });
    });
    pre.appendChild(btn);
  });

  // Meta
  const meta = data.model_meta || {};
  const tokens = meta.inference_tokens || {};
  document.getElementById('responseMeta').innerHTML = `
    <div class="meta-item">
      <span class="meta-key">Model</span>
      <span class="meta-val">${meta.display_name || model.label}</span>
    </div>
    <div class="meta-item">
      <span class="meta-key">Elapsed</span>
      <span class="meta-val">${meta.elapsed_secs?.toFixed(1)}s</span>
    </div>
    <div class="meta-item">
      <span class="meta-key">Completion</span>
      <span class="meta-val">${tokens.completion || '—'} tokens</span>
    </div>
    <div class="meta-item">
      <span class="meta-key">Precision</span>
      <span class="meta-val">${meta.precision || '—'}</span>
    </div>
    <div class="meta-item">
      <span class="meta-key">GPU</span>
      <span class="meta-val">${model.gpu}</span>
    </div>
    <div class="meta-item" style="margin-left:auto;">
      <span class="eval-badge">quant_eval verified</span>
    </div>
  `;

  showOutputContent();
}

// ── UI STATE ──────────────────────────────────────────────────────────────────
function setLoading(state, model) {
  isLoading = state;
  const btn = document.getElementById('submitBtn');

  document.getElementById('outputEmpty').style.display   = 'none';
  document.getElementById('loadingState').className      = state ? 'loading-state visible' : 'loading-state';
  document.getElementById('outputContent').className     = 'output-content';

  if (state) {
    btn.disabled = true;
    btn.classList.add('loading');
    btn.textContent = 'Running...';
    if (model) {
      document.getElementById('loadingModel').textContent = model.label;
    }
  } else {
    btn.disabled = false;
    btn.classList.remove('loading');
    btn.textContent = 'Run Agent';
  }
}

function showOutputContent() {
  document.getElementById('outputContent').className = 'output-content visible fade-in';
  document.getElementById('loadingState').className  = 'loading-state';
}

function showError(msg) {
  const el = document.getElementById('errorBanner');
  el.textContent = msg;
  el.classList.add('visible');
}

function hideError() {
  document.getElementById('errorBanner').classList.remove('visible');
}

function toggleThink() {
  thinkExpanded = !thinkExpanded;
  const body = document.getElementById('thinkBody');
  const toggle = document.getElementById('thinkToggle');
  if (thinkExpanded) {
    body.classList.add('expanded');
    toggle.textContent = '[collapse]';
  } else {
    body.classList.remove('expanded');
    toggle.textContent = '[expand]';
  }
}

// ── EMAIL GATE ────────────────────────────────────────────────────────────────
function showGateModal() {
  document.getElementById('gdprConsent').checked = false;
  document.getElementById('modalError').classList.remove('visible');
  document.getElementById('gateModal').classList.add('visible');
  setTimeout(() => document.getElementById('gateEmail').focus(), 300);
}

function hideGateModal() {
  document.getElementById('gateModal').classList.remove('visible');
}

async function submitGate() {
  const email = document.getElementById('gateEmail').value.trim();
  const consent = document.getElementById('gdprConsent').checked;
  const errorEl = document.getElementById('modalError');

  if (!email || !email.includes('@') || !email.includes('.')) {
    errorEl.textContent = 'Please enter a valid work email address.';
    errorEl.classList.add('visible');
    return;
  }

  if (!consent) {
    errorEl.textContent = 'Please check the consent box to continue.';
    errorEl.classList.add('visible');
    return;
  }

  errorEl.classList.remove('visible');

  try {
    const resp = await fetch(`${API_BASE}/api/register-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, session_token: sessionToken }),
    });
    const data = await resp.json();

    if (data.status === 'ok') {
      queriesRemaining = data.queries_remaining || 10;
      updateSessionStatus();
      hideGateModal();
    } else {
      errorEl.textContent = data.message || 'Something went wrong. Please try again.';
      errorEl.classList.add('visible');
    }
  } catch {
    errorEl.textContent = 'Network error. Please try again.';
    errorEl.classList.add('visible');
  }
}

// Enter key on email field
document.getElementById('gateEmail').addEventListener('keydown', e => {
  if (e.key === 'Enter') submitGate();
});

// Enter key on prompt (Ctrl+Enter)
document.getElementById('promptInput').addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submitQuery();
});

// ── START ─────────────────────────────────────────────────────────────────────
init();

// ── EVENT WIRING (replaces inline HTML event attributes) ─────────────────────
// Template selector buttons
document.querySelectorAll('.template-btn').forEach(btn => {
  btn.addEventListener('click', () => selectTemplate(btn));
});

// Model select dropdown
document.getElementById('modelSelect').addEventListener('change', onModelChange);

// Run Agent button
document.getElementById('submitBtn').addEventListener('click', submitQuery);

// Think block toggle
document.querySelector('.think-header').addEventListener('click', toggleThink);

// Email gate modal submit
document.getElementById('modalSubmitBtn').addEventListener('click', submitGate);
