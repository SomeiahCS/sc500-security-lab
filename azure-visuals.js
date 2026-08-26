const AZURE_VISUALS = {
  entra:{service:"Microsoft Entra admin center",breadcrumb:["Identity","Protection","Conditional Access","Policies"],title:"Conditional Access policies",steps:[
    {label:"Open Conditional Access",nav:["Identity","Protection","Conditional Access"],panel:"Policies",detail:"This is where you review policy state, assignments, conditions and grant/session controls."},
    {label:"Choose assignments",nav:["Users","Target resources","Conditions"],panel:"Assignments",detail:"Select who and what the policy applies to. Think signals first: users, apps, device/platform, location and risk."},
    {label:"Configure grant controls",nav:["Grant","Require MFA","Require compliant device"],panel:"Access controls",detail:"This is the decision layer: block access or require one or more controls before access is granted."},
    {label:"Use report-only first",nav:["Enable policy","Report-only"],panel:"Safe rollout",detail:"For production changes, report-only helps you understand impact before enforcement."}
  ]},
  keyvault:{service:"Azure portal",breadcrumb:["Key vaults","sc500-lab-vault"],title:"Key Vault overview",steps:[
    {label:"Review access configuration",nav:["Access configuration"],panel:"Permission model",detail:"Review whether the vault uses Azure RBAC and keep permissions least-privileged."},
    {label:"Restrict networking",nav:["Networking","Firewalls and virtual networks"],panel:"Network access",detail:"Prefer selected networks or private endpoint access when public exposure is unnecessary."},
    {label:"Open Secrets / Keys",nav:["Objects","Secrets / Keys / Certificates"],panel:"Protected objects",detail:"This is where cryptographic objects are created, versioned and managed."},
    {label:"Verify protection",nav:["Properties","Soft-delete","Purge protection"],panel:"Recovery controls",detail:"Soft-delete and purge protection reduce the risk of destructive deletion."}
  ]},
  governance:{service:"Azure portal",breadcrumb:["Policy","Assignments"],title:"Azure Policy assignments",steps:[
    {label:"Choose scope",nav:["Scope","Management group / Subscription"],panel:"Assignment scope",detail:"Set the highest sensible scope so guardrails inherit consistently."},
    {label:"Pick a definition",nav:["Policy definition","Built-in / Custom"],panel:"Definition",detail:"Choose a built-in definition or a custom rule that matches the required control."},
    {label:"Understand effect",nav:["Parameters","Effect","Audit / Deny / Modify"],panel:"Policy effect",detail:"Audit observes drift; deny blocks noncompliant changes; modify can remediate supported properties."},
    {label:"Review compliance",nav:["Compliance","Resources"],panel:"Compliance view",detail:"Use compliance results to find drift and prioritize remediation."}
  ]},
  storage:{service:"Azure portal",breadcrumb:["Storage accounts","sc500storage"],title:"Storage account networking",steps:[
    {label:"Review public network access",nav:["Networking","Firewalls and virtual networks"],panel:"Network connectivity",detail:"Reduce public exposure and use selected networks or private endpoints where possible."},
    {label:"Add private endpoint",nav:["Networking","Private endpoint connections"],panel:"Private endpoint",detail:"A private endpoint gives the storage service a private IP in your VNet."},
    {label:"Review access control",nav:["Access Control (IAM)"],panel:"RBAC",detail:"Prefer identity-based authorization instead of broad shared-key usage."},
    {label:"Check Defender",nav:["Microsoft Defender for Cloud"],panel:"Defender for Storage",detail:"Threat protection adds detections around suspicious access and malicious activity."}
  ]},
  sql:{service:"Azure portal",breadcrumb:["SQL databases","sc500-sql"],title:"SQL database security",steps:[
    {label:"Review networking",nav:["Networking","Private access / Firewall rules"],panel:"Connectivity",detail:"Avoid broad firewall ranges and prefer private connectivity for sensitive workloads."},
    {label:"Configure identity",nav:["Microsoft Entra admin"],panel:"Authentication",detail:"Centralized identity improves governance and reduces reliance on standalone SQL credentials."},
    {label:"Enable auditing",nav:["Auditing"],panel:"Audit settings",detail:"Capture database activity for investigations, compliance and troubleshooting."},
    {label:"Enable Defender",nav:["Microsoft Defender for Cloud"],panel:"Defender for SQL",detail:"Use Defender for Databases for security recommendations and threat detections."}
  ]},
  network:{service:"Azure portal",breadcrumb:["Virtual networks","sc500-vnet"],title:"Network security controls",steps:[
    {label:"Inspect NSG rules",nav:["Subnets / NIC","Network security group"],panel:"Security rules",detail:"Check source, destination, port, protocol, priority and effective outcome."},
    {label:"Use effective rules",nav:["Network Watcher","Effective security rules"],panel:"Resultant policy",detail:"Effective rules help explain what traffic is actually allowed after inheritance."},
    {label:"Review Azure Firewall",nav:["Azure Firewall","Rules"],panel:"Central filtering",detail:"Use centralized stateful filtering for shared inbound, outbound and east-west policy."},
    {label:"Prefer private access",nav:["Private Link center","Private endpoints"],panel:"Private connectivity",detail:"Private Link reduces public exposure to PaaS services."}
  ]},
  ai:{service:"Microsoft security / Azure",breadcrumb:["AI security","Governance"],title:"AI security control plane",steps:[
    {label:"Map agent identity",nav:["Microsoft Entra","Agent identities"],panel:"Identity",detail:"Treat AI agents as identities with explicit owners, permissions and access boundaries."},
    {label:"Control model traffic",nav:["API Management","AI Gateway"],panel:"AI Gateway",detail:"Centralize policy, observability and governance for requests to AI models and endpoints."},
    {label:"Review data exposure",nav:["Microsoft Purview","DSPM for AI"],panel:"Data security",detail:"Find overexposed enterprise data that could be reached through Copilot or AI experiences."},
    {label:"Monitor protection",nav:["Microsoft Defender","AI workloads"],panel:"Defender",detail:"Use posture and threat-protection signals around AI resources and applications."}
  ]},
  servers:{service:"Azure portal",breadcrumb:["Virtual machines","sc500-vm"],title:"Virtual machine security",steps:[
    {label:"Reduce admin exposure",nav:["Connect","Bastion"],panel:"Azure Bastion",detail:"Use Bastion instead of exposing RDP or SSH directly to the internet."},
    {label:"Enable JIT",nav:["Microsoft Defender for Cloud","Just-in-time VM access"],panel:"JIT access",detail:"Open management ports only for approved temporary windows."},
    {label:"Review security type",nav:["Configuration","Security type"],panel:"Trusted launch",detail:"Secure Boot and vTPM strengthen trust in the platform and boot chain."},
    {label:"Check Defender",nav:["Defender for Cloud","Defender for Servers"],panel:"Server protection",detail:"Confirm coverage for vulnerability assessment, EDR and server-specific detections."}
  ]},
  appsec:{service:"Azure portal",breadcrumb:["Application workloads","Security"],title:"Application platform security",steps:[
    {label:"Inspect public entry",nav:["Application Gateway / Front Door","WAF policy"],panel:"Web Application Firewall",detail:"Use WAF for layer-7 protection against common web attacks."},
    {label:"Review workload identity",nav:["App Service / AKS","Identity"],panel:"Managed identity",detail:"Prefer managed identity over long-lived application secrets."},
    {label:"Protect APIs",nav:["API Management","Policies"],panel:"API policy",detail:"Apply authentication, rate limits, validation and back-end protection centrally."},
    {label:"Check containers",nav:["Defender for Cloud","Defender for Containers"],panel:"Container security",detail:"Review registry, cluster posture and runtime detections."}
  ]},
  defendercloud:{service:"Microsoft Defender for Cloud",breadcrumb:["Defender for Cloud","Overview"],title:"Security posture dashboard",steps:[
    {label:"Start with recommendations",nav:["Recommendations"],panel:"Recommendations",detail:"Recommendations identify concrete posture gaps and suggested remediation."},
    {label:"Review secure score",nav:["Secure score"],panel:"Posture score",detail:"Use secure score as a directional measure, not as a substitute for risk-based prioritization."},
    {label:"Inspect attack paths",nav:["Attack path analysis"],panel:"Attack paths",detail:"Attack paths connect misconfigurations and identities into likely compromise routes."},
    {label:"Check workload plans",nav:["Environment settings","Defender plans"],panel:"Coverage",detail:"Confirm the right Defender plans are enabled for the workloads you actually run."}
  ]},
  sentinel:{service:"Microsoft Sentinel",breadcrumb:["Microsoft Sentinel","Workspace"],title:"Sentinel operations",steps:[
    {label:"Connect data",nav:["Content hub / Data connectors"],panel:"Data ingestion",detail:"Install the solution where needed, then configure the connector to bring telemetry into the workspace."},
    {label:"Create detections",nav:["Analytics","Active rules"],panel:"Analytics rules",detail:"Analytics rules transform telemetry into alerts and incidents."},
    {label:"Investigate incidents",nav:["Incidents"],panel:"Incident queue",detail:"Use entities, timelines, alerts and investigation context to understand scope."},
    {label:"Automate response",nav:["Automation","Automation rules / Playbooks"],panel:"SOAR",detail:"Use automation rules and Logic App playbooks to standardize repetitive response actions."}
  ]},
  copilot:{service:"Microsoft Security Copilot",breadcrumb:["Security Copilot","Settings"],title:"Security Copilot administration",steps:[
    {label:"Review workspace",nav:["Workspace settings"],panel:"Workspace",detail:"Understand where Copilot is configured and what security data context is available."},
    {label:"Control permissions",nav:["Roles and permissions"],panel:"Access control",detail:"Separate who can use Copilot from who can administer it."},
    {label:"Review plugins",nav:["Plugins"],panel:"Extensions",detail:"Plugins expand capability and therefore need governance and review."},
    {label:"Manage agents",nav:["Agents / Security Store"],panel:"Agents",detail:"Enable only trusted agents and understand the permissions and data each one can reach."}
  ]}
};

