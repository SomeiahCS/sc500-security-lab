window.SC500_TRACKS_3 = [
{
    id:"ai",
    number:"07",
    title:"AI security",
    area:"Secure compute (20–25%)",
    summary:"Secure agents, data exposure, AI Gateway, Foundry guardrails, Defender for AI and Purview DSPM for AI.",
    beginner:"For SC-500, AI security is about protecting identities, data and control paths around AI workloads rather than building models.",
    exam:"Study overexposure in SharePoint, Purview DSPM for AI, Copilot Studio agent protection, Entra Agent ID, blast radius analysis, AI Gateway, Defender for AI and Foundry guardrails.",
    engineer:"Think in attack paths: prompt/agent misuse, excessive permissions, sensitive data exposure and insufficient policy around AI-enabled apps.",
    mentalModel:"User → AI app / agent → identity → model/API → enterprise data",
    diagram:["User","AI App / Agent","Entra Agent ID","AI Gateway / Model","Enterprise Data"],
    concepts:[
      ["Purview DSPM for AI","Helps identify risky data exposure related to Copilot and AI usage."],
      ["Entra Agent ID","Gives AI agents identity and access controls so you can apply Conditional Access and manage permissions."],
      ["AI Gateway in API Management","Provides control, visibility and policy enforcement for AI traffic to models and AI services."],
      ["Defender for AI / dashboards","Supports monitoring and protection for AI-related resources and risks."]
    ],
    why:"AI introduces new ways to amplify access mistakes. A misconfigured agent can rapidly widen blast radius.",
    traps:[["Securing AI vs building AI","SC-500 tests security controls around AI, not machine learning theory."],["Agent ID vs app registration","Agent identities are about governing agent access paths; they are not just a generic app object."],["Purview vs Defender","Purview focuses heavily on data exposure and governance; Defender focuses on posture and protection."]],
    flashcards:[["Entra Agent ID","Identity layer that lets you manage access for AI agents."],["AI Gateway","Policy and observability layer for AI requests via Azure API Management."],["Purview DSPM for AI","Finds overexposure and governance issues around enterprise data and AI tools."]],
    quiz:{q:"A company wants to centrally control and inspect traffic from applications to AI models in Microsoft Foundry. Which control is the best match?",options:["AI Gateway in Azure API Management","Azure Bastion","Disk encryption","NSG"],answer:0,why:"AI Gateway provides a centralized policy and governance layer for AI traffic flows."}
  },
{
    id:"servers",
    number:"08",
    title:"Servers and virtual machines",
    area:"Secure compute (20–25%)",
    summary:"Harden VMs with disk encryption, JIT access, Bastion, Azure Arc and Defender for Servers.",
    beginner:"Server security reduces the chance that a compromise spreads from compute resources into identities, data or networks.",
    exam:"Learn disk encryption, Azure Bastion, JIT VM access, Arc, Defender for Servers, vulnerability scanning, EDR and agentless scanning.",
    engineer:"Evaluate admin exposure, patching, EDR onboarding, security type, secure boot, vTPM and hybrid server coverage.",
    mentalModel:"Harden → minimize exposure → detect → respond",
    diagram:["Admin","Bastion / JIT","VM / Server","Defender for Servers + EDR"],
    concepts:[
      ["Just-in-time access","Reduces always-open management ports by allowing temporary access windows."],
      ["Azure Bastion","Securely reaches VMs without exposing RDP/SSH directly to the internet."],
      ["Defender for Servers","Adds vulnerability management, detections and server-specific protections."],
      ["Secure boot and vTPM","Strengthen trust in the boot process and platform integrity."]
    ],
    why:"Compute is often the pivot point from initial foothold to deeper compromise.",
    traps:[["Bastion vs JIT","Bastion is the access path; JIT is the time-based exposure reduction control."],["Agentless scanning vs agent-based","Agentless can discover issues without deployment overhead, but it serves a different operational model."],["Arc vs Defender for Servers","Arc extends management; Defender for Servers adds protection and security features."]],
    flashcards:[["JIT VM access","Temporarily opens management access only when needed."],["Azure Bastion","Browser-based secure access to VMs without public RDP/SSH exposure."],["Defender for Servers","Server protection plan within Defender for Cloud."]],
    quiz:{q:"Which feature reduces the risk of permanently exposed management ports on Azure VMs?",options:["Just-in-time VM access","Resource lock","Security Copilot","Private DNS zone"],answer:0,why:"JIT VM access reduces unnecessary exposure by only opening management ports temporarily when approved."}
  },
{
    id:"appsec",
    number:"09",
    title:"Apps, APIs, containers and AKS",
    area:"Secure compute (20–25%)",
    summary:"Secure App Service, Functions, Logic Apps, containers, AKS, Container Registry and API back ends.",
    beginner:"Application platform security protects the software layer that users and services interact with every day.",
    exam:"Focus on Defender for Containers, AKS controls, Container Registry security, App Service and Functions security, WAF and API Management policies.",
    engineer:"Look at ingress, secrets, runtime risk, managed identities, image integrity and backend API governance.",
    mentalModel:"Identity + network + runtime + supply chain",
    diagram:["Users","WAF / API Management","App Service / AKS / Functions","Data + Secrets"],
    concepts:[
      ["Defender for Containers","Finds misconfigurations and runtime risks in container workloads."],
      ["AKS security","Includes cluster hardening, workload identity, network controls and secrets handling."],
      ["Web Application Firewall","Protects layer 7 web workloads from attacks such as SQL injection and XSS."],
      ["API Management","Applies policies and governance for back-end API protection, including AI traffic cases."]
    ],
    why:"Modern attacks often target internet-facing applications and APIs directly.",
    traps:[["WAF vs Azure Firewall","WAF protects HTTP/S layer 7; Azure Firewall handles broader centralized network filtering."],["Container Registry vs running container","Registry protection covers image storage and access; workload protection covers runtime behavior."],["Managed identity vs secret in app settings","Managed identity avoids long-lived app secrets."]],
    flashcards:[["Defender for Containers","Protection and detection for containerized workloads and Kubernetes environments."],["WAF","Layer 7 web protection against common application attacks."],["API Management policy","Policy engine for API security, governance and transformation."]],
    quiz:{q:"Which Azure control is most directly aimed at protecting a public web application from SQL injection and XSS?",options:["NSG","Web Application Firewall","PIM","Azure Backup"],answer:1,why:"WAF is specifically built to inspect and protect HTTP/S traffic from common web attacks."}
  }
];
