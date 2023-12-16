import React from 'react'
import '../../app/globals.css'
import nb from '../../public/noteboy.png'
import Image from 'next/image'

function LeftBar({
  mode
}: {
  mode: boolean
}
) {

  function handleDropdown(id: any) {
    const element = document.getElementById(id)
    if (element?.classList.contains('hidden')) {
      element.classList.remove('hidden')
    }
    else {
      element?.classList.add('hidden')
    }

  }
  return (
    <div>
      <button onClick={()=>{handleDropdown('leftslideBtn')}} className='absolute top-36'>
        <Image src={nb} alt="" height={70} width={70}/>

      </button>
      <div className='leftslide' id='leftslideBtn'>
        <div className={`lg:grid lg:gap-2 lg:grid-flow-row lg:grid-cols-1 bg-opacity-10 border-r-slate-300 border-r-2 pt-52 px-2  hidden bg-slate-300 h-screen leftslide  ${mode && "text-white"}`}

        >
          {/* illustrationrelated */}
          <div className=''>
            <div className='font-extrabold '>
              POPULAR SITES VISITED
            </div>
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-3/4" type="button"
              onClick={() => { handleDropdown('dropdown1') }}
            >Illustrations

            </button>
            <div id="dropdown1" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-3/4  dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>

          </div>

          {/* websearch*/}
          <div >
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-3/4" type="button"
              onClick={() => { handleDropdown('dropdown2') }}
            >Productivity

            </button>
            <div id="dropdown2" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 w-3/4">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>

          </div>

          {/* youtube */}
          <div>
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-3/4" type="button"
              onClick={() => { handleDropdown('dropdown3') }}
            >Media

            </button>
            <div id="dropdown3" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 w-3/4">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar
