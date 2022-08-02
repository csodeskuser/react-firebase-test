import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCol, CTable, CRow} from '@coreui/react'
import db from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ContactList = () => {
  const navigation = useNavigate();
  const [contacts, setContact] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}getContacts`).then((resp)=>{
      console.log(resp.data);
      if(resp.data.status === true) {
        setContact(resp.data.result);
      }
    })
  }, []);

  /* Delete Single Contact */
  const deleteContact=(id)=>{
    if(window.confirm("Do You Want To Delete This")) {
        db.collection("contacts").doc(id).delete();
    }
  }

  /* Navigate To Edit Contact Page */
  const editContact=(id)=>{
    navigation(`/contect-edit/${id}`);
  }

  /* Contect List Table Columns Array */
  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      label: 'Name',
      _props: { scope: 'col' },
    },
    {
      key: 'address',
      label: 'Address',
      _props: { scope: 'col' },
    },
    {
      key: 'email',
      label: 'Email',
      _props: { scope: 'col' },
    },
    {
      key: 'phone',
      label: 'Phone',
      _props: { scope: 'col' },
    },
    {
        key: 'action',
        label: 'Action',
        _props: { scope: 'col' },
      },
  ]

  /* Contect List Table Data */
  const items = [];
  if(contacts.length > 0) {
    contacts.map((resp,index)=>{
        items.push({
            id: (index+1),
            name: `${resp.first_name} ${resp.last_name}`,
            address: resp.address,
            email: resp.email,
            phone: resp.phone_number,
            action: <React.Fragment><CButton onClick={()=>editContact(resp.id)} color="info" className="mb-3">Edit</CButton> &nbsp; <CButton onClick={()=>deleteContact(resp.id)} color="danger" type="submit" className="mb-3">Delete</CButton></React.Fragment>,
          _cellProps: { id: { scope: 'row' } },
        });
        return 1;
    });
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
              <CTable striped columns={columns} items={items} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ContactList
