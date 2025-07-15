'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Icons } from '@/components/icons';

export function FacebookSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithFacebook = async () => {
    setIsLoading(true);
    try {
      await signIn('facebook', { callbackUrl: '/' });
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={loginWithFacebook}
      className="w-full"
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.facebook className="mr-2 h-4 w-4" />
      )}
      Sign in with Facebook
    </Button>
  );
} 