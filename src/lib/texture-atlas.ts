import { CanvasTexture, LinearFilter } from 'three';

export class TextureAtlas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private texture: CanvasTexture;
  private loaded = false;
  private readonly size = 2048;
  private readonly grid = 4; // 4x4 = 16 regions
  private cellSize: number;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.ctx = this.canvas.getContext('2d')!;
    this.cellSize = this.size / this.grid;
    this.texture = new CanvasTexture(this.canvas);
    this.texture.minFilter = LinearFilter;
    this.texture.magFilter = LinearFilter;
    this.texture.needsUpdate = true;
  }

  generateAtlas(): void {
    if (this.loaded) return;

    // Clear canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.size, this.size);

    // Predefined planet palettes
    const palettes = [
      { primary: '#FF9966', secondary: '#CC6600', type: 'gas' },
      { primary: '#666666', secondary: '#333333', type: 'rock' },
      { primary: '#66CCFF', secondary: '#0066CC', type: 'ice' },
      { primary: '#FF3300', secondary: '#990000', type: 'lava' },
      { primary: '#339933', secondary: '#006600', type: 'earth' },
      { primary: '#FFCC66', secondary: '#CC9900', type: 'desert' },
      { primary: '#0066CC', secondary: '#003366', type: 'water' },
      { primary: '#999999', secondary: '#666666', type: 'metal' },
      { primary: '#9966CC', secondary: '#663399', type: 'magic' },
      { primary: '#FF6699', secondary: '#CC3366', type: 'candy' },
      { primary: '#33CC99', secondary: '#009966', type: 'jungle' },
      { primary: '#FFCC33', secondary: '#FF9900', type: 'sun' },
      { primary: '#99CCFF', secondary: '#6699CC', type: 'sky' },
      { primary: '#CC99FF', secondary: '#9966CC', type: 'purple' },
      { primary: '#FF6666', secondary: '#CC3333', type: 'mars' },
      { primary: '#66FF99', secondary: '#33CC66', type: 'neon' }
    ];

    for (let y = 0; y < this.grid; y++) {
      for (let x = 0; x < this.grid; x++) {
        const index = y * this.grid + x;
        const palette = palettes[index % palettes.length];
        this.drawPlanetCell(x, y, palette);
      }
    }

    this.loaded = true;
    this.texture.needsUpdate = true;
  }

  private drawPlanetCell(x: number, y: number, palette: { primary: string; secondary: string }): void {
    const px = x * this.cellSize;
    const py = y * this.cellSize;
    
    // Draw gradient background
    const gradient = this.ctx.createRadialGradient(
      px + this.cellSize / 2,
      py + this.cellSize / 2,
      0,
      px + this.cellSize / 2,
      py + this.cellSize / 2,
      this.cellSize / 2
    );
    gradient.addColorStop(0, palette.primary);
    gradient.addColorStop(1, palette.secondary);
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(
      px + this.cellSize / 2,
      py + this.cellSize / 2,
      this.cellSize / 2 - 10,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // Add surface details
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let i = 0; i < 8; i++) {
      const cx = px + 20 + Math.random() * (this.cellSize - 40);
      const cy = py + 20 + Math.random() * (this.cellSize - 40);
      const radius = Math.random() * 12 + 4;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Add highlights
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 4; i++) {
      const hx = px + 15 + Math.random() * (this.cellSize - 30);
      const hy = py + 15 + Math.random() * (this.cellSize - 30);
      const hradius = Math.random() * 6 + 2;
      this.ctx.beginPath();
      this.ctx.arc(hx, hy, hradius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Add atmospheric lines
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 1.5;
    for (let i = 0; i < 3; i++) {
      const startAngle = Math.random() * Math.PI * 2;
      const endAngle = startAngle + Math.PI * (0.3 + Math.random() * 0.4);
      this.ctx.beginPath();
      this.ctx.arc(
        px + this.cellSize / 2,
        py + this.cellSize / 2,
        this.cellSize / 2 - 15,
        startAngle,
        endAngle
      );
      this.ctx.stroke();
    }
  }

  getTextureRegion(index: number): { offset: [number, number]; repeat: [number, number] } {
    const x = (index % this.grid) / this.grid;
    const y = Math.floor(index / this.grid) / this.grid;
    const repeat = 1 / this.grid;
    
    return {
      offset: [x, y],
      repeat: [repeat, repeat]
    };
  }

  getTexture(): CanvasTexture {
    return this.texture;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  dispose(): void {
    this.texture.dispose();
  }
}

// Singleton instance
let atlasInstance: TextureAtlas | null = null;

export const getTextureAtlas = (): TextureAtlas => {
  if (!atlasInstance) {
    atlasInstance = new TextureAtlas();
  }
  return atlasInstance;
};
