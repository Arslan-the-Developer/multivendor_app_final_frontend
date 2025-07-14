import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {

  return (

    <footer className='w-full h-100 bg-[#eaeaea] border-2 border-gray-300 flex flex-col items-center justify-center mt-10 rounded-t-3xl overflow-hidden'>

        <div className='w-full h-full flex items-start justify-start max-sm:flex-col'>

            <div className='w-1/3 h-full flex flex-col items-center justify-start p-8 max-sm:w-full max-sm:p-4 max-sm:mt-3'>

                <h2 className='text-2xl font-product tracking-wide font-semibold text-primary max-sm:text-xl'>Contact Us</h2>

                <div className='flex min-sm:flex-col items-start justify-start font-product max-sm:w-full max-sm:justify-around'>
                    <div className='flex items-center justify-center mt-10 max-sm:flex-col max-sm:mt-7'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#006964"} fill={"none"} className='max-sm:scale-90'>
                            <path d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z" stroke="#006964" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M19.7731 4.22687L13 11M19.7731 4.22687C19.2678 3.72156 16.8846 4.21665 16.1649 4.22687M19.7731 4.22687C20.2784 4.73219 19.7834 7.11544 19.7731 7.83508" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <div className='flex flex-col items-start justify-start ml-4 max-sm:items-center max-sm:mt-2'>

                            <p className='text-primary font-semibold tracking-wider max-sm:text-sm'>MON - FRI : 8am - 9pm</p>
                            <p className='text-primary mt-1 text-[17px] tracking-wider max-sm:text-sm'>+{'(92)'} 123 456 7890</p>

                        </div>

                    </div>

                    
                    <div className='flex items-center justify-center mt-10 max-sm:flex-col max-sm:justify-center max-sm:mt-7'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#006964"} fill={"none"} className='max-sm:scale-90'>
                            <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="#006964" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="#006964" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>

                        <div className='flex flex-col items-start justify-start ml-4 max-sm:justify-center max-sm:items-center max-sm:mt-2'>

                            <p className='text-primary font-semibold tracking-wider max-sm:text-sm'>Need Help?</p>
                            <p className='text-primary mt-1 text-[17px] tracking-wide max-sm:text-sm'>vcare@vendeezy.com</p>

                        </div>

                    </div>
                </div>

            </div>


            <div className='w-1/3 h-full flex flex-col items-center justify-start p-8 max-sm:w-full max-sm:p-4'>

                <h2 className='text-2xl font-product tracking-wide font-semibold text-primary max-sm:text-xl'>Support</h2>

                <div className='flex min-sm:flex-col items-center justify-start mt-10 text-primary font-product max-sm:justify-around max-sm:mt-6 max-sm:text-xs max-sm:w-full'>

                    <Link to={'/supprot/seller-tutorial'} className='px-2 max-sm:px-1 border-x-2 border-transparent transition-all hover:border-primary tracking-wide hover:tracking-normal'>Seller Tutorial</Link>

                    <Link to={'/supprot/buy-the-best'} className='px-2 max-sm:px-1 border-x-2 border-transparent transition-all hover:border-primary min-sm:mt-4 tracking-wide hover:tracking-normal'>Buy The Best</Link>

                    <Link to={'/supprot/privacy-policy'} className='px-2 max-sm:px-1 border-x-2 border-transparent transition-all hover:border-primary min-sm:mt-4 tracking-wide hover:tracking-normal'>Privacy Policy</Link>

                    <Link to={'/supprot/terms-of-use'} className='px-2 max-sm:px-1 border-x-2 border-transparent transition-all hover:border-primary min-sm:mt-4 tracking-wide hover:tracking-normal'>Terms Of Use</Link>

                </div>

            </div>
            
            <div className='w-1/3 h-full flex flex-col items-center justify-start p-8 max-sm:p-2 max-sm:w-full'>

                <h2 className='text-2xl font-product tracking-wide text-primary font-semibold max-sm:hidden'>Follow Us</h2>

                <div className='flex min-sm:flex-col items-center justify-start mt-10 text-white max-sm:mt-0 max-sm:justify-center max-sm:w-full'>

                    <div className='flex items-center justify-between max-sm:w-1/3 max-sm:justify-around'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48" className='max-sm:scale-80'>
                            <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"></stop><stop offset="1" stop-color="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
                        </svg>
                    
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48" className='ml-3 max-sm:ml-0 max-sm:scale-80'>
                            <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
                        </svg>
                    </div>
                    
                    <div className='flex items-center justify-between mt-5 max-sm:mt-0 max-sm:w-1/3 max-sm:justify-around'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" className='max-sm:scale-80'>
                            <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                        </svg>
                    
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48" className='ml-3 max-sm:ml-0 max-sm:scale-80'>
                            <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                        </svg>
                    </div>

                </div>

            </div>

        </div>

        <div className='w-full h-20 flex items-center justify-center bg-[#eaeaea]'>

            <p className='flex items-center font-product max-sm:text-sm'>@{new Date().getFullYear()} <h1 className='font-lilita text-xl max-sm:text-base mx-3'>Vend<span className='text-primary'>ezy</span></h1> All Rights Reserved</p>

        </div>
        
    </footer>

  )

}


export default Footer