import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { FaChevronLeft, FaCog, FaMicrophone } from 'react-icons/fa';
import { getCharacterProfile } from '../redux/profile/profileSlice';
import styles from '../style/charactersProfile.module.css';

function CharactersProfile() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCharacterProfile(id));
  }, [dispatch, id]);

  return (
    <>
      <div className={styles.container}>
        <nav>
          <NavLink to="/">
            <FaChevronLeft style={{ color: 'rgb(17, 17, 143)' }} />
          </NavLink>
          <h3>
            {profile.name}
            &apos;s Profile
          </h3>
          <div>
            <FaMicrophone style={{ cursor: 'pointer', color: 'rgb(17, 17, 143)' }} />
            <FaCog style={{ cursor: 'pointer', color: 'rgb(17, 17, 143)' }} />
          </div>
        </nav>

        <section className={styles.details}>
          <img src={profile.imageUrl} alt={profile.name} />
          <h2>{profile.name}</h2>
          <table className={styles.profile}>
            <colgroup width="20%" />
            <colgroup width="65%" />
            <tbody>
              <tr>
                <td>Films:</td>
                <td>{profile.films}</td>
              </tr>
              <tr>
                <td>Shortfilms:</td>
                <td>{profile.shortFilms}</td>
              </tr>
              <tr>
                <td>Tvshows:</td>
                <td>{profile.tvShows}</td>
              </tr>
              <tr>
                <td>Videogames:</td>
                <td>{profile.videoGames}</td>
              </tr>
              <tr>
                <td>Parkattraction:</td>
                <td>{profile.parkAttraction}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default CharactersProfile;
