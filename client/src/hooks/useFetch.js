import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function useFetch(path, authed = false) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await api.get(path, authed));
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [path, authed]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
