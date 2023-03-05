import api from '@/services/api/api'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const sendWhatsapp = async (url, number, message) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: <p>Enviando...</p>,
        didOpen: () => {
          MySwal.showLoading()
        },
    })
    try {
        const response = await api.post('/send-message', {
            number,
            url: `${window.location.origin}/${url}`,
            message
        })
        MySwal.close()
        
        if (!response.data.body) {
          MySwal.fire({
            icon: 'error',
            title: "No encontramos sesion activa de whatsapp, intenta conectarte nuevamente para enviar mensajes",
            didOpen: () => {
                MySwal.hideLoading()
            },
          })
          return
        }
        MySwal.fire({
          toast:true,
          position: 'bottom-end',
          icon: 'success',
          title: "Mensaje Enviado",
          showConfirmButton: false,
          timer: 3000,
          didOpen: () => {
            MySwal.hideLoading()
          },
      })
    } catch (error) {
        MySwal.fire({
            icon: 'error',
            title: 'Tenemos errores en nuestros servidores, verifica tu conexion de whatsapp e intenta de nuevo, verifica si el numero a que intentas enviar el mensaje si es numero valido, si el problema persite comunicate con soporte',
            didOpen: () => {
                MySwal.hideLoading()
            },
        })
    }
}

export default sendWhatsapp