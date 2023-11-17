const TopCardsLayout = ({ children, layoutColSize }) => {
  const cardStyle = `grid lg:grid-cols-${layoutColSize} gap-4 p-4`;

  return <div className={cardStyle}>{children}</div>;
};

export default TopCardsLayout;
