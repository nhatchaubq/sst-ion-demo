export const useAuth = () => {
  let isLoggedIn = false;

  const login = () => {
    isLoggedIn = true;
  };

  const logout = () => {
    isLoggedIn = false;
  };

  const isAuthenticated = () => isLoggedIn;

  return { signIn: login, logout, isAuthenticated };
};

export type AuthContext = ReturnType<typeof useAuth>