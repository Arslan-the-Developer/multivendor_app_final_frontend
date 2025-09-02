import React from 'react'


function FacilitiesSection() {

  return (

    <section className='w-full flex flex-col items-center justify-center px-2 pt-8 mt-4'>


        <h2 className='font-product text-xl text-primary font-semibold'>What We Provide</h2>

        <div className='w-full flex items-center justify-between mt-7 flex-wrap'>

            <div className='w-90 h-25 bg-white rounded-sm flex items-center justify-center relative overflow-hidden border-b-2 border-primary transition-all hover:shadow-md'>
                <h3 className='font-product text-primary font-semibold text-xl'>Buyer Protection</h3>
                <svg className='absolute opacity-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={90} height={90} color={"#006964"} fill={"none"}>
                    <path d="M21 11.1833V8.28029C21 6.64029 21 5.82028 20.5959 5.28529C20.1918 4.75029 19.2781 4.49056 17.4507 3.9711C16.2022 3.6162 15.1016 3.18863 14.2223 2.79829C13.0234 2.2661 12.424 2 12 2C11.576 2 10.9766 2.2661 9.77771 2.79829C8.89839 3.18863 7.79784 3.61619 6.54933 3.9711C4.72193 4.49056 3.80822 4.75029 3.40411 5.28529C3 5.82028 3 6.64029 3 8.28029V11.1833C3 16.8085 8.06277 20.1835 10.594 21.5194C11.2011 21.8398 11.5046 22 12 22C12.4954 22 12.7989 21.8398 13.406 21.5194C15.9372 20.1835 21 16.8085 21 11.1833Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14.5 11.5C14.5 12.8807 13.3807 14 12 14C10.6193 14 9.5 12.8807 9.5 11.5C9.5 10.1193 10.6193 9 12 9C13.3807 9 14.5 10.1193 14.5 11.5Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className='w-90 h-25 bg-white rounded-sm flex items-center justify-center relative overflow-hidden border-b-2 border-primary transition-all hover:shadow-md'>
                <h3 className='font-product text-primary font-semibold text-xl'>Secure Payments</h3>
                <svg className='absolute opacity-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={90} height={90} color={"#006964"} fill={"none"}>
                    <path d="M12 16.5V14.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97626 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97626 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z" stroke="#006964" strokeWidth="1.5" />
                    <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className='w-90 h-25 bg-white rounded-sm flex items-center justify-center relative overflow-hidden border-b-2 border-primary transition-all hover:shadow-md'>
                <h3 className='font-product text-primary font-semibold text-xl'>Verified Sellers</h3>
                <svg className='absolute opacity-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={90} height={90} color={"#006964"} fill={"none"}>
                    <path d="M14.2618 3.59937C13.1956 2.53312 12.6625 2 12 2C11.3375 2 10.8044 2.53312 9.73815 3.59937C9.09832 4.2392 8.46427 4.53626 7.55208 4.53626C6.7556 4.53626 5.62243 4.38178 5 5.00944C4.38249 5.63214 4.53628 6.76065 4.53628 7.55206C4.53628 8.46428 4.2392 9.09832 3.59935 9.73817C2.53312 10.8044 2.00001 11.3375 2 12C2.00002 12.6624 2.53314 13.1956 3.59938 14.2618C4.31616 14.9786 4.53628 15.4414 4.53628 16.4479C4.53628 17.2444 4.38181 18.3776 5.00949 19C5.63218 19.6175 6.76068 19.4637 7.55206 19.4637C8.52349 19.4637 8.99128 19.6537 9.68457 20.347C10.2749 20.9374 11.0663 22 12 22C12.9337 22 13.7251 20.9374 14.3154 20.347C15.0087 19.6537 15.4765 19.4637 16.4479 19.4637C17.2393 19.4637 18.3678 19.6175 18.9905 19M20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19M18.9905 19H19" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 10.3077C8 10.3077 10.25 10 12 14C12 14 17.0588 4 22 2" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className='w-90 h-25 bg-white rounded-sm flex items-center justify-center relative overflow-hidden border-b-2 border-primary transition-all hover:shadow-md'>
                <h3 className='font-product text-primary font-semibold text-xl'>Customer Support</h3>
                <svg className='absolute opacity-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={90} height={90} color={"#006964"} fill={"none"}>
                    <path d="M9.1585 5.71223L8.75584 4.80625C8.49256 4.21388 8.36092 3.91768 8.16405 3.69101C7.91732 3.40694 7.59571 3.19794 7.23592 3.08785C6.94883 3 6.6247 3 5.97645 3C5.02815 3 4.554 3 4.15597 3.18229C3.68711 3.39702 3.26368 3.86328 3.09497 4.3506C2.95175 4.76429 2.99278 5.18943 3.07482 6.0397C3.94815 15.0902 8.91006 20.0521 17.9605 20.9254C18.8108 21.0075 19.236 21.0485 19.6496 20.9053C20.137 20.7366 20.6032 20.3131 20.818 19.8443C21.0002 19.4462 21.0002 18.9721 21.0002 18.0238C21.0002 17.3755 21.0002 17.0514 20.9124 16.7643C20.8023 16.4045 20.5933 16.0829 20.3092 15.8362C20.0826 15.6393 19.7864 15.5077 19.194 15.2444L18.288 14.8417C17.6465 14.5566 17.3257 14.4141 16.9998 14.3831C16.6878 14.3534 16.3733 14.3972 16.0813 14.5109C15.7762 14.6297 15.5066 14.8544 14.9672 15.3038C14.4304 15.7512 14.162 15.9749 13.834 16.0947C13.5432 16.2009 13.1588 16.2403 12.8526 16.1951C12.5071 16.1442 12.2426 16.0029 11.7135 15.7201C10.0675 14.8405 9.15977 13.9328 8.28011 12.2867C7.99738 11.7577 7.85602 11.4931 7.80511 11.1477C7.75998 10.8414 7.79932 10.457 7.90554 10.1663C8.02536 9.83828 8.24905 9.56986 8.69643 9.033C9.14586 8.49368 9.37058 8.22402 9.48939 7.91891C9.60309 7.62694 9.64686 7.3124 9.61719 7.00048C9.58618 6.67452 9.44362 6.35376 9.1585 5.71223Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>

        </div>

        <hr className='mt-12 mb-2 border border-primary w-1/3 opacity-10' />

    </section>

  )
  
}

export default FacilitiesSection