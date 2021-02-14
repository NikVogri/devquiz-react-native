const calculatePercentage = (num1: number, num2: number) => {
  const division = num1 < num2 ? num1 / num2 : num2 / num1;
  return Math.floor(division * 100);
};

export default calculatePercentage;
