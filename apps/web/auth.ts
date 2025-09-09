import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
  database: new Pool({
    user: 'neondb_owner',
    host: 'ep-aged-sea-ads02zv2-pooler.c-2.us-east-1.aws.neon.tech',
    database: 'neondb',
    password: 'npg_qtecB8ElOD2g',
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId:
        '401698831449-9n5hukat0t3pnapud07njh9hn32nf3aj.apps.googleusercontent.com',
      clientSecret: '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',
    },
  },
});
