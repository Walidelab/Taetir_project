import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert } from '@/components/ui/alert';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';  

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


const FormSchema = z.object({
    email: z.string().email({
        message: "Enter A valid email",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    }),
    rememberMe: z.boolean(),
}).refine(
    (data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export function AuthForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe : false,
    },
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // Handle form submission logic here, e.g., send data to an API
    // You can also reset the form or show a success message
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
       <div className='flex flex-col mx-auto gap-4 '>
       <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*********" type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between m-4 '>
         <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                    <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                    Remember me
                </Label>
                </FormItem>
            )}
            />
         <a href="/login" className="ml-2 text-xs font-medium">
                    Already have an account? Sign in
        </a>

        </div>
        <Button type="submit">Submit</Button>
        </div>
      </form>
      
    </Form>
  )
}