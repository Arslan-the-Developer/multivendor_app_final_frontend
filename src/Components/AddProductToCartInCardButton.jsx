import React, { useState } from 'react'
import { Link } from 'react-router-dom'



function AddProductToCartButtonInCard({product, AddToCartFunction}) {

  const [clicked, setClicked] = useState(false);

  return (

    <button
      onClick={(e) => {
          if (!clicked) {

              AddToCartFunction(e, product.id);
              setClicked(true);
          }
      }}
      className="w-1/3 h-12 hover:scale-105 transition-all text-secondary text-sm flex items-center justify-center"
  >
      {clicked ? (
          <Link to={"/user-cart"} className="w-full h-full flex items-center justify-center" title="View In Cart">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="injected-svg"
                  data-src="https://cdn.hugeicons.com/icons/shopping-basket-02-solid-rounded.svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  role="img"
                  color="#006964"
              >
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 3.25C9.79086 3.25 8 5.04086 8 7.25V7.75C8 8.30228 7.55228 8.75 7 8.75C6.44772 8.75 6 8.30228 6 7.75V7.25C6 3.93629 8.68629 1.25 12 1.25C15.3137 1.25 18 3.93629 18 7.25V7.75C18 8.30228 17.5523 8.75 17 8.75C16.4477 8.75 16 8.30228 16 7.75V7.25C16 5.04086 14.2091 3.25 12 3.25Z" fill="#006964"></path>
                  <path d="M5.03918 6.75C4.54569 6.74993 4.09347 6.74987 3.73122 6.80485C3.32906 6.86588 2.90613 7.01213 2.59554 7.40758C2.29245 7.79347 2.2384 8.2371 2.25186 8.64362C2.26442 9.02282 2.34242 9.48822 2.43027 10.0123L3.43315 15.9991C3.47323 16.2384 3.49326 16.358 3.57716 16.429C3.66106 16.5 3.78234 16.5 4.02491 16.5H19.9751C20.2177 16.5 20.3389 16.5 20.4228 16.429C20.5067 16.358 20.5268 16.2384 20.5668 15.9991L21.5697 10.0124C21.6576 9.48825 21.7356 9.02281 21.7481 8.64362C21.7616 8.2371 21.7075 7.79347 21.4045 7.40758C21.0939 7.01213 20.6709 6.86588 20.2688 6.80485C19.9065 6.74987 19.4543 6.74993 18.9608 6.75H5.03918Z" fill="#006964"></path>
                  <path d="M19.9978 19.2079C20.0685 18.8852 20.1039 18.7239 20.0138 18.6119C19.9237 18.5 19.7551 18.5 19.4178 18.5H4.58218C4.24491 18.5 4.07627 18.5 3.98621 18.6119C3.89614 18.7239 3.9315 18.8852 4.0022 19.2079C4.05928 19.4683 4.11886 19.7096 4.18349 19.9321C4.40733 20.703 4.7155 21.3411 5.26868 21.8348C5.82696 22.3331 6.48525 22.5511 7.25514 22.6529C7.98918 22.75 8.90541 22.75 10.028 22.75H13.972C15.0946 22.75 16.0108 22.75 16.7449 22.6529C17.5147 22.5511 18.173 22.3331 18.7313 21.8348C19.2845 21.3411 19.5927 20.703 19.8165 19.9321C19.8811 19.7096 19.9407 19.4683 19.9978 19.2079Z" fill="#006964"></path>
              </svg>
          </Link>

      ) : (

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
              <path d="M13 18H21M17 22L17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7 7.5V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V7.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 22C7.71999 21.9999 6.57085 21.9917 5.76809 21.2752C4.95603 20.5505 4.75097 19.3264 4.34085 16.8781L3.17786 9.93557C2.98869 8.8063 2.89411 8.24167 3.18537 7.87083C3.47662 7.5 4.01468 7.5 5.09079 7.5H18.9092C19.9853 7.5 20.5234 7.5 20.8146 7.87083C21.1059 8.24167 21.0113 8.8063 20.8221 9.93557L20.4763 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4.5 17.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

      )}

  </button>

  )

}

export default AddProductToCartButtonInCard