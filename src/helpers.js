function getDescriptionAndTags(input) {
  const pieces = input.split(' ');

  const descriptionPieces = [];
  const tags = [];

  pieces.forEach(piece => {
    if (piece[0] === '#') {
      tags.push(piece.slice(1)); // tag without the leading '#'
    } else {
      descriptionPieces.push(piece);
    }
  })

  return {
    description: descriptionPieces.join(' '),
    tags: tags,
  }
}

export {
  getDescriptionAndTags
}
