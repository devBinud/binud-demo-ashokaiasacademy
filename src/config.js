/**
 * App Configuration
 *
 * To restore full website functionality, set isSuspended to false.
 * To activate the server overdue / billing lockout screen, set isSuspended to true.
 */
export const SITE_CONFIG = {
  isSuspended: false,
};

/**
 * ADMIN ACCESS — only these accounts can open /admin.
 * Everyone else who signs up on /signup is a normal student.
 *
 * ⚠️ Add your admin login email(s) here (lowercase), e.g.
 *    'admin@yourdomain.com',
 * Until at least one email is listed, NOBODY can open the admin panel.
 */
export const ADMIN_EMAILS = [
  // 'your-admin-email@example.com',
];

export const isAdminEmail = (email) =>
  !!email && ADMIN_EMAILS.map((e) => e.trim().toLowerCase()).includes(email.trim().toLowerCase());
