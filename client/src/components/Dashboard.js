import React from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Dashboard({ id }) {
    const { selectedConversations } = useConversations()
    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <Sidebar id={id} />
            {selectedConversations && <OpenConversation />}
        </div>
    )
}
