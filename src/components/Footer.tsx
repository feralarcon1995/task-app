import Github from "../icons/Github";
import Linkedin from "../icons/Linkedin";

export default function Footer() {
  return (
    <footer className="flex justify-between gao-3 items-center py-5 mx-auto container p-4 border-t border-pink-400 mt-10">
      <p className="text-base flex gap-2 text-center text-white ">By
        <a href="https://www.linkedin.com/in/feralarcon1995/" target="_blank" className="underline transition-all hover:text-pink-400 hover:underline hover:underline-offset-4">Fernando Alarcon</a> </p>
      <div className="flex gap-3 p-5 ">
        <a href="https://github.com/feralarcon1995" target="_blank">
          <Github />
        </a>
        <a href="https://www.linkedin.com/in/feralarcon1995/" target="_blank">
          <Linkedin />
        </a>

      </div>
    </footer>
  )
}