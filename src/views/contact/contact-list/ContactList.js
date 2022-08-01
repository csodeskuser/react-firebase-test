import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCol, CTable, CRow} from '@coreui/react'
import db from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const navigation = useNavigate();
  const [contacts, setContact] = useState([]);

  useEffect(() => {
    /* Get All Comtect List */
    db.collection("contacts").onSnapshot((snapshot) => {
        const conteactsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
        setContact(conteactsData)
    });
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
            name: `${resp.data.first_name} ${resp.data.last_name}`,
            address: resp.data.address,
            email: resp.data.email,
            phone: resp.data.phone_number,
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
