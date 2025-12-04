export default function getBotResponse(question, hotels, bookings) {
    if (!question) return "Please ask something.";
  
    question = question.toLowerCase().trim();
  
    // 1) Total hotels
    if (question.includes("how many hotels")) {
      return `There are ${hotels.length} hotels available.`;
    }
  
    // 2) Hotels in city
    if (question.includes("hotels in")) {
      const city = question.replace("hotels in", "").trim();
  
      const filtered = hotels.filter((h) =>
        h.city.toLowerCase().includes(city)
      );
  
      if (filtered.length > 0)
        return `Found ${filtered.length} hotel(s) in ${city}.`;
  
      return `No hotels found in ${city}.`;
    }
  
    // 3) Cheapest hotel
    if (question.includes("cheapest")) {
      const cheapest = [...hotels].sort((a, b) => a.price - b.price)[0];
  
      return `Cheapest hotel is "${cheapest.name}" costing ₹${cheapest.price}.`;
    }
  
    // 4) Most expensive hotel
    if (question.includes("expensive")) {
      const exp = [...hotels].sort((a, b) => b.price - a.price)[0];
  
      return `Most expensive hotel is "${exp.name}" costing ₹${exp.price}.`;
    }
  
    // 5) Best hotel (highest rating)
    if (question.includes("best") || question.includes("top")) {
      const top = [...hotels].sort((a, b) => b.rating - a.rating)[0];
  
      return `Top hotel is "${top.name}" with rating ${top.rating}.`;
    }
  
    // 6) User bookings count
    if (question.includes("booking")) {
      return `You have ${bookings.length} booking(s).`;
    }
  
    if (question.includes("user details") || question.includes("my details")) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          return `User Details:
      Name: ${currentUser.name}
      Email: ${currentUser.email}`;
        } 
        
      }
      
    // Default reply
    return "Sorry, I didn't understand. Try: 'hotels in Delhi', 'cheapest hotel', 'best hotel'.";
  }
  