$ErrorActionPreference = "Continue"

$repos = @(
  "emilkowalski/skills",
  "ConardLi/garden-skills",
  "elayadesign/ai-design-skills",
  "MengTo/Skills",
  "jakubkrehel/skills",
  "codeswithroh/tastemaker",
  "Owl-Listener/designer-skills"
)

Write-Host "Installing web-design agent skills for this project..." -ForegroundColor Cyan
$failed = @()

foreach ($repo in $repos) {
  Write-Host ""
  Write-Host "→ $repo" -ForegroundColor Yellow
  & npx --yes skills@latest add $repo

  if ($LASTEXITCODE -ne 0) {
    Write-Host "  could not install automatically" -ForegroundColor Red
    $failed += $repo
  } else {
    Write-Host "  installed" -ForegroundColor Green
  }
}

Write-Host ""
if ($failed.Count -gt 0) {
  Write-Host "Some repositories need manual installation in your agent:" -ForegroundColor Yellow
  $failed | ForEach-Object { Write-Host "  - $_" }
  Write-Host ""
  Write-Host "For Claude Code, Owl-Listener/designer-skills also supports:"
  Write-Host "  /plugin marketplace add Owl-Listener/designer-skills"
  Write-Host ""
  Write-Host "See DESIGN_SKILLS.md for details."
} else {
  Write-Host "All requested design skill repositories were added successfully." -ForegroundColor Green
}
