import { useRouter } from 'next/router';
import { getAccessTokenCookie } from 'utils/sessionStorageUtils';
import Button from 'components/Button/Button';
import Card from 'components/cards/Card/Card';
import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.scss';
import TextInput from 'components/TextInput/TextInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Link from 'next/link';
import { SearchContext, SearchProvider } from 'contexts/SearchContext';
import { ReccsContext } from 'contexts/ReccsContext';

const SearchPage = () => {
  return (
    <SearchProvider>
      <SearchPageWithProvider />
    </SearchProvider>
  );
};

const SearchPageWithProvider = () => {
  const { isLoadingSearch, fetchSearch, searchedTracks, mapSearchParams, setIsTitleSearch } = useContext(SearchContext);
  const { isLoadingReccs, reccTracks, fetchTrackReccsFromSearch } = useContext(ReccsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const router = useRouter();
  const { q } = router.query;

  const handleTrackSelect = (isSelected, track) => {
    track.isSelected = isSelected;
    let newSelectedTracks = [...selectedTracks];

    if (isSelected) {
      newSelectedTracks.push(track);
    } else {
      const indexToRemove = newSelectedTracks.findIndex(t => t.id === track.id);
      if (indexToRemove !== -1) {
        newSelectedTracks.splice(indexToRemove, 1);
      }
    }

    console.log('newSelectedTracks: ', newSelectedTracks);
    setSelectedTracks(newSelectedTracks);
  };

  useEffect(() => {
    if (!reccTracks || reccTracks?.length == 0) {
      // TODO: display no recommendations found message
      console.log('no recommendations found');
      return;
    }
    router.push('/recommendations');
  }, [reccTracks]);

  useEffect(() => {
    async function getToken() {
      let token = getAccessTokenCookie();
      if (!token) {
        await fetch('/auth/token');
        token = getAccessTokenCookie();
      }
      if (token) setToken(token);
    }
    getToken();
  }, []);

  useEffect(() => {
    console.log('q: ', q);
    if (q) fetchSearch(q);
  }, [q]);

  return (
    <div className={styles.screenWrapper}>
      {token === '' && <Login />}
      <Card className={styles.searchCard}>
        <div className={styles.topRow}>
          <div className={styles.searchText}>Search for a Song</div>
          <ToggleSwitch
            className={styles.seedSettingPill}
            handleToggle={(isOn) => setIsTitleSearch(!isOn)}
            onText={'Artist'}
            offText={'Title'}
            name={'artistOrTitle'}
          />
        </div>
        <TextInput
          rowNumber={1}
          required
          autocorrect
          type={'tertiary'}
          placeHolder={'Enter Track Title'}
          onChange={(e) => setSearchQuery(e)}
        />
        <Button isLoading={isLoadingSearch} type={'tertiary'} text={'Search'} onClick={async () => router.push(`/search${mapSearchParams(searchQuery)}`)} />
      </Card>
      {searchedTracks.length > 0 &&
        <div className={styles.screenWrapper}>
          <div className={styles.searchTracks}>
            {(searchedTracks || []).map((track, key) => {
              return (
                <TrackCard key={key} track={track} onSelect={(e) => handleTrackSelect(e, track)} />
              );
            })}
          </div>
          <div className={styles.bottomButtons}>
            <Button text={'More Results'} isLoading={isLoadingSearch} onClick={async () => await fetchSearch(searchQuery, 'next')} />
            <Button text={'Recommend'} isLoading={isLoadingReccs} onClick={async () => await fetchTrackReccsFromSearch(selectedTracks)} disabled={selectedTracks.length < 1} />
          </div>
        </div>}
      <Button type={'primary'} text={'About'} onClick={() => router.push('/about')} />
    </div>
  );
};

const Login = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Link href={'http://localhost:5000/auth/login'}>
          Login with Spotify
        </Link>
      </header>
    </div>
  );
};

export default SearchPage;