'use client'

import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";

export default function Page() {

  return (
    <Box className="h-full">
      <Flex className="bg-green-50 p-4 justify-between items-center w-full">
        <Text className="text-sm">minhaAGENDA</Text>

        <Button className="bg-green-400 hover:bg-green-500 text-gray-50 font-bold" >ENTRAR</Button>
      </Flex>

      <Box className="h-full">
        <Center className="h-full">
          <Text className="font-sans text-2xl font-bold text-center">
            Sua plataforma para controlar seus horários e <br />facilitar seu dia a dia.
          </Text>
        </Center>
      </Box>

      <Box className="pb-4">
        <Center>
          <Text>
            Desenvolvidor por &copy; leandro-wrocha.com
          </Text>
        </Center>
      </Box>
    </Box>
  )
}
