// ── CONFIG ────────────────────────────────────────────────────────────────────
const API_BASE = 'https://pbh-agent-backend-production.up.railway.app';

const VALID_SERVICES = [
  'llm-optimization',
  'quantized-infrastructure',
  'ml-pipeline',
  'ai-evaluation',
  'synthetic-data',
  'ai-automation',
  'media-infrastructure',
  'ai-education',
  'other',
];

// ── VALIDATION ────────────────────────────────────────────────────────────────
function validateForm(name, email, company, service, message) {
  if (!name.trim() || name.trim().length < 2) {
    return 'Please enter your full name.';
  }
  if (!email.trim() || !email.includes('@') || !email.includes('.')) {
    return 'Please enter a valid email address.';
  }
  if (!company.trim() || company.trim().length < 2) {
    return 'Please enter your company or organization name.';
  }
  if (!service || !VALID_SERVICES.includes(service)) {
    return 'Please select a service area.';
  }
  if (!message.trim() || message.trim().length < 20) {
    return 'Please describe your project in at least a few words.';
  }
  return null;
}

// ── SUBMIT ────────────────────────────────────────────────────────────────────
async function submitContact() {
  const name    = document.getElementById('contactName').value;
  const email   = document.getElementById('contactEmail').value;
  const company = document.getElementById('contactCompany').value;
  const service = document.getElementById('contactService').value;
  const message = document.getElementById('contactMessage').value;

  const errorEl   = document.getElementById('formError');
  const successEl = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('formSubmit');

  // Clear previous state
  errorEl.textContent = '';
  errorEl.classList.remove('visible');
  successEl.classList.remove('visible');

  // Client-side validation
  const validationError = validateForm(name, email, company, service, message);
  if (validationError) {
    errorEl.textContent = validationError;
    errorEl.classList.add('visible');
    return;
  }

  // Disable submit during request
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const resp = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:    name.trim(),
        email:   email.trim(),
        company: company.trim(),
        service_interest: service,
        message: message.trim(),
      }),
    });

    const data = await resp.json();

    if (data.status === 'ok') {
      // Hide form fields, show success state
      document.querySelector('.form-card').querySelectorAll(
        '.form-row, .form-group, .form-lead, .form-eyebrow, .form-title'
      ).forEach(el => el.style.display = 'none');
      submitBtn.style.display = 'none';
      successEl.classList.add('visible');
    } else {
      errorEl.textContent = data.message || 'Something went wrong. Please try again.';
      errorEl.classList.add('visible');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
    }

  } catch (err) {
    errorEl.textContent = 'Network error — please check your connection and try again.';
    errorEl.classList.add('visible');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Inquiry';
  }
}

// ── EVENT WIRING ──────────────────────────────────────────────────────────────
document.getElementById('formSubmit').addEventListener('click', submitContact);

// Allow Enter in single-line fields to advance to next field naturally,
// but not submit — message textarea uses Enter for newlines as expected.
document.getElementById('contactName').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); document.getElementById('contactEmail').focus(); }
});
document.getElementById('contactEmail').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); document.getElementById('contactCompany').focus(); }
});
document.getElementById('contactCompany').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); document.getElementById('contactService').focus(); }
});
