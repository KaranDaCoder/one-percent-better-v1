import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import User from './models/User.model';
import { connectDb } from './lib/dbConnect';

export const { handlers, signIn, signOut, auth } = NextAuth({
 providers: [
  Google({
   clientId: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
 ],
 callbacks: {
  async signIn({ profile }) {
   const { email, name, picture } = profile;
   const username = email.toLowerCase().split('@')[0];
   await connectDb();
   try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
     const create_user = await User.create({
      username,
      name,
      email,
      picture,
     });
     console.log(
      `User does not exist -- create / register a new user: ${JSON.stringify(create_user)}`
     );
    }
   } catch (error) {
    console.log(`Something went wrong - ${error?.message}`);
    return false;  // If error occurs, deny sign-in
   }
   return true; // Allow sign-in if everything works
  },

  async session({ session, token }) {
   await connectDb();
   const curr_session = await User.findOne({ email: session?.user?.email });
   if (curr_session) {
    session.user._id = curr_session._id.toString();
    session.user.username = curr_session.username.toString();
   }
   return session; // Add user data to the session
  },
 },

 pages: {
  signIn: '/auth/sign-in', // Custom sign-in page
  error: '/', // Redirect to home page if an error occurs
  newUser: '/', // Redirect to home page after account creation
 },
});
