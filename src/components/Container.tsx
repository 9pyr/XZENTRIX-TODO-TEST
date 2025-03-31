import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import React from "react"

const Container = ({ children }: React.PropsWithChildren) => {
  const { data: session } = useSession()

  return (
    <main className="flex flex-col justify-center items-center w-full bg-gray-100 min-h-[500px] py-8 space-y-2">
      {session && (
        <div className="flex justify-end w-[500px]">
          <Button
            onClick={() => {
              signOut()
            }}
          >
            Login out
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-5 justify-start border w-[500px] p-8 min-h-screen overflow-auto bg-white relative">
        {children}
      </div>
    </main>
  )
}

export default Container
