import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kumo Africa Admin v2</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Text fontSize={60} fontWeight={700} color="app.primary.900">
          Kumo Africa
        </Text>
      </Box>
    </div>
  );
}
