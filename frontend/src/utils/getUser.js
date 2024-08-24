export const getUser = () => {
  const token = JSON.parse(localStorage.getItem("userId"));
  //console.log(`localstorage token - ${token}`);
  return token;
};
