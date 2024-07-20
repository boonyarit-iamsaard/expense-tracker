import { verify } from '@node-rs/argon2';
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { db } from '@/server/db';
import { loginInputSchema } from '@/types/auth';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  /**
   * Session object returned from the `session` callback.
   */
  interface Session extends DefaultSession {
    user: {
      // TODO: TBD if the accessToken is required for the authentication flow
      // accessToken: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  /**
   * User object returned from the `authorize` function.
   */
  interface User {
    // TODO: TBD if the accessToken is required for the authentication flow
    // accessToken: string;
    // ...other properties
    // role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  /**
   * JWT object returned from the `jwt` callback.
   */
  interface JWT {
    // TODO: TBD if the accessToken is required for the authentication flow
    // accessToken: string;
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    /**
     * Use an if branch to check for the existence of parameters (apart from token). If they exist,
     * this means that the callback is being invoked for the first time (i.e. the user is being signed in).
     * This is a good place to persist additional data like an access_token in the JWT.
     * Subsequent invocations will only contain the token parameter.
     *
     * @see https://next-auth.js.org/configuration/callbacks#jwt-callback
     */
    async jwt({ token }) {
      // TODO: TBD if the accessToken is required for the authentication flow
      // if (user) {
      //   token.accessToken = user.accessToken;
      // }
      return token;
    },
    async session({ session }) {
      // TODO: TBD if the accessToken is required for the authentication flow
      // session.user.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Please enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Please enter your password',
        },
      },
      async authorize(credentials) {
        const result = loginInputSchema.safeParse(credentials);
        if (!result.success) {
          throw new Error('invalid credentials');
        }

        // FIXME: should this be wrapped in a try/catch block to handle both the db error and the
        // non-existent user error?
        const user = await db.user.findUnique({
          where: {
            email: result.data.email,
          },
          include: {
            credentials: {
              select: {
                hashedPassword: true,
              },
            },
          },
        });
        if (!user) {
          throw new Error('invalid credentials');
        }

        const hashedPassword = user.credentials?.hashedPassword;
        if (!hashedPassword) {
          throw new Error('invalid credentials');
        }

        const isValidPassword = await verify(
          hashedPassword,
          result.data.password,
        );
        if (!isValidPassword) {
          throw new Error('invalid credentials');
        }

        return {
          id: user.id,
          // TODO: TBD if the accessToken is required for the authentication flow
          // TODO: sign a JWT token with a secret key
          // accessToken: 'accessToken',
          email: result.data.email,
          name: user.name,
        };
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
