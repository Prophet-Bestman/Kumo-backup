export const inputStyle = {
  baseStyle: {
    // "::focus": { outline: "none" },
  },

  variants: {
    filled: {
      field: {
        borderColor: "#006577",
        bg: "#f2f2f2",
        height: "46px",
        borderRadius: "12px",
        borderWidth: 0,
        px: "12px",
        color: "#444444",
        fontWeight: "600",
        fontSize: "14px",
        _focus: {
          borderColor: "#006577",
          bg: "#f2f2f2",
          borderWidth: "2px",
        },
        _disabled: {
          opacity: 0.8,
        },
        _placeholder: {
          fontWeight: 400,
        },
      },
    },
  },

  defaultProps: {
    variant: "filled",
    // size: "lg",
  },
};
