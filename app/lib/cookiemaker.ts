"use server"
import { cookies } from 'next/headers';


export async function setCookie(name: string, value: any ) {
    const flag = cookies().get(name)
    if (!flag) {
        let strval=JSON.stringify(value)

        cookies().set(name, strval,{
            maxAge:3600
        })
    }
}
export async function getCookie(name: string) {
    return cookies().get(name)
}
export async function deleteCookie(name: string) {
    const flag = cookies().get(name)
    if (flag) {
        cookies().delete(name)
    }
}
