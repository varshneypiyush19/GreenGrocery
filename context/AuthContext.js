// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../utils/supabase";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     AsyncStorage.getAllKeys().then((keys) => {
//       const sessionKey = keys.find(
//         (k) => k.includes("sb-") && k.includes("auth-token")
//       );
//       if (sessionKey) {
//         AsyncStorage.getItem(sessionKey).then((val) => {
//           console.log("🧠 Found saved session in AsyncStorage:", val);
//         });
//       }
//     });
//   }, []);

//   useEffect(() => {
//     const restoreSession = async () => {
//       const { data } = await supabase.auth.getSession();
//       console.log("🌱 Initial Supabase session:", data?.session);
//       setSession(data?.session ?? null);
//       setLoading(false);
//     };

//     restoreSession();

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         console.log("⚡ Auth state changed:", _event);

//         setSession(session);
//       }
//     );

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ session, user: session?.user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Debug: Check what's saved in AsyncStorage
  useEffect(() => {
    AsyncStorage.getAllKeys()
      .then((keys) => {
        const sessionKey = keys.find(
          (k) => k.includes("sb-") && k.includes("auth-token")
        );
        if (sessionKey) {
          AsyncStorage.getItem(sessionKey).then((val) => {
            console.log("🧠 Found saved session in AsyncStorage:", val);
          });
        } else {
          console.log("❌ No saved session found in AsyncStorage.");
        }
      })
      .catch((err) => {
        console.warn("❌ Error reading AsyncStorage keys:", err);
      });
  }, []);

  // Load session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("❌ Error restoring session:", error);
      }

      console.log("🌱 Initial Supabase session:", data?.session);
      setSession(data?.session ?? null);
      setLoading(false);
    };

    restoreSession();

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("⚡ Auth state changed:", _event);
        console.log("📦 New session from listener:", session);
        setSession(session);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user: session?.user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
