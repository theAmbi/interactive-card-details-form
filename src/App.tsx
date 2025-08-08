/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import './App.css'
import cardFront from './assets/images/bg-card-front.png'
import cardBack from './assets/images/bg-card-back.png'
import mobileBG from './assets/images/bg-main-mobile.png'
import desktopBG from './assets/images/bg-main-desktop.png'
import cardLogo from './assets/images/card-logo.svg'
import iconComplete from './assets/images/icon-complete.svg'
function App() {
  type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
  type SubmitEvent = React.FormEvent<HTMLFormElement>

  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);


  const handleCardNumberChange = (e: InputChangeEvent) => {
    // Remove all spaces and non-digits
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');

    // Limit to 16 digits
    value = value.slice(0, 16);

    // Add space after every 4 digits, but not at the end
    value = value.replace(/(.{4})/g, '$1 ').trim();

    setCardNumber(value);
  };

  const handleMonthChange = (e: InputChangeEvent) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      setExpiryMonth(value);
    }
  }

  const handleYearChange = (e: InputChangeEvent) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      setExpiryYear(value);
    }
  }

  const handleCVCChange = (e: InputChangeEvent) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setCvc(value);
    }
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (fullName && cardNumber && expiryMonth && expiryYear && cvc) {
      setFormSubmitted(true);
    } else {
      alert("Please fill all fields.");
    }
  };


  return (
    <section className='w-full h-screen'>
      <form action={''} onSubmit={handleSubmit}>
        <div className='relative'>
          <img src={mobileBG} className='w-full' />

          {/* Center wrapper that doesn't interfere with internal positioning */}
          <div className="absolute inset-0 flex items-center justify-center shadow-2xl">
            <div className="relative scale-[0.8] ml-10"> {/* This becomes your new reference point */}

              {/* Card back */}
              <div className='w-fit relative'>
                <img src={cardBack} alt="card-back" />
                <p className='absolute right-16 top-[108px] text-right text-sm text-white font-medium tracking-widest'>{cvc}</p>
              </div>

              {/* Card front - positioned relative to the wrapper above */}
              <div className='w-fit absolute top-[136px] -left-24'>
                <div className='w-fit relative'>
                  <img src={cardLogo} className='absolute top-10 px-6' />
                  <img src={cardFront} alt="card-front" />
                  <p className='absolute w-full px-6 bottom-[72px] text-left text-white text-3xl font-medium tracking-widest'>{cardNumber}</p>
                  <div className='w-full text-white text-sm font-semibold uppercase tracking-wide flex justify-between items-center px-6 absolute bottom-7'>
                    <p>{fullName}</p>
                    <p>{expiryMonth}/{expiryYear}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {!formSubmitted && <div className="details mt-20 flex flex-col gap-10 px-10 ">
          <div className="cardholder flex flex-col gap-3">
            <label htmlFor="cardholder-name" className='text-sm uppercase font-medium tracking-widest text-purple-950'>Cardholder name</label>
            <input type="text" placeholder='e.g Jane Appleseed' maxLength={32} className={`rounded-md border w-full px-3 py-4 text-lg font-medium capitalize  placeholder:text-md placeholder:font-medium placeholder:text-grey-200 outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300 ease-in-out ${fullName ? 'border-grey-200' : 'border-red-500'}`} value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="cardnumber flex flex-col gap-3">
            <label htmlFor="card-number" className='text-sm uppercase font-medium tracking-widest text-purple-950'>Card number</label>
            <input type="text" placeholder='e.g 1234 5678 9123 000' className={` rounded-md border w-full px-3 py-4 text-lg font-medium placeholder:text-md placeholder:font-medium placeholder:text-grey-200 outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300 ease-in-out ${cardNumber ? 'border-grey-200' : 'border-red-500'}`} value={cardNumber} onChange={handleCardNumberChange} />
          </div>

          <div className='flex items-center justify-between gap-5'>
            <div className="expiry flex flex-col gap-3 w-1/2 ">
              <label htmlFor="exp-date" className='text-sm uppercase font-medium tracking-widest text-purple-950'>Exp. date (mm / yy)</label>
              <div className='flex gap-3'>
                <input type="number" placeholder='MM' maxLength={2} className={`rounded-md border w-24 px-3 py-4 text-lg font-medium placeholder:text-md placeholder:font-medium placeholder:text-grey-200 outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300 ease-in-out ${expiryMonth ? 'border-grey-200' : 'border-red-500'}`} value={expiryMonth} onChange={handleMonthChange} />
                <input type="number" placeholder='YY' maxLength={2} className={`rounded-md border w-24 px-3 py-4 text-lg font-medium placeholder:text-md placeholder:font-medium placeholder:text-grey-200 outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300 ease-in-out ${expiryYear ? 'border-grey-200' : 'border-red-500'}`} value={expiryYear} onChange={handleYearChange} />
              </div>

            </div>

            <div className="cvc flex flex-col gap-3 w-1/2">
              <label htmlFor="exp-date" className='text-sm uppercase font-medium tracking-widest text-purple-950'>cvc</label>
              <input type="number" placeholder='e.g 123' maxLength={3} className={`rounded-md border w-full px-3 py-4 text-lg font-medium placeholder:text-md placeholder:font-medium placeholder:text-grey-200 outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300 ease-in-out ${cvc ? 'border-grey-200' : 'border-red-500'}`} value={cvc} onChange={handleCVCChange} />
            </div>
          </div>

          <button type='submit' className='w-full py-4 font-medium text-white bg-purple-950 text-center rounded-lg text-lg cursor-pointer hover:bg-purple-950/90'>Confirm</button>
        </div>}
      </form>

      {
        formSubmitted && <div className='flex flex-col items-center justify-center gap-10 py-14 mt-20 px-10' id='success'>
          <img src={iconComplete} alt="check-icon" />
          <div className='w-full flex flex-col gap-5 items-center justify-center'>
            <h1 className='py-2 uppercase tracking-widest font-medium text-3xl'>Thank you!</h1>
            <p className='text-grey-400 text-lg font-medium'>We've added your card details</p>
            <button className='w-full mt-10 py-4 font-medium text-white bg-purple-950 text-center rounded-lg text-lg cursor-pointer hover:bg-purple-950/90'>Continue</button>
          </div>
        </div>
      }
    </section >

  )
}

export default App
