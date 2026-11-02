$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$python = $null
$pythonCandidates = @(
    (Join-Path $env:LOCALAPPDATA 'Programs\Python\Python313\python.exe'),
    (Join-Path $env:LOCALAPPDATA 'Programs\Python\Python312\python.exe'),
    (Join-Path $env:LOCALAPPDATA 'Programs\Python\Python311\python.exe')
)

foreach ($candidate in $pythonCandidates) {
    if (Test-Path -LiteralPath $candidate) {
        $python = $candidate
        break
    }
}

if (!$python) {
    throw 'Python 3.11, 3.12, or 3.13 is required.'
}

& $python -m venv .venv
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
& .\.venv\Scripts\python.exe -m pip install -r backend/requirements.txt
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
foreach ($part in @('backend', 'frontend')) {
    $destination = Join-Path $PSScriptRoot "$part/.env"
    if (!(Test-Path -LiteralPath $destination)) { Copy-Item -LiteralPath (Join-Path $PSScriptRoot "$part/.env.example") -Destination $destination }
}
Set-Location (Join-Path $PSScriptRoot 'frontend')
npm.cmd ci
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
