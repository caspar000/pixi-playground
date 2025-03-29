export const Header = () => {
  return (
    <div className="flex h-[60px] w-full items-center justify-between border-b border-solid border-[#78989c]">
      {/* Left Side */}
      <div className="flex h-[60px] items-center justify-center">
        <a
          href="#"
          className="flex h-[60px] w-[100px] items-center justify-center"
        >
          Home
        </a>
        <a
          href="#"
          className="flex h-[60px] w-[100px] items-center justify-center"
        >
          About
        </a>
        <a
          href="#"
          className="flex h-[60px] w-[100px] items-center justify-center border-b-[3px] border-solid border-[#AB3131]"
        >
          Game
        </a>
      </div>
      {/* Right Side */}
      <div className="flex items-center gap-4 pr-4">
        <button className="h-[40px] w-[140px] rounded-[8px] border-2 border-solid border-[#6b3e3e] bg-[#2E1514] text-white">
          Sign In
        </button>
        <button className="h-[40px] w-[140px] rounded-[8px] border-2 border-solid border-[#d84848] bg-[#ab3131] text-white">
          Register
        </button>
      </div>
    </div>
  )
}
