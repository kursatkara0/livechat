import React, { useEffect, useState } from 'react'

const Chat = ({ socket, username, room }) => {

    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on('messageReturn', (data) => {
            setMessageList((prev) => [...prev, data])
        })
    }, [socket])

    const sendMessage = async () => {
        const messageContent = {

            username: username,
            message: message,
            room: room,
            date: (new Date(Date.now)).getHours() + ':' + (new Date(Date.now)).getMinutes()
        }
        await socket.emit('message', messageContent)
        setMessageList((prev) => [...prev, messageContent])
        setMessage('')
    }
    console.log('messageList', messageList);
    return (
        <div className='lg:flex lg:items-center lg:justify-center lg:h-full pt-10 px-4'>

            <div className=' lg:w-1/3 h-[600px] bg-white relative'>
                <div className=' w-full h-16 bg-gray-700 flex items-center justify-center p-3 font-bold text-white'>
                    {room} Adlı Odada Bulunuyorsunuz
                </div>

                <div className=' w-full h-[400px] overflow-y-auto'>
                    {
                        messageList && messageList.map((msg, i) => (
                            <div className={`${username === msg.username ? 'flex justify-end' : ''}`}>
                                <div className={`${username === msg.username ? ' bg-green-600' : ' bg-blue-600'}  w-2/3 h-12 p- 2 text-white m-2 rounded-xl rounded-br-none`}>
                                    <div className=' flex justify-start px-2 pt-1 '>{msg.message}</div>
                                    <div className=' w-full flex justify-end text-xs px-2'>{msg.username}</div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className=' absolute bottom-0 left-0 w-full'>
                    <input value={message} onChange={e => setMessage(e.target.value)} className=' w-3/4 h-12 border p-3 outline-none' type='text' placeholder='mesajınız' />
                    <button onClick={sendMessage} className=' w-1/4 bg-indigo-600 text-white h-12 hover-opacity-70'>Gönder</button>
                </div>
            </div>
        </div>

    )

}

export default Chat