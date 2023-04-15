const CountCard = () => {
  return (
    <Card
      title="Total Projects"
      bordered={false}
      headStyle={{ backgroundColor: "#D6E4FF" }}
      style={{
        width: 240,
        border: " 2px solid #597EF7",
      }}
    >
      <p className="font-bold pb-1">{projectsCount}</p>
      <p>Project count</p>
    </Card>
  );
};

export default CountCard;
