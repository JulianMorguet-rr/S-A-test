// src/environment.ts
export const myStudioTitle = process.env.SANITY_STUDIO_TITLE

export const devMode = process.env.SANITY_STUDIO_DEV_MODE || true

export const nodemailerURL = process.env.SANITY_STUDIO_NODEMAILER_URL || 'http://localhost:2000'

export const mediaUploadBaseURL = process.env.SANITY_STUDIO_MEDIA_UPLOAD_BASE_URL || 'http://localhost:2001' // 'BaseURL' // process.env.MEDIA_UPLOAD_BASE_URL
export const mediaUploadSocketBaseURL = process.env.SANITY_STUDIO_MEDIA_UPLOAD_SOCKET_BASE_URL || 'http://localhost:2002' // 'BaseURL' // process.env.MEDIA_UPLOAD_BASE_URL
