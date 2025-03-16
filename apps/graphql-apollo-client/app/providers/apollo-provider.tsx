"use client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import React from "react";
import Header from "../components/header";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

type Props = {
  children: React.ReactNode;
};
const ApolloClientProvider = ({ children }: Props) => {
  return (
    <ApolloProvider client={client}>
      <Header />
      {children}
    </ApolloProvider>
  );
};

export default ApolloClientProvider;
