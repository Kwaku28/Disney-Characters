import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCharacterProfile } from '../redux/profile/profileSlice';

function CharactersProfile() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCharacterProfile(id));
  }, [dispatch, id]);

  return (
    <>
      <section>
        <img src={profile.imageUrl} alt="name" />
      </section>
    </>
  );
}

export default CharactersProfile;
