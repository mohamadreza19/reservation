/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Vaghtban API
 * API for managing reservations
 * OpenAPI spec version: 1.0
 */
import type { CreateUserDtoRole } from './createUserDtoRole';

export interface CreateUserDto {
  /** Phone number of the user */
  phoneNumber: string;
  /** Password for the user (if applicable) */
  password?: string;
  /** Role of the user */
  role: CreateUserDtoRole;
  /** userName */
  userName?: string;
  /** First name of the user */
  firstName?: string;
  /** Last name of the user */
  lastName?: string;
}
