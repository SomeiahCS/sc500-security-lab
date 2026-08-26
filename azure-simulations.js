const AZURE_IMPACTS={
entra:[['A risky sign-in can reach the app with weak controls.','Context-aware access can require MFA, compliant device, or block access.'],['A broad or incorrect exclusion can create a bypass.','Tight targeting limits bypasses and avoids accidental lockouts.'],['Password-only access leaves a larger credential-theft path.','MFA or device requirements add another gate before access.'],['A badly scoped policy can lock out users or admins.','Report-only gives evidence before enforcement.']],
keyvault:[['Excessive permissions can expose high-value secrets.','RBAC limits which identities can read or manage vault objects.'],['A public endpoint increases the reachable attack surface.','Private access narrows the network path to approved networks.'],['Long-lived or widely readable secrets expand blast radius.','Centralized secret storage and rotation reduce secret sprawl.'],['A compromised admin could permanently remove keys or secrets.','Recovery controls make destructive actions harder to finalize.']],
governance:[['Unmanaged subscriptions can drift from the standard.','Inheritance makes controls consistent across child scopes.'],['A vague rule can miss the actual risky configuration.','A precise definition maps the requirement to a measurable property.'],['Audit-only does not stop a risky deployment.','Deny prevents noncompliant deployment before exposure exists.'],['Configuration drift can remain unnoticed.','Compliance results make deviations visible and actionable.']],
storage:[['Public reachability can expose data paths to the internet.','Selected networks or disabled public access reduce exposure.'],['Public endpoints create a broader network path.','Private endpoints keep service access on private IP space.'],['Shared keys are broad credentials and are harder to attribute.','Entra-based RBAC improves least privilege and auditability.'],['Malicious reads or uploads may blend into normal use.','Defender adds detections and security context.']],
sql:[['Open firewall ranges expose the database service broadly.','Private or tightly scoped connectivity reduces reachable paths.'],['Standalone credentials can become long-lived unmanaged secrets.','Entra authentication improves governance and access lifecycle.'],['Without logs, suspicious queries are harder to investigate.','Auditing creates evidence for investigations and compliance.'],['Attacks may not be obvious from raw logs alone.','Defender adds higher-level threat signals.']],
network:[['An overly broad allow rule can expose a workload.','Tight NSG rules reduce unnecessary network paths.'],['Reviewing only one NSG can hide the effective outcome.','Effective rules show what traffic is actually permitted.'],['Distributed egress without governance can enable uncontrolled outbound traffic.','Central policy improves inspection and consistency.'],['Public PaaS endpoints increase internet-facing surface.','Private Link reduces public exposure.']],
ai:[['An overprivileged agent can amplify access quickly.','Explicit identity and permissions constrain agent blast radius.'],['Direct model access can bypass consistent governance.','A gateway creates one enforcement and observability point.'],['AI can make existing oversharing easier to exploit.','DSPM helps identify risky data exposure before it is amplified.'],['AI-specific risks can be missed by generic monitoring.','Defender adds workload-aware context.']],
servers:[['Public management ports attract password spraying and exploit attempts.','Bastion removes direct public management exposure.'],['Always-open admin ports create persistent exposure.','JIT makes access temporary and auditable.'],['Boot-chain tampering can undermine host trust.','Trusted launch improves platform integrity assurance.'],['Unmanaged vulnerabilities and endpoint activity increase dwell time.','Defender adds vulnerability and detection capabilities.']],
appsec:[['SQL injection or XSS can directly target application endpoints.','WAF blocks or detects common layer-7 attack patterns.'],['Stolen application secrets can be reused elsewhere.','Managed identity removes stored credentials from the workload.'],['Uncontrolled APIs can expose back ends or enable abuse.','API policies create consistent request governance.'],['Vulnerable images or misconfigured clusters expand attack paths.','Container security adds posture and runtime visibility.']],
defendercloud:[['Misconfigurations can accumulate unnoticed.','Recommendations surface prioritized hardening actions.'],['A high score can still hide critical context-specific risk.','Secure score helps measure improvement, not replace judgment.'],['Individual issues may look low risk in isolation.','Attack paths show how weaknesses combine into compromise routes.'],['Uncovered workloads create monitoring gaps.','Correct plans add service-specific protection.']],
sentinel:[['No telemetry means no reliable detection.','Connectors provide the evidence layer for analytics.'],['Raw logs alone do not reliably surface attacks.','Analytics rules identify suspicious patterns.'],['Disconnected alerts can hide the full attack story.','Incidents group context for investigation.'],['Manual-only response is slower and inconsistent.','Automation reduces response time for repeatable actions.']],
copilot:[['Poorly governed context can expose more data than intended.','Workspace governance keeps usage bounded.'],['Too many admins increase configuration risk.','Role separation limits privileged actions.'],['A plugin can expand data and action reach.','Plugin governance constrains capability expansion.'],['An agent with broad rights can automate harmful actions.','Controlled permissions keep automation inside intended boundaries.']]
};

