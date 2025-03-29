import cn from 'classnames'

interface IButton {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

export const Button = ({ className, children, onClick }: IButton) => {
  return (
    <button
      className={cn(
        'h-[40px] w-[140px] rounded-[8px] border-2 border-solid border-[#d84848] bg-[#ab3131] text-white',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
