import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllUsers } from '../../../api/user-service';
import "./users.scss";
import Loading from "../../common/loading/loading";
import { Col, Container, Pagination, Row } from "react-bootstrap";

const UserList = () => {

    let sortBy = "id";
    let sortType = "DESC";
    let searchQ = "";

    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState("");

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    if (params.get("q") != null) {
        searchQ = params.get("q");
    }

    const loadData = async (page) => {
        try {
            if (params.get("q") != null) {
                searchQ = params.get("q");
                sortBy = "registerDate";
                sortType = "DESC";
            }

            const resp = await getAllUsers(page, 10, sortBy, sortType, searchQ);

            const {
                content,
                numberOfElements,
                size,
                totalElements,
                totalPages,
                pageable,
            } = resp.data;

            setUsers(content);

            if (numberOfElements === 0 && searchQ.length > 0)
                setResult("No results for: " + searchQ);


            setPagination({
                numberOfElements,
                size,
                totalElements,
                totalPages,
                pageable,
            });
        } catch (err) {
            setResult(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(0);
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Container className="list-container">
                    <h2>{result}</h2>
                    <Row className="table-header">
                        <Col md={1}>ID</Col>
                        <Col md={3}>NAME</Col>
                        <Col md={3}>E-MAIL</Col>
                        <Col md={3}>DATE OF REGISTRATION</Col>
                        <Col md={2}>EDIT/DELETE</Col>
                    </Row>
                    <hr
                        style={{
                            background: 'navy',
                            color: 'navy',
                            borderColor: 'navy',
                            height: '5px',
                        }}
                    />
                    {users.map((user, index) => (
                        <Row key={index}>
                            <Row>

                                <Col md={1}>{user.id} </Col>
                                <Col md={3}>{user.name}</Col>
                                <Col md={3}>{user.email}</Col>
                                <Col md={3}>{user.registerDate}</Col>
                                <Col md={2}><a href={`./edit-user/?id=${user.id}&email=${user.email}`}>EDIT/DELETE</a></Col>
                            </Row>
                            <div>
                                <hr />
                            </div>
                        </Row>
                    ))}

                    {pagination.totalPages > 1 && (
                        <Row className="user-pagination">
                            <Pagination>
                                <Pagination.First
                                    onClick={() => loadData(0)}
                                    disabled={pagination.pageable.pageNumber <= 0}
                                />
                                <Pagination.Prev
                                    onClick={() => loadData(pagination.pageable.pageNumber - 1)}
                                    disabled={pagination.pageable.pageNumber <= 0}
                                />

                                {[...Array(pagination.totalPages)].map((item, index) => (
                                    <Pagination.Item
                                        active={index === pagination.pageable.pageNumber}
                                        key={index}
                                        onClick={() => loadData(index)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}

                                <Pagination.Next
                                    onClick={() => loadData(pagination.pageable.pageNumber + 1)}
                                    disabled={
                                        pagination.pageable.pageNumber >= pagination.totalPages - 1
                                    }
                                />
                                <Pagination.Last
                                    onClick={() => loadData(pagination.totalPages - 1)}
                                    disabled={
                                        pagination.pageable.pageNumber >= pagination.totalPages - 1
                                    }
                                />
                            </Pagination>
                        </Row>
                    )}
                </Container>
            )
            }
        </>
    )
}

export default UserList