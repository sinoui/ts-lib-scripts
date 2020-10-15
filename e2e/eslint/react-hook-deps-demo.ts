import { useEffect } from 'react';

export default function Demo({ open }: { open: boolean }) {
  useEffect(() => {
    console.log(open);
  }, []);

  return null;
}
