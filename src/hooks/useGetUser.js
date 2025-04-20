export const useGetUser = () => {
  const { name, profilePhoto, uid, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );
  return {
    name,
    profilePhoto,
    uid,
    isAuth,
  };
};
