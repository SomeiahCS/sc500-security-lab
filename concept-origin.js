window.SC500_ORIGIN_STORIES = {
  entra:{
    before:"Passwords and permanent admin roles were often enough to reach cloud resources.",
    trigger:"Credential theft, remote work, SaaS adoption, token abuse, and excessive standing privilege made identity the main attack path.",
    why:"Microsoft Entra security adds context-aware access, temporary privilege, workload identity, and app-governance controls around that attack path.",
    where:"Use it wherever a user, application, workload, or agent needs to prove identity before reaching Microsoft cloud resources.",
    missing:"Stolen credentials, over-privileged admins, risky service principals, and weak app consent can become direct paths to data and infrastructure.",
    engineer:"Validate sign-in logs, Conditional Access results, role assignments, PIM activation, service-principal credentials, and risky identities.",
    evolution:["Password","MFA","Conditional Access","Risk-based access","PIM / workload identity"]
  },
  keyvault:{
    before:"Applications commonly stored passwords, API keys, and certificates in code, config files, or deployment pipelines.",
    trigger:"Secret leakage, accidental source-control exposure, certificate sprawl, and destructive key deletion created a need for centralized protection.",
    why:"Azure Key Vault centralizes secrets, keys, and certificates behind identity, authorization, network restrictions, logging, and recovery controls.",
    where:"Use it for application secrets, encryption keys, certificates, signing material, and other high-value credentials used by workloads.",
    missing:"Secrets can leak into repositories, logs, build systems, or VM disks, while deleted keys can make encrypted data unrecoverable.",
    engineer:"Check RBAC, managed identities, private endpoints or firewall rules, soft delete, purge protection, diagnostics, and secret rotation.",
    evolution:["Secrets in code","Environment variables","Central vault","Managed identity access","Private + monitored vault"]
  },
  governance:{
    before:"Cloud teams could create resources quickly, but permissions and configuration often drifted between subscriptions and teams.",
    trigger:"Over-permission, inconsistent standards, accidental deletion, and audit requirements made centralized governance necessary.",
    why:"RBAC, Azure Policy, management groups, locks, and compliance controls create guardrails for who can do what and what configurations are allowed.",
    where:"Use governance across tenants, management groups, subscriptions, resource groups, and resources to keep cloud environments consistent.",
    missing:"Privilege creep, unapproved configurations, compliance gaps, and accidental destructive changes become much harder to control at scale.",
    engineer:"Review role assignments, policy initiatives, exemptions, compliance state, locks, privileged paths, and inheritance boundaries.",
    evolution:["Manual standards","RBAC","Policy","Management groups","Continuous compliance"]
  },
  storage:{
    before:"Cloud storage made data easy to share, but public endpoints, broad keys, and weak data permissions could expose large datasets.",
    trigger:"Public blob exposure, shared-key misuse, data exfiltration, malware in storage, and compliance pressure required stronger controls.",
    why:"Azure Storage security combines identity, encryption, private networking, access scoping, Defender signals, and data-protection features.",
    where:"Use these controls for blobs, files, queues, tables, data lakes, application content, backups, and any sensitive cloud data.",
    missing:"A single public container, leaked account key, or overly broad SAS token can expose or alter data at scale.",
    engineer:"Check public access, Entra authorization, SAS scope and lifetime, private endpoints, firewall rules, encryption, immutability, and Defender alerts.",
    evolution:["Account keys","Scoped SAS","Entra RBAC","Private endpoints","Threat-aware storage"]
  },
  sql:{
    before:"Databases were often secured mainly by usernames, passwords, and network firewalls.",
    trigger:"Credential theft, SQL injection, data exfiltration, insider access, and cloud-scale database estates increased the need for layered protection.",
    why:"Azure database security combines identity, least privilege, encryption, network isolation, auditing, vulnerability assessment, and threat detection.",
    where:"Use it for Azure SQL, SQL Managed Instance, Cosmos DB, PostgreSQL, MySQL, and other managed data platforms covered by the exam.",
    missing:"Attackers can turn a compromised application or credential into direct access to sensitive structured data.",
    engineer:"Verify Entra authentication, firewall/private access, database roles, auditing, Defender findings, encryption, and vulnerability recommendations.",
    evolution:["DB password","Network firewall","Entra identity","Auditing + VA","Defender + private access"]
  },
  networking:{
    before:"Traditional perimeter security assumed trusted internal networks and exposed many services through public IPs.",
    trigger:"Cloud scale, east-west traffic, internet-facing APIs, hybrid connectivity, and zero-trust design made network controls more granular.",
    why:"Azure networking security layers NSGs, firewalls, WAF, private endpoints, DDoS protection, routing, and segmentation around cloud traffic.",
    where:"Use it between subnets, VNets, internet edges, PaaS services, hybrid links, application gateways, and centralized security hubs.",
    missing:"Unnecessary public exposure or flat network paths can let attackers scan, reach, and pivot between workloads.",
    engineer:"Validate effective NSG rules, routes, firewall policy, WAF logs, private DNS, private endpoints, flow logs, and exposed public IPs.",
    evolution:["Perimeter firewall","Subnet controls","Central firewall","Private endpoints","Zero-trust segmentation"]
  },
  ai:{
    before:"Applications accessed models and enterprise data with identities and permissions designed for normal apps, not autonomous or generative behavior.",
    trigger:"AI agents, prompt-driven actions, data overexposure, model abuse, and rapidly expanding permission chains introduced new blast-radius concerns.",
    why:"AI security controls govern agent identity, model/API traffic, enterprise-data exposure, guardrails, and posture around AI-enabled workloads.",
    where:"Use them around Microsoft Foundry, Copilot, AI agents, API gateways, enterprise data sources, and model-serving applications.",
    missing:"An over-permissioned agent or poorly governed AI path can retrieve sensitive data or perform actions much faster than a human user.",
    engineer:"Review agent identities, permissions, AI Gateway policy, data exposure, Defender findings, model access paths, and logging.",
    evolution:["AI API key","App identity","Agent identity","AI Gateway","Data + model governance"]
  },
  servers:{
    before:"Administrators commonly exposed RDP or SSH, relied on static credentials, and managed each server as an isolated security problem.",
    trigger:"Internet scanning, ransomware, credential theft, hybrid estates, and lateral movement made permanent management exposure dangerous.",
    why:"Azure server security reduces administrative exposure, strengthens boot trust, adds EDR and vulnerability visibility, and extends controls to hybrid servers.",
    where:"Use it for Azure VMs, Arc-enabled servers, management access, operating-system hardening, and workload protection.",
    missing:"Open management ports or unmonitored servers can become footholds and pivot points into identities, networks, and data.",
    engineer:"Check Bastion/JIT, public IP exposure, Defender for Servers, EDR health, vulnerabilities, secure boot, vTPM, patching, and Arc coverage.",
    evolution:["Public RDP/SSH","NSG restriction","Bastion / JIT","EDR + vulnerability mgmt","Hybrid posture"]
  },
  appsec:{
    before:"Applications were deployed quickly, while APIs, containers, images, ingress, and secrets were often secured separately.",
    trigger:"Internet-facing attacks, API abuse, software-supply-chain risk, container escape, and secret leakage required platform-wide controls.",
    why:"Azure application security layers WAF, API policy, workload identity, registry protection, container posture, runtime detection, and platform hardening.",
    where:"Use it for App Service, Functions, Logic Apps, API Management, AKS, containers, and registries.",
    missing:"A vulnerable public app or exposed API can become the fastest route into backend data, secrets, and cloud identities.",
    engineer:"Inspect WAF events, API policies, managed identities, ingress exposure, image findings, AKS posture, runtime alerts, and secret handling.",
    evolution:["App firewall rules","WAF","API gateway","Container security","Runtime + supply chain"]
  },
  defendercloud:{
    before:"Security teams had to manually inspect many cloud resources and often lacked one view of posture across subscriptions and clouds.",
    trigger:"Configuration drift, multicloud growth, unmanaged assets, vulnerability volume, and attack-path complexity made manual assessment impractical.",
    why:"Microsoft Defender for Cloud continuously discovers resources, evaluates posture, prioritizes recommendations, and adds workload-specific protection.",
    where:"Use it as the cloud posture and workload-protection layer across Azure, hybrid, and connected multicloud resources.",
    missing:"Unknown assets and misconfigurations can remain exposed for long periods because nobody knows they exist or understands their risk.",
    engineer:"Work from secure score, recommendations, attack paths, regulatory compliance, workload plans, vulnerability data, and coverage gaps.",
    evolution:["Manual checklist","Security Center","Secure score","CSPM","Attack paths + multicloud"]
  },
  sentinel:{
    before:"Security logs lived in separate products and analysts manually correlated events across identity, endpoint, network, and cloud systems.",
    trigger:"Cloud-scale telemetry, faster attacks, alert overload, and cross-platform incidents required centralized detection and automation.",
    why:"Microsoft Sentinel provides cloud-native SIEM and SOAR: ingest telemetry, detect suspicious behavior, investigate incidents, and automate response.",
    where:"Use it as a central security-operations layer for Microsoft and third-party logs, incidents, hunting, and response workflows.",
    missing:"Important signals stay fragmented, correlations are missed, and response depends too heavily on manual analyst effort.",
    engineer:"Validate connectors, data volume and quality, analytics rules, KQL, incidents, automation rules, playbooks, retention, and table design.",
    evolution:["Device logs","Central SIEM","Cloud SIEM","SOAR","Automated cross-cloud response"]
  },
  copilot:{
    before:"Analysts spent significant time collecting context, writing queries, summarizing incidents, and switching between security products.",
    trigger:"Security-tool complexity, analyst workload, alert volume, and the need to accelerate investigation created demand for AI-assisted operations.",
    why:"Microsoft Security Copilot adds governed AI assistance around security data, plugins, workspaces, and agents while still requiring permission boundaries.",
    where:"Use it to accelerate investigation, summarization, query generation, and security workflows where users are authorized to access the underlying data.",
    missing:"Ungoverned plugins or excessive permissions can let an assistant surface or act on data beyond what was intended.",
    engineer:"Review workspace roles, plugin permissions, agent scope, data access, auditability, and separation between user and administrator privileges.",
    evolution:["Manual investigation","Automation scripts","Security copilots","Plugins","Governed agents"]
  }
};

