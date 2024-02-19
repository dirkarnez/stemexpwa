export const removeDuplicateKeys = (formData) => {
    const uniqueData = new FormData();
    const seenKeys = new Set();
  
    for (const [key, value] of formData.entries()) {
      if (!seenKeys.has(key)) {
        uniqueData.append(key, value);
        seenKeys.add(key);
      }
    }
  
    return uniqueData;
}