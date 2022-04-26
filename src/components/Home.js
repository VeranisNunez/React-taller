import "./styles.css" 
import {firebase} from '../firebase'
import {nanoid} from 'nanoid'
import { useEffect, useState } from "react"

//-- Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'


export default function Home() {

  const [list, setList] = useState("")
  
  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [lastname, setLastName] = useState("")
  const [ide, setIde] = useState(0)
  const [tel, setTel] = useState(0)
  const [email, setEmail] = useState("")
  const [career, setCareer] = useState("")
  const [semester, setSemester] = useState(0)

  const [stateAdd, setStateAdd] = useState(false)
  const [stateEdit, setStateEdit] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const getData = async () =>{
      try{
        const database = firebase.firestore()
        const data = await database.collection('students').get()
        const array = data.docs.map(item =>(
          { id:item.id, ...item.data() }
        ))
        setList(array)
      }catch(error){
        console.log(error)
      }
    }
    getData()
  })

  const add = async (e) =>{
    e.preventDefault()
    try {
      const database = firebase.firestore()
      const newStudent = {
        name:name,
        lastname:lastname,
        ide:ide,
        tel:tel,
        email:email,
        career:career,
        semester:semester
      }
      await database.collection('students').add(newStudent)
      setStateAdd(false)
      setList([...list,
        {
          id:nanoid(), 
          name:name,
          lastname:lastname,
          ide:ide,
          tel:tel,
          email:email,
          career:career,
          semester:semester
        }
      ])
    } catch (error) {
      console.log(error)
    }
  }

  const deleteStudent = async (id) =>{
    try{
      const database = firebase.firestore()
      await database.collection('students').doc(id).delete()
      const newList = list.filter(item => item.id !== id)
      setList(newList)
    }catch(error){
      console.log(error)
    }
  }

  const editStudent = async (id) =>{
    if(!name.trim()){ setError('Campo nombre vacío'); return }
    if(!lastname.trim()){ setError('Campo apellido vacío'); return }
    if(!ide.trim()){ setError('Campo identificación vacío'); return }
    if(!tel.trim()){ setError('Campo teléfono vacío'); return }
    if(!email.trim()){ setError('Campo email vacío'); return }
    if(!career.trim()){ setError('Campo carrera vacío'); return }
    if(!semester.trim()){ setError('Campo semestre vacío'); return }
    try{
      const database = firebase.firestore()
      await database.collection('students').doc(id).update({
        name:name,
        lastname:lastname,
        ide:ide,
        tel:tel,
        email:email,
        career:career,
        semester:semester
      })
    }catch(error){
      console.log(error)
    }
    setStateEdit(!stateEdit)
    setError(false)
  }

  const auxEdit = async (stu) => {
    setName(stu.name)
    setLastName(stu.lastname)
    setIde(stu.ide)
    setTel(stu.tel)
    setEmail(stu.email)
    setCareer(stu.career)
    setSemester(stu.semester)
    setStateEdit(!stateEdit)
  }

  return(
    <div className="container-fluid p-5">
      <div className="header mb-5">
        <h2 className="fw-bolder m-0">GESTIÓN DE ESTUDIANTES</h2>
        {stateAdd ?
          <button className="btn btn-danger" onClick={()=>setStateAdd(!stateAdd)} >
            Cancelar
          </button>
          :
          <button className="btn btn-success" onClick={()=>setStateAdd(!stateAdd)}>
            Agregar estudiante
          </button>
        }
      </div>

      {stateAdd &&
        <div className="conteiner-add mb-5">
          <form onSubmit={add}>
            <div className="row g-3 input-group mb-3">
              <div className="col-md d-flex">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser}/>
                </span>
                <input 
                  type="text" className="form-control" 
                  placeholder="Nombre" required
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className="col-md d-flex">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser}/>
                </span>
                <input 
                  type="text" className="form-control" 
                  placeholder="Apellido" required
                  onChange={(e)=>setLastName(e.target.value)}
                />
              </div>
              <div className="col-md d-flex">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faAddressCard}/>
                </span>
                <input 
                  type="text" className="form-control" min={1}
                  placeholder="Identificación" required
                  onChange={(e)=>setIde(e.target.value)}
                />
              </div>
              <div className="col-md d-flex">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faPhoneFlip}/>
                </span>
                <input 
                  type="number" className="form-control" min={1}
                  placeholder="Teléfono" required
                  onChange={(e)=>setTel(e.target.value)}
                />
              </div>
            </div>
            <div className="row g-3 input-group mb-3">
              <div className="col-md d-flex">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faEnvelope}/>
                </span>
                <input 
                  type="email" className="form-control" 
                  placeholder="Email" required
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="col-md d-flex">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUserGraduate}/>
                </span>
                <input 
                  type="text" className="form-control" 
                  placeholder="Carrera" required
                  onChange={(e)=>setCareer(e.target.value)}
                />
              </div>
              <div className="col-md d-flex">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUserGraduate}/>
                </span>
                <input 
                  type="number" className="form-control" min={1} max={10}
                  placeholder="Semestre" required
                  onChange={(e)=>setSemester(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Agregar
            </button>
          </form>
        </div>
      }
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Identificación</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Email</th>
            <th scope="col">Carrera</th>
            <th scope="col">Semestre</th>
            <th scope="col">Gestión</th>
          </tr>
        </thead>
        <tbody>
          {
            list.length > 0 &&
            list.map((stu, index)=>(
              <tr key={index}>
                <th scope="row">{index}</th>
                {
                  stateEdit && stu.id===id ?
                  <>
                    <td>
                      <input 
                        type="text" className="form-control" value={name}
                        onChange={(e)=>setName(e.target.value)}
                      />
                      {
                        error ? <span className='text-danger error my-1'>{error}</span> : null
                      }
                    </td>
                    <td>
                      <input 
                        type="text" className="form-control" value={lastname}
                        onChange={(e)=>setLastName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" className="form-control" value={ide}
                        onChange={(e)=>setIde(e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" className="form-control" value={tel}
                        onChange={(e)=>setTel(e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" className="form-control" value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                      />
                    </td>
                    <td>
                    <input 
                        type="text" className="form-control" value={career}
                        onChange={(e)=>setCareer(e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" className="form-control" value={semester}
                        onChange={(e)=>setSemester(e.target.value)}
                      />
                    </td>
                    <td className="buttons">
                      <FontAwesomeIcon 
                        icon={faCircleCheck} type="button" 
                        className="pe-2 fs-4 text-success" title="Editar" 
                        onClick={()=>{editStudent(stu.id)}}
                      />
                      <FontAwesomeIcon 
                        icon={faCircleXmark} type="button" 
                        className="fs-4 text-danger" title="Cancelar" 
                        onClick={()=>{setStateEdit(!stateEdit); setError(false)}}
                      />
                    </td>
                  </>
                  :
                  <>
                    <td>{stu.name}</td>
                    <td>{stu.lastname}</td>
                    <td>{stu.ide}</td>
                    <td>{stu.tel}</td>
                    <td>{stu.email}</td>
                    <td>{stu.career}</td>
                    <td>{stu.semester}</td>
                    <td>
                      <FontAwesomeIcon 
                        icon={faUserPen} type="button" 
                        className="pe-2 fs-5 text-primary" title="Editar" 
                        onClick={()=>{setId(stu.id); auxEdit(stu)}}
                      />
                      <FontAwesomeIcon 
                        icon={faTrashCan} type="button" 
                        className="fs-5 text-danger" title="Eliminar"
                        onClick={()=>deleteStudent(stu.id)}
                      />
                    </td>
                  </>
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}