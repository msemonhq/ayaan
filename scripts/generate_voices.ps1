Add-Type -AssemblyName System.Speech

$voicesDir = "www\assets\audio\voices"
if (-not (Test-Path $voicesDir)) {
    New-Item -ItemType Directory -Path $voicesDir -Force | Out-Null
}

$clips = @(
    @{ Name = "vo_ready_ayaan.wav"; Text = "Get ready, Astronaut Ayaan!" },
    @{ Name = "vo_listen_melody.wav"; Text = "Listen carefully to the melody!" },
    @{ Name = "vo_your_turn.wav"; Text = "Your turn! Tap the stars!" },
    @{ Name = "vo_almost_there.wav"; Text = "Almost there! Let's listen together again!" },
    @{ Name = "vo_orbit_complete.wav"; Text = "Super job, Ayaan! Orbit Complete!" },
    @{ Name = "vo_star_rush_start.wav"; Text = "Star Rush! Pop as many stars as you can!" },
    @{ Name = "vo_badge_unlocked.wav"; Text = "Wow! You unlocked a new Space Trophy!" }
)

$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

# Pick enthusiastic friendly voice
$installed = $synth.GetInstalledVoices()
$zira = $installed | Where-Object { $_.VoiceInfo.Name -like "*Zira*" }
if ($zira) {
    $synth.SelectVoice($zira.VoiceInfo.Name)
}
$synth.Rate = 1 # Slightly brisk, cheerful speed
$synth.Volume = 100

foreach ($clip in $clips) {
    $outPath = Join-Path $voicesDir $clip.Name
    $synth.SetOutputToWaveFile($outPath)
    $synth.Speak($clip.Text)
    $synth.SetOutputToNull()
    Write-Host "Generated: $outPath ($($clip.Text))"
}

$synth.Dispose()
Write-Host "All voice clips successfully generated!"
