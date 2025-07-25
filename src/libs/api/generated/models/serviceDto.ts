/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Vaghtban API
 * API for managing reservations
 * OpenAPI spec version: 1.0
 */
import type { Price } from './price';

export interface ServiceDto {
  id: string;
  name: string;
  icon: string;
  description?: string;
  isSystemService: boolean;
  price?: Price;
  children?: ServiceDto[];
}
