import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Our Platform!</Preview>
      <Body style={{ backgroundColor: "#f4f4f4", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Heading style={{ color: "#333" }}>Welcome, {"mahmoud"}!</Heading>
          <Text>We are excited to have you on board. Let’s get started!</Text>
          <Text>Best regards,</Text>
          <Text>The Team</Text>
        </Container>
      </Body>
    </Html>
  );
}
