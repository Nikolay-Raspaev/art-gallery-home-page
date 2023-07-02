import {useState} from "react";

export const useFetching = (callback) => {
    const [error, setError] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);
    const fetching = async () => {
        try {
            setIsLoaded(false);
            await callback();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoaded(true);
        }
    }
    return [fetching, error, isLoaded]
}
