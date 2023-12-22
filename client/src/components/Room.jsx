import React from 'react'

const Room = ({ username, room, setRoom, setUsername, setChatScreen, socket }) => {

    const sendRoom = () => {

        socket.emit('room', room)
        setChatScreen(true)
        console.log(room)
    }


    return (
        <div className='lg:flex flex lg:items-center items-center justify-center p-10 lg:justify-center lg:h-full   '>
            <div className=' lg:w-1/3 w-full h-full   lg:h-[300px] rounded-lg bg-green-500 flex flex-col space-y-4 px-8 py-2'>
                <h1 className=' text-center my-4  font-bold text-2xl'>Duka Chat App</h1>
                <input value={username} onChange={e => setUsername(e.target.value)} className=' lg:h-12 h-10 rounded-xl p-3 outline-none' type='text' placeholder='Adınız' />
                <input value={room} onChange={e => setRoom(e.target.value)} className=' lg:h-12 h-10 rounded-xl p-3 outline-none' type='text' placeholder='Oda Kodu' />
                <div onClick={sendRoom} className=' bg-green-700 hover:opacity-80 cursor-pointer text-white lg:h-12 h-8 rounded-xl pt-2 lg:text-xl text-xs '> Odaya Katıl</div>
            </div>
        </div>

    )

}

export default Room