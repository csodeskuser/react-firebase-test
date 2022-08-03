import React,{useState} from 'react'
import {CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CRow} from '@coreui/react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [disabled,setDisabled] = useState(false);
  const navigation = useNavigate();

  /* For Create New Contact */
  const onSubmit = data => { 
    setDisabled(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}createContacts`,data).then((resp)=>{
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
                  <CFormInput type="text" placeholder="First Name" {...register("first_name",{required: true, maxLength: 80})} />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Last Name</CFormLabel>
                  <CFormInput type="text" placeholder="last Name" {...register("last_name", {required: true, maxLength: 100})} />
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Address</CFormLabel>
                    <CFormTextarea placeholder="Address" rows="3"  {...register("address", {required: true, maxLength: 80})}></CFormTextarea>
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                    <CFormInput type="email" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Phone Number</CFormLabel>
                    <CFormInput type="text" id="exampleFormControlInput1" placeholder="Phone Number"  {...register("phone_number", {required: true, maxLength: 80})} />
                </div>
                <div className="mb-3">
                    <CButton disabled={disabled} type="submit" className="mb-3">Submit</CButton>
                </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default ContactForm
