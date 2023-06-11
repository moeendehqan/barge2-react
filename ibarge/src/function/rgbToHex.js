


export const rgbToHex = (r, g, b) => {
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');
    return `#${hexR}${hexG}${hexB}`;
  };



  export const invertRgbColor = (color) => {
    const regex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
    const matches = color.match(regex);
  
    if (matches && matches.length === 4) {
      const r = parseInt(matches[1]);
      const g = parseInt(matches[2]);
      const b = parseInt(matches[3]);
  
      const invertedR = 255 - r;
      const invertedG = 255 - g;
      const invertedB = 255 - b;
  
      const invertedHexColor = `#${invertedR.toString(16).padStart(2, '0')}${invertedG.toString(16).padStart(2, '0')}${invertedB.toString(16).padStart(2, '0')}`;
      return invertedHexColor;
    }
  
    // در صورتی که فرمت رنگ درست نباشد، خروجی نال برگردانده میشود
    return null;
  };