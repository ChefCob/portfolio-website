import type { DetailedProjectRecord } from "@/types/projectDetail";

export const agentSocDetailRecord: DetailedProjectRecord = {
  id: "proj-agent-soc",
  slug: "agent-soc",
  title: "Agent SOC",
  tagline: "Autonomous Incident Triage & LangGraph ReAct Orchestration",
  headline:
    "Autonomous Security Alert Investigation & Containment Engine via Local Zero-Exfiltration LLMs",
  summary:
    "Agentic cybersecurity prototype utilizing LangGraph cyclic state machines, local Ollama Llama-3.1 inference, and Pydantic-validated firewall containment tools to investigate security alerts without cloud data exfiltration.",
  category: "cybersecurity",
  maturity: "prototype",
  featured: false,
  orderPriority: 3,
  gradient: "from-[#1a2035] via-[#242b45] to-[#1a2035]",

  metrics: [
    {
      label: "Inference Engine",
      value: "Llama-3.1 8B",
      baseline: "Local Ollama (temperature=0)",
      evidenceRef: "ev-soc-engine",
    },
    {
      label: "Orchestration",
      value: "LangGraph ReAct",
      baseline: "Cyclic StateGraph state machine",
      evidenceRef: "ev-soc-engine",
    },
    {
      label: "Execution Privacy",
      value: "Zero Exfiltration",
      baseline: "100% Local GPU Inference (RTX 4070)",
      evidenceRef: "ev-soc-engine",
    },
    {
      label: "API Framework",
      value: "FastAPI Async",
      baseline: "REST endpoint on port 8000",
      evidenceRef: "ev-soc-engine",
    },
  ],

  problemStatement:
    "Security Operations Centers (SOCs) face alert fatigue from thousands of daily alerts, while sending proprietary corporate logs to public cloud AI APIs introduces severe data privacy and regulatory compliance liabilities.",

  solutionOverview:
    "Agent SOC implements a private, localized autonomous triage agent: raw security alerts are ingested via FastAPI, passed into a LangGraph cyclic state machine running on local hardware (Ollama), which autonomously investigates threat indicators and invokes programmatic firewall containment tools.",

  architecture: {
    summary:
      "Cyclic agentic execution loop combining FastAPI asynchronous ingestion, LangGraph MessagesState management, and local quantized LLM tool-calling.",
    components: [
      {
        name: "FastAPI Ingestion Gateway",
        description:
          "Asynchronous REST microservice receiving security alert text payloads on port 8000.",
        technologies: ["Python", "FastAPI", "Uvicorn", "Pydantic"],
      },
      {
        name: "LangGraph State Orchestrator",
        description:
          "Cyclic ReAct state graph managing message transitions between the AI investigator node and containment tool node.",
        technologies: ["Python", "LangGraph", "LangChain Core"],
      },
      {
        name: "Local LLM Inference Engine",
        description:
          "Private local model runtime running Llama-3.1 8B via Ollama on NVIDIA RTX 4070 (12 GB VRAM).",
        technologies: ["Ollama", "Llama-3.1:8B", "CUDA"],
      },
      {
        name: "Containment Tool Subsystem",
        description:
          "Pydantic-validated tool execution framework for automated firewall IP containment actions.",
        technologies: ["Python", "LangChain Tools", "Pydantic"],
      },
    ],
    deploymentModel: "edge_embedded",
  },

  technologies: [
    "Python 3.11",
    "FastAPI",
    "LangGraph",
    "LangChain",
    "Ollama",
    "Llama-3.1",
    "Pydantic",
    "Uvicorn",
  ],
  platforms: ["Linux / POSIX", "Windows (CUDA)", "Local Ollama"],

  capabilities: [
    {
      name: "LangGraph Stateful ReAct Agent Loop",
      description:
        "Compiles a cyclic StateGraph with dynamic conditional tool routing based on LLM output message inspect.",
      securityDomain: "Systems & Embedded Security",
      methodology: "Autonomous Incident Response",
    },
    {
      name: "Autonomous Firewall IP Containment",
      description:
        "Programmatic containment tool execution using Pydantic schema validation to isolate malicious IPs.",
      securityDomain: "Network & Wireless Security",
      methodology: "Incident Containment & Remediation",
    },
    {
      name: "Zero-Exfiltration Local LLM Inference",
      description:
        "Binds tool definitions to local Ollama ChatOllama model running at temperature 0 for deterministic investigation.",
      securityDomain: "Application & Cryptographic Security",
      methodology: "Secure AI Architecture",
    },
  ],

  capabilityClaims: [
    {
      id: "claim-soc-langgraph",
      name: "LangGraph Stateful ReAct Agent Loop",
      description:
        "Compiles StateGraph with conditional routing between investigator node and ToolNode.",
      status: "verified_implemented",
      sourceLocation: {
        module: "agent_soc.main",
        sourceFile: "main.py",
        keySymbols: ["StateGraph", "ai_investigator", "should_continue"],
      },
      primaryEvidenceRef: "ev-soc-engine",
      securityDomain: "Systems & Embedded Security",
      methodology: "Autonomous Incident Response",
    },
    {
      id: "claim-soc-containment",
      name: "Autonomous Firewall Tool Execution",
      description:
        "Executes validated firewall IP blocking using Pydantic BlockIPInput argument schemas.",
      status: "verified_implemented",
      sourceLocation: {
        module: "agent_soc.main",
        sourceFile: "main.py",
        keySymbols: ["block_ip", "BlockIPInput", "ToolNode"],
      },
      primaryEvidenceRef: "ev-soc-engine",
      securityDomain: "Network & Wireless Security",
      methodology: "Incident Containment & Remediation",
    },
    {
      id: "claim-soc-local-inference",
      name: "Zero-Exfiltration Local LLM Binding",
      description:
        "Binds tools to local Ollama Llama-3.1 8B instance at temperature=0.",
      status: "verified_implemented",
      sourceLocation: {
        module: "agent_soc.main",
        sourceFile: "main.py",
        keySymbols: ["ChatOllama", "llm.bind_tools"],
      },
      primaryEvidenceRef: "ev-soc-engine",
      securityDomain: "Application & Cryptographic Security",
      methodology: "Secure AI Architecture",
    },
  ],

  competencies: [
    "LangGraph StateGraph Architectures",
    "ReAct Agentic Tool-Calling Workflows",
    "Local LLM Inference (Ollama)",
    "Asynchronous API Design (FastAPI)",
    "Automated Incident Containment Patterns",
  ],

  evidence: [
    {
      id: "ev-soc-engine",
      type: "code_snippet",
      title: "Agentic SOC Engine & LangGraph State Machine (main.py)",
      description:
        "Complete FastAPI application and LangGraph cyclic state machine with Ollama tool binding.",
      filePath: "main.py",
      previewSnippet: `class BlockIPInput(BaseModel):
    ip_address: str = Field(description="The exact IP address to block")

@tool("block_ip", args_schema=BlockIPInput)
def block_ip(ip_address: str) -> str:
    print(f"\\n 🚨 API TRIGGERED: Executing Firewall Block for IP: {ip_address} 🚨\\n")
    return f"Success: IP {ip_address} has been blocked on the firewall."

tools = [block_ip]
llm = ChatOllama(model="llama3.1:8b", temperature=0).bind_tools(tools)

graph_builder = StateGraph(MessagesState)
graph_builder.add_node("investigator", ai_investigator)
graph_builder.add_node("tools", ToolNode(tools))
graph_builder.add_edge(START, "investigator")
graph_builder.add_conditional_edges("investigator", should_continue)
graph_builder.add_edge("tools", "investigator")
agent_app = graph_builder.compile()`,
      verificationStatus: "verified_implemented",
      verificationNotes:
        "Verified working LangGraph StateGraph compiled with ChatOllama and FastAPI endpoint.",
      verifiedDate: "2026-08-16",
    },
  ],

  knownLimitations: [
    "Execution is currently single-threaded per request without distributed task queues (Celery/Redis).",
    "Alert input accepts raw text strings without structured SIEM CEF/Syslog schema parsing.",
    "Currently implements a single block_ip containment tool without live Palo Alto / iptables API integration.",
  ],

  subsystems: [
    {
      name: "Agentic State Machine",
      tagline: "Cyclic ReAct Graph",
      description:
        "Compiles LangGraph StateGraph managing iterative tool calls and investigation synthesis.",
      technologies: ["Python", "LangGraph", "LangChain Core"],
      executionTier: "host_python",
      sourcePath: "main.py",
      responsibilities: [
        "MessagesState conversation history tracking",
        "Conditional routing between investigator and tool nodes",
        "Final synthesis generation upon conclusion",
      ],
    },
    {
      name: "Containment Subsystem",
      tagline: "Pydantic Tool Execution",
      description:
        "Validates tool arguments and executes automated firewall blocking actions.",
      technologies: ["Python", "Pydantic", "LangChain Tools"],
      executionTier: "host_python",
      sourcePath: "main.py",
      responsibilities: [
        "Type validation of target IP addresses",
        "Execution of containment tool actions",
        "Formatting of tool observation receipts",
      ],
    },
    {
      name: "FastAPI REST Service",
      tagline: "Alert Ingestion Gateway",
      description:
        "Exposes asynchronous endpoints for security analysts and SIEM webhooks.",
      technologies: ["Python", "FastAPI", "Uvicorn"],
      executionTier: "host_python",
      sourcePath: "main.py",
      responsibilities: [
        "Handling HTTP POST /investigate requests",
        "Orchestration of agent state initialization",
        "JSON report serialization",
      ],
    },
  ],

  governedLimitations: [
    {
      area: "Prompt Injection Defense",
      currentLimitation:
        "Alert input is populated directly into user message context without adversarial prompt sanitization.",
      mitigationOrRoadmap:
        "Implementation of input guardrail filters and secondary LLM verification gates.",
    },
    {
      area: "Firewall Whitelisting",
      currentLimitation:
        "block_ip tool lacks a critical infrastructure CIDR exclusion list (e.g. DNS, Gateway).",
      mitigationOrRoadmap:
        "Adding static exclusion checks for RFC 1918 gateways, DNS 1.1.1.1, and broadcast addresses.",
    },
    {
      area: "Tool Ecosystem Breadth",
      currentLimitation:
        "Agent is currently limited to firewall blocking and lacks active threat intelligence lookup tools.",
      mitigationOrRoadmap:
        "Adding VirusTotal, Shodan, Whois, and PCAP packet dissecting tools in Phase 3.",
    },
  ],

  engineeringDecisions: [
    {
      decision: "Local Ollama Llama-3.1 over Commercial Cloud APIs",
      rationale:
        "Prevents sensitive enterprise security incident telemetry from being exfiltrated to third-party cloud AI vendors.",
      tradeoff:
        "Requires local GPU hardware resources (min 8 GB VRAM) for model execution.",
    },
    {
      decision: "LangGraph StateGraph over ReAct Loop Chains",
      rationale:
        "Provides strict deterministic control over cyclic state transitions, recursion limits, and state history.",
      tradeoff:
        "Higher architectural setup complexity compared to simple linear chains.",
    },
    {
      decision: "Pydantic Args Schema Validation for Tools",
      rationale:
        "Ensures the LLM cannot pass malformed parameters to containment execution functions.",
      tradeoff:
        "Requires explicit schema modeling for every new tool.",
    },
  ],

  links: {
    documentation: "/projects/agent-soc",
  },

  targetRoles: [
    "SOC Analyst",
    "Detection Engineer",
    "AI Security Researcher",
    "Security Engineer",
  ],

  applicableServices: [
    "service-ai-redteaming",
    "service-custom-tooling",
  ],

  governance: {
    repoPath: "CareerOS/Projects/agent_soc",
    lastVerifiedDate: "2026-08-16",
    sourceOfTruth: "CareerOS Project Registry",
    humanApproved: true,
  },
};
