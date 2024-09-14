export default function CustomBackground() {
  return (
    <div className="fixed left-0 top-0 -z-10 h-full w-full">
      <div className="dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative flex h-full w-full items-center justify-center bg-white dark:bg-black">
        <div className="bg-secondary pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[#191919]"></div>
        <div
          className="absolute top-[80px] h-full w-full opacity-15 blur-[100px] saturate-150"
          style={{
            backgroundImage: `
              radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 50%),
              radial-gradient(at 10% 29%, hsla(215, 98%, 61%, 1) 0px, transparent 50%),
              radial-gradient(at 55% 100%, hsla(285, 98%, 56%, 1) 0px, transparent 50%),
              radial-gradient(at 42% 89%, hsla(285, 98%, 56%, 1) 0px, transparent 50%),
              radial-gradient(at 97% 21%, hsla(32, 98%, 61%, 1) 0px, transparent 50%),
              radial-gradient(at 69% 43%, hsla(32, 98%, 61%, 1)  0px, transparent 50%) 
              `,
          }}
        ></div>
      </div>
    </div>
  );
}
