'use client';
// src/lib/perlin-noise.ts
// Classic 3D Perlin noise implementation
class PerlinNoise {
    private permutation: number[];
    
    constructor(seed: number = Math.random() * 256) {
      this.permutation = new Array(512);
      const p = new Array(256);
      
      for (let i = 0; i < 256; i++) {
        p[i] = i;
      }
      
      // Shuffle array using seed
      for (let i = 255; i > 0; i--) {
        const j = Math.floor(this.fract(Math.sin(seed + i) * 43758.5453123) * (i + 1));
        [p[i], p[j]] = [p[j], p[i]];
      }
      
      for (let i = 0; i < 512; i++) {
        this.permutation[i] = p[i & 255];
      }
    }
    
    private fract(x: number): number {
      return x - Math.floor(x);
    }
    
    private fade(t: number): number {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
    
    private lerp(t: number, a: number, b: number): number {
      return a + t * (b - a);
    }
    
    private grad(hash: number, x: number, y: number, z: number): number {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    
    noise(x: number, y: number, z: number): number {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;
      
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
      
      const u = this.fade(x);
      const v = this.fade(y);
      const w = this.fade(z);
      
      const A = this.permutation[X] + Y;
      const AA = this.permutation[A] + Z;
      const AB = this.permutation[A + 1] + Z;
      const B = this.permutation[X + 1] + Y;
      const BA = this.permutation[B] + Z;
      const BB = this.permutation[B + 1] + Z;
      
      return this.lerp(
        w,
        this.lerp(
          v,
          this.lerp(u, this.grad(this.permutation[AA], x, y, z), this.grad(this.permutation[BA], x - 1, y, z)),
          this.lerp(u, this.grad(this.permutation[AB], x, y - 1, z), this.grad(this.permutation[BB], x - 1, y - 1, z))
        ),
        this.lerp(
          v,
          this.lerp(u, this.grad(this.permutation[AA + 1], x, y, z - 1), this.grad(this.permutation[BA + 1], x - 1, y, z - 1)),
          this.lerp(u, this.grad(this.permutation[AB + 1], x, y - 1, z - 1), this.grad(this.permutation[BB + 1], x - 1, y - 1, z - 1))
        )
      );
    }
    
    // Multi-octave Perlin noise (fractal Brownian motion)
    fbm(
      x: number, 
      y: number, 
      z: number, 
      octaves: number = 4, 
      persistence: number = 0.5, 
      lacunarity: number = 2.0
    ): number {
      let value = 0;
      let amplitude = 1;
      let frequency = 1;
      let maxValue = 0;
      
      for (let i = 0; i < octaves; i++) {
        value += this.noise(x * frequency, y * frequency, z * frequency) * amplitude;
        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
      }
      
      return value / maxValue;
    }
  }
  
  // Create a singleton instance with seeded randomness for consistent animation
  const perlin = new PerlinNoise(12345);
  
  export { perlin, PerlinNoise };
