import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import {setUser, setUserLoading} from '../redux/slices/user';
import {auth} from './firebase';

const AuthStateListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, newUser => {
      if (newUser) {
        const userData = {
          uid: newUser.uid,
          email: newUser.email,
        };
        dispatch(setUser(userData));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setUserLoading(false));
    });

    dispatch(setUserLoading(true));

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthStateListener;
