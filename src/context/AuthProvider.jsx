import { useState, createContext, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import useaxiosInstance from "@/utils/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useaxiosInstance();

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    try {
      const {
        name,
        email,
        password,
        role,
        designation,
        bankAccountNo,
        salary,
        photo,
      } = userData;

      // Firebase registration
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update Firebase user profile
      await updateProfile(user, { displayName: name, photoURL: photo });

      // Backend registration
      const response = await axiosInstance.post("/register", {
        name,
        email,
        password,
        role,
        designation,
        bankAccountNo,
        salary,
        photo,
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error during registration:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      return response;
    } catch (err) {
      console.error("Error during login:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Social login (Google)
  const googleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Send social login data to the backend
      const response = await axiosInstance.post("/auth/social-login", {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photo: firebaseUser.photoURL,
      });
    } catch (err) {
      console.error("Error during Google login:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Error during logout:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosInstance.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosInstance]);

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
