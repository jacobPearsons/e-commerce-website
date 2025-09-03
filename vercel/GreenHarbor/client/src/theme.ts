import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'purple',
      },
    },
    FormControl: {
      baseStyle: {
        label: {
          fontWeight: 'medium',
        },
      },
    },
  },
});

export default theme; 