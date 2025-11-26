// src/repository/UserRepository.js

export function createUserRepository(storageKey = "tindog-users") {
  const getAll = () => {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  };

  const saveAll = (users) => {
    window.localStorage.setItem(storageKey, JSON.stringify(users));
  };

  const existsByEmail = (email) => {
    return getAll().some((user) => user.email === email);
  };

  const save = ({ email, password }) => {
    const users = getAll();
    users.push({ email, password });
    saveAll(users);
  };

  return {
    existsByEmail,
    save,
  };
}
