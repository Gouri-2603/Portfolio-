import { defineConfig, defineTokens } from '@chakra-ui/react'

// Define tokens for our theme
const tokens = defineTokens({
  colors: {
    olive: '#3B4B3C',
    camel: '#B18C5F',
    tan: '#E6D5B8',
    white: '#fff',
    text: '#222',
    brand: {
      900: '#232d1b', // Main background
      800: '#3b4c3f', // Card backgrounds
      700: '#4a5d4e', // Lighter shade
    },
    accent: {
      500: '#c6a772', // Gold accent
      400: '#e5caa7', // Lighter gold
    },
  },
  fonts: {
    heading: 'Georgia, Times, serif',
    body: 'Inter, Arial, sans-serif',
  },
})

// Create theme config
const theme = defineConfig({
  tokens,
  styles: {
    global: {
      'body': {
        bg: 'brand.900',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
      },
      variants: {
        link: {
          color: 'white',
          _hover: {
            textDecoration: 'none',
            color: 'accent.500',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: 'normal',
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'body',
      },
    },
  },
})

export default theme