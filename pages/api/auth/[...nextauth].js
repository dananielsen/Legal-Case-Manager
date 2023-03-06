import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb";
import { MongoClient } from "mongodb";

import Credentials from "next-auth/providers/credentials"
export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers...

   
    // Email and Password
    Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "email" },
          password: { label: "Password", type: "password", placeholder: "password" }
        },
        async authorize(credentials, req) {
            let client, db, users;

            client = await MongoClient.connect(
                process.env.NEXT_PUBLIC_MONGODB_URI,
                { useNewUrlParser: true, useUnifiedTopology: true }
              );
              try{
                db = client.db("AVDB");
            
              }catch(error) {
                throw new error('Failed to establish a connection to the database');
              }
              try{
                users = db.collection('users');
              } catch(error)   {
                throw new ErrorEvent('Failed to connect to the users collection');
              }
    let result, userType;
    if(!result) {
        result = await users.findOne({email: credentials.email });
        if (result) {
            userType = 'Admin'
        } else{
            result = undefined
        }
    }
    if (!result) {
        console.log("Email not found")
        client.close();
        throw new Error('Invalid email');
    }
      //Check hased password with DB password -- add hashing
      const checkPassword = (credentials.password === result.credentials.password);
      //Incorrect password - send response
      if (!checkPassword) {
          console.log("password does not match")
          client.close();
          throw new Error('Password doesnt match');
      }
      client.close();
      const user = { id: result._id, userType: userType, name: result.firstName }
      return user;
      }
    })
  ],
  callbacks:    {
    jwt: async ({ token, user }) => {
        user && (token.user = user)
        return token
      },
      session: async ({ session, token }) => {
          session.user = token.user
          return session
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
      maxAge: 60 * 60 * 24 * 30,
    },
    session:{
      strategy: 'jwt'
    },
    adapter: MongoDBAdapter(clientPromise),
  }
)