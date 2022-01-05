import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg',
}




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav(props) {


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end h-16">
              <div className="flex items-center">
                {
                    props.loginStatus ? 
                    (
                    <>
                      <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                      <div className="flex-shrink-0">
                      <button
                        onClick={() => props.setOpenGroupModal(true)}
                        type="button"
                        className="mx-1 relative inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                      >
                        <span>New Task Group</span>
                      </button>
                </div>
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                    </Menu.Button>
                    
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      
                        <Menu.Item key={1}>
                          {({ active }) => (
                            <a
                              href={'/'}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Logged as {props.username}
                            </a>

                            
                          )}
                        </Menu.Item>
                        <Menu.Item key={2}>
                        {({ active }) => (
                          <button
                            onClick={props.handleLogout}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex w-full px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            <span className='mx-auto font-medium'>Log out</span>
                          </button>
                        )}
                      </Menu.Item>
                      
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
                    </>):
                    (<>
                    <div className="flex-shrink-0">
                  <button
                    onClick={() => props.setOpenLoginModal(true)}
                    type="button"
                    className="mx-1 relative inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <span>Sign in</span>
                  </button>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={() => props.setOpenRegisterModal(true)}
                    type="button"
                    className="mx-1 px-5 relative inline-flex items-center  py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <span>Register</span>
                  </button>
                </div>
                    </>)
                }
              </div>
            </div>
          </div>

        </>
      )}
    </Disclosure>
  )
}
