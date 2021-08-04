import { useEffect, useState } from 'react';
import axios from 'axios';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/v1/posts')
      .then(response => {
        setPosts(response.data);
        if (response.data.length === 0) {
          setIsEmpty(true);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return {
    posts,
    setPosts,
    isLoading,
    setIsLoading,
    isEmpty,
    setIsEmpty
  }
}
