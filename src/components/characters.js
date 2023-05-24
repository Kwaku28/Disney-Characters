/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getCharacters } from '../redux/characters/charactersSlice';
import { getCharacterProfile } from '../redux/profile/profileSlice';

function Characters() {
  const dispatch = useDispatch();

  const { characters, status, error } = useSelector((state) => state.characters);

  useEffect(() => {
    if (!characters.length) {
      dispatch(getCharacters());
    }
  }, [dispatch, characters]);

  if (status === 'loading') {
    return (
      <h1 style={{ textAlign: 'center' }}>{status}</h1>
    );
  }

  if (error !== null) {
    return (
      <h1 style={{ textAlign: 'center' }}>{error}</h1>
    );
  }

  return (
    <>
      <section>
        {characters.map((character) => (
          <NavLink to={`/charactersPage/${character.id}`} key={character.id}>
            <Badge
              bg="secondary"
              as="Button"
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
      </section>
    </>
  );
}

export default Characters;
