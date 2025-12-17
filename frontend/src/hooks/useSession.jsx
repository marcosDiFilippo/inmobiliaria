import { useState } from "react";

export function useSession () {
    const [session, setSession] = useState("");

    return {
        session,
        setSession
    }
}