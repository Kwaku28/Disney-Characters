import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaMicrophone, FaCog, FaHome } from 'react-icons/fa';
import { getCharacters } from '../redux/characters/charactersSlice';
import { getCharacterProfile } from '../redux/profile/profileSlice';
import styles from '../style/characters.module.css';

function Characters() {
  const dispatch = useDispatch();
  const { characters, status, error } = useSelector(
    (state) => state.characters,
  );

  const [searchFilter, setSearchFilter] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const searchItems = (searchValue) => {
    setSearchFilter(searchValue);
    if (searchFilter !== '') {
      const filteredData = characters.filter((character) => Object.values(character.name)
        .join('')
        .toLowerCase()
        .includes(searchFilter.toLowerCase()));
      setSearchResults(filteredData);
    } else {
      setSearchResults(characters);
    }
  };

  useEffect(() => {
    if (!characters.length) {
      dispatch(getCharacters());
    }
  }, [dispatch, characters]);

  if (status === 'loading') {
    return <h1 style={{ textAlign: 'center' }}>{status}</h1>;
  }

  if (error !== null) {
    return <h1 style={{ textAlign: 'center' }}>{error}</h1>;
  }

  return (
    <>
      <div className={styles.disney}>
        <nav>
          <NavLink to="/">
            <FaHome style={{ color: '#fff' }} />
          </NavLink>
          <h3>Disney</h3>
          <div className={styles.icons}>
            <FaMicrophone style={{ cursor: 'pointer', color: '#fff' }} />
            <FaCog style={{ cursor: 'pointer', color: '#fff' }} />
          </div>
        </nav>
      </div>
      <section className={styles.container}>
        <div className={styles.input}>
          <input
            className={styles.search}
            type="text"
            placeholder="Type to search"
            onChange={(e) => searchItems(e.target.value)}
          />
        </div>
        <h3>Characters</h3>
        <div className={styles.card}>
          {searchFilter.length > 1 ? (
            searchResults.map((item) => (
              <NavLink to={`/charactersPage/${item.id}`} key={item.id}>
                <Badge
                  bg="secondary"
                  as="button"
                  className={styles.badge}
                  key={item.id}
                  id={item.id}
                >
                  <img src={item.characterImage} alt="na" />
                  <h2>{item.name}</h2>
                </Badge>
              </NavLink>
            ))
          ) : (
            <div className={styles.card}>
              {characters.map((character) => (
                <NavLink
                  to={`/charactersPage/${character.id}`}
                  key={character.id}
                >
                  <Badge
                    bg="secondary"
                    as="button"
                    className={styles.badge}
                    key={character.id}
                    id={character.id}
                    onClick={() => {
                      dispatch(getCharacterProfile(character.id));
                    }}
                  >
                    <img src={character.characterImage} alt="na" />
                    <h2>{character.name}</h2>
                  </Badge>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Characters;
