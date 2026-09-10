import { Box, Button, Container, Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const categories = [
  { name: 'Phones', path: '/phones' },
  { name: 'Laptops', path: '/laptops' },
  { name: 'Tablets', path: '/tablets' },
  { name: 'Accessories', path: '/accessories' }
]

export function HomePage() {
  return (
    <Box minH="100vh" bg="gray.50" color="gray.900">
      <Box as="header" bg="white" borderBottomWidth="1px">
        <Container maxW="7xl" py="4">
          <HStack justify="space-between">
            <Heading size="lg">Hlongwane Enterprise</Heading>
            <HStack gap="3">
              <Button asChild variant="ghost">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/cart">Cart</Link>
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      <Container maxW="7xl" py={{ base: '12', md: '20' }}>
        <VStack align="start" gap="8">
          <Box maxW="3xl">
            <Text fontWeight="semibold" mb="3">DEVICE COMMERCE ECOSYSTEM</Text>
            <Heading size={{ base: '3xl', md: '5xl' }} mb="5">
              Find the device that fits your life.
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Shop phones, laptops, tablets, and accessories with secure online payments and reliable order tracking.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="5" w="full">
            {categories.map((category) => (
              <Box key={category.name} bg="white" borderWidth="1px" borderRadius="xl" p="6">
                <Heading size="md" mb="4">{category.name}</Heading>
                <Button asChild variant="outline" size="sm">
                  <Link to={category.path}>Browse {category.name}</Link>
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
