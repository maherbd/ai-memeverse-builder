
// Mock data generation functions for charts

export const generateDataForDays = (days: number, baseValue: number, variance: number) => {
  const now = new Date();
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    
    // Random value within variance
    const randomFactor = Math.random() * variance * 2 - variance;
    const value = Math.max(0, Math.round(baseValue + randomFactor));
    
    data.push({
      date: formattedDate,
      value
    });
  }
  
  return data;
};

// Create pre-generated datasets
export const visitorsData = generateDataForDays(30, 120, 50);
export const pageViewsData = generateDataForDays(30, 350, 100);
export const bounceRateData = generateDataForDays(30, 65, 15).map(item => ({
  ...item,
  value: Math.min(100, item.value) // Cap at 100%
}));
export const durationData = generateDataForDays(30, 120, 30); // Duration in seconds
