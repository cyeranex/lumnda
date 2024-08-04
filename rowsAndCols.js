

function calculateHeight(rows, fontSizeRem) {
    // Assuming root font size is 16px
    const rootFontSize = 16;
    const fontSizePx = fontSizeRem * rootFontSize;
    const lineHeight = fontSizePx * 1.3; // Adjust 1.3 based on your line-height
    const totalHeight = rows * lineHeight;
  
    return totalHeight;
  }
  

const rows = 10;
const fontSizeRem = 1.3;
const calculatedHeight = calculateHeight(rows, fontSizeRem);

console.log(calculatedHeight);