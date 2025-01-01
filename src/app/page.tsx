
import { bids as bidschema } from "@/db/schema"
import { database } from "@/db/database"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { revalidatePath } from "next/cache"
export default async function Homepage() {
    const bids = await database?.query.bids.findMany()
    
  return (
    <main>
        <form action={ async (formdata:FormData)=>
        {
            "use server"
            await database?.insert(bidschema).values({});
            revalidatePath("/")

        }}
        >
            <Input name="bid" placeholder="bid"/>
            <Button type="submit">place bid</Button>

        </form>
        {bids.map((bid)=>(
            <div key={bid.id}>
                {bid.id}
            </div>
        ))}

    </main>
  )
}
