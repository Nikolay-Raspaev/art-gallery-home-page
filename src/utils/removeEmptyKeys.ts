export const removeEmptyKeys = (obj: object) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value));
};
