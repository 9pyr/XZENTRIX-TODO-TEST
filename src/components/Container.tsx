import React from "react"

const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="flex justify-center items-center w-full bg-gray-100 min-h-[500px] py-8">
      <div className="flex flex-col gap-5 justify-start border w-[500px] p-8 min-h-screen overflow-auto bg-white relative">
        {children}
      </div>
    </main>
  )
}

export default Container
