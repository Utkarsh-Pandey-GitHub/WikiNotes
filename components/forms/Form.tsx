import Image from 'next/image';
import React, { useState } from 'react'
import newnote from '../../public/newnote.gif'
import axios from 'axios';
import { Router } from 'next/router';

interface FormProps {
    form?: any;
    author?: string;
    setForm?: any;
    reload?:any
}


const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://wikinotes-backend.onrender.com'
    : 'http://localhost:3001';

function Form({ form, author, setForm ,reload}: FormProps) {
    const [newpost,setNewpost] = useState({
        label:form.label,
        link: form.link,
        description: form.description,
        author: form.author
    })
    function handleChange(e: any) {
        
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    function handleSubmition(e: any) {
        e.preventDefault()
        console.log(newpost);
        if(form.label === '' ){
            alert('please fill label field')
            
        }
        else{

            setForm({...form,hidden:true})
            axios.post(`${baseURL}/routes/new-post`, form)
            .then(res => {
                console.log(res);
                // setForm({ ...form, hidden: true })
                res.data
            })
            .then(res => {
                console.log(res);
                document.dispatchEvent(reload)
                
                
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
        
    return (
        <div>{(!form.hidden) &&
            <form id='form1'  className={`flex  justify-end absolute bg-slate-200 z-50 rounded-3xl `} style={{
                height: '55vh',
                width: '55vw',
                left: '20vw',
                top: '20vh'
            }}>
                <div className='text-8xl my-32 ml-16 '>
                    Write a new note!
                </div>
                <ul className='mx-5 grid grid-cols-1 w-2/3 '>
                    <Image src={newnote} alt='' height={400} width={400} className='absolute -left-32 -top-32 ' />

                    <li className='col-span-1 '>

                        <label htmlFor="label" className={"bold"}>label</label><br />
                        <input type="text" id='label' name='label' className='border border-red-700 rounded-3xl mx-2 px-2 py-1  w-full' defaultValue={form.label} 
                        onChange={e=>handleChange(e)}
                        required
                        />

                    </li>
                    <li className='col-span-1 '>

                        <label htmlFor="link" className={"bold"}>link</label><br />
                        <input type="text" id='link' name='link' className='border border-red-700 rounded-3xl mx-2 px-2 py-1  w-full' defaultValue={form.link} 
                        onChange={e=>handleChange(e)}
                        />

                    </li>
                    <li className='col-span-1'>

                        <label htmlFor="description" className={"bold"}>description</label><br />
                        <textarea name="description" id="description" rows={10}
                            className='border border-blue-700 rounded-3xl mx-2 px-2 py-1 w-full'
                            onChange={e=>handleChange(e)}
                            required
                        >
                            {form.description}
                        </textarea>
                    </li>
                    <li className='hidden'>

                        <input type="text" defaultValue={`${author}`} id='author' name='author' className='border border-yellow-700 rounded-3xl mx-2 px-2 py-1 w-full' />
                    </li>
                    <button type="submit" className={`bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 my-2 border-b-4 border-blue-500 hover:border-blue-500 rounded-3xl `}
                        onClick={(e) => {

                            handleSubmition(e)
                        }}
                    >submit</button>
                    <button  className={`bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 my-2 border-b-4 border-red-500 hover:border-red-500 rounded-3xl `}
                        onClick={(e) => {

                            setForm({...form,hidden:true})
                        }}>cancel</button>

                </ul>
            </form> }
        </div>
    )
}

export default Form
