import React, { useEffect, useState } from 'react';
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { getAllContactsWithPaging } from '../../../api/contact-service';
import Loading from '../../common/loading/loading';
import ContactCard from './contact-card';
import "./contacts.scss";
import { useLocation } from "react-router-dom";
import Spacer from '../../common/spacer/spacer';
import { debounce } from 'lodash';

const Contacts = () => {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQ, setSearcQ] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  let perPage = 36;
  let sortBy = "contactName";
  let directionType = "ASC";
  let sectionTitle = "Total Number of Contacts: ";


  if (searchQ != "") {
    sectionTitle = "Searched Contact Numbers:"
  }


  const handleChange = (e) => {
    setSearcQ(e.target.value);
    console.log(e.target.value);
    loadData(0);
  };


  const loadData = async (page) => {

    try {
      const resp = await getAllContactsWithPaging(page, perPage, sortBy, directionType, searchQ);

      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setContacts(content);
      setPagination({
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      });
      setCurrentPage(pageable.pageNumber);
      console.log(currentPage);
    } catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    loadData(0);

  }, [searchQ]);



  return (
    <>

      <Spacer height={10} />
      <Container className="contact-search-container">
        <Row>
          <div className="input-group">
            <input
              type="text"
              maxLength={30}
              className="form-control border-primary my-2 mx-2"
              placeholder="Search Name"
              value={searchQ}
              onChange={
                handleChange}
            />

          </div>
        </Row>
      </Container>


      <Container className="contacts-main-area">

        {loading ? <Loading /> :

          <>
            <Row className="mb-2">
              <Col className="text-center"><h2>{sectionTitle} {pagination.totalElements}</h2></Col>
            </Row>
            <Row className='g-4'>
              {contacts.map(contact => <Col key={contact.id} sm={6} md={4} lg={2}><ContactCard {...contact} /></Col>)}
            </Row>

            {pagination.totalPages > 1 && (
              <Row className="contact-pagination">
                <Pagination>
                  <Pagination.First
                    onClick={() => loadData(0)}
                    disabled={pagination.pageable.pageNumber <= 0}
                  />

                  <Pagination.Item onClick={() => loadData(0)}>1</Pagination.Item>

                  <Pagination.Prev
                    onClick={() => loadData(pagination.pageable.pageNumber - 1)}
                    disabled={pagination.pageable.pageNumber <= 0}
                  />
                  <Pagination.Ellipsis />

                  {currentPage > 1 && (<Pagination.Item onClick={() => loadData(currentPage - 2)} disabled=
                    {pagination.pageable.pageNumber <= 0}>{currentPage - 1}</Pagination.Item>)}
                  {currentPage >= 1 && (<Pagination.Item onClick={() => loadData(currentPage - 1)} disabled=
                    {pagination.pageable.pageNumber <= 0}>{currentPage}</Pagination.Item>)}


                  <Pagination.Item active onClick={() => loadData(currentPage)} disabled=
                    {pagination.pageable.pageNumber <= 0}>{currentPage + 1}</Pagination.Item>


                  {currentPage < (pagination.totalPages - 1) && (<Pagination.Item onClick={() => loadData(currentPage + 1)} disabled={
                    pagination.pageable.pageNumber >= pagination.totalPages - 1
                  }>{currentPage + 2}</Pagination.Item>)}
                  {currentPage < (pagination.totalPages - 2) && (<Pagination.Item onClick={() => loadData(currentPage + 2)} disabled={
                    pagination.pageable.pageNumber >= pagination.totalPages - 2
                  }>{currentPage + 3}</Pagination.Item>)}



                  <Pagination.Ellipsis />

                  <Pagination.Next
                    onClick={() => loadData(pagination.pageable.pageNumber + 1)}
                    disabled={
                      pagination.pageable.pageNumber >= pagination.totalPages - 1
                    }
                  />
                  <Pagination.Item onClick={() => loadData(pagination.totalPages - 1)}>{pagination.totalPages}</Pagination.Item>

                  <Pagination.Last
                    onClick={() => loadData(pagination.totalPages - 1)}
                    disabled={
                      pagination.pageable.pageNumber >= pagination.totalPages - 1
                    }
                  />
                </Pagination>
              </Row>
            )}



          </>



        }
      </Container>
    </>
  )
}

export default Contacts