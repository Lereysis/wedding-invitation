import api from '@/services/api/api'

const sendNotification = async (name, status, UserId) => {
    try {
        const response = await api.post('/send-notification', {
            name,
            status,
            UserId
        })

    } catch (error) {

    }
}

export default sendNotification