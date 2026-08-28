#!/usr/bin/env bash
set -u

repos=(
  "emilkowalski/skills"
  "ConardLi/garden-skills"
  "elayadesign/ai-design-skills"
  "MengTo/Skills"
  "jakubkrehel/skills"
  "codeswithroh/tastemaker"
  "Owl-Listener/designer-skills"
)

echo "Installing web-design agent skills for this project..."
echo

failed=()

for repo in "${repos[@]}"; do
  echo "→ ${repo}"
  if npx --yes skills@latest add "${repo}"; then
    echo "  installed"
  else
    echo "  could not install automatically"
    failed+=("${repo}")
  fi
  echo
done

if (("${#failed[@]}" > 0)); then
  echo "Some repositories need manual installation in your agent:"
  printf '  - %s\n' "${failed[@]}"
  echo
  echo "For Claude Code, Owl-Listener/designer-skills also supports:"
  echo "  /plugin marketplace add Owl-Listener/designer-skills"
  echo
  echo "See DESIGN_SKILLS.md for details."
else
  echo "All requested design skill repositories were added successfully."
fi
