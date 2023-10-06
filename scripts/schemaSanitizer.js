const sanitizeSchema = (node, removedItems) => {
  removeDuplicates(node, removedItems);
};

const removeDuplicates = (node, removedItems) => {
  if (isObject(node)) {
    if (Array.isArray(node)) {
      readArray(node, removedItems);
    } else {
      readObject(node, removedItems);
    }
  }
};

const isObject = (value) => {
  return typeof value === "object" && value !== null;
};

const isIterable = (item) => {
  return isObject(item) || Array.isArray(item) ? true : false;
};

const readArray = (array, removedItems) => {
  const seenArrayObjects = new Map();

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (isIterable(item)) {
      removeDuplicates(item, removedItems);
    }

    const itemString = JSON.stringify(item);
    if (seenArrayObjects.has(itemString)) {
      // Remove duplicate object from the array and save it for logging
      const removedItem = array.splice(i, 1)[0];
      i--; // Decrement index to handle the next element correctly
      removedItems.push(removedItem);
    } else {
      seenArrayObjects.set(itemString, true);
    }
  }
};

const readObject = (obj, removedItems) => {
  Object.values(obj).map((value) => removeDuplicates(value, removedItems));
};

export {
  sanitizeSchema,
  readArray,
  readObject,
  isIterable,
  isObject,
  removeDuplicates,
};
