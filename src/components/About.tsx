import React, { FunctionComponent } from "react";
import { Heading, Text, Box, Flex, Link } from "rebass";

const year = new Date().getFullYear();

export const About: FunctionComponent = () => {
  return (
    <>
      <Box id="about" p={4} backgroundColor="primary" color="secondary">
        <Heading variant="display" mb={3}>
          Doctor Masky is here to remind you, just put on a mask.
        </Heading>

        <Text variant="body">
          Like everyone else these days, our neural network is trained to
          recognize faces in masks, and to watch out for faces without them.
        </Text>

        <Text variant="body">
          So take your mask off (when you're inside please!) and let the Doctor
          show you what's <em>really</em> going on.
        </Text>

        <Heading variant="display" mt={4}>
          FAQ
        </Heading>

        <Heading variant="heading" mt={3} mb={2}>
          Are you stealing pictures of my face?!
        </Heading>

        <Text variant="body">
          We promise we're not. Your video stream never leaves your device, and
          all the mask detecting is happing right there on your machine. Doctor
          Masky is always with you.
        </Text>

        <Heading variant="heading" mt={3} mb={2}>
          How does it work?
        </Heading>

        <Text variant="body">
          If you want to get technical, we used{" "}
          <Link href="https://cloud.google.com/automl" color="secondary">
            Google AutoML Vision
          </Link>{" "}
          to train the model,{" "}
          <Link href="https://www.tensorflow.org/js" color="secondary">
            TensorFlow.js
          </Link>{" "}
          to run the inferences, and React to put it all together. You can read
          more about how we built it in{" "}
          <Link href="https://blog.ae.studio/doctor-masky/" color="secondary">
            this blog post
          </Link>
          .
        </Text>

        <Text variant="body">
          If you don't want to get technical, then it's magic{" "}
          <span role="img" aria-label="sparkles">
            ✨
          </span>
        </Text>

        <Heading variant="heading" mt={3} mb={2}>
          This is taking a while to load.
        </Heading>

        <Text variant="body">
          Yeah it takes a few seconds to get going. Think of it like visiting
          any other doctor, you're going to spend some time waiting.
        </Text>

        <Heading variant="heading" mt={3} mb={2}>
          Are viruses really shooting out of my mouth whenever I take my mask
          off?
        </Heading>

        <Text variant="body">Yes.</Text>

        <Heading variant="heading" mt={3} mb={2}>
          Why did you make this?
        </Heading>

        <Text variant="body">
          We're AE Studio, and we care about increasing human agency. We know
          you want to help protect people, and we think this is a fun way to
          remind yourself to do it.
        </Text>

        <Text variant="body">
          Also, if you've got a human-agency increasing data science or
          application development project, we'd love to{" "}
          <Link href="https://ae.studio" color="secondary">
            help you build it!
          </Link>
        </Text>
      </Box>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="background"
        p={4}
        color="primary"
      >
        <Text variant="body">© {year} AE Studio, all rights reserved</Text>

        <Link href="mailto:info@ae.studio">
          <Text variant="body">Contact</Text>
        </Link>
      </Flex>
    </>
  );
};
