import { useContext } from 'react';
import AuthContext from '../context/auth-context';

export default function useAuth() {
  const userCtx = useContext(AuthContext);
  const auth = userCtx.isLoggedIn || true;
  return auth;
}