(function initAzurePortalVisuals(){
  let selected = 0;
  let updating = false;
  const studio = document.getElementById('lessonStudio');
  if (!studio) return;

  function render(){
    if (updating) return;
    updating = true;
    const track = typeof getTrack === 'function' ? getTrack(state.currentTrackId) : null;
    const model = track && AZURE_VISUALS[track.id];
    if (!model) { updating = false; return; }
    selected = Math.min(selected, model.steps.length - 1);
    const current = model.steps[selected];
    let host = studio.querySelector('.azure-portal-lab');
    if (!host) {
      host = document.createElement('section');
      host.className = 'azure-portal-lab';
      studio.appendChild(host);
    }
    host.innerHTML = `
      <div class="azure-lab-head">
        <div><p class="eyebrow">Azure-like walkthrough</p><h3>See where this lives</h3><p class="subtext">Original learning mock-up inspired by the Azure admin workflow — not a live Azure screenshot.</p></div>
        <span class="pill">${model.service}</span>
      </div>
      <div class="portal-shell">
        <div class="portal-top"><span class="portal-logo">A</span><strong>${model.service}</strong><div class="portal-search">Search resources, services, and docs</div><span class="portal-user">SC</span></div>
        <div class="portal-breadcrumb">${model.breadcrumb.map(x=>`<span>${x}</span>`).join('<b>›</b>')}</div>
        <div class="portal-body">
          <aside class="portal-nav">
            ${model.steps.map((s,i)=>`<button class="portal-step ${i===selected?'active':''}" data-azure-step="${i}"><span>${i+1}</span>${s.label}</button>`).join('')}
          </aside>
          <div class="portal-content">
            <div class="portal-title-row"><div><p class="eyebrow">${model.title}</p><h3>${current.panel}</h3></div><span class="portal-status">Learning view</span></div>
            <div class="portal-path">${current.nav.map((x,i)=>`<div class="portal-path-node"><span>${i+1}</span><strong>${x}</strong></div>${i<current.nav.length-1?'<div class="portal-path-arrow">→</div>':''}`).join('')}</div>
            <div class="portal-detail"><strong>What to notice</strong><p>${current.detail}</p></div>
            <div class="portal-setting-grid">
              <div><span>Scope</span><strong>${track.title}</strong></div>
              <div><span>Security goal</span><strong>${track.mentalModel}</strong></div>
              <div><span>Exam memory</span><strong>${track.traps[0][0]}</strong></div>
              <div><span>Operational check</span><strong>Verify configuration + logs</strong></div>
            </div>
          </div>
        </div>
      </div>`;
    host.querySelectorAll('[data-azure-step]').forEach(btn=>btn.addEventListener('click',()=>{selected=Number(btn.dataset.azureStep);render();}));
    updating = false;
  }

  const observer = new MutationObserver(()=>{ selected = 0; render(); });
  observer.observe(studio,{childList:true,subtree:false});
  queueMicrotask(render);
})();
