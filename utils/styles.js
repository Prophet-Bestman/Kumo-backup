export const customScrollBar = {
  "&::-webkit-scrollbar": {
    width: "4px",
    borderRadius: "24px",
    backgroundColor: `rgba(250, 250, 250, 249.005)`,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: `#00657744`,
    rounded: "full",
  },
};

export const customScrollBar2 = {
  "&::-webkit-scrollbar": {
    width: "6px",
    borderRadius: "200px",
    backgroundColor: `rgba(0, 0, 0, 0.005)`,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: `#006577`,
    rounded: "full",
  },
};
export const customScrollBar3 = {
  ...customScrollBar2,
  "&::-webkit-scrollbar": {
    width: "4px",
  },
};

export default customScrollBar;
