export const buttonStyle = {
  // style object for base or default style
  baseStyle: {
    rounded: "12px",

    fontWeight: "600",
    _focus: {
      outline: 0,
      ring: "none",
    },
    _active: {
      outline: 0,
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    lg: {
      w: "full",
      h: "56px",
    },
    xs: {
      px: "16px",
      py: "10px",
      fontSize: "15px",
      fontWeight: "600",
    },
    icon: {
      w: "54px",
      h: "54px",
    },
  },
  // styles for different visual variants ("outline", "solid")
  variants: {
    solid: {
      bg: "app.primary.900",
      color: "white",
      _hover: {
        bg: "#006577dd",
      },
      borderRadius: "15px",
    },
    outline: {
      bg: "#00000000",
      color: "app.primary.900",
      borderWidth: "2px",
      borderColor: "app.primary.900",
      _hover: {
        bg: "#00000000",
        // borderColor: "app.primary_hover",
        color: "app.primary_hover",
      },
    },
    link: {
      fontWeight: 700,
      color: "app.primary.300",
    },
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: "solid",
    size: "lg",
  },
};
