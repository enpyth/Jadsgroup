'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Icons } from '@/components/icons';

export function InstagramSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithInstagram = async () => {
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
      onClick={loginWithInstagram}
      className="w-full"
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.instagram className="mr-2 h-4 w-4" />
      )}
      Sign in with Instagram
    </Button>
  );
} 