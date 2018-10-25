import { Pixel, PixelStatus } from './pixel';
import * as draw from './drawing';

export class PixelMap {
  readonly width: number;
  readonly height: number;
  private pixels: PixelStatus[][] = [];

  /**
   * Create a new instance of the canvas.
   * @param width
   * @param height
   */
  constructor (width: number, height: number) {
    this.width = width;
    this.height = height;

    this.clear();
  }

  /**
   * Get the status of a pixel.
   * @param x
   * @param y
   */
  get (x: number, y: number): PixelStatus {
    return this.pixels[x][y];
  }

  /**
   * Get all pixels.
   */
  getAll (): PixelStatus[][] {
    return this.pixels;
  }

  /**
   * Set an individual pixel.
   * @param x
   * @param y
   * @param status
   */
  set (x: number, y: number, status: PixelStatus): void {
    this.pixels[x][y] = status;
  }

  /**
   * Clear the map.
   */
  clear (): void {
    this.fill(false);
  }

  /**
   * Fill the map with pixels.
   * @param status
   */
  fill (status: PixelStatus) {
    this.pixels = [];

    for (let x = 0; x < this.width; x++) {
      this.pixels[x] = [];
      for (let y = 0; y < this.height; y++) {
        this.pixels[x][y] = status;
      }
    }
  }

  /**
   * Draw a line using Bresenham's line algorithm.
   * @param x0
   * @param y0
   * @param x1
   * @param y1
   * @param status
   */
  line (x0: number, y0: number, x1: number, y1: number, status: PixelStatus = Pixel.ON) {
    draw.line(this, x0, y0, x1, y1, status);
  }

  /**
   * Draw a rectangle.
   * @param x
   * @param y
   * @param width
   * @param height
   * @param outline
   * @param status
   */
  rectangle (
    x: number,
    y: number,
    width: number,
    height: number,
    outline: boolean = false,
    status: PixelStatus = Pixel.ON
  ) {
    draw.rectangle(this, x, y, width, height, outline, status);
  }

  /**
   * Draw text.
   * @param x
   * @param y
   * @param content
   * @param size
   * @param spacing
   * @param wrap
   */
  text (x: number, y: number, content: string, size: number = 1, spacing: number = 2, wrap = true) {
    draw.text(this, x, y, content, size, spacing, wrap);
  }

  /**
   * Format the Pixel map as an array of all pixels.
   */
  toArray (): PixelStatus[] {
    const array: PixelStatus[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        array.push(this.get(x, y));
      }
    }
    return array;
  }

  /**
   * Format the Pixel map as a string.
   */
  toString () {
    const prefix = 'PixelMap { ';
    const padding = prefix.length;

    const lines: string[] = [];
    for (let y = 0; y < this.height; y++) {
      let line = prefix;
      if (y > 0) {
        line = ' '.repeat(padding);
      }

      for (let x = 0; x < this.width; x++) {
        line += (this.pixels[x][y] && 'x ') || '- ';
      }

      lines.push(line);
    }

    return lines.join('\n') + '}';
  }
}
