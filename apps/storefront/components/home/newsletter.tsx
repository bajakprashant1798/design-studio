"use client"

export default function Newsletter() {
  return (
    <section className="border-t border-zinc-150 bg-zinc-50 py-24 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-xl px-4 text-center space-y-8">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          STUDIO UPDATES
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-black dark:text-white">
          Subscribe to our Newsletter
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light max-w-md mx-auto leading-relaxed">
          Receive priority invitations to private lookbook releases, essential collection drops, and digital events.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center pt-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full sm:max-w-xs border-b border-zinc-300 bg-transparent px-2 py-2 text-xs tracking-wider placeholder-zinc-450 focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
          />
          <button
            type="submit"
            className="bg-black text-white dark:bg-white dark:text-black text-[10px] font-semibold tracking-widest uppercase px-6 py-2.5 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-150"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
