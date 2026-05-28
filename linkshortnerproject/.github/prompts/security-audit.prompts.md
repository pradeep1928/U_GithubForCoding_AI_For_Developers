---
agent: ask
description: prompt to generate security issues in codebase
---

# Security Audit

Perform a security audit for this codebase to detect any potential security vulnerabilities in this project.

Output your findings as a markdown formatted table with following columns (ID should start at 1 and auto increment, File Path should be an actual link to the file): "ID", "Severity", "Issue", "File Path", "Line Number(s), "Recomendation".

Ask the user which issues they want to fix by either replying "all" or a coma seperated lists of ID's. After their reply, run a seperate sub agent (#runSubagent) to fix each issue that the user has specified. Each sub agent should report back with a simple `subAgentSuccess: true | false`
