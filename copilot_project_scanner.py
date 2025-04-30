#!/usr/bin/env python3
"""
Project Structure Scanner for GitHub Copilot Sessions
Creates a JSON representation of your project structure to provide context to Copilot.
"""
# ...existing code from the script in your workflow doc...
import os
import json
import time
import datetime
import re
from pathlib import Path

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

MAX_FILE_PREVIEW_SIZE = 1000
MAX_FILE_SIZE_TO_READ = 100000
INCLUDE_FILE_CONTENT = True

def should_ignore(path):
    for pattern in IGNORE_PATTERNS:
        if re.search(pattern, path):
            return True
    return False

def scan_directory(root_dir='.', max_depth=None, current_depth=0):
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
                    item, max_depth, current_depth + 1
                )
            else:
                file_info = {"path": rel_path, "size": item.stat().st_size}
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
    metadata = {
        "timestamp": datetime.datetime.now().isoformat(),
        "structure": scan_directory('.', max_depth=4)
    }
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
    print("Scanning project structure...")
    start_time = time.time()
    project_data = create_project_metadata()
    with open('copilot_project_context.json', 'w', encoding='utf-8') as f:
        json.dump(project_data, f, indent=2)
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
