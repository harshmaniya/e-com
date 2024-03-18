import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { connectDBHandler } from "@/lib/db";
import typeDefs from "@/apollo/server/typeDefs";
import resolvers from "@/apollo/server/resolvers";
import jwt from 'jsonwebtoken';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')
      .replace('Context creation failed: ', '')
      .replace('Unexpected error value: ', '');
    return { ...error, message };
  },
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return { user: decoded };
    } catch (error) {
      console.log("🚀 ~ error:", error.message)
      return new Error("Invalid token", error.message);
    }
  }
});

const handler = connectDBHandler(startServerAndCreateNextHandler(apolloServer));

export { handler as GET, handler as POST };

// Add some logging
console.log("Server setup completed");