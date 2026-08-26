window.SC500_TRACKS_2 = [
{
    id:"storage",
    number:"04",
    title:"Azure Storage security",
    area:"Secure storage, databases, and networking (25–30%)",
    summary:"Protect storage with identity-based access, firewalls, private access, encryption and Defender for Storage.",
    beginner:"Storage security is about keeping data private, limiting exposure and making access traceable.",
    exam:"Know storage firewall rules, access policies, Defender for Storage, public access settings and how identities access storage securely.",
    engineer:"Review public endpoints, shared keys, SAS issuance, storage account firewalling, diagnostic logs and sensitive blob exposure.",
    mentalModel:"Data at rest + network path + access token + monitoring",
    diagram:["User / App","Private Endpoint or Firewall","Storage Account","Blob / File / Queue / Table"],
    concepts:[
      ["Public vs private access","Disable unnecessary public access and prefer private endpoints where practical."],
      ["Authentication","Prefer Microsoft Entra authentication and RBAC over shared keys when possible."],
      ["SAS tokens","Useful but dangerous if over-scoped or long-lived. Treat them like temporary credentials."],
      ["Defender for Storage","Adds detections for suspicious access, malware-related signals and risky behavior."]
    ],
    why:"Storage accounts often hold business-critical and sensitive data, making misconfiguration high impact.",
    traps:[["Private Endpoint vs Service Endpoint","Private Endpoint gives a private IP to the PaaS resource; service endpoint still reaches a public service endpoint."],["RBAC vs shared keys","RBAC is identity-based and auditable; shared keys are broader and harder to govern."],["Firewall vs SAS","Firewall limits network reachability; SAS limits what the client can do."]],
    flashcards:[["SAS token","Delegated URI-based access token that should be scoped tightly and expire quickly."],["Defender for Storage","Threat protection for storage workloads and suspicious data access activity."],["Private Endpoint","Maps a private IP in your VNet to a storage account service."]],
    quiz:{q:"Your goal is to let a VM access a storage account without traversing the public internet. Which feature is the strongest fit?",options:["Private Endpoint","Public endpoint with HTTPS","SAS token","NSG"],answer:0,why:"A private endpoint provides private connectivity from the VNet to the storage service."}
  },
{
    id:"sql",
    number:"05",
    title:"Azure SQL and database security",
    area:"Secure storage, databases, and networking (25–30%)",
    summary:"Apply platform-level security, auditing, networking and Defender for Databases across Azure SQL services.",
    beginner:"Think database security as who can connect, how data is protected and what evidence you collect.",
    exam:"Study Azure SQL firewalling, platform security options, auditing and Defender for Databases protection.",
    engineer:"Look for identity-based auth, private access, auditing retention, advanced threat signals and exposure from broad firewall rules.",
    mentalModel:"Connection path → authentication → query activity → auditing and detection",
    diagram:["Client / App","Authentication","Azure SQL","Auditing + Defender"],
    concepts:[
      ["Authentication and authorization","Reduce SQL authentication reliance and prefer stronger centralized identity approaches where feasible."],
      ["Network exposure","Avoid broad public firewall rules. Use private connectivity when possible."],
      ["Auditing","Collect query and connection activity for investigations and compliance."],
      ["Defender for Databases","Provides detections and recommendations related to database attack patterns and risk."]
    ],
    why:"Databases often contain the highest-value records in an environment.",
    traps:[["Auditing vs Defender","Auditing records events; Defender adds analytics and alerting."],["Firewall rule vs identity control","Firewall defines reachability; identity decides who may authenticate."],["Platform security vs app logic","Platform settings help protect the service even if the application is imperfect."]],
    flashcards:[["SQL auditing","Captures events such as logins and queries for security and compliance use."],["Defender for Databases","Protection and detection layer for Azure database services."],["Private networking","Reduces exposure by keeping database traffic off the public internet."]],
    quiz:{q:"Which feature is primarily used to record database events for later investigation?",options:["Azure Policy","SQL auditing","PIM","DDoS Protection"],answer:1,why:"SQL auditing is designed to record activities and connections for review and investigation."}
  },
{
    id:"network",
    number:"06",
    title:"Azure network security",
    area:"Secure storage, databases, and networking (25–30%)",
    summary:"Use NSGs, ASGs, Azure Firewall, Virtual Network Manager, Private Link, VPN security and diagnostics.",
    beginner:"Network security controls decide where traffic can go, how it is filtered and whether services stay private.",
    exam:"Know NSGs/ASGs, Virtual WAN, VPNs, Entra Private Access, private endpoints, Private Link services, Azure Firewall and Network Watcher diagnostics.",
    engineer:"Focus on segmentation, centralized egress, effective rules, troubleshooting path issues and limiting public attack surface.",
    mentalModel:"Segmentation → inspection → private connectivity → diagnostics",
    diagram:["Internet / Users","Azure Firewall","VNet / Subnets","Apps / Databases / Private Link"],
    concepts:[
      ["NSG and ASG","NSGs filter L3/L4 traffic and ASGs simplify rule targeting by logical group."],
      ["Azure Firewall","Centralized stateful filtering for network and application traffic."],
      ["Private Link family","Private endpoints secure access to PaaS; Private Link Service publishes a service privately."],
      ["Network diagnostics","Use Network Watcher and effective security rules to understand what is actually happening." ]
    ],
    why:"Many major breaches involve overly open network paths or missing segmentation.",
    traps:[["NSG vs WAF","NSG is layer 3/4 filtering; WAF protects layer 7 web traffic."],["Private Endpoint vs Private Link Service","Private Endpoint consumes a private service; Private Link Service exposes one."],["Azure Firewall vs NSG","Firewall is centralized and stateful; NSG is distributed and subnet/NIC-scoped."]],
    flashcards:[["ASG","Application Security Group helps group workloads for simpler NSG rule targeting."],["Effective security rules","Combined resultant rules that explain how NSGs affect traffic."],["Azure Firewall","Central security control for inbound, outbound and east-west policy enforcement."]],
    quiz:{q:"Which Azure feature is most appropriate for centralized stateful egress filtering across multiple subnets?",options:["Azure Firewall","ASG","PIM","Sentinel playbook"],answer:0,why:"Azure Firewall is designed for centralized stateful network and application-layer filtering."}
  }
];
