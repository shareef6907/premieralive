/**
 * Outbound system constants.
 * Sequence UUIDs are defined once here and imported wherever needed.
 * Never inline these in multiple files — a UUID appearing in two places
 * is how the wrong sequence gets sent.
 */

export const ENGLISH_SEQUENCE_ID    = '11111111-1111-1111-1111-111111111111';
export const ARABIC_SEQUENCE_ID     = '22222222-2222-2222-2222-222222222222';
export const GATEKEEPER_EN_ID       = '33333333-3333-3333-3333-333333333333';
export const GATEKEEPER_AR_ID       = '44444444-4444-4444-4444-444444444444';
