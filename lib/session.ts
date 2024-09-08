const startSession= (user:string, jwt:string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("jwt",jwt);
}

export default startSession