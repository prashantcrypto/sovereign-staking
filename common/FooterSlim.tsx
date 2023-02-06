import { SOCIALS } from './Footer'

export const FooterSlim = () => {
  return (
    <div className="mt-5 px-10 pt-5 pb-5 md:px-32 ">
      <div className="flex w-full flex-wrap items-start justify-between gap-10 pt-10">
        <div className="flex gap-10 self-end text-center md:gap-20"></div>
      </div>
      <div className="text-md flex items-center justify-between border-t border-white py-4 pt-8 text-gray-400">
        <div className="footerimgcontainer">
          <a
            target="_blank"
            href="https://thesovereign.co/"
            className="flex cursor-pointer text-xl font-semibold text-black hover:text-gray-300"
          >
            <img className="footerimage" src="mainlogo.png" />
          </a>
        </div>
        <div className="flex gap-4 text-gray-100">
          {Object.entries(SOCIALS).map(([id, { icon, link }]) => {
            return (
              <a
                key={id}
                href={link}
                target="_blank"
                rel="noreferrer"
                className={`hover:text-primary z-50 text-2xl text-white opacity-100 transition-opacity hover:text-gray-200`}
              >
                {icon}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
