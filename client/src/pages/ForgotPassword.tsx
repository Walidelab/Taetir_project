import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';




const ForgotPassword = () => {
    const [ email , setEmail ] = useState('');

    const handleResetPassword = () => { 
        if ( email !== '' ) {
            console.log(`Password reset link sent to ${email}`);
        }
    }
  return (
    <div>
      <Card className='w-full mx-auto w-96 mt-20'>
        <CardHeader>
          <CardTitle className='text-lg font-bold'>Forgotten your password?</CardTitle>
          <p className='text-xs text-gray-400'>There is nothing to worry about, we'll send you a message to help you reset your password.</p>
        </CardHeader>
        <CardContent>
          <Label htmlFor="email" className="mb-2 text-xs text-gray-500">Email Address</Label>
          <Input placeholder="Enter your email" className='text-sm' value={email} onChange={(e) => setEmail(e.target.value)} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className='w-full text-sm' onClick={handleResetPassword}>Reset Password</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ForgotPassword