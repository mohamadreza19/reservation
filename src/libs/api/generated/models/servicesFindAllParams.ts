/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Vaghtban API
 * API for managing reservations
 * OpenAPI spec version: 1.0
 */

export type ServicesFindAllParams = {
/**
 * Page number for pagination
 */
page?: number;
/**
 * Number of items per page
 */
limit?: number;
/**
 * Filter by system services (true) or non-system services (false)
 */
isSystemService?: boolean;
};