window.SC500_renderOriginStory = function(container, track, lesson){
  const s=window.SC500_ORIGIN_STORIES[track.id];
  if(!container||!s)return;
  const steps=[
    ["Before",s.before],
    ["Trigger",s.trigger],
    ["Why it exists",s.why],
    ["Where we use it",s.where],
    ["If it is missing",s.missing],
    ["Engineer check",s.engineer]
  ];
  container.innerHTML=`
    <section class="origin-story">
      <div class="origin-head">
        <div><p class="eyebrow">Why this technology exists</p><h3>${lesson.title}: from problem to control</h3></div>
        <button class="ghost origin-play" type="button">▶ Play explainer</button>
      </div>
      <div class="origin-stage" aria-live="polite">
        ${steps.map((x,i)=>`<article class="origin-step ${i===0?'active':''}" data-step="${i}"><span>${i+1}</span><div><strong>${x[0]}</strong><p>${x[1]}</p></div></article>`).join("")}
      </div>
      <div class="origin-flow">
        ${track.diagram.map((n,i)=>`<span class="origin-node" data-node="${i}">${n}</span>${i<track.diagram.length-1?'<b>→</b>':''}`).join("")}
      </div>
      <div class="origin-evolution"><span>Evolution</span>${s.evolution.map((n,i)=>`<em>${n}</em>${i<s.evolution.length-1?'<b>→</b>':''}`).join("")}</div>
      <p class="origin-note"><strong>Remember:</strong> first identify the problem the control was created to solve; then the Microsoft product name becomes much easier to remember.</p>
    </section>`;
  const button=container.querySelector(".origin-play");
  const cards=[...container.querySelectorAll(".origin-step")];
  const nodes=[...container.querySelectorAll(".origin-node")];
  let timers=[];
  const reset=()=>{timers.forEach(clearTimeout);timers=[];cards.forEach((c,i)=>c.classList.toggle("active",i===0));nodes.forEach(n=>n.classList.remove("active"));button.textContent="▶ Play explainer"};
  button.addEventListener("click",()=>{
    reset();button.textContent="Playing…";
    cards.forEach((card,i)=>timers.push(setTimeout(()=>{cards.forEach(c=>c.classList.remove("active"));card.classList.add("active");if(i>=2){nodes.forEach((n,j)=>n.classList.toggle("active",j<=Math.min(nodes.length-1,i-2)));}},i*1800)));
    timers.push(setTimeout(()=>{nodes.forEach(n=>n.classList.add("active"));button.textContent="↻ Replay explainer";},steps.length*1800));
  });
};