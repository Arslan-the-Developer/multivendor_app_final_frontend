import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import api from '../../../axios'

function SellerAddNewProduct({ onSuccess, productFetchFunction, storeIDForFunction }) {
  const [firstFormImage, setFirstFormImage] = useState(' ')
  const [secondFormImage, setSecondFormImage] = useState(' ')
  const [thirdFormImage, setThirdFormImage] = useState(' ')
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false)
  const [subCategories, setSubCategories] = useState<any>([])
  const [errorMessage, setErrorMessage] = useState('')

  // Tag input state
  const [keywordTags, setKeywordTags] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  async function GetSubCategories() {
    try {
      const response = await api.get('/api/get_product_subcategories')
      setSubCategories(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const addKeyword = () => {
    const tag = keywordInput.trim()
    if (tag && !keywordTags.includes(tag) && keywordTags.length < 5) {
      setKeywordTags([...keywordTags, tag])
    }
    setKeywordInput('')
  }

  const handleKeywordKeyDown = (e) => {
    if ((e.key === 'Enter')) {
      e.preventDefault()
      addKeyword()
    } else if (e.key === ',' || e.key === '.') {
      e.preventDefault()
    } else if (e.key === 'Backspace' && !keywordInput) {
      setKeywordTags(prev => prev.slice(0, -1))
    }
  }

  const handleKeywordsChange = (e) => {
    setKeywordInput(e.target.value.replace(/[.,]/g, ''))
  }

  async function handleProductAdd(e) {
    e.preventDefault()
    setSubmitButtonDisabled(true)

    const newProductData = new FormData(e.target)
    // Set comma-separated keywords
    newProductData.set('product_keywords', keywordTags.join(','))

    try {
      await api.post('/api/create_product', newProductData)
      setSubmitButtonDisabled(false)
      onSuccess()
      productFetchFunction({ storeId: storeIDForFunction })
    } catch (error) {
      const msg = error.response?.data || error.message
      setErrorMessage(msg)
      setSubmitButtonDisabled(false)
      setTimeout(() => setErrorMessage(''), 4000)
    }
  }

  useEffect(() => { GetSubCategories() }, [])

  return (
    <div className="w-full mt-2 flex flex-col items-center font-product relative">
      <h2 className={`absolute -top-9 text-xl text-red-500 transition-opacity duration-300 ${errorMessage ? 'opacity-100' : 'opacity-0'}`}>{errorMessage}</h2>
      <form onSubmit={handleProductAdd} className="flex flex-col items-center mt-5" encType="multipart/form-data">
        {/* Image inputs omitted for brevity */}

        <hr className="w-3/5 border-less-primary my-8" />
        <div className="flex w-full">
          <div className="flex flex-col items-center w-1/2">
            <input name="product_name" className="p-3 bg-less-primary placeholder:text-primary rounded-sm w-96 outline-none text-primary" type="text" placeholder="Product Name" required />
            <textarea name="product_description" className="p-3 bg-less-primary placeholder:text-primary mt-6 rounded-sm w-96 resize-none h-28 outline-none text-primary" placeholder="Product Description" required />
          </div>
          <hr className="h-full border-less-primary mx-8" />
          <div className="flex flex-col items-center w-1/2">
            <input name="product_quantity" onInput={e => {
              let value = e.target.value.replace(/[^0-9]/g, '');
              e.target.value = value.slice(0, 4)
            }} className="p-3 bg-less-primary placeholder:text-primary rounded-sm w-96 outline-none text-primary" type="text" placeholder="Product Quantity" required />
            {/* Inline tag input in place of textarea */}
            <div className="mt-6 flex flex-wrap items-center w-96 p-3 bg-less-primary rounded-sm gap-1" onClick={() => document.getElementById('keyword-input').focus()}>
              {keywordTags.map((tag, i) => (
                <span key={i} className="flex items-center bg-blue-100 text-blue-800 text-sm rounded px-2 py-1">
                  {tag}
                  <span className="ml-1 cursor-pointer" onClick={() => setKeywordTags(prev => prev.filter((_, idx) => idx !== i))}>×</span>
                </span>
              ))}
              <input
                id="keyword-input"
                name="product_keywords"
                type="text"
                value={keywordInput}
                onChange={handleKeywordsChange}
                onKeyDown={handleKeywordKeyDown}
                disabled={keywordTags.length >= 5}
                className="flex-grow bg-transparent outline-none disabled:opacity-50"
                placeholder={keywordTags.length >= 5 ? 'Max 5 reached' : 'Type keyword and press Enter'}
              />
            </div>
          </div>
        </div>

        {/* Rest of form: subcategory, price, button */}
        <div className="flex items-center justify-between w-full mt-6">
          <select name="product_subcategory" defaultValue="default" className="w-96 py-3 bg-less-primary rounded-sm text-primary" required>
            {subCategories.length === 0 ? <option value="">Loading...</option> : (
              <>
                <option value="default" disabled>Subcategories for '{subCategories.parent_category}'</option>
                {subCategories.sub_categories.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
              </>
            )}
          </select>
          <input name="product_price" onInput={e => {
            let value = e.target.value.replace(/[^0-9]/g, '');
            e.target.value = value.slice(0, 7);
          }} className="p-3 bg-less-primary rounded-sm w-96 outline-none text-primary" type="text" placeholder="Product Price (Rs)" required />
        </div>

        <button disabled={isSubmitButtonDisabled} className="w-72 bg-primary h-14 flex items-center justify-center text-secondary text-xl rounded-sm mt-8" type="submit">
          {isSubmitButtonDisabled ? <BarLoader color="#ffffff" /> : 'Add'}
        </button>
      </form>
    </div>
  )
}

export default SellerAddNewProduct
