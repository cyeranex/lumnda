import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { TypeORMLegacyAdapter } from '@next-auth/typeorm-legacy-adapter';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: TypeORMLegacyAdapter({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
  }),
});
