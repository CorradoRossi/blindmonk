import { useState, useEffect } from 'react';
import useEagerConnect from '@lib/hooks/useEagerConnect';
import useInactiveListener from '@lib/hooks/useInactiveListener';

const Web3ReactManager = ({ children }: { children: JSX.Element }) => {
  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null;
  }

  // // if neither context is active, spin
  // if (!active) {
  //   return showLoader ? <p>loading...</p> : null
  // }

  return children;
};

export default Web3ReactManager;
