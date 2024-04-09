import Image from 'next/image';
import Link from 'next/link';
import {
  AtSymbolIcon,
  HomeIcon,
  UsersIcon,
  UserCircleIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/home', icon: HomeIcon, current: false },
  { name: 'My Pokémon', href: '/settings/pokemon', icon: UsersIcon, current: false },
  { name: 'Change Avatar', href: '/settings/change-avatar', icon: UserCircleIcon, current: false },
  { name: 'Change Email Address', href: '/settings/change-email-address', icon: AtSymbolIcon, current: false },
  { name: 'Change Password', href: '/settings/change-password', icon: LockClosedIcon, current: false },
  { name: 'Help', href: 'settings/help-me', icon: QuestionMarkCircleIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SideNav() {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-dark-blue px-6 max-w-80">
      <div className="flex h-16 shrink-0 items-center">
        <Image
          className="h-8 w-auto"
          src="/img/logos/poke-logo.png"
          alt="Your Company"
          width={1920}
          height={1920}
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-poke-blue text-poke-yellow' : 'text-poke-white hover:bg-[var(--dark-yellow)] hover:text-[var(--poke-red)]',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <Link
              href="/profile"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-[var(--poke-blue)]"
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-800"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
