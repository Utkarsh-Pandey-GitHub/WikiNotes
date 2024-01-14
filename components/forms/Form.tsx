import React, { useState } from 'react'

interface FormProps {
    form?: any;
    author?: string;
    setForm?: any;
}

function Form({ form,author,setForm }: FormProps) {
    
    
    
    return (
        <div>{(!form.hidden)?<form action="http://localhost:3001/routes/new-post" method='POST' id='form1' className={`flex  justify-center absolute bg-slate-200 z-50 rounded-3xl `} style={{
                height: '55vh',
                width: '55vw',
                left: '20vw',
                top: '20vh'
            }}>
                <ul className='mx-5 grid grid-cols-1 w-2/3 '>

                    <li className='col-span-1 '>

                        <label htmlFor="label" className={"bold"}>label</label><br />
                        <input type="text" id='label' name='label' className='border border-red-700 rounded-3xl mx-2 px-2 py-1  w-full' defaultValue={form.label} />

                    </li>
                    <li className='col-span-1 '>

                        <label htmlFor="link" className={"bold"}>link</label><br />
                        <input type="text" id='link' name='link' className='border border-red-700 rounded-3xl mx-2 px-2 py-1  w-full' defaultValue={form.link} />

                    </li>
                    <li className='col-span-1'>

                        <label htmlFor="description" className={"bold"}>description</label><br />
                        <textarea name="description" id="description" rows={10}
                            className='border border-blue-700 rounded-3xl mx-2 px-2 py-1 w-full'
                            value={form.description}
                        >
                            
                        </textarea>
                    </li>
                    <li className='hidden'>

                        <input type="text" defaultValue={`${author}`} id='author' name='author' className='border border-yellow-700 rounded-3xl mx-2 px-2 py-1 w-full' />
                   </li>
                    <button type="submit" className={`bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 my-2 border-b-4 border-blue-500 hover:border-blue-500 rounded-3xl `}>submit</button>
                    <button type="submit" className={`bg-red-700 hover:bg-blue-400 text-white font-bold py-2 px-4 my-2 border-b-4 border-blue-500 hover:border-blue-500 rounded-3xl `} onClick={() => setForm({...Form,hidden:true})}>cancel</button>

                </ul>
            </form>:''}
        </div>
    )
}

export default Form
