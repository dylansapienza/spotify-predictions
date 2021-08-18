import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from "@chakra-ui/react";

function LandingPage() {
  return (
    <div className="App">
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "5xl", sm: "5xl", md: "7xl" }}
            lineHeight={"110%"}
          >
            Music Recommendations{" "}
            <Text as={"span"} color={"green.500"}>
              tailored to your preferences
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            Using music audio features, artifical intelligence can specifcally
            combine your favorite artists, albums and genres with abstract
            quanitifers
          </Text>
          <Stack spacing={6} direction={"row"}>
            <Button
              onClick={() => {
                window.location.replace("/weather");
              }}
              rounded={"full"}
              px={6}
              colorScheme={"green"}
              bg={"green.500"}
              _hover={{ bg: "green.600" }}
            >
              Get started
            </Button>
            <Button
              onClick={() => {
                window.location.replace("/about");
              }}
              rounded={"full"}
              px={6}
            >
              Learn more
            </Button>
          </Stack>
          <Flex w={"full"}></Flex>
        </Stack>
      </Container>
    </div>
  );
}

export default LandingPage;
