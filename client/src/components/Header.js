import React from 'react';
import { Row, Col } from 'reactstrap';

const Header = () => {
    return (
        <div id="page-header" className="page-header mb-3">
            <Row>
                <Col md="6" sm="auto" className="text-center m-auto">
                    <h1>MINJAE BLOG</h1>
                    <p>Sweet is pleasure after pain</p>
                </Col>
            </Row>
        </div>
    );
};

export default Header;