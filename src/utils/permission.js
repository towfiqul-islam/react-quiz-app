const access = localStorage.getItem("access") || "";
export const isUserOrAdmin = access === 'user' || access === 'admin';
export const isAdmin = access === 'admin';
export const isUser = access === 'user';