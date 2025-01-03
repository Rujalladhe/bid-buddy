
import { bids as bidschema, items } from "@/db/schema"
import { database } from "@/db/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { revalidatePath } from "next/cache"
import SignIn from "@/components/sign-in"
import SignOut from "@/components/sign-out"
import { auth, signIn, signOut } from "@/auth"
export default async function Homepage() {
    const session = await auth()
    const all_items = await database?.query.items.findMany()
    if(!session)
        return null
    const user = session.user 
    if(!user)
        return null

    
    
  return (
    <main>
        {session ? <SignOut/> : <SignIn/>}
        
        
        <form action={ async (formdata:FormData)=>
        {
            "use server"
            await database?.insert(items).values({
                name:formdata.get("name") as string,
                userId:session?.user?.id!
            });
            revalidatePath("/")

        }}
        >
            <Input name="name" placeholder="item"/>
            <Button type="submit"></Button>

        </form>
        {all_items.map((items)=>(
            <div key={items.id}>
                {items.name}
            </div>
        ))}

    </main>
  )
}
