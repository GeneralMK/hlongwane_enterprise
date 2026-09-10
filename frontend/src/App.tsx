import { Box, Container, Heading, Text } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

import { HomePage } from './pages/HomePage'

function PlaceholderPage({ title }: { title: string }) {
  return (
    <Container maxW="7xl" py="12">
      <Heading mb="3">{title}</Heading>
      <Text color="gray.600">This page will be implemented as part of the product backlog.</Text>
    </Container>
  )
}

export default function App() {
  return (
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PlaceholderPage title="Phones" />} />
        <Route path="/laptops" element={<PlaceholderPage title="Laptops" />} />
        <Route path="/tablets" element={<PlaceholderPage title="Tablets" />} />
        <Route path="/accessories" element={<PlaceholderPage title="Accessories" />} />
        <Route path="/login" element={<PlaceholderPage title="Sign in" />} />
        <Route path="/cart" element={<PlaceholderPage title="Shopping cart" />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Routes>
    </Box>
  )
}
