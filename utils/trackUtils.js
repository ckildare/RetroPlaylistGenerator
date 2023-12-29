export const mapTrack = (track) => {
  return {
    id: track.id,
    name: track.name,
    artists: [...track.artists.map(artist => ({
      name: artist.name,
      href: artist.href,
      id: artist.id
    }))],
    album: {
      name: track.album.name,
      href: track.album.href,
      images: track.album.images,
      releaseDate: track.album.release_date,
      id: track.album.id,
    },
    duration: track.duration_ms,
    href: track.href,
    preview: track.preview_url,
  };
};

export const mapTrackTreeNode = (track) => {
  const smallestImg = track.album.images[track.album.images.length - 1];
  return {
    'id': track.id,
    'href': track.href,
    'img': smallestImg.url,
    'imgDim': smallestImg.height,
    'selected': false
  };
};

export const mapTrackTreeRow = (parent, tracks) => {
  let mappedTrackTreeRow = { 'parent': parent, 'tracks': [] };
  tracks.forEach(track => {
    mappedTrackTreeRow.tracks.push(mapTrackTreeNode(track));
  });

  return mappedTrackTreeRow;
};

export const addTracksToTree = (trackTree, parent, tracks) => {
  if (!trackTree) {
    return {
      0: mapTrackTreeRow(null, tracks),
    };
  }
  let newTrackTree = { ...trackTree };

  const lastKey = Object.keys(trackTree).length - 1;
  if (newTrackTree[lastKey] && newTrackTree[lastKey].tracks) {
    const selectedTrack = newTrackTree[lastKey].tracks.find(track => track.id == parent);
    if (selectedTrack) {
      selectedTrack.isSelected = true;
    }
  }

  newTrackTree[Object.keys(trackTree).length] = mapTrackTreeRow(parent, tracks);
  return newTrackTree;
};