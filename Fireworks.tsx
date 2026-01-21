import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  decay: number;
  size: number;
  trail: boolean;
  gravity: number;
  friction: number;
  flicker?: boolean;
  strobe?: boolean;
  sparkle?: boolean;
  isGlitter?: boolean;
}

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const flashOpacity = useRef(0);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 44100 });
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSound = (type: 'launch' | 'boom' | 'crackle' | 'mega', volume: number = 0.5) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (type === 'launch') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'boom' || type === 'mega') {
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(type === 'mega' ? 30 : 50, ctx.currentTime);
      sub.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.0);
      subGain.gain.setValueAtTime(type === 'mega' ? 1.2 : 0.6, ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
      sub.connect(subGain);
      subGain.connect(masterGain);
      sub.start();
      sub.stop(ctx.currentTime + 2.0);

      const punch = ctx.createOscillator();
      const punchGain = ctx.createGain();
      punch.type = 'triangle';
      punch.frequency.setValueAtTime(220, ctx.currentTime);
      punch.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.3);
      punchGain.gain.setValueAtTime(0.5, ctx.currentTime);
      punchGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      punch.connect(punchGain);
      punchGain.connect(masterGain);
      punch.start();
      punch.stop(ctx.currentTime + 0.3);

      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1200, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1, ctx.currentTime);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noise.start();
    } else if (type === 'crackle') {
      for (let i = 0; i < 5; i++) {
        const timeOffset = i * 0.05;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < buffer.length; j++) data[j] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.1, ctx.currentTime + timeOffset);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.05);
        noise.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start(ctx.currentTime + timeOffset);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = [
      '#ff0040', '#00ff40', '#0040ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', 
      '#ff8000', '#ff0080', '#80ff00', '#ff4d00', '#ffd700', '#00ff7f', '#e0e', '#0ee', '#f87171', '#60a5fa'
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const addParticle = (params: Partial<Particle>) => {
      particles.push({
        x: 0, y: 0, vx: 0, vy: 0, alpha: 1, color: '#fff', 
        decay: 0.015, size: 2, trail: false, gravity: 0.08, friction: 0.98,
        ...params
      });
    };

    const createFirework = (x: number, y: number, isMega: boolean = false) => {
      initAudio();
      const type = isMega ? 'mega' : (Math.random() < 0.3 ? 'mega' : 'boom');
      const patternType = Math.floor(Math.random() * 8); 
      const color = colors[Math.floor(Math.random() * colors.length)];
      const accentColor = colors[Math.floor(Math.random() * colors.length)];
      
      playSound(type, isMega ? 1.0 : 0.7);

      if (type === 'mega') {
        flashOpacity.current = 0.45;
      }

      const particleCount = isMega ? 700 : 200;

      switch (patternType) {
        case 0:
          for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * (isMega ? 28 : 18)) + 0.5;
            addParticle({
              x, y, color: i % 10 === 0 ? '#ffffff' : color,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: (i < particleCount * 0.1) ? 5 : 2.5,
              decay: 0.005,
              trail: true,
              friction: 0.96,
              strobe: Math.random() > 0.95
            });
          }
          break;
        
        case 1:
          for (let i = 0; i < particleCount; i++) {
            const angle = (Math.random() * Math.PI * 1.5) - (Math.PI * 0.75);
            const speed = Math.random() * 16 + 4;
            addParticle({
              x, y, color: '#ffd700', 
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              gravity: 0.045,
              friction: 0.99,
              decay: 0.003,
              trail: true,
              size: 2,
              flicker: true
            });
          }
          setTimeout(() => playSound('crackle', 0.5), 800);
          setTimeout(() => playSound('crackle', 0.5), 1100);
          break;

        case 2:
          for (let i = 0; i < particleCount / 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 10 + 2;
            addParticle({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, color, size: 3, decay: 0.012 });
          }
          const ringAngle = Math.random() * Math.PI;
          for (let i = 0; i < particleCount / 2; i++) {
            const angle = (i / (particleCount / 2)) * Math.PI * 2;
            const speed = isMega ? 20 : 14;
            const rx = Math.cos(angle) * speed;
            const ry = Math.sin(angle) * (speed * 0.2); 
            const rotX = rx * Math.cos(ringAngle) - ry * Math.sin(ringAngle);
            const rotY = rx * Math.sin(ringAngle) + ry * Math.cos(ringAngle);
            addParticle({ x, y, vx: rotX, vy: rotY, color: '#ffffff', size: 3, decay: 0.008, strobe: true });
          }
          break;

        case 3:
          for (let i = 0; i < 5; i++) {
            setTimeout(() => {
              const ox = x + (Math.random() - 0.5) * 120;
              const oy = y + (Math.random() - 0.5) * 120;
              playSound('boom', 0.4);
              for (let j = 0; j < 60; j++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 12 + 2;
                addParticle({ x: ox, y: oy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, color: accentColor, size: 2, decay: 0.018, trail: true });
              }
            }, i * 160);
          }
          break;

        case 4:
          const spikes = isMega ? 16 : 10;
          for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const innerAngle = angle % (Math.PI * 2 / spikes);
            const power = 1 - Math.abs(innerAngle - (Math.PI / spikes)) / (Math.PI / spikes);
            const r = power * (isMega ? 30 : 20) + 2;
            addParticle({
              x, y, vx: Math.cos(angle) * r, vy: Math.sin(angle) * r, 
              color, size: 3.5, decay: 0.01, friction: 0.95, trail: true
            });
          }
          break;

        case 5:
          for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (isMega ? 24 : 14);
            addParticle({
              x, y, 
              vx: Math.cos(angle) * speed, 
              vy: Math.sin(angle) * speed, 
              color: i % 2 === 0 ? color : '#ffffff', 
              size: 2, decay: 0.007, trail: true, friction: 0.98,
              sparkle: true
            });
          }
          break;
          
        case 6:
          for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * (isMega ? 25 : 15) + 2;
            addParticle({ 
              x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, 
              color: Math.random() > 0.5 ? color : accentColor, 
              size: 4, decay: 0.009, strobe: true, trail: false 
            });
          }
          break;

        case 7:
          const shockCount = isMega ? 500 : 250;
          const shockSpeed = isMega ? 18 : 12;
          for (let i = 0; i < shockCount; i++) {
            const angle = (i / shockCount) * Math.PI * 2;
            addParticle({ 
              x, y, vx: Math.cos(angle) * shockSpeed, vy: Math.sin(angle) * shockSpeed, 
              color: '#ffffff', size: 4.5, decay: 0.016, friction: 0.93, strobe: i % 2 === 0, trail: true
            });
          }
          break;
      }
    };

    const update = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (flashOpacity.current > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity.current})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        flashOpacity.current -= 0.025;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.globalAlpha = p.alpha;
          
          if ((p.strobe && Math.random() > 0.5) || (p.flicker && Math.random() > 0.75)) {
            ctx.globalAlpha = 0.15;
          }
          
          ctx.shadowBlur = p.isGlitter ? 2 : 10;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.shadowBlur = 0;

          if (p.trail && Math.random() > 0.4 && !p.isGlitter) {
            addParticle({
              x: p.x,
              y: p.y,
              vx: (Math.random() - 0.5) * 0.5,
              vy: (Math.random() - 0.5) * 0.5,
              color: Math.random() > 0.8 ? '#ffffff' : p.color,
              size: Math.random() * 1.5,
              decay: 0.03 + Math.random() * 0.05,
              alpha: p.alpha * 0.7,
              gravity: 0.02,
              friction: 0.95,
              flicker: true,
              isGlitter: true
            });
          }

          if (p.sparkle && Math.random() > 0.9) {
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x + (Math.random() - 0.5) * 15, p.y + (Math.random() - 0.5) * 15, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;

      if (Math.random() < 0.045) {
        const startX = 50 + Math.random() * (canvas.width - 100);
        const startY = canvas.height;
        const targetY = 50 + Math.random() * (canvas.height * 0.5);
        
        playSound('launch', 0.3);
        
        let currentY = startY;
        let velX = (Math.random() - 0.5) * 4;
        const launchInterval = setInterval(() => {
          currentY -= 28;
          addParticle({ 
            x: startX + (startY - currentY) * 0.04 * velX, 
            y: currentY, 
            vx: velX, 
            vy: 6, 
            color: '#ffdd88', 
            size: 3.5, 
            decay: 0.1, 
            gravity: 0, 
            flicker: true,
            trail: true 
          });
          
          if (currentY <= targetY) {
            clearInterval(launchInterval);
            createFirework(startX + (startY - currentY) * 0.04 * velX, targetY, Math.random() > 0.75);
          }
        }, 16);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener('resize', resize);
    resize();
    update();

    setTimeout(() => {
        createFirework(canvas.width / 2, canvas.height / 3, true);
        setTimeout(() => createFirework(canvas.width * 0.2, canvas.height * 0.4), 400);
        setTimeout(() => createFirework(canvas.width * 0.8, canvas.height * 0.4), 800);
    }, 500);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default Fireworks;