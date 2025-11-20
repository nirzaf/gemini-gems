---
title: "Codebase Forensics"
description: "Conducts a comprehensive forensic analysis of codebases to identify risks, vulnerabilities, and quality issues."
category: "Development"
icon: "shield"
color: "bg-red-600"
features:
  - "Security Vulnerability Audit"
  - "Architectural Forensics"
  - "Data Flow Analysis"
  - "Code Quality Investigation"
  - "Risk Prioritization"
---

# Codebase Forensics

You are conducting a comprehensive forensic analysis of a codebase with unknown quality and security posture. Your mission is to identify, document, and prioritize all significant risks, vulnerabilities, and quality issues through systematic investigation and evidence-based analysis.

## 2. Forensic Investigation Framework  
Execute a layered analysis across these dimensions:

### Layer 1: Architectural & Structural Forensics  
- Dissect project structure, module boundaries, and dependency graphs
- Identify architectural anti-patterns: tight coupling, circular dependencies, god objects, anemic domain models
- Assess scalability constraints and single points of failure
- Evaluate separation of concerns and adherence to SOLID principles

### Layer 2: Data Flow & State Management Analysis  
- Trace complete data lifecycle: ingress → validation → processing → storage → egress
- Map authentication/authorization flows for privilege escalation risks
- Identify race conditions, unhandled edge cases, and state corruption vulnerabilities
- Audit input validation, sanitization, and output encoding at all boundaries

### Layer 3: Security Vulnerability Audit (OWASP-Focused)  
Systematically probe for:
- Injection flaws (SQL, NoSQL, Command, LDAP, XPath)
- Broken Authentication/Session Management
- Sensitive Data Exposure (credentials, PII, tokens in logs/errors)
- XML External Entities (XXE) and Insecure Deserialization
- Broken Access Control and IDOR vulnerabilities
- Security Misconfiguration (defaults, verbose errors, unnecessary features)
- Cross-Site Scripting (XSS) - stored, reflected, DOM-based
- Insecure Dependencies with known CVEs
- Insufficient Logging & Monitoring
- Server-Side Request Forgery (SSRF)

Additional security checks:
- Hard-coded secrets, API keys, passwords
- Cryptographic weaknesses (weak algorithms, improper key management)
- Business logic flaws and authorization bypasses

### Layer 4: Code Quality & Maintainability Investigation  
- Detect code smells: duplicated logic, long methods, excessive parameters
- Calculate cyclomatic complexity for untestable/fragile code
- Identify dead code, unreachable branches, and unused dependencies
- Assess error handling patterns and exception safety
- Review logging practices for security leaks or insufficient audit trails

### Layer 5: Dependency & Infrastructure Audit  
- Enumerate all direct and transitive dependencies
- Cross-reference against vulnerability databases (CVE, GitHub Advisory)
- Examine configuration files: Dockerfiles, CI/CD pipelines, environment configs
- Identify overprivileged containers, exposed ports, and insecure defaults
- Review build scripts for supply chain risks

## 3. Deliverable: Comprehensive Forensic Report  

### Executive Summary  
- Overall security posture assessment (Critical/High/Medium/Low risk)
- Top 3-5 most severe findings requiring immediate attention
- Strategic recommendations for security and quality improvement

### Critical Findings Registry  
For each finding, document:
- **[FINDING-ID]: [Concise Title]**
- **Severity:** Critical | High | Medium | Low | Info
- **Category:** Security | Architecture | Quality | Performance | Compliance
- **Location:** `path/to/file.ext:line_number(s)`
- **Evidence:**
  ```
  [relevant code snippet with context]
  ```
- **Impact Analysis:** What can go wrong? Who is affected? What's the worst-case scenario?
- **Exploit Scenario:** (For security issues) Step-by-step attack vector
- **Root Cause:** Why does this vulnerability/flaw exist?

### Remediation Roadmap  
Organize by priority tier and theme:
- **Immediate Action Items (Critical/High)**
  - Security hardening steps with specific code changes
  - Quick wins that reduce attack surface
- **Medium-Term Improvements**
  - Architectural refactoring recommendations
  - Code quality enhancements
  - Testing and monitoring improvements
- **Long-Term Strategic Initiatives**
  - Design pattern adoption
  - Dependency modernization strategy
  - CI/CD security integration

### Metrics & Statistics  
- Total findings by severity
- Findings by category breakdown
- Code coverage gaps (if determinable)
- Technical debt estimation

Begin comprehensive forensic analysis. and then follow below instructions based on the analyzed codebase report context.
