import * as React from "react";
import {
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { User } from "../../user/user";
import { selectUser } from "../userSlice";

const apiAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    apiAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    apiAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  isLoggedIn: () => boolean;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const selectedUser = useAppSelector(selectUser);
  let [user, setUser] = React.useState<any | undefined>(selectedUser?.name);
  React.useEffect(() => {
    setUser(selectedUser?.name);
  }, [selectUser]);
  let signin = (newUser: string, callback: VoidFunction) => {
    return apiAuthProvider.signin(() => {
      setUser(selectedUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return apiAuthProvider.signout(() => {
      setUser(undefined);
      callback();
    });
  };
  let isLoggedIn = () => {
    return selectedUser !== undefined;
  };
  let value = { signin, signout, isLoggedIn, user: user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.isLoggedIn()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
export function AlreadyAuthed({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.isLoggedIn()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
export { apiAuthProvider, AuthContext };
