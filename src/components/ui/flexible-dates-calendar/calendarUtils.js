import { format, addDays, subDays, startOfDay } from 'date-fns';

// Generate price data for a range of dates
export const generatePriceDataForRange = (centerDate, daysRange = 90) => {
  const priceData = {};
  const startDate = subDays(centerDate, 30); // Start 30 days before
  
  for (let i = 0; i < daysRange; i++) {
    const currentDate = addDays(startDate, i);
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    
    // Generate deterministic price patterns based on date
    const basePrice = 120;
    const dayOfWeek = currentDate.getDay();
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.getMonth();
    
    // Weekend prices are typically higher
    const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.4 : 1;
    
    // Mid-week tends to be cheaper
    const midWeekDiscount = (dayOfWeek === 2 || dayOfWeek === 3) ? 0.85 : 1;
    
    // Month-end prices might be higher
    const monthEndMultiplier = (dayOfMonth > 25) ? 1.1 : 1;
    
    // Use deterministic "randomness" based on date values
    const seed = (dayOfMonth * 7 + dayOfWeek * 3 + month * 11) % 100;
    const pseudoRandom = 0.8 + (seed / 100) * 0.4;
    
    // Calculate price
    const price = Math.round(
      basePrice * weekendMultiplier * midWeekDiscount * monthEndMultiplier * pseudoRandom
    );
    
    // Determine if it's cheapest or recommended
    const isCheapest = price < 105;
    const isRecommended = !isCheapest && price < 125 && dayOfWeek !== 0 && dayOfWeek !== 6;
    
    priceData[dateKey] = {
      price,
      isCheapest,
      isRecommended,
      date: currentDate
    };
  }
  
  return priceData;
};

// Get flexible dates around a selected date (for the horizontal list)
export const getFlexibleDatesAroundDate = (selectedDate, priceData, daysBeforeAfter = 3) => {
  const dates = [];
  const startDate = subDays(selectedDate, daysBeforeAfter);
  
  for (let i = 0; i < (daysBeforeAfter * 2 + 1); i++) {
    const currentDate = addDays(startDate, i);
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    const priceInfo = priceData[dateKey];
    
    if (priceInfo) {
      dates.push({
        id: i + 1,
        date: format(currentDate, 'd MMM'),
        fullDate: currentDate,
        price: `$${priceInfo.price}`,
        priceValue: priceInfo.price,
        isCheapest: priceInfo.isCheapest,
        isRecommended: priceInfo.isRecommended
      });
    }
  }
  
  return dates;
};

// Find the cheapest dates in the price data
export const findCheapestDates = (priceData, limit = 5) => {
  const sortedDates = Object.entries(priceData)
    .sort((a, b) => a[1].price - b[1].price)
    .slice(0, limit);
  
  return sortedDates.map(([dateKey, info]) => ({
    date: info.date,
    price: info.price,
    dateKey
  }));
};

// Find recommended dates (best value considering price and day of week)
export const findRecommendedDates = (priceData, limit = 5) => {
  const recommendedDates = Object.entries(priceData)
    .filter(([_, info]) => info.isRecommended)
    .sort((a, b) => a[1].price - b[1].price)
    .slice(0, limit);
  
  return recommendedDates.map(([dateKey, info]) => ({
    date: info.date,
    price: info.price,
    dateKey
  }));
};

// Format price data for a specific month
export const getPriceDataForMonth = (year, month, allPriceData) => {
  const monthPriceData = {};
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  
  for (let day = 1; day <= endDate.getDate(); day++) {
    const currentDate = new Date(year, month, day);
    const dateKey = format(currentDate, 'yyyy-MM-dd');
    
    if (allPriceData[dateKey]) {
      monthPriceData[dateKey] = allPriceData[dateKey];
    }
  }
  
  return monthPriceData;
};
