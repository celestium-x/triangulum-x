'use client';
export default function AnimatedSvgCircles() {
  return (
    <div className="w-full">
      <div className="max-w-xl w-full h-[12rem] relative">
        <div className="rounded-full bg-[#1e1e1e] w-[18rem] h-[18rem] absolute -bottom-[110%] left-1/2 -translate-x-1/2 animate-scalePulse delay-0 z-20" />
        <div className="rounded-full bg-[#1e1e1e]/50 w-[23rem] h-[23rem] absolute -bottom-[138%] left-1/2 -translate-x-1/2 animate-scalePulse delay-700 z-10" />
        <div className="rounded-full bg-[#1e1e1e]/30 w-[27rem] h-[27rem] absolute -bottom-[157%] left-1/2 -translate-x-1/2 animate-scalePulse delay-1400 z-0" />
      </div>
    </div>
  );
}
