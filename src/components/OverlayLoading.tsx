import { LoaderIcon } from "lucide-react"

const OverlayLoading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100/50 overflow-hidden">
      <LoaderIcon className="animate-spin" />
    </div>
  )
}

export default OverlayLoading
