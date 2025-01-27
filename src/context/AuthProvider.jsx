import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import axiosInstance from "@/utils/axiosInstance";
import { auth, googleProvider } from "@/firebase/firebase.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("Token not found. Please log in again.");
          }

          // Fetch user info from backend using token
          const response = await axiosInstance.get(
            `/auth/user/${currentUser.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Check if response is valid before accessing data
          if (response && response.data) {
            // If backend returns user data, update the state
            setUser({
              ...currentUser,
              role: response.data.role,
              designation: response.data.designation,
              salary: response.data.salary,
              bankAccountNo: response.data.bankAccountNo,
              photo: response.data.photo,
            });
          } else {
            console.error("No user data found in response.");
          }
        } catch (error) {
          console.error("Error fetching user info:", error.message);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  console.log(user); // Log the response data to debug

  const register = async ({
    name,
    email,
    password,
    role,
    designation,
    bankAccountNo,
    salary,
    photo,
  }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, { displayName: name, photoURL: photo });

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

      const { token } = response.data;
      localStorage.setItem("token", token);

      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw new Error("Registration failed. Please try again.");
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { token } = response.data;

      localStorage.setItem("token", token);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { displayName, email, photoURL } = result.user;

      const response = await axiosInstance.post("/auth/social-login", {
        name: displayName,
        email,
        role: "employee",
        designation: "",
        bankAccountNo: "",
        salary: 0,
        photo: photoURL || "https://example.com/default-avatar.png",
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      return { success: true, user: result.user };
    } catch (error) {
      console.error(
        "Error with Google login:",
        error.response || error.message
      );
      throw new Error("Google login failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw new Error("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