(function initAzureSimulation(){
  const studio=document.getElementById('lessonStudio');
  if(!studio)return;
  let busy=false;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function inject(){
    if(busy)return; busy=true;
    const lab=studio.querySelector('.azure-portal-lab');
    const detail=lab?.querySelector('.portal-detail');
    const settings=lab?.querySelector('.portal-setting-grid');
    if(!lab||!detail||!settings||lab.querySelector('.simulation-card')){busy=false;return;}
    const track=typeof getTrack==='function'?getTrack(state.currentTrackId):null;
    if(!track){busy=false;return;}
    const active=lab.querySelector('.portal-step.active');
    const index=Math.max(0,Number(active?.dataset.azureStep||0));
    const panel=lab.querySelector('.portal-title-row h3')?.textContent?.trim()||track.concepts[0][0];
    const [risk,benefit]=(AZURE_IMPACTS[track.id]||[])[index]||['Weak configuration leaves a larger attack path.','A well-scoped control reduces exposure and improves verification.'];
    const architecture=[...track.diagram];
    const card=document.createElement('section');
    card.className='simulation-card';
    card.innerHTML=`<div class="simulation-head"><div><p class="eyebrow">What happens if I enable this?</p><h3>${esc(panel)}</h3></div><button id="simulateControl">Simulate enable</button></div><div class="sim-architecture" id="simArchitecture">${renderArchitecture(architecture,false,panel)}</div><div class="impact-grid"><div class="impact risk"><span>Without the control</span><strong>${esc(risk)}</strong></div><div class="impact benefit"><span>With the control</span><strong>${esc(benefit)}</strong></div></div><div class="decision-strip"><span>Security decision</span><strong id="decisionText">Enable the simulation to see how the architecture changes.</strong></div><div class="mini-exam"><p class="eyebrow">Exam decision</p><h3>After configuring ${esc(panel)}, what should you verify next?</h3><div id="azureMiniExam">${['Effective configuration and relevant logs','Disable monitoring to reduce noise','Broaden access so testing is easier','Store a permanent admin credential'].map((o,i)=>`<button data-mini-answer="${i}" class="mini-answer">${o}</button>`).join('')}</div><p id="azureMiniFeedback" class="feedback" hidden></p></div>`;
    settings.before(card);
    let enabled=false;
    card.querySelector('#simulateControl').addEventListener('click',()=>{
      enabled=!enabled;
      card.querySelector('#simulateControl').textContent=enabled?'Enabled ✓':'Simulate enable';
      card.querySelector('#simulateControl').classList.toggle('sim-on',enabled);
      card.querySelector('#simArchitecture').innerHTML=renderArchitecture(architecture,enabled,panel);
      card.querySelector('#decisionText').textContent=enabled?benefit:'Enable the simulation to see how the architecture changes.';
    });
    card.querySelectorAll('[data-mini-answer]').forEach(btn=>btn.addEventListener('click',()=>{
      const choice=Number(btn.dataset.miniAnswer);
      card.querySelectorAll('[data-mini-answer]').forEach((b,i)=>{b.disabled=true;b.classList.toggle('correct',i===0);b.classList.toggle('wrong',i===choice&&choice!==0);});
      const f=card.querySelector('#azureMiniFeedback');
      f.hidden=false;
      f.innerHTML=choice===0?'<strong>Correct.</strong> Verify the effective control and the telemetry it produces.':'<strong>Not quite.</strong> Configuration is not complete until you verify the effective result and the logs.';
      localStorage.setItem('sc500-checks-v3',String(Number(localStorage.getItem('sc500-checks-v3')||0)+1));
      if(typeof updateStats==='function')updateStats();
    }));
    busy=false;
  }
  function renderArchitecture(nodes,enabled,panel){
    const copy=[...nodes];
    if(enabled)copy.splice(Math.max(1,Math.floor(copy.length/2)),0,`✓ ${panel}`);
    return copy.map((n,i)=>`<div class="sim-node ${enabled&&String(n).startsWith('✓')?'control-on':''}"><span>${i+1}</span><strong>${esc(n)}</strong></div>${i<copy.length-1?'<div class="sim-arrow">→</div>':''}`).join('');
  }
  const observer=new MutationObserver(()=>queueMicrotask(inject));
  observer.observe(studio,{childList:true,subtree:true});
  queueMicrotask(inject);
})();
