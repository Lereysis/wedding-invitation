import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import api from '@/services/api/api'
import { fetchGetReminder } from '@/redux/Slices/guestSlice';
import { useParams } from 'react-router-dom';


const ReminderForm = () => {

  const dispatch = useDispatch()
  const infoReminder = useSelector(state => state.guests.infoReminder)
  const loadingStateFormReminder = useSelector(state => state.guests.loadingStateFormReminder)
  const {id,name} = useParams()
  const [dataForm,setDataForm] = useState([
    {
      name:'',
      identifier:'',
      age:''
    }
  ])
  const [listNumber,setLisNumber] = useState([])
  const [numberSelected,setNumberSelected] = useState('')

  useEffect(() => {
    dispatch(fetchGetReminder(id,name))
    setLisNumber([...Array(Number(infoReminder.numberGuest || 0)).keys()])
    return () => {
      setDataForm([{name:'',identifier:'',age:''}])
    }
  }, [id,name,dispatch,infoReminder.numberGuest])

  const handleChange = (index,event) => {
    let data = [...dataForm];
    data[index][event.target.name] = event.target.value;
    setDataForm(data);
  }

  const handleSelect = (event) => {
    setNumberSelected(event.target.value)
    setDataForm([...Array.from({length: Number(event.target.value)}, () => { return {name:'',identifier:'',age:''}})])
  }

  const sendInfoAccompanist = async () => {
    await api.post('/guest/details',{
      id,
      name,
      dataAccompanist:dataForm
    })
  }

  return (
    <div className='container'>
        <h1>Formulario de recortadorio</h1>
        <p>Lorem ipsum dolo  sit amet consectetur adipisicing elit. Repudiandae ea soluta dicta aliquid nesciunt laudantium vero fugiat. Minus obcaecati non tempora nobis dicta at, dolore ab culpa maiores in enim.</p>

        <h3>La invitacion es valida para {infoReminder.numberGuest} personas, selecciona la cantidad de personas que iran para rellenar los Datos</h3>
        <select onChange={handleSelect} className="form-select" aria-label="Default select example">
          <option selected disabled>Selecciona numero de personas</option>
          {
            listNumber.map( number => <option key={number} value={number+1}>{number+1}</option> )
          }
        </select>
        {
          numberSelected.length && dataForm.map( (field,index) => {
            return (
              <React.Fragment key={index}>
                <div className="row mb-4">
                  <h6 className='fw-bold'> Datos de el invitado #{index+1}</h6>
                  <div className="col-6">
                    <input type="text" className="form-control" onChange={(event)=>handleChange(index,event)} name="name" value={field.name} placeholder="Nombre" aria-label="Nombre"/>
                  </div>
                  <div className="col-5">
                    <input type="text" className="form-control" onChange={(event)=>handleChange(index,event)} name="identifier" value={field.identifier} placeholder="Identificador" aria-label="Identificador"/>
                  </div>
                  <div className="col-1">
                    <input type="number" className="form-control" onChange={(event)=>handleChange(index,event)} name="age" value={field.age} placeholder="Edad" aria-label="Edad"/>
                  </div>
                </div>
              </React.Fragment>
            )
          })
        }
      <button onClick={()=>sendInfoAccompanist()} className='btn btn-primary w-100'>Guardar</button>

    </div>
  )
}

export default ReminderForm