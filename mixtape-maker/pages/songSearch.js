import { SpotifyAPIContext } from 'spotifyContext';
import { useRouter } from 'next/router';
import Button from 'components/Button/Button';
import Card from 'components/cards/Card/Card';
import React, { useState, useContext } from 'react';
import styles from '../styles/songSearch.module.scss';
import TextInput from 'components/TextInput/TextInput';

const SongSearchPage = () => {
  const { searchSongs, searchedSongs } = useContext(SpotifyAPIContext);
  const router = useRouter();
  const [inputSongTitle, setInputSongTitle] = useState('');

  const handleSearchButtonClick = (inputSongTitle) => {
    searchSongs(inputSongTitle);

    if (searchedSongs.length < 1) {
      // TODO: display no songs found message
      console.log('no songs found');
    }

    router.push('/songSelection');
  };

  return (
    <Card >
      penis
      <TextInput
        rowNumber={1}
        required
        autocorrect
        type={'tertiary'}
        placeHolder={'Enter Song Title'}
        onChange={(e) => setInputSongTitle(e)}
      />
      <Button type={'tertiary'} text={"also penis"} onClick={() => handleSearchButtonClick(inputSongTitle)} />
    </Card>
  )
};

export default SongSearchPage;