

import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useTheme } from "@/context/ThemeProvider";


export function BackgroundBeamsWithCollisionDemo() {
    const { theme } = useTheme()
    const isDark = theme === "dark"

  return (
    (<BackgroundBeamsWithCollision>
        <h1
            className="relative z-20 text-5xl sm:text-[85px] leading-none font-extrabold text-left md:text-center px-5 py-5 font-sans mx-auto">
            Breaking News,{" "}
            <div className="h-full relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div
                    className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r  from-purple-500 via-violet-500  py-4 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                    <span className=""> Bold Insights! </span>
                </div>
                <div
                    className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4" >
                    <span className=""> Bold Insights! </span>
                </div>
            </div>
        </h1>
        <p className={`${isDark? "text-blue-100": "text-black"} text-left md:text-center text-xl px-5 max-w-4xl pb-32 md:pb-0`}> Your go-to platform for real-time updates, expert insights, and the stories that shape the world - all in one place.</p>
    </BackgroundBeamsWithCollision>)
  );
}
