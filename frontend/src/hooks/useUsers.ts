// frontend/src/hooks/useUsers.ts
import { useEffect, useState } from "react";
import api from "../lib/api";

export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get<any[]>("/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return users;
};
