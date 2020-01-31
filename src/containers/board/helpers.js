import firestore from '../../firebase/firestore';

const updateBoard = ({ id, type, items }) => {
  firestore
    .getCollection('boards')
    .doc(id)
    .update({
      [type]: items
    });
};

export const addToBoard = ({ id, items, newItem, type }) => {
  // check for existing items, else create new array
  const newItems = (items && [...items, newItem]) || [newItem];
  updateBoard({ id, type, items: newItems });
};

export const deleteFromBoard = ({ id, type, items, userId, indexToDelete }) => {
  // i know this is messy
  // check if items isn't empty, then check if index isn't out of bounds
  const itemToDelete =
    items && items.length > indexToDelete && items[indexToDelete];

  // if this item was created by the user that wants to delete it...
  if (itemToDelete && itemToDelete.uid === userId) {
    // yeet
    const newItems = [...items];
    newItems.splice(indexToDelete, 1);

    updateBoard({ id, type, items: newItems });
  }
};

export const addLikeToBoard = ({ id, type, items, userId, indexToLike }) => {
  const newItems = [...items];
  if (newItems.length > indexToLike) {
    // we can actually "like" this, still in bounds
    // probably unnecessary
    const likes = newItems[indexToLike].likes || [];

    // has the user liked this? if so, get the index of their id
    const likedIndex = likes.indexOf(userId);
    if (likedIndex >= 0) {
      // they have liked it, so remove it.
      likes.splice(likedIndex, 1);
    } else {
      // like it
      likes.push(userId);
    }

    // set item's likes with new likes
    newItems[indexToLike].likes = [...likes];
  }
  updateBoard({ id, type, items: newItems });
};

export const updateUserIcon = ({
  userId,
  selectedCharacter,
  boardId,
  userIcons
}) => {
  // update userIcons collection on board with newly selected character
  firestore
    .getCollection('boards')
    .doc(boardId)
    .update({
      userIcons: { ...userIcons, [userId]: selectedCharacter }
    });
};
