/**
 * Centralised path constants for Studio OS.
 * All internal navigation links MUST use these — never hardcode "/agency".
 * API paths (fetch("/api/...")) do NOT use this; APIs are at root level.
 */

export const STUDIO_BASE = "/agency";

/** Studio OS home (dashboard) */
export const STUDIO_HOME = STUDIO_BASE;

/** Login page */
export const STUDIO_LOGIN = `${STUDIO_BASE}/login`;

// Nav items — export for use in sidebar
export const STUDIO_NAV = [
  { key: "dashboard", href: STUDIO_HOME, label: "Dashboard" },
  { key: "crm", href: `${STUDIO_BASE}/crm`, label: "Sales CRM" },
  { key: "prospects", href: `${STUDIO_BASE}/prospects`, label: "Prospects" },
  { key: "clients", href: `${STUDIO_BASE}/clients`, label: "Clients" },
  { key: "tasks", href: `${STUDIO_BASE}/tasks`, label: "Tasks" },
  { key: "payments", href: `${STUDIO_BASE}/payments`, label: "Payments" },
  { key: "finance", href: `${STUDIO_BASE}/finance`, label: "Finance" },
  { key: "revenue", href: `${STUDIO_BASE}/revenue`, label: "Revenue" },
  { key: "accounting", href: `${STUDIO_BASE}/accounting`, label: "Accounting" },
  { key: "team", href: `${STUDIO_BASE}/team`, label: "Team" },
  { key: "whatsapp", href: `${STUDIO_BASE}/whatsapp`, label: "WhatsApp" },
  { key: "proposals", href: `${STUDIO_BASE}/proposals`, label: "Proposals" },
  { key: "replies", href: `${STUDIO_BASE}/replies`, label: "Replies" },
  { key: "outbound", href: `${STUDIO_BASE}/outbound`, label: "Outbound" },
] as const;
