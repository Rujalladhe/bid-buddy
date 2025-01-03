import { signOut } from "@/auth"
import { Button } from "./ui/button"
 
export default function SignOut() {
  return (
    
      <form
        action={async (formData) => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    
  )
}