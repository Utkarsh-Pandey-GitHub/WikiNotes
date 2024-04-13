"use client"
import React, { useEffect, useState } from 'react'
const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://wikinotes-backend.onrender.com'
    : 'http://localhost:3001';

function RecieveFrom({ checkedUsers, setCheckedUsers }: { checkedUsers: any[], setCheckedUsers: React.Dispatch<React.SetStateAction<any[]>> }) {
    const [users, setUsers] = useState([])
    const read_user = () => {
        fetch(`${baseURL}/routes/read-user`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                setUsers(data);
                console.log(data)
            })
            .catch(error => console.error(error))

    }
    function handleChecked(e:any,id: any) {

        if (e.target.checked) {
            setCheckedUsers([...checkedUsers, id])
        } else {
            setCheckedUsers(checkedUsers.filter((user) => user != id))
        }
    }

    useEffect(() => {
        read_user()
    }, [])
    return (
        <div>

            <div className="max-w-sm mx-auto my-5">
                <div>
                    <div>
                        <label className="inline-flex items-center" htmlFor="indigoCheckBox">
                            <input id="indigoCheckBox" type="checkbox" className="w-4 h-4 accent-indigo-700 text-slate-300 " checked={!(checkedUsers.length>0)} />
                            <span className="ml-2 text-slate-300">Recieve airdrop from anyone</span>
                        </label>
                    </div>
                </div>
                {users && users.map((user:any, index) => {



                    return (<div className="p-3 flex items-center justify-between border-t cursor-pointer " key={index}>
                        <div className="flex items-center">
                            <img className="rounded-full h-10 w-10 " src={user.imageUrl} />
                            <div className="ml-2 flex flex-col">
                                <div className="leading-snug text-sm text-slate-300  font-bold">{user.name}</div>

                            </div>
                        </div>
                        <input id="indigoCheckBox" type="checkbox" className="w-4 h-4 accent-indigo-700" defaultChecked={checkedUsers.includes(user._id)} onChange={(e) => { handleChecked(e,user._id) }} />
                    </div>)
                })}

            </div>
        </div>
    )
}

export default RecieveFrom
