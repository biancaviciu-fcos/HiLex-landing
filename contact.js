const form = document.querySelector('#contact-form');
const status = document.querySelector('#contact-status');
const button = form.querySelector('button[type=submit]');
let submissionId = crypto.randomUUID();
let pending = false;
form.addEventListener('input', () => { if (!pending) submissionId = crypto.randomUUID(); });
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (pending || !form.reportValidity()) return;
  pending = true;
  button.disabled = true;
  button.textContent = 'Se trimite…';
  status.dataset.state = '';
  status.textContent = '';
  const payload = Object.fromEntries(new FormData(form));
  payload.submissionId = submissionId;
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20000)
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || 'Nu am putut trimite mesajul. Încearcă din nou sau scrie-ne la enquiries@fcos.co.uk.');
    status.textContent = 'Mesajul tău a fost trimis. Îți vom răspunde la adresa de e-mail indicată. Mulțumim!';
    form.reset();
    submissionId = crypto.randomUUID();
  } catch (error) {
    status.dataset.state = 'error';
    status.textContent = error.name === 'TimeoutError' || error.name === 'TypeError'
      ? 'Nu am putut confirma trimiterea. Încearcă din nou sau scrie-ne la enquiries@fcos.co.uk. Mesajul completat a fost păstrat.'
      : error.message;
  } finally {
    pending = false;
    button.disabled = false;
    button.innerHTML = 'Trimite mesajul <span aria-hidden="true">→</span>';
    status.focus();
  }
});
