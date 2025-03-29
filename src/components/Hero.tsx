import { IconSnake } from '@/assets/IconSnake'

export const Hero = () => {
  return (
    <div className="flex h-[120px] w-full items-center justify-center bg-[#2e1514]">
      <div className="flex items-center justify-center gap-4">
        <IconSnake size={40} className="text-white" />
        <span className="text-[40px] font-bold text-white">SNAKE</span>
      </div>
    </div>
  )
}
