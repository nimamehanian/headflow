const getCurrentItem = (change) => {
  const currentItem = change.value.startBlock;
  return currentItem && currentItem.type === 'list_item' ?
    currentItem : null;
};

export default getCurrentItem;
