window.SC500_TRACKS_1 = [
{
    id:"entra",
    number:"01",
    title:"Microsoft Entra security",
    area:"Manage identity, access, and governance (20–25%)",
    summary:"Identity-first security: authentication, Conditional Access, PIM, application identity and managed identities.",
    beginner:"Start here because identity is the front door to everything else. Learn the path from user/workload identity to authentication and finally authorization.",
    exam:"Know when to use Conditional Access, PIM, MFA, passwordless methods, enterprise applications, app registrations and managed identities.",
    engineer:"Focus on risky sign-ins, legacy auth, privilege minimization, break-glass design, service principal secrets and exclusion hygiene.",
    mentalModel:"Identity → Authentication → Authorization → Monitoring",
    diagram:["User / Workload","Microsoft Entra ID","Conditional Access","Allow / MFA / Block"],
    concepts:[
      ["Conditional Access","Policy engine that evaluates user, device, app and risk context before deciding whether access is allowed or blocked."],
      ["Privileged Identity Management","Removes standing privilege by making privileged roles eligible and activatable just in time."],
      ["Managed identity","Lets an Azure resource get an Entra token without storing secrets in code or configuration."],
      ["OAuth grants and consent","Controls whether apps can access data and APIs on behalf of users or themselves."]
    ],
    why:"Most compromises become much worse when identity is weak. Strong identity controls reduce blast radius early.",
    traps:[["RBAC vs PIM","RBAC is what access exists; PIM is when privileged access becomes active."],["Conditional Access vs RBAC","Conditional Access controls sign-in conditions; RBAC controls resource permissions."],["Enterprise app vs app registration","Registration defines an app identity; enterprise app is the service principal in the tenant."]],
    flashcards:[["Conditional Access","If/then access policy using context such as user, device, location or sign-in risk."],["PIM","Just-in-time privileged role activation with approval, MFA and time limits."],["Managed identity","Azure-managed identity for workloads so they can obtain tokens without stored credentials."]],
    quiz:{q:"An Azure App Service must retrieve secrets from Key Vault without storing credentials. Which control should you use?",options:["Conditional Access","Managed identity","Network Security Group","Azure Policy"],answer:1,why:"Managed identity lets the workload obtain an Entra token securely without storing a password or client secret."}
  },
{
    id:"keyvault",
    number:"02",
    title:"Azure Key Vault",
    area:"Manage identity, access, and governance (20–25%)",
    summary:"Secure secrets, certificates and keys with access control, networking restrictions and monitoring.",
    beginner:"Treat Key Vault as the protected locker for secrets, keys and certificates used across workloads.",
    exam:"Know how to deploy Key Vault, configure access, firewall settings, secret management, Defender for Key Vault and secret scanning via Defender CSPM.",
    engineer:"Focus on network isolation, RBAC vs access policies, purge protection, soft-delete and secret hygiene across CI/CD pipelines.",
    mentalModel:"Workload identity → Key Vault access control → Secret / Key / Certificate",
    diagram:["App / VM","Managed Identity","Azure Key Vault","Secret / Key / Cert"],
    concepts:[
      ["Secrets, keys, certificates","Secrets store values, keys support cryptographic operations and certificates combine public/private key material with metadata."],
      ["Access control","Prefer least privilege. Understand RBAC-based access and the impact of legacy access policy models."],
      ["Network protection","Use firewall rules and private endpoints to limit who can reach the vault."],
      ["Resilience","Soft delete and purge protection help prevent destructive deletion of critical cryptographic material."]
    ],
    why:"Secrets sprawl is a common weakness. Key Vault centralizes and protects sensitive material.",
    traps:[["Secret vs key","Secrets are values; keys are cryptographic objects used by services."],["RBAC vs access policy","Both can grant vault access, but RBAC is the strategic direction to unify authorization."],["Firewall vs permission","Network access decides reachability; permissions decide actions after access."]],
    flashcards:[["Purge protection","Prevents permanent deletion of Key Vault items before the retention period ends."],["Private endpoint","Brings Key Vault access onto private networking rather than public exposure."],["Defender for Key Vault","Monitors for suspicious use and attacks against the vault."]],
    quiz:{q:"A security engineer wants to prevent permanent deletion of keys even if a vault admin makes a mistake. Which feature helps most?",options:["Purge protection","Soft delete disablement","Azure Bastion","NSG"],answer:0,why:"Purge protection prevents immediate permanent deletion and is essential for high-value cryptographic assets."}
  },
{
    id:"governance",
    number:"03",
    title:"Governance, RBAC and compliance",
    area:"Manage identity, access, and governance (20–25%)",
    summary:"Use Azure Policy, resource locks, RBAC, custom roles and Defender for Cloud compliance views to enforce governance.",
    beginner:"Governance keeps security controls consistent. It answers: what is allowed, what is blocked and how do we stay compliant?",
    exam:"Study built-in/custom policies, role assignment hygiene, custom roles, resource locks, backup protection and infrastructure as code security controls.",
    engineer:"Pay attention to overprivileged role assignments, policy exemptions, management-group inheritance and preventing accidental changes.",
    mentalModel:"Policy defines guardrails → RBAC defines allowed actions → Compliance tools measure drift",
    diagram:["Management Group","Azure Policy","Subscriptions / Resources","Compliant or Noncompliant"],
    concepts:[
      ["Azure Policy","Evaluates resources against rules and can audit, deny or modify deployments."],
      ["Azure RBAC","Determines which Azure actions an identity can perform at a scope."],
      ["Custom roles","Useful when built-in roles are too broad and least privilege requires tighter permissions."],
      ["Resource locks","Protect critical resources from accidental deletion or modification."]
    ],
    why:"Good governance reduces configuration drift and standardizes security at scale.",
    traps:[["Azure Policy vs Defender for Cloud","Policy enforces governance; Defender for Cloud highlights posture and recommendations."],["Audit vs deny effect","Audit observes noncompliance; deny blocks creation or updates."],["Built-in role vs custom role","Built-in is quick; custom role is more precise for least privilege."]],
    flashcards:[["Deny policy","Blocks noncompliant deployments before they are created or changed."],["Resource lock","Protects from accidental delete or modification events."],["Role scope","Permissions can be assigned at management group, subscription, resource group or resource level."]],
    quiz:{q:"A company wants to stop public IP addresses from being created in a production subscription. Which control fits best?",options:["NSG","Azure Policy with deny effect","PIM","Sentinel"],answer:1,why:"A deny policy stops the deployment of resources that violate the rule, making it ideal for preventive governance."}
  }
];
