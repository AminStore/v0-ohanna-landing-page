/**
 * Database queries index
 * Centralized export of all query functions
 */

import { productQueries } from "./products";
import { orderQueries } from "./orders";
import { contactQueries } from "./contacts";

export { productQueries, orderQueries, contactQueries };

// Re-export for convenience
export { productQueries as products, orderQueries as orders, contactQueries as contacts };

