import React, { useEffect,useState }     from 'react'
import {CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CRow} from '@coreui/react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ContactEdit = () => {
  /* URl Params */
  let { id } = useParams();
  const [disabled,setDisabled] = useState(false);
  /* State Seclaration */
  const [fistname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [address,setAddress] = useState("");
  const [email,setEmail] = useState("");
  const [phone_number,setPhoneNumber] = useState("");
  const { register, handleSubmit,setValue, formState: { errors } } = useForm();

  const navigation = useNavigate();

  /* Get Single Contact For Edit Form */
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}getContact/${id}`).then((resp)=>{
      if(resp.data.status === true) {
        setFirstname(resp.data.result.first_name);
        setLastname(resp.data.result.last_name);
        setAddress(resp.data.result.address);
        setEmail(resp.data.result.email);
        setPhoneNumber(resp.data.result.phone_number);
      }
    })

  })

  /* Update Contect */
  const onSubmit = data => { 
    setDisabled(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}updateContact/${id}`,data).then((resp)=>{
      setDisabled(false);
      if(resp.data.status === true) {
        navigation('/contect-list');
      }
    })
  }

  /* Form Error Variable */
  console.log(errors);
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">First Name</CFormLabel>
                  <CFormInput type="text" placeholder="First Name" {...setValue('first_name', fistname )} {...register("first_name", {required: true, maxLength: 80})} />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Last Name</CFormLabel>
                  <CFormInput type="text" placeholder="last Name" {...setValue('last_name', lastname )} {...register("last_name", {required: true, maxLength: 100})} />
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Address</CFormLabel>
                    <CFormTextarea placeholder="Address" rows="3" {...setValue('address', address )}  {...register("address", {required: true, maxLength: 80})}></CFormTextarea>
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                    <CFormInput type="email" placeholder="Email" {...setValue('email', email )} {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Phone Number</CFormLabel>
                    <CFormInput type="text" id="exampleFormControlInput1"  placeholder="Phone Number" {...setValue('phone_number', phone_number )}  {...register("phone_number", {required: true, maxLength: 80})} />
                </div>
                <div className="mb-3">
                    <CButton type="submit" disabled={disabled} className="mb-3">Update</CButton>
                </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ContactEdit
