# GitHub Copilot Session Management System

## Overview
This document provides a complete system for maintaining consistency across GitHub Copilot edit sessions. It includes tools for project scanning, style guides, session tracking, and usage instructions.

Current Date: 2025-04-27
Username: tomzinchoi

## Table of Contents
1. [Project Scanner Script](#1-project-scanner-script)
2. [Style Guide Template](#2-style-guide-template)
3. [Session Tracker Template](#3-session-tracker-template)
4. [Usage Instructions](#4-usage-instructions)
5. [Session Starter Template](#5-session-starter-template)
6. [Automation Capabilities](#6-automation-capabilities)

## 1. Project Scanner Script

```python
#!/usr/bin/env python3
"""
Project Structure Scanner for GitHub Copilot Sessions
Creates a JSON representation of your project structure to provide context to Copilot.
"""

import os
import json
import time
import datetime
import re
from pathlib import Path

# Configuration - customize these values
IGNORE_PATTERNS = [
    r'\.git',
    r'node_modules',
    r'__pycache__',
    r'\.env',
    r'\.vscode',
    r'\.idea',
    r'venv',
    r'dist',
    r'build',
    r'\.DS_Store'
]

MAX_FILE_PREVIEW_SIZE = 1000  # Characters to include in file previews
MAX_FILE_SIZE_TO_READ = 100000  # Skip files larger than this (bytes)
INCLUDE_FILE_CONTENT = True  # Set to False for structure-only scanning

def should_ignore(path):
    """Check if a path should be ignored based on patterns."""
    for pattern in IGNORE_PATTERNS:
        if re.search(pattern, path):
            return True
    return False

def scan_directory(root_dir='.', max_depth=None, current_depth=0):
    """Recursively scan directory and return structure as dict."""
    if max_depth is not None and current_depth > max_depth:
        return "MAX_DEPTH_REACHED"
    
    result = {}
    root_path = Path(root_dir)
    
    try:
        for item in sorted(root_path.iterdir()):
            rel_path = str(item.relative_to(Path('.')))
            
            if should_ignore(rel_path):
                continue
                
            if item.is_dir():
                result[item.name] = scan_directory(
                    item, 
                    max_depth, 
                    current_depth + 1
                )
            else:
                file_info = {"path": rel_path, "size": item.stat().st_size}
                
                # Add file preview for smaller files if enabled
                if INCLUDE_FILE_CONTENT and item.stat().st_size <= MAX_FILE_SIZE_TO_READ:
                    try:
                        with open(item, 'r', encoding='utf-8') as f:
                            content = f.read(MAX_FILE_PREVIEW_SIZE)
                            if len(content) >= MAX_FILE_PREVIEW_SIZE:
                                content += "... [truncated]"
                            file_info["preview"] = content
                    except (UnicodeDecodeError, PermissionError, IOError):
                        file_info["preview"] = "[binary or unreadable file]"
                
                result[item.name] = file_info
    except PermissionError:
        return "[PERMISSION_DENIED]"
    
    return result

def create_project_metadata():
    """Generate complete project metadata including git info if available."""
    metadata = {
        "timestamp": datetime.datetime.now().isoformat(),
        "structure": scan_directory('.', max_depth=4)
    }
    
    # Try to get git information if available
    try:
        import subprocess
        git_branch = subprocess.check_output(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"], 
            stderr=subprocess.DEVNULL
        ).decode().strip()
        
        recent_commits = subprocess.check_output(
            ["git", "log", "--pretty=format:%h - %s (%cr)", "--max-count=5"], 
            stderr=subprocess.DEVNULL
        ).decode().strip()
        
        metadata["git"] = {
            "branch": git_branch,
            "recent_commits": recent_commits.split('\n') if recent_commits else []
        }
    except (subprocess.SubprocessError, FileNotFoundError):
        metadata["git"] = "Git information not available"
        
    return metadata

def main():
    """Main function to scan project and write metadata."""
    print("Scanning project structure...")
    start_time = time.time()
    
    project_data = create_project_metadata()
    
    with open('copilot_project_context.json', 'w', encoding='utf-8') as f:
        json.dump(project_data, f, indent=2)
    
    # Create a markdown summary for Copilot
    with open('copilot_session_context.md', 'w', encoding='utf-8') as f:
        f.write("# Project Context for GitHub Copilot\n\n")
        f.write(f"Generated: {project_data['timestamp']}\n\n")
        
        if "git" in project_data and isinstance(project_data["git"], dict):
            f.write("## Git Information\n\n")
            f.write(f"Branch: `{project_data['git']['branch']}`\n\n")
            
            if project_data["git"]["recent_commits"]:
                f.write("Recent commits:\n\n")
                for commit in project_data["git"]["recent_commits"]:
                    f.write(f"- {commit}\n")
                f.write("\n")
        
        f.write("## Project Structure\n\n")
        f.write("```\n")
        f.write(json.dumps(project_data["structure"], indent=2)[:2000])
        f.write("\n... [truncated for readability]\n```\n\n")
        
        f.write("## Usage Instructions\n\n")
        f.write("1. Start each Copilot session by sharing this context\n")
        f.write("2. Refer to existing file structures before making changes\n")
        f.write("3. Document completed and pending tasks in each session\n")
    
    elapsed_time = time.time() - start_time
    print(f"Scan complete! Files created in {elapsed_time:.2f} seconds:")
    print("- copilot_project_context.json (Full project data)")
    print("- copilot_session_context.md (Formatted context for Copilot)")

if __name__ == "__main__":
    main()
```

## 2. Style Guide Template

```JSON
{
  "meta": {
    "projectName": "YourProjectName",
    "version": "1.0",
    "lastUpdated": "2025-04-27"
  },
  "codeStyle": {
    "general": {
      "indentation": "2 spaces",
      "lineLength": 80,
      "trailingCommas": "es5",
      "semicolons": true
    },
    "naming": {
      "variables": "camelCase",
      "constants": "UPPER_SNAKE_CASE",
      "functions": "camelCase",
      "classes": "PascalCase",
      "components": "PascalCase",
      "files": "kebab-case.js",
      "privateMembers": "_prefixedCamelCase"
    },
    "commenting": {
      "functionDoc": "JSDoc style",
      "classDoc": "Include purpose, usage example",
      "inlineComments": "Explain why, not what"
    }
  },
  "architecture": {
    "pattern": "Your primary architectural pattern (MVC, etc.)",
    "dataFlow": "How data flows through the application",
    "stateManagement": "How state is managed in the application",
    "directoryStructure": {
      "src/": "Source code files",
      "components/": "Reusable UI components",
      "utils/": "Helper functions and utilities",
      "hooks/": "Custom React hooks",
      "api/": "API interaction layer",
      "assets/": "Static resources"
    }
  },
  "bestPractices": [
    "Prefer functional components over class components",
    "Use destructuring for props",
    "Centralize API calls",
    "Use TypeScript interfaces for complex objects",
    "Keep components small and focused",
    "Separate business logic from presentation"
  ]
}
```

## 3. Session Tracker Template

# GitHub Copilot Session Tracker

## Session Information
- Date: 2025-04-27
- Session #: 1
- Developer: tomzinchoi

## Project Context
- Project structure is available in `copilot_project_context.json`
- Style guide is available in `copilot_style_guide.json`

## Previous Session Summary
*First session / Previous session completed the following:*
- Item 1
- Item 2

## Current Session Goals
- Goal 1
- Goal 2

## Work In Progress
- [ ] Task 1
- [ ] Task 2

## Completed In This Session
- [ ] Task 1
- [ ] Task 2

## Notes For Next Session
- Note future considerations here

## Token Management
- For long code generations, generate in logical chunks
- Signal with "// CONTINUED IN NEXT RESPONSE" before reaching token limits
- Confirm essential functionality is completed before moving to new features

## 4. Usage Instructions
Initial Setup
Install the scanner script

Save the script section to copilot_project_scanner.py in your project root
Make it executable: chmod +x copilot_project_scanner.py (Unix systems)
Run: python copilot_project_scanner.py to generate initial project metadata
Customize the style guide

Save the style guide section to copilot_style_guide.json
Update it to match your project's coding standards
Set up session tracker

Save the session tracker template for use with each new session
Workflow for Each Copilot Session
Before starting a session:

Run the scanner script to update project context
Create a new session tracker document
Update session details (date, number, goals)
Starting a Copilot session:

Use the session starter template (Section 5 below)
Include relevant parts of your project structure
Specify your immediate goals
During the session:

For each file modification, share current content first
Update the session tracker as you progress
For complex tasks, instruct Copilot to break them into manageable chunks
Ending a session:

Summarize completed work
Document pending tasks
Save the session tracker for reference in the next session
Code Generation Best Practices
Maintain consistency:

Always refer to the style guide
Share existing related code as examples
Prevent token limits:

Generate code in logical chunks
Use "// CONTINUED IN NEXT RESPONSE" signal
Prioritize critical functionality first
Avoid conflicts:

Always show current file content before modifying
Explain desired changes clearly
Review generated code against existing functionality

## 5. Session Starter Template

Copy and paste this template at the beginning of each Copilot session:

Code
# GitHub Copilot Session Starter

## Project Context

Hello GitHub Copilot, I'm working on a development project and need your assistance.

Current date: 2025-04-27
Username: tomzinchoi

### Project Structure
```json
[PASTE RELEVANT PROJECT STRUCTURE HERE]
```

Style Guide

```JSON
[PASTE STYLE GUIDE HERE]
```
Previous Session Summary
[PASTE FROM PREVIOUS SESSION TRACKER]

Current Session Goals
[SPECIFIC GOAL]
[SPECIFIC GOAL]
Instructions
Please maintain consistency with existing code style
Don't modify existing functionality unless explicitly asked
For long generations, pause at logical breakpoints
Document your code as you write it
If you're uncertain about implementation details, please ask
Let's start by [SPECIFIC STARTING TASK].

Code

## 6. Automation Capabilities

### What This System Can Automate

This workflow can significantly improve consistency and efficiency when working with GitHub Copilot, but it's important to understand its capabilities and limitations:

#### Strengths:
- **Context Preservation**: Maintains project context across edit sessions
- **Style Consistency**: Helps ensure consistent coding style
- **Conflict Prevention**: Reduces the risk of duplicated or conflicting code
- **Workflow Organization**: Tracks progress and pending tasks systematically
- **Token Management**: Helps manage long code generations effectively

#### Limitations:
- **Not Fully Autonomous**: This system improves Copilot's effectiveness but doesn't make it fully autonomous
- **Requires Human Direction**: You still need to provide high-level direction and validation
- **Quality Control Needed**: Generated code should still be reviewed for correctness and edge cases
- **Complex Architecture**: Copilot may struggle with very complex architectural decisions without guidance

### Best Practices for Maximum Automation

1. **Define Clear Boundaries**: Split work into well-defined, modular tasks
2. **Provide Thorough Context**: The more context you provide, the better Copilot performs
3. **Establish Patterns**: Show Copilot one implementation, then ask for similar patterns elsewhere
4. **Iterative Approach**: Build incrementally, validating each component
5. **Testing Strategy**: Ask Copilot to include tests for better reliability

### Workflow Automation Tips

1. **Batch Similar Tasks**: Group similar modifications for better consistency
2. **Use Reference Points**: Link to existing files as examples for new components
3. **Maintain Documentation**: Keep project docs updated to improve context
4. **Save Common Prompts**: Build a library of effective prompts for recurring tasks
5. **Leverage Git**: Use version control to track changes and revert if needed

---

By following this system, you can maximize GitHub Copilot's effectiveness while maintaining code quality and consistency across development sessions. While not fully autonomous, this approach significantly reduces development time and cognitive load for many programming tasks.

---

## Recommended Project File Structure

```
/workspaces/noadsday/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       └── icons/
├── src/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   ├── components/
│   │   └── (future component files)
│   └── data/
│       └── (json/chart/sample data)
├── copilot_project_scanner.py
├── copilot_style_guide.json
├── copilot_session_context.md
├── copilot_project_context.json
├── .gitignore
└── README.md
```

- `public/`: Static files served directly (HTML, favicon, images, etc.)
- `src/`: Source code (CSS, JS, components, data)
- `copilot_project_scanner.py`: Project structure/context generator
- `copilot_style_guide.json`: Coding style guide
- `copilot_session_context.md`: Copilot session context (auto-generated)
- `copilot_project_context.json`: Project structure (auto-generated)
- `.gitignore`: Ignore unnecessary files in git
- `README.md`: Project overview