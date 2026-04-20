"use client"

let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx || audioCtx.state === "closed") {
    audioCtx = new AudioContext()
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume()
  }
  return audioCtx
}

export function preloadCoinSound() {}

export function playSuccessSound() {
  if (typeof window === "undefined") return
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(440, now)
    gain.gain.setValueAtTime(0.1, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.25)
  } catch {}
}

export function playErrorSound() {
  if (typeof window === "undefined") return
  try {
    const ctx = getCtx()
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "square"
    osc.frequency.setValueAtTime(200, now)
    osc.frequency.linearRampToValueAtTime(150, now + 0.15)
    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.3)

    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = "square"
    osc2.frequency.setValueAtTime(160, now + 0.15)
    osc2.frequency.linearRampToValueAtTime(120, now + 0.35)
    gain2.gain.setValueAtTime(0.12, now + 0.15)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4)
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(now + 0.15)
    osc2.stop(now + 0.4)
  } catch {}
}

export function playSpinSound() {
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    const master = ctx.createGain()
    master.gain.setValueAtTime(0.17, now)
    master.connect(ctx.destination)

    const sweepDuration = 3.6
    const noiseSize = Math.floor(ctx.sampleRate * (sweepDuration + 0.3))
    const noiseBuffer = ctx.createBuffer(1, noiseSize, ctx.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < noiseSize; i++) {
      const progress = i / noiseSize
      const fade = (1 - progress) * 0.6
      noiseData[i] = (Math.random() * 2 - 1) * fade
    }

    const bed = ctx.createBufferSource()
    bed.buffer = noiseBuffer
    const bedBand = ctx.createBiquadFilter()
    bedBand.type = "bandpass"
    bedBand.frequency.setValueAtTime(600, now)
    bedBand.frequency.exponentialRampToValueAtTime(220, now + sweepDuration)
    bedBand.Q.setValueAtTime(0.8, now)
    const bedGain = ctx.createGain()
    bedGain.gain.setValueAtTime(0.0001, now)
    bedGain.gain.exponentialRampToValueAtTime(0.018, now + 0.12)
    bedGain.gain.exponentialRampToValueAtTime(0.001, now + sweepDuration)
    bed.connect(bedBand)
    bedBand.connect(bedGain)
    bedGain.connect(master)
    bed.start(now)
    bed.stop(now + sweepDuration + 0.1)

    const addTick = (t: number, progress: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "square"
      osc.frequency.setValueAtTime(2100 - progress * 950, t)
      osc.frequency.exponentialRampToValueAtTime(900 - progress * 260, t + 0.015)
      const level = 0.11 + (1 - progress) * 0.05
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(level, t + 0.002)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.028)
      osc.connect(gain)
      gain.connect(master)
      osc.start(t)
      osc.stop(t + 0.03)
    }

    let time = 0
    while (time < sweepDuration) {
      const progress = time / sweepDuration
      const t = now + time
      const interval = 0.03 + progress * progress * 0.2
      addTick(t, progress)
      time += interval
    }

    const endTime = now + sweepDuration + 0.06
    const notes = [1175, 1480, 1760]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, endTime)
      gain.gain.setValueAtTime(0.0001, endTime)
      gain.gain.exponentialRampToValueAtTime(0.15 / (i + 1), endTime + 0.012)
      gain.gain.exponentialRampToValueAtTime(0.001, endTime + 0.7)
      osc.connect(gain)
      gain.connect(master)
      osc.start(endTime)
      osc.stop(endTime + 0.72)
    })

    const thump = ctx.createOscillator()
    const thumpGain = ctx.createGain()
    thump.type = "triangle"
    thump.frequency.setValueAtTime(180, endTime)
    thump.frequency.exponentialRampToValueAtTime(70, endTime + 0.11)
    thumpGain.gain.setValueAtTime(0.0001, endTime)
    thumpGain.gain.exponentialRampToValueAtTime(0.08, endTime + 0.01)
    thumpGain.gain.exponentialRampToValueAtTime(0.001, endTime + 0.14)
    thump.connect(thumpGain)
    thumpGain.connect(master)
    thump.start(endTime)
    thump.stop(endTime + 0.16)
  } catch {}
}
