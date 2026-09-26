import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import toast from "react-hot-toast";

import { auth, googleProvider } from "../firebase.js";
import { api } from "../lib/api.js";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registering = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (registering.current) {
          return;
        }

        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        setLoading(true);

        try {
          const syncedUser = await api.post(
            "/users/sync",
            {
              name: firebaseUser.displayName || "",
            },
            true
          );

          setUser(syncedUser);
        } catch (error) {
          console.error("User sync failed:", error);

          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  
  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    toast.success("সফলভাবে লগইন করা হয়েছে");

    return credential;
  };

  
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    toast.success("সফলভাবে লগইন করা হয়েছে");

    return result;
  };

  const register = async (name, email, password) => {
    registering.current = true;

    try {
      const credential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await updateProfile(credential.user, {
        displayName: name,
      });

      const syncedUser = await api.post(
        "/users/sync",
        {
          name,
        },
        true
      );

      setUser(syncedUser);

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে");

      return credential;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      registering.current = false;
    }
  };

  
  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

 
  const logout = async () => {
    await signOut(auth);
    setUser(null);

    toast.success("সফলভাবে লগআউট করা হয়েছে");
  };

  const value = {
    user,
    setUser,
    loading,

    isAdmin: user?.role === "admin",

    login,
    loginWithGoogle,
    register,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}