function getDescriptionAndTags(input) {
  const pieces = input.split(' ');

  const descriptionPieces = [];
  const tags = [];

  pieces.forEach(piece => {
    if (piece[0] === '#') {
      let tag = piece.slice(1); // tag without the leading '#'
      if (!tags.includes(tag)) tags.push(tag);
    } else {
      descriptionPieces.push(piece);
    }
  })

  return {
    description: descriptionPieces.join(' '),
    tags: tags,
  }
}

function buildDescriptionAndTags(description = '', tags = []) {
  const tagString = tags.map(tag => `#${tag}`).join(' ');
  return `${description} ${tagString}`;
}

export {
  getDescriptionAndTags,
  buildDescriptionAndTags,
}
