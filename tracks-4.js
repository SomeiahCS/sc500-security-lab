window.SC500_TRACKS_4 = [
{
    id:"defendercloud",
    number:"10",
    title:"Microsoft Defender for Cloud",
    area:"Manage and monitor security posture (20–25%)",
    summary:"Use Defender for Cloud for CSPM, recommendations, workload protection and multicloud posture management.",
    beginner:"Defender for Cloud shows you where security is weak and helps you improve posture over time.",
    exam:"Know Defender CSPM, compliance evaluation, workload protection plans, multicloud connections, vulnerability management and EASM discovery.",
    engineer:"Work with secure score, recommendations, onboarding coverage, plan settings and asset discovery across hybrid or multicloud environments.",
    mentalModel:"Discover → assess → recommend → protect",
    diagram:["Cloud Resources","Defender for Cloud","Recommendations / Alerts","Remediation"],
    concepts:[
      ["Defender CSPM","Cloud security posture management layer that finds risks and configuration issues."],
      ["Workload protection plans","Service-specific protection such as Defender for Servers, Storage and Databases."],
      ["Compliance views","Maps resources against frameworks and security standards."],
      ["External Attack Surface Management","Finds internet-exposed and unmanaged assets beyond your expected inventory."]
    ],
    why:"Visibility is critical. You cannot secure what you cannot inventory or assess.",
    traps:[["Recommendations vs alerts","Recommendations improve posture; alerts indicate suspicious or risky events."],["CSPM vs workload protection","CSPM focuses on posture and misconfiguration; workload plans provide deeper service-specific protection."],["Secure score vs compliance score","Both indicate posture, but they answer slightly different questions and lenses."]],
    flashcards:[["Defender CSPM","Identifies risks, attack paths and posture gaps across cloud resources."],["Workload protection plan","Adds deeper service-specific detections and hardening options."],["EASM","Discovers exposed or unmanaged internet-facing assets."]],
    quiz:{q:"Which Defender for Cloud capability is primarily concerned with identifying posture risks and misconfigurations?",options:["Defender CSPM","Azure Bastion","PIM","Private DNS"],answer:0,why:"Defender CSPM is the posture-management capability focused on discovering risks and misconfigurations."}
  },
{
    id:"sentinel",
    number:"11",
    title:"Microsoft Sentinel",
    area:"Manage and monitor security posture (20–25%)",
    summary:"Collect, store, analyze and automate security operations across Microsoft and third-party data sources.",
    beginner:"Sentinel is your cloud-native SIEM and SOAR layer for security monitoring and response.",
    exam:"Study workspaces, roles, content hub solutions, data connectors, Syslog/CEF, Windows event collection, custom tables, automation rules and playbooks.",
    engineer:"Pay attention to log onboarding, KQL, retention, normalisation, incident handling and automation opportunities.",
    mentalModel:"Ingest → detect → investigate → automate",
    diagram:["Data Sources","Log Analytics / Sentinel","Analytics + Incidents","Automation / Playbooks"],
    concepts:[
      ["Data connectors","Bring Azure, Microsoft 365 and third-party logs into Sentinel."],
      ["Analytics and incidents","Rules turn telemetry into detections and incident investigation units."],
      ["Automation rules and playbooks","Reduce manual work and standardize response actions."],
      ["Retention and custom tables","Plan data lifecycle and store nonstandard logs in a useful structure."]
    ],
    why:"Detection and response speed matters, especially when identity and cloud resources are involved.",
    traps:[["Analytics rule vs automation rule","Analytics creates detections; automation rules trigger workflows on incidents."],["Content hub vs data connector","Content hub installs packaged content; connectors ingest data."],["Workspace vs Sentinel","Sentinel lives on top of a Log Analytics workspace."]],
    flashcards:[["Playbook","Logic App used for SOAR-style response actions in Sentinel."],["Content hub","Marketplace-like area for installing solutions, rules and content packages."],["Log Analytics workspace","Data store and query foundation that Sentinel depends on."]],
    quiz:{q:"Which Sentinel capability is used to automatically run response workflows when incidents are created?",options:["Automation rules and playbooks","Resource locks","Azure Policy","vTPM"],answer:0,why:"Automation rules and playbooks are the core response automation components in Microsoft Sentinel."}
  },
{
    id:"copilot",
    number:"12",
    title:"Microsoft Security Copilot",
    area:"Manage and monitor security posture (20–25%)",
    summary:"Configure workspaces, permissions, plugins and agents for Microsoft Security Copilot.",
    beginner:"Security Copilot helps analysts and engineers work faster, but it still needs secure configuration and governance.",
    exam:"Know workspaces, permissions and roles, plugin management, Microsoft agents and Security Store agents.",
    engineer:"Think about who can use Copilot, what data it can access and how its extensions or agents are governed.",
    mentalModel:"Workspace → permissions → plugins / agents → governed productivity",
    diagram:["Analyst","Security Copilot Workspace","Plugins / Agents","Security Data"],
    concepts:[
      ["Workspaces","Provide the operating context for Security Copilot use."],
      ["Roles and permissions","Control who may access and administer the platform."],
      ["Plugins","Extend Copilot with additional actions or integrations and therefore need governance."],
      ["Agents","Automate or accelerate security tasks but must be monitored and permissioned correctly."]
    ],
    why:"Powerful security assistants can amplify both good and bad access decisions.",
    traps:[["Copilot workspace vs plugin","Workspace is the environment; plugin extends its capabilities."],["Permission to use vs permission to administer","Separate operational use from administrative control."],["Security Copilot vs general AI study","SC-500 cares about secure configuration and governance, not prompt creativity."]],
    flashcards:[["Security Copilot workspace","Configured environment where users interact with the Copilot service."],["Plugin governance","Review and control the capabilities extensions introduce."],["Security Store agent","Agent type that can be enabled and configured for Copilot workflows."]],
    quiz:{q:"Which task is directly related to securing Microsoft Security Copilot?",options:["Managing plugins and permissions","Creating NSG rules","Enabling JIT on VMs","Rotating SQL firewall rules"],answer:0,why:"Security Copilot security includes workspace configuration, roles and plugin governance."}
  }
];
