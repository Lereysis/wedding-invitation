import React, { useState } from 'react'
import api from '@/services/api/api'
import QRCode from 'react-qr-code'

const PageQrWhatsapp = () => {
    const [valQR, setValQR] = useState('')
    const [loading, setLoading] = useState(false)
    const loginWhatsapp = async () => {
        setLoading(true)
        const response = await api.get('/qr-whatsapp')
        setValQR(response.data.body)
        setLoading(false)
    }
    return (
        <>
            <div className='container shadow my-5 py-5 h-75'>
                <div className='row align-items-center'>
                    <div className="col-lg-6">
                        <h3 className='text-center'>Inicia Sesion en Whatsapp con tu telefono</h3>
                        <ol>
                            <li> Dale click al boton para generar el QR <small> (este paso puede tomar unos minutos).</small> </li>
                            <li> Escanea el codigo QR con tu aplicacion de whatsapp en tu celular. </li>
                            <li> Manten tu inicion iniciada. </li>
                        </ol>
                    </div>
                    <div className="col-lg-6">
                        <div className='d-flex flex-column gap-3'>
                            {valQR.length ? (
                                <div style={{ minHeight: '300px', margin: "0 auto", maxWidth: '300px', width: "100%" }}>
                                    <QRCode
                                        size={300}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={valQR}
                                        viewBox={`0 0 300 300`}
                                    />
                                </div>)
                                : (<div className='border bg-body-tertiary d-flex align-items-center justify-content-center' style={{ minHeight: '300px', margin: "0 auto", width: "100%" }}>
                                    {
                                        loading && (
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        )
                                    }
                                </div>)
                            }
                            <button onClick={() => loginWhatsapp()} className='btn btn-primary'> Obtener QR </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pb-5 mb-5'></div>           
        </>
    )
}

export default PageQrWhatsapp