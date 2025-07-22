import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IconChalkboardTeacher , IconSchool} from "@tabler/icons-react"
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ChooseRole = () => {

    const [role, setRole] = useState('');

    const submitRole = () => {
        if (role) {
            console.log(`Selected role: ${role}`);
            // Here you can handle the role selection, e.g., redirect to another page or update the state
        } else {
            console.error('Please select a role before proceeding.');
        }
    }

  return (
    <Card className='w-full'>
        <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Choose Your Role</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-4">
            <Button variant="outline" className={`w-42 h-32 flex flex-col hover:bg-gray-50 ${role === 'mentor' ? 'bg-blue-800 text-white hover:bg-blue-900' : ''}`} onClick={() => setRole('mentor')}>
                <IconChalkboardTeacher className="mr-2" size={24} />
                Mentor
            </Button>
            <Button variant="outline" className={`w-42 h-32 flex flex-col hover:bg-gray-50 ${role === 'mentee' ? 'bg-blue-800 text-white hover:bg-blue-900' : ''}`} onClick={() => setRole('mentee')}>
                <IconSchool className="mr-2" size={24} />
                Mentee
            </Button>
        </CardContent>
        <CardFooter className="text-center flex justify-center">
            <Button onClick={submitRole}> Let's Start The Journey</Button>
        </CardFooter>
    </Card>
  )
}

export default ChooseRole