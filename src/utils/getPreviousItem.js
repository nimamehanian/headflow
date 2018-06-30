import getCurrentItem from './getCurrentItem';

const getPreviousItem = (change) => {
  const currentItem = getCurrentItem(change);
  if (!currentItem) { return null; }

  const previousSibling = change.value.document.getPreviousSibling(currentItem.key);

  if (!previousSibling) {
    return null;
  } else if (previousSibling.type === 'list_item') {
    return previousSibling;
  }
  return null;
};

export default getPreviousItem;
