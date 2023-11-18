const TopCardsLayout = ({ children, layoutColSize }) => {
  return <div className={`grid sm:grid-cols-5 gap-4 p-4`}>{children}</div>;
};

export default TopCardsLayout;
