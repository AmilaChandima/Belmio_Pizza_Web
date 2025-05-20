import belmioLogo from "../assests/logo.jpg";
import instaLogo from "../assests/instagram_logo.jpg";

function Footer(){
  return(
    
    <footer class="bg-black px-32">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:pt-8 lg:pb-4">
            <div class="md:flex md:justify-between">
              <div class="mb-6 md:mb-0">
                  <a href="#" class="flex items-center">
                      <img src={belmioLogo} class="h-16 me-3 rounded-full" alt="Belmio Logo" />
                      <span class="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">BELMIO PIZZA</span>                     
                  </a>
                  <div>
                    <p class="mt-5 mb-6 text-sm text-gray-900 dark:text-gray-400">An authentic italian pizzeria right here in Colombo</p>
                    <div class="flex mt-4 sm:justify-start sm:mt-0">
                        <a href="https://www.facebook.com/Belmiopizza?mibextid=ZbWKwL" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                  <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                              </svg>
                            <span class="sr-only">Facebook page</span>
                        </a>

                        <a href="https://www.instagram.com/belmiopizza?igsh=YnM0bmdpZGN5ZXI3" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                          <img src={instaLogo} class="w-6 h-6 ml-5 opacity-50 hover:opacity-100" />
                        </a>

                    </div>
                  </div>
              </div>
              <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                      <h2 class="mb-6 text-sm font-extrabold text-gray-900 dark:text-white">Locations</h2>
                      <ul class="text-gray-500 dark:text-gray-400 font-medium list-disc pl-5">
                          <li class="mb-4">
                              <a href="https://www.google.com/maps/place/Belmio+Pizza/@6.8938806,79.8670833,14z/data=!4m10!1m2!2m1!1sbelmio+pizza!3m6!1s0x3ae25b1aedf162ab:0x2dc3df881740df18!8m2!3d6.8938806!4d79.9051921!15sCgxiZWxtaW8gcGl6emFaDiIMYmVsbWlvIHBpenphkgESaXRhbGlhbl9yZXN0YXVyYW504AEA!16s%2Fg%2F11n0blz_69?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D" class="hover:underline">Athul Kotte</a>
                          </li>
                          <li>
                              <a href="https://www.google.com/maps/place/Belmio+Pizza/@6.8938806,79.8670833,14z/data=!4m10!1m2!2m1!1sbelmio+pizza!3m6!1s0x3ae25097735c61dd:0xf9ad240bf76af948!8m2!3d6.8755645!4d79.9319902!15sCgxiZWxtaW8gcGl6emFaDiIMYmVsbWlvIHBpenphkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F11c48n48ht?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D" class="hover:underline">Thalawathugoda</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 class="mb-6 text-sm font-extrabold text-gray-900 dark:text-white">Services</h2>
                      <ul class="text-gray-500 dark:text-gray-400 font-medium list-disc pl-5">
                          <li class="mb-4">
                              <a href="#" class="hover:underline ">Fast Delivery</a>
                          </li>
                          <li class="mb-4">
                              <a href="#" class="hover:underline">Healthy Foods</a>
                          </li>
                          <li class="mb-4">
                              <a href="#" class="hover:underline ">Reservations</a>
                          </li>
                          <li>
                              <a href="#" class="hover:underline">Food Truck</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 class="mb-6 text-sm font-extrabold text-gray-900 dark:text-white">Contact Us</h2>
                      <ul class="text-gray-500 dark:text-gray-400 font-medium list-disc pl-5">
                          <li class="mb-4">
                              <p>Call : <a href="#" class="hover:underline">+94770123166</a> </p>
                          </li>
                          <li>
                              <p>Email : <a href="#" class="hover:underline">belmiopizza@gmail.com</a> </p>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mt-4 lg:mb-4" />
          <div class="sm:flex sm:items-center sm:justify-between">
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">©Copyright 2024 <a href="#" class="hover:underline">Belmio Pizza</a>. All Rights Reserved.
              </span>
              <div class="flex mt-4 sm:justify-center sm:mt-0">
                  <a href="https://www.facebook.com/Belmiopizza?mibextid=ZbWKwL"  class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                            <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                        </svg>
                      <span class="sr-only">Facebook page</span>
                  </a>

                  <a href="#top" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    <img src={instaLogo} class="w-4 h-4 ml-5 opacity-50 hover:opacity-100" />

                  </a>
              </div>
          </div>
        </div>
    </footer>

  );
}

export default Footer;