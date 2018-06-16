/**
 * Mixins that wrap longhand properties to save people the trouble, i.e:
 * 
 * margin('10px', '15px') generates:
 *    margin-top: 10px;
 *    margin-right: 15px;
 *    margin-bottom: 10px;
 *    margin-left: 15px;
 */

function margin(...sides) {
  return trbl('margin', ...sides);
}

function padding(...sides) {
  return trbl('padding', ...sides);
}

function borderSide(side, width, style, color) {
  return [
    `border-${side}-width: ${width};`,
    `border-${side}-style: ${style};`,
    `border-${side}-color: ${color};`
  ].join('');
}

function borderTop(width, style, color) {
  return borderSide('top', width, style, color);
}

function borderRight(width, style, color) {
  return borderSide('right', width, style, color);
}

function borderBottom(width, style, color) {
  return borderSide('bottom', width, style, color);
}

function borderLeft(width, style, color) {
  return borderSide('left', width, style, color);
}

function border(width, style, color) {
  return [
    `${borderTop(width, style, color)}`,
    `${borderRight(width, style, color)}`,
    `${borderBottom(width, style, color)}`,
    `${borderLeft(width, style, color)}`
  ].join('');
}

function trbl(property, ...sides) {
  if (
    sides.length === 0 ||
    sides.length > 4
  ) {
    throw Error(`${property} should have at least 1, and at most 4 sides`);
  }

  switch (sides.length) {
    case 1: {
      return [
        `${property}-top: ${sides[0]};`,
        `${property}-right: ${sides[0]};`,
        `${property}-bottom: ${sides[0]};`,
        `${property}-left: ${sides[0]};`
      ].join('');
    }
    case 2: {
      return [
        `${property}-top: ${sides[0]};`,
        `${property}-right: ${sides[1]};`,
        `${property}-bottom: ${sides[0]};`,
        `${property}-left: ${sides[1]};`
      ].join('');
    }
    case 3: {
      return [
        `${property}-top: ${sides[0]};`,
        `${property}-right: ${sides[1]};`,
        `${property}-bottom: ${sides[2]};`,
        `${property}-left: ${sides[1]};`
      ].join('');
    }
    case 4: {
      return [
        `${property}-top: ${sides[0]};`,
        `${property}-right: ${sides[1]};`,
        `${property}-bottom: ${sides[2]};`,
        `${property}-left: ${sides[3]};`
      ].join('');
    }
  }
}

module.exports = {
  margin,
  padding,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft
}