"use client"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 sm:px-6 lg:px-8 space-y-12">
      <header className="space-y-4 text-center">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          CUSTOMER CARE
        </span>
        <h1 className="font-serif text-3xl tracking-tight text-black dark:text-white">
          Contact Us
        </h1>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-zinc-500 dark:text-zinc-450 font-light border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <div className="space-y-2">
          <h3 className="font-semibold text-black dark:text-white uppercase tracking-wider text-[10px]">
            Inquiries
          </h3>
          <p>support@designstudio.com</p>
          <p>press@designstudio.com</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-black dark:text-white uppercase tracking-wider text-[10px]">
            Studio Hours
          </h3>
          <p>Monday — Friday</p>
          <p>09:00 — 17:00 CET</p>
        </div>
      </section>

      {/* Basic form placeholder */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
              First Name
            </label>
            <input
              type="text"
              required
              className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
              Last Name
            </label>
            <input
              type="text"
              required
              className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
            Email Address
          </label>
          <input
            type="email"
            required
            className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
            Message
          </label>
          <textarea
            rows={4}
            required
            className="border border-zinc-300 bg-transparent p-3 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold tracking-widest uppercase py-3 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-150"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
