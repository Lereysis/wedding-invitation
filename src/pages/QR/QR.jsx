import React,{useEffect, useState} from 'react'
import QRCode from "react-qr-code";
import api from '@/services/api/api'

const QR = () => {
  const [valueQR, setValueQR] = useState('')

  useEffect(() => {
    (async () => {
      const response = await api.get('/qr-whatsapp')
      setValueQR(response.data.body)
    })()
  }, [])

  return (
    <div>
      {valueQR.length && (<div style={{ height: "auto", margin: "0 auto", maxWidth: 380, width: "100%" }}>
        <QRCode
          size={500}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={valueQR}
          viewBox={`0 0 500 500`}
        />
      </div>)}
    </div>
  )
}

export default QR