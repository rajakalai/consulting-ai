// utils/api.ts

interface CallData {
    id: string;
    original: string;
    cleaned: string;
  }
  
  export async function fetchCallData(id: string): Promise<CallData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Mock data
    const mockData: CallData = {
      id,
      original: `This is the original content for call ${id}. It includes umm... various filler words and, like, informal language. You know what I mean?`,
      cleaned: `This is the cleaned content for call ${id}. It has been edited to remove filler words and improve clarity.`
    };
  
    return mockData;
  }