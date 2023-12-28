

export default function Header() {
  return (
    <header className="h-96 p-4 bg-hero  animate-fade-right animate-once animate-delay-500  overflow-x-hidden">
      <section className=" flex flex-col items-start justify-center gap-4 mx-auto container h-full">
        <h1 className="text-pink-400 text-6xl font-bold ">TASK MANAGER</h1>
        <p className="text-2xl text-white font-bold p-1">organise your day-to-day tasks</p>
      </section>
    </header>
  )
}
